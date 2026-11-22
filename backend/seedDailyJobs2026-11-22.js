require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');
const supabase = require('./supabaseClient');

const jobs = [
  {
    slug: 'rubrik-eng-project-program-intern-2027',
    title: 'ENG Project / Program Intern - Rubrik (2027 Batch)',
    summary: 'Rubrik is hiring an engineering Project / Program Intern for the 2027 graduating batch.',
    organization: 'Rubrik',
    location: 'India / Confirm on Employer Page',
    mode: 'Unknown',
    type: 'Internship',
    batches: [2027],
    deadline: null,
    deadlineText: 'Verified 2027 role',
    stipend: 'Confirm on employer page',
    paid: true,
    url: 'https://www.rubrik.com/careers',
    action: 'Apply at Rubrik Careers',
    verified: true,
  },
  {
    slug: 'v-solutions-python-full-stack-ml-intern-hyderabad-2027',
    title: 'Python Full Stack + ML Intern - V Solutions',
    summary: '2024-2027 candidates can apply for this Hyderabad hybrid Python, full-stack, and ML internship. Performance-based stipend; no prior work experience required.',
    organization: 'V Solutions',
    location: 'Hyderabad, India',
    mode: 'Hybrid',
    type: 'Internship',
    batches: [2024, 2025, 2026, 2027],
    deadline: null,
    deadlineText: 'Rolling applications',
    stipend: 'Performance-based stipend',
    paid: true,
    url: 'https://vsolutionsinc.com/careers/python-full-stack-ml-internship-hyderabad-2026/',
    action: 'Apply by Email',
    email: 'clara@vsolutionsinc.com',
    verified: true,
  },
  {
    slug: 'v-solutions-ai-ml-intern-hyderabad-2027',
    title: 'AI/ML Intern - V Solutions',
    summary: 'V Solutions is hiring an AI/ML Intern in Hyderabad. Apply by email.',
    organization: 'V Solutions',
    location: 'Hyderabad, India',
    mode: 'Hybrid',
    type: 'Internship',
    batches: [2026, 2027],
    deadline: null,
    deadlineText: 'Rolling applications',
    stipend: 'Confirm with employer',
    paid: true,
    url: 'https://vsolutionsinc.com/careers/ai-ml-internship-hyderabad-2026/',
    action: 'Apply by Email',
    email: 'clara@vsolutionsinc.com',
    verified: true,
  },
  {
    slug: 'v-solutions-cloud-devops-intern-hyderabad-2027',
    title: 'Cloud & DevOps Intern - V Solutions',
    summary: 'V Solutions is hiring a Cloud & DevOps Intern in Hyderabad for candidates with Linux, cloud, CI/CD, Docker, or Kubernetes exposure.',
    organization: 'V Solutions',
    location: 'Hyderabad, India',
    mode: 'Hybrid',
    type: 'Internship',
    batches: [2026, 2027],
    deadline: null,
    deadlineText: 'Rolling applications',
    stipend: 'Confirm with employer',
    paid: true,
    url: 'https://vsolutionsinc.com/careers/cloud-devops-internship-hyderabad-2026/',
    action: 'Apply by Email',
    email: 'clara@vsolutionsinc.com',
    verified: true,
  },
  {
    slug: 'digitals-generative-ai-engineer-fresher-hyderabad',
    title: 'Generative AI Engineer - Digitals (Freshers 2026/27)',
    summary: 'Digitals is hiring a Generative AI Engineer for 2026/2027 freshers in Hyderabad.',
    organization: 'Digitals',
    location: 'Hyderabad, India',
    mode: 'Hybrid',
    type: 'Full-time',
    batches: [2026, 2027],
    deadline: null,
    deadlineText: 'Re-open employer page before applying',
    stipend: 'Confirm on employer page',
    paid: true,
    url: 'https://apply.workable.com/digitals/j/4A9A4E7C8A/',
    action: 'Apply at Digitals',
    verified: true,
  },
  {
    slug: 'urbanizer-software-engineer-intern-2027',
    title: 'Software Engineer Intern - Urbanizer',
    summary: 'Urbanizer is advertising a remote Software Engineer Intern position for 2026/2027 candidates. Listing states that it is unpaid.',
    organization: 'Urbanizer',
    location: 'Remote, India',
    mode: 'Remote',
    type: 'Internship',
    batches: [2026, 2027],
    deadline: null,
    deadlineText: 'Rolling applications',
    stipend: 'Unpaid',
    paid: false,
    url: 'https://urbanizer.in/careers/software-engineer-intern/',
    action: 'Apply at Urbanizer',
    verified: true,
  },
  {
    slug: 'rivach-ai-engineer-intern-hyderabad',
    title: 'AI Engineer Intern - Rivach',
    summary: 'Rivach AI Engineer Intern opportunity in Hyderabad. Batch eligibility remains unconfirmed and it is watchlist-only.',
    organization: 'Rivach',
    location: 'Hyderabad, India',
    mode: 'On-site',
    type: 'Internship',
    batches: [2027],
    deadline: null,
    deadlineText: 'Watchlist: batch eligibility unconfirmed',
    stipend: 'Confirm with employer',
    paid: true,
    url: 'https://rivach.com/careers/ai-engineer-intern/',
    action: 'Re-open Employer Listing',
    verified: false,
  },
  {
    slug: 'kresto-ai-ml-engineer-intern-indore-2027',
    title: 'AI/ML Engineer Intern - Kresto',
    summary: 'Kresto is hiring for seven AI/ML Engineer Intern positions in Indore at ₹12,000/month, starting 1 December.',
    organization: 'Kresto',
    location: 'Indore, India',
    mode: 'On-site',
    type: 'Internship',
    batches: [2027],
    deadline: null,
    deadlineText: 'Start: 1 December',
    stipend: '₹12,000 / Month',
    paid: true,
    url: 'https://www.krestolabs.com/careers/90003/apply',
    action: 'Apply at Kresto',
    verified: true,
  },
  {
    slug: 'nevon-ai-full-stack-intern-new-delhi-2027',
    title: 'Full Stack Intern - Nevon AI',
    summary: 'Nevon AI is hiring a six-month Full Stack Intern in New Delhi for 2025/26/27 candidates.',
    organization: 'Nevon AI',
    location: 'New Delhi, India',
    mode: 'On-site',
    type: 'Internship',
    batches: [2025, 2026, 2027],
    deadline: null,
    deadlineText: 'Six-month internship',
    stipend: 'Confirm on employer page',
    paid: true,
    url: 'https://www.nevonai.com/careers/full-stack-developer/',
    action: 'Apply at Nevon AI',
    verified: true,
  },
  {
    slug: 'pagezero-full-stack-ai-intern-2027',
    title: 'Full Stack AI Intern - PageZero',
    summary: 'PageZero deadline is 25 November. First two months are unpaid, followed by ₹8,000/month.',
    organization: 'PageZero Solutions',
    location: 'India',
    mode: 'Hybrid',
    type: 'Internship',
    batches: [2027],
    deadline: '2026-11-25T23:59:59.999Z',
    deadlineText: 'Deadline: 25 November 2026',
    stipend: 'Unpaid first 2 months, then ₹8,000 / Month',
    paid: false,
    url: 'https://in.linkedin.com/jobs/view/full-stack-ai-intern-at-pagezero-solutions-4488952415',
    action: 'Apply on LinkedIn',
    verified: true,
  },
  {
    slug: 'amazon-sde-i-intern-2027',
    title: 'SDE I Intern 2027 - Amazon',
    summary: 'Amazon SDE I Intern role for the 2027 batch, with a six-month January-June 2027 period.',
    organization: 'Amazon',
    location: 'India / Confirm on Employer Page',
    mode: 'Hybrid',
    type: 'Internship',
    batches: [2027],
    deadline: null,
    deadlineText: 'Jan-Jun 2027; six-month internship',
    stipend: 'Competitive Amazon intern compensation',
    paid: true,
    url: 'https://www.amazon.jobs/en/jobs/10508052/sde-i-intern-amazon-university-talent-acquisition',
    action: 'Apply at Amazon Jobs',
    verified: true,
  },
  {
    slug: 'google-student-researcher-2027',
    title: 'Student Researcher 2027 - Google',
    summary: 'Google Student Researcher role for 2027, with India remote eligibility and a 4 December 2026 deadline.',
    organization: 'Google',
    location: 'India / Remote Eligible',
    mode: 'Remote',
    type: 'Internship',
    batches: [2027],
    deadline: '2026-12-04T23:59:59.999Z',
    deadlineText: 'Deadline: 4 December 2026',
    stipend: 'Confirm on employer page',
    paid: true,
    url: 'https://www.google.com/about/careers/applications/jobs/results/125423735539671750-student-researcher',
    action: 'Apply at Google Careers',
    verified: true,
  },
];

