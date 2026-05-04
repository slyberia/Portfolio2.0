import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  validateProjectMetadataContracts,
  validateProjectMetadataIds,
} from '../data/projectMetadata';

const root = process.cwd();

describe('design-system and metadata contracts', () => {
  it('tailwind typography only references defined palette tokens', () => {
    const tailwindConfig = readFileSync(join(root, 'tailwind.config.js'), 'utf8');

    expect(tailwindConfig).not.toContain("theme('colors.navy.900')");
    expect(tailwindConfig).not.toContain("theme('colors.slate.600')");
    expect(tailwindConfig).toContain("theme('colors.ink.navy')");
    expect(tailwindConfig).toContain("theme('colors.ink.slate')");
  });

  it('project metadata ids match registry and are unique', () => {
    const { missing, duplicates } = validateProjectMetadataIds();
    expect(missing).toEqual([]);
    expect(duplicates).toEqual([]);
  });

  it('project metadata contract fields are stable for routing and filtering', () => {
    const checks = validateProjectMetadataContracts();
    expect(checks.uniqueIds).toBe(true);
    expect(checks.invalidAccents).toEqual([]);
    expect(checks.invalidFilters).toEqual([]);
    expect(checks.invalidRoleLanes).toEqual([]);
    expect(checks.duplicateHrefs).toEqual([]);
    expect(checks.duplicateSortOrder).toEqual([]);
    expect(checks.missingHrefPrefix).toEqual([]);
  });

  it('markdown rendering uses portfolio prose contract class', () => {
    const markdownSection = readFileSync(
      join(root, 'src', 'components', 'MarkdownSection.tsx'),
      'utf8',
    );
    expect(markdownSection).toMatch(/prose-portfolio|proseTheme\.container/);
    expect(markdownSection).not.toContain('prose-indigo');
  });
});

it('project detail view consumes shared project accent recipe', () => {
  const projectDetail = readFileSync(join(root, 'src', 'views', 'ProjectDetailView.tsx'), 'utf8');
  expect(projectDetail).toContain('getProjectAccentRecipe');
});

it('command palette consumes shared interaction/nav recipes', () => {
  const commandPalette = readFileSync(
    join(root, 'src', 'components', 'CommandPalette.tsx'),
    'utf8',
  );
  expect(commandPalette).toContain('interactionStyles');
  expect(commandPalette).toContain('navStyles');
});
