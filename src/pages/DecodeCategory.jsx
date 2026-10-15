import { useState, useEffect } from 'react';
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

const DecodeCategory = () => {
  const { category: categorySlug } = useParams();

  const [category, setCategory] = useState(null);
  const [resources, setResources] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  usePageSEO({
    title: category
      ? `${category.title} – Decode Directory | Raju Perumalla`
      : 'Category – Decode | Raju Perumalla',
    description: category
      ? category.metaDescription || category.description
      : 'Browse educational resources in the Decode directory.',
    canonical: `https://www.rajuperumalla.in/decode/${categorySlug}`,
    ogType: 'website',
    ogImage: 'https://www.rajuperumalla.in/images/profile.png',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  // Load category and resources from database service
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const [catRes, resRes, allCatRes] = await Promise.all([
        decodeService.getCategoryBySlug(categorySlug),
        decodeService.getResources({
          categorySlug,
          query: search,
          difficulty: selectedDifficulty,
          limit: 30,
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
    }, 160);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [categorySlug, search, selectedDifficulty]);

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
        <header className="mb-6 pb-6 border-b border-zinc-200 space-y-3">
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
                  {category?.title}
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                  {resources.length} {resources.length === 1 ? 'Resource' : 'Resources'}
                </span>
              </div>
              <p className="text-zinc-600 text-xs sm:text-sm max-w-2xl mt-1">
                {category?.description}
              </p>
            </div>

            {/* In-category Search Input with Active Spinner */}
            <div className="relative min-w-[240px] md:w-72">
              <Lucide.Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsSearching(true);
                }}
                placeholder={`Search in ${category?.shortTitle || 'category'}...`}
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

          {/* Difficulty / Level Filters */}
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
        </header>

        {/* RESOURCE LISTINGS */}
        <section aria-label="Category Resources" className="mb-14">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-7">
              {[...Array(6)].map((_, i) => (
                <ResourceCardSkeleton key={i} />
              ))}
            </div>
          ) : resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-7">
              {resources.map((res, idx) => (
                <ResourceCard
                  key={res.id}
                  resource={res}
                  category={category}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl bg-white border border-zinc-200 max-w-lg mx-auto shadow-2xs">
              <Lucide.SearchX size={32} className="mx-auto text-zinc-300 mb-2" />
              <h2 className="text-sm font-bold text-zinc-800">No resources found in this category</h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                {search
                  ? `No resources matched "${search}". Try clearing your search query.`
                  : 'No published resources are available under the selected filters.'}
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              )}
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
