import { describe, it, expect } from 'vitest';
import { SKILL_GROUPS, PROJECT_REGISTRY } from '../constants';
import { isProjectPublic } from '../data/projectMetadata';
import { decisionBlocks, forensicEntries } from '../data/deepDiveContent';

/**
 * Subphase 7.6 drift guard: every Skills & Technologies entry must resolve to a real,
 * publicly visible evidence target — a public project case study, a real deep-dive anchor,
 * or an allowlisted page (the résumé, which backs tool-breadth skills with no case study).
 * This is what keeps a dangling reference (e.g. the kind that pointed at the then-unpublished
 * "project-aegis" before 7.7b) from silently returning empty.
 */
const publicProjectIds = new Set(
  PROJECT_REGISTRY.filter((project) => isProjectPublic(project.id)).map((project) => project.id),
);

const deepDiveAnchorIds = new Set<string>([
  ...decisionBlocks.map((block) => block.id),
  ...forensicEntries.map((entry) => entry.id),
]);

// Real, public pages that are valid evidence but are neither a project nor a deep dive.
const PAGE_ALLOWLIST = new Set(['/resume']);

const isValidTarget = (href: string): boolean => {
  if (PAGE_ALLOWLIST.has(href)) return true;
  if (href.startsWith('/projects/')) {
    return publicProjectIds.has(href.replace('/projects/', ''));
  }
  if (href.startsWith('/deep-dives#')) {
    return deepDiveAnchorIds.has(href.split('#')[1] ?? '');
  }
  return false;
};

const allSkills = SKILL_GROUPS.flatMap((group) => group.items);

describe('skill → evidence coverage', () => {
  it('every skill declares a proofHref', () => {
    const missing = allSkills.filter((skill) => !skill.proofHref).map((skill) => skill.name);
    expect(missing).toEqual([]);
  });

  it('every skill proofHref resolves to a public project, a real deep-dive anchor, or /resume', () => {
    const broken = allSkills
      .filter((skill) => skill.proofHref && !isValidTarget(skill.proofHref))
      .map((skill) => `${skill.name} -> ${skill.proofHref}`);
    expect(broken).toEqual([]);
  });
});
