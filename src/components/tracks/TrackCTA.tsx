import React from 'react';
import { Link } from 'react-router-dom';

interface TrackCTAProps {
  bestFitRoles: string[];
  ctaCopy: string;
  resumeHref?: string;
  deepDiveHref?: string;
}

const TrackCTA: React.FC<TrackCTAProps> = ({ bestFitRoles, ctaCopy, resumeHref, deepDiveHref }) => {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-12 space-y-8">
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
          Best fit roles
        </h3>
        <div className="flex flex-wrap gap-2">
          {bestFitRoles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-sm font-medium"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">{ctaCopy}</p>
      <div className="flex flex-wrap gap-4">
        {deepDiveHref && (
          <Link
            to={deepDiveHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-indigo-500/20 group"
          >
            Deep-dive artifacts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        )}
        {resumeHref && (
          <Link
            to={resumeHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/50 rounded-2xl font-bold hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            View resume
          </Link>
        )}
      </div>
    </div>
  );
};

export default TrackCTA;
