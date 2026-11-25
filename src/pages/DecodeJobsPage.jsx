import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import DecodeNav from '../components/DecodeNav';
import DecodeFooter from '../components/DecodeFooter';
import DecodePageWrapper from '../components/DecodePageWrapper';
import JobListingRow from '../components/JobListingRow';
import { decodeService } from '../services/decodeService';
import { filterJobs, getPrimaryJobCategory, jobCategories, jobRoles, savedJobsSlug } from '../data/jobTaxonomy';
import { readSavedJobSlugs, savedJobsChangeEvent, writeSavedJobSlugs } from '../utils/savedJobs';
import { usePageSEO } from '../utils/usePageSEO';

const commonFilters = [
  { key: 'location', label: 'Location', placeholder: 'City or country' },
  { key: 'company', label: 'Company', placeholder: 'Company name' },
  { key: 'experience', label: 'Experience', placeholder: 'Experience requirement' },
];

const TextFilter = ({ filter, value, onChange }) => (
  <label className="block min-w-0">
    <span className="mb-1 block text-[11px] font-medium text-zinc-600">{filter.label}</span>
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={filter.placeholder}
      className="w-full border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-600 focus:outline-none"
    />
  </label>
);

export const DecodeJobsPage = ({ categorySlug = null }) => {
  const category = jobCategories.find(({ slug }) => slug === categorySlug);
  const isSavedPage = categorySlug === savedJobsSlug;
  const isOverview = !categorySlug;
  const [savedSlugs, setSavedSlugs] = useState(() => readSavedJobSlugs());
  const [loadState, setLoadState] = useState({ key: null, jobs: [], error: null });
  const [filters, setFilters] = useState({
    query: '',
    role: 'all',
    location: '',
    workMode: '',
    experience: '',
    company: '',
    postedWithin: '',
    deadline: '',
    compensation: '',
    duration: '',
    domain: '',
    graduationYear: '',
    degree: '',
    branch: '',
    trainingProgram: '',
    apprenticeshipProgram: '',
    remoteEligibility: '',
    timezone: '',
    employmentType: '',
    skills: '',
    sort: 'recent',
  });
  const [saveError, setSaveError] = useState(false);
  const requestKey = JSON.stringify([categorySlug, filters, isOverview, isSavedPage]);
  const loading = loadState.key !== requestKey;
  const jobs = useMemo(() => (loading ? [] : loadState.jobs), [loading, loadState.jobs]);
  const error = loading ? null : loadState.error;

  const title = isOverview ? 'Find your next opportunity' : isSavedPage ? 'Saved jobs' : category?.label || 'Jobs';
  const description = isOverview
    ? 'Browse verified internships, graduate programmes, entry-level roles, apprenticeships, and remote jobs by opportunity type.'
    : isSavedPage
      ? 'Jobs you have saved on this device.'
      : category?.description;

  usePageSEO({
    title: `${title} | Decode Careers | Raju Perumalla`,
    description,
    canonical: `https://www.rajuperumalla.in${isOverview ? '/decode/jobs' : `/decode/jobs/${categorySlug}`}`,
    ogType: 'website',
    robots: isSavedPage ? 'noindex, follow' : 'index, follow',
  });

  useEffect(() => {
    const syncSavedJobs = () => setSavedSlugs(readSavedJobSlugs());
    window.addEventListener(savedJobsChangeEvent, syncSavedJobs);
    window.addEventListener('storage', syncSavedJobs);
    return () => {
      window.removeEventListener(savedJobsChangeEvent, syncSavedJobs);
      window.removeEventListener('storage', syncSavedJobs);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      try {
        const result = await decodeService.getJobs({
          ...filters,
          category: isOverview || isSavedPage ? 'all' : categorySlug,
          role: filters.role,
        });
        if (!active) return;
        setLoadState({ key: requestKey, jobs: result.data || [], error: result.error || null });
      } catch (requestError) {
        console.error('Unable to load Decode job listings:', requestError);
        if (!active) return;
        setLoadState({ key: requestKey, jobs: [], error: 'The job service is temporarily unavailable.' });
      }
    }, 180);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [categorySlug, filters, isOverview, isSavedPage, requestKey]);

  const visibleJobs = useMemo(() => {
    const categoryFiltered = filterJobs(jobs, {
      ...filters,
      category: isOverview || isSavedPage ? 'all' : categorySlug,
    });
    return isSavedPage
      ? categoryFiltered.filter((job) => savedSlugs.includes(job.slug))
      : categoryFiltered;
  }, [jobs, filters, categorySlug, isOverview, isSavedPage, savedSlugs]);

  const groupedJobs = useMemo(() => jobCategories.map((item) => ({
    ...item,
    jobs: visibleJobs.filter((job) => getPrimaryJobCategory(job) === item.slug),
  })), [visibleJobs]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const toggleSaved = (slug) => {
    const next = savedSlugs.includes(slug)
      ? savedSlugs.filter((savedSlug) => savedSlug !== slug)
      : [...savedSlugs, slug];
    const saved = writeSavedJobSlugs(next);
    setSaveError(!saved);
    if (saved) setSavedSlugs(next);
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      role: 'all',
      location: '',
      workMode: '',
      experience: '',
      company: '',
      postedWithin: '',
      deadline: '',
      compensation: '',
      duration: '',
      domain: '',
      graduationYear: '',
      degree: '',
      branch: '',
      trainingProgram: '',
      apprenticeshipProgram: '',
      remoteEligibility: '',
      timezone: '',
      employmentType: '',
      skills: '',
      sort: 'recent',
    });
  };

  const renderListings = (items) => items.map((job) => (
    <JobListingRow
      key={job.slug}
      job={job}
      isSaved={savedSlugs.includes(job.slug)}
      onToggleSave={toggleSaved}
    />
  ));

  return (
    <DecodePageWrapper>
      <DecodeNav />
      <main className="mx-auto w-full max-w-[1120px] flex-1 px-4 pb-16 pt-7 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-3 text-xs text-zinc-500">
          <Link to="/decode" className="hover:text-zinc-900">Decode careers</Link>
          {category && <><span className="mx-2 text-zinc-300">/</span><span className="text-zinc-800">{category.label}</span></>}
          {isSavedPage && <><span className="mx-2 text-zinc-300">/</span><span className="text-zinc-800">Saved</span></>}
        </nav>

        <header className="border-b border-zinc-300 pb-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8f1b1b]">Decode careers</p>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">{title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">{description}</p>
            </div>
            {!isOverview && !isSavedPage && (
              <p className="shrink-0 text-xs text-zinc-500">{visibleJobs.length} {visibleJobs.length === 1 ? 'listing' : 'listings'}</p>
            )}
          </div>
        </header>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-b border-zinc-200 pb-4 text-xs">
          <Link to="/decode/jobs" className="font-medium text-zinc-700 hover:text-[#8f1b1b]">Overview</Link>
          {jobCategories.map((item) => (
            <Link key={item.slug} to={`/decode/jobs/${item.slug}`} className="text-zinc-600 hover:text-[#8f1b1b]">
              {item.label}
            </Link>
          ))}
          <Link to="/decode/jobs/saved" className="text-zinc-600 hover:text-[#8f1b1b]">Saved jobs</Link>
        </div>

        <section aria-label="Job search and filters" className="border-b border-zinc-200 py-5">
          <label className="relative block">
            <Lucide.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => updateFilter('query', event.target.value)}
              placeholder="Search role, company, or skill"
              aria-label="Search jobs"
              className="w-full border border-zinc-300 bg-white py-3 pl-10 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-700 focus:outline-none"
            />
          </label>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {commonFilters.map((filter) => (
              <TextFilter key={filter.key} filter={filter} value={filters[filter.key]} onChange={(value) => updateFilter(filter.key, value)} />
            ))}
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-zinc-600">Role</span>
              <select value={filters.role} onChange={(event) => updateFilter('role', event.target.value)} className="w-full border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900">
                <option value="all">All roles</option>
                {jobRoles.map((role) => <option key={role.slug} value={role.slug}>{role.label}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-zinc-600">Work mode</span>
              <select value={filters.workMode} onChange={(event) => updateFilter('workMode', event.target.value)} className="w-full border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900">
                <option value="">Any mode</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-zinc-600">Posted</span>
              <select value={filters.postedWithin} onChange={(event) => updateFilter('postedWithin', event.target.value)} className="w-full border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900">
                <option value="">Any time</option>
                <option value="7">Past week</option>
                <option value="30">Past month</option>
                <option value="90">Past 3 months</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-zinc-600">Deadline</span>
              <select value={filters.deadline} onChange={(event) => updateFilter('deadline', event.target.value)} className="w-full border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900">
                <option value="">Any deadline</option>
                <option value="dated">Closing date listed</option>
                <option value="rolling">Rolling / no date listed</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-zinc-600">Sort</span>
              <select value={filters.sort} onChange={(event) => updateFilter('sort', event.target.value)} className="w-full border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900">
                <option value="recent">Recently posted</option>
                <option value="closing_soon">Closing soon</option>
              </select>
            </label>
            {categorySlug === 'internships' && (
              <>
                <label className="block">
                  <span className="mb-1 block text-[11px] font-medium text-zinc-600">Compensation</span>
                  <select value={filters.compensation} onChange={(event) => updateFilter('compensation', event.target.value)} className="w-full border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900">
                    <option value="">Any</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option>
                  </select>
                </label>
                <TextFilter filter={{ key: 'duration', label: 'Duration', placeholder: 'e.g. 6 months' }} value={filters.duration} onChange={(value) => updateFilter('duration', value)} />
                <TextFilter filter={{ key: 'domain', label: 'Internship domain', placeholder: 'e.g. platform' }} value={filters.domain} onChange={(value) => updateFilter('domain', value)} />
              </>
            )}
            {categorySlug === 'graduate-trainee' && (
              <>
                <TextFilter filter={{ key: 'graduationYear', label: 'Graduation year', placeholder: 'e.g. 2027' }} value={filters.graduationYear} onChange={(value) => updateFilter('graduationYear', value)} />
                <TextFilter filter={{ key: 'degree', label: 'Degree requirement', placeholder: 'Degree' }} value={filters.degree} onChange={(value) => updateFilter('degree', value)} />
                <TextFilter filter={{ key: 'branch', label: 'Branch eligibility', placeholder: 'Branch' }} value={filters.branch} onChange={(value) => updateFilter('branch', value)} />
                <TextFilter filter={{ key: 'trainingProgram', label: 'Training programme', placeholder: 'Programme name' }} value={filters.trainingProgram} onChange={(value) => updateFilter('trainingProgram', value)} />
              </>
            )}
            {categorySlug === 'entry-level' && (
              <>
                <TextFilter filter={{ key: 'employmentType', label: 'Employment type', placeholder: 'e.g. full-time' }} value={filters.employmentType} onChange={(value) => updateFilter('employmentType', value)} />
                <TextFilter filter={{ key: 'skills', label: 'Required skills', placeholder: 'e.g. Java' }} value={filters.skills} onChange={(value) => updateFilter('skills', value)} />
              </>
            )}
            {categorySlug === 'apprenticeships' && (
              <>
                <label className="block">
                  <span className="mb-1 block text-[11px] font-medium text-zinc-600">Programme</span>
                  <select value={filters.apprenticeshipProgram} onChange={(event) => updateFilter('apprenticeshipProgram', event.target.value)} className="w-full border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900">
                    <option value="">Any programme</option><option value="NAPS">NAPS</option><option value="NATS">NATS</option>
                  </select>
                </label>
                <TextFilter filter={{ key: 'degree', label: 'Qualification', placeholder: 'Qualification' }} value={filters.degree} onChange={(value) => updateFilter('degree', value)} />
                <TextFilter filter={{ key: 'duration', label: 'Duration', placeholder: 'e.g. 12 months' }} value={filters.duration} onChange={(value) => updateFilter('duration', value)} />
              </>
            )}
            {categorySlug === 'remote' && (
              <>
                <TextFilter filter={{ key: 'remoteEligibility', label: 'Remote eligibility', placeholder: 'Country or region' }} value={filters.remoteEligibility} onChange={(value) => updateFilter('remoteEligibility', value)} />
                <TextFilter filter={{ key: 'employmentType', label: 'Employment type', placeholder: 'e.g. internship' }} value={filters.employmentType} onChange={(value) => updateFilter('employmentType', value)} />
                <TextFilter filter={{ key: 'timezone', label: 'Time zone', placeholder: 'e.g. UTC+5:30' }} value={filters.timezone} onChange={(value) => updateFilter('timezone', value)} />
              </>
            )}
          </div>
          <button type="button" onClick={clearFilters} className="mt-3 text-xs font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950">
            Clear filters
          </button>
        </section>

        {saveError && <p role="alert" className="mt-4 text-sm text-red-700">Saved jobs could not be stored in this browser.</p>}
        {!loading && error && jobs.length > 0 && (
          <p role="status" className="mt-4 text-xs text-zinc-600">
            Live job data is temporarily unavailable; showing available curated listings.
          </p>
        )}

        <section aria-label="Job listings" className="mt-2">
          {loading ? (
            <div className="space-y-5 py-5" aria-label="Loading jobs">
              {[1, 2, 3].map((item) => <div key={item} className="h-20 animate-pulse border-b border-zinc-200 bg-zinc-50" />)}
            </div>
          ) : error && jobs.length === 0 ? (
            <div role="alert" className="py-12 text-center">
              <h2 className="font-semibold text-zinc-900">Jobs could not be loaded</h2>
              <p className="mt-1 text-sm text-zinc-600">{error}</p>
              <button type="button" onClick={clearFilters} className="mt-3 text-sm font-medium underline">Clear filters and retry</button>
            </div>
          ) : isOverview ? (
            <div className="space-y-8">
              {groupedJobs.map((group) => (
                <section key={group.slug} aria-labelledby={`category-${group.slug}`}>
                  <div className="flex items-baseline justify-between border-b border-zinc-300 pb-2">
                    <h2 id={`category-${group.slug}`} className="text-base font-semibold text-zinc-900">{group.label}</h2>
                    <Link to={`/decode/jobs/${group.slug}`} className="text-xs font-medium text-zinc-600 hover:text-[#8f1b1b]">
                      Browse {group.jobs.length} {group.jobs.length === 1 ? 'job' : 'jobs'} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                  {group.jobs.length > 0 ? renderListings(group.jobs.slice(0, 3)) : (
                    <p className="py-4 text-sm text-zinc-500">No verified listings in this category right now.</p>
                  )}
                </section>
              ))}
            </div>
          ) : visibleJobs.length > 0 ? (
            renderListings(visibleJobs)
          ) : (
            <div className="py-14 text-center">
              <Lucide.SearchX size={25} className="mx-auto text-zinc-400" aria-hidden="true" />
              <h2 className="mt-3 text-sm font-semibold text-zinc-900">
                {isSavedPage ? 'No saved jobs yet' : 'No matching verified opportunities'}
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                {isSavedPage ? 'Save a listing to keep it here on this device.' : 'Adjust your search or filters to see other listings.'}
              </p>
              {isSavedPage ? (
                <Link to="/decode/jobs" className="mt-3 inline-block text-sm font-medium text-zinc-800 underline">Browse jobs</Link>
              ) : (
                <button type="button" onClick={clearFilters} className="mt-3 text-sm font-medium text-zinc-800 underline">Clear filters</button>
              )}
            </div>
          )}
        </section>

        <footer className="mt-12 border-t border-zinc-200 pt-4 text-xs text-zinc-500">
          Listings are shown only when their category and role classification are known. Check each employer’s official application page for current eligibility and availability.
          <span className="mx-2">·</span>
          <Link to="/decode/resources" className="underline underline-offset-2">Explore learning resources</Link>
        </footer>
      </main>
      <DecodeFooter />
    </DecodePageWrapper>
  );
};

export default DecodeJobsPage;
