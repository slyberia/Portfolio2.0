import React from 'react';

export interface SegmentedTab<T extends string> {
  id: T;
  label: string;
}

interface SegmentedTabsProps<T extends string> {
  tabs: SegmentedTab<T>[];
  activeId: T;
  onChange: (id: T) => void;
  ariaLabel: string;
  /** Prefix for tab/panel element ids, e.g. "tab" produces id="tab-overview". */
  idPrefix?: string;
  /** Set when panels exist with ids `panel-<tabId>` so aria-controls stays valid. */
  hasPanels?: boolean;
}

// Literal "tab" control: a solid bordered track with a filled active segment, so the
// switch affordance is obvious at a glance (vs. the old thin-underline strip). Solid
// fills and 1px borders only — no glassmorphism per design principles.
function SegmentedTabs<T extends string>({
  tabs,
  activeId,
  onChange,
  ariaLabel,
  idPrefix = 'tab',
  hasPanels = false,
}: SegmentedTabsProps<T>) {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }
    e.preventDefault();
    const nextTab = tabs[nextIndex].id;
    onChange(nextTab);
    document.getElementById(`${idPrefix}-${nextTab}`)?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="inline-flex min-w-max gap-1 rounded-xl border border-slate-300 bg-slate-100 p-1 dark:border-white/15 dark:bg-slate-900"
      >
        {tabs.map((tab, idx) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              id={`${idPrefix}-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={hasPanels ? `panel-${tab.id}` : undefined}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua ${
                isActive
                  ? 'border border-slate-300 bg-white text-slate-900 shadow-sm dark:border-white/20 dark:bg-white/10 dark:text-white'
                  : 'border border-transparent text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SegmentedTabs;
