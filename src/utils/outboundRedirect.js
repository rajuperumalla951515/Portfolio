import { supabase } from '../supabaseClient.js';
import { getFallbackResource } from '../data/decodeData.js';

export const VERIFIED_FALLBACK_DESTINATIONS = {
  'clearview-healthcare-data-analyst-advanced-analytics': 'https://www.clearviewhcp.com/careers/',
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
  'citi-java-fullstack-developer-chennai': 'https://jobs.citi.com/job/chennai/java-fullstack-developer/287/101944267120',
  'aguttaa-associate-software-intern-remote': 'https://aguttaa.com/careers/associate-software-intern',
  'aguttaa-hr-recruiter-intern-remote': 'https://aguttaa.com/careers/hr-recruiter-intern',
  'cognizant-fresher-customer-support-data-mapping': 'https://bebee.com/in/jobs/fresher-customer-support-data-mapping-process-cognizant-hyderabad--t7xk-853218746',
  'fresher-process-associate-voice-process-bangalore': 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-edGDrJWk-LaG9MqZQZEjMyU26NbD5BgSc_JO7O4FVUQUlWQUE3UVhXOVhLNTRJM0I1N0tOUVNFMC4u',
  'citi-full-stack-java-developer-commercial-cards': 'https://jobs.citi.com/job/chennai/full-stack-java-developer/287/101956556992',
  'citi-sap-cte-fieldglass-senior-business-analyst': 'https://jobs.citi.com/job/chennai/sap-cte-fieldglass-senior-business-analyst-avp/287/101736842464',
  'ibm-intern-associate-engineer-bangalore-137023': 'https://careers.ibm.com/en_US/careers/JobDetail?jobId=137023&source=SN_LinkedIn',
  'salesforce-summer-2027-intern-ui-ux-designer': 'https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/India---Hyderabad/Summer-2027-Intern---UI-UX-Designer_JR363342?utm_source=chatgpt.com',
  'honeywell-intern-bachelors-mechanical-eng-2027': 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6504&utm_source=chatgpt.com',
  'pwc-business-ai-engineer-intern-2027': 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6501&utm_source=chatgpt.com',
  'hsbc-intern-apprentice-12-months-gurugram': 'https://portal.careers.hsbc.com/careers/job/563774612428195-intern-apprentice-12-months--gurugram-haryana-india?domain=hsbc.com&utm_source=chatgpt.com',
  'standard-chartered-apprentice-operations-gbs-india-2026': 'https://jobs.standardchartered.com/job/Apprentice-Operations-GBS-India-2026/58757-en_GB?utm_source=lilimitedlistings&feedid=363857',
};

/**
 * Validates that an outbound URL is safe and strictly uses http/https.
 * Rejects javascript:, data:, and malicious protocol schemes.
 */
