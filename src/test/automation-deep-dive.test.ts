import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { automationSystems, automationThesis, governancePrimitives } from '../data/deepDiveContent';
import { PROJECT_REGISTRY } from '../constants';

const root = process.cwd();

describe('Automation & Governance deep dive content', () => {
  it('unifies the three governed-AI-automation systems', () => {
    const ids = automationSystems.map((s) => s.id);
    expect(ids).toEqual(['portfolio-pipeline', 'aegis', 'emos']);
  });

  it('cross-links each system to a real project entry', () => {
    const projectIds = new Set(PROJECT_REGISTRY.map((p) => p.id));
    for (const system of automationSystems) {
      expect(system.href.startsWith('/projects/')).toBe(true);
      const id = system.href.replace('/projects/', '');
      expect(projectIds.has(id)).toBe(true);
    }
  });

  it('covers the autonomy spectrum from human-in-the-loop to autonomous', () => {
    const autonomy = automationSystems.map((s) => s.autonomy.toLowerCase()).join(' | ');
    expect(autonomy).toContain('human-led');
    expect(autonomy).toContain('human-in-the-loop');
    expect(autonomy).toContain('autonomous');
  });

  it('highlights the five reused governance primitives that draw the through-line', () => {
    const ids = governancePrimitives.map((p) => p.id);
    expect(ids).toEqual([
      'explicit-ruleset',
      'judge-vs-executor',
      'reasoning-trace',
      'drift-checks',
      'audit-trail',
    ]);
    // Each primitive must explain how it recurs across all three systems.
    for (const primitive of governancePrimitives) {
      expect(primitive.acrossSystems.length).toBeGreaterThan(0);
    }
  });

  it('keeps the thesis free of CLAUDE.md banned absolutes', () => {
    expect(automationThesis).not.toMatch(/\b(?:100%|completely|deterministic|immutable)\b/i);
    expect(automationThesis).not.toMatch(/\bzero[- ]/i);
  });

  it('folds the umbrella into the renamed governance tab with resolvable anchors', () => {
    const view = readFileSync(join(root, 'src/views/DeepDiveView.tsx'), 'utf8');
    // Option C: the automation story lives in the renamed 'process' tab, and
    // ?tab=automation resolves to it as an alias (no standalone tab).
    expect(view).toContain("label: 'Automation & Governance Architecture'");
    expect(view).not.toContain("activeMainTab === 'automation'");
    expect(view).toContain("automation: 'process'");
    for (const anchor of ['arch-thesis', 'arch-spectrum', 'arch-primitives']) {
      expect(view).toContain(`id="${anchor}"`);
    }
  });
});
