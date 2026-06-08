import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DEEP_DIVES_HREF } from '../../lib/routes';
import {
  CANONICAL_ROLE_ACCENT,
  ProjectFilter,
  PROJECT_FILTERS,
  getFeaturedProjects,
  getSupportingProjects,
} from '../../data/projectMetadata';
import { getRoleAccentRecipe, getProjectAccentRecipe } from '../../lib/design-system';
import ProjectValueLayer from '../ProjectValueLayer';

type FilterKey = 'All' | ProjectFilter;

const SupportingEvidenceSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');
  const featured = useMemo(() => getFeaturedProjects(), []);
  const supporting = useMemo(() => getSupportingProjects(), []);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return [...featured, ...supporting];
    return [...featured, ...supporting].filter((item) => item.filters.includes(activeFilter));
  }, [activeFilter, featured, supporting]);

  const handleAskAI = (e: React.MouseEvent, item: (typeof featured)[0]) => {
    e.preventDefault();
    e.stopPropagation();

    let source = 'general';
    if (item.canonicalRoleLanes.includes('Spatial Systems Architect')) source = 'gis';
    else if (item.canonicalRoleLanes.includes('Implementation Consultant')) source = 'qa';
    else if (
      item.canonicalRoleLanes.includes('Forward Deployed Engineer') ||
      item.canonicalRoleLanes.includes('AI Workflow / Portfolio Governance')
    ) {
      source = 'implementation';
    }

    const prompt = `I see you are reviewing **${item.displayTitle}**. I can summarize its business value for you, or break down the technical implementation. What would you like to know?`;

    window.dispatchEvent(
      new CustomEvent('open-digital-twin', {
        detail: {
          source,
          starterPrompt: prompt,
          modeLabel: 'Project Library',
          suggestions: ['Explain the technical implementation', 'What was the business impact?'],
        },
      }),
    );
  };

  return (
    <section className="border-b border-[#d8e8ee] dark:border-white/5 bg-[#f5f9fb]/70 dark:bg-slate-950/60 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4 max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            PROJECT_LIBRARY
          </p>
          <h2 className="text-3xl md:text-4xl font-outfit font-semibold text-ink-navy dark:text-white">
            Projects
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Scannable project proof across implementation, QA, GIS, AI systems, and workflow design.
          </p>
        </div>

        <a
          href={DEEP_DIVES_HREF}
          className="inline-flex text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-[#237f86] dark:text-slate-300 dark:hover:text-tide-softBlue"
        >
          View process deep dives →
        </a>

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects by role relevance"
        >
          {PROJECT_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua ${isActive ? 'border-tide-sky bg-tide-aqua/10 text-[#237f86] dark:border-tide-sky/40 dark:bg-tide-aqua/15 dark:text-tide-softBlue' : 'border-[#d8e8ee] bg-white/90 text-slate-600 hover:border-tide-softBlue dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300'}`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className={`group/card relative rounded-xl border px-4 py-4 md:px-5 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] ${
                item.flagship
                  ? 'border-gild/40 bg-gild/5 dark:bg-gild-deep/10 shadow-[0_4px_12px_rgba(15,23,42,0.05)] hover:border-gild/80'
                  : `${getProjectAccentRecipe(item.accent).borderClass} bg-white/95 dark:bg-slate-900/70 shadow-[0_4px_12px_rgba(15,23,42,0.05)]`
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {item.featuredLabel ?? item.statusLabel}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 border border-[#d8e8ee] dark:border-white/10 rounded-full px-2 py-0.5">
                  {item.proofType}
                </span>
              </div>
              <div className="mt-3 flex justify-between items-start group">
                <h3 className="text-base font-semibold text-ink-navy dark:text-white group-hover/card:text-tide-aqua dark:group-hover/card:text-tide-softBlue transition-colors">
                  <Link
                    to={item.href}
                    className="rounded after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua group-hover/card:underline"
                  >
                    {item.displayTitle}
                  </Link>
                </h3>
                <button
                  onClick={(e) => handleAskAI(e, item)}
                  aria-label={`Ask AI about ${item.displayTitle}`}
                  className="relative z-10 text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors uppercase tracking-wider flex items-center gap-1 shrink-0 ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-1 -mr-1 py-1"
                >
                  Ask AI <span aria-hidden="true">→</span>
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.shortSummary}
              </p>
              <ProjectValueLayer project={item} />
              <div className="mt-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Role Relevance
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {item.canonicalRoleLanes.map((role) => {
                    const roleAccent = getRoleAccentRecipe(CANONICAL_ROLE_ACCENT[role]);
                    return (
                      <span
                        key={`${item.id}-${role}`}
                        className={`text-[11px] px-2 py-0.5 rounded-md border ${roleAccent.chipClass}`}
                      >
                        {role}
                      </span>
                    );
                  })}
                </div>
              </div>
              <Link
                to={item.href}
                tabIndex={-1}
                aria-hidden="true"
                className="relative z-10 mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#237f86] dark:text-tide-softBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua rounded"
              >
                View Project <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportingEvidenceSection;
