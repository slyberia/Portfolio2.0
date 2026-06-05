import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECT_REGISTRY } from '../constants';

const CASE_STUDY_DIR = join(process.cwd(), 'public', 'case-studies');

// Subphase 6.12: markdown files are the single source of truth for case-study bodies.
// This guard fails if a routed project ever loses its markdown, so the content store and the
// render path can never silently diverge again.
describe('case-study markdown coverage (drift guard)', () => {
  for (const project of PROJECT_REGISTRY) {
    it(`has a non-empty markdown body for "${project.id}"`, () => {
      const file = join(CASE_STUDY_DIR, `${project.id}.md`);
      expect(existsSync(file), `expected public/case-studies/${project.id}.md to exist`).toBe(true);

      const body = readFileSync(file, 'utf8').trim();
      expect(body.length, `${project.id}.md should not be empty`).toBeGreaterThan(0);
      // Must be real markdown, not an SPA app-shell fallback.
      expect(body.toLowerCase().startsWith('<!doctype html')).toBe(false);
      expect(body).toContain('#');
    });
  }
});
