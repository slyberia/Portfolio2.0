import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECT_METADATA } from '../data/projectMetadata';
import { getSeoForPath, SITE_BASE_URL } from '../lib/seo';
import { matchRoutes } from 'react-router-dom';
import { routeDefinitions } from '../router';

const root = process.cwd();
const publicDir = join(root, 'public');

describe('crawler static assets', () => {
  it('sitemap includes current track/project routes and excludes case-studies', () => {
    const sitemap = readFileSync(join(publicDir, 'sitemap.xml'), 'utf8');

    expect(sitemap).toContain('/tracks/forward-deployed');
    expect(sitemap).toContain('/tracks/solutions-architect');
    expect(sitemap).toContain('/tracks/spatial-systems');
    expect(sitemap).toContain('/projects/hps-geospatial');
    expect(sitemap).toContain('/projects/guynode');
    expect(sitemap).toContain('/projects/digital-twin');
    expect(sitemap).not.toContain('/case-studies/');
  });

  it('robots has sitemap.xml and does not declare llms.txt as sitemap', () => {
    const robots = readFileSync(join(publicDir, 'robots.txt'), 'utf8');
    expect(robots).toMatch(/Sitemap:\s+.*\/sitemap\.xml/);
    expect(robots).not.toMatch(/Sitemap:\s+.*\/llms\.txt/);
  });

  it('required static crawler files exist', () => {
    expect(existsSync(join(publicDir, 'ai-index.html'))).toBe(true);
    expect(existsSync(join(publicDir, 'ai-index', 'index.html'))).toBe(false);
    expect(existsSync(join(publicDir, 'site-index.html'))).toBe(true);
    expect(existsSync(join(publicDir, 'markdown', 'index.md'))).toBe(true);
  });

  it('keeps one canonical AI index aligned with the HPS deep dive', () => {
    const aiIndex = readFileSync(join(publicDir, 'ai-index.html'), 'utf8');
    const llms = readFileSync(join(publicDir, 'llms.txt'), 'utf8');

    expect(aiIndex).toMatch(/<link\s+rel="canonical"/);
    expect(aiIndex).toContain('href="/deep-dives?tab=hps-geospatial"');
    expect(aiIndex).toContain('href="/markdown/deep-dives/hps-geospatial.md"');
    expect(llms).toContain('/deep-dives?tab=hps-geospatial');
    expect(llms).toContain('/markdown/deep-dives/hps-geospatial.md');
    expect(llms).not.toContain('/ai-index.html');
  });

  it('lists every public project in the LLM companion index', () => {
    const llms = readFileSync(join(publicDir, 'llms.txt'), 'utf8');
    for (const project of PROJECT_METADATA.filter((p) => (p.visibility ?? 'public') === 'public')) {
      expect(llms, project.id).toContain(`- ${project.href}`);
    }
  });

  it('publishes every visible project across canonical, crawler, and static discovery indexes', () => {
    const sitemap = readFileSync(join(publicDir, 'sitemap.xml'), 'utf8');
    const crawlerSitemap = readFileSync(join(publicDir, 'crawler-sitemap.xml'), 'utf8');
    const aiIndex = readFileSync(join(publicDir, 'ai-index.html'), 'utf8');
    const siteIndex = readFileSync(join(publicDir, 'site-index.html'), 'utf8');
    for (const project of PROJECT_METADATA.filter((p) => (p.visibility ?? 'public') === 'public')) {
      expect(getSeoForPath(project.href).canonicalPath).toBe(project.href);
      expect(sitemap, project.id).toContain(`<loc>${SITE_BASE_URL}${project.href}</loc>`);
      expect(crawlerSitemap, project.id).toContain(`/crawler${project.href}</loc>`);
      expect(aiIndex, project.id).toContain(`href="${project.href}"`);
      expect(siteIndex, project.id).toContain(`href="${project.href}"`);
    }
  });

  it('only advertises markdown mirrors that exist', () => {
    for (const project of PROJECT_METADATA) {
      const markdownPath = getSeoForPath(project.href).markdownPath;
      if (markdownPath) expect(existsSync(join(publicDir, markdownPath))).toBe(true);
    }
  });

  it('uses the indexed deep-dive tab as the canonical URL', () => {
    for (const tab of [
      'hps-geospatial',
      'process',
      'luxe-lofts',
      'northern-grind',
      'moh',
      'guynode',
    ]) {
      const seo = getSeoForPath('/deep-dives', `?tab=${tab}`);
      expect(seo.canonicalPath).toBe(`/deep-dives?tab=${tab}`);
      expect(seo.jsonLd[0].url).toBe(`${SITE_BASE_URL}/deep-dives?tab=${tab}`);
    }
    expect(getSeoForPath('/deep-dives', '?tab=automation').canonicalPath).toBe(
      '/deep-dives?tab=process',
    );
    expect(getSeoForPath('/deep-dives', '?tab=unknown').canonicalPath).toBe('/deep-dives');
    expect(getSeoForPath('/deep-dives', '?tab=hps-geospatial').markdownPath).toBe(
      '/markdown/deep-dives/hps-geospatial.md',
    );
  });

  it('resolves every internal link in the static discovery indexes', () => {
    const crawlerSitemap = readFileSync(join(publicDir, 'crawler-sitemap.xml'), 'utf8');
    for (const file of ['ai-index.html', 'site-index.html']) {
      const html = readFileSync(join(publicDir, file), 'utf8');
      for (const [, href] of html.matchAll(/href="(\/[^"#]+)"/g)) {
        const pathname = new URL(href, SITE_BASE_URL).pathname;
        const isStatic = existsSync(join(publicDir, pathname));
        const isCrawler =
          pathname.startsWith('/crawler/') &&
          crawlerSitemap.includes(`<loc>${SITE_BASE_URL}${pathname}</loc>`);
        const isRoute = matchRoutes(routeDefinitions, pathname) !== null;
        expect(
          isStatic || isCrawler || isRoute || pathname === '/ai-index',
          `${file}: ${href}`,
        ).toBe(true);
      }
    }
  });
});
