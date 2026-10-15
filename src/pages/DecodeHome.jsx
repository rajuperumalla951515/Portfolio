import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import DecodeNav from '../components/DecodeNav';
import DecodeFooter from '../components/DecodeFooter';
import DecodePageWrapper from '../components/DecodePageWrapper';
import ResourceCard from '../components/ResourceCard';
import ResourceCardSkeleton from '../components/ResourceCardSkeleton';
import { decodeService } from '../services/decodeService';
import { usePageSEO } from '../utils/usePageSEO';

const CategoryIcon = ({ name, size = 16, className = 'text-zinc-600' }) => {
  const IconComponent = Lucide[name] || Lucide.BookOpen;
  return <IconComponent size={size} className={className} />;
};

const DecodeHome = () => {
  usePageSEO({
    title: 'Decode – Study Materials, Opportunities & Project Resources for Students | Raju Perumalla',
    description: 'A practical, curated directory for students: computer science study materials, developer learning roadmaps, verified internships, final-year capstone architectures, and references.',
    canonical: 'https://www.rajuperumalla.in/decode',
    ogType: 'website',
    ogImage: 'https://www.rajuperumalla.in/images/profile.png',
  });

  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [totalResources, setTotalResources] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      const res = await decodeService.getCategories();
      if (isMounted) {
        setCategories(res.data || []);
      }
    }
    loadCategories();
    return () => { isMounted = false; };
  }, []);

  // Fetch resources when search, category, or page changes
  useEffect(() => {
    let isMounted = true;

    async function loadResources() {
      setError(null);
      const res = await decodeService.getResources({
        categorySlug: selectedCategory,
        query: searchQuery,
        page,
        limit: 12,
      });

      if (isMounted) {
        setResources(res.data || []);
        setTotalResources(res.total || 0);
        setTotalPages(res.totalPages || 1);
        setLoading(false);
        setIsSearching(false);
        if (res.error && (!res.data || res.data.length === 0)) {
          setError("Resources couldn't be loaded. Please check your connection and try again.");
        }
      }
    }

    const timer = setTimeout(() => {
      loadResources();
    }, 180);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [searchQuery, selectedCategory, page]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPage(1);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <DecodePageWrapper>
      <DecodeNav />

      <main className="flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* COMPACT FIRST SCREEN (Immediately Useful, Zero Promotional Slogans) */}
        <header className="mb-6 pb-6 border-b border-zinc-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Decode
            </h1>
            <p className="text-zinc-600 text-xs sm:text-sm mt-1 max-w-xl">
              Study materials, opportunities, and project resources for students.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
            <span><strong>{totalResources}</strong> Published Resources</span>
            <span className="text-zinc-300">·</span>
            <span><strong>{categories.length}</strong> Categories</span>
          </div>
        </header>

        {/* SEARCH & CATEGORY FILTER TOOLBAR */}
        <section aria-label="Search and Category Filters" className="mb-8 space-y-3.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input with Debounce Status Spinner */}
            <div className="relative flex-1">
              <Lucide.Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(true);
                  setPage(1);
                }}
                placeholder="Search study materials, internships, hackathons, projects, tools (e.g. Python, GSoC, Capstone, React)..."
                className="w-full pl-9 pr-14 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-900 text-xs placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 transition-all shadow-2xs"
                aria-label="Search resources"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {isSearching && (
                  <Lucide.Loader2 size={13} className="text-zinc-400 animate-spin" />
                )}
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setPage(1);
                    }}
                    className="text-zinc-400 hover:text-zinc-700 p-0.5 rounded transition-colors"
                    aria-label="Clear search query"
                  >
                    <Lucide.X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Reset Filters Button */}
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold shrink-0 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Category Filter Pills (Instant Viewport Access) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-xs">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-zinc-900 text-white shadow-2xs'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/90'
              }`}
            >
              All Resources
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? 'bg-zinc-900 text-white shadow-2xs'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/90'
                }`}
              >
                <CategoryIcon name={cat.icon} size={13} className={selectedCategory === cat.slug ? 'text-white' : 'text-zinc-600'} />
                <span>{cat.shortTitle}</span>
              </button>
            ))}
          </div>
        </section>

        {/* PRIMARY RESOURCE LISTINGS */}
        <section aria-label="Resource Listings" className="mb-14">
          {loading ? (
            /* Proportional Skeleton Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-7">
              {[...Array(6)].map((_, i) => (
                <ResourceCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            /* Helpful Error State with Retry */
            <div className="p-8 text-center rounded-xl bg-white border border-zinc-200 shadow-2xs max-w-lg mx-auto">
              <Lucide.AlertCircle size={28} className="mx-auto text-amber-500 mb-2" />
              <h2 className="text-sm font-bold text-zinc-900">{error}</h2>
              <button
                onClick={handleResetFilters}
                className="mt-3.5 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Retry Request
              </button>
            </div>
          ) : resources.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-7">
                {resources.map((res, idx) => {
                  const cat = categories.find((c) => c.slug === res.category);
                  return (
                    <ResourceCard
                      key={res.id}
                      resource={res}
                      category={cat}
                      index={idx}
                    />
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8">
                  <button
                    disabled={page <= 1}
                    onClick={() => {
                      setPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-medium text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-xs text-zinc-500 px-2 font-medium">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => {
                      setPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-medium text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Clean Empty State */
            <div className="p-12 text-center rounded-xl bg-white border border-zinc-200 max-w-lg mx-auto shadow-2xs">
              <Lucide.SearchX size={32} className="mx-auto text-zinc-300 mb-2" />
              <h2 className="text-sm font-bold text-zinc-800">No resources found</h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                No published resources match your current filter. Try resetting your search query or selecting another category.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* DOMAIN CATEGORIES OVERVIEW */}
        <section aria-label="Browse by Category" className="border-t border-zinc-200 pt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900">
              Browse by Category
            </h2>
            <span className="text-xs text-zinc-500 font-medium">{categories.length} Categories</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/decode/${cat.slug}`}
                className="p-4 rounded-xl bg-white border border-zinc-200/90 hover:border-zinc-300 hover:shadow-2xs transition-all flex items-start gap-3.5 group focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                <div className="w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-700 group-hover:text-red-600 shrink-0 transition-colors">
                  <CategoryIcon name={cat.icon} size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-zinc-900 group-hover:text-red-600 transition-colors truncate">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <DecodeFooter />
    </DecodePageWrapper>
  );
};

export default DecodeHome;
