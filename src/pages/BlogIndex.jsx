import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import SiteFooter from '../components/SiteFooter';
import * as Lucide from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { usePageSEO } from '../utils/usePageSEO';

const IconWrapper = ({ name, ...props }) => {
  const Icon = Lucide[name];
  return Icon ? <Icon {...props} /> : <Lucide.BookOpen {...props} />;
};

const BlogIndex = () => {
  usePageSEO({
    title: "Technical Articles & Engineering Journal | Raju Perumalla",
    description: "In-depth technical articles on IoT accident prevention, RSA cryptography, FastAPI vs Node.js scaling benchmarks, and SAP BTP enterprise development by Raju Perumalla.",
    canonical: "https://www.rajuperumalla.in/blog",
    ogImage: "https://www.rajuperumalla.in/images/profile.png",
  });

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', ...new Set(blogPosts.map(p => p.category))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-outfit selection:bg-red-500/30 selection:text-white">
      <HeaderNav />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/40 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/80">Articles</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <IconWrapper name="BookOpen" size={14} /> Technical Journal
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Engineering Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-blue-500">Case Studies</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base mt-3 leading-relaxed">
            In-depth architectural breakdowns, real-world development challenges, and tutorials covering Python, FastAPI, SAP BTP, Computer Vision, and full-stack systems.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-10 pb-6 border-b border-white/5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                    : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by topic..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 transition-all"
            />
            <IconWrapper name="Search" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.035] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between text-[11px] text-white/40">
                    <span className="text-red-400 font-bold uppercase tracking-wider">{post.category}</span>
                    <span className="flex items-center gap-1.5">
                      <IconWrapper name="Clock" size={12} /> {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Summary */}
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-white/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer of card */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                  <span>{post.publishedDate}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-white/80 group-hover:text-red-400 font-semibold transition-colors"
                  >
                    Read Full Case Study <IconWrapper name="ArrowRight" size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 border border-white/5 rounded-2xl bg-white/[0.01]">
            <IconWrapper name="SearchX" size={36} className="mx-auto text-white/20 mb-3" />
            <h3 className="text-lg font-bold text-white">No articles matched your search</h3>
            <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto">
              Try searching with different keywords or reset the category filter.
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogIndex;
