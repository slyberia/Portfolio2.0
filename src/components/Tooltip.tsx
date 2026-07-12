import React, { useId, useState } from 'react';

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  /**
   * Set false when the wrapped child is already focusable (button, link) so the
   * wrapper doesn't add a duplicate tab stop; focus events bubble up regardless.
   */
  focusable?: boolean;
  className?: string;
}

// Minimal hover/focus tooltip: solid fill, 1px border, no delay machinery. Kept
// deliberately terse so it can wrap badges and chips without disturbing layout —
// the trigger stays inline and the bubble is absolutely positioned above it.
const Tooltip: React.FC<TooltipProps> = ({ label, children, focusable = true, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  return (
    <span
      className={`relative inline-flex ${className}`}
      tabIndex={focusable ? 0 : undefined}
      aria-describedby={tooltipId}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setVisible(false);
      }}
    >
      {children}
      <span
        id={tooltipId}
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 w-max max-w-[240px] -translate-x-1/2 rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1.5 text-center text-[11px] font-medium normal-case leading-snug tracking-normal text-white shadow-lg transition-opacity duration-150 dark:border-white/15 dark:bg-slate-800 dark:text-slate-100 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {label}
      </span>
    </span>
  );
};

export default Tooltip;
