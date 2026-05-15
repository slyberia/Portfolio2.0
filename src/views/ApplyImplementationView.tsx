import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecruiterMode } from '../context/RecruiterModeContext';
import { implementationTrackContent } from '../data/trackContent';
import { getMediaByIds } from '../data/mediaRegistry';
import MediaProofGrid from '../components/media/MediaProofGrid';
import { componentRecipes, getRoleAccentRecipe } from '../lib/design-system';

const ApplyImplementationView: React.FC = () => {
  const { setRecruiterMode } = useRecruiterMode();
  const accent = getRoleAccentRecipe('Implementation');

  // Ensure recruiter mode is active when hitting this start path
  useEffect(() => {
    setRecruiterMode(true);
  }, [setRecruiterMode]);

  // Specific visual assets from bundle schema spec
  const visualAssets = getMediaByIds([
    'portfolio-v2-impl-overview-desktop-v1',
    'codex-technical-tide-codex-detail-desktop-v1',
  ]);

  // Specific evidence from bundle schema spec
  const curatedEvidenceTitles = [
    'Guynode Spatial Data Hub',
    'Systems at Scale: Triage & QA',
    'Project Aegis Protocol',
    'Luxe Lofts Ecosystem',
  ];

  const curatedEvidence = implementationTrackContent.supportingEvidence.filter((e) =>
    curatedEvidenceTitles.includes(e.title),
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col gap-12 animate-in fade-in duration-500">
      <header className="space-y-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-outfit font-extrabold text-navy-900 dark:text-white">
          Implementation & CSE Profile
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Bridging the gap between ambiguous requirements and production-ready workflows.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className={componentRecipes.typography.sectionHeading + ' ' + accent.textClass}>
          Visual Proof
        </h2>
        <MediaProofGrid assets={visualAssets} />
      </section>

      <section className="space-y-6">
        <h2 className={componentRecipes.typography.sectionHeading + ' ' + accent.textClass}>
          Curated Evidence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {curatedEvidence.map((item) => {
            const card = (
              <article className="h-full rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-white/95 dark:bg-slate-900/70 p-5 shadow-sm hover:shadow-md transition-shadow">
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
                        className={`text-[11px] px-2 py-0.5 rounded-md border ${accent.chipClass}`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );

            if (!item.href) return <div key={item.title}>{card}</div>;

            return (
              <Link
                key={item.title}
                to={item.href}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua rounded-xl"
              >
                {card}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="pt-8 border-t border-slate-200 dark:border-white/10">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-navy-900 dark:text-white">
              Ready to dive deeper?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Explore the full Implementation track or talk to the digital twin.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('open-digital-twin', {
                    detail: {
                      source: 'implementation',
                      modeLabel: 'Implementation Track',
                      starterPrompt:
                        'Help this visitor evaluate Kyle for an Implementation / CSE-lite role.',
                    },
                  }),
                )
              }
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors border ${accent.chipClass}`}
            >
              Ask Digital Twin
            </button>
            <Link to="/tracks/implementation" className={componentRecipes.button.primary}>
              Full Track Overview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyImplementationView;
