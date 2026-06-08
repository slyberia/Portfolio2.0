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

  it('documents the reused governance primitives that draw the through-line', () => {
    const ids = governancePrimitives.map((p) => p.id);
    expect(ids).toEqual([
      'explicit-ruleset',
      'reasoning-trace',
      'drift-checks',
      'audit-trail',
      'judge-vs-executor',
    ]);
    // Each primitive must explain how it recurs across all three systems.
    for (const primitive of governancePrimitives) {
      expect(primitive.acrossSystems.length).toBeGreaterThan(0);
    }
  });

  it('keeps the thesis free of unverifiable absolutes', () => {
    expect(automationThesis).not.toMatch(/\b100%|completely|deterministic\b/i);
  });

  it('wires the tab and resolvable anchors into DeepDiveView', () => {
    const view = readFileSync(join(root, 'src/views/DeepDiveView.tsx'), 'utf8');
    expect(view).toContain("id: 'automation'");
    for (const anchor of ['auto-1', 'auto-2', 'auto-3', 'auto-4']) {
      expect(view).toContain(`id="${anchor}"`);
    }
  });
});