function toDoc(job) {
  return {
    slug: job.slug,
    category_slug: 'jobs',
    title: job.title,
    summary: job.summary,
    content: `## Role Overview\n\n${job.summary}\n\n## Application Details\n\n- **Organization:** ${job.organization}\n- **Location:** ${job.location}\n- **Work Mode:** ${job.mode}\n- **Eligible Batches:** ${job.batches.join(', ')}\n- **Deadline:** ${job.deadlineText}\n- **Stipend / Compensation:** ${job.stipend}\n\nApply only after re-opening the employer listing or email address to verify current availability and eligibility.${job.email ? `\n\n**Application email:** ${job.email}` : ''}`,
    difficulty: 'Fresher / Entry Level',
    read_time: '3 min read',
    author: 'Raju Perumalla',
    published_date: '2026-11-22',
    updated_date: '2026-11-22',
    tags: [job.organization, job.type, job.mode, ...job.batches.map((batch) => `${batch} Batch`), '2027'],
    is_featured: job.verified,
    published: true,
    status: job.slug === 'rivach-ai-engineer-intern-hyderabad' ? 'flagged_for_review' : 'active',
    application_deadline: job.deadline,
    eligible_batches: job.batches,
    experience_level: 'Fresher',
    opportunity_type: job.type,
    work_arrangement: job.mode,
    stipend_amount: job.stipend,
    is_stipend_paid: job.paid,
    salary_currency: 'INR',
    source_name: job.organization,
    source_location: job.location,
    action_text: `${job.action} ->`,
    deadline_text: job.deadlineText,
    canonical_url: job.url,
    official_url: job.url,
    opportunity_data: {
      organization: job.organization,
      role: job.title.replace(` - ${job.organization}`, ''),
      eligibility: `${job.batches.join(', ')} batches; verify current employer eligibility`,
      deadline: job.deadlineText,
      location: job.location,
      workMode: job.mode,
      jobType: job.type,
      stipend: job.stipend,
      officialUrl: job.url,
      email: job.email,
      eligibleBatches: job.batches,
      isVerified: job.verified,
    },
  };
}

