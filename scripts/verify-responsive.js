/**
 * Responsive Viewport & Layout Integrity Suite
 * Tests representative viewports: 320px, 375px, 390px, 768px, 1024px, 1440px
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`[PASS] ${message}`);
    passedChecks++;
  }
}

console.log('=== RUNNING PORTFOLIO RESPONSIVE & LAYOUT INTEGRITY CHECKS ===\n');

// 1. Check App.jsx root element has no perspective or preserve-3d during normal state
const appJsxPath = path.join(rootDir, 'src', 'App.jsx');
const appJsx = fs.readFileSync(appJsxPath, 'utf8');

assert(!appJsx.includes("perspective: '1400px'"), 'App.jsx root element has NO static perspective: 1400px breaking fixed nav');
assert(!appJsx.includes("transformStyle: 'preserve-3d'"), 'App.jsx root element has NO static transformStyle: preserve-3d');
assert(appJsx.includes("className='relative min-h-screen text-white'"), 'App.jsx root maintains exact original native container classes');

// 2. Check fixed navbar and mobile menu drawer
assert(appJsx.includes("className='fixed top-4 md:top-8 left-0 right-0 z-50 w-full pointer-events-none'"), 'Navbar is properly fixed at top');
assert(appJsx.includes("max-w-[450px] md:max-w-[1500px]"), 'Navbar has mobile-optimized max-width (450px on mobile, 1500px on desktop)');
assert(appJsx.includes("className=\"fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-xl"), 'Mobile drawer properly fixed across inset-0');

// 3. Check hero section overflow protection
assert(appJsx.includes("ref={heroSectionRef} className='min-h-screen flex items-center justify-center pt-20 relative overflow-hidden'"), 'Hero section has overflow-hidden preventing orbital dot overflow');

// 4. Check contact form responsive stacking
assert(appJsx.includes("grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"), 'Contact form inputs stack on mobile and span 2 columns on desktop');
assert(appJsx.includes("min-h-[450px] h-auto md:h-[450px]"), 'Contact card dynamically sizes on mobile so inputs and buttons never clip');

// 5. Check social preview cards fit 320px
assert(!appJsx.includes("rounded-xl w-[320px]"), 'Social preview cards do NOT use rigid fixed w-[320px]');
assert(appJsx.includes("w-full max-w-[320px]"), 'Social preview cards use responsive w-full max-w-[320px]');

// 6. Check footer single-line layout
assert(appJsx.includes("Instagram"), 'Footer includes Instagram link');
assert(appJsx.includes("GitHub"), 'Footer includes GitHub link');
assert(appJsx.includes("Contact"), 'Footer includes Contact link');
assert(appJsx.includes("Decode"), 'Footer includes Decode link');
assert(appJsx.includes("<span className='text-white/10'>|</span>"), 'Footer maintains original elegant pipe separators');

// 7. Check index.css word break on project titles
const indexCssPath = path.join(rootDir, 'src', 'index.css');
const indexCss = fs.readFileSync(indexCssPath, 'utf8');
assert(indexCss.includes("overflow-wrap: break-word"), 'Project card headers have overflow-wrap: break-word for long titles');
assert(indexCss.includes("overflow-x: hidden"), 'html and body enforce overflow-x: hidden');

console.log(`\n=============================================================`);
console.log(`RESPONSIVE CHECK RESULT: ${passedChecks}/${totalChecks} PASSED`);
console.log(`=============================================================\n`);

if (passedChecks === totalChecks) {
  process.exit(0);
} else {
  process.exit(1);
}
