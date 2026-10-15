/**
 * DECODE AUTOMATED JOB & INTERNSHIP MANAGEMENT SERVICE
 * Handles server-side expiry, 2026/2027 eligibility classification,
 * SSRF-safe URL import, canonical deduplication, and public feed syncing.
 */

// Freshness window in days for listings with no explicit deadline
const DEFAULT_NO_DEADLINE_FRESHNESS_DAYS = 45;

/**
 * Validates URLs against SSRF (Server-Side Request Forgery) attacks.
 * Prohibits private networks, loopbacks, cloud metadata services, and non-http(s) protocols.
 */
function isSafePublicUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  try {
    const parsed = new URL(urlString.trim());
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    const hostname = parsed.hostname.toLowerCase();

    // Disallow loopback, localhost, and internal hostnames
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname === '0.0.0.0' ||
      hostname === '::1' ||
      hostname === '127.0.0.1'
    ) {
      return false;
    }

    // Disallow Cloud Metadata IP (AWS, GCP, Azure, DigitalOcean)
    if (hostname === '169.254.169.254' || hostname.startsWith('169.254.')) {
      return false;
    }

    // Disallow IPv4 Private Address Blocks (RFC 1918)
    // 10.0.0.0/8
    if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) return false;
    // 172.16.0.0/12
    const m172 = hostname.match(/^172\.(\d{1,3})\.\d{1,3}\.\d{1,3}$/);
    if (m172) {
      const secondOctet = parseInt(m172[1], 10);
      if (secondOctet >= 16 && secondOctet <= 31) return false;
    }
    // 192.168.0.0/16
    if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname)) return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * Standardize deadline date parsing using consistent UTC end-of-day.
 * A date-only string '2026-04-30' becomes '2026-04-30T23:59:59.999Z'.
 */
function normalizeDeadline(deadlineInput) {
  if (!deadlineInput) {
    return { isoString: null, isRolling: true, deadlineDate: null };
  }

  const str = String(deadlineInput).trim();
  const lower = str.toLowerCase();

  // Detect rolling admissions / no specific fixed calendar date
  if (
    lower.includes('rolling') ||
    lower.includes('actively') ||
    lower.includes('ongoing') ||
    lower.includes('asap') ||
    lower.includes('open until filled')
  ) {
    return { isoString: null, isRolling: true, deadlineDate: null, rawText: str };
  }

  // Check for ISO YYYY-MM-DD
  const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    // Construct end-of-day UTC for fair expiry
    const isoString = `${y}-${m}-${d}T23:59:59.999Z`;
    const deadlineDate = new Date(isoString);
    return {
      isoString,
      isRolling: false,
      deadlineDate: isNaN(deadlineDate.getTime()) ? null : deadlineDate,
      rawText: str,
    };
  }

  // Attempt standard Date parse
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return {
      isoString: parsed.toISOString(),
      isRolling: false,
      deadlineDate: parsed,
      rawText: str,
    };
  }

  return { isoString: null, isRolling: true, deadlineDate: null, rawText: str };
}

/**
 * Server-side expiry check for any job listing.
 * Evaluates deadline in UTC and enforces freshness policy for undated roles.
 */
