export const interactionStyles = {
  focusVisible:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tide-sky/60',
  hover: 'transition-colors duration-200',
  active: 'data-[active=true]:bg-tide-aqua/15 data-[active=true]:text-tide-aqua',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  loading: 'animate-pulse pointer-events-none opacity-75',
  emptyState:
    'text-ink-slate dark:text-ink-border border border-dashed border-ink-border rounded-xl p-6',
} as const;
