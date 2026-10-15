import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { getCompanyLogoFromWebsite, getDomainFromUrl, getResourceLogo } from '../utils/resourceLogos';

/**
 * JobCard renders an authentic, premium LinkedIn/Google-styled fresher job card
 * tailored specifically for 2026 & 2027 graduating batches:
 * - Legitimate company logo & employer domain
 * - Bold opportunity title + verified shield badge
 * - Prominent 2026 / 2027 graduation batch indicator
 * - Work mode (Remote/Hybrid/On-site), Job Type (Internship/GET/Full-time)
 * - Compensation / stipend pill
 * - Deadline urgency badge (e.g. "Closing in 4 days" or "May 31, 2026")
 * - Primary Apply and View Details actions
 */
export const JobCard = ({ resource }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imgAttempt, setImgAttempt] = useState(0);

  const destinationUrl = `/decode/${resource.category || 'jobs'}/${resource.slug}`;
  const opp = resource.opportunity || {};
  const companyName = opp.organization || resource.sourceName || 'Hiring Employer';
  const officialUrl = opp.officialUrl || resource.officialUrl || '#';
  const location = opp.location || resource.sourceLocation || 'Remote · Global';
  const workMode = opp.workMode || resource.workArrangement || (location.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid');
  const jobType = opp.jobType || resource.opportunityType || (resource.title.toLowerCase().includes('intern') ? 'Internship' : 'Full-time');
  const stipend = resource.stipendAmount || opp.stipend || null;
  const applicants = opp.applicantsCount || 'Actively recruiting freshers';
  const timeAgo = resource.publishedDate ? `Posted ${resource.publishedDate}` : 'Recently verified';

  // Extract eligible batches
  const batches = Array.isArray(resource.eligibleBatches) && resource.eligibleBatches.length > 0
    ? resource.eligibleBatches
    : Array.isArray(opp.eligibleBatches) && opp.eligibleBatches.length > 0
    ? opp.eligibleBatches
    : [];

  const domain = getDomainFromUrl(officialUrl);

  const getLogoSrc = () => {
    if (imgAttempt === 0) {
      return getCompanyLogoFromWebsite(officialUrl, companyName) || getResourceLogo(resource.logoKey);
    }
    if (imgAttempt === 1 && domain) {
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    }
    if (imgAttempt === 2) {
      return getResourceLogo(resource.logoKey);
    }
    return null;
  };

  const currentLogoSrc = getLogoSrc();

  const handleImgError = () => {
    setImgAttempt((prev) => prev + 1);
  };

  const handleSaveToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  // Deadline calculation
  const deadlineValue = resource.applicationDeadline || opp.deadline;
  let deadlineBadge = null;

  if (deadlineValue && /^\d{4}-\d{2}-\d{2}/.test(String(deadlineValue).trim())) {
    const rawStr = String(deadlineValue).trim();
    const deadlineDate = new Date(rawStr.length === 10 ? `${rawStr}T23:59:59.999Z` : rawStr);
    if (!isNaN(deadlineDate.getTime())) {
      const now = new Date();
      const diffMs = deadlineDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) {
        deadlineBadge = {
          label: 'Closing today',
          urgency: 'high',
        };
      } else if (diffDays <= 5) {
        deadlineBadge = {
          label: `Closing in ${diffDays} day${diffDays === 1 ? '' : 's'}`,
          urgency: 'high',
        };
      } else {
        const formattedDate = deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        deadlineBadge = {
          label: `Deadline: ${formattedDate}`,
          urgency: 'normal',
        };
      }
    }
  }

  if (!deadlineBadge) {
    deadlineBadge = {
      label: opp.deadline || resource.deadlineText || 'Rolling Admissions',
      urgency: 'normal',
    };
  }

  return (
    <article className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-zinc-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-150 flex flex-col justify-between focus-within:ring-2 focus-within:ring-[#0a66c2]/40 focus-within:border-[#0a66c2]">
      <div className="space-y-3.5">
        {/* Top: Employer Branding + Deadline Urgency Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            {currentLogoSrc && imgAttempt < 3 ? (
              <div className="w-9 h-9 rounded-xl border border-zinc-200 bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src={currentLogoSrc}
                  alt={companyName}
                  onError={handleImgError}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  width={36}
                  height={36}
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl border border-zinc-200 bg-zinc-100 flex items-center justify-center shrink-0 font-bold text-xs text-zinc-700 font-mono select-none">
                {companyName.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="truncate">
              <span className="text-sm font-semibold text-zinc-900 block truncate leading-tight">
                {companyName}
              </span>
              <span className="text-[11px] text-zinc-500 block truncate">
                {location}
              </span>
            </div>
          </div>

          {/* Deadline / Urgency Pill */}
          <span
            className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 border whitespace-nowrap ${
              deadlineBadge.urgency === 'high'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-zinc-50 text-zinc-600 border-zinc-200/70'
            }`}
          >
            {deadlineBadge.label}
          </span>
        </div>

        {/* Job Title + Verified Shield Badge */}
        <div className="pt-0.5">
          <h2 className="text-lg sm:text-[19px] font-bold text-zinc-900 group-hover:text-[#0a66c2] transition-colors leading-snug flex items-start gap-1.5">
            <Link to={destinationUrl} className="focus:outline-none focus:underline">
              {resource.title}
            </Link>
            <Lucide.ShieldCheck
              size={17}
              className="text-[#0a66c2] shrink-0 mt-1 inline-block"
              title="Verified Fresher Opportunity"
            />
          </h2>
        </div>

        {/* 2026 / 2027 Batch Eligibility Banner */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {batches.includes(2026) && batches.includes(2027) ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold">
              <Lucide.GraduationCap size={13} className="text-indigo-700" />
              <span>2026 & 2027 Batches</span>
            </span>
          ) : batches.includes(2026) ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <Lucide.GraduationCap size={13} className="text-blue-700" />
              <span>2026 Batch (Final Year)</span>
            </span>
          ) : batches.includes(2027) ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Lucide.GraduationCap size={13} className="text-teal-700" />
              <span>2027 Batch (Pre-Final)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-medium">
              <Lucide.GraduationCap size={13} className="text-zinc-500" />
              <span>College Freshers</span>
            </span>
          )}

          <span className="text-[11px] text-zinc-500 font-medium">
            {applicants} • {timeAgo}
          </span>
        </div>

        {/* Tag Pills (Mode, Job Type, Stipend) */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-200 text-xs font-medium text-zinc-700 bg-white shadow-2xs">
            <Lucide.Check size={12} className="text-zinc-700 stroke-[2.5]" />
            <span>{workMode}</span>
          </span>

          <span className="px-2.5 py-1 rounded-full border border-zinc-200 text-xs font-medium text-zinc-700 bg-white shadow-2xs">
            {jobType}
          </span>

          {stipend && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-emerald-200 text-xs font-semibold text-emerald-800 bg-emerald-50/80">
              <Lucide.Banknote size={12} className="text-emerald-700" />
              <span>{stipend}</span>
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons: Apply (LinkedIn blue pill), Save (outline pill), and Details link */}
      <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-zinc-100">
        <a
          href={`/go/${resource.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          title={`Apply on ${companyName} Official Portal`}
        >
          <span>Apply Officially</span>
          <Lucide.ExternalLink size={13} />
        </a>

        <button
          type="button"
          onClick={handleSaveToggle}
          className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
            isSaved
              ? 'bg-zinc-100 border-zinc-400 text-zinc-900'
              : 'border-zinc-300 text-zinc-700 hover:bg-zinc-50 bg-white'
          }`}
          aria-label={isSaved ? 'Bookmark saved' : 'Save opportunity'}
        >
          {isSaved ? '✓ Saved' : 'Save'}
        </button>

        <Link
          to={destinationUrl}
          className="ml-auto text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1"
        >
          <span>View Details</span>
          <Lucide.ChevronRight size={13} />
        </Link>
      </div>
    </article>
  );
};

export default JobCard;
