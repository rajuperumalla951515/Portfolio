-- Additive job-portal taxonomy and verified filter metadata.
-- Apply after the existing Decode/jobs migrations; this file does not reset data.

ALTER TABLE decode_resources
  ADD COLUMN IF NOT EXISTS primary_category TEXT,
  ADD COLUMN IF NOT EXISTS role_category TEXT,
  ADD COLUMN IF NOT EXISTS duration TEXT,
  ADD COLUMN IF NOT EXISTS internship_domain TEXT,
  ADD COLUMN IF NOT EXISTS degree_requirements TEXT,
  ADD COLUMN IF NOT EXISTS branch_eligibility TEXT,
  ADD COLUMN IF NOT EXISTS training_program TEXT,
  ADD COLUMN IF NOT EXISTS apprenticeship_program TEXT,
  ADD COLUMN IF NOT EXISTS remote_location_eligibility TEXT,
  ADD COLUMN IF NOT EXISTS timezone TEXT,
  ADD COLUMN IF NOT EXISTS graduation_years INT[] DEFAULT ARRAY[]::INT[];

-- New imports must carry verified values instead of inheriting optimistic defaults.
ALTER TABLE decode_resources
  ALTER COLUMN experience_level DROP DEFAULT,
  ALTER COLUMN opportunity_type DROP DEFAULT,
  ALTER COLUMN work_arrangement DROP DEFAULT,
  ALTER COLUMN is_stipend_paid DROP DEFAULT,
  ALTER COLUMN salary_currency DROP DEFAULT;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'decode_job_primary_category_check') THEN
    ALTER TABLE decode_resources
      ADD CONSTRAINT decode_job_primary_category_check
      CHECK (
        primary_category IS NULL OR primary_category IN (
          'internships', 'graduate-trainee', 'entry-level', 'apprenticeships', 'remote'
        )
      );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'decode_job_role_category_check') THEN
    ALTER TABLE decode_resources
      ADD CONSTRAINT decode_job_role_category_check
      CHECK (
        role_category IS NULL OR role_category IN (
          'software-development', 'frontend-development', 'backend-development',
          'full-stack-development', 'python-development', 'java-development',
          'ai-machine-learning', 'data-science', 'data-analytics', 'cloud-devops',
          'cybersecurity', 'sap-enterprise', 'qa-testing', 'ui-ux-design', 'product-business'
        )
      );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_decode_jobs_primary_category
  ON decode_resources(primary_category) WHERE category_slug = 'jobs';
CREATE INDEX IF NOT EXISTS idx_decode_jobs_role_category
  ON decode_resources(role_category) WHERE category_slug = 'jobs';

UPDATE decode_resources AS job
SET primary_category = COALESCE(job.primary_category, classification.primary_category),
    role_category = COALESCE(job.role_category, classification.role_category)
FROM (
  VALUES
    ('heizen-software-development-engineer-intern', 'remote', 'software-development'),
    ('hubble-software-engineering-intern-backend-data-platform', 'remote', 'backend-development'),
    ('predikt-software-engineering-intern', 'remote', 'software-development'),
    ('hindutone-python-developer-intern-hyderabad', 'internships', 'python-development'),
    ('smartdocs-junior-software-developer-hyderabad', 'entry-level', 'software-development'),
    ('trendwick-associate-software-engineer', 'entry-level', 'software-development'),
    ('sd-wot-associate-software-engineer-javascript-fullstack', 'entry-level', 'full-stack-development'),
    ('botcadence-full-stack-ai-engineer-intern', 'remote', 'full-stack-development'),
    ('infergent-labs-ai-fullstack-engineering-intern', 'remote', 'full-stack-development'),
    ('isocode-labs-software-engineering-intern', 'remote', 'software-development'),
    ('broadcastwell-software-engineering-intern', 'remote', 'software-development'),
    ('urbanizer-software-engineer-intern', 'remote', 'full-stack-development'),
    ('perceptive-apprentice-software-engineer-hyderabad', 'apprenticeships', 'software-development'),
    ('amgen-associate-software-engineer-genai-hyderabad', 'entry-level', 'ai-machine-learning'),
    ('trinet-associate-software-engineer-hyderabad', 'entry-level', 'software-development'),
    ('foundation-ai-associate-software-engineer-hyderabad', 'entry-level', 'ai-machine-learning'),
    ('heizen-associate-software-engineer-hyderabad', 'remote', 'software-development'),
    ('ibm-intern-associate-engineer-bangalore-137023', 'internships', 'software-development'),
    ('pwc-business-ai-engineer-intern-2027', 'internships', 'ai-machine-learning'),
    ('hsbc-intern-apprentice-12-months-gurugram', 'apprenticeships', 'product-business'),
    ('standard-chartered-apprentice-operations-gbs-india-2026', 'apprenticeships', 'product-business'),
    ('citi-java-fullstack-developer-chennai', 'entry-level', 'full-stack-development'),
    ('aguttaa-associate-software-intern-remote', 'remote', 'software-development'),
    ('aguttaa-hr-recruiter-intern-remote', 'remote', 'product-business'),
    ('citi-full-stack-java-developer-commercial-cards', 'entry-level', 'full-stack-development'),
    ('rubrik-eng-project-program-intern-2027', 'internships', 'product-business'),
    ('v-solutions-python-full-stack-ml-intern-hyderabad-2027', 'internships', 'full-stack-development'),
    ('v-solutions-ai-ml-intern-hyderabad-2027', 'internships', 'ai-machine-learning'),
    ('v-solutions-cloud-devops-intern-hyderabad-2027', 'internships', 'cloud-devops'),
    ('digitals-generative-ai-engineer-fresher-hyderabad', 'entry-level', 'ai-machine-learning'),
    ('urbanizer-software-engineer-intern-2027', 'remote', 'software-development'),
    ('kresto-ai-ml-engineer-intern-indore-2027', 'internships', 'ai-machine-learning'),
    ('nevon-ai-full-stack-intern-new-delhi-2027', 'internships', 'full-stack-development'),
    ('pagezero-full-stack-ai-intern-2027', 'internships', 'full-stack-development'),
    ('amazon-sde-i-intern-2027', 'internships', 'software-development')
) AS classification(slug, primary_category, role_category)
WHERE job.category_slug = 'jobs'
  AND job.slug = classification.slug;

