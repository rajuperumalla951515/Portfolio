import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { decodeService } from '../services/decodeService';
import {
  isValidOutboundUrl,
  getCleanDomain,
  buildAttributedDestinationUrl,
  resolveExternalDestination,
  recordOutboundClick,
} from '../utils/outboundRedirect';
import myLogo from '../assets/mylogo.png';

/**
 * DecodeRedirectPage handles secure first-party redirects for Decode resources:
 * Route: /go/:slug or /go/:category/:slug
 *
 * Security & Attribution:
 * 1. Resolves destination strictly from trusted database/local records (never from query param)
 * 2. Validates protocols (only http/https allowed, rejects javascript:, data:, etc.)
 * 3. Preserves existing affiliate/referral parameters
 * 4. Injects UTM attribution tags (utm_source=rajuperumalla.in, utm_medium=referral, utm_campaign=decode)
 * 5. Records outbound click in Supabase analytics
 * 6. Fast, non-blocking redirect with graceful fallback
 */
export const DecodeRedirectPage = () => {
  const { slug, category } = useParams();
  const [status, setStatus] = useState('resolving'); // resolving | redirecting | error | not_found
  const [resource, setResource] = useState(null);
  const [destinationUrl, setDestinationUrl] = useState('');
  const [destinationDomain, setDestinationDomain] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isCancelled = false;

    async function executeRedirect() {
      if (!slug) {
        setStatus('not_found');
        return;
      }

      try {
        // 1. Resolve resource from service
        const categorySlug = category || 'all';
        const res = await decodeService.getResourceBySlug(categorySlug, slug);
        const resolvedResource = res.data;

        if (isCancelled) return;

        if (!resolvedResource) {
          setStatus('not_found');
          return;
        }

        setResource(resolvedResource);

        // 2. Resolve destination URL from trusted resource fields
        const rawDestination = resolveExternalDestination(resolvedResource);

        if (!rawDestination || !isValidOutboundUrl(rawDestination)) {
          setStatus('error');
          setErrorMessage('This resource does not have a verified external destination configured.');
          return;
        }

        // 3. Build attributed URL with preserved params & UTM tags
        const finalUrl = buildAttributedDestinationUrl(rawDestination, {
          utmSource: 'rajuperumalla.in',
          utmMedium: 'referral',
          utmCampaign: 'decode',
        });

        const domain = getCleanDomain(finalUrl);
        setDestinationUrl(finalUrl);
        setDestinationDomain(domain);
        setStatus('redirecting');

        // 4. Record outbound click asynchronously (non-blocking)
        recordOutboundClick(resolvedResource, rawDestination);

        // 5. Fast redirect via replace()
        const timer = setTimeout(() => {
          if (!isCancelled) {
            window.location.replace(finalUrl);
          }
        }, 120);

        return () => clearTimeout(timer);
      } catch {
        if (!isCancelled) {
          setStatus('error');
          setErrorMessage('Unable to process destination redirect. Please try again.');
        }
      }
    }

    executeRedirect();

    return () => {
      isCancelled = true;
    };
  }, [slug, category]);

  // Set noindex metadata on redirect routes
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      metaRobots.setAttribute('content', 'index, follow');
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-zinc-900 flex flex-col items-center justify-center p-4 selection:bg-red-100">
      <div className="w-full max-w-md bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2">
          <img
            src={myLogo}
            alt="Raju Perumalla"
            className="w-8 h-8 rounded-full border border-zinc-200 object-cover"
            width={32}
            height={32}
          />
          <span className="main-logo-font text-gradient text-base font-bold">Raju Perumalla</span>
          <span className="text-zinc-300 font-light">/</span>
          <span className="font-black text-sm tracking-wider text-zinc-900">DECODE</span>
        </div>

        {status === 'redirecting' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 text-[#0a66c2] flex items-center justify-center mx-auto">
              <Lucide.Loader2 size={24} className="animate-spin" />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-base font-bold text-zinc-900">
                Taking you to {destinationDomain || 'official portal'}
              </h1>
              {resource?.title && (
                <p className="text-xs text-zinc-500 font-medium line-clamp-1">
                  {resource.title}
                </p>
              )}
            </div>

            <p className="text-[11px] text-zinc-400">
              Verified external resource · Attribution via Decode
            </p>

            <div className="pt-2">
              <a
                href={destinationUrl}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-2xs transition-colors"
              >
                <span>Click if not redirected automatically</span>
                <Lucide.ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        {status === 'resolving' && (
          <div className="space-y-3 py-4">
            <Lucide.Loader2 size={28} className="animate-spin text-zinc-400 mx-auto" />
            <p className="text-xs text-zinc-500">Resolving verified destination...</p>
          </div>
        )}

        {status === 'not_found' && (
          <div className="space-y-4 py-2">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
              <Lucide.AlertCircle size={24} />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">Resource Destination Not Found</h2>
              <p className="text-xs text-zinc-500 mt-1">
                The requested link may have moved or is no longer active in our directory.
              </p>
            </div>
            <Link
              to="/decode"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              <Lucide.ArrowLeft size={13} />
              <span>Back to Decode Directory</span>
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4 py-2">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <Lucide.ShieldAlert size={24} />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">Untrusted or Invalid Destination</h2>
              <p className="text-xs text-zinc-500 mt-1">
                {errorMessage || 'This redirect was blocked to protect your browsing security.'}
              </p>
            </div>
            <Link
              to="/decode"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              <Lucide.ArrowLeft size={13} />
              <span>Return to Safety</span>
            </Link>
          </div>
        )}

        {/* Security & Attribution Trust Footer */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Lucide.ShieldCheck size={12} className="text-emerald-600" />
            <span>Secure Redirect</span>
          </span>
          <Link to="/decode" className="hover:text-zinc-700 transition-colors">
            Decode Platform
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DecodeRedirectPage;