async function seed() {
  const mongoUri = process.env.MONGO_URI;
  let mongoConnected = false;
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri);
      mongoConnected = true;
    } catch (error) {
      console.warn(`[MongoDB] ${error.message}`);
    }
  } else {
    console.warn('[MongoDB] MONGO_URI is not configured');
  }

  for (const job of jobs) {
    const doc = toDoc(job);
    if (mongoConnected) {
      await Job.findOneAndUpdate(
        { slug: doc.slug },
        { $set: doc },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`[MongoDB] Upserted ${doc.slug}`);
    }

    const { error } = await supabase
      .from('decode_resources')
      .upsert({
        slug: doc.slug,
        category_slug: doc.category_slug,
        title: doc.title,
        summary: doc.summary,
        content: doc.content,
        difficulty: doc.difficulty,
        read_time: doc.read_time,
        author: doc.author,
        published_date: doc.published_date,
        tags: doc.tags,
        is_featured: doc.is_featured,
        published: doc.published,
        status: doc.status,
        application_deadline: doc.application_deadline,
        eligible_batches: doc.eligible_batches,
        experience_level: doc.experience_level,
        opportunity_type: doc.opportunity_type,
        work_arrangement: doc.work_arrangement,
        stipend_amount: doc.stipend_amount,
        is_stipend_paid: doc.is_stipend_paid,
        source_name: doc.source_name,
        source_location: doc.source_location,
        action_text: doc.action_text,
        deadline_text: doc.deadline_text,
        canonical_url: doc.canonical_url,
        opportunity_data: doc.opportunity_data,
        last_verified_at: new Date().toISOString(),
      }, { onConflict: 'slug' });

    if (error) console.warn(`[Supabase] ${doc.slug}: ${error.message}`);
    else console.log(`[Supabase] Upserted ${doc.slug}`);
  }

  if (mongoConnected) {
    console.log(`[MongoDB] Upserted ${jobs.length} listings`);
  } else {
    console.warn('[MongoDB] No listings were synced: authentication or connection failed');
  }
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
