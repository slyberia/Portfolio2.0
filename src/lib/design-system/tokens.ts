export const colorTokens = {
  tide: {
    aqua: '#39b8bc',
    blue: '#59abe4',
    cyan: '#60bbd4',
    sky: '#64c8f1',
    softBlue: '#80c4f1',
  },
  gild: {
    DEFAULT: '#d8a84f',
    soft: '#f1c878',
    deep: '#a8782a',
  },
  ink: {
    deep: '#07161f',
    navy: '#10242f',
    slate: '#526a78',
    mist: '#f5f9fb',
    panel: '#f8fbfd',
    border: '#d8e8ee',
  },
} as const;

export const semanticTokens = {
  text: {
    heading: 'text-ink-navy dark:text-ink-mist',
    body: 'text-ink-slate dark:text-ink-border',
    muted: 'text-ink-slate/80 dark:text-ink-border/90',
  },
  surface: {
    app: 'bg-ink-mist dark:bg-ink-deep',
    panel: 'bg-ink-panel dark:bg-ink-deep/70',
  },
  border: {
    default: 'border-ink-border dark:border-white/10',
    emphasis: 'border-tide-softBlue/50 dark:border-tide-cyan/50',
  },
  action: {
    primary: 'text-white bg-tide-aqua hover:bg-tide-aqua/90',
    secondary: 'text-ink-navy bg-white border border-ink-border hover:bg-ink-mist',
    link: 'text-tide-blue hover:text-tide-cyan',
    featured: 'text-ink-deep bg-gild hover:bg-gild-soft',
  },
} as const;

export const darkModeTokens = {
  text: {
    critical: 'text-ink-mist',
    regular: 'text-ink-border',
  },
  surface: {
    base: 'bg-ink-deep',
    elevated: 'bg-[#0d202b]',
  },
} as const;
