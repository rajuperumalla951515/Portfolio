import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import SiteFooter from '../components/SiteFooter';
import * as Lucide from 'lucide-react';
import { usePageSEO } from '../utils/usePageSEO';

const IconWrapper = ({ name, ...props }) => {
  const Icon = Lucide[name];
  return Icon ? <Icon {...props} /> : <Lucide.Mail {...props} />;
};

const ContactPage = () => {
  usePageSEO({
    title: "Contact Raju Perumalla | Developer Inquiries & Collaborations",
    description: "Get in touch with Raju Perumalla for full-stack engineering collaborations, AI software development projects, or technical consulting.",
    canonical: "https://www.rajuperumalla.in/contact",
    ogImage: "https://www.rajuperumalla.in/images/profile.png",
  });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('23ra1a05b0@kpritech.ac.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Send to Express Backend (securely stores in Supabase & MongoDB and sends notification)
      const response = await fetch('https://portfolio-crql.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', text: 'Thank you! Your message has been sent and recorded successfully. I will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: 'Could not send message. Please reach me directly at 23ra1a05b0@kpritech.ac.in' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: 'An unexpected network error occurred. Please try reaching me directly at 23ra1a05b0@kpritech.ac.in' });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-outfit selection:bg-red-500/30 selection:text-white">
      <HeaderNav />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/40 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/80">Contact</span>
        </nav>

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <IconWrapper name="Send" size={14} /> Get In Touch
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Conversation</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base mt-3 leading-relaxed">
            Whether you want to discuss software engineering, technical workshops, project collaboration, or just say hello, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Direct Email</span>
              <p className="text-base font-semibold text-white break-all">23ra1a05b0@kpritech.ac.in</p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <IconWrapper name={copied ? "Check" : "Copy"} size={14} className={copied ? "text-emerald-400" : "text-white/60"} />
                  {copied ? "Copied to Clipboard!" : "Copy Email"}
                </button>
                <a
                  href="mailto:23ra1a05b0@kpritech.ac.in"
                  className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <IconWrapper name="ExternalLink" size={14} /> Send Mail
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Social & Developer Profiles</span>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://github.com/rajuperumalla951515" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                    <IconWrapper name="Github" size={18} className="text-white/80" /> GitHub: @rajuperumalla951515
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/rajuperumalla9006" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                    <IconWrapper name="Linkedin" size={18} className="text-blue-400" /> LinkedIn: /in/rajuperumalla9006
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@DevRaj96660" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                    <IconWrapper name="Youtube" size={18} className="text-red-500" /> YouTube Community (2.5K+)
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/impressive_dev_34" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                    <IconWrapper name="Instagram" size={18} className="text-pink-400" /> Instagram: @impressive_dev_34
                  </a>
                </li>
              </ul>
            </div>

            {/* Response Time SLA */}
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3 text-xs text-blue-300">
              <IconWrapper name="Clock" size={16} className="shrink-0 mt-0.5" />
              <p>I typically respond to inquiries within 24 to 48 hours. For urgent matters, reaching out via LinkedIn or direct email is recommended.</p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-2">Send a Message</h2>
              <p className="text-xs text-white/40 mb-6">All fields are validated and submitted directly to our secure database.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/50">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.05] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/50">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/50">Message Details *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, project scope, or proposal..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.05] transition-all resize-none"
                  />
                </div>

                {status && (
                  <div className={`p-4 rounded-xl text-xs font-semibold border ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}>
                    {status.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Sending Message...' : 'Submit Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ContactPage;
