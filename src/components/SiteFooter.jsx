import { Link, useNavigate } from 'react-router-dom';
import { useTransitionContext } from '../context/TransitionContext';

const SiteFooter = () => {
  const navigate = useNavigate();
  const { startTransitionToDecode } = useTransitionContext();

  const handleDecodeClick = (e) => {
    e.preventDefault();
    startTransitionToDecode(() => {
      navigate('/decode');
    });
  };

  return (
    <footer className="w-full max-w-[1500px] mx-auto px-4 md:px-6 mt-20 border-t border-white/5 pt-10 pb-6 text-white/50 text-xs font-outfit">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <Link to="/" className="text-white font-black tracking-widest text-base uppercase hover:text-red-400 transition-colors">
            Raju Perumalla
          </Link>
          <p className="text-white/30 text-xs mt-0.5">
            Full-Stack Developer · Google Student Ambassador '26 · Cloud & AI
          </p>
        </div>

        {/* Essential Trust, Policy & Navigation Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center items-center gap-4 text-xs">
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <span className="text-white/10">•</span>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          <span className="text-white/10">•</span>
          <Link to="/decode" onClick={handleDecodeClick} className="hover:text-white transition-colors">Decode</Link>
          <span className="text-white/10">•</span>
          <Link to="/blog" className="hover:text-white transition-colors">Articles</Link>
          <span className="text-white/10">•</span>
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="text-white/10">•</span>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          <span className="text-white/10">•</span>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sitemap</a>
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://github.com/rajuperumalla951515"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-white/10">|</span>
          <a
            href="https://www.linkedin.com/in/rajuperumalla/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn profile @rajuperumalla"
          >
            LinkedIn
          </a>
          <span className="text-white/10">|</span>
          <a
            href="https://www.instagram.com/impressive_dev_34"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-white/[0.03] pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-white/30">
        <p>© {new Date().getFullYear()} Raju Perumalla. All rights reserved.</p>
        <p className="tracking-widest uppercase">Made with ♥ in India</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
