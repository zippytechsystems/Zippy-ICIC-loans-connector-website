// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('⚡ Starting post-build synchronization for Hostinger deployment...');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist directory does not exist! Run "vite build" first.');
  process.exit(1);
}

// Helper for recursive directory copy
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Copy dist/index.html to root index.html
const distIndexPath = path.join(distDir, 'index.html');
const rootIndexPath = path.join(rootDir, 'index.html');

if (fs.existsSync(distIndexPath)) {
  fs.copyFileSync(distIndexPath, rootIndexPath);
  console.log('✓ Successfully copied production dist/index.html to root index.html');
} else {
  console.error('❌ dist/index.html not found!');
  process.exit(1);
}

// 2. Sync assets directory
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(rootDir, 'assets');
if (fs.existsSync(distAssets)) {
  // Clear old root assets first to avoid stale hashes
  if (fs.existsSync(rootAssets)) {
    fs.rmSync(rootAssets, { recursive: true, force: true });
  }
  copyDirRecursive(distAssets, rootAssets);
  console.log('✓ Successfully synced compiled assets to root ./assets');
}

// 3. Sync API directory
const distApi = path.join(distDir, 'api');
const rootApi = path.join(rootDir, 'api');
if (fs.existsSync(distApi)) {
  copyDirRecursive(distApi, rootApi);
  console.log('✓ Successfully synced API endpoints to root ./api');
}

// 4. Sync images directory
const distImages = path.join(distDir, 'images');
const rootImages = path.join(rootDir, 'images');
if (fs.existsSync(distImages)) {
  copyDirRecursive(distImages, rootImages);
  console.log('✓ Successfully synced images to root ./images');
}

// 5. Sync static files
const staticFiles = [
  'favicon.svg',
  'icons.svg',
  'robots.txt',
  'sitemap.xml',
  '.htaccess'
];

for (const file of staticFiles) {
  const src = path.join(distDir, file);
  const dest = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Synced ${file} to root`);
  }
}

// 6. Generate hostinger-upload.zip if PowerShell is available
const zipPath = path.join(rootDir, 'hostinger-upload.zip');
try {
  if (process.platform === 'win32') {
    const psScript = `
      Add-Type -AssemblyName System.IO.Compression.FileSystem;
      if (Test-Path '${zipPath}') { Remove-Item '${zipPath}' -Force };
      [System.IO.Compression.ZipFile]::CreateFromDirectory('${distDir}', '${zipPath}');
    `.replace(/\r?\n/g, ' ');
    execSync(`powershell -NoProfile -Command "${psScript}"`, { stdio: 'ignore' });
    console.log('✓ Updated hostinger-upload.zip from dist directory');
  }
} catch (e) {
  console.log('ℹ Notice: Skipping zip generation in non-Windows environment');
}

console.log('🎉 Dual root & dist build synchronization complete! Deployment ready.');
