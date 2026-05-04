export type CategoryAccent = 'aiSystems' | 'process' | 'implementation' | 'qa' | 'gis';

export const CATEGORY_ACCENTS: Record<
  CategoryAccent,
  { id: CategoryAccent; label: string; textClass: string; bgClass: string; borderClass: string }
> = {
  aiSystems: {
    id: 'aiSystems',
    label: 'AI Systems',
    textClass: 'text-tide-aqua',
    bgClass: 'bg-tide-aqua/10',
    borderClass: 'border-tide-aqua/30',
  },
  process: {
    id: 'process',
    label: 'Process',
    textClass: 'text-ink-slate',
    bgClass: 'bg-ink-panel',
    borderClass: 'border-ink-border',
  },
  implementation: {
    id: 'implementation',
    label: 'Implementation',
    textClass: 'text-tide-aqua',
    bgClass: 'bg-tide-aqua/10',
    borderClass: 'border-tide-aqua/30',
  },
  qa: {
    id: 'qa',
    label: 'QA',
    textClass: 'text-tide-blue',
    bgClass: 'bg-tide-blue/10',
    borderClass: 'border-tide-blue/30',
  },
  gis: {
    id: 'gis',
    label: 'GIS',
    textClass: 'text-tide-cyan',
    bgClass: 'bg-tide-cyan/10',
    borderClass: 'border-tide-cyan/30',
  },
};
