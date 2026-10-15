import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { decodeCategories } from '../data/decodeData';
import { useTransitionContext } from '../context/TransitionContext';
import myLogo from '../assets/mylogo.png';

export const DecodeNav = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { startTransitionToPortfolio } = useTransitionContext();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenus = () => {
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
  };

  const handlePortfolioClick = (e) => {
    e.preventDefault();
    closeMenus();
    startTransitionToPortfolio(() => {
      navigate('/');
    });
  };

  const navShortcuts = [
    { name: 'Study Materials', path: '/decode/study-material' },
    { name: 'Roadmaps', path: '/decode/roadmaps' },
    { name: 'Jobs & Internships', path: '/decode/jobs' },
    { name: 'Hackathons', path: '/decode/hackathons' },
    { name: 'Final-Year Projects', path: '/decode/final-year-projects' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm">
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Portfolio Brand Logo & Decode Section Header */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              onClick={handlePortfolioClick}
              className="flex items-center gap-2 py-1 px-1 rounded-md hover:bg-zinc-100 transition-colors group select-none"
              title="Return to Raju Perumalla Portfolio"
            >
              <img
                src={myLogo}
                alt="Raju Perumalla"
                className="w-7 h-7 rounded-full border border-zinc-200/90 object-cover shadow-2xs group-hover:scale-105 transition-transform"
                width={28}
                height={28}
              />
              <span className="main-logo-font text-gradient hidden sm:inline text-base leading-none">
                Raju Perumalla
              </span>
              <span className="main-logo-font text-gradient inline sm:hidden text-sm leading-none font-bold">
                RP
              </span>
            </Link>

            <span className="text-zinc-300 select-none font-light">/</span>

            <Link
              to="/decode"
              className="flex items-center gap-1.5 group"
            >
              <span className="text-base font-black tracking-wider text-zinc-900 group-hover:text-red-600 transition-colors">
                DECODE
              </span>
            </Link>
          </div>

          {/* Center/Right: Desktop Navigation */}
          <nav aria-label="Decode Navigation" className="hidden lg:flex items-center gap-1 text-xs">
            <Link
              to="/decode"
              onClick={closeMenus}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                location.pathname === '/decode'
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              All Resources
            </Link>

            {navShortcuts.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenus}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* All Categories Dropdown */}
            <div className="relative ml-1" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                  categoriesOpen
                    ? 'border-zinc-300 bg-zinc-100 text-zinc-900'
                    : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
              >
                <span>More Categories</span>
                <Lucide.ChevronDown
                  size={13}
                  className={`transition-transform duration-150 ${categoriesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {categoriesOpen && (
                <div className="absolute right-0 mt-1.5 w-60 rounded-lg bg-white border border-zinc-200 shadow-lg py-1.5 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 mb-1">
                    All Categories
                  </div>
                  {decodeCategories.map((cat) => {
                    const isCatActive = location.pathname === `/decode/${cat.slug}`;
                    return (
                      <Link
                        key={cat.slug}
                        to={`/decode/${cat.slug}`}
                        onClick={closeMenus}
                        className={`px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                          isCatActive
                            ? 'bg-zinc-50 text-red-600 font-semibold'
                            : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                        }`}
                      >
                        <span>{cat.title}</span>
                        <Lucide.ChevronRight size={12} className="text-zinc-300" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <Lucide.X size={18} /> : <Lucide.Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 shadow-md">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Categories
          </div>
          <div className="grid grid-cols-1 gap-1">
            <Link
              to="/decode"
              onClick={closeMenus}
              className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                location.pathname === '/decode'
                  ? 'bg-zinc-100 text-zinc-900 font-bold'
                  : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              All Resources & Search
            </Link>
            {decodeCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/decode/${cat.slug}`}
                onClick={closeMenus}
                className={`px-3 py-2 rounded-md text-xs flex items-center justify-between transition-colors ${
                  location.pathname === `/decode/${cat.slug}`
                    ? 'bg-zinc-100 text-red-600 font-bold'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <span>{cat.title}</span>
                <Lucide.ChevronRight size={13} className="text-zinc-400" />
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100">
            <Link
              to="/"
              onClick={handlePortfolioClick}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-800 hover:text-zinc-900 py-1"
            >
              <img
                src={myLogo}
                alt="Raju Perumalla"
                className="w-5 h-5 rounded-full border border-zinc-200 object-cover"
                width={20}
                height={20}
              />
              <span className="main-logo-font text-gradient text-sm">Raju Perumalla Portfolio</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default DecodeNav;
