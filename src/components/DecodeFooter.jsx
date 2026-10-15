import { Link } from 'react-router-dom';

export const DecodeFooter = () => {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50/80 mt-auto text-zinc-600 text-xs">
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wider text-zinc-900 text-sm">DECODE</span>
              <span className="text-zinc-300">·</span>
              <span className="text-xs text-zinc-500 font-medium">Student Learning & Opportunity Directory</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1 max-w-md">
              A curated directory of computer science study materials, developer roadmaps, verified student internships, capstone project blueprints, and developer tools.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 bg-white px-3 py-1.5 rounded-md hover:border-zinc-300 transition-colors shadow-2xs"
            >
              ← Portfolio Home
            </Link>
            <a
              href="https://www.linkedin.com/in/rajuperumalla/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 bg-white px-3 py-1.5 rounded-md hover:border-zinc-300 transition-colors shadow-2xs"
              aria-label="Raju Perumalla's LinkedIn Profile (@rajuperumalla)"
            >
              LinkedIn
            </a>
            <Link
              to="/contact"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 bg-white px-3 py-1.5 rounded-md hover:border-zinc-300 transition-colors shadow-2xs"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Quick Category Navigation */}
        <div className="py-6 border-b border-zinc-200 flex flex-wrap gap-x-6 gap-y-2 text-xs">
          <span className="text-zinc-400 font-medium">Quick Links:</span>
          <Link to="/decode/study-material" className="text-zinc-600 hover:text-zinc-900 transition-colors">Study Materials</Link>
          <Link to="/decode/roadmaps" className="text-zinc-600 hover:text-zinc-900 transition-colors">Roadmaps</Link>
          <Link to="/decode/jobs" className="text-zinc-600 hover:text-zinc-900 transition-colors">Jobs & Internships</Link>
          <Link to="/decode/hackathons" className="text-zinc-600 hover:text-zinc-900 transition-colors">Hackathons</Link>
          <Link to="/decode/final-year-projects" className="text-zinc-600 hover:text-zinc-900 transition-colors">Final-Year Projects</Link>
          <Link to="/decode/freelancing" className="text-zinc-600 hover:text-zinc-900 transition-colors">Freelancing</Link>
          <Link to="/decode/references" className="text-zinc-600 hover:text-zinc-900 transition-colors">References</Link>
          <Link to="/decode/developer-tools" className="text-zinc-600 hover:text-zinc-900 transition-colors">Developer Tools</Link>
        </div>

        {/* Copyright and Legal */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} Decode · Curated by Raju Perumalla. All external opportunities belong to their respective organizations.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-zinc-600 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-zinc-600 transition-colors">Terms</Link>
            <span>·</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DecodeFooter;
