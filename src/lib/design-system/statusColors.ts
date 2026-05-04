export const STATUS_COLORS = {
  info: {
    label: 'Info',
    textClass: 'text-tide-blue',
    bgClass: 'bg-tide-blue/10',
    borderClass: 'border-tide-blue/30',
  },
  success: {
    label: 'Success',
    textClass: 'text-tide-aqua',
    bgClass: 'bg-tide-aqua/10',
    borderClass: 'border-tide-aqua/30',
  },
  warning: {
    label: 'Warning',
    textClass: 'text-amber-700',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
  },
  danger: {
    label: 'Danger',
    textClass: 'text-red-700',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
  },
  neutral: {
    label: 'Neutral',
    textClass: 'text-ink-slate',
    bgClass: 'bg-ink-panel',
    borderClass: 'border-ink-border',
  },
  featured: {
    label: 'Featured',
    textClass: 'text-gild-deep',
    bgClass: 'bg-gild/15',
    borderClass: 'border-gild/40',
  },
} as const;
