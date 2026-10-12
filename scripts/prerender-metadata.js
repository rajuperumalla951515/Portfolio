import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');

const BASE_URL = 'https://www.rajuperumalla.in';
const DEFAULT_IMAGE = `${BASE_URL}/images/profile.png`;

const routes = [
  {
    path: 'about',
    title: 'About Raju Perumalla | Full-Stack & AI Engineer',
    description: "Learn about Raju Perumalla's background in software engineering, Cloud architectures, SAP BTP, computer vision systems, and Google Student Ambassador role.",
    canonical: `${BASE_URL}/about`,
  },
  {
    path: 'blog',
    title: 'Technical Articles & Engineering Journal | Raju Perumalla',
    description: 'In-depth technical articles on IoT accident prevention, RSA cryptography, FastAPI vs Node.js scaling benchmarks, and SAP BTP enterprise development by Raju Perumalla.',
    canonical: `${BASE_URL}/blog`,
  },
  {
    path: 'contact',
    title: 'Contact Raju Perumalla | Developer Inquiries & Collaborations',
    description: 'Get in touch with Raju Perumalla for full-stack engineering collaborations, AI software development projects, or technical consulting.',
    canonical: `${BASE_URL}/contact`,
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | Raju Perumalla Portfolio & Technical Journal',
    description: "Official privacy policy and data governance practices for Raju Perumalla's personal website and technical engineering blog.",
    canonical: `${BASE_URL}/privacy-policy`,
  },
  {
    path: 'terms',
    title: 'Terms of Use | Raju Perumalla Portfolio & Technical Journal',
    description: "Terms of service, intellectual property guidelines, and usage conditions for Raju Perumalla's official website and engineering articles.",
    canonical: `${BASE_URL}/terms`,
  },
];

// Add blog posts to prerender routes
for (const post of blogPosts) {
  if (post.draft === true || post.published === false) continue;
  routes.push({
    path: `blog/${post.slug}`,
    title: `${post.title} | Raju Perumalla`,
    description: post.summary,
    canonical: `${BASE_URL}/blog/${post.slug}`,
    ogType: 'article',
  });
}

const escapeHtml = (str) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const prerenderMetadata = () => {
  if (!fs.existsSync(templatePath)) {
    console.warn('[prerender] dist/index.html not found. Run vite build first.');
    return;
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  for (const route of routes) {
    let html = baseHtml;

    // 1. Replace title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
    html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${escapeHtml(route.title)}" />`);

    // 2. Replace description
    html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`);

    // 3. Replace canonical URL
    html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${escapeHtml(route.canonical)}" />`);

    // 4. Replace Open Graph tags
    html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
    html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${escapeHtml(route.canonical)}" />`);

    if (route.ogType) {
      html = html.replace(/<meta property="og:type" content=".*?" \/>/i, `<meta property="og:type" content="${escapeHtml(route.ogType)}" />`);
    }

    // 5. Replace Twitter tags
    html = html.replace(/<meta property="twitter:title" content=".*?" \/>/i, `<meta property="twitter:title" content="${escapeHtml(route.title)}" />`);
    html = html.replace(/<meta property="twitter:description" content=".*?" \/>/i, `<meta property="twitter:description" content="${escapeHtml(route.description)}" />`);
    html = html.replace(/<meta property="twitter:url" content=".*?" \/>/i, `<meta property="twitter:url" content="${escapeHtml(route.canonical)}" />`);

    // 6. Ensure Open Graph & Twitter Image are absolute HTTPS
    const metaImage = route.image || DEFAULT_IMAGE;
    html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${escapeHtml(metaImage)}" />`);
    html = html.replace(/<meta property="twitter:image" content=".*?" \/>/i, `<meta property="twitter:image" content="${escapeHtml(metaImage)}" />`);

    // Ensure output directory exists
    const outDir = path.join(distDir, route.path);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  }

  console.log(`[prerender] Successfully generated static metadata HTML for ${routes.length} routes in dist/`);
};

prerenderMetadata();
