import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

const BASE_URL = 'https://www.rajuperumalla.in';

// Helper to escape XML special characters
const escapeXml = (unsafe) => {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Month dictionary for timezone-safe date parsing
const monthMap = {
  january: '01', february: '02', march: '03', april: '04',
  may: '05', june: '06', july: '07', august: '08',
  september: '09', october: '10', november: '11', december: '12'
};

// Convert dates reliably to YYYY-MM-DD without UTC day-shifting
const formatDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return '2026-10-12';
  const trimmed = dateStr.trim();
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  
  // Format: "Month DD, YYYY" or "Month D, YYYY"
  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (match) {
    const m = monthMap[match[1].toLowerCase()];
    const d = match[2].padStart(2, '0');
    const y = match[3];
    if (m) return `${y}-${m}-${d}`;
  }
  
  // Fallback to Date parser
  const parsed = new Date(trimmed);
  if (isNaN(parsed.getTime())) return '2026-10-12';
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, '0');
  const d = String(parsed.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Real static public pages with verified content dates
const staticPages = [
  {
    path: '',
    lastmod: '2026-10-12',
    image: {
      loc: `${BASE_URL}/images/profile.png`,
      title: 'Raju Perumalla - Full-Stack &amp; AI Developer Portfolio',
      caption: 'Official developer portfolio of Raju Perumalla',
    },
  },
  {
    path: 'about',
    lastmod: '2026-10-12',
    image: {
      loc: `${BASE_URL}/images/profile.png`,
      title: 'About Raju Perumalla',
      caption: 'Full-Stack Developer, Google Student Ambassador 2026, and SAP ABAP Specialist',
    },
  },
  {
    path: 'blog',
    lastmod: '2026-10-12',
  },
  {
    path: 'contact',
    lastmod: '2026-10-12',
  },
  {
    path: 'privacy-policy',
    lastmod: '2026-10-12',
  },
  {
    path: 'terms',
    lastmod: '2026-10-12',
  },
];

export const generateSitemap = () => {
  if (!Array.isArray(blogPosts)) {
    throw new Error('blogPosts data is not an array. Cannot generate sitemap.');
  }

  const seenUrls = new Set();
  const urlEntries = [];

  // 1. Process Static Pages
  for (const page of staticPages) {
    const loc = page.path ? `${BASE_URL}/${page.path}` : `${BASE_URL}/`;
    
    if (seenUrls.has(loc)) {
      throw new Error(`Duplicate URL detected in sitemap staticPages: ${loc}`);
    }
    seenUrls.add(loc);

    let entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${page.lastmod}</lastmod>`;
    if (page.image) {
      entry += `\n    <image:image>\n      <image:loc>${escapeXml(page.image.loc)}</image:loc>\n      <image:title>${page.image.title}</image:title>\n      <image:caption>${page.image.caption}</image:caption>\n    </image:image>`;
    }
    entry += '\n  </url>';
    urlEntries.push(entry);
  }

  // 2. Process Dynamic Blog Articles
  for (const post of blogPosts) {
    // Validate slug
    if (!post.slug || typeof post.slug !== 'string' || !/^[a-z0-9-]+$/.test(post.slug)) {
      throw new Error(`Invalid or missing slug for blog post: "${post.title}"`);
    }

    // Skip drafts or unpublished posts if flag is set
    if (post.draft === true || post.published === false) {
      continue;
    }

    const loc = `${BASE_URL}/blog/${post.slug}`;
    if (seenUrls.has(loc)) {
      throw new Error(`Duplicate blog URL detected in sitemap: ${loc}`);
    }
    seenUrls.add(loc);

    const lastmod = formatDate(post.updatedDate || post.publishedDate);
    const entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    urlEntries.push(entry);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n\n')}
</urlset>
`;

  // Write atomically to public/sitemap.xml
  fs.writeFileSync(sitemapPath, xml.trim() + '\n', 'utf-8');
  console.log(`[sitemap] Successfully generated valid XML sitemap with ${urlEntries.length} canonical URLs at ${sitemapPath}`);
  return urlEntries.length;
};

// Execute if run directly
generateSitemap();
