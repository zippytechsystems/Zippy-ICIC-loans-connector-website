// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const devHtmlPath = path.join(rootDir, 'index.dev.html');
const indexHtmlPath = path.join(rootDir, 'index.html');

if (fs.existsSync(devHtmlPath)) {
  const devContent = fs.readFileSync(devHtmlPath, 'utf8');
  fs.writeFileSync(indexHtmlPath, devContent, 'utf8');
  console.log('✓ Prepared index.html from index.dev.html for Vite compilation.');
} else {
  console.log('ℹ index.dev.html not found, keeping existing index.html.');
}
