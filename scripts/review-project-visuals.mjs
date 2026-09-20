import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const ids = [
  'hps-geospatial',
  'luxe-lofts',
  'ops-triage',
  'guynode',
  'digital-twin',
  'project-aegis',
  'portfolio-pipeline',
  'northern-grind',
  'moh',
];
const output = 'visual-review';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
const failures = [];

try {
  for (const [width, height, size] of [
    [1440, 900, 'desktop'],
    [390, 844, 'mobile'],
  ]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor: 1,
      });
      await context.addInitScript((value) => localStorage.setItem('theme', value), theme);
      const page = await context.newPage();

      for (const id of ids) {
        const response = await page.goto(`http://127.0.0.1:5173/projects/${id}`, {
          waitUntil: 'networkidle',
        });
        await page.locator('h1').first().waitFor();
        await page.locator('.prose-portfolio').first().waitFor();
        await page.evaluate(() => document.fonts.ready);

        const metrics = await page.evaluate((viewport) => {
          const nav = document.querySelector(
            viewport === 'desktop' ? 'aside.sticky' : 'section.sticky',
          );
          const prose = document.querySelector('.prose-portfolio');
          const tables = [...document.querySelectorAll('.prose-portfolio table')];
          return {
            heading: document.querySelector('h1')?.textContent?.trim(),
            fontFamily: prose ? getComputedStyle(prose).fontFamily : '',
            bodyColor: prose ? getComputedStyle(prose).color : '',
            dark: document.documentElement.classList.contains('dark'),
            viewportWidth: innerWidth,
            pageWidth: document.documentElement.scrollWidth,
            navTop: nav?.getBoundingClientRect().top,
            navPosition: nav ? getComputedStyle(nav).position : '',
            tables: tables.map((table) => ({
              tableWidth: table.getBoundingClientRect().width,
              wrapperWidth: table.parentElement?.getBoundingClientRect().width,
              overflow: table.parentElement && getComputedStyle(table.parentElement).overflowX,
            })),
          };
        }, size);
        await page.screenshot({ path: `${output}/${id}-${size}-${theme}.png`, fullPage: true });

        await page.evaluate(() => window.scrollTo(0, 1200));
        await page.waitForTimeout(450);
        const scrolledTop = await page
          .locator(size === 'desktop' ? 'aside.sticky' : 'section.sticky')
          .first()
          .evaluate((el) => el.getBoundingClientRect().top);
        results.push({ id, size, theme, ...metrics, scrolledTop });
        for (const [label, check] of [
          ['page response', response?.status() === 200],
          ['theme', metrics.dark === (theme === 'dark')],
          ['sticky navigation', metrics.navPosition === 'sticky'],
          ['horizontal page overflow', metrics.pageWidth <= width + 1],
          ['project reading font', metrics.fontFamily.includes('Chivo')],
          ['table scroll containers', metrics.tables.every((table) => table.overflow === 'auto')],
          ['navigation visible after scrolling', scrolledTop >= 0 && scrolledTop < 150],
        ]) {
          if (!check) failures.push(`${id} / ${size} / ${theme}: ${label}`);
        }
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(`${output}/measurements.json`, `${JSON.stringify(results, null, 2)}\n`);
}
console.log(`Captured ${results.length} visual review states in ${output}/`);
assert.deepEqual(failures, [], `Visual review failures:\n${failures.join('\n')}`);
