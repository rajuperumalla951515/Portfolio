import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import SiteFooter from '../components/SiteFooter';
import * as Lucide from 'lucide-react';
import { blogPosts } from '../data/blogData';
import profilePhoto from '../assets/profile.png';
import { usePageSEO } from '../utils/usePageSEO';

const IconWrapper = ({ name, ...props }) => {
  const Icon = Lucide[name];
  return Icon ? <Icon {...props} /> : <Lucide.FileText {...props} />;
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  usePageSEO({
    title: post ? `${post.title} | Raju Perumalla` : 'Article Not Found | Raju Perumalla',
    description: post ? post.summary : 'The requested engineering article could not be found.',
    canonical: post ? `https://www.rajuperumalla.in/blog/${post.slug}` : undefined,
    ogType: post ? 'article' : 'website',
    ogImage: 'https://www.rajuperumalla.in/images/profile.png',
    robots: post ? 'index, follow' : 'noindex, follow',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col font-outfit">
        <HeaderNav />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
          <IconWrapper name="AlertTriangle" size={48} className="text-amber-400 mb-4" />
          <h1 className="text-2xl md:text-4xl font-bold">Article Not Found</h1>
          <p className="text-white/60 text-sm mt-2 max-w-md">
            The article you are searching for does not exist or may have been moved.
          </p>
          <Link
            to="/blog"
            className="mt-6 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wider uppercase transition-all"
          >
            Back to Articles
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Simple, clean Markdown formatter for headers, lists, code blocks, and paragraphs
  const renderMarkdownContent = (rawText) => {
    const lines = rawText.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBuffer = [];
    let codeLang = '';

    lines.forEach((line, index) => {
      // Code block start/end
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLang = line.replace('```', '').trim();
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <div key={`code-${index}`} className="my-6 rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] font-mono text-xs">
              {codeLang && (
                <div className="bg-white/[0.03] px-4 py-2 border-b border-white/5 text-[10px] uppercase tracking-wider text-white/40 flex justify-between items-center">
                  <span>{codeLang}</span>
                  <span className="text-[9px] font-sans text-white/20">Source Snippet</span>
                </div>
              )}
              <pre className="p-4 overflow-x-auto text-emerald-400 leading-relaxed">
                <code>{codeBuffer.join('\n')}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // H2 Headings
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-10 mb-4 border-b border-white/5 pb-2">
            {line.replace('## ', '')}
          </h2>
        );
        return;
      }

      // H3 Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg md:text-xl font-bold text-white tracking-tight mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Bullet List Items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.replace(/^[-*]\s+/, '');
        elements.push(
          <li key={`li-${index}`} className="ml-5 list-disc text-white/80 my-1 text-sm md:text-base leading-relaxed">
            {itemText}
          </li>
        );
        return;
      }

      // Numbered List Items
      if (/^\d+\.\s+/.test(line)) {
        const itemText = line.replace(/^\d+\.\s+/, '');
        elements.push(
          <li key={`nli-${index}`} className="ml-5 list-decimal text-white/80 my-1 text-sm md:text-base leading-relaxed">
            {itemText}
          </li>
        );
        return;
      }

      // Horizontal Divider
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${index}`} className="my-8 border-white/10" />);
        return;
      }

      // Normal Paragraphs
      if (line.trim().length > 0) {
        elements.push(
          <p key={`p-${index}`} className="my-3 text-white/80 text-sm md:text-base leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  // Find other articles for recommendations
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-outfit selection:bg-red-500/30 selection:text-white">
      <HeaderNav />

      <main className="flex-1 w-full max-w-[900px] mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-20">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/40 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-white transition-colors">Articles</Link>
          <span>/</span>
          <span className="text-white/80 truncate max-w-[200px] md:max-w-none">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-white/10 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold uppercase tracking-wider text-[10px]">
              {post.category}
            </span>
            <span className="text-white/40 flex items-center gap-1">
              <IconWrapper name="Clock" size={13} /> {post.readTime}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-white/40">{post.publishedDate}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base md:text-lg text-white/70 leading-relaxed">
            {post.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/60">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Main Content Body */}
        <article className="prose-dark mb-16">
          {renderMarkdownContent(post.content)}
        </article>

        {/* Author Bio Box */}
        <section className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 mb-16 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={profilePhoto}
            alt="Raju Perumalla"
            className="w-20 h-20 rounded-2xl object-cover border border-white/10 shrink-0"
          />
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-400">Article Author</span>
            <h3 className="text-lg font-bold text-white">Raju Perumalla</h3>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed">
              Full-Stack & Machine Learning developer. Google Student Ambassador (2026), 2nd Runner-Up in Capgemini Tech Challenge (T4PF), and YouTube creator with 2.5K+ subscribers teaching practical software architecture.
            </p>
            <div className="pt-2 flex justify-center md:justify-start gap-3 text-xs">
              <a href="https://github.com/rajuperumalla951515" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                GitHub Profile
              </a>
              <span className="text-white/20">|</span>
              <a href="https://www.linkedin.com/in/rajuperumalla/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="LinkedIn profile @rajuperumalla">
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* More Articles Section */}
        {otherPosts.length > 0 && (
          <section className="border-t border-white/10 pt-10">
            <h3 className="text-xl font-bold text-white mb-6">More Engineering Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {otherPosts.map((op) => (
                <Link
                  key={op.slug}
                  to={`/blog/${op.slug}`}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all block group"
                >
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">{op.category}</span>
                  <h4 className="font-bold text-white text-base group-hover:text-red-400 transition-colors mt-1.5 line-clamp-2">
                    {op.title}
                  </h4>
                  <p className="text-xs text-white/50 mt-2 line-clamp-2">{op.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogPost;
