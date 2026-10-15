import { supabase } from '../supabaseClient';

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

  // 1. Opportunity Official URL (Jobs, Hackathons)
  if (resource.opportunity?.officialUrl && isValidOutboundUrl(resource.opportunity.officialUrl)) {
    return resource.opportunity.officialUrl;
  }

  // 2. Direct Official URL attribute
  if (resource.officialUrl && isValidOutboundUrl(resource.officialUrl)) {
    return resource.officialUrl;
  }

  // 3. Project Spec URLs (Final-Year Projects)
  if (resource.projectSpec?.demoUrl && isValidOutboundUrl(resource.projectSpec.demoUrl)) {
    return resource.projectSpec.demoUrl;
  }
  if (resource.projectSpec?.repoUrl && isValidOutboundUrl(resource.projectSpec.repoUrl)) {
    return resource.projectSpec.repoUrl;
  }

  // 4. Reference Data official URL
  if (resource.referenceInfo?.officialUrl && isValidOutboundUrl(resource.referenceInfo.officialUrl)) {
    return resource.referenceInfo.officialUrl;
  }

  // 5. Check markdown content for an official markdown link [Official...](https://...)
  if (resource.content && typeof resource.content === 'string') {
    const linkMatch = resource.content.match(/\[(?:Official|Apply|Portal|Website)[^\]]*\]\((https?:\/\/[^\s)]+)\)/i);
    if (linkMatch && isValidOutboundUrl(linkMatch[1])) {
      return linkMatch[1];
    }
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
