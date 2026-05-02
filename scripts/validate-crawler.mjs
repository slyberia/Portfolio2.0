import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = process.cwd();
const DIST = resolve(ROOT, 'dist');
const REQUIRED_ROUTES = [
  '/',
  '/tracks/implementation',
  '/tracks/ops-analytics',
  '/tracks/gis',
  '/projects',
  '/projects/guynode',
  '/projects/digital-twin',
  '/projects/ops-triage',
  '/projects/prompter-hub',
  '/projects/project-aegis',
  '/projects/nba-systems-qa',
  '/projects/luxe-lofts',
  '/portfolio2/deep-dive',
  '/resume',
  '/site-index',
  '/ai-index',
];
const LEGACY_CLOUD_RUN = 'northamerica-northeast2.run.app';

const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exitCode = 1;
};

const pass = (msg) => console.log(`✓ ${msg}`);

function fileForRoute(route) {
  return route === '/' ? resolve(DIST, 'index.html') : resolve(DIST, route.slice(1), 'index.html');
}

function assertSnapshotHtml(route) {
  const p = fileForRoute(route);
  if (!existsSync(p)) return fail(`Missing snapshot file for route ${route}: ${p}`);
  const html = readFileSync(p, 'utf8');

  if (!/<title>\s*[^<]+\s*<\/title>/i.test(html)) fail(`${route}: missing non-empty <title>`);
  if (!/<meta\s+name="description"\s+content="[^"]+"\s*\/?/i.test(html))
    fail(`${route}: missing non-empty meta description`);
  if (!/<link\s+rel="canonical"\s+href="https?:\/\/[^"]+"\s*\/?/i.test(html))
    fail(`${route}: missing canonical URL`);
  const bodyText = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (bodyText.length < 120) fail(`${route}: missing meaningful body text`);
  if (!/href="\/llms\.txt"/i.test(html)) fail(`${route}: missing /llms.txt link`);
  if (!/href="\/ai-index"/i.test(html)) fail(`${route}: missing /ai-index link`);
  if (html.includes(LEGACY_CLOUD_RUN)) fail(`${route}: contains stale Cloud Run domain`);
}

function validateSitemap() {
  const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml');
  const xml = readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  for (const route of REQUIRED_ROUTES) {
    const found = locs.some((loc) => {
      try {
        return new URL(loc).pathname === route;
      } catch {
        return false;
      }
    });
    if (!found) fail(`sitemap missing required route: ${route}`);
  }

  const hasCaseStudies = locs.some((loc) => {
    try {
      return new URL(loc).pathname.startsWith('/case-studies');
    } catch {
      return false;
    }
  });
  if (hasCaseStudies) fail('sitemap contains deprecated /case-studies route');

  if (xml.includes(LEGACY_CLOUD_RUN)) fail('sitemap contains stale Cloud Run domain');
}

function validateMetadataFiles() {
  for (const file of ['index.html', 'public/ai-index.html', 'public/site-index.html']) {
    const text = readFileSync(resolve(ROOT, file), 'utf8');
    if (text.includes(LEGACY_CLOUD_RUN)) fail(`${file} contains stale Cloud Run domain`);
  }
}

function validateGeneratorRouteList() {
  const generatorSource = readFileSync(
    resolve(ROOT, 'scripts', 'generate-crawler-html.mjs'),
    'utf8',
  );
  for (const route of REQUIRED_ROUTES) {
    if (!generatorSource.includes(`'${route}'`)) {
      fail(`snapshot generator route list missing required route: ${route}`);
    }
  }
}

validateGeneratorRouteList();
for (const route of REQUIRED_ROUTES) assertSnapshotHtml(route);
validateSitemap();
validateMetadataFiles();

if (process.exitCode) process.exit(process.exitCode);
pass(
  `Validated ${REQUIRED_ROUTES.length} crawler routes, snapshot metadata, and sitemap integrity.`,
);
