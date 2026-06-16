import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';

const ROOT = process.cwd();
const DIST = resolve(ROOT, 'dist');
const CRAWLER_DIST = resolve(DIST, 'crawler');
const REQUIRED_ROUTES = [
  '/',
  '/tracks/forward-deployed',
  '/tracks/solutions-architect',
  '/tracks/spatial-systems',
  '/projects',
  '/projects/guynode',
  '/projects/digital-twin',
  '/projects/ops-triage',
  '/projects/project-aegis',
  '/projects/portfolio-pipeline',
  '/projects/luxe-lofts',
  '/deep-dives',
  '/deep-dives?tab=process',
  '/deep-dives?tab=luxe-lofts',
  '/deep-dives?tab=northern-grind',
  '/deep-dives?tab=moh',
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

// Deep-dive content tabs are indexed as query-param URLs (e.g. `/deep-dives?tab=process`) but
// their static crawler mirror is written to a path-safe nested folder (`/crawler/deep-dives/
// process`) — see scripts/generate-crawler-html.mjs. Map a (possibly query-param) route to its
// on-disk mirror path so file lookups and the crawler-sitemap check stay in sync.
function mirrorPathForRoute(route) {
  const [routePath, query] = route.split('?');
  if (!query) return routePath;
  const tab = new URLSearchParams(query).get('tab');
  return tab ? `${routePath}/${tab}` : routePath;
}

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function crawlerFileForRoute(route) {
  const mirror = mirrorPathForRoute(route);
  return mirror === '/'
    ? resolve(CRAWLER_DIST, 'index.html')
    : resolve(CRAWLER_DIST, mirror.slice(1), 'index.html');
}

function assertDistIndexAppShell() {
  const p = resolve(DIST, 'index.html');
  if (!existsSync(p)) return fail(`Missing dist app entrypoint: ${p}`);
  const html = readFileSync(p, 'utf8');
  if (!html.includes('<div id="root"></div>'))
    fail('dist/index.html missing React root mount node');
  if (!/<script[^>]*type="module"[^>]*src=/i.test(html)) {
    fail('dist/index.html missing Vite module script');
  }
}

function assertSnapshotHtml(route) {
  const p = crawlerFileForRoute(route);
  if (!existsSync(p)) return fail(`Missing snapshot file for route ${route}: ${p}`);
  const html = readFileSync(p, 'utf8');

  if (!/<title>\s*[^<]+\s*<\/title>/i.test(html)) fail(`${route}: missing non-empty <title>`);
  if (!/<meta\s+name="description"\s+content="[^"]+"\s*\/?/i.test(html))
    fail(`${route}: missing non-empty meta description`);
  if (!/<link\s+rel="canonical"\s+href="https?:\/\/[^\"]+"\s*\/?/i.test(html))
    fail(`${route}: missing canonical URL`);
  if (!new RegExp(`<a href="${route === '/' ? '/' : escapeRegExp(route)}">`).test(html)) {
    fail(`${route}: canonical route reference missing in body`);
  }

  const bodyText = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (bodyText.length < 120) fail(`${route}: missing meaningful body text`);
  if (!/href="\/llms\.txt"/i.test(html)) fail(`${route}: missing /llms.txt link`);
  if (!/href="\/ai-index"/i.test(html)) fail(`${route}: missing /ai-index link`);
  if (!/Mirror route: <a href="\/crawler/i.test(html))
    fail(`${route}: missing static crawler mirror label`);

  const jsonLdBlocks = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  if (jsonLdBlocks.length === 0) fail(`${route}: missing JSON-LD block`);
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
    } catch {
      fail(`${route}: invalid JSON-LD JSON`);
    }
  }
  if (html.includes(LEGACY_CLOUD_RUN)) fail(`${route}: contains stale Cloud Run domain`);
}

function assertNoCanonicalSnapshotWrites() {
  const blockedRoutes = [
    '/projects',
    '/tracks/forward-deployed',
    '/tracks/solutions-architect',
    '/tracks/spatial-systems',
    '/resume',
    '/site-index',
    '/deep-dives',
    '/ai-index',
  ];
  for (const route of blockedRoutes) {
    const p = resolve(DIST, route.slice(1), 'index.html');
    if (!existsSync(p)) continue;
    const html = readFileSync(p, 'utf8');
    if (/Mirror route: <a href="\/crawler/i.test(html)) {
      fail(`Crawler snapshot leaked into canonical dist path: dist/${route.slice(1)}/index.html`);
    }
  }
}

function walk(dir) {
  const out = [];
  for (const item of readdirSync(dir)) {
    const full = resolve(dir, item);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function assertCrawlerOnlyInNamespace() {
  if (!existsSync(CRAWLER_DIST)) return fail('dist/crawler directory missing');
  const htmlFiles = walk(DIST).filter((p) => p.endsWith('.html'));
  for (const p of htmlFiles) {
    const rel = relative(DIST, p);
    const relUnix = rel.split(sep).join('/');
    if (relUnix === 'index.html' || relUnix.startsWith('crawler/')) continue;
    const html = readFileSync(p, 'utf8');
    if (/Mirror route: <a href="\/crawler/i.test(html)) {
      fail(`Crawler snapshot exists outside /crawler namespace: dist/${relUnix}`);
    }
  }
}

function validateSitemaps() {
  const sitemap = readFileSync(resolve(ROOT, 'public', 'sitemap.xml'), 'utf8');
  if (sitemap.includes('/crawler/')) fail('public/sitemap.xml must not list crawler routes');

  const crawlerSitemap = readFileSync(resolve(ROOT, 'public', 'crawler-sitemap.xml'), 'utf8');
  for (const route of REQUIRED_ROUTES) {
    const crawlerRoute = route === '/' ? '/crawler/' : `/crawler${mirrorPathForRoute(route)}`;
    if (!crawlerSitemap.includes(crawlerRoute)) {
      fail(`public/crawler-sitemap.xml missing route: ${crawlerRoute}`);
    }
  }
}

assertDistIndexAppShell();
for (const route of REQUIRED_ROUTES) assertSnapshotHtml(route);
assertNoCanonicalSnapshotWrites();
assertCrawlerOnlyInNamespace();
validateSitemaps();

if (process.exitCode) process.exit(process.exitCode);
pass('Validated React app entrypoint and crawler namespace isolation under dist/crawler/.');
