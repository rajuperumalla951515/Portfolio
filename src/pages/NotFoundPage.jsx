import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import SiteFooter from '../components/SiteFooter';
import * as Lucide from 'lucide-react';
import { usePageSEO } from '../utils/usePageSEO';

const IconWrapper = ({ name, ...props }) => {
  const Icon = Lucide[name];
  return Icon ? <Icon {...props} /> : <Lucide.AlertCircle {...props} />;
};

const NotFoundPage = () => {
  usePageSEO({
    title: "404 - Page Not Found | Raju Perumalla",
    description: "The page you are looking for does not exist on Raju Perumalla's portfolio and technical blog.",
    canonical: undefined,
    robots: "noindex, follow",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-outfit">
      <HeaderNav />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-36 pb-20">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <IconWrapper name="Compass" size={32} />
        </div>

        <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 tracking-tighter">
          404
        </span>

        <h1 className="text-2xl md:text-3xl font-bold text-white mt-4">
          Page Not Found
        </h1>

        <p className="text-white/60 text-sm md:text-base mt-2 max-w-md">
          The page you are looking for doesn't exist, has been moved, or the URL might have a typo.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg"
          >
            Return to Portfolio
          </Link>
          <Link
            to="/blog"
            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs tracking-wider uppercase transition-all"
          >
            Explore Articles
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default NotFoundPage;
