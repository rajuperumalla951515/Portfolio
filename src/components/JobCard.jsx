import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { getCompanyLogoFromWebsite, getDomainFromUrl, getResourceLogo } from '../utils/resourceLogos';

/**
 * JobCard renders an authentic LinkedIn-style job listing:
 * - Company logo fetched directly from the employer's official website
 * - Company name header
 * - Bold title + verified shield badge
 * - Location · Time ago · Applicants clicked apply
 * - Response status / Hiring note
 * - Tag pills (✓ Hybrid / Remote, Full-time / Internship, Stipend)
 * - Action buttons: Apply (blue pill), Save (outline pill), and Details link
 */
export const JobCard = ({ resource }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imgAttempt, setImgAttempt] = useState(0);

  const destinationUrl = `/decode/${resource.category}/${resource.slug}`;
  const opp = resource.opportunity || {};
  const companyName = opp.organization || resource.sourceName || 'Hiring Company';
  const officialUrl = opp.officialUrl || resource.officialUrl || '#';
  const location = opp.location || resource.sourceLocation || 'Remote · Global';
  const workMode = opp.workMode || (location.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid');
  const jobType = opp.jobType || (resource.title.toLowerCase().includes('intern') ? 'Internship' : 'Full-time');
  const applicants = opp.applicantsCount || 'Over 100 people clicked apply';
  const responseStatus = opp.responseText || 'Responses managed off LinkedIn';
  const timeAgo = resource.publishedDate ? `Posted ${resource.publishedDate}` : 'Recently posted';

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

  return (
    <article className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-zinc-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-150 flex flex-col justify-between focus-within:ring-2 focus-within:ring-[#0a66c2]/40 focus-within:border-[#0a66c2]">
      <div className="space-y-3">
        {/* Top: Company Logo from Website + Company Name */}
        <div className="flex items-center gap-2.5">
          {currentLogoSrc && imgAttempt < 3 ? (
            <div className="w-8 h-8 rounded-lg border border-zinc-200/90 bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
              <img
                src={currentLogoSrc}
                alt={companyName}
                onError={handleImgError}
                className="w-full h-full object-contain"
                loading="lazy"
                width={32}
                height={32}
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg border border-zinc-200/90 bg-zinc-100 flex items-center justify-center shrink-0 font-bold text-xs text-zinc-700 font-mono select-none">
              {companyName.slice(0, 2).toUpperCase()}
            </div>
          )}

          <span className="text-sm font-semibold text-zinc-800 truncate">
            {companyName}
          </span>
        </div>

        {/* Job Title + Verified Shield Badge */}
        <div className="flex items-start gap-1.5 pt-0.5">
          <h2 className="text-lg sm:text-[19px] font-bold text-zinc-900 group-hover:text-[#0a66c2] transition-colors leading-snug">
            <Link to={destinationUrl} className="focus:outline-none focus:underline">
              {resource.title}
            </Link>
          </h2>
          <Lucide.ShieldCheck
            size={18}
            className="text-zinc-600 shrink-0 mt-0.5 inline-block"
            title="Verified Opportunity"
          />
        </div>

        {/* Location · Time ago · Applicants info */}
        <div className="space-y-1 text-xs text-zinc-600">
          <p className="flex items-center gap-1.5 flex-wrap">
            <span className="text-zinc-800 font-medium">{location}</span>
            <span className="text-zinc-300">·</span>
            <span>{timeAgo}</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-600">{applicants}</span>
          </p>
          <p className="text-zinc-500 text-[11px]">
            {responseStatus}
          </p>
        </div>

        {/* Tag Pills (✓ Hybrid, Full-time, etc.) */}
        <div className="flex items-center gap-2 flex-wrap pt-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-300 text-xs font-medium text-zinc-800 bg-white shadow-2xs">
            <Lucide.Check size={13} className="text-zinc-800 stroke-[2.5]" />
            <span>{workMode}</span>
          </span>

          <span className="px-3 py-1 rounded-full border border-zinc-300 text-xs font-medium text-zinc-800 bg-white shadow-2xs">
            {jobType}
          </span>

          {opp.stipend && (
            <span className="px-3 py-1 rounded-full border border-emerald-200 text-xs font-medium text-emerald-800 bg-emerald-50/70">
              Stipend Funded
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons: Apply (solid blue pill), Save (outline pill), Details link */}
      <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-zinc-100">
        <a
          href={`/go/${resource.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          title={`Apply on ${companyName} Official Portal`}
        >
          <span>Apply</span>
          <Lucide.ExternalLink size={13} />
        </a>

        <button
          type="button"
          onClick={handleSaveToggle}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
            isSaved
              ? 'bg-zinc-100 border-zinc-400 text-zinc-900'
              : 'border-[#0a66c2] text-[#0a66c2] hover:bg-blue-50/50 bg-white'
          }`}
        >
          {isSaved ? '✓ Saved' : 'Save'}
        </button>

        <Link
          to={destinationUrl}
          className="ml-auto text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          Details →
        </Link>
      </div>
    </article>
  );
};

export default JobCard;
