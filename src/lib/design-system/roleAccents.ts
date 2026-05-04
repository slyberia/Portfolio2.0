export type RoleLane = 'Implementation' | 'QA' | 'GIS';

export type AccentRecipe = {
  id: string;
  label: string;
  token: 'aqua' | 'blue' | 'cyan' | 'gold' | 'slate';
  textClass: string;
  mutedTextClass: string;
  bgClass: string;
  borderClass: string;
  chipClass: string;
  iconTileClass: string;
  focusRingClass: string;
  hoverClass: string;
};

export const ROLE_ACCENTS: Record<RoleLane, AccentRecipe> = {
  Implementation: {
    id: 'Implementation',
    label: 'Implementation',
    token: 'aqua',
    textClass: 'text-tide-aqua',
    mutedTextClass: 'text-tide-aqua/80',
    bgClass: 'bg-tide-aqua/10',
    borderClass: 'border-tide-aqua/30',
    chipClass: 'bg-tide-aqua/15 text-tide-aqua border border-tide-aqua/30',
    iconTileClass: 'bg-tide-aqua/15 text-tide-aqua border border-tide-aqua/30',
    focusRingClass: 'focus-visible:ring-tide-aqua/50',
    hoverClass: 'hover:bg-tide-aqua/20',
  },
  QA: {
    id: 'QA',
    label: 'QA / Ops',
    token: 'blue',
    textClass: 'text-tide-blue',
    mutedTextClass: 'text-tide-blue/80',
    bgClass: 'bg-tide-blue/10',
    borderClass: 'border-tide-blue/30',
    chipClass: 'bg-tide-blue/15 text-tide-blue border border-tide-blue/30',
    iconTileClass: 'bg-tide-blue/15 text-tide-blue border border-tide-blue/30',
    focusRingClass: 'focus-visible:ring-tide-blue/50',
    hoverClass: 'hover:bg-tide-blue/20',
  },
  GIS: {
    id: 'GIS',
    label: 'GIS / Data Systems',
    token: 'cyan',
    textClass: 'text-tide-cyan',
    mutedTextClass: 'text-tide-cyan/80',
    bgClass: 'bg-tide-cyan/10',
    borderClass: 'border-tide-cyan/30',
    chipClass: 'bg-tide-cyan/15 text-tide-cyan border border-tide-cyan/30',
    iconTileClass: 'bg-tide-cyan/15 text-tide-cyan border border-tide-cyan/30',
    focusRingClass: 'focus-visible:ring-tide-cyan/50',
    hoverClass: 'hover:bg-tide-cyan/20',
  },
};
