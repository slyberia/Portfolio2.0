import { describe, expect, it } from 'vitest';
import {
  PROJECT_METADATA,
  getFeaturedProjects,
  getProjectHref,
  getProjectMetadata,
  getProjectsByFilter,
  getProjectsByRoleLane,
  getSupportingProjects,
  validateProjectMetadataContracts,
  validateProjectMetadataIds,
} from '../data/projectMetadata';
import { PROJECT_ACCENT_RECIPES } from '../lib/design-system/projectAccents';
import { ROLE_ACCENTS } from '../lib/design-system/roleAccents';

describe('project metadata contracts', () => {
  it('metadata items contain required contract fields', () => {
    for (const project of PROJECT_METADATA) {
      expect(project.id).toBeTruthy();
      expect(project.displayTitle).toBeTruthy();
      expect(project.roleLanes.length).toBeGreaterThan(0);
      expect(project.filters.length).toBeGreaterThan(0);
      expect(project.accent).toBeTruthy();
      expect(project.sortOrder).toBeGreaterThan(0);
      expect(project.href.startsWith('/projects/')).toBe(true);
    }
  });

  it('accent and role references are defined in recipes', () => {
    for (const project of PROJECT_METADATA) {
      expect(PROJECT_ACCENT_RECIPES[project.accent]).toBeDefined();
      project.roleLanes.forEach((lane) => expect(ROLE_ACCENTS[lane]).toBeDefined());
    }
  });

  it('featured projects carry featured/evidence metadata', () => {
    PROJECT_METADATA.filter((p) => p.hierarchy === 'featured').forEach((p) => {
      expect(p.featuredLabel).toBeTruthy();
      expect(p.evidenceTier).toBeTruthy();
    });
  });

  it('has only one flagship and deterministic switcher ranks', () => {
    const flagship = PROJECT_METADATA.filter((p) => p.flagship);
    expect(flagship).toHaveLength(1);
    expect(flagship[0].id).toBe('guynode');
    const ranks = PROJECT_METADATA.map((p) => p.switcherRank).filter(
      (r): r is number => typeof r === 'number',
    );
    expect(new Set(ranks).size).toBe(ranks.length);
    expect([...ranks].sort((a, b) => a - b)).toEqual(ranks);
  });

  it('legacy validators still pass', () => {
    const ids = validateProjectMetadataIds();
    const contracts = validateProjectMetadataContracts();
    expect(ids.missing).toEqual([]);
    expect(ids.duplicates).toEqual([]);
    expect(contracts.uniqueIds).toBe(true);
    expect(contracts.invalidAccents).toEqual([]);
    expect(contracts.featuredWithoutEvidence).toEqual([]);
    expect(contracts.flagshipCount).toBe(1);
    expect(contracts.duplicateSwitcherRank).toEqual([]);
  });

  it('metadata helper functions remain stable', () => {
    expect(getProjectMetadata('guynode')?.id).toBe('guynode');
    expect(getProjectHref('guynode')).toBe('/projects/guynode');
    expect(getFeaturedProjects().every((p) => p.hierarchy === 'featured')).toBe(true);
    expect(getSupportingProjects().every((p) => p.hierarchy === 'supporting')).toBe(true);
    expect(getProjectsByFilter('QA').every((p) => p.filters.includes('QA'))).toBe(true);
    expect(getProjectsByRoleLane('GIS').every((p) => p.roleLanes.includes('GIS'))).toBe(true);
  });
});
