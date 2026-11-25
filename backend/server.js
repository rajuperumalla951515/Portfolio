require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobTaxonomy = require('../shared/job-taxonomy.json');

const Contact = require('./models/Contact');
const Job = require('./models/Job');
const supabase = require('./supabaseClient');
const {
  isSafePublicUrl,
  normalizeDeadline,
  evaluateJobLifecycle,
  extractBatchEligibility,
  cleanCanonicalUrl,
  sanitizeText,
  expireStaleJobs,
  parseJobPostingFromUrl,
} = require('./jobAutomationService');

const app = express();
const PORT = process.env.PORT || 5000;
const primaryCategorySlugs = new Set(jobTaxonomy.categories.map(({ slug }) => slug));
const roleCategorySlugs = new Set(jobTaxonomy.roles.map(({ slug }) => slug));

const getJobClassification = (job) => {
  const curated = jobTaxonomy.bySlug[job.slug] || {};
  const verifiedWorkMode = jobTaxonomy.verifiedWorkModes[job.slug] || null;
  const requestedCategory = primaryCategorySlugs.has(job.primary_category) ? job.primary_category : curated.primaryCategory || null;
  const primaryCategory = requestedCategory && (verifiedWorkMode || job.work_arrangement || job.opportunity_data?.workMode) === 'Remote'
    ? 'remote'
    : requestedCategory;
  const roleCategory = roleCategorySlugs.has(job.role_category)
    ? job.role_category
    : curated.roleCategory || null;
  return {
    primaryCategory,
    roleCategory,
    verifiedWorkMode,
    verifiedEmploymentType: jobTaxonomy.verifiedEmploymentTypes[job.slug] || null,
  };
};

const matchesText = (value, query) => String(value || '').toLowerCase().includes(String(query).trim().toLowerCase());
const hasDatedDeadline = (job) => {
  const deadline = job.application_deadline || job.opportunity_data?.deadline;
  return Boolean(deadline && !/rolling|open until filled/i.test(String(deadline)) && !Number.isNaN(new Date(deadline).getTime()));
};
const hasRollingDeadline = (job) => /rolling|open until filled/i.test(String(job.opportunity_data?.deadline || ''));
const hasCompensationEvidence = (job) => {
  const value = [
    job.stipend_amount,
    job.opportunity_data?.stipend,
    ...(Array.isArray(job.tags) ? job.tags : []),
  ].join(' ').toLowerCase();
  return Boolean(value) && !value.includes('unpaid') && !value.includes('voluntary');
};
const hasUnpaidEvidence = (job) => {
  const value = [
    job.stipend_amount,
    job.opportunity_data?.stipend,
    ...(Array.isArray(job.tags) ? job.tags : []),
  ].join(' ').toLowerCase();
  return value.includes('unpaid') || value.includes('voluntary');
};

// -------------------------------------------------------------
// 1. SECURITY & CORS CONFIGURATION
// -------------------------------------------------------------
const defaultAllowedOrigins = [
  'https://www.rajuperumalla.in',
  'https://rajuperumalla.in',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
];

const configuredOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...configuredOrigins]));

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (tools, curl, server-to-server) or matching origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Cross-Origin Request Blocked by CORS Security Policy'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key', 'x-cron-secret'],
  credentials: true,
}));

// Payload size limit to prevent Denial-of-Service via massive payloads
app.use(express.json({ limit: '50kb' }));

// -------------------------------------------------------------
// 2. RATE LIMITING MIDDLEWARE (Lightweight in-memory)
// -------------------------------------------------------------
const rateLimitMap = new Map();
const createRateLimiter = ({ windowMs = 60 * 1000, max = 60, message = 'Too many requests, please try again later.' } = {}) => {
  return (req, res, next) => {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const ip = String(rawIp).split(',')[0].trim();
    const key = `${req.baseUrl || req.path}:${ip}`;
    const now = Date.now();

    let record = rateLimitMap.get(key);
    if (!record || now - record.resetTime > windowMs) {
      record = { count: 1, resetTime: now };
      rateLimitMap.set(key, record);
    } else {
      record.count += 1;
    }

    // Prune stale cache if size exceeds 10,000 entries
    if (rateLimitMap.size > 10000) {
      for (const [k, v] of rateLimitMap.entries()) {
        if (now - v.resetTime > windowMs) rateLimitMap.delete(k);
      }
    }

    if (record.count > max) {
      res.setHeader('Retry-After', Math.ceil((windowMs - (now - record.resetTime)) / 1000));
      return res.status(429).json({ success: false, message });
    }
    next();
  };
};

const contactLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many messages submitted from this IP. Please wait 15 minutes before submitting again.'
});

const clickLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 120,
  message: 'Rate limit exceeded for outbound tracking.'
});

const redirectLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 180,
  message: 'Too many redirects requested. Please wait a moment.'
});

const importLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 20,
  message: 'Too many import requests. Please wait a minute.'
});

// -------------------------------------------------------------
// 3. ADMIN & CRON AUTHORIZATION MIDDLEWARE
// -------------------------------------------------------------
const requireAdminAuth = (req, res, next) => {
  const adminKey = process.env.ADMIN_API_KEY;
  const providedKey = req.headers['x-admin-key'] || req.query.admin_key;

  if (!adminKey || !providedKey || providedKey !== adminKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Administrative authentication required.'
    });
  }
  next();
};

const requireCronOrAdminAuth = (req, res, next) => {
  const adminKey = process.env.ADMIN_API_KEY;
  const cronSecret = process.env.CRON_SECRET;
  const providedKey =
    req.headers['x-admin-key'] ||
    req.headers['x-cron-secret'] ||
    req.query.admin_key ||
    req.query.cron_secret;

  if (
    (adminKey && providedKey === adminKey) ||
    (cronSecret && providedKey === cronSecret)
  ) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: 'Unauthorized: Valid administrative key or cron secret required.'
  });
};

