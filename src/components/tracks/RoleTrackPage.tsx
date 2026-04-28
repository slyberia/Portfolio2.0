import React from 'react';
import { Link } from 'react-router-dom';
import { GUYNODE_SYSTEM_HREF } from '../../lib/routes';
import { TrackPageContent } from '../../data/trackContent';

interface RoleTrackPageProps {
  content: TrackPageContent;
}

const ACCENT_STYLES = {
  implementation: {
    glow: 'bg-orange-500/10',
    badge:
      'bg-orange-50 border-orange-300 text-orange-800 dark:bg-orange-500/10 dark:border-orange-500/30 dark:text-orange-200',
    section: 'text-orange-700 dark:text-orange-300',
    chip: 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-500/10 dark:border-orange-500/30 dark:text-orange-200',
    cta: 'bg-orange-600 hover:bg-orange-700 focus-visible:ring-orange-500',
    ctaOutline:
      'border-orange-300 text-orange-800 hover:bg-orange-50 dark:border-orange-500/30 dark:text-orange-200 dark:hover:bg-orange-500/10 focus-visible:ring-orange-500',
  },
  qa: {
    glow: 'bg-blue-500/10',
    badge:
      'bg-blue-50 border-blue-300 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-200',
    section: 'text-blue-700 dark:text-blue-300',
    chip: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-200',
    cta: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500',
    ctaOutline:
      'border-blue-300 text-blue-800 hover:bg-blue-50 dark:border-blue-500/30 dark:text-blue-200 dark:hover:bg-blue-500/10 focus-visible:ring-blue-500',
  },
  gis: {
    glow: 'bg-teal-500/10',
    badge:
      'bg-teal-50 border-teal-300 text-teal-800 dark:bg-teal-500/10 dark:border-teal-500/30 dark:text-teal-200',
    section: 'text-teal-700 dark:text-teal-300',
    chip: 'bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-500/10 dark:border-teal-500/30 dark:text-teal-200',
    cta: 'bg-teal-600 hover:bg-teal-700 focus-visible:ring-teal-500',
    ctaOutline:
      'border-teal-300 text-teal-800 hover:bg-teal-50 dark:border-teal-500/30 dark:text-teal-200 dark:hover:bg-teal-500/10 focus-visible:ring-teal-500',
  },
} as const;

const RoleTrackPage: React.FC<RoleTrackPageProps> = ({ content }) => {
  const accent = ACCENT_STYLES[content.accent];

  const actions = content.ctaActions.map((action) => {
    const normalizedLabel = action.label.toLowerCase();

    return {
      ...action,
      href: normalizedLabel.includes('guynode') && !action.href ? GUYNODE_SYSTEM_HREF : action.href,
      isContact: normalizedLabel.includes('contact'),
    };
  });

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[620px] h-[620px] ${accent.glow} blur-[130px] rounded-full pointer-events-none opacity-60`}
          aria-hidden="true"
        />
        <div className="max-w-5xl mx-auto space-y-6">
          <p
            className={`inline-flex items-center text-xs uppercase tracking-[0.25em] font-semibold border px-3 py-1.5 rounded-full ${accent.badge}`}
          >
            {content.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-navy-900 dark:text-white leading-tight">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-snug max-w-4xl">
            {content.headline}
          </p>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {content.summary}
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto glass-card rounded-2xl p-8">
          <h2 className={`text-xs font-bold uppercase tracking-[0.3em] ${accent.section}`}>
            What This Track Proves
          </h2>
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.proves.map((item) => (
              <li
                key={item}
                className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-black/5 dark:border-white/10 rounded-lg px-3 py-2 bg-white/80 dark:bg-slate-900/40"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-12 bg-slate-50/60 dark:bg-slate-900/20 border-y border-black/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto rounded-2xl border border-black/5 dark:border-white/10 bg-white/90 dark:bg-slate-900/60 p-8">
          <p className={`text-xs font-bold uppercase tracking-[0.3em] ${accent.section}`}>
            {content.guynodeLabel}
          </p>
          <h2 className="mt-3 text-2xl font-outfit font-semibold text-navy-900 dark:text-white">
            {content.guynodeTitle}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
            {content.guynodeSummary}
          </p>
          <ul className="mt-5 space-y-2">
            {content.guynodeBullets.map((bullet) => (
              <li
                key={bullet}
                className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
              >
                <span
                  aria-hidden="true"
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full ${content.accent === 'implementation' ? 'bg-orange-500' : content.accent === 'qa' ? 'bg-blue-500' : 'bg-teal-500'}`}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link
            to={GUYNODE_SYSTEM_HREF}
            aria-label={`View Guynode system for ${content.title} track`}
            className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 ${accent.ctaOutline}`}
          >
            View Guynode System
          </Link>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-5">
          <h2 className={`text-xs font-bold uppercase tracking-[0.3em] ${accent.section}`}>
            Supporting Evidence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.supportingEvidence.map((item) => {
              const card = (
                <article className="h-full rounded-xl border border-[#ddd7cd] dark:border-white/10 bg-white/95 dark:bg-slate-900/70 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-navy-900 dark:text-white">
                      {item.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-[#d7d1c8] dark:border-white/10 rounded-full px-2 py-0.5">
                      {item.proofType}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.relevance}
                  </p>
                  {item.roleChips && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.roleChips.map((chip) => (
                        <span
                          key={`${item.title}-${chip}`}
                          className={`text-[11px] px-2 py-0.5 rounded-md border ${accent.chip}`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              );

              const evidenceHref = item.href;
              if (!evidenceHref) return <div key={item.title}>{card}</div>;
              return (
                <Link
                  key={item.title}
                  to={evidenceHref}
                  aria-label={`View supporting evidence for ${item.title}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl"
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-slate-50/60 dark:bg-slate-900/20 border-y border-black/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto space-y-5">
          <h2 className={`text-xs font-bold uppercase tracking-[0.3em] ${accent.section}`}>
            Skills &amp; Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {content.skillsTools.map((skill) => (
              <span
                key={skill}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border ${accent.chip}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 pb-24">
        <div className="max-w-5xl mx-auto glass-card rounded-2xl p-8">
          <h2 className={`text-xs font-bold uppercase tracking-[0.3em] ${accent.section}`}>
            {content.ctaTitle}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{content.ctaCopy}</p>
          {/* TODO: replace generic resume download target with track-specific resume assets when files exist. */}
          <div className="mt-6 flex flex-wrap gap-3">
            {actions.map((action, index) => {
              if (action.isContact) {
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                    aria-label={`${action.label} for ${content.title}`}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 border ${accent.ctaOutline}`}
                  >
                    {action.label}
                  </button>
                );
              }

              if (!action.href) return null;

              return (
                <Link
                  key={action.label}
                  to={action.href}
                  aria-label={`${action.label} for ${content.title}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 ${
                    index === 0 ? `text-white ${accent.cta}` : `border ${accent.ctaOutline}`
                  }`}
                >
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoleTrackPage;