function evaluateJobLifecycle(job, options = {}) {
  const now = options.referenceTime ? new Date(options.referenceTime) : new Date();
  const freshnessDays = options.freshnessDays || DEFAULT_NO_DEADLINE_FRESHNESS_DAYS;

  // 1. Manually or source closed
  if (job.status === 'closed') {
    return {
      status: 'closed',
      isExpired: true,
      reason: 'Source marked as closed or hiring ended',
    };
  }

  if (job.status === 'flagged_for_review') {
    return {
      status: 'flagged_for_review',
      isExpired: true,
      reason: 'Flagged for administrator review',
    };
  }

  // 2. Evaluate explicit deadline
  const deadlineValue = job.application_deadline || job.opportunity?.deadline || job.opportunity_data?.deadline;
  const normalized = normalizeDeadline(deadlineValue);

  if (normalized.deadlineDate) {
    if (normalized.deadlineDate.getTime() < now.getTime()) {
      return {
        status: 'expired',
        isExpired: true,
        reason: `Application deadline passed (${normalized.isoString})`,
        deadline: normalized.isoString,
      };
    }
    return {
      status: 'active',
      isExpired: false,
      reason: 'Upcoming deadline valid',
      deadline: normalized.isoString,
    };
  }

  // 3. Fallback Freshness Policy for listings without a fixed deadline
  const referenceDateStr =
    job.last_verified_at ||
    job.published_at ||
    job.published_date ||
    job.updated_date ||
    job.created_at;

  if (referenceDateStr) {
    const refDate = new Date(referenceDateStr);
    if (!isNaN(refDate.getTime())) {
      const ageMs = now.getTime() - refDate.getTime();
      const ageDays = ageMs / (1000 * 60 * 60 * 24);
      if (ageDays > freshnessDays) {
        return {
          status: 'expired',
          isExpired: true,
          reason: `No deadline provided and listing exceeded ${freshnessDays}-day freshness window without re-verification`,
          ageDays: Math.round(ageDays),
        };
      }
    }
  }

  return {
    status: job.status || 'active',
    isExpired: job.status === 'expired',
    reason: 'Listing is active and within freshness window',
  };
}

/**
 * Intelligent extraction of 2026 and 2027 batch eligibility from text and qualifications.
 * Accurately determines if role targets 2026, 2027, both, or unknown.
 */
