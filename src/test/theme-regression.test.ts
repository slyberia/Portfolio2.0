import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const migratedFiles = [
  'src/components/MarkdownSection.tsx',
  'src/components/TopNav.tsx',
  'src/components/BottomTabBar.tsx',
  'src/components/tracks/RoleTrackPage.tsx',
  'src/views/ResumeView.tsx',
  'src/components/CommandPalette.tsx',
  'src/views/ProjectDetailView.tsx',
  'tailwind.config.js',
  'src/index.css',
];

describe('theme regression checks', () => {
  it('blocks known palette migration regressions', () => {
    const content = migratedFiles.map((f) => readFileSync(join(root, f), 'utf8')).join('\n');
    expect(content).not.toContain('prose-indigo');
    expect(content).not.toContain('colors.navy.900');
    expect(content).not.toMatch(/dark:text-[^\s"']+\/(10|20|30|40)\b/);
    expect(content).not.toMatch(/sienna instead of indigo/i);

    const componentContent = migratedFiles
      .filter((f) => f !== 'tailwind.config.js')
      .map((f) => readFileSync(join(root, f), 'utf8'))
      .join('\n');
    expect(componentContent).not.toMatch(/\btext-navy-900\b/);
  });

  it('legacy navy compatibility alias is temporary and documented', () => {
    const tailwindConfig = readFileSync(join(root, 'tailwind.config.js'), 'utf8');
    expect(tailwindConfig).toContain(
      'Temporary compatibility alias for legacy text-navy-900 usages',
    );
  });
});
