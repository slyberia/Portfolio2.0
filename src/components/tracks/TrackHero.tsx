import React from 'react';

interface TrackHeroProps {
  eyebrow: string;
  title: string;
  headline: string;
  subcopy: string;
  chips: string[];
}

const TrackHero: React.FC<TrackHeroProps> = ({ eyebrow, title, headline, subcopy, chips }) => {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-60"
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest">
          {eyebrow}
        </div>
        <h1 className="text-4xl md:text-5xl font-outfit font-extrabold text-navy-900 dark:text-white leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium leading-snug max-w-3xl">
          {headline}
        </p>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
          {subcopy}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackHero;
