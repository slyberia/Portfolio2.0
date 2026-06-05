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

// Derived so the suite stays correct as projects are published or staged as drafts.
const nonPublicIds = PROJECT_METADATA.filter(
  (project) => (project.visibility ?? 'public') !== 'public',
).map((project) => project.id);

describe('project visibility', () => {
  it('public projects default to visible', () => {
    expect(isProjectPublic('guynode')).toBe(true);
    expect(isProjectPublic('digital-twin')).toBe(true);
  });

  it('unknown ids default to public', () => {
    expect(isProjectPublic('does-not-exist')).toBe(true);
  });

  it('published supporting projects (Northern Grind, MOH) are public and listed', () => {
    for (const id of ['northern-grind', 'moh'] as const) {
      expect(isProjectPublic(id)).toBe(true);
      expect(getSupportingProjects().some((project) => project.id === id)).toBe(true);
    }
  });

  it('non-public projects (if any) are excluded from every visitor-facing list helper', () => {
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

    for (const id of nonPublicIds) {
      expect(listed.has(id), `${id} should not appear in any public list`).toBe(false);
    }
  });

  it('non-public projects remain reachable by direct id lookup (for preview)', () => {
    for (const id of nonPublicIds) {
      expect(getProjectMetadata(id)?.id).toBe(id);
    }
  });

  it('every project still has a unique sortOrder', () => {
    const orders = PROJECT_METADATA.map((project) => project.sortOrder);
    expect(new Set(orders).size).toBe(orders.length);
  });
});
