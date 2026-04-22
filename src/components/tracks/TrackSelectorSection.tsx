import React from 'react';
import { Link } from 'react-router-dom';
import { TrackSelectorCard } from '../../data/trackContent';

interface TrackSelectorSectionProps {
  tracks: TrackSelectorCard[];
}

const TrackSelectorSection: React.FC<TrackSelectorSectionProps> = ({ tracks }) => {
  return (
    <section className="py-12 px-6 bg-slate-50/50 dark:bg-slate-900/20 border-y border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
            Pick a lane
          </p>
          <h2 className="text-lg font-outfit font-bold text-navy-900 dark:text-white">
            Which track fits your role?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((track) => (
            <Link
              key={track.href}
              to={track.href}
              className="glass-card rounded-2xl p-6 flex flex-col gap-3 group transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-navy-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {track.title}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0"
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
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {track.subcopy}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackSelectorSection;
