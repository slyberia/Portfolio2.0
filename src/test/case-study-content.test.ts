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

// Uniformity guard: every case study must share the same canonical skeleton so entries read
// consistently to a recruiter scanning several in a row. If a new project is added or an entry
// is restructured, this fails until the shared anchors are present. Project-specific sections
// between the anchors are still allowed.
describe('case-study structure parity (uniformity guard)', () => {
  const REQUIRED_ANCHORS: { label: string; test: (body: string) => boolean }[] = [
    { label: 'an H1 title (`# …`)', test: (b) => /^#\s+\S/m.test(b) },
    {
      label: 'a lead metadata blockquote (`> **Role:** …`)',
      test: (b) => /^>\s*\*\*Role:\*\*/m.test(b),
    },
    { label: 'a `> **Project Overview**` block', test: (b) => /Project Overview/.test(b) },
    {
      label: 'a `## 🤝 Customer / Stakeholder Value` section',
      test: (b) => /^##\s+🤝\s+Customer \/ Stakeholder Value\s*$/m.test(b),
    },
  ];

  for (const project of PROJECT_REGISTRY) {
    const body = readFileSync(join(CASE_STUDY_DIR, `${project.id}.md`), 'utf8');
    for (const anchor of REQUIRED_ANCHORS) {
      it(`"${project.id}" has ${anchor.label}`, () => {
        expect(anchor.test(body), `${project.id}.md is missing ${anchor.label}`).toBe(true);
      });
    }
  }
});
