// Production HTTP Server for Zippy DSA Loans
// Designed for Cloud Web Hosting (Hostinger, Render, Railway, Vercel, VPS)
// Zero external dependencies - runs on native Node.js 18+

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const DIST_DIR = path.join(__dirname, 'dist');
const PUBLIC_DIR = fs.existsSync(DIST_DIR) ? DIST_DIR : __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse path
  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Health check endpoint
  if (pathname === '/health' || pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'Zippy DSA Loans Web Service', timestamp: new Date().toISOString() }));
    return;
  }

  // Determine file path
  let filePath = path.join(PUBLIC_DIR, pathname);

  // Check if requested path is a directory, if so append index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file doesn't exist, try resolving from dist root or SPA fallback
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    // If it has an extension (e.g. .js, .css, .png), try looking inside assets
    const ext = path.extname(pathname).toLowerCase();
    if (ext && !pathname.startsWith('/assets/')) {
      const assetPath = path.join(PUBLIC_DIR, 'assets', path.basename(pathname));
      if (fs.existsSync(assetPath)) {
        filePath = assetPath;
      }
    } else if (!ext) {
      // SPA route fallback (e.g. /about, /services, /contact) -> serve index.html
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }
  }

  // Serve file or 404
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } else {
    // Last resort SPA fallback
    const fallbackIndex = path.join(PUBLIC_DIR, 'index.html');
    if (fs.existsSync(fallbackIndex)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(fallbackIndex).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Zippy DSA Loans Web Server is running!`);
  console.log(`📡 URL: http://0.0.0.0:${PORT}`);
  console.log(`📂 Serving Directory: ${PUBLIC_DIR}`);
  console.log(`=======================================================`);
});
