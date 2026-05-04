import { interactionStyles } from './interactionStyles';

export const componentRecipes = {
  button: {
    primary: `bg-tide-aqua text-white hover:bg-tide-aqua/90 ${interactionStyles.focusVisible} ${interactionStyles.disabled}`,
    secondary: `bg-white text-ink-navy border border-ink-border hover:bg-ink-mist ${interactionStyles.focusVisible} ${interactionStyles.disabled}`,
    ghost: `bg-transparent text-ink-slate hover:bg-ink-panel ${interactionStyles.focusVisible} ${interactionStyles.disabled}`,
  },
  badge: {
    default:
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-ink-panel text-ink-slate border border-ink-border',
    featured:
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-gild/15 text-gild-deep border border-gild/40',
  },
  card: {
    surface:
      'rounded-2xl border border-ink-border bg-ink-panel dark:bg-ink-deep/70 dark:border-white/10',
    featured: 'rounded-2xl border border-gild/40 bg-gild/10 dark:bg-gild/15',
  },
} as const;
