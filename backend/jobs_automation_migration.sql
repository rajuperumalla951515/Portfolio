-- =========================================================================
-- DECODE JOBS AUTOMATION MIGRATION (2026 & 2027 FRESHER SYSTEM)
-- =========================================================================
-- Project: Raju Perumalla Portfolio & Student Hub (Decode)
-- Run this script in your Supabase SQL Editor:
-- Dashboard: https://supabase.com/dashboard/project/hjtxvqgpvcmiktyyanxb
-- =========================================================================

-- 1. ADD JOBS AUTOMATION COLUMNS TO decode_resources
ALTER TABLE decode_resources
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS application_deadline TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS eligible_batches INT[] DEFAULT ARRAY[]::INT[],
ADD COLUMN IF NOT EXISTS experience_level TEXT DEFAULT 'Fresher',
ADD COLUMN IF NOT EXISTS opportunity_type TEXT DEFAULT 'Internship',
ADD COLUMN IF NOT EXISTS work_arrangement TEXT DEFAULT 'Remote',
ADD COLUMN IF NOT EXISTS stipend_amount TEXT,
ADD COLUMN IF NOT EXISTS is_stipend_paid BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS salary_currency TEXT DEFAULT 'INR',
ADD COLUMN IF NOT EXISTS source_platform TEXT DEFAULT 'official',
ADD COLUMN IF NOT EXISTS source_job_id TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS auto_imported BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS verification_notes TEXT;

-- 2. CREATE PERFORMANCE INDEXES FOR EXPIRY & BATCH QUERIES
CREATE INDEX IF NOT EXISTS idx_decode_jobs_status_deadline 
ON decode_resources(status, application_deadline) 
WHERE category_slug = 'jobs';

CREATE INDEX IF NOT EXISTS idx_decode_jobs_batches 
ON decode_resources USING GIN (eligible_batches) 
WHERE category_slug = 'jobs';

CREATE INDEX IF NOT EXISTS idx_decode_jobs_canonical 
ON decode_resources(canonical_url) 
WHERE canonical_url IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_decode_jobs_verified 
ON decode_resources(last_verified_at) 
WHERE category_slug = 'jobs';

-- 3. EXPIRY STORED PROCEDURE (Can be invoked via backend scheduler or Supabase pg_cron)
CREATE OR REPLACE FUNCTION expire_stale_decode_jobs()
RETURNS integer AS $$
DECLARE
  updated_count integer;
BEGIN
  -- Automatically transition past-deadline jobs to 'expired'
  UPDATE decode_resources
  SET status = 'expired', 
      updated_at = NOW()
  WHERE category_slug = 'jobs'
    AND status = 'active'
    AND application_deadline IS NOT NULL
    AND application_deadline < NOW();

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- 4. HARDEN RLS POLICIES FOR decode_resources
-- Drop previous policies to ensure clean state
DROP POLICY IF EXISTS "Allow public read on published decode_resources" ON decode_resources;
DROP POLICY IF EXISTS "Allow public read on active decode_resources" ON decode_resources;

-- Public can read published resources, but for jobs they only see active ones
CREATE POLICY "Allow public read on active decode_resources"
ON decode_resources FOR SELECT
TO public
USING (
  published = true AND (
    category_slug != 'jobs' 
    OR (
      (status = 'active' OR status IS NULL)
      AND (application_deadline IS NULL OR application_deadline >= NOW())
    )
  )
);

-- Service role has full permissions for automated importers and expiry workers
DROP POLICY IF EXISTS "Allow service_role manage decode_resources" ON decode_resources;
CREATE POLICY "Allow service_role manage decode_resources"
ON decode_resources FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 5. VERIFICATION QUERY
SELECT 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'decode_resources' 
  AND column_name IN (
    'status', 'application_deadline', 'eligible_batches', 
    'experience_level', 'opportunity_type', 'work_arrangement', 
    'stipend_amount', 'canonical_url', 'last_verified_at'
  );
