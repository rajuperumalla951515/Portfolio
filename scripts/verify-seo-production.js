import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const robotsPath = path.join(distDir, 'robots.txt');

console.log('=== RUNNING PRODUCTION SEO AUDIT VERIFICATION ===\n');

let passed = 0;
let failed = 0;

const assert = (condition, description) => {
  if (condition) {
    console.log(`[PASS] ${description}`);
    passed++;
  } else {
    console.error(`[FAIL] ${description}`);
    failed++;
  }
};

// 1. Verify sitemap.xml exists in dist
assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// 2. Validate XML syntax basics
assert(sitemapContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'sitemap.xml has valid XML declaration');
assert(sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'sitemap.xml has valid xmlns');
assert(sitemapContent.endsWith('</urlset>\n') || sitemapContent.endsWith('</urlset>'), 'sitemap.xml closes urlset tag');

// 3. Extract and check URLs
const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert(locMatches.length === 10, `sitemap contains exactly 10 URLs (found ${locMatches.length})`);

// 4. Duplicate URL check
const uniqueLocs = new Set(locMatches);
assert(uniqueLocs.size === locMatches.length, 'sitemap contains zero duplicate URLs');

// 5. Check no priority or changefreq
assert(!sitemapContent.includes('<priority>'), 'sitemap has removed deprecated <priority> tags');
assert(!sitemapContent.includes('<changefreq>'), 'sitemap has removed deprecated <changefreq> tags');

// 6. Check lastmod dates format (YYYY-MM-DD)
const lastmodMatches = [...sitemapContent.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(m => m[1]);
const allDatesValid = lastmodMatches.every(d => /^\d{4}-\d{2}-\d{2}$/.test(d));
assert(allDatesValid, 'all <lastmod> dates adhere to strict ISO YYYY-MM-DD format');

// 7. Check no draft or nonexistent pages
const hasNoDrafts = !locMatches.some(u => u.includes('draft') || u.includes('404') || u.includes('*'));
assert(hasNoDrafts, 'sitemap excludes draft, private, or 404 routes');

// 8. Verify robots.txt
assert(fs.existsSync(robotsPath), 'dist/robots.txt exists');
const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
assert(robotsContent.includes('User-agent: *'), 'robots.txt specifies User-agent: *');
assert(robotsContent.includes('Allow: /'), 'robots.txt allows public page rendering');
assert(robotsContent.includes('Sitemap: https://www.rajuperumalla.in/sitemap.xml'), 'robots.txt references exact canonical sitemap URL');
assert(!robotsContent.includes('.env'), 'robots.txt does not leak .env in disallow rules');

// 9. Verify prerendered route HTML files exist with unique metadata
const expectedRoutes = [
  'about',
  'blog',
  'contact',
  'privacy-policy',
  'terms',
  'blog/building-smartguardian-iot-accident-detection-system',
  'blog/securing-academic-data-cipherdoc-rsa-encryption',
  'blog/fastapi-vs-nodejs-scaling-modern-microservices',
  'blog/getting-started-with-sap-btp-abap-cloud-developer-guide'
];

let allRoutesPrerendered = true;
let allCanonicalsCorrect = true;

for (const r of expectedRoutes) {
  const routeHtmlPath = path.join(distDir, r, 'index.html');
  if (!fs.existsSync(routeHtmlPath)) {
    allRoutesPrerendered = false;
    break;
  }
  const content = fs.readFileSync(routeHtmlPath, 'utf-8');
  const expectedCanonical = `https://www.rajuperumalla.in/${r}`;
  if (!content.includes(`href="${expectedCanonical}"`)) {
    allCanonicalsCorrect = false;
    console.error(`Mismatch canonical in ${routeHtmlPath}`);
  }
}

assert(allRoutesPrerendered, 'all 9 sub-routes have prerendered static index.html files');
assert(allCanonicalsCorrect, 'all prerendered routes have exact, matching canonical URL tags');

// 10. Verify required public images exist in dist
assert(fs.existsSync(path.join(distDir, 'images', 'profile.png')), 'dist/images/profile.png exists for social cards & Google Images');
assert(fs.existsSync(path.join(distDir, 'favicon.svg')), 'dist/favicon.svg exists');

// 11. Secret check in dist
const distFiles = fs.readdirSync(distDir, { recursive: true });
const hasSecretFiles = distFiles.some(f => typeof f === 'string' && (f.endsWith('.env') || f.includes('.git') || f.includes('test-email')));
assert(!hasSecretFiles, 'dist/ directory contains zero .env, .git, or secret credentials');

console.log(`\n=== AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED ===`);
if (failed > 0) process.exit(1);
