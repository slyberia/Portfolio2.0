/**
 * SCRIPTS/GENERATE-RESUME-PDF.MJS
 *
 * Renders the on-site /resume route (the positioning-compliant ResumeView) to a PDF
 * using Playwright's print engine. This produces a downloadable asset that matches the
 * live site exactly, rather than a separately-authored document that could drift from it.
 *
 * Usage:
 *   BASE_URL=http://localhost:4173 OUT=/tmp/Kyle-Semple-Resume.pdf node scripts/generate-resume-pdf.mjs
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';
const OUT = process.env.OUT || 'public/Kyle-Semple-Resume.pdf';
// The sandbox ships a pre-installed Chromium that may not match the pinned revision;
// allow an explicit binary path so generation works without a network download.
const EXECUTABLE_PATH = process.env.PW_CHROMIUM_PATH || undefined;

async function generate() {
  console.log(`--- RESUME PDF GENERATION ---`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output:   ${OUT}`);

  const browser = await chromium.launch({
    headless: true,
    executablePath: EXECUTABLE_PATH,
  });
  // Light scheme keeps the printable resume on a white background with black body copy.
  const context = await browser.newContext({ colorScheme: 'light' });
  const page = await context.newPage();

  try {
    await page.goto(`${BASE_URL}/resume`, { waitUntil: 'networkidle' });
    // The action bar is print:hidden; force print emulation so page.pdf() matches it.
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: OUT,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
    });
    console.log(`✓ Wrote ${OUT}`);
  } finally {
    await browser.close();
  }
}

generate().catch((err) => {
  console.error('Resume PDF generation failed:', err);
  process.exit(1);
});
