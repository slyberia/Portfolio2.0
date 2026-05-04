import { describe, expect, it } from 'vitest';
import { darkModeStyles, interactionStyles, navStyles, proseTheme } from '../lib/design-system';
import { ROLE_ACCENTS } from '../lib/design-system/roleAccents';
import { PROJECT_ACCENT_RECIPES } from '../lib/design-system/projectAccents';
import { CATEGORY_ACCENTS } from '../lib/design-system/categoryAccents';
import { STATUS_COLORS } from '../lib/design-system/statusColors';

describe('design system contracts', () => {
  it('every role lane has a complete role accent recipe', () => {
    for (const lane of ['Implementation', 'QA', 'GIS'] as const) {
      const recipe = ROLE_ACCENTS[lane];
      expect(recipe).toBeDefined();
      expect(recipe.token).toBeTruthy();
      expect(recipe.chipClass).toContain('border');
      expect(recipe.focusRingClass).toContain('focus-visible:ring');
    }
  });

  it('QA role does not use gold/amber/warning semantics', () => {
    const qa = ROLE_ACCENTS.QA;
    expect(qa.token).toBe('blue');
    expect(qa.textClass).not.toMatch(/gold|amber|warning/i);
  });

  it('every project accent has a complete recipe and gold is visibly gold', () => {
    for (const accent of ['aqua', 'blue', 'cyan', 'gold', 'slate'] as const) {
      const recipe = PROJECT_ACCENT_RECIPES[accent];
      expect(recipe).toBeDefined();
      expect(recipe.textClass).toBeTruthy();
      expect(recipe.bgClass).toBeTruthy();
      expect(recipe.borderClass).toBeTruthy();
    }
    expect(PROJECT_ACCENT_RECIPES.gold.textClass).toMatch(/gild/);
    expect(PROJECT_ACCENT_RECIPES.gold.bgClass).toMatch(/gild/);
  });

  it('category and status entries have required fields', () => {
    Object.values(CATEGORY_ACCENTS).forEach((entry) => {
      expect(entry.label).toBeTruthy();
      expect(entry.textClass).toBeTruthy();
    });
    Object.values(STATUS_COLORS).forEach((entry) => {
      expect(entry.label).toBeTruthy();
      expect(entry.bgClass).toBeTruthy();
    });
    expect(STATUS_COLORS.featured.textClass).toMatch(/gild/);
    expect(STATUS_COLORS.warning.textClass).not.toMatch(/gild/);
  });

  it('shared interaction/nav/prose/dark recipes are import-safe and complete', () => {
    expect(interactionStyles.hover).toBeTruthy();
    expect(interactionStyles.active).toBeTruthy();
    expect(interactionStyles.focusVisible).toContain('focus-visible:ring');
    expect(interactionStyles.disabled).toContain('disabled:');
    expect(interactionStyles.loading).toBeTruthy();
    expect(interactionStyles.emptyState).toContain('border-dashed');
    expect(navStyles.item).toBeTruthy();
    expect(navStyles.itemActive).toBeTruthy();
    expect(navStyles.itemFocus).toContain('focus-visible');
    expect(proseTheme.container).toContain('prose-portfolio');
    expect(darkModeStyles.surface).toContain('dark:bg');
  });
});
