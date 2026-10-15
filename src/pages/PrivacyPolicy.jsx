import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import SiteFooter from '../components/SiteFooter';
import * as Lucide from 'lucide-react';
import { usePageSEO } from '../utils/usePageSEO';

const IconWrapper = ({ name, ...props }) => {
  const Icon = Lucide[name];
  return Icon ? <Icon {...props} /> : <Lucide.ShieldCheck {...props} />;
};

const PrivacyPolicy = () => {
  usePageSEO({
    title: "Privacy Policy | Raju Perumalla Portfolio & Technical Journal",
    description: "Official privacy policy and data governance practices for Raju Perumalla's personal website and technical engineering blog.",
    canonical: "https://www.rajuperumalla.in/privacy-policy",
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
          <span className="text-white/80">Privacy Policy</span>
        </nav>

        {/* Title */}
        <div className="mb-10 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <IconWrapper name="Shield" size={14} /> Legal & Data Transparency
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-white/40 mt-2">
            Last Updated: March 2025 · Effective immediately for all visitors to rajuperumalla.in
          </p>
        </div>

        {/* Content Body */}
        <article className="space-y-8 text-white/80 text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              1. Overview & Scope
            </h2>
            <p>
              This Privacy Policy explains how <strong>Raju Perumalla</strong> ("we", "us", or "our"), operator of <strong>https://www.rajuperumalla.in/</strong>, collects, processes, and protects your information when you visit our website, read our technical articles, or communicate with us through our contact mechanisms.
            </p>
            <p>
              We are committed to maintaining data privacy and ensuring transparency regarding our technical architecture, cookies, and any third-party integrations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              2. Information We Collect
            </h2>
            <p>
              We only collect information that is strictly necessary to deliver a functional, secure, and responsive experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>
                <strong>Direct Communications (Contact Form):</strong> When you submit a message through our contact interface, we collect your name, email address, and message content. This data is transmitted securely and stored in our database (Supabase / MongoDB Atlas) to enable us to read and respond to your inquiry.
              </li>
              <li>
                <strong>Technical & Server Logs:</strong> Like most web servers, our hosting provider (Vercel) automatically logs standard network requests, including IP address, browser user-agent, operating system, referring URL, and page timestamps for DDoS protection, performance monitoring, and security diagnosis.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              3. Cookies & Advertising Technologies (Google AdSense Disclosure)
            </h2>
            <p>
              This website is prepared for advertising partnerships, specifically <strong>Google AdSense</strong>. In compliance with Google's publisher policies and international privacy standards, we disclose the following:
            </p>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-white/90">
              <p>
                <strong>Third-Party Vendors & Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the Internet.
              </p>
              <p>
                <strong>Advertising Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve ads to our visitors based on their visit to our site and/or other sites on the Internet.
              </p>
              <p>
                <strong>How to Opt-Out:</strong> Users may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ads Settings</a>. Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">www.aboutads.info</a>.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              4. Third-Party Service Providers & Cloud Infrastructure
            </h2>
            <p>
              We utilize trusted cloud infrastructure to maintain, deploy, and secure this platform:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li><strong>Hosting & Edge Delivery:</strong> Cloudflare Inc. (DNS, SSL/TLS, edge computing, and global static asset delivery).</li>
              <li><strong>Database Services:</strong> Supabase Inc. (PostgreSQL with Row Level Security) and MongoDB Atlas (encrypted cloud database).</li>
              <li><strong>Notification Services:</strong> EmailJS (secure relay of contact form messages).</li>
              <li><strong>Embedded Content:</strong> YouTube (technical video demonstrations). Playing embedded videos may allow YouTube to place functional cookies on your browser.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              5. Decode Resource Directory & Outbound Attribution
            </h2>
            <p>
              Within the <strong>Decode</strong> directory, visitors can discover student resources, hackathons, job listings, and documentation. When you click an external link:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>
                <strong>First-Party Redirects (/go/:slug):</strong> Navigation is routed through our domain to verify destination safety and prevent malicious phishing links.
              </li>
              <li>
                <strong>Anonymous Outbound Telemetry:</strong> We record aggregate statistics (resource category, destination domain, timestamp, device type). We strictly do NOT collect personal data, do NOT fingerprint browsers, and do NOT track user behavior on third-party websites.
              </li>
              <li>
                <strong>Referral & Commercial Attribution:</strong> Where legitimate affiliate or educational partnership programs exist, attribution parameters may be attached. Links with commercial relationships use standard <code>rel="sponsored"</code> or <code>rel="noopener noreferrer"</code> attributes.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              6. Your Rights & Data Protection (GDPR / CCPA)
            </h2>
            <p>
              Depending on your jurisdiction, you may have rights under data privacy laws (such as the General Data Protection Regulation or California Consumer Privacy Act) to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/70">
              <li>Request access to any personal messages you have submitted to us.</li>
              <li>Request deletion or correction of your email communications.</li>
              <li>Object to or restrict specific processing of your data.</li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal information to third-party data brokers under any circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              7. Security Safeguards
            </h2>
            <p>
              We enforce modern security best practices, including TLS/HTTPS encryption across our entire domain, strictly parameterized database queries, and environment variable isolation for all API keys and secrets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              8. Contact Information
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact the website administrator directly:
            </p>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-sm space-y-1">
              <p><strong>Website Owner:</strong> Raju Perumalla</p>
              <p><strong>Email:</strong> <a href="mailto:23ra1a05b0@kpritech.ac.in" className="text-red-400 hover:underline">23ra1a05b0@kpritech.ac.in</a></p>
              <p><strong>Website:</strong> <a href="https://www.rajuperumalla.in/" className="text-blue-400 hover:underline">https://www.rajuperumalla.in/</a></p>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
};

export default PrivacyPolicy;
