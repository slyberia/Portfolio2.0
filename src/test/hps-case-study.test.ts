import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { hpsRecruiterScan, splitHpsCaseStudy } from '../lib/hpsCaseStudy';

const content = readFileSync(join(process.cwd(), 'public/case-studies/hps-geospatial.md'), 'utf8');

describe('HPS progressive disclosure', () => {
  it('preserves the canonical narrative and optional technical notes without losing evidence', () => {
    const { overview, technical } = splitHpsCaseStudy(content);
    expect(overview).toContain('33/33 browser matrix');
    expect(overview).toContain('local and synthetic');
    expect(technical).toContain('five-minute, single-use IndexedDB handoff');
    expect(technical).toContain('Belize/Jamaica numeric reports missing');
    expect(`${overview}\n${technical}`).toBe(content);
  });

  it('keeps the first scan short and tied to the same source', () => {
    const { overview } = splitHpsCaseStudy(content);
    const scan = hpsRecruiterScan(overview);
    expect(scan).toContain('**My work.**');
    expect(scan).toContain('**local, synthetic integration evidence**');
    expect(scan).not.toContain('## System, decisions, and tradeoffs');
  });
});