export const isValidOutboundUrl = (urlStr) => {
  if (!urlStr || typeof urlStr !== 'string') return false;
  try {
    const parsed = new URL(urlStr.trim());
    const validProtocols = ['https:', 'http:'];
    if (!validProtocols.includes(parsed.protocol)) {
      return false;
    }
    // Disallow localhost or internal network in production
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Extracts clean domain name (without www.)
 */
export const getCleanDomain = (urlStr) => {
  if (!urlStr) return '';
  try {
    const parsed = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/**
 * Builds attributed destination URL:
 * - Preserves existing query parameters (including existing affiliate IDs)
 * - Safely attaches UTM attribution only if not already present
 * - Preserves URL hash fragment
 */
export const buildAttributedDestinationUrl = (targetUrl, options = {}) => {
  if (!isValidOutboundUrl(targetUrl)) return targetUrl;
  try {
    const url = new URL(targetUrl.trim());

    const utmSource = options.utmSource || 'rajuperumalla.in';
    const utmMedium = options.utmMedium || 'referral';
    const utmCampaign = options.utmCampaign || 'decode';

    if (!url.searchParams.has('utm_source')) {
      url.searchParams.set('utm_source', utmSource);
    }
    if (!url.searchParams.has('utm_medium')) {
      url.searchParams.set('utm_medium', utmMedium);
    }
    if (!url.searchParams.has('utm_campaign')) {
      url.searchParams.set('utm_campaign', utmCampaign);
    }

    return url.toString();
  } catch {
    return targetUrl;
  }
};

/**
 * Resolves the primary external destination URL for any Decode resource
 */
export const resolveExternalDestination = (resource) => {
  if (!resource) return null;

  // If a string (slug) was provided directly
  let resObj = resource;
  if (typeof resource === 'string') {
    resObj = getFallbackResource(null, resource) || { slug: resource };
  }

  // 1. Opportunity Official URL (Jobs, Hackathons) - camelCase or snake_case
  const opp = resObj.opportunity || resObj.opportunity_data;
  if (opp?.officialUrl && isValidOutboundUrl(opp.officialUrl)) {
    return opp.officialUrl;
  }
  if (opp?.official_url && isValidOutboundUrl(opp.official_url)) {
    return opp.official_url;
  }

  // 2. Direct Official URL attribute
  if (resObj.officialUrl && isValidOutboundUrl(resObj.officialUrl)) {
    return resObj.officialUrl;
  }
  if (resObj.official_url && isValidOutboundUrl(resObj.official_url)) {
    return resObj.official_url;
  }

  // 3. Project Spec URLs (Final-Year Projects)
  const proj = resObj.projectSpec || resObj.project_spec;
  if (proj?.demoUrl && isValidOutboundUrl(proj.demoUrl)) {
    return proj.demoUrl;
  }
  if (proj?.demo_url && isValidOutboundUrl(proj.demo_url)) {
    return proj.demo_url;
  }
  if (proj?.repoUrl && isValidOutboundUrl(proj.repoUrl)) {
    return proj.repoUrl;
  }
  if (proj?.repo_url && isValidOutboundUrl(proj.repo_url)) {
    return proj.repo_url;
  }

  // 4. Reference Data official URL
  const ref = resObj.referenceInfo || resObj.reference_data;
  if (ref?.officialUrl && isValidOutboundUrl(ref.officialUrl)) {
    return ref.officialUrl;
  }
  if (ref?.official_url && isValidOutboundUrl(ref.official_url)) {
    return ref.official_url;
  }

  // 5. Check markdown content for an official markdown link [Official...](https://...)
  if (resObj.content && typeof resObj.content === 'string') {
    const linkMatch = resObj.content.match(
      /\[(?:Official|Apply|Portal|Website|Documentation|GitHub|Repo|Project)[^\]]*\]\((https?:\/\/[^\s)]+)\)/i
    );
    if (linkMatch && isValidOutboundUrl(linkMatch[1])) {
      return linkMatch[1];
    }

    const anyLinkMatch = resObj.content.match(/\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/i);
    if (anyLinkMatch && isValidOutboundUrl(anyLinkMatch[1])) {
      return anyLinkMatch[1];
    }
  }

  // 6. Check verified destinations map by slug
  const slug = resObj.slug || (typeof resource === 'string' ? resource : null);
  if (slug && VERIFIED_FALLBACK_DESTINATIONS[slug]) {
    return VERIFIED_FALLBACK_DESTINATIONS[slug];
  }

  return null;
};

/**
 * Records an outbound click event to Supabase with deduplication
 */
export const recordOutboundClick = async (resource, destinationUrl) => {
  if (!resource || !destinationUrl) return false;

  const slug = resource.slug || 'unknown';
  const now = Date.now();

  // Deduplication check: ignore rapid duplicate clicks within 8 seconds
  const sessionKey = `outbound_click_${slug}`;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const lastClick = window.sessionStorage.getItem(sessionKey);
    if (lastClick && now - parseInt(lastClick, 10) < 8000) {
      return false; // Skip duplicate count
    }
    window.sessionStorage.setItem(sessionKey, String(now));
  }

  const destinationDomain = getCleanDomain(destinationUrl);
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
  const referrer = typeof document !== 'undefined' ? (document.referrer || null) : null;

  try {
    const { error } = await supabase
      .from('decode_outbound_clicks')
      .insert([
        {
          resource_slug: slug,
          category_slug: resource.category || 'general',
          resource_title: resource.title || slug,
          destination_domain: destinationDomain,
          destination_url: destinationUrl,
          referrer: referrer,
          utm_source: 'rajuperumalla.in',
          utm_medium: 'referral',
          utm_campaign: 'decode',
          is_affiliate: Boolean(resource.isAffiliate),
          user_agent_type: isMobile ? 'mobile' : 'desktop',
        },
      ]);

    if (error) {
      // Non-blocking fallback to local storage buffer
      storeLocalClickFallback({
        slug,
        category: resource.category,
        domain: destinationDomain,
        timestamp: new Date().toISOString(),
      });
      return false;
    }

    return true;
  } catch {
    storeLocalClickFallback({
      slug,
      category: resource.category,
      domain: destinationDomain,
      timestamp: new Date().toISOString(),
    });
    return false;
  }
};

const storeLocalClickFallback = (clickData) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const existing = JSON.parse(window.localStorage.getItem('decode_cached_clicks') || '[]');
    existing.push(clickData);
    window.localStorage.setItem('decode_cached_clicks', JSON.stringify(existing.slice(-100)));
  } catch {
    // Ignore storage quota errors
  }
};
