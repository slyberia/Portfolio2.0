export const proseTheme = {
  container: 'prose prose-lg dark:prose-invert max-w-none prose-portfolio',
  headings: 'font-outfit font-bold text-ink-navy dark:text-ink-mist',
  paragraph: 'text-ink-slate dark:text-ink-border',
  link: 'text-tide-blue dark:text-tide-sky hover:underline underline-offset-4 decoration-tide-blue/40 transition-colors font-medium',
  strong: 'text-ink-deep dark:text-ink-mist',
  inlineCode: 'text-ink-navy dark:text-ink-mist bg-ink-panel dark:bg-ink-deep px-1 rounded',
  codeBlock:
    'rounded-2xl overflow-x-auto bg-slate-50 dark:bg-slate-950/85 p-5 pt-12 border border-slate-200 dark:border-tide-cyan/40 text-slate-900 dark:text-ink-border font-mono text-sm leading-relaxed',
  blockquote:
    'not-italic rounded-xl bg-tide-softBlue/20 dark:bg-tide-cyan/15 px-6 py-4 text-ink-slate dark:text-ink-border border-0 my-8',
  list: 'text-ink-slate dark:text-ink-border',
} as const;
