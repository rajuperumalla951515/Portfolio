import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { getJobRoleCategory, getPrimaryJobCategory, jobCategories, jobRoles } from '../data/jobTaxonomy';
import { getResourceLogo } from '../utils/resourceLogos';

const formatDate = (date) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const JobListingRow = ({ job, isSaved, onToggleSave }) => {
  const [logoError, setLogoError] = useState(false);
  const company = job.sourceName || job.source_name || job.opportunity?.organization || job.opportunity_data?.organization;
  const location = job.opportunity?.location || job.opportunity_data?.location || job.sourceLocation || job.source_location;
  const workMode = job.workArrangement || job.work_arrangement || job.opportunity?.workMode || job.opportunity_data?.workMode;
  const employmentType = job.opportunityType || job.opportunity_type || job.opportunity?.jobType || job.opportunity_data?.jobType;
  const stipend = job.stipendAmount || job.stipend_amount || job.opportunity?.stipend || job.opportunity_data?.stipend;
  const experience = job.experienceLevel || job.experience_level || job.opportunity?.experienceLevel || job.opportunity_data?.experienceLevel;
  const posted = formatDate(job.publishedDate || job.published_date || job.created_at);
  const deadline = formatDate(job.applicationDeadline || job.application_deadline);
  const deadlineText = deadline
    ? `Apply by ${deadline}`
    : job.opportunity?.deadline || job.opportunity_data?.deadline || job.deadlineText || null;
  const primaryCategory = jobCategories.find(({ slug }) => slug === getPrimaryJobCategory(job));
  const roleCategory = jobRoles.find(({ slug }) => slug === getJobRoleCategory(job));
  const logo = getResourceLogo(job.logoKey || job.logo_key, job.officialUrl || job.official_url || job.opportunity?.officialUrl || job.opportunity_data?.officialUrl, company);
  const initials = company ? company.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() : null;
  const officialUrl = job.officialUrl || job.official_url || job.opportunity?.officialUrl || job.opportunity_data?.officialUrl;

  return (
    <article className="grid gap-3 border-b border-zinc-200 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-zinc-200 bg-white text-xs font-semibold text-zinc-600">
          {logo && !logoError ? (
            <img src={logo} alt="" onError={() => setLogoError(true)} className="h-full w-full object-contain p-1" loading="lazy" width={44} height={44} />
          ) : initials ? (
            initials
          ) : (
            <Lucide.BriefcaseBusiness size={17} aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold leading-5 text-zinc-900">
            <Link to={`/decode/jobs/${job.slug}`} className="hover:text-[#8f1b1b] focus-visible:underline">
              {job.title}
            </Link>
          </h2>
          {company && <p className="mt-1 text-sm text-zinc-700">{company}</p>}
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
            {location && <span>{location}</span>}
            {location && workMode && <span aria-hidden="true">·</span>}
            {workMode && <span>{workMode}</span>}
            {experience && <><span aria-hidden="true">·</span><span>{experience}</span></>}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-zinc-600">
            {stipend && <span>{stipend}</span>}
            {stipend && employmentType && <span aria-hidden="true">·</span>}
            {employmentType && <span>{employmentType}</span>}
            {posted && <><span aria-hidden="true">·</span><span>Posted {posted}</span></>}
            {deadlineText && <><span aria-hidden="true">·</span><span>{deadlineText}</span></>}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500">
            {primaryCategory && <span>{primaryCategory.label}</span>}
            {roleCategory && <span>{roleCategory.label}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 pl-14 sm:pl-0">
        <Link
          to={`/decode/jobs/${job.slug}`}
          className="text-xs font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950"
        >
          View job
        </Link>
        {officialUrl && (
          <a
            href={`/go/${job.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-700"
          >
            Apply <Lucide.ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
        <button
          type="button"
          onClick={() => onToggleSave(job.slug)}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
          className="p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
        >
          {isSaved ? <Lucide.BookmarkCheck size={17} aria-hidden="true" /> : <Lucide.Bookmark size={17} aria-hidden="true" />}
        </button>
      </div>
    </article>
  );
};

export default JobListingRow;
