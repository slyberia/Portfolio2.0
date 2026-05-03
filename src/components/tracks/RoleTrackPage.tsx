import React from 'react';
import { Link } from 'react-router-dom';
import { GUYNODE_SYSTEM_HREF } from '../../lib/routes';
import { TrackPageContent } from '../../data/trackContent';

interface RoleTrackPageProps {
  content: TrackPageContent;
}

const ACCENT_STYLES = {
  implementation: {
    glow: 'bg-tide-aqua/10',
    badge:
      'bg-tide-aqua/10 border-tide-aqua/40 text-[#237f86] dark:bg-tide-aqua/10 dark:border-tide-aqua/30 dark:text-tide-aqua/30',
    section: 'text-[#237f86] dark:text-tide-aqua/40',
    chip: 'bg-tide-aqua/10 border-tide-aqua/30 text-[#237f86] dark:bg-tide-aqua/10 dark:border-tide-aqua/30 dark:text-tide-aqua/30',
    cta: 'bg-tide-aqua hover:bg-[#237f86] focus-visible:ring-tide-aqua',
    ctaOutline:
      'border-tide-aqua/40 text-[#237f86] hover:bg-tide-aqua/10 dark:border-tide-aqua/30 dark:text-tide-aqua/30 dark:hover:bg-tide-aqua/10 focus-visible:ring-tide-aqua',
  },
  qa: {
    glow: 'bg-tide-blue/10',
    badge:
      'bg-tide-blue/10 border-tide-softBlue text-blue-800 dark:bg-tide-blue/10 dark:border-tide-blue/30 dark:text-blue-200',
    section: 'text-[#2a77a8] dark:text-tide-softBlue',
    chip: 'bg-tide-blue/10 border-blue-200 text-blue-800 dark:bg-tide-blue/10 dark:border-tide-blue/30 dark:text-blue-200',
    cta: 'bg-tide-blue hover:bg-[#2a77a8] focus-visible:ring-tide-blue',
    ctaOutline:
      'border-tide-softBlue text-blue-800 hover:bg-tide-blue/10 dark:border-tide-blue/30 dark:text-blue-200 dark:hover:bg-tide-blue/10 focus-visible:ring-tide-blue',
  },
  gis: {
    glow: 'bg-cyan-500/10',
    badge:
      'bg-cyan-50 border-cyan-300 text-cyan-800 dark:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-200',
    section: 'text-cyan-700 dark:text-cyan-300',
    chip: 'bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-200',
    cta: 'bg-cyan-600 hover:bg-cyan-700 focus-visible:ring-cyan-500',
    ctaOutline:
      'border-cyan-300 text-cyan-800 hover:bg-cyan-50 dark:border-cyan-500/30 dark:text-cyan-200 dark:hover:bg-cyan-500/10 focus-visible:ring-cyan-500',
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
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full ${content.accent === 'implementation' ? 'bg-tide-aqua' : content.accent === 'qa' ? 'bg-tide-blue' : 'bg-cyan-500'}`}
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
                <article className="h-full rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-white/95 dark:bg-slate-900/70 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-navy-900 dark:text-white">
                      {item.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-[#d8e8ee] dark:border-white/10 rounded-full px-2 py-0.5">
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
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua rounded-xl"
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

              if (action.twinSource) {
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent('open-digital-twin', {
                          detail: {
                            source: action.twinSource,
                            modeLabel:
                              action.twinSource === 'implementation'
                                ? 'Implementation Track'
                                : action.twinSource === 'qa'
                                  ? 'QA Track'
                                  : action.twinSource === 'gis'
                                    ? 'GIS Track'
                                    : 'General Recruiter Mode',
                            starterPrompt: action.twinStarterPrompt,
                          },
                        }),
                      )
                    }
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
