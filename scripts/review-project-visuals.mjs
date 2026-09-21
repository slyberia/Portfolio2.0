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
          const summary = document.querySelector('.prose-portfolio blockquote p:first-of-type');
          return {
            heading: document.querySelector('h1')?.textContent?.trim(),
            fontFamily: prose ? getComputedStyle(prose).fontFamily : '',
            bodyColor: prose ? getComputedStyle(prose).color : '',
            summaryQuote: summary ? getComputedStyle(summary, '::before').content : '',
            dark: document.documentElement.classList.contains('dark'),
            viewportWidth: innerWidth,
            pageWidth: document.documentElement.scrollWidth,
            contentEdges: [
              ...document.querySelectorAll(
                'main .mx-auto.grid > *, main header, main .prose-portfolio',
              ),
            ].map((el) => ({
              element: el.tagName.toLowerCase(),
              right: Math.round(el.getBoundingClientRect().right),
            })),
            navTop: nav?.getBoundingClientRect().top,
            navPosition: nav ? getComputedStyle(nav).position : '',
            tables: tables.map((table) => ({
              tableWidth: table.getBoundingClientRect().width,
              wrapperWidth: table.parentElement?.getBoundingClientRect().width,
              overflow: table.parentElement && getComputedStyle(table.parentElement).overflowX,
              focusable: table.parentElement?.tabIndex === 0,
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
          [
            'visible content clipped by page container',
            metrics.contentEdges.every((edge) => edge.right <= width + 1),
          ],
          ['project reading font', metrics.fontFamily.includes('Chivo')],
          ['project summary has a decorative quote', metrics.summaryQuote === 'none'],
          ['table scroll containers', metrics.tables.every((table) => table.overflow === 'auto')],
          [
            'table scroll containers have keyboard focus',
            metrics.tables.every((table) => table.focusable),
          ],
          ['navigation visible after scrolling', scrolledTop >= 0 && scrolledTop < 150],
        ]) {
          if (!check) failures.push(`${id} / ${size} / ${theme}: ${label}`);
        }
        if (id === 'hps-geospatial') {
          await page.getByRole('tab', { name: 'Technical Notes' }).click();
          await page.locator('#panel-technical .prose-portfolio').waitFor();
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(300);
          await page.screenshot({
            path: `${output}/hps-technical-${size}-${theme}.png`,
            fullPage: true,
          });
          const technicalRight = await page
            .locator('#panel-technical .prose-portfolio')
            .evaluate((el) => el.getBoundingClientRect().right);
          if (technicalRight > width + 1) {
            failures.push(`hps technical / ${size} / ${theme}: visible content clipped`);
          }
        }
      }

      const hpsDeepDiveResponse = await page.goto(
        'http://127.0.0.1:5173/deep-dives?tab=hps-geospatial',
        { waitUntil: 'networkidle' },
      );
      await page.getByTestId('hps-deep-dive').waitFor();
      await page.evaluate(() => document.fonts.ready);
      const hpsDeepDiveMetrics = await page.evaluate(() => {
        const sectionNav = document.querySelector('nav[aria-label="HPS deep dive sections"]');
        const tableRegion = document.querySelector('[aria-label="HPS artifact maturity table"]');
        return {
          heading: document.querySelector('[data-testid="hps-deep-dive"] h2')?.textContent?.trim(),
          dark: document.documentElement.classList.contains('dark'),
          pageWidth: document.documentElement.scrollWidth,
          viewportWidth: innerWidth,
          sectionNavPosition: sectionNav ? getComputedStyle(sectionNav).position : '',
          sectionNavLinks: sectionNav?.querySelectorAll('a').length ?? 0,
          tableOverflow: tableRegion ? getComputedStyle(tableRegion).overflowX : '',
          tableFocusable: tableRegion?.getAttribute('tabindex') === '0',
          contentRight: Math.round(
            document.querySelector('[data-testid="hps-deep-dive"]')?.getBoundingClientRect()
              .right ?? 0,
          ),
          errorOverlay: Boolean(
            document.querySelector(
              '[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay',
            ),
          ),
        };
      });
      await page.screenshot({
        path: `${output}/hps-deep-dive-${size}-${theme}.png`,
        fullPage: true,
      });
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(450);
      const hpsDeepDiveNavTop = await page
        .locator('nav[aria-label="HPS deep dive sections"]')
        .evaluate((el) => el.getBoundingClientRect().top);
      results.push({
        id: 'hps-deep-dive',
        size,
        theme,
        ...hpsDeepDiveMetrics,
        scrolledTop: hpsDeepDiveNavTop,
      });
      for (const [label, check] of [
        ['page response', hpsDeepDiveResponse?.status() === 200],
        ['theme', hpsDeepDiveMetrics.dark === (theme === 'dark')],
        ['error overlay', !hpsDeepDiveMetrics.errorOverlay],
        ['horizontal page overflow', hpsDeepDiveMetrics.pageWidth <= width + 1],
        ['visible content clipped', hpsDeepDiveMetrics.contentRight <= width + 1],
        ['sticky section navigation', hpsDeepDiveMetrics.sectionNavPosition === 'sticky'],
        ['complete section navigation', hpsDeepDiveMetrics.sectionNavLinks === 5],
        ['artifact table scroll container', hpsDeepDiveMetrics.tableOverflow === 'auto'],
        ['artifact table keyboard focus', hpsDeepDiveMetrics.tableFocusable],
        [
          'section navigation visible after scrolling',
          hpsDeepDiveNavTop >= 75 && hpsDeepDiveNavTop < 150,
        ],
      ]) {
        if (!check) failures.push(`hps deep dive / ${size} / ${theme}: ${label}`);
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