UPDATE decode_resources AS job
SET work_arrangement = verified.work_mode,
    opportunity_type = verified.employment_type
FROM (
  VALUES
    ('heizen-software-development-engineer-intern', 'Remote', 'Internship'),
    ('hubble-software-engineering-intern-backend-data-platform', 'Remote', 'Internship'),
    ('predikt-software-engineering-intern', 'Remote', 'Internship'),
    ('hindutone-python-developer-intern-hyderabad', 'Hybrid', 'Internship'),
    ('smartdocs-junior-software-developer-hyderabad', 'On-site', 'Full-time'),
    ('trendwick-associate-software-engineer', 'On-site', 'Full-time'),
    ('sd-wot-associate-software-engineer-javascript-fullstack', 'On-site', 'Full-time'),
    ('botcadence-full-stack-ai-engineer-intern', 'Remote', 'Internship'),
    ('infergent-labs-ai-fullstack-engineering-intern', 'Remote', 'Internship'),
    ('isocode-labs-software-engineering-intern', 'Remote', 'Internship'),
    ('broadcastwell-software-engineering-intern', 'Remote', 'Internship'),
    ('urbanizer-software-engineer-intern', 'Remote', 'Internship'),
    ('perceptive-apprentice-software-engineer-hyderabad', 'On-site', 'Apprenticeship'),
    ('amgen-associate-software-engineer-genai-hyderabad', 'Hybrid', 'Full-time'),
    ('trinet-associate-software-engineer-hyderabad', 'Hybrid', 'Full-time'),
    ('foundation-ai-associate-software-engineer-hyderabad', 'Hybrid', 'Full-time'),
    ('heizen-associate-software-engineer-hyderabad', 'Remote', 'Full-time'),
    ('ibm-intern-associate-engineer-bangalore-137023', 'Hybrid', 'Internship'),
    ('pwc-business-ai-engineer-intern-2027', 'Hybrid', 'Internship'),
    ('hsbc-intern-apprentice-12-months-gurugram', 'Hybrid', 'Internship / Apprenticeship'),
    ('standard-chartered-apprentice-operations-gbs-india-2026', 'Hybrid', 'Internship / Apprenticeship'),
    ('citi-java-fullstack-developer-chennai', 'Hybrid', 'Full-time'),
    ('aguttaa-associate-software-intern-remote', 'Remote', 'Internship'),
    ('aguttaa-hr-recruiter-intern-remote', 'Remote', 'Internship'),
    ('citi-full-stack-java-developer-commercial-cards', 'Hybrid', 'Full-time'),
    ('rubrik-eng-project-program-intern-2027', 'Hybrid', 'Internship'),
    ('v-solutions-python-full-stack-ml-intern-hyderabad-2027', 'Hybrid', 'Internship'),
    ('v-solutions-ai-ml-intern-hyderabad-2027', 'Hybrid', 'Internship'),
    ('v-solutions-cloud-devops-intern-hyderabad', 'Hybrid', 'Internship'),
    ('digitals-generative-ai-engineer-fresher-hyderabad', 'Hybrid', 'Full-time'),
    ('urbanizer-software-engineer-intern-2027', 'Remote', 'Internship'),
    ('kresto-ai-ml-engineer-intern-indore-2027', 'On-site', 'Internship'),
    ('nevon-ai-full-stack-intern-new-delhi-2027', 'On-site', 'Internship'),
    ('pagezero-full-stack-ai-intern-2027', 'Hybrid', 'Internship'),
    ('amazon-sde-i-intern-2027', 'Hybrid', 'Internship')
) AS verified(slug, work_mode, employment_type)
WHERE job.category_slug = 'jobs'
  AND job.slug = verified.slug;
