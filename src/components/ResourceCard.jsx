import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { getResourceLogo } from '../utils/resourceLogos';
import JobCard from './JobCard';

const CategoryIcon = ({ name, size = 16, className = 'text-zinc-600' }) => {
  const IconComponent = Lucide[name] || Lucide.BookOpen;
  return <IconComponent size={size} className={className} />;
};

/**
 * ResourceCard renders a single verified listing with authentic organization logo,
 * clear typography, 2-3 line concise description, stable non-jumping layout, and proper single arrow.
 * For job opportunities, it delegates to JobCard with the LinkedIn-style layout.
 */
export const ResourceCard = ({ resource, category }) => {
  const [imageError, setImageError] = useState(false);

  // If this resource is a job or internship opportunity, render the dedicated JobCard
  if (resource.category === 'jobs' || resource.isJobCard) {
    return <JobCard resource={resource} category={category} />;
  }

  const logoUrl = getResourceLogo(resource.logoKey, resource.officialUrl, resource.sourceName);
  const destinationUrl = `/decode/${resource.category}/${resource.slug}`;

  // Strip existing unicode/ascii arrows from actionText so we never render double arrows (e.g. 'View roadmap → →')
  const actionLabel = (resource.actionText || 'View resource')
    .replace(/(\s*→|\s*->|\s*&rarr;)+$/g, '')
    .trim() || 'View resource';

  return (
    <article
      className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-zinc-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-150 flex flex-col justify-between focus-within:ring-2 focus-within:ring-zinc-400 focus-within:border-zinc-400"
    >
      <div className="space-y-3.5">
        {/* Header: Verified Logo / Publisher + Domain Tag + Difficulty */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {logoUrl && !imageError ? (
              <div className="w-10 h-10 rounded-xl border border-zinc-200/80 bg-white p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                <img
                  src={logoUrl}
                  alt={resource.sourceName || resource.title}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  width={36}
                  height={36}
                />
              </div>
            ) : resource.sourceName ? (
              <div className="w-10 h-10 rounded-xl border border-zinc-200/80 bg-zinc-50 flex items-center justify-center shrink-0 font-bold text-xs text-zinc-700 font-mono select-none">
                {resource.sourceName.slice(0, 2).toUpperCase()}
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl border border-zinc-200/80 bg-zinc-50 flex items-center justify-center shrink-0">
                <CategoryIcon name={category?.icon} size={16} />
              </div>
            )}

            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block truncate">
                {category?.shortTitle || resource.category}
              </span>
              <span className="text-xs font-semibold text-zinc-800 truncate block">
                {resource.sourceName || category?.title || 'Verified Resource'}
              </span>
            </div>
          </div>

          {resource.difficulty && (
            <span className="text-[10px] text-zinc-500 font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200/60 shrink-0">
              {resource.difficulty}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
          <Link
            to={destinationUrl}
            className="focus:outline-none focus:underline"
          >
            {resource.title}
          </Link>
        </h2>

        {/* Location / Work Mode / Context */}
        {resource.sourceLocation && (
          <div className="text-xs text-zinc-500 flex items-center gap-1.5 -mt-1">
            <Lucide.MapPin size={12} className="text-zinc-400 shrink-0" />
            <span className="truncate">{resource.sourceLocation}</span>
          </div>
        )}

        {/* Description: Strictly 2–3 short lines at most */}
        <p className="text-xs sm:text-[13px] text-zinc-600 line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {resource.summary}
        </p>

        {/* Relevant Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200/60 text-zinc-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Deadline / Date & Direct Action */}
      <div className="pt-3.5 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
        <span className="text-zinc-500 text-[11px] font-medium truncate max-w-[55%]">
          {resource.deadlineText || resource.publishedDate}
        </span>

        <Link
          to={destinationUrl}
          className="inline-flex items-center gap-1 font-semibold text-xs text-zinc-900 group-hover:text-red-600 transition-colors"
          aria-label={`Open ${resource.title}`}
        >
          <span>{actionLabel}</span>
          <Lucide.ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5 shrink-0" />
        </Link>
      </div>
    </article>
  );
};

export default ResourceCard;