// -------------------------------------------------------------
// 4. DATABASE CONNECTIONS
// -------------------------------------------------------------
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(err => console.error('MongoDB connection error (Supabase is primary):', err.message));
}

// -------------------------------------------------------------
// 5. API ROUTES
// -------------------------------------------------------------

// Basic Health Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running securely with Supabase.' });
});

// Decode Categories API
app.get('/api/decode/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('decode_categories')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Supabase categories error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to retrieve categories.' });
    }
    res.json({ success: true, data: data || [] });
  } catch (err) {
    console.error('Categories API error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Decode Resources Query API
app.get('/api/decode/resources', async (req, res) => {
  try {
    const { category, search, difficulty, batch, page = 1, limit = 20, includeExpired } = req.query;
    let query = supabase
      .from('decode_resources')
      .select('*', { count: 'exact' })
      .eq('published', true);

    if (category && category !== 'all') {
      query = query.eq('category_slug', String(category).trim());
    }
    if (difficulty && difficulty !== 'All') {
      query = query.eq('difficulty', String(difficulty).trim());
    }
    if (search && typeof search === 'string' && search.trim()) {
      // Strip PostgREST syntax injection characters (, ( ) %)
      const sanitizedQ = search.replace(/[,()%]/g, '').trim();
      if (sanitizedQ) {
        query = query.or(`title.ilike.%${sanitizedQ}%,summary.ilike.%${sanitizedQ}%`);
      }
    }

    query = query.order('published_date', { ascending: false });

    const safePage = Math.max(1, parseInt(page, 10) || 1);
    const safeLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const from = (safePage - 1) * safeLimit;
    const to = from + safeLimit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;
    if (error) {
      console.error('Supabase resources error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to query resources.' });
    }

    // Server-side expiry & batch eligibility enforcement
    const now = new Date();
    let filteredData = (data || []).filter((item) => {
      if (item.category_slug !== 'jobs') return true;

      // Allow admin / explicitly requested historical views
      if (includeExpired === 'true') return true;

      // Exclude explicitly expired or closed listings
      if (item.status === 'expired' || item.status === 'closed' || item.status === 'flagged_for_review') {
        return false;
      }

      // Live deadline & freshness check
      const lifecycle = evaluateJobLifecycle(item, { referenceTime: now });
      if (lifecycle.isExpired) {
        return false;
      }

      // Batch filter check (2026 / 2027)
      if (batch && ['2026', '2027'].includes(String(batch).trim())) {
        const targetBatch = parseInt(batch, 10);
        const batches = Array.isArray(item.eligible_batches) ? item.eligible_batches : [];
        const inBatches = batches.includes(targetBatch);
        const text = `${item.title} ${item.opportunity_data?.eligibility || ''} ${item.summary || ''}`;
        const extracted = extractBatchEligibility(text);
        if (!inBatches && !extracted.batches.includes(targetBatch)) {
          return false;
        }
      }

      return true;
    });

    res.json({
      success: true,
      data: filteredData,
      total: filteredData.length,
      page: safePage,
      totalPages: Math.ceil(filteredData.length / safeLimit),
    });
  } catch (err) {
    console.error('Resources API error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// -------------------------------------------------------------
// DEDICATED DECODE JOBS & INTERNSHIPS API (2026 & 2027 FRESHERS)
// -------------------------------------------------------------
app.get('/api/jobs', async (req, res) => {
  try {
    const {
      batch, // '2026', '2027', 'all'
      type, // 'Internship', 'Full-time', 'Graduate Trainee'
      mode, // 'Remote', 'Hybrid', 'On-site'
      stipend, // 'paid', 'all'
      category = 'all',
      role = 'all',
      location,
      workMode,
      experience,
      company,
      postedWithin,
      deadline,
      compensation,
      duration,
      domain,
      graduationYear,
      degree,
      branch,
      trainingProgram,
      apprenticeshipProgram,
      remoteEligibility,
      timezone,
      employmentType,
      skills,
      search,
      sort = 'recent', // 'recent', 'closing_soon'
      page = 1,
      limit = 30,
      includeExpired,
    } = req.query;

    let rawJobs = [];
    try {
      const { data: sbJobs, error: sbErr } = await supabase
        .from('decode_resources')
        .select('*')
        .eq('category_slug', 'jobs')
        .eq('published', true);
      if (!sbErr && Array.isArray(sbJobs)) {
        rawJobs = sbJobs;
      } else if (sbErr) {
        console.warn('Supabase jobs query warning:', sbErr.message);
      }
    } catch (sbEx) {
      console.warn('Supabase jobs exception:', sbEx.message);
    }

    // Merge with MongoDB database jobs (ensures full coverage of all 22 database jobs)
    try {
      if (mongoose.connection.readyState === 1) {
        const mongoJobs = await Job.find({ published: true }).lean();
        const existingSlugs = new Set(rawJobs.map((j) => j.slug));
        for (const mj of mongoJobs) {
          if (!existingSlugs.has(mj.slug)) {
            rawJobs.push(mj);
          }
        }
      }
    } catch (mErr) {
      console.warn('MongoDB jobs query warning:', mErr.message);
    }

    const now = new Date();

    // In-memory filter with full lifecycle & freshness evaluation
    let processed = (rawJobs || []).map((job) => {
      const lifecycle = evaluateJobLifecycle(job, { referenceTime: now });
      const classification = getJobClassification(job);
      const eligibility = extractBatchEligibility(
        `${job.title} ${job.summary} ${job.opportunity_data?.eligibility || ''}`,
        job.title
      );

      const batches = Array.isArray(job.eligible_batches) && job.eligible_batches.length > 0
        ? job.eligible_batches
        : eligibility.batches;

      return {
        ...job,
        ...classification,
        computedStatus: lifecycle.status,
        isExpired: lifecycle.isExpired,
        lifecycleReason: lifecycle.reason,
        effectiveBatches: batches,
        batchLabel:
          batches.length === 2
            ? '2026 & 2027 Batches'
            : batches.includes(2026)
            ? '2026 Batch'
            : batches.includes(2027)
            ? '2027 Batch'
            : 'Unknown (Check Source)',
        workMode: classification.verifiedWorkMode || job.work_arrangement || job.opportunity_data?.workMode || null,
        jobType: classification.verifiedEmploymentType || job.opportunity_type || job.opportunity_data?.jobType || null,
        stipendText: job.stipend_amount || job.opportunity_data?.stipend || null,
        deadlineText: job.application_deadline
          ? new Date(job.application_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : job.opportunity_data?.deadline || null,
      };
    });

    processed = processed.filter((job) => job.primaryCategory && job.roleCategory);

    // 1. Filter out expired jobs unless explicitly requested
    if (includeExpired !== 'true') {
      processed = processed.filter((j) => !j.isExpired && j.status !== 'closed' && j.status !== 'flagged_for_review');
    }

    // 2. Filter by Graduating Batch (2026 / 2027)
    if (batch && batch !== 'all') {
      const targetYear = parseInt(batch, 10);
      if ([2026, 2027].includes(targetYear)) {
        processed = processed.filter((j) => j.effectiveBatches.includes(targetYear));
      }
    }

    // 3. Filter by Opportunity Type (Internship / Full-time / Graduate Trainee)
    if (type && type !== 'all') {
      const cleanType = String(type).toLowerCase();
      processed = processed.filter((j) => String(j.jobType || '').toLowerCase().includes(cleanType));
    }

    // 4. Filter by Work Mode (Remote / Hybrid / On-site)
    if (mode && mode !== 'all') {
      const cleanMode = String(mode).toLowerCase();
      processed = processed.filter((j) => String(j.workMode || '').toLowerCase().includes(cleanMode));
    }

    // 5. Filter by Stipend / Paid
    if (stipend === 'paid') {
      processed = processed.filter(hasCompensationEvidence);
    }

    // 6. Category and role filters keep every listing in one assigned opportunity category.
    if (category && category !== 'all') {
      processed = processed.filter((job) => job.primaryCategory === category);
    }
    if (role && role !== 'all') {
      processed = processed.filter((job) => job.roleCategory === role);
    }
    if (workMode) {
      processed = processed.filter((job) => matchesText(job.workMode, workMode));
    }
    if (employmentType) {
      processed = processed.filter((job) => matchesText(job.jobType, employmentType));
    }
    if (location) {
      processed = processed.filter((job) => matchesText(`${job.opportunity_data?.location || ''} ${job.source_location || ''} ${(job.tags || []).join(' ')}`, location));
    }
    if (company) {
      processed = processed.filter((job) => matchesText(`${job.source_name || ''} ${job.opportunity_data?.organization || ''}`, company));
    }
    if (experience) {
      const verifiedExperience = (job) => job.opportunity_data?.experienceLevel || (job.experience_level !== 'Fresher' ? job.experience_level : '');
      processed = processed.filter((job) => matchesText(verifiedExperience(job), experience));
    }
    if (duration) {
      processed = processed.filter((job) => matchesText(job.duration || job.opportunity_data?.duration, duration));
    }
    if (domain) {
      processed = processed.filter((job) => matchesText(`${job.internship_domain || ''} ${job.opportunity_data?.internshipDomain || ''} ${(job.tags || []).join(' ')}`, domain));
    }
    if (graduationYear) {
      const year = parseInt(graduationYear, 10);
      processed = processed.filter((job) => Number.isInteger(year) && job.effectiveBatches.includes(year));
    }
    if (degree) {
      processed = processed.filter((job) => matchesText(`${job.degree_requirements || ''} ${job.opportunity_data?.degreeRequirements || ''} ${job.opportunity_data?.eligibility || ''}`, degree));
    }
    if (branch) {
      processed = processed.filter((job) => matchesText(`${job.branch_eligibility || ''} ${job.opportunity_data?.branchEligibility || ''} ${job.opportunity_data?.eligibility || ''}`, branch));
    }
    if (trainingProgram) {
      processed = processed.filter((job) => matchesText(`${job.training_program || ''} ${job.opportunity_data?.trainingProgram || ''}`, trainingProgram));
    }
    if (apprenticeshipProgram) {
      processed = processed.filter((job) => matchesText(`${job.apprenticeship_program || ''} ${job.opportunity_data?.apprenticeshipProgram || ''} ${(job.tags || []).join(' ')}`, apprenticeshipProgram));
    }
    if (remoteEligibility) {
      processed = processed.filter((job) => matchesText(`${job.remote_location_eligibility || ''} ${job.opportunity_data?.remoteLocationEligibility || ''}`, remoteEligibility));
    }
    if (timezone) {
      processed = processed.filter((job) => matchesText(`${job.timezone || ''} ${job.opportunity_data?.timezone || ''}`, timezone));
    }
    if (skills) {
      processed = processed.filter((job) => matchesText((job.tags || []).join(' '), skills));
    }
    if (compensation === 'paid') {
      processed = processed.filter(hasCompensationEvidence);
    } else if (compensation === 'unpaid') {
      processed = processed.filter(hasUnpaidEvidence);
    }
    if (deadline === 'dated') {
      processed = processed.filter(hasDatedDeadline);
    } else if (deadline === 'rolling') {
      processed = processed.filter(hasRollingDeadline);
    }
    if (postedWithin) {
      const ageLimit = parseInt(postedWithin, 10) * 24 * 60 * 60 * 1000;
      processed = processed.filter((job) => {
        const published = new Date(job.published_at || job.published_date || job.created_at || 0).getTime();
        const age = now.getTime() - published;
        return Number.isFinite(ageLimit) && age >= 0 && age <= ageLimit;
      });
    }

    // 7. Search query
    if (search && typeof search === 'string' && search.trim()) {
      const q = search.trim().toLowerCase();
      processed = processed.filter((j) => {
        const titleMatch = (j.title || '').toLowerCase().includes(q);
        const companyMatch = (j.source_name || j.opportunity_data?.organization || '').toLowerCase().includes(q);
        const roleMatch = (j.opportunity_data?.role || '').toLowerCase().includes(q);
        const eligibilityMatch = (j.opportunity_data?.eligibility || '').toLowerCase().includes(q);
        const tagsMatch = Array.isArray(j.tags) && j.tags.some((t) => t.toLowerCase().includes(q));
        const summaryMatch = (j.summary || '').toLowerCase().includes(q);
        return titleMatch || companyMatch || roleMatch || eligibilityMatch || tagsMatch || summaryMatch;
      });
    }

    // 8. Sort
    if (sort === 'closing_soon') {
      processed.sort((a, b) => {
        if (!a.application_deadline && !b.application_deadline) return 0;
        if (!a.application_deadline) return 1;
        if (!b.application_deadline) return -1;
        return new Date(a.application_deadline) - new Date(b.application_deadline);
      });
    } else {
      // Recent first
      processed.sort((a, b) => {
        const dateA = new Date(a.published_at || a.published_date || a.created_at || 0);
        const dateB = new Date(b.published_at || b.published_date || b.created_at || 0);
        return dateB - dateA;
      });
    }

    // Stats for UI header
    const stats = {
      totalActive: processed.filter((j) => !j.isExpired).length,
      batch2026Count: processed.filter((j) => j.effectiveBatches.includes(2026) && !j.isExpired).length,
      batch2027Count: processed.filter((j) => j.effectiveBatches.includes(2027) && !j.isExpired).length,
      internshipsCount: processed.filter((j) => String(j.jobType || '').toLowerCase().includes('intern') && !j.isExpired).length,
    };

    // Pagination
    const safePage = Math.max(1, parseInt(page, 10) || 1);
    const safeLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 30));
    const paginated = processed.slice((safePage - 1) * safeLimit, safePage * safeLimit);

    res.json({
      success: true,
      stats,
      total: processed.length,
      page: safePage,
      totalPages: Math.ceil(processed.length / safeLimit),
      data: paginated,
    });
  } catch (err) {
    console.error('Jobs API query error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Single Job Query with Detailed Expiry Status
app.get('/api/jobs/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    let job = null;
    try {
      const { data: sbJob } = await supabase
        .from('decode_resources')
        .select('*')
        .eq('category_slug', 'jobs')
        .eq('slug', slug)
        .maybeSingle();
      if (sbJob) job = sbJob;
    } catch (e) {
      console.warn('Supabase single job fetch error:', e.message);
    }

    if (!job && mongoose.connection.readyState === 1) {
      job = await Job.findOne({ slug, published: true }).lean();
    }

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job opportunity not found.' });
    }
    const classification = getJobClassification(job);
    if (!classification.primaryCategory || !classification.roleCategory) {
      return res.status(404).json({ success: false, message: 'This job does not have a verified opportunity and role classification.' });
    }

    const lifecycle = evaluateJobLifecycle(job);
    const eligibility = extractBatchEligibility(
      `${job.title} ${job.summary} ${job.opportunity_data?.eligibility || ''}`,
      job.title
    );

    res.json({
      success: true,
      data: {
        ...job,
        ...classification,
        computedStatus: lifecycle.status,
        isExpired: lifecycle.isExpired,
        lifecycleReason: lifecycle.reason,
        effectiveBatches: Array.isArray(job.eligible_batches) && job.eligible_batches.length > 0
          ? job.eligible_batches
          : eligibility.batches,
      },
    });
  } catch (err) {
    console.error('Single job API error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Scheduled Expiry Execution Route (Called by Cloudflare Cron Trigger or Server Scheduler)
app.post('/api/jobs/run-expiry', requireCronOrAdminAuth, async (req, res) => {
  try {
    const result = await expireStaleJobs(supabase);
    res.json({
      success: result.success,
      expiredCount: result.expiredCount || 0,
      timestamp: result.timestamp || new Date().toISOString(),
      message: result.message || `Job expiry completed: ${result.expiredCount || 0} listings expired.`,
    });
  } catch (err) {
    console.error('Job expiry endpoint error:', err);
    res.status(500).json({ success: false, message: 'Expiry execution failed.' });
  }
});

// -------------------------------------------------------------
// ADMINISTRATIVE JOB INGESTION & MANAGEMENT ROUTES (PROTECTED)
// -------------------------------------------------------------

// URL Importer: Ingests an opportunity from a URL with SSRF protection & deduplication
app.post('/api/admin/jobs/import-url', requireAdminAuth, importLimiter, async (req, res) => {
  try {
    const {
      url,
      batchOverride,
      typeOverride,
      deadlineOverride,
      primaryCategory,
      roleCategory,
      titleOverride,
      summaryOverride,
      companyOverride,
      locationOverride,
      workModeOverride,
      experienceLevelOverride,
      stipendOverride,
      duration,
      internshipDomain,
      degreeRequirements,
      branchEligibility,
      trainingProgram,
      apprenticeshipProgram,
      remoteLocationEligibility,
      timezone,
    } = req.body || {};
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ success: false, message: 'Valid job URL is required.' });
    }
    if (!primaryCategorySlugs.has(primaryCategory) || !roleCategorySlugs.has(roleCategory)) {
      return res.status(400).json({ success: false, message: 'A valid primaryCategory and roleCategory are required.' });
    }

    if (!isSafePublicUrl(url)) {
      return res.status(400).json({
        success: false,
        message: 'Security Violation: Provided URL failed SSRF validation (private/internal IP or invalid protocol).',
      });
    }

    // Extract source metadata; classification and employment facts require explicit admin input.
    const parsed = await parseJobPostingFromUrl(url);

    if (Array.isArray(batchOverride) && batchOverride.length > 0) {
      parsed.eligibleBatches = batchOverride.map(Number);
    }
    const title = sanitizeText(titleOverride || parsed.title, 200);
    const summary = sanitizeText(summaryOverride || parsed.summary, 500);
    const company = sanitizeText(companyOverride || parsed.company, 100);
    const location = sanitizeText(locationOverride, 200);
    const workMode = ['Remote', 'Hybrid', 'On-site'].find((modeValue) => modeValue.toLowerCase() === String(workModeOverride || '').toLowerCase());
    const opportunityType = sanitizeText(typeOverride, 50);
    const experienceLevel = sanitizeText(experienceLevelOverride, 200) || null;
    const stipend = sanitizeText(stipendOverride, 100) || null;
    if (!title || !summary || !company || !location || !workMode || !opportunityType) {
      return res.status(400).json({
        success: false,
        message: 'The official source must provide a title and description; company, location, work mode, and employment type must be verified and supplied.',
      });
    }
    if ((primaryCategory === 'remote') !== (workMode === 'Remote')) {
      return res.status(400).json({
        success: false,
        message: 'Remote opportunities must use the Remote Jobs category; other categories require a non-remote work mode.',
      });
    }
    if (deadlineOverride) {
      const norm = normalizeDeadline(deadlineOverride);
      if (norm.deadlineDate) parsed.applicationDeadline = norm.isoString;
    }
    const slug = `${company}-${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 100);
    if (!slug) {
      return res.status(400).json({ success: false, message: 'A valid job title and company are required to create a listing.' });
    }
    const optionalMetadata = {
      duration: sanitizeText(duration, 100) || null,
      internship_domain: sanitizeText(internshipDomain, 100) || null,
      degree_requirements: sanitizeText(degreeRequirements, 300) || null,
      branch_eligibility: sanitizeText(branchEligibility, 300) || null,
      training_program: sanitizeText(trainingProgram, 200) || null,
      apprenticeship_program: sanitizeText(apprenticeshipProgram, 100) || null,
      remote_location_eligibility: sanitizeText(remoteLocationEligibility, 300) || null,
      timezone: sanitizeText(timezone, 100) || null,
    };

    // 2. Canonical Deduplication Check
    const { data: existingJob } = await supabase
      .from('decode_resources')
      .select('id, slug, title, canonical_url')
      .eq('canonical_url', parsed.canonicalUrl)
      .maybeSingle();

    const { data: slugConflict } = await supabase
      .from('decode_resources')
      .select('id, canonical_url')
      .eq('slug', slug)
      .maybeSingle();
    if (slugConflict && slugConflict.canonical_url !== parsed.canonicalUrl) {
      return res.status(409).json({ success: false, message: 'A different job already uses this listing slug.' });
    }

    if (existingJob) {
      // Update existing record rather than creating duplicate
      const { data: updated, error: updateErr } = await supabase
        .from('decode_resources')
        .update({
          title,
          summary,
          content: summary,
          source_name: company,
          source_location: location,
          primary_category: primaryCategory,
          role_category: roleCategory,
          experience_level: experienceLevel,
          opportunity_type: opportunityType,
          work_arrangement: workMode,
          stipend_amount: stipend,
          is_stipend_paid: stipend ? !/unpaid|voluntary/i.test(stipend) : null,
          ...optionalMetadata,
          status: 'active',
          application_deadline: parsed.applicationDeadline,
          eligible_batches: parsed.eligibleBatches,
          opportunity_data: {
            organization: company,
            role: title,
            eligibility: parsed.batchLabel || null,
            deadline: parsed.applicationDeadline,
            location,
            workMode,
            jobType: opportunityType,
            experienceLevel,
            stipend,
            officialUrl: parsed.officialUrl,
            ...Object.fromEntries(Object.entries(optionalMetadata).map(([key, value]) => [key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()), value])),
            isVerified: true,
          },
          last_verified_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          verification_notes: 'Re-verified and classified via Admin URL Importer',
        })
        .eq('id', existingJob.id)
        .select()
        .single();

      if (updateErr) {
        return res.status(500).json({ success: false, message: 'Failed to update existing job record.' });
      }

      return res.json({
        success: true,
        action: 'updated',
        message: `Existing listing "${existingJob.title}" updated and re-verified.`,
        data: updated,
      });
    }

    // 3. Insert New Job Listing
    const newJobRecord = {
      slug,
      category_slug: 'jobs',
      title,
      summary,
      content: summary,
      author: 'Raju Perumalla (Decode Bot)',
      published_date: new Date().toISOString().split('T')[0],
      source_name: company,
      source_location: location,
      action_text: 'Apply →',
      deadline_text: parsed.applicationDeadline
        ? `Deadline: ${new Date(parsed.applicationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
        : null,
      is_featured: false,
      published: true,
      status: 'active',
      application_deadline: parsed.applicationDeadline,
      eligible_batches: parsed.eligibleBatches,
      primary_category: primaryCategory,
      role_category: roleCategory,
      experience_level: experienceLevel,
      opportunity_type: opportunityType,
      work_arrangement: workMode,
      stipend_amount: stipend,
      is_stipend_paid: stipend ? !/unpaid|voluntary/i.test(stipend) : null,
      ...optionalMetadata,
      source_platform: 'admin_importer',
      canonical_url: parsed.canonicalUrl,
      auto_imported: true,
      last_verified_at: new Date().toISOString(),
      opportunity_data: {
        organization: company,
        role: title,
        eligibility: parsed.batchLabel || null,
        deadline: parsed.applicationDeadline,
        location,
        workMode,
        jobType: opportunityType,
        experienceLevel,
        stipend,
        officialUrl: parsed.officialUrl,
        duration: optionalMetadata.duration,
        internshipDomain: optionalMetadata.internship_domain,
        degreeRequirements: optionalMetadata.degree_requirements,
        branchEligibility: optionalMetadata.branch_eligibility,
        trainingProgram: optionalMetadata.training_program,
        apprenticeshipProgram: optionalMetadata.apprenticeship_program,
        remoteLocationEligibility: optionalMetadata.remote_location_eligibility,
        timezone: optionalMetadata.timezone,
        isVerified: true,
      },
    };

    const { data: created, error: insertErr } = await supabase
      .from('decode_resources')
      .insert([newJobRecord])
      .select()
      .single();

    if (insertErr) {
      console.error('Job creation error:', insertErr.message);
      return res.status(500).json({ success: false, message: 'Failed to create job listing.' });
    }

    res.status(201).json({
      success: true,
      action: 'created',
      message: `Job listing "${title}" successfully ingested, classified, and verified.`,
      data: created,
    });
  } catch (err) {
    console.error('Import URL error:', err);
    res.status(500).json({ success: false, message: err.message || 'Import failed.' });
  }
});

// Admin Update Job Listing (Close early, flag, modify status or deadline)
app.put('/api/admin/jobs/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      application_deadline,
      eligible_batches,
      verification_notes,
      is_featured,
      primaryCategory,
      roleCategory,
      experienceLevel,
      opportunityType,
      workArrangement,
      duration,
      internshipDomain,
      degreeRequirements,
      branchEligibility,
      trainingProgram,
      apprenticeshipProgram,
      remoteLocationEligibility,
      timezone,
    } = req.body || {};

    const updates = {
      updated_at: new Date().toISOString(),
      last_verified_at: new Date().toISOString(),
    };

    if (status && ['active', 'expired', 'closed', 'flagged_for_review'].includes(status)) {
      updates.status = status;
    }
    if (application_deadline !== undefined) {
      updates.application_deadline = application_deadline ? normalizeDeadline(application_deadline).isoString : null;
    }
    if (Array.isArray(eligible_batches)) {
      updates.eligible_batches = eligible_batches.map(Number);
    }
    if (verification_notes !== undefined) {
      updates.verification_notes = sanitizeText(verification_notes, 500);
    }
    if (is_featured !== undefined) {
      updates.is_featured = Boolean(is_featured);
    }
    if ((primaryCategory !== undefined) !== (workArrangement !== undefined)) {
      return res.status(400).json({
        success: false,
        message: 'Update primaryCategory and workArrangement together so remote opportunities remain in the Remote Jobs category.',
      });
    }
    if (primaryCategory !== undefined) {
      if (!primaryCategorySlugs.has(primaryCategory)) {
        return res.status(400).json({ success: false, message: 'Invalid primaryCategory.' });
      }
      updates.primary_category = primaryCategory;
    }
    if (roleCategory !== undefined) {
      if (!roleCategorySlugs.has(roleCategory)) {
        return res.status(400).json({ success: false, message: 'Invalid roleCategory.' });
      }
      updates.role_category = roleCategory;
    }
    if (experienceLevel !== undefined) updates.experience_level = sanitizeText(experienceLevel, 200) || null;
    if (opportunityType !== undefined) updates.opportunity_type = sanitizeText(opportunityType, 50) || null;
    if (workArrangement !== undefined) {
      const verifiedMode = ['Remote', 'Hybrid', 'On-site'].find((modeValue) => modeValue.toLowerCase() === String(workArrangement).toLowerCase());
      if (!verifiedMode) return res.status(400).json({ success: false, message: 'Invalid workArrangement.' });
      if ((primaryCategory === 'remote') !== (verifiedMode === 'Remote')) {
        return res.status(400).json({ success: false, message: 'Remote opportunities must use the Remote Jobs category.' });
      }
      updates.work_arrangement = verifiedMode;
    }
    const metadataFields = {
      duration: [duration, 100],
      internship_domain: [internshipDomain, 100],
      degree_requirements: [degreeRequirements, 300],
      branch_eligibility: [branchEligibility, 300],
      training_program: [trainingProgram, 200],
      apprenticeship_program: [apprenticeshipProgram, 100],
      remote_location_eligibility: [remoteLocationEligibility, 300],
      timezone: [timezone, 100],
    };
    for (const [field, [value, maxLength]] of Object.entries(metadataFields)) {
      if (value !== undefined) updates[field] = sanitizeText(value, maxLength) || null;
    }

    const { data, error } = await supabase
      .from('decode_resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    res.json({ success: true, message: 'Job opportunity updated successfully.', data });
  } catch (err) {
    console.error('Update job error:', err);
    res.status(500).json({ success: false, message: 'Failed to update job.' });
  }
});

// Admin Delete Job Listing
app.delete('/api/admin/jobs/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('decode_resources')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    res.json({ success: true, message: 'Job opportunity deleted successfully.' });
  } catch (err) {
    console.error('Delete job error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete job.' });
  }
});

// Decode Single Resource API
app.get('/api/decode/resources/:categorySlug/:slug', async (req, res) => {
  try {
    const { categorySlug, slug } = req.params;
    let query = supabase
      .from('decode_resources')
      .select('*')
      .eq('slug', slug)
      .eq('published', true);

    if (categorySlug && categorySlug !== 'all') {
      query = query.eq('category_slug', categorySlug);
    }

    let resourceData = data;
    if (!resourceData && (!categorySlug || categorySlug === 'jobs') && mongoose.connection.readyState === 1) {
      resourceData = await Job.findOne({ slug, published: true }).lean();
    }

    if (!resourceData) {
      return res.status(404).json({ success: false, message: 'Resource not found.' });
    }
    res.json({ success: true, data: resourceData });
  } catch (err) {
    console.error('Single resource API error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// -------------------------------------------------------------
// SECURE FIRST-PARTY OUTBOUND REDIRECT & ATTRIBUTION SYSTEM
// -------------------------------------------------------------
app.get('/go/:slug', redirectLimiter, async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.redirect(302, 'https://www.rajuperumalla.in/decode');
    }

    // 1. Resolve from Supabase database
    const { data: resource } = await supabase
      .from('decode_resources')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    let destinationUrl = resource?.opportunity_data?.officialUrl || resource?.opportunity_data?.official_url || resource?.official_url || null;

    if (!destinationUrl && mongoose.connection.readyState === 1) {
      const mJob = await Job.findOne({ slug, published: true }).lean();
      destinationUrl = mJob?.opportunity_data?.officialUrl || mJob?.opportunity_data?.official_url || mJob?.official_url || null;
    }

    // Verified destinations allowlist dictionary
    if (!destinationUrl) {
      const fallbackDestinations = {
        'clearview-healthcare-data-analyst-advanced-analytics': 'https://www.clearviewhcp.com/careers/',
        'cisco-graduate-engineer-trainee-2026': 'https://jobs.cisco.com/',
        'amazon-software-dev-engineer-intern-2027': 'https://www.amazon.jobs/',
        'tcs-digital-associate-software-engineer-2026': 'https://www.tcs.com/careers',
        'goldman-sachs-engineering-summer-analyst-2027': 'https://www.goldmansachs.com/careers',
        'google-summer-of-code-internship-guide': 'https://summerofcode.withgoogle.com/',
        'microsoft-software-engineering-internship-2026': 'https://careers.microsoft.com/',
        'lfx-mentorship-open-source-internship': 'https://lfx.linuxfoundation.org/tools/mentorship/',
        'mlh-fellowship-software-engineering': 'https://fellowship.mlh.io/',
        'smart-india-hackathon-sih-strategy': 'https://www.sih.gov.in/',
        'sap-innovation-marathon-guide': 'https://www.sap.com/',
        'fastapi-production-handbook': 'https://fastapi.tiangolo.com/',
        'full-stack-system-design-primer': 'https://github.com/donnemartin/system-design-primer',
        'docker-containerization-guide': 'https://docs.docker.com/',
        'github-student-developer-pack-guide': 'https://education.github.com/pack',
        'ibm-intern-associate-engineer-bangalore-137023': 'https://careers.ibm.com/en_US/careers/JobDetail?jobId=137023&source=SN_LinkedIn',
        'salesforce-summer-2027-intern-ui-ux-designer': 'https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/India---Hyderabad/Summer-2027-Intern---UI-UX-Designer_JR363342?utm_source=chatgpt.com',
        'honeywell-intern-bachelors-mechanical-eng-2027': 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6504&utm_source=chatgpt.com',
        'pwc-business-ai-engineer-intern-2027': 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6501&utm_source=chatgpt.com',
        'hsbc-intern-apprentice-12-months-gurugram': 'https://portal.careers.hsbc.com/careers/job/563774612428195-intern-apprentice-12-months--gurugram-haryana-india?domain=hsbc.com&utm_source=chatgpt.com',
        'standard-chartered-apprentice-operations-gbs-india-2026': 'https://jobs.standardchartered.com/job/Apprentice-Operations-GBS-India-2026/58757-en_GB?utm_source=lilimitedlistings&feedid=363857',
        'recruit-crm-customer-success-associate-2027': 'https://careers.recruitcrm.io/17915624986970157266mLh?utm_source=internal+hiring+&utm_medium=job+candidate+&utm_campaign=hiring+',
      };
      destinationUrl = fallbackDestinations[slug];
    }

    if (!destinationUrl) {
      return res.redirect(302, 'https://www.rajuperumalla.in/decode');
    }

    // 2. Validate destination URL strictly (Strict protocol whitelist)
    let parsedUrl;
    try {
      parsedUrl = new URL(destinationUrl);
      if (!['https:', 'http:'].includes(parsedUrl.protocol)) {
        return res.status(400).send('Invalid destination protocol.');
      }
      if (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1') {
        return res.redirect(302, 'https://www.rajuperumalla.in/decode');
      }
    } catch {
      return res.redirect(302, 'https://www.rajuperumalla.in/decode');
    }

    // 3. Attach UTM parameters without overwriting existing query parameters
    if (!parsedUrl.searchParams.has('utm_source')) {
      parsedUrl.searchParams.set('utm_source', 'rajuperumalla.in');
    }
    if (!parsedUrl.searchParams.has('utm_medium')) {
      parsedUrl.searchParams.set('utm_medium', 'referral');
    }
    if (!parsedUrl.searchParams.has('utm_campaign')) {
      parsedUrl.searchParams.set('utm_campaign', 'decode');
    }

    const finalUrl = parsedUrl.toString();
    const domain = parsedUrl.hostname.replace(/^www\./, '');

    // 4. Record outbound click asynchronously in Supabase (privacy-conscious)
    const rawReferrer = req.get('referrer') || req.get('referer') || null;
    const isMobile = /Mobi|Android/i.test(req.get('user-agent') || '');

    supabase.from('decode_outbound_clicks').insert([{
      resource_slug: slug,
      category_slug: resource?.category_slug || 'jobs',
      resource_title: resource?.title || slug,
      destination_domain: domain,
      destination_url: destinationUrl,
      referrer: rawReferrer ? String(rawReferrer).slice(0, 500) : null,
      utm_source: 'rajuperumalla.in',
      utm_medium: 'referral',
      utm_campaign: 'decode',
      user_agent_type: isMobile ? 'mobile' : 'desktop',
    }]).then(() => {}).catch(err => console.warn('Outbound click record failed:', err.message));

    // 5. Temporary 302 redirect so subsequent visits continue to be recorded
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.redirect(302, finalUrl);
  } catch (err) {
    console.error('Redirect handler error:', err);
    return res.redirect(302, 'https://www.rajuperumalla.in/decode');
  }
});

// Outbound Click Tracking API
app.post('/api/decode/track-click', clickLimiter, async (req, res) => {
  try {
    const { resource_slug, category_slug, resource_title, destination_url, referrer } = req.body || {};
    if (!resource_slug || !destination_url) {
      return res.status(400).json({ success: false, message: 'Missing required click parameters.' });
    }

    let domain = '';
    try {
      const parsed = new URL(destination_url);
      if (!['https:', 'http:'].includes(parsed.protocol)) {
        return res.status(400).json({ success: false, message: 'Invalid destination protocol.' });
      }
      domain = parsed.hostname.replace(/^www\./, '');
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid destination URL format.' });
    }

    const isMobile = /Mobi|Android/i.test(req.get('user-agent') || '');

    const { error } = await supabase.from('decode_outbound_clicks').insert([{
      resource_slug: String(resource_slug).slice(0, 200),
      category_slug: String(category_slug || 'general').slice(0, 100),
      resource_title: String(resource_title || resource_slug).slice(0, 200),
      destination_domain: domain,
      destination_url: String(destination_url).slice(0, 1000),
      referrer: referrer ? String(referrer).slice(0, 500) : (req.get('referrer') || null),
      utm_source: 'rajuperumalla.in',
      utm_medium: 'referral',
      utm_campaign: 'decode',
      user_agent_type: isMobile ? 'mobile' : 'desktop',
    }]);

    if (error) {
      console.error('Supabase click track error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to record click.' });
    }

    res.json({ success: true, message: 'Outbound click recorded successfully.' });
  } catch (err) {
    console.error('Track click API error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Outbound Analytics Aggregation API
app.get('/api/decode/analytics/outbound', async (req, res) => {
  try {
    const { data, count, error } = await supabase
      .from('decode_outbound_clicks')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      console.error('Supabase analytics query error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to load analytics data.' });
    }

    const byCategory = {};
    const byDomain = {};

    (data || []).forEach(c => {
      byCategory[c.category_slug] = (byCategory[c.category_slug] || 0) + 1;
      byDomain[c.destination_domain] = (byDomain[c.destination_domain] || 0) + 1;
    });

    const topDomains = Object.entries(byDomain)
      .map(([domain, clicks]) => ({ domain, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    res.json({
      success: true,
      totalClicks: count || (data?.length || 0),
      byCategory,
      topDomains,
      recentClicks: (data || []).slice(0, 10),
    });
  } catch (err) {
    console.error('Analytics aggregation error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Contact Route (Input Sanitization + Validation + Rate Limiting)
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    // 1. Presence Validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields (name, email, message) are required.' });
    }

    // 2. Length Bounds & Sanitization
    const cleanName = String(name).trim().slice(0, 100);
    const cleanEmail = String(email).trim().toLowerCase().slice(0, 150);
    const cleanMessage = String(message).trim().slice(0, 3000);

    if (cleanName.length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters.' });
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (cleanMessage.length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
    }

    // 3. Store in Supabase Database (Primary)
    let supabaseSaved = false;
    try {
      const { error: sbError } = await supabase
        .from('contact_messages')
        .insert([{ name: cleanName, email: cleanEmail, message: cleanMessage }]);

      if (sbError) {
        console.error('Supabase contact_messages insert error:', sbError.message);
      } else {
        supabaseSaved = true;
      }
    } catch (sbErr) {
      console.error('Supabase execution error:', sbErr.message);
    }

    // 4. Backup Store in MongoDB (if connected)
    try {
      if (mongoose.connection.readyState === 1) {
        const newContact = new Contact({ name: cleanName, email: cleanEmail, message: cleanMessage });
        await newContact.save();
      }
    } catch (mongoErr) {
      console.warn('MongoDB backup save skipped:', mongoErr.message);
    }

    // 5. EmailJS API Notification (if credentials configured)
    if (process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID) {
      const now = new Date();
      const timestamp = now.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata' });
      const initials = cleanName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

      const emailJsPayload = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: cleanName,
          reply_to: cleanEmail,
          message: cleanMessage,
          timestamp: timestamp,
          initials: initials
        }
      };

      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailJsPayload)
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('EmailJS Error:', errorText);
        }
      } catch (emailError) {
        console.error('Failed to contact EmailJS API:', emailError.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message sent and stored successfully!',
      supabaseSaved
    });
  } catch (error) {
    console.error('Error handling contact message:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again later.' });
  }
});

// GET /api/contacts - Protected Administrative Route
app.get('/api/contacts', requireAdminAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase contact retrieval error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to retrieve messages.' });
    }
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    console.error('Admin contacts error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// GET /api/profile - Retrieve Portfolio Profile info
app.get('/api/profile', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('portfolio_profile')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Profile fetch error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to retrieve profile.' });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('Profile API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// GET /api/projects - Retrieve All Projects
app.get('/api/projects', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Projects fetch error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to retrieve projects.' });
    }
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    console.error('Projects API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// GET /api/skills - Retrieve All Skills
app.get('/api/skills', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.error('Skills fetch error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to retrieve skills.' });
    }
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    console.error('Skills API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// GET /api/achievements - Retrieve Milestones & Achievements
app.get('/api/achievements', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Achievements fetch error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to retrieve achievements.' });
    }
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    console.error('Achievements API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// GET /api/assets - Retrieve Important Files, Logos & Videos Metadata
app.get('/api/assets', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('important_assets')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.error('Assets fetch error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to retrieve assets.' });
    }
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    console.error('Assets API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Start Server & Background Expiry Task
const server = app.listen(PORT, () => {
  console.log(`Server running securely on port ${PORT}`);

  // 1. Run initial job expiry check on startup
  expireStaleJobs(supabase)
    .then((res) => {
      if (res && res.expiredCount > 0) {
        console.log(`[Expiry Scheduler] Initial startup expired ${res.expiredCount} listings.`);
      }
    })
    .catch((err) => console.warn('[Expiry Scheduler] Initial check skipped or Supabase offline:', err.message));

  // 2. Schedule hourly expiry verification (Every 60 minutes)
  const EXPIRY_INTERVAL_MS = 60 * 60 * 1000;
  setInterval(() => {
    expireStaleJobs(supabase)
      .then((res) => {
        if (res && res.expiredCount > 0) {
          console.log(`[Expiry Scheduler] Hourly sweep expired ${res.expiredCount} listings.`);
        }
      })
      .catch((err) => console.warn('[Expiry Scheduler] Sweep error:', err.message));
  }, EXPIRY_INTERVAL_MS);
});

module.exports = { app, server };

