/**
 * STANDALONE JOB EXPIRY RUNNER
 * Usage: node scripts/run-job-expiry.js
 * Compatible with GitHub Actions, Cloudflare Cron Triggers, and local testing.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from backend/.env or root .env
dotenv.config({ path: path.join(rootDir, 'backend', '.env') });
dotenv.config({ path: path.join(rootDir, '.env') });

const supabaseUrl = process.env.SUPABASE_URL || 'https://hjtxvqgpvcmiktyyanxb.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  'sb_publishable_dS02G-7A74wCp-NNYYxMrw_grhPsvKj';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runExpiry() {
  console.log('=== RUNNING DECODE AUTOMATED JOB EXPIRY SWEEP ===');
  const now = new Date();
  console.log(`Reference UTC Time: ${now.toISOString()}`);

  try {
    const { data: jobs, error } = await supabase
      .from('decode_resources')
      .select('id, slug, title, status, application_deadline, last_verified_at, published_at')
      .eq('category_slug', 'jobs')
      .eq('status', 'active');

    if (error) {
      console.warn(`[WARN] Supabase query returned: ${error.message}`);
      console.log('Ensure jobs_automation_migration.sql has been executed in Supabase.');
      process.exit(0);
    }

    const expiredIds = [];
    const FRESHNESS_DAYS = 45;

    for (const job of jobs || []) {
      // 1. Fixed deadline check
      if (job.application_deadline) {
        const deadlineDate = new Date(job.application_deadline);
        if (deadlineDate.getTime() < now.getTime()) {
          expiredIds.push({ id: job.id, title: job.title, reason: `Deadline passed: ${job.application_deadline}` });
          continue;
        }
      }

      // 2. Freshness check for jobs with no deadline
      const refDateStr = job.last_verified_at || job.published_at;
      if (refDateStr) {
        const refDate = new Date(refDateStr);
        const ageDays = (now.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24);
        if (ageDays > FRESHNESS_DAYS) {
          expiredIds.push({ id: job.id, title: job.title, reason: `Exceeded ${FRESHNESS_DAYS} days freshness window` });
        }
      }
    }

    if (expiredIds.length > 0) {
      console.log(`Found ${expiredIds.length} job(s) requiring expiry:`);
      expiredIds.forEach((j) => console.log(` - [EXPIRE] ${j.title} (${j.reason})`));

      const ids = expiredIds.map((j) => j.id);
      const { error: updateErr } = await supabase
        .from('decode_resources')
        .update({
          status: 'expired',
          updated_at: now.toISOString(),
          verification_notes: 'Automatically expired by standalone scheduled script',
        })
        .in('id', ids);

      if (updateErr) {
        console.error(`Failed to update expired jobs: ${updateErr.message}`);
        process.exit(1);
      }
      console.log(`[SUCCESS] Marked ${ids.length} job(s) as expired in Supabase.`);
    } else {
      console.log('[SUCCESS] All active listings are current and verified. Zero expired listings found.');
    }
  } catch (err) {
    console.error('Unhandled runner error:', err.message);
    process.exit(1);
  }
}

runExpiry();
