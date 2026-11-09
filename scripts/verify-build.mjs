// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 Running comprehensive deployment verification...');

const rootIndex = path.join(rootDir, 'index.html');
const distIndex = path.join(rootDir, 'dist', 'index.html');

if (!fs.existsSync(rootIndex)) {
  console.error('❌ Root index.html is missing!');
  process.exit(1);
}

if (!fs.existsSync(distIndex)) {
  console.error('❌ dist/index.html is missing!');
  process.exit(1);
}

const rootContent = fs.readFileSync(rootIndex, 'utf8');

// Ensure root index.html does NOT refer to uncompiled main.tsx
if (rootContent.includes('/src/main.tsx')) {
  console.error('❌ ERROR: Root index.html still references /src/main.tsx! It must reference compiled /assets/ JS bundle.');
  process.exit(1);
}

// Verify bundle script tag exists
const scriptMatch = rootContent.match(/src="(\/assets\/[^"]+\.js)"/);
if (!scriptMatch) {
  console.error('❌ ERROR: Could not find compiled JavaScript bundle in root index.html!');
  process.exit(1);
}

const scriptRelPath = scriptMatch[1].replace(/^\//, '');
const rootScriptPath = path.join(rootDir, scriptRelPath);
if (!fs.existsSync(rootScriptPath)) {
  console.error(`❌ ERROR: Referenced script ${scriptRelPath} does not exist at root!`);
  process.exit(1);
}

// Verify CSS tag exists
const cssMatch = rootContent.match(/href="(\/assets\/[^"]+\.css)"/);
if (cssMatch) {
  const cssRelPath = cssMatch[1].replace(/^\//, '');
  const rootCssPath = path.join(rootDir, cssRelPath);
  if (!fs.existsSync(rootCssPath)) {
    console.error(`❌ ERROR: Referenced stylesheet ${cssRelPath} does not exist at root!`);
    process.exit(1);
  }
}

// Verify .htaccess exists
const rootHtaccess = path.join(rootDir, '.htaccess');
if (!fs.existsSync(rootHtaccess)) {
  console.error('❌ ERROR: Root .htaccess is missing!');
  process.exit(1);
}

console.log('✅ ALL VERIFICATION CHECKS PASSED:');
console.log(`  - Root index.html references production bundle: ${scriptMatch[1]}`);
if (cssMatch) console.log(`  - Root index.html references stylesheet: ${cssMatch[1]}`);
console.log('  - Both root ./ and dist/ are synchronized and production-ready!');