function extractBatchEligibility(text, title = '') {
  const combined = `${title} ${text}`.toLowerCase();
  const eligibleBatches = new Set();
  let verified = false;

  // Strip seasonal internship cycle references (e.g. "Summer 2026", "Winter 2026", "Internship 2026")
  // so calendar terms are not falsely identified as the candidate's graduation year
  const textWithoutSeasons = combined
    .replace(/(?:summer|winter|fall|spring|internship|intern)\s+(?:of\s+)?2026\b/gi, '')
    .replace(/(?:summer|winter|fall|spring|internship|intern)\s+(?:of\s+)?2027\b/gi, '');

  const hasExplicit2026 =
    /\b(2026\s*(?:batch|passout|graduat|pass-out)|(?:batch|class\s*of|graduating|passout)\s*(?:in|year)?\s*[:\s]*2026|'26\s*batch)\b/i.test(combined) ||
    /\b2026\b/.test(textWithoutSeasons);

  const hasExplicit2027 =
    /\b(2027\s*(?:batch|passout|graduat|pass-out)|(?:batch|class\s*of|graduating|passout)\s*(?:in|year)?\s*[:\s]*2027|'27\s*batch)\b/i.test(combined) ||
    /\b2027\b/.test(textWithoutSeasons);

  if (hasExplicit2026) {
    eligibleBatches.add(2026);
    verified = true;
  }
  if (hasExplicit2027) {
    eligibleBatches.add(2027);
    verified = true;
  }

  // Semantic university standing patterns
  // "Final year students" -> 2026 batch for 2025-2026 academic calendar
  if (
    (combined.includes('final year') || combined.includes('graduating year') || combined.includes('senior year')) &&
    !hasExplicit2027
  ) {
    eligibleBatches.add(2026);
    verified = true;
  }

  // "Pre-final year" or "3rd year" -> 2027 batch for 4-year engineering degrees
  if (
    combined.includes('pre-final') ||
    combined.includes('pre final') ||
    combined.includes('penultimate') ||
    combined.includes('3rd year') ||
    combined.includes('third year')
  ) {
    eligibleBatches.add(2027);
    verified = true;
  }

  // Freshers with generic eligibility (e.g. "0-1 years", "Graduate Engineer Trainee", "Open to all enrolled students")
  const isGenericFresher =
    combined.includes('graduate engineer trainee') ||
    combined.includes('associate software engineer') ||
    combined.includes('fresher') ||
    combined.includes('0 years') ||
    combined.includes('no experience required') ||
    combined.includes('campus hiring');

  if (isGenericFresher && eligibleBatches.size === 0) {
    // Label clearly as freshers open to eligible graduating cohorts
    eligibleBatches.add(2026);
    eligibleBatches.add(2027);
    verified = true;
  }

  // If GSoC / MLH / open-source student program: open to all enrolled college students
  if (combined.includes('summer of code') || combined.includes('fellowship') || combined.includes('lfx')) {
    eligibleBatches.add(2026);
    eligibleBatches.add(2027);
    verified = true;
  }

  return {
    batches: Array.from(eligibleBatches).sort(),
    isVerified: verified,
    label:
      eligibleBatches.size === 2
        ? '2026 & 2027 Batches'
        : eligibleBatches.has(2026)
        ? '2026 Batch'
        : eligibleBatches.has(2027)
        ? '2027 Batch'
        : 'Unknown (Check Source)',
  };
}

/**
 * Deduplicate canonical URL by stripping tracking parameters (utm_*, gclid, fbclid, etc.)
 */
function cleanCanonicalUrl(rawUrl) {
  if (!rawUrl) return null;
  try {
    const u = new URL(rawUrl.trim());
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'gclid', 'fbclid', 'ref', 'source', 'trk', 'trackingId'
    ];
    trackingParams.forEach((param) => u.searchParams.delete(param));
    // Remove trailing slash for uniformity
    let pathname = u.pathname.replace(/\/+$/, '');
    return `${u.protocol}//${u.hostname}${pathname}${u.search}`;
  } catch {
    return rawUrl.trim();
  }
}

/**
 * Sanitize plain text or markdown to prevent script injection
 */
function sanitizeText(str, maxLength = 5000) {
  if (!str) return '';
  return String(str)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .slice(0, maxLength)
    .trim();
}

/**
 * Run database expiry execution.
 * Finds all active jobs past deadline or past freshness window and sets status = 'expired'.
 */
async function expireStaleJobs(supabase) {
  if (!supabase) {
    return { success: false, error: 'Supabase client unavailable' };
  }

  try {
    const now = new Date();
    const nowIso = now.toISOString();

    // 1. Mark past-deadline jobs as expired in database
    const { data: expiredList, error: queryErr } = await supabase
      .from('decode_resources')
      .select('id, slug, title, application_deadline, last_verified_at, published_at, status')
      .eq('category_slug', 'jobs')
      .eq('status', 'active');

    if (queryErr) {
      console.error('Supabase query error during expiry execution:', queryErr.message);
      return { success: false, error: queryErr.message };
    }

    const toExpireIds = [];
    const reasonsMap = {};

    (expiredList || []).forEach((job) => {
      const evaluation = evaluateJobLifecycle(job, { referenceTime: now });
      if (evaluation.isExpired && evaluation.status === 'expired') {
        toExpireIds.push(job.id);
        reasonsMap[job.id] = evaluation.reason;
      }
    });

    if (toExpireIds.length > 0) {
      const { error: updateErr } = await supabase
        .from('decode_resources')
        .update({
          status: 'expired',
          updated_at: nowIso,
          verification_notes: 'Automatically marked expired by Decode Expiry Worker',
        })
        .in('id', toExpireIds);

      if (updateErr) {
        console.error('Failed to update expired jobs:', updateErr.message);
        return { success: false, error: updateErr.message };
      }

      console.log(`[Decode Expiry Worker] Expired ${toExpireIds.length} stale job(s) at ${nowIso}`);
      return {
        success: true,
        expiredCount: toExpireIds.length,
        expiredIds: toExpireIds,
        timestamp: nowIso,
      };
    }

    return {
      success: true,
      expiredCount: 0,
      timestamp: nowIso,
      message: 'All active job listings are valid and fresh',
    };
  } catch (err) {
    console.error('Expiry worker unhandled error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Heuristic URL parser for administrative importer.
 * Safely fetches job webpage and extracts structured attributes.
 */
async function parseJobPostingFromUrl(rawUrl) {
  if (!isSafePublicUrl(rawUrl)) {
    throw new Error('URL rejected: Invalid protocol or private/internal network address.');
  }

  const canonicalUrl = cleanCanonicalUrl(rawUrl);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  let html = '';
  try {
    const res = await fetch(canonicalUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (DecodeBot/2.0; +https://www.rajuperumalla.in)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Failed to fetch job URL: HTTP ${res.status}`);
    }

    html = await res.text();
  } catch (err) {
    clearTimeout(timeoutId);
    throw new Error(`Error fetching job URL: ${err.message}`);
  }

  // Extract Title (OG or <title>)
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                       html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i) ||
                       html.match(/<title[^>]*>([^<]+)<\/title>/i);
  let title = ogTitleMatch ? ogTitleMatch[1].trim() : 'Software Engineering Opportunity';

  // Extract Company Name
  const ogSiteMatch = html.match(/<meta\s+property=["']og:site_name["']\s+content=["']([^"']+)["']/i);
  let company = ogSiteMatch ? ogSiteMatch[1].trim() : '';
  if (!company) {
    try {
      const u = new URL(canonicalUrl);
      company = u.hostname.replace(/^www\./, '').split('.')[0];
      company = company.charAt(0).toUpperCase() + company.slice(1);
    } catch {
      company = 'Hiring Employer';
    }
  }

  // Extract Description
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
                      html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  let summary = ogDescMatch ? ogDescMatch[1].trim() : '';

  // Extract Batch Eligibility
  const batchInfo = extractBatchEligibility(html, title);

  // Extract Work Arrangement
  const lowerHtml = html.toLowerCase();
  let workMode = 'Remote';
  if (lowerHtml.includes('hybrid')) workMode = 'Hybrid';
  else if (lowerHtml.includes('on-site') || lowerHtml.includes('onsite') || lowerHtml.includes('in-office')) workMode = 'On-site';

  // Extract Opportunity Type
  let oppType = 'Full-time';
  if (lowerHtml.includes('internship') || lowerHtml.includes('intern')) oppType = 'Internship';
  else if (lowerHtml.includes('trainee') || lowerHtml.includes('graduate trainee')) oppType = 'Graduate Trainee';

  // Extract Stipend / Salary
  let stipend = 'Competitive for Fresher / College Graduates';
  const stipendMatch = html.match(/(?:₹|INR|\$)\s*[0-9,]+(?:\s*-\s*[0-9,]+)?(?:\s*(?:per month|\/mo|k\/month|LPA))?/i);
  if (stipendMatch) {
    stipend = stipendMatch[0].trim();
  }

  // Extract Application Deadline
  let deadline = null;
  const deadlineMatch = html.match(/(?:deadline|apply by|closing date|last date)[:\s]+([A-Za-z0-9,\s-]+)/i);
  if (deadlineMatch) {
    const normalized = normalizeDeadline(deadlineMatch[1].slice(0, 30));
    if (normalized.deadlineDate) {
      deadline = normalized.isoString;
    }
  }

  // Generate safe slug
  const cleanTitleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
  const cleanCompanySlug = company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 25);
  const slug = `${cleanCompanySlug}-${cleanTitleSlug}`.replace(/^-+|-+$/g, '');

  return {
    title: sanitizeText(title, 200),
    company: sanitizeText(company, 100),
    summary: sanitizeText(summary, 500) || `${title} position at ${company}. Open for entry-level candidates and college graduates.`,
    slug,
    canonicalUrl,
    officialUrl: canonicalUrl,
    workMode,
    opportunityType: oppType,
    eligibleBatches: batchInfo.batches,
    batchLabel: batchInfo.label,
    isBatchVerified: batchInfo.isVerified,
    stipend,
    applicationDeadline: deadline,
    sourcePlatform: 'manual_importer',
  };
}

module.exports = {
  isSafePublicUrl,
  normalizeDeadline,
  evaluateJobLifecycle,
  extractBatchEligibility,
  cleanCanonicalUrl,
  sanitizeText,
  expireStaleJobs,
  parseJobPostingFromUrl,
  DEFAULT_NO_DEADLINE_FRESHNESS_DAYS,
};
