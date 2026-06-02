import { describe, expect, it } from 'vitest';
import {
  PROJECT_METADATA,
  PROJECT_FILTERS,
  getFeaturedProjects,
  getSupportingProjects,
  getProjectsByFilter,
  getProjectsByRoleLane,
  getProjectMetadata,
  isProjectPublic,
} from '../data/projectMetadata';

const DRAFT_IDS = ['northern-grind', 'moh'];

describe('project visibility', () => {
  it('draft projects exist in the registry but are marked non-public', () => {
    for (const id of DRAFT_IDS) {
      const meta = getProjectMetadata(id);
      expect(meta, `expected metadata for ${id}`).toBeDefined();
      expect(meta?.visibility).toBe('draft');
      expect(isProjectPublic(id)).toBe(false);
    }
  });

  it('public projects default to visible', () => {
    expect(isProjectPublic('guynode')).toBe(true);
    expect(isProjectPublic('digital-twin')).toBe(true);
  });

  it('draft projects are excluded from every visitor-facing list helper', () => {
    const listed = new Set<string>(
      [
        ...getFeaturedProjects(),
        ...getSupportingProjects(),
        ...PROJECT_FILTERS.flatMap((filter) => getProjectsByFilter(filter)),
        ...(['Implementation', 'QA', 'GIS'] as const).flatMap((lane) =>
          getProjectsByRoleLane(lane),
        ),
      ].map((project) => project.id),
    );

    for (const id of DRAFT_IDS) {
      expect(listed.has(id), `${id} should not appear in any public list`).toBe(false);
    }
  });

  it('draft projects remain reachable by direct id lookup (for preview)', () => {
    for (const id of DRAFT_IDS) {
      expect(getProjectMetadata(id)?.id).toBe(id);
    }
  });

  it('every project still has a unique sortOrder (drafts included)', () => {
    const orders = PROJECT_METADATA.map((project) => project.sortOrder);
    expect(new Set(orders).size).toBe(orders.length);
  });
});
