import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import SiteFooter from '../components/SiteFooter';
import * as Lucide from 'lucide-react';
import { usePageSEO } from '../utils/usePageSEO';

const IconWrapper = ({ name, ...props }) => {
  const Icon = Lucide[name];
  return Icon ? <Icon {...props} /> : <Lucide.FileText {...props} />;
};

const TermsPage = () => {
  usePageSEO({
    title: "Terms of Use | Raju Perumalla Portfolio & Technical Journal",
    description: "Terms of service, intellectual property guidelines, and usage conditions for Raju Perumalla's official website and engineering articles.",
    canonical: "https://www.rajuperumalla.in/terms",
    ogImage: "https://www.rajuperumalla.in/images/profile.png",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-outfit selection:bg-red-500/30 selection:text-white">
      <HeaderNav />

      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/40 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/80">Terms of Use</span>
        </nav>

        {/* Title */}
        <div className="mb-10 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <IconWrapper name="FileText" size={14} /> Usage Terms
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Terms of Use
          </h1>
          <p className="text-xs text-white/40 mt-2">
            Last Updated: March 2025 · Applicable to all visitors of rajuperumalla.in
          </p>
        </div>

        {/* Content Body */}
        <article className="space-y-8 text-white/80 text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and browsing <strong>https://www.rajuperumalla.in/</strong> (the "Website"), you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please discontinue your use of this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              2. Intellectual Property & Code Snippets
            </h2>
            <p>
              All original editorial articles, project write-ups, custom graphics, and website design elements are the intellectual property of <strong>Raju Perumalla</strong> unless explicitly stated otherwise.
            </p>
            <p>
              Code snippets provided within our technical articles and tutorials are provided for educational and illustrative purposes. You are welcome to adapt and learn from code examples in your own personal and commercial projects, provided they are tested independently for your specific production environment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              3. Technical Disclaimer
            </h2>
            <p>
              The technical content, tutorials, architectural diagrams, and code snippets published on this website are provided strictly on an <strong>"as-is" and "as-available"</strong> basis without warranties of any kind.
            </p>
            <p>
              While every effort is made to ensure accurate technical documentation, Raju Perumalla makes no representation that implementation of any code sample will operate error-free across all system environments, cloud versions, or framework releases. You assume full responsibility for any systems you architect using concepts presented on this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              4. Acceptable Website Usage
            </h2>
            <p>
              When using this website, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/70">
              <li>Engage in denial-of-service (DoS/DDoS) attacks or automated scraping designed to degrade server performance.</li>
              <li>Submit abusive, defamatory, or fraudulent messages through our contact channels.</li>
              <li>Misrepresent your identity or attempt to breach any authentication controls.</li>
              <li>Engage in invalid traffic generation, click-fraud, or automated manipulation of any future advertisements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              5. External Links
            </h2>
            <p>
              This website contains links to external third-party platforms (such as GitHub, LinkedIn, YouTube, Instagram, and official documentation). We do not control and are not responsible for the privacy practices, content, or availability of external websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              6. Modifications to Terms
            </h2>
            <p>
              We reserve the right to revise or update these Terms of Use at any time. Any changes will be posted on this page with an updated modification date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              7. Contact & Inquiries
            </h2>
            <p>
              For legal inquiries or permission requests regarding content syndication, please reach out via email:
            </p>
            <p className="text-sm font-semibold text-white/90">
              Email: <a href="mailto:23ra1a05b0@kpritech.ac.in" className="text-red-400 hover:underline">23ra1a05b0@kpritech.ac.in</a>
            </p>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
};

export default TermsPage;
