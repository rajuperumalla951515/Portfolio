import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import DecodeNav from '../components/DecodeNav';
import DecodeFooter from '../components/DecodeFooter';
import DecodePageWrapper from '../components/DecodePageWrapper';
import ResourceCard from '../components/ResourceCard';
import ResourceCardSkeleton from '../components/ResourceCardSkeleton';
import { decodeService } from '../services/decodeService';
import { usePageSEO } from '../utils/usePageSEO';

const CategoryIcon = ({ name, size = 16, className = 'text-zinc-600' }) => {
  const IconComponent = Lucide[name] || Lucide.FolderOpen;
  return <IconComponent size={size} className={className} />;
};

export const DecodeCategory = () => {
  const { category: categorySlug } = useParams();
  const isJobsSection = categorySlug === 'jobs';

  const [category, setCategory] = useState(null);
  const [resources, setResources] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');

  // General category filter
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Job specific filters (2026 & 2027 Fresher Discovery)
  const [selectedBatch, setSelectedBatch] = useState('all'); // 'all', '2026', '2027'
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'Internship', 'Full-time', 'Graduate Trainee'
  const [selectedMode, setSelectedMode] = useState('all'); // 'all', 'Remote', 'Hybrid', 'On-site'
  const [selectedStipend, setSelectedStipend] = useState('all'); // 'all', 'paid'
  const [selectedSort, setSelectedSort] = useState('recent'); // 'recent', 'closing_soon'

  usePageSEO({
    title: isJobsSection
      ? 'Jobs & Internships for 2026 & 2027 Batches – Decode | Raju Perumalla'
      : category
      ? `${category.title} – Decode Directory | Raju Perumalla`
      : 'Category – Decode | Raju Perumalla',
    description: isJobsSection
      ? 'Verified student internships, graduate trainee engineering roles, and fresher software opportunities specifically for 2026 and 2027 graduating batches. Zero expired listings.'
      : category
      ? category.metaDescription || category.description
      : 'Browse educational resources in the Decode directory.',
    canonical: `https://www.rajuperumalla.in/decode/${categorySlug}`,
    ogType: 'website',
    ogImage: 'https://www.rajuperumalla.in/images/profile.png',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  // Load category and resources with server-side expiry & batch criteria
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const [catRes, resRes, allCatRes] = await Promise.all([
        decodeService.getCategoryBySlug(categorySlug),
        decodeService.getResources({
          categorySlug,
          query: search,
          difficulty: isJobsSection ? 'All' : selectedDifficulty,
          batch: isJobsSection ? selectedBatch : 'all',
          opportunityType: isJobsSection ? selectedType : 'all',
          workArrangement: isJobsSection ? selectedMode : 'all',
          stipend: isJobsSection ? selectedStipend : 'all',
          limit: 50,
          includeExpired: false, // Never load expired jobs in public active category view
        }),
        decodeService.getCategories(),
      ]);

      if (isMounted) {
        setCategory(catRes.data);
        setResources(resRes.data || []);
        setAllCategories(allCatRes.data || []);
        setLoading(false);
        setIsSearching(false);
      }
    }

    const timer = setTimeout(() => {
      loadData();
    }, 150);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [
    categorySlug,
    search,
    selectedDifficulty,
    selectedBatch,
    selectedType,
    selectedMode,
    selectedStipend,
    isJobsSection,
  ]);

  // Sorted resources
  const displayResources = useMemo(() => {
    if (!isJobsSection) return resources;

    const copy = [...resources];
    if (selectedSort === 'closing_soon') {
      copy.sort((a, b) => {
        const deadA = a.applicationDeadline || a.opportunity?.deadline;
        const deadB = b.applicationDeadline || b.opportunity?.deadline;
        if (!deadA && !deadB) return 0;
        if (!deadA) return 1;
        if (!deadB) return -1;
        return new Date(deadA) - new Date(deadB);
      });
    } else {
      // Recent first
      copy.sort((a, b) => {
        const dateA = new Date(a.publishedDate || a.updatedDate || 0);
        const dateB = new Date(b.publishedDate || b.updatedDate || 0);
        return dateB - dateA;
      });
    }
    return copy;
  }, [resources, isJobsSection, selectedSort]);

  // Compute live stats for Jobs view
  const jobStats = useMemo(() => {
    if (!isJobsSection) return null;
    const active = resources.filter((r) => !r.isExpired);
    const b2026 = active.filter((r) => (r.eligibleBatches || []).includes(2026)).length;
    const b2027 = active.filter((r) => (r.eligibleBatches || []).includes(2027)).length;
    const intern = active.filter((r) => (r.opportunityType || r.opportunity?.jobType || '').toLowerCase().includes('intern')).length;
    return { total: active.length, b2026, b2027, intern };
  }, [resources, isJobsSection]);

  const resetJobFilters = () => {
    setSelectedBatch('all');
    setSelectedType('all');
    setSelectedMode('all');
    setSelectedStipend('all');
    setSelectedSort('recent');
    setSearch('');
  };

  if (!loading && !category) {
    return (
      <DecodePageWrapper>
        <DecodeNav />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-20 max-w-md mx-auto">
          <Lucide.AlertCircle size={36} className="text-amber-500 mb-3" />
          <h1 className="text-xl font-bold text-zinc-900">Category Not Found</h1>
          <p className="text-zinc-600 text-xs mt-1">
            The category "{categorySlug}" does not exist in Decode.
          </p>
          <Link
            to="/decode"
            className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 text-white font-medium text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            ← Return to Decode Directory
          </Link>
        </main>
        <DecodeFooter />
      </DecodePageWrapper>
    );
  }

  const otherCategories = allCategories.filter((c) => c.slug !== categorySlug);

  return (
    <DecodePageWrapper>
      <DecodeNav />

      <main className="flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* BREADCRUMB & CATEGORY HEADER */}
        <header className="mb-6 pb-6 border-b border-zinc-200 space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-zinc-500 flex items-center gap-1.5">
            <Link to="/decode" className="hover:text-zinc-900 transition-colors">Decode</Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900 font-semibold">{category?.title || categorySlug}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center shrink-0">
                  <CategoryIcon name={category?.icon} size={16} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                  {isJobsSection ? 'Jobs & Internships (2026 & 2027 Batches)' : category?.title}
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                  {displayResources.length} Active {displayResources.length === 1 ? 'Role' : 'Roles'}
                </span>
              </div>
              <p className="text-zinc-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
                {isJobsSection
                  ? 'Curated fresher software engineer, graduate trainee, and summer internship opportunities for 2026 & 2027 graduating batches. Expired listings are automatically retired.'
                  : category?.description}
              </p>
            </div>

            {/* In-category Search Input */}
            <div className="relative min-w-[240px] md:w-80">
              <Lucide.Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsSearching(true);
                }}
                placeholder={isJobsSection ? 'Search by role, company, skills (Python, React)...' : `Search in ${category?.shortTitle || 'category'}...`}
                className="w-full pl-8 pr-12 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-900 text-xs placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 transition-all shadow-2xs"
                aria-label="Search resources in this category"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {isSearching && (
                  <Lucide.Loader2 size={12} className="text-zinc-400 animate-spin" />
                )}
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="text-zinc-400 hover:text-zinc-700 p-0.5"
                    aria-label="Clear search"
                  >
                    <Lucide.X size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* JOBS SECTION: RICH STATS & DEDICATED FILTERS */}
          {isJobsSection ? (
            <div className="pt-2 space-y-3">
              {/* Quick Summary Pill Bar */}
              {jobStats && (
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>{jobStats.total} Active Verified Roles</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-medium text-[11px]">
                    <Lucide.GraduationCap size={12} />
                    <span>{jobStats.b2026} Roles for 2026 Batch</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-medium text-[11px]">
                    <Lucide.GraduationCap size={12} />
                    <span>{jobStats.b2027} Roles for 2027 Batch</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-medium text-[11px]">
                    <Lucide.Briefcase size={12} />
                    <span>{jobStats.intern} Internships</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 ml-auto hidden lg:inline-flex items-center gap-1">
                    <Lucide.ShieldCheck size={13} className="text-emerald-600" />
                    <span>Zero Expired Postings Enforced</span>
                  </span>
                </div>
              )}

              {/* Comprehensive Filter Bar */}
              <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/90 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Batch Eligibility Filter */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mr-1">
                    Graduating Batch:
                  </span>
                  {[
                    { id: 'all', label: 'All Batches' },
                    { id: '2026', label: '🎓 2026 Batch' },
                    { id: '2027', label: '🎓 2027 Batch' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBatch(b.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedBatch === b.id
                          ? 'bg-zinc-900 text-white shadow-2xs'
                          : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>

                {/* Secondary Filters: Type, Mode, Stipend, Sort */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Opportunity Type */}
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs font-medium focus:outline-none focus:border-zinc-400"
                    aria-label="Filter by opportunity type"
                  >
                    <option value="all">All Types</option>
                    <option value="internship">Internships</option>
                    <option value="full-time">Full-Time</option>
                    <option value="trainee">Graduate Trainee</option>
                  </select>

                  {/* Work Mode */}
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs font-medium focus:outline-none focus:border-zinc-400"
                    aria-label="Filter by work arrangement"
                  >
                    <option value="all">All Modes</option>
                    <option value="remote">Remote Only</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="on-site">On-site</option>
                  </select>

                  {/* Stipend */}
                  <select
                    value={selectedStipend}
                    onChange={(e) => setSelectedStipend(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs font-medium focus:outline-none focus:border-zinc-400"
                    aria-label="Filter by compensation"
                  >
                    <option value="all">All Compensation</option>
                    <option value="paid">Paid / Stipend Funded</option>
                  </select>

                  {/* Sort */}
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs font-medium focus:outline-none focus:border-zinc-400"
                    aria-label="Sort opportunities"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="closing_soon">Closing Soonest</option>
                  </select>

                  {(selectedBatch !== 'all' || selectedType !== 'all' || selectedMode !== 'all' || selectedStipend !== 'all' || search) && (
                    <button
                      onClick={resetJobFilters}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Clear all active filters"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* NON-JOB CATEGORY LEVEL FILTERS */
            <div className="flex items-center gap-1.5 pt-2 text-xs">
              <span className="text-[11px] text-zinc-400 uppercase font-medium mr-1">Level:</span>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-2.5 py-1 rounded-md transition-colors text-xs font-medium cursor-pointer ${
                    selectedDifficulty === level
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/90'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* RESOURCE LISTINGS */}
        <section aria-label="Category Resources" className="mb-14">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-7">
              {[...Array(6)].map((_, i) => (
                <ResourceCardSkeleton key={i} />
              ))}
            </div>
          ) : displayResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-7">
              {displayResources.map((res, idx) => (
                <ResourceCard
                  key={res.id || res.slug}
                  resource={res}
                  category={category}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-zinc-200 max-w-lg mx-auto shadow-2xs">
              <Lucide.SearchX size={36} className="mx-auto text-zinc-300 mb-2" />
              <h2 className="text-sm font-bold text-zinc-800">No active opportunities match your criteria</h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
                {isJobsSection
                  ? 'Expired or past-deadline opportunities are automatically removed. Try switching batch filters or clearing your search.'
                  : search
                  ? `No resources matched "${search}". Try clearing your search query.`
                  : 'No published resources are available under the selected filters.'}
              </p>
              <button
                onClick={isJobsSection ? resetJobFilters : () => setSearch('')}
                className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* OTHER CATEGORIES QUICK JUMP */}
        {otherCategories.length > 0 && (
          <section aria-label="Other Categories" className="border-t border-zinc-200 pt-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Explore Other Domains
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {otherCategories.map((other) => (
                <Link
                  key={other.slug}
                  to={`/decode/${other.slug}`}
                  className="p-3 rounded-lg bg-white border border-zinc-200/90 hover:border-zinc-300 hover:shadow-2xs transition-all flex items-center gap-2 text-xs group focus-visible:ring-2 focus-visible:ring-zinc-400"
                >
                  <CategoryIcon name={other.icon} size={14} className="text-zinc-500 group-hover:text-red-600 shrink-0" />
                  <span className="font-medium text-zinc-700 group-hover:text-zinc-900 truncate">
                    {other.shortTitle}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <DecodeFooter />
    </DecodePageWrapper>
  );
};

export default DecodeCategory;
