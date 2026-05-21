import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createApp } from '../index.js';

function makeFixtureDist() {
  const base = mkdtempSync(join(tmpdir(), 'portfolio-dist-'));
  writeFileSync(
    join(base, 'index.html'),
    '<html><body><div id="root"></div>SPA shell</body></html>',
  );
  mkdirSync(join(base, 'projects', 'guynode'), { recursive: true });
  writeFileSync(
    join(base, 'projects', 'guynode', 'index.html'),
    '<html><head><title>Guynode Snapshot</title></head><body><h1>Guynode (Flagship System)</h1><p>Meaningful static summary.</p></body></html>',
  );
  return base;
}

describe('crawler static route serving behavior', () => {
  it('serves static snapshot when route-specific html exists', async () => {
    const app = createApp(makeFixtureDist());
    const res = await request(app).get('/projects/guynode').redirects(1);
    expect(res.status).toBe(200);
    expect(res.text).toContain('Guynode Snapshot');
    expect(res.text).toContain('Meaningful static summary.');
    expect(res.text).not.toContain('<div id="root"></div>SPA shell');
  });

  it('falls back to SPA shell for unknown non-api route', async () => {
    const app = createApp(makeFixtureDist());
    const res = await request(app).get('/unknown/client/route');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<div id="root"></div>SPA shell');
  });

  it('does not let SPA fallback intercept /api', async () => {
    const app = createApp(makeFixtureDist());
    const res = await request(app).get('/api/not-a-route');
    expect(res.status).toBe(404);
    expect(res.text).not.toContain('SPA shell');
  });
});
