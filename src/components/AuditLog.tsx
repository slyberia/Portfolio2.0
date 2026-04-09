import React from 'react';
import { AuditLogData, AuditLogFinding } from '../types';

interface AuditLogProps {
  data: AuditLogData;
}

const StatusIcon: React.FC<{ status: AuditLogFinding['status'] }> = ({ status }) => {
  switch (status) {
    case 'critical':
      return (
        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
      );
    case 'warning':
      return (
        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
      );
    case 'stable':
    case 'optimized':
      return (
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
      );
    default:
      return <div className="w-2 h-2 rounded-full bg-slate-400" />;
  }
};

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const colors = {
    High: 'text-red-600 bg-red-500/10 border-red-500/20',
    Medium: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    Low: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
  };
  const colorClass = colors[priority as keyof typeof colors] || colors.Low;

  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${colorClass}`}
    >
      {priority}
    </span>
  );
};

const CategoryIcon: React.FC<{ icon?: string }> = ({ icon }) => {
  const icons: Record<string, React.ReactNode> = {
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
    type: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" x2="15" y1="20" y2="20" />
        <line x1="12" x2="12" y1="4" y2="20" />
      </svg>
    ),
    link: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    shield: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    activity: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    search: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    database: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s 9-1.34 9-3V5" />
      </svg>
    ),
    layout: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="3" x2="21" y1="9" y2="9" />
        <line x1="9" x2="9" y1="21" y2="9" />
      </svg>
    ),
  };
  return icons[icon || 'activity'] || icons.activity;
};

const AuditLog: React.FC<AuditLogProps> = ({ data }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 min-h-[500px] flex flex-col font-sans">
      {/* Header */}
      <div className="px-8 py-6 border-b border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-white/5">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-slate-500 mb-1">
            <span>AUDIT-LOG-{data.date.replace(/-/g, '')}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>{data.date}</span>
          </div>
          <h3 className="text-lg font-bold font-outfit text-navy-900 dark:text-white leading-tight">
            {data.title}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1 opacity-80">{data.target}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 shrink-0">
          <div
            className={`w-2 h-2 rounded-full ${data.status === 'Critical' ? 'bg-red-500 animate-pulse' : data.status === 'Warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}
          />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            {data.status} Status
          </span>
        </div>
      </div>

      {/* Findings Grid */}
      <div className="p-8 grid gap-4 md:grid-cols-2">
        {data.findings.map((finding, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 flex gap-3 transition-all hover:border-indigo-500/20"
          >
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
              <div className="scale-75">
                <CategoryIcon icon={finding.icon} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate mr-2">
                  {finding.category}
                </span>
                <StatusIcon status={finding.status} />
              </div>
              <p className="text-[13px] text-slate-700 dark:text-slate-300 leading-snug font-medium">
                {finding.observation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations / Summary */}
      <div className="mt-auto border-t border-black/5 dark:border-white/5 bg-slate-100/50 dark:bg-black/20 p-8">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Action Plan
        </h4>

        <div className="space-y-2.5">
          {data.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 text-[13px] bg-white dark:bg-white/5 p-3 rounded-lg border border-black/5 dark:border-white/5 shadow-sm"
            >
              <div className="w-16 shrink-0 text-center">
                <PriorityBadge priority={rec.priority} />
              </div>
              <div className="flex-1 font-medium text-navy-900 dark:text-white truncate">
                {rec.action}
              </div>
              <div className="hidden sm:block text-slate-400 text-[11px] px-2 border-l border-black/5 dark:border-white/10 whitespace-nowrap">
                {rec.impact}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
          <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed italic">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 not-italic mr-2">
              Lead Architect Note:
            </span>
            "{data.summary}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
