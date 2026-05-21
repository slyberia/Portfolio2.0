export type ProjectAccent = 'aqua' | 'blue' | 'cyan' | 'gold' | 'slate';

export type ProjectAccentRecipe = {
  id: ProjectAccent;
  label: string;
  textClass: string;
  mutedTextClass: string;
  bgClass: string;
  borderClass: string;
  chipClass: string;
  iconTileClass: string;
  focusRingClass: string;
  hoverClass: string;
  shadowClass?: string;
};

export const PROJECT_ACCENT_RECIPES: Record<ProjectAccent, ProjectAccentRecipe> = {
  aqua: {
    id: 'aqua',
    label: 'Implementation',
    textClass: 'text-tide-aqua',
    mutedTextClass: 'text-tide-aqua/80',
    bgClass: 'bg-tide-aqua/10',
    borderClass: 'border-tide-aqua/30',
    chipClass: 'bg-tide-aqua/15 text-tide-aqua border border-tide-aqua/30',
    iconTileClass: 'bg-tide-aqua/15 text-tide-aqua border border-tide-aqua/30',
    focusRingClass: 'focus-visible:ring-tide-aqua/50',
    hoverClass: 'hover:bg-tide-aqua/20',
    shadowClass: 'shadow-tide-aqua/15',
  },
  blue: {
    id: 'blue',
    label: 'QA / Ops',
    textClass: 'text-tide-blue',
    mutedTextClass: 'text-tide-blue/80',
    bgClass: 'bg-tide-blue/10',
    borderClass: 'border-tide-blue/30',
    chipClass: 'bg-tide-blue/15 text-tide-blue border border-tide-blue/30',
    iconTileClass: 'bg-tide-blue/15 text-tide-blue border border-tide-blue/30',
    focusRingClass: 'focus-visible:ring-tide-blue/50',
    hoverClass: 'hover:bg-tide-blue/20',
    shadowClass: 'shadow-tide-blue/15',
  },
  cyan: {
    id: 'cyan',
    label: 'GIS / Data',
    textClass: 'text-tide-cyan',
    mutedTextClass: 'text-tide-cyan/80',
    bgClass: 'bg-tide-cyan/10',
    borderClass: 'border-tide-cyan/30',
    chipClass: 'bg-tide-cyan/15 text-tide-cyan border border-tide-cyan/30',
    iconTileClass: 'bg-tide-cyan/15 text-tide-cyan border border-tide-cyan/30',
    focusRingClass: 'focus-visible:ring-tide-cyan/50',
    hoverClass: 'hover:bg-tide-cyan/20',
    shadowClass: 'shadow-tide-cyan/15',
  },
  gold: {
    id: 'gold',
    label: 'Featured Proof',
    textClass: 'text-gild-deep',
    mutedTextClass: 'text-gild-deep/80',
    bgClass: 'bg-gild/15',
    borderClass: 'border-gild/40',
    chipClass: 'bg-gild/20 text-gild-deep border border-gild/40',
    iconTileClass: 'bg-gild-soft/25 text-gild-deep border border-gild/35',
    focusRingClass: 'focus-visible:ring-gild/60',
    hoverClass: 'hover:bg-gild-soft/25',
    shadowClass: 'shadow-gild/25',
  },
  slate: {
    id: 'slate',
    label: 'Supporting',
    textClass: 'text-ink-slate',
    mutedTextClass: 'text-ink-slate/80',
    bgClass: 'bg-ink-border/40',
    borderClass: 'border-ink-border',
    chipClass: 'bg-ink-panel text-ink-slate border border-ink-border',
    iconTileClass: 'bg-ink-panel text-ink-slate border border-ink-border',
    focusRingClass: 'focus-visible:ring-ink-border',
    hoverClass: 'hover:bg-ink-mist',
  },
};
