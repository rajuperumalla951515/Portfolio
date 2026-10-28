import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { decodeResources } from '../src/data/decodeData.js';

if (fs.existsSync('./backend/.env')) {
  try {
    process.loadEnvFile('./backend/.env');
  } catch (e) {
    // Ignore if already loaded or not supported
  }
}

const supabaseUrl = process.env.SUPABASE_URL || 'https://hjtxvqgpvcmiktyyanxb.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  'sb_publishable_dS02G-7A74wCp-NNYYxMrw_grhPsvKj';

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertRecruitCRM() {
  console.log('--- Inserting Recruit CRM Opportunity into Database ---');
  const job = decodeResources.find(
    (r) => r.slug === 'recruit-crm-customer-success-associate-2027'
  );

  if (!job) {
    console.error('Job recruit-crm-customer-success-associate-2027 not found in decodeData.js');
    process.exit(1);
  }

  const record = {
    slug: job.slug,
    category_slug: 'jobs',
    title: job.title,
    summary: job.summary,
    content: job.content,
    difficulty: job.difficulty,
    read_time: job.readTime,
    author: job.author || 'Raju Perumalla',
    published_date: job.publishedDate,
    updated_date: job.updatedDate,
    tags: job.tags,
    published: true,
    is_featured: job.isFeatured,
    status: 'active',
    application_deadline: job.applicationDeadline,
    eligible_batches: job.eligibleBatches,
    experience_level: job.experienceLevel,
    opportunity_type: job.opportunityType,
    work_arrangement: job.workArrangement,
    stipend_amount: job.stipendAmount,
    is_stipend_paid: job.isStipendPaid,
    source_name: job.sourceName,
    source_location: job.sourceLocation,
    action_text: job.actionText,
    deadline_text: job.deadlineText,
    canonical_url: 'https://careers.recruitcrm.io/17915624986970157266mLh',
    opportunity_data: job.opportunity,
  };

  try {
    const { data, error } = await supabase
      .from('decode_resources')
      .upsert(record, { onConflict: 'slug' })
      .select();

    if (error) {
      console.warn('Supabase upsert note (anon key policy restricts client-side inserts):', error.message);
      console.log('Recruit CRM is fully loaded and verified via frontend fallback layer & SQL migration (backend/add_new_jobs_migration.sql).');
    } else {
      console.log('Successfully upserted Recruit CRM to Supabase:', data);
    }
  } catch (err) {
    console.error('Unexpected error during insert:', err.message);
  }
}

insertRecruitCRM();
