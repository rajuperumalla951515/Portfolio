import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import DecodeNav from '../components/DecodeNav';
import DecodeFooter from '../components/DecodeFooter';
import DecodePageWrapper from '../components/DecodePageWrapper';
import { decodeService } from '../services/decodeService';
import { getResourceLogo } from '../utils/resourceLogos';
import profilePhoto from '../assets/profile.png';
import { usePageSEO } from '../utils/usePageSEO';

// Inline markdown helper for bold, code, links, and text
const renderInlineMarkdown = (text) => {
  if (!text) return '';
  const codeRegex = /(`[^`]+`)/g;
  const parts = String(text).split(codeRegex);

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return (
        <code
          key={`c-${i}`}
          className="px-1.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200/90 font-mono text-[13px] text-zinc-800 font-medium"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Markdown links [label](url)
    const linkRegex = /(\[[^\]]+\]\([^)]+\))/g;
    const linkParts = part.split(linkRegex);

    return linkParts.map((lPart, j) => {
      const linkMatch = lPart.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, linkText, linkUrl] = linkMatch;
        const isExternal = linkUrl.startsWith('http');
        return (
          <a
            key={`l-${i}-${j}`}
            href={linkUrl}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-red-600 hover:text-red-700 underline font-medium"
          >
            {linkText}
          </a>
        );
      }

      // Bold **text**
      const boldParts = lPart.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, k) => {
        if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 3) {
          return (
            <strong key={`b-${i}-${j}-${k}`} className="font-bold text-zinc-900">
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        return bPart;
      });
    });
  });
};

const CodeSnippet = ({ lang, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-zinc-800 bg-[#0f1115] font-mono text-xs shadow-md">
      <div className="bg-zinc-800/90 px-4 py-2 border-b border-zinc-700/60 text-[11px] uppercase tracking-wider text-zinc-400 flex justify-between items-center select-none">
        <span className="font-semibold text-zinc-300">{lang || 'Code'}</span>
        <button
          onClick={handleCopy}
          className="hover:text-white transition-colors flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer font-sans py-0.5 px-1.5 rounded hover:bg-zinc-700/50"
          aria-label="Copy code to clipboard"
        >
          {copied ? <Lucide.Check size={12} className="text-emerald-400" /> : <Lucide.Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 sm:p-5 overflow-x-auto text-emerald-400 leading-relaxed font-mono text-xs sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const DecodeDetail = () => {
  const { category: categorySlug, slug } = useParams();

  const [resource, setResource] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedResources, setRelatedResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const isExpired = Boolean(
    resource?.isExpired ||
    resource?.status === 'expired' ||
    resource?.status === 'closed'
  );

  usePageSEO({
    title: resource
      ? `${resource.title} | Decode | Raju Perumalla`
      : 'Resource | Decode | Raju Perumalla',
    description: resource
      ? resource.summary
      : 'Educational resource, opportunities, and technical guidance on Decode.',
    canonical: `https://www.rajuperumalla.in/decode/${categorySlug}/${slug}`,
    ogType: 'article',
    ogImage: 'https://www.rajuperumalla.in/images/profile.png',
    robots: isExpired ? 'noindex, follow' : 'index, follow',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug, slug]);

  // Load resource details and category from database service
  useEffect(() => {
    let isMounted = true;
    async function loadDetail() {
      setLoading(true);
      const [resRes, catRes, relRes] = await Promise.all([
        decodeService.getResourceBySlug(categorySlug, slug),
        decodeService.getCategoryBySlug(categorySlug),
        decodeService.getResources({ categorySlug, limit: 3 }),
      ]);

      if (isMounted) {
        setResource(resRes.data);
        setCategory(catRes.data);
        if (relRes.data) {
          setRelatedResources(relRes.data.filter((r) => r.slug !== slug).slice(0, 2));
        }
        setLoading(false);
      }
    }

    loadDetail();
    return () => { isMounted = false; };
  }, [categorySlug, slug]);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!loading && !resource) {
    return (
      <DecodePageWrapper>
        <DecodeNav />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-20 max-w-md mx-auto">
          <Lucide.AlertCircle size={36} className="text-amber-500 mb-3" />
          <h1 className="text-xl font-bold text-zinc-900">Resource Not Found</h1>
          <p className="text-zinc-600 text-xs mt-1">
            The resource you are looking for does not exist or may have been updated.
          </p>
          <div className="flex gap-2.5 mt-4">
            <Link
              to="/decode"
              className="px-4 py-2 rounded-lg bg-zinc-900 text-white font-medium text-xs hover:bg-zinc-800 transition-colors"
            >
              Decode Directory
            </Link>
            {category && (
              <Link
                to={`/decode/${category.slug}`}
                className="px-4 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-medium text-xs hover:bg-zinc-50 transition-colors"
              >
                Back to {category.shortTitle}
              </Link>
            )}
          </div>
        </main>
        <DecodeFooter />
      </DecodePageWrapper>
    );
  }

  // Robust Markdown renderer supporting unescaped newlines, grouped lists, structured tables, code blocks, and rich text
  const renderMarkdownContent = (rawText) => {
    if (!rawText) return null;

    // Unescape literal \n, \r\n, \t from database / JSON serialization
    const normalizedText = String(rawText)
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '  ')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');

    const rawLines = normalizedText.split('\n');
    const elements = [];

    let inCodeBlock = false;
    let codeBuffer = [];
    let codeLang = '';

    let inTable = false;
    let tableRows = [];

    let currentList = [];
    let isNumberedList = false;

    const flushList = (key) => {
      if (currentList.length > 0) {
        if (isNumberedList) {
          elements.push(
            <ol key={`ol-${key}`} className="my-5 space-y-2 list-decimal pl-6 text-zinc-700 text-sm sm:text-base leading-relaxed">
              {currentList.map((item, idx) => (
                <li key={idx} className="pl-1">
                  {renderInlineMarkdown(item)}
                </li>
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`ul-${key}`} className="my-5 space-y-2 list-disc pl-6 text-zinc-700 text-sm sm:text-base leading-relaxed marker:text-zinc-400">
              {currentList.map((item, idx) => (
                <li key={idx} className="pl-1">
                  {renderInlineMarkdown(item)}
                </li>
              ))}
            </ul>
          );
        }
        currentList = [];
        isNumberedList = false;
      }
    };

    const flushTable = (key) => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const rows = tableRows.slice(2);
        elements.push(
          <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-xl border border-zinc-200/90 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-700 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  {header.map((col, idx) => (
                    <th key={idx} className="px-4 py-3">{col.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-zinc-50/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-zinc-700">
                        {renderInlineMarkdown(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    rawLines.forEach((line, index) => {
      const trimmed = line.trim();

      // Table row check
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList(index);
        inTable = true;
        const cols = trimmed.split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1);
        tableRows.push(cols);
        return;
      } else if (inTable) {
        flushTable(index);
      }

      // Fenced code block check
      if (trimmed.startsWith('```')) {
        flushList(index);
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLang = trimmed.replace('```', '').trim();
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <CodeSnippet
              key={`code-${index}`}
              lang={codeLang}
              code={codeBuffer.join('\n')}
            />
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Unordered list item check (- item, * item, • item)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        const itemText = trimmed.replace(/^[-*•]\s+/, '');
        if (isNumberedList) {
          flushList(index);
        }
        isNumberedList = false;
        currentList.push(itemText);
        return;
      }

      // Ordered list item check
      if (/^\d+[.)]\s+/.test(trimmed)) {
        const itemText = trimmed.replace(/^\d+[.)]\s+/, '');
        if (!isNumberedList && currentList.length > 0) {
          flushList(index);
        }
        isNumberedList = true;
        currentList.push(itemText);
        return;
      }

      // Any non-list line flushes open list
      flushList(index);

      // Horizontal dividers
      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        elements.push(<hr key={`hr-${index}`} className="my-8 border-zinc-200" />);
        return;
      }

      // Headings: # (h1), ## (h2), ### (h3), #### (h4)
      if (/^#{1,4}\s+/.test(trimmed)) {
        const hashes = trimmed.match(/^#+/)[0].length;
        const titleText = trimmed.replace(/^#+\s+/, '');
        if (hashes === 1 || hashes === 2) {
          elements.push(
            <h2 key={`h2-${index}`} className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mt-10 mb-4 pb-2.5 border-b border-zinc-200">
              {renderInlineMarkdown(titleText)}
            </h2>
          );
        } else if (hashes === 3) {
          elements.push(
            <h3 key={`h3-${index}`} className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight mt-7 mb-3">
              {renderInlineMarkdown(titleText)}
            </h3>
          );
        } else {
          elements.push(
            <h4 key={`h4-${index}`} className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight mt-6 mb-2">
              {renderInlineMarkdown(titleText)}
            </h4>
          );
        }
        return;
      }

      // Section labels like "Stage 1: ...", "Phase 1: ...", "Step 1: ..."
      if (/^(Stage|Phase|Step|Module|Part)\s+\d+:/i.test(trimmed)) {
        elements.push(
          <h3 key={`stage-${index}`} className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight mt-8 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
            <span>{renderInlineMarkdown(trimmed)}</span>
          </h3>
        );
        return;
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={`quote-${index}`} className="my-5 pl-4 border-l-4 border-zinc-900 bg-zinc-50/80 p-3.5 rounded-r-xl text-zinc-700 text-sm sm:text-base leading-relaxed italic">
            {renderInlineMarkdown(trimmed.replace(/^>\s*/, ''))}
          </blockquote>
        );
        return;
      }

      // Normal paragraph
      if (trimmed.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="my-4 text-zinc-700 text-sm sm:text-[15px] leading-relaxed sm:leading-[1.75]">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      }
    });

    flushList('end');
    if (inTable) {
      flushTable('end');
    }

    return elements;
  };

  const logoUrl = resource ? getResourceLogo(resource.logoKey) : null;

  return (
    <DecodePageWrapper>
      <DecodeNav />

      {/* JSON-LD Structured Data */}
      {resource && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              headline: resource.title,
              description: resource.summary,
              author: {
                '@type': 'Person',
                name: resource.author || 'Raju Perumalla',
                url: 'https://www.rajuperumalla.in',
              },
              datePublished: resource.publishedDate,
              dateModified: resource.updatedDate || resource.publishedDate,
              publisher: {
                '@type': 'Person',
                name: 'Raju Perumalla',
                url: 'https://www.rajuperumalla.in',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.rajuperumalla.in/decode/${categorySlug}/${slug}`,
              },
            }),
          }}
        />
      )}

      {/* CENTERED, WELL-SPACED ARTICLE LAYOUT WITH READABLE MAX WIDTH */}
      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 pt-8 pb-20">
        {loading ? (
          <div className="space-y-4 animate-pulse pt-4">
            <div className="h-4 w-36 bg-zinc-200 rounded" />
            <div className="h-8 w-3/4 bg-zinc-200 rounded" />
            <div className="h-20 w-full bg-zinc-100 rounded" />
            <div className="h-64 w-full bg-zinc-100 rounded" />
          </div>
        ) : resource ? (
          <>
            {/* TOP NAVIGATION & BREADCRUMB */}
            <div className="mb-6 flex items-center justify-between gap-3 text-xs">
              <nav aria-label="Breadcrumb" className="text-zinc-500 flex items-center gap-1.5 flex-wrap">
                <Link to="/decode" className="hover:text-zinc-900 transition-colors">Decode</Link>
                <span className="text-zinc-300">/</span>
                {category && (
                  <>
                    <Link to={`/decode/${category.slug}`} className="hover:text-zinc-900 transition-colors">
                      {category.title}
                    </Link>
                    <span className="text-zinc-300">/</span>
                  </>
                )}
                <span className="text-zinc-900 truncate max-w-[200px] sm:max-w-none font-semibold">
                  {resource.title}
                </span>
              </nav>

              {category && (
                <Link
                  to={`/decode/${category.slug}`}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-900 shrink-0"
                >
                  <Lucide.ArrowLeft size={13} />
                  <span>Back to {category.shortTitle}</span>
                </Link>
              )}
            </div>

            {/* RESOURCE TITLE & METADATA HEADER */}
            <header className="mb-8 pb-6 border-b border-zinc-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2">
                  {category && (
                    <Link
                      to={`/decode/${category.slug}`}
                      className="px-2.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 font-semibold uppercase tracking-wider text-[10px] hover:bg-zinc-200 transition-colors"
                    >
                      {category.shortTitle}
                    </Link>
                  )}
                  {resource.difficulty && (
                    <span className="text-[11px] text-zinc-500 font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200/60">
                      {resource.difficulty}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-zinc-500 text-xs">
                  <button
                    onClick={handleCopyLink}
                    className="hover:text-zinc-900 transition-colors flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-[11px] cursor-pointer"
                    title="Copy permanent resource link"
                  >
                    {copied ? <Lucide.Check size={12} className="text-emerald-600" /> : <Lucide.Share2 size={12} />}
                    <span>{copied ? 'Copied' : 'Share'}</span>
                  </button>
                  <span className="text-zinc-300">•</span>
                  <span>{resource.readTime || '5 min read'}</span>
                </div>
              </div>

              {/* Title with authentic publisher logo or verified source fallback */}
              <div className="flex items-start gap-4 pt-1">
                {logoUrl && !logoError ? (
                  <div className="w-12 h-12 rounded-xl border border-zinc-200/80 bg-white p-2 flex items-center justify-center shrink-0 shadow-2xs mt-1">
                    <img
                      key={resource.slug}
                      src={logoUrl}
                      alt={resource.sourceName || resource.title}
                      onError={() => setLogoError(true)}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                      width={40}
                      height={40}
                    />
                  </div>
                ) : resource.sourceName ? (
                  <div className="w-12 h-12 rounded-xl border border-zinc-200/80 bg-zinc-50 flex items-center justify-center shrink-0 font-bold text-sm text-zinc-700 font-mono shadow-2xs mt-1 select-none">
                    {resource.sourceName.slice(0, 2).toUpperCase()}
                  </div>
                ) : null}
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-zinc-900 tracking-tight leading-tight">
                    {resource.title}
                  </h1>
                  {resource.sourceName && (
                    <p className="text-xs text-zinc-500 mt-1.5 font-medium">
                      Published by <strong className="text-zinc-800 font-semibold">{resource.sourceName}</strong>
                      {resource.sourceLocation ? ` · ${resource.sourceLocation}` : ''}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-base text-zinc-700 leading-relaxed font-normal pt-1">
                {resource.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-[11px] text-zinc-500 border-t border-zinc-100">
                <div className="flex items-center gap-2">
                  <span>Curated by <strong className="text-zinc-800 font-medium">{resource.author}</strong></span>
                  <span className="text-zinc-300">•</span>
                  <span>Updated {resource.updatedDate || resource.publishedDate}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200/60 text-zinc-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            {/* VERIFIED PROGRAM DETAILS (For Jobs & Hackathons) */}
            {resource.opportunity && (
              <section aria-label="Official Program Details" className="mb-8 p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-zinc-900 flex items-center gap-1.5">
                    <Lucide.ShieldCheck size={16} className={isExpired ? 'text-amber-600' : 'text-emerald-600'} /> Program Specifications
                  </span>
                  <span
                    className={`text-[10px] font-semibold border px-2.5 py-0.5 rounded-full ${
                      isExpired
                        ? 'text-amber-800 bg-amber-50 border-amber-200'
                        : 'text-emerald-700 bg-emerald-50 border-emerald-200/80'
                    }`}
                  >
                    {isExpired ? 'Opportunity Expired / Closed' : 'Verified Active Opportunity'}
                  </span>
                </div>

                {/* Prominent Expired Alert Notice */}
                {isExpired && (
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3">
                    <Lucide.AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900">
                        Applications Closed
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        This opportunity's application window has expired ({resource.deadlineText || resource.opportunity.deadline || 'Deadline passed'}). This record is preserved as a verified historical reference for exam and interview preparation.
                      </p>
                      <Link
                        to="/decode/jobs"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 pt-1 underline"
                      >
                        Explore active 2026 & 2027 fresher opportunities →
                      </Link>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Organization</span>
                    <span className="font-semibold text-zinc-900 text-sm">{resource.opportunity.organization}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Role / Opportunity</span>
                    <span className="font-semibold text-zinc-900 text-sm">{resource.opportunity.role}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Target Eligibility</span>
                    <span className="text-zinc-700 font-medium">{resource.opportunity.eligibility}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Application Deadline</span>
                    <span className={`font-medium ${isExpired ? 'text-amber-800 line-through' : 'text-zinc-700'}`}>
                      {resource.opportunity.deadline}
                    </span>
                  </div>
                  {resource.opportunity.stipend && (
                    <div className="sm:col-span-2 pt-1 border-t border-zinc-100">
                      <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Funding / Stipend / Compensation</span>
                      <span className="text-emerald-700 font-bold">{resource.opportunity.stipend}</span>
                    </div>
                  )}
                </div>

                {resource.opportunity.officialUrl && (
                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    {isExpired ? (
                      <>
                        <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-400 font-semibold text-xs cursor-not-allowed">
                          <Lucide.Clock size={13} />
                          <span>Applications Closed</span>
                        </span>
                        <Link
                          to="/decode/jobs"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs tracking-wide transition-all shadow-2xs"
                        >
                          <span>Browse Active Fresher Jobs</span>
                          <Lucide.ArrowRight size={13} />
                        </Link>
                      </>
                    ) : (
                      <a
                        href={`/go/${resource.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold text-xs tracking-wide transition-all shadow-2xs hover:shadow-xs"
                        title="Open verified official portal via Decode redirect"
                      >
                        <span>Apply Officially</span>
                        <Lucide.ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* CAPSTONE BLUEPRINT (For Final-Year Projects) */}
            {resource.projectSpec && (
              <section aria-label="Capstone Architecture" className="mb-8 p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-zinc-900 flex items-center gap-1.5">
                    <Lucide.Cpu size={16} className="text-zinc-700" /> Capstone Project Architecture
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono">
                    {resource.projectSpec.difficultyLevel}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-400 uppercase font-semibold">Problem Statement</span>
                  <p className="text-sm text-zinc-700 mt-1 leading-relaxed">
                    {resource.projectSpec.problemStatement}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-400 uppercase font-semibold">Tech Stack</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {resource.projectSpec.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {resource.projectSpec.hardwareBOM && resource.projectSpec.hardwareBOM.length > 0 && (
                  <div className="pt-2 border-t border-zinc-100">
                    <span className="text-[11px] text-zinc-400 uppercase font-semibold">Hardware BOM (Bill of Materials)</span>
                    <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-zinc-700">
                      {resource.projectSpec.hardwareBOM.map((part, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Lucide.Check size={13} className="text-emerald-600 shrink-0" />
                          <span>{part}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* MAIN ARTICLE BODY CONTENT WITH PROFESSIONAL TYPOGRAPHY */}
            <article className="mb-12 prose-zinc">
              {renderMarkdownContent(resource.content)}
            </article>

            {/* CURATOR AUTHOR BIO BOX */}
            <section className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-2xs">
              <img
                src={profilePhoto}
                alt="Raju Perumalla"
                className="w-16 h-16 rounded-xl object-cover border border-zinc-200 shrink-0 shadow-2xs"
                width={64}
                height={64}
              />
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Curator</span>
                <h3 className="text-base font-bold text-zinc-900">Raju Perumalla</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Google Student Ambassador (2026), 2nd Runner-Up in Capgemini Tech Challenge, and Finalist in SAP Innovation Marathon. Full-stack developer maintaining open student resources.
                </p>
                <div className="pt-1 flex justify-center sm:justify-start gap-3 text-xs text-zinc-600">
                  <a
                    href="https://github.com/rajuperumalla951515"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 transition-colors font-medium"
                  >
                    GitHub
                  </a>
                  <span className="text-zinc-300">|</span>
                  <a
                    href="https://www.linkedin.com/in/rajuperumalla/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 transition-colors font-medium"
                    aria-label="LinkedIn profile @rajuperumalla"
                  >
                    LinkedIn
                  </a>
                  <span className="text-zinc-300">|</span>
                  <Link to="/contact" className="hover:text-zinc-900 transition-colors font-medium">
                    Contact
                  </Link>
                </div>
              </div>
            </section>

            {/* RELATED RESOURCES */}
            {relatedResources.length > 0 && (
              <section aria-label="Related Resources" className="border-t border-zinc-200 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-zinc-900">Related Resources</h3>
                  {category && (
                    <Link
                      to={`/decode/${category.slug}`}
                      className="text-xs text-zinc-600 hover:text-zinc-900 font-semibold flex items-center gap-1"
                    >
                      <span>All in {category.shortTitle}</span>
                      <Lucide.ArrowRight size={12} />
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedResources.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/decode/${categorySlug}/${rel.slug}`}
                      className="p-4 rounded-xl bg-white border border-zinc-200/90 hover:border-zinc-300 hover:shadow-2xs transition-all block group"
                    >
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        {rel.difficulty || category?.shortTitle}
                      </span>
                      <h4 className="font-bold text-zinc-900 text-xs sm:text-sm group-hover:text-red-600 transition-colors mt-1 line-clamp-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{rel.summary}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : null}
      </main>

      <DecodeFooter />
    </DecodePageWrapper>
  );
};

export default DecodeDetail;
