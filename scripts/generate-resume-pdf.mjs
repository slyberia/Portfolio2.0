/**
 * SCRIPTS/GENERATE-RESUME-PDF.MJS
 *
 * Renders the dedicated /resume/print template (ResumePrintTemplate) to a one-page,
 * print-native PDF using Playwright's print engine. The template and the on-site résumé
 * share RESUME_CONTENT, so the downloadable asset stays in sync with the site without
 * inheriting the screen page's cards, shadows, or tinted background.
 *
 * The script serves the built `dist/` itself (static server with SPA fallback) so the
 * whole render runs in a single process — no separate dev/preview server required.
 *
 * Usage:
 *   npm run build
 *   OUT=public/Kyle-Semple-Resume.pdf node scripts/generate-resume-pdf.mjs
 */

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT = process.env.OUT || 'public/Kyle-Semple-Resume.pdf';
// The sandbox ships a pre-installed Chromium that may not match the pinned revision;
// allow an explicit binary path so generation works without a network download.
const EXECUTABLE_PATH = process.env.PW_CHROMIUM_PATH || undefined;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

function startStaticServer() {
  if (!fs.existsSync(DIST)) {
    throw new Error(`dist/ not found at ${DIST}. Run \`npm run build\` first.`);
  }
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = path.join(DIST, urlPath);
    // SPA fallback: anything without a file extension serves index.html so client
    // routing (e.g. /resume/print) resolves.
    if (!path.extname(filePath) || !fs.existsSync(filePath)) {
      filePath = path.join(DIST, 'index.html');
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
      });
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function generate() {
  console.log('--- RESUME PDF GENERATION ---');
  const server = await startStaticServer();
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Serving dist/ at ${baseUrl}`);
  console.log(`Output: ${OUT}`);

  const browser = await chromium.launch({ headless: true, executablePath: EXECUTABLE_PATH });
  // Light scheme keeps the printable résumé on a white background with black body copy.
  const context = await browser.newContext({ colorScheme: 'light' });
  const page = await context.newPage();

  try {
    await page.goto(`${baseUrl}/resume/print`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: OUT,
      printBackground: true,
      // Honor the template's own `@page { size: letter; margin: ... }` declaration.
      preferCSSPageSize: true,
    });
    console.log(`✓ Wrote ${OUT}`);
  } finally {
    await browser.close();
    server.close();
  }
}

generate().catch((err) => {
  console.error('Resume PDF generation failed:', err);
  process.exit(1);
});
