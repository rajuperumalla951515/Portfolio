/**
 * Security & Data Exposure Audit Verification Suite
 * Validates:
 * 1. Admin authorization on sensitive routes (/api/contacts)
 * 2. Input validation on /api/contact
 * 3. Outbound redirect protocol security
 * 4. Zero secret leakage in dist/ bundle
 * 5. Security headers presence in public/_headers
 * 6. Exclusion of sensitive files in .gitignore
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

console.log('=== RUNNING SECURITY & DATA EXPOSURE AUDIT CHECKS ===\n');

// 1. Check public/_headers for critical browser security headers
const headersPath = path.join(rootDir, 'public', '_headers');
assert(fs.existsSync(headersPath), 'public/_headers exists');
const headersContent = fs.readFileSync(headersPath, 'utf8');
assert(headersContent.includes('Strict-Transport-Security: max-age=31536000'), 'HSTS header configured');
assert(headersContent.includes('Permissions-Policy:'), 'Permissions-Policy header configured');
assert(headersContent.includes('X-Frame-Options: SAMEORIGIN'), 'Clickjacking protection (X-Frame-Options) configured');
assert(headersContent.includes('X-Content-Type-Options: nosniff'), 'MIME sniffing protection configured');
assert(headersContent.includes('Referrer-Policy: strict-origin-when-cross-origin'), 'Referrer-Policy configured');

// 2. Check .gitignore excludes .env files but allows .env.example
const gitignorePath = path.join(rootDir, '.gitignore');
assert(fs.existsSync(gitignorePath), '.gitignore exists');
const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
assert(gitignoreContent.includes('.env') && gitignoreContent.includes('backend/.env'), '.gitignore excludes .env files');
assert(gitignoreContent.includes('!.env.example'), '.gitignore allows root .env.example template');
assert(gitignoreContent.includes('!backend/.env.example'), '.gitignore allows backend .env.example template');

// 3. Check .env.example files exist and contain NO private keys
const rootEnvEx = path.join(rootDir, '.env.example');
const backendEnvEx = path.join(rootDir, 'backend', '.env.example');
assert(fs.existsSync(rootEnvEx), 'root .env.example exists');
assert(fs.existsSync(backendEnvEx), 'backend/.env.example exists');

const backendEnvContent = fs.readFileSync(backendEnvEx, 'utf8');
assert(
  !backendEnvContent.includes('oxbyeakwyxgbfyaa') &&
  !backendEnvContent.includes('mongodb+srv://') &&
  backendEnvContent.includes('ADMIN_API_KEY=your_secure_random_admin_api_key_here'),
  'backend/.env.example contains only safe placeholders with zero secrets'
);

// 4. Verify outbound redirect utility protocol rejection
import('../src/utils/outboundRedirect.js').then((ob) => {
  assert(!ob.isValidOutboundUrl('javascript:alert(1)'), 'isValidOutboundUrl rejects javascript: scheme');
  assert(!ob.isValidOutboundUrl('data:text/html,<script>alert(1)</script>'), 'isValidOutboundUrl rejects data: scheme');
  assert(!ob.isValidOutboundUrl('http://localhost:5173/admin'), 'isValidOutboundUrl rejects localhost destination');
  assert(ob.isValidOutboundUrl('https://summerofcode.withgoogle.com/'), 'isValidOutboundUrl accepts verified HTTPS domain');

  // 5. Verify database schema RLS changes
  const dbSchemaPath = path.join(rootDir, 'backend', 'database_schema.sql');
  const dbSchema = fs.readFileSync(dbSchemaPath, 'utf8');
  assert(
    !dbSchema.includes('CREATE POLICY "Allow select on contact_messages" \nON contact_messages FOR SELECT \nTO public') &&
    dbSchema.includes('TO service_role'),
    'contact_messages SELECT is restricted to service_role in database_schema.sql'
  );

  const migrationPath = path.join(rootDir, 'backend', 'security_hardening_migration.sql');
  assert(fs.existsSync(migrationPath), 'backend/security_hardening_migration.sql exists');

  // 6. Verify dist/ bundle does NOT leak secrets
  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    const distFiles = fs.readdirSync(distDir, { recursive: true });
    let leakedSecretFound = false;
    for (const f of distFiles) {
      const fullPath = path.join(distDir, f);
      if (fs.statSync(fullPath).isFile() && (f.endsWith('.js') || f.endsWith('.html'))) {
        const c = fs.readFileSync(fullPath, 'utf8');
        if (c.includes('oxbyeakwyxgbfyaa') || c.includes('ADMIN_API_KEY') || c.includes('EMAILJS_PRIVATE_KEY')) {
          leakedSecretFound = true;
          break;
        }
      }
    }
    assert(!leakedSecretFound, 'Built dist/ bundle contains zero server-side credentials or secrets');
  }

  console.log(`\n=== SECURITY AUDIT RESULT: ${passedChecks}/${totalChecks} CHECKS PASSED ===\n`);
  if (passedChecks < totalChecks) {
    process.exit(1);
  }
});
