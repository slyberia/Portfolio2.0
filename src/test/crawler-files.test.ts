import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const publicDir = join(root, 'public');

describe('crawler static assets', () => {
  it('sitemap includes current track/project routes and excludes case-studies', () => {
    const sitemap = readFileSync(join(publicDir, 'sitemap.xml'), 'utf8');

    expect(sitemap).toContain('/tracks/forward-deployed');
    expect(sitemap).toContain('/tracks/solutions-architect');
    expect(sitemap).toContain('/tracks/spatial-systems');
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
    expect(existsSync(join(publicDir, 'site-index.html'))).toBe(true);
    expect(existsSync(join(publicDir, 'markdown', 'index.md'))).toBe(true);
  });
});
