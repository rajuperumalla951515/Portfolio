-- =========================================================================
-- RAJU PERUMALLA PORTFOLIO - SUPABASE SECURITY HARDENING MIGRATION
-- =========================================================================
-- Run this script in your Supabase SQL Editor to secure contact_messages
-- and ensure only authorized callers can access sensitive data.
-- =========================================================================

-- 1. SECURE CONTACT MESSAGES (Prevent public exfiltration of private inquiries)
ALTER TABLE IF EXISTS contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop insecure public select policy if present
DROP POLICY IF EXISTS "Allow select on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public read on contact_messages" ON contact_messages;

-- Ensure public can only INSERT new messages
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON contact_messages;
CREATE POLICY "Allow public insert on contact_messages"
ON contact_messages FOR INSERT
TO public
WITH CHECK (true);

-- Only backend service_role can query contact messages
DROP POLICY IF EXISTS "Allow service_role select on contact_messages" ON contact_messages;
CREATE POLICY "Allow service_role select on contact_messages"
ON contact_messages FOR SELECT
TO service_role
USING (true);

-- 2. HARDEN OUTBOUND CLICKS TABLE (Prevent unauthorized update or deletion)
ALTER TABLE IF EXISTS decode_outbound_clicks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Disallow public update on decode_outbound_clicks" ON decode_outbound_clicks;
DROP POLICY IF EXISTS "Disallow public delete on decode_outbound_clicks" ON decode_outbound_clicks;

-- Public can only INSERT and SELECT analytics records; modifications are prohibited
REVOKE UPDATE, DELETE ON decode_outbound_clicks FROM anon, authenticated;

-- =========================================================================
-- VERIFICATION QUERY
-- =========================================================================
SELECT tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('contact_messages', 'decode_outbound_clicks');
