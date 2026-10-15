import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import linkedinLogo from '../assets/linkedin.png';
import gmailLogo from '../assets/gmail.png';
import { useTransitionContext } from '../context/TransitionContext';

const HeaderNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { startTransitionToDecode } = useTransitionContext();

  const handleLinkClick = (e, itemPath) => {
    if (itemPath === '/decode') {
      e.preventDefault();
      setMobileOpen(false);
      startTransitionToDecode(() => {
        navigate('/decode', { state: { transitionFromPortfolio: true } });
      });
    } else {
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/contact' },
    { label: 'DECODE', path: '/decode' },
  ];

  return (
    <header className="fixed top-4 md:top-8 left-0 right-0 z-50 w-full pointer-events-none">
      <div className="w-full max-w-[450px] md:max-w-[1500px] mx-auto px-4 md:px-6 pointer-events-auto">
        <div className="glass-container w-full">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>
          <div className="glass-content flex justify-between items-center w-full px-4 py-2 md:px-8 md:py-4">
            {/* Logo */}
            <Link to="/" className="main-logo-font text-gradient select-none">
              <span className="hidden md:inline">Raju Perumalla</span>
              <span className="inline md:hidden">RP</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <ul className="flex items-center gap-6 text-xs tracking-widest font-semibold font-outfit">
                {navLinks.map((item) => {
                  const isActive =
                    item.path === '/decode'
                      ? location.pathname.startsWith('/decode')
                      : location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={(e) => handleLinkClick(e, item.path)}
                        className={`transition-colors duration-200 uppercase py-1 px-2 rounded ${isActive
                            ? 'text-red-500 font-bold border-b border-red-500/50'
                            : 'text-white/70 hover:text-white'
                          }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Quick Contact Icons */}
              <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <a
                  href="https://www.linkedin.com/in/rajuperumalla/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] hover:border-red-500/50 transition-all p-1.5"
                  title="LinkedIn (@rajuperumalla)"
                  aria-label="Raju Perumalla's LinkedIn Profile"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="w-full h-full object-contain" />
                </a>
                <a
                  href="mailto:23ra1a05b0@kpritech.ac.in"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] hover:border-red-500/50 transition-all p-1.5"
                  title="Email Raju"
                >
                  <img src={gmailLogo} alt="Gmail" className="w-full h-full object-contain" />
                </a>
              </div>
            </nav>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white hover:text-red-500 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <Lucide.X size={24} /> : <Lucide.Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center pointer-events-auto">
          <ul className="flex flex-col gap-8 text-center text-2xl font-outfit tracking-widest font-semibold">
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className="text-white hover:text-red-500 transition-colors uppercase"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
