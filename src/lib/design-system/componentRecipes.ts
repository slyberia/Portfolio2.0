import { EvidenceBlock } from '../../types';
import { interactionStyles } from './interactionStyles';

export const componentRecipes = {
  button: {
    primary: `bg-tide-aqua text-white hover:bg-tide-aqua/90 ${interactionStyles.focusVisible} ${interactionStyles.disabled}`,
    secondary: `bg-white text-ink-navy border border-ink-border hover:bg-ink-mist ${interactionStyles.focusVisible} ${interactionStyles.disabled}`,
    ghost: `bg-transparent text-ink-slate hover:bg-ink-panel ${interactionStyles.focusVisible} ${interactionStyles.disabled}`,
    disclosure: `inline-flex items-center gap-2 px-8 py-3 rounded-xl uppercase tracking-widest text-xs font-bold transition-all border border-ink-border bg-white text-ink-navy hover:bg-ink-mist ${interactionStyles.focusVisible} ${interactionStyles.disabled}`,
    disclosureGhost: `inline-flex items-center gap-2 px-8 py-3 rounded-xl uppercase tracking-widest text-xs font-bold transition-all bg-transparent text-ink-slate hover:bg-ink-panel ${interactionStyles.focusVisible} ${interactionStyles.disabled}`,
  },
  badge: {
    default:
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-ink-panel text-ink-slate border border-ink-border',
    featured:
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-gild/15 text-gild-deep border border-gild/40',
  },
  card: {
    surface: 'rounded-2xl border border-ink-border bg-ink-panel dark:bg-ink-deep/70 dark:border-white/10',
    featured: 'rounded-2xl border border-gild/40 bg-gild/10 dark:bg-gild/15',
  },
  layout: {
    section: 'px-6 py-12',
    container: 'max-w-5xl mx-auto space-y-8',
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    sectionHeader: 'space-y-2',
  },
  typography: {
    sectionHeading: 'text-xs font-bold uppercase tracking-[0.3em]',
    sectionSubheading: 'text-sm text-ink-slate dark:text-ink-border/80',
  },
} as const;
