/**
 * SCRIPTS/CAPTURE-MEDIA.MJS
 *
 * Automated screenshot capture using Playwright.
 * Reads MEDIA_CAPTURE_PLAN and captures visual proof.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { MEDIA_CAPTURE_PLAN } from '../src/data/mediaCapturePlan.ts';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

async function capture() {
  console.log('--- PHASE 5.1B MEDIA CAPTURE AGENT ---');
  console.log(`Base URL: ${BASE_URL}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const summary = {
    captured: [],
    failed: [],
  };

  try {
    for (const target of MEDIA_CAPTURE_PLAN) {
      console.log(`\n[${target.id}] Processing: ${target.route} (${target.viewport})`);

      try {
        // Set viewport
        const viewport =
          target.viewport === 'mobile'
            ? { width: 390, height: 844 }
            : target.viewport === 'tablet'
              ? { width: 768, height: 1024 }
              : { width: 1280, height: 720 };

        await page.setViewportSize(viewport);

        // Navigate
        const url = `${BASE_URL}${target.route}`;
        await page.goto(url, { waitUntil: 'networkidle' });

        // Ensure directory exists
        const dir = path.join(process.cwd(), 'public', 'media', target.projectId, 'screenshots');
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // Construct filename following standards: [projectId]-[surface]-[viewport]-v1.webp
        // We use target.id as the surface name part if it starts with 'core-' or 'track-' etc.
        // Actually, let's use the pattern from the prompt examples.
        const surfaceName = target.id
          .replace('core-', '')
          .replace('track-', '')
          .replace('project-', '');
        const filename = `${target.projectId}-${surfaceName}-${target.viewport}-v1.png`;
        const fullPath = path.join(dir, filename);

        // Capture
        await page.screenshot({
          path: fullPath,
          type: 'png',
          fullPage: target.viewport === 'mobile' ? false : true, // Desktop usually full page for hero, mobile we might want a specific section but for now let's do standard
        });

        console.log(`✅ Saved: ${filename}`);
        summary.captured.push({ id: target.id, path: fullPath, filename });
      } catch (err) {
        console.error(`❌ Failed to capture ${target.id}: ${err.message}`);
        summary.failed.push({ id: target.id, error: err.message });
      }
    }
  } finally {
    await browser.close();
  }

  console.log('\n--- CAPTURE SUMMARY ---');
  console.log(`Total: ${MEDIA_CAPTURE_PLAN.length}`);
  console.log(`Captured: ${summary.captured.length}`);
  console.log(`Failed: ${summary.failed.length}`);

  if (summary.failed.length > 0) {
    process.exit(1);
  }
}

capture().catch((err) => {
  console.error('Fatal error in capture script:', err);
  process.exit(1);
});
