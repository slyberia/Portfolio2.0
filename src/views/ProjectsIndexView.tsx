import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DEEP_DIVES_HREF, SITE_INDEX_HREF } from '../lib/routes';
import {
  CANONICAL_ROLE_ACCENT,
  PROJECT_FILTERS,
  ProjectFilter,
  getFeaturedProjects,
  getSupportingProjects,
} from '../data/projectMetadata';
import { getRoleAccentRecipe } from '../lib/design-system';
import ProjectValueLayer from '../components/ProjectValueLayer';

const ProjectsIndexView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectFilter>('All');

  const featured = useMemo(() => getFeaturedProjects(), []);
  const supporting = useMemo(() => getSupportingProjects(), []);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return supporting;
    return supporting.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter, supporting]);

  const handleAskAI = (
    e: React.MouseEvent,
    item: (typeof featured)[0] | (typeof supporting)[0],
  ) => {
    e.preventDefault();
    e.stopPropagation();

    let source = 'general';
    if (item.canonicalRoleLanes.includes('Spatial Systems Architect')) source = 'gis';
    else if (item.canonicalRoleLanes.includes('Solutions Architect')) source = 'qa';
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
    <div className="min-h-screen pt-20 pb-20 px-6 bg-[#f5f9fb] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
            PROJECT_LIBRARY
          </p>
          <h1 className="text-4xl md:text-5xl font-outfit font-semibold text-ink-navy dark:text-white">
            Projects
          </h1>
          <p className="text-base text-slate-700 dark:text-slate-300">
            Scannable project proof across technical implementation, QA, GIS, AI systems, and
            workflow design.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Start with Guynode and the Digital Twin for the strongest system-level proof, then use
            the project library to inspect supporting workflows, validation methods, and
            implementation decisions.
          </p>
        </header>

        <section aria-labelledby="featured-systems" className="space-y-4">
          <h2
            id="featured-systems"
            className="text-2xl font-outfit font-bold text-ink-navy dark:text-white"
          >
            Featured Systems
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featured.map((project) => (
              <Link
                key={project.id}
                to={project.href}
                className={`rounded-xl border p-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua transition-colors duration-300 ${
                  project.flagship
                    ? 'border-gild/40 bg-gild/5 dark:bg-gild-deep/10'
                    : 'border-[#d8e8ee] bg-white dark:bg-slate-900'
                }`}
              >
                <div
                  className={`h-1 w-20 rounded ${project.accent === 'cyan' ? 'bg-tide-cyan' : 'bg-tide-aqua'}`}
                  aria-hidden="true"
                />
                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {project.featuredLabel}
                  </p>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 border border-[#d8e8ee] dark:border-white/10 rounded-full px-2 py-0.5">
                    {project.proofType}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-start group">
                  <h3 className="text-xl font-semibold text-ink-navy dark:text-white group-hover:text-tide-aqua dark:group-hover:text-tide-softBlue transition-colors">
                    {project.displayTitle}
                  </h3>
                  <button
                    onClick={(e) => handleAskAI(e, project)}
                    aria-label={`Ask AI about ${project.displayTitle}`}
                    className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors uppercase tracking-wider flex items-center gap-1 shrink-0 ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-1 -mr-1 py-1"
                  >
                    Ask AI <span aria-hidden="true">→</span>
                  </button>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {project.shortSummary}
                </p>
                <ProjectValueLayer project={project} />
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Role Relevance
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {project.canonicalRoleLanes.map((role) => (
                      <span
                        key={role}
                        className={`text-[11px] px-2 py-0.5 rounded border ${getRoleAccentRecipe(CANONICAL_ROLE_ACCENT[role]).chipClass}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="mt-4 inline-block text-sm font-semibold text-[#237f86] dark:text-tide-softBlue">
                  View Project →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="supporting-projects" className="space-y-4">
          <h2
            id="supporting-projects"
            className="text-2xl font-outfit font-bold text-ink-navy dark:text-white"
          >
            Supporting Projects
          </h2>
          <div
            role="tablist"
            aria-label="Filter supporting projects"
            className="flex flex-wrap gap-2"
          >
            {PROJECT_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua ${isActive ? 'border-tide-sky bg-tide-aqua/10 text-[#237f86]' : 'border-[#d8e8ee] bg-white text-slate-600'}`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <Link
                key={project.id}
                to={project.href}
                className="rounded-xl border border-[#d8e8ee] bg-white dark:bg-slate-900 p-5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">
                    {project.statusLabel}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 border border-[#d8e8ee] rounded-full px-2 py-0.5">
                    {project.proofType}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-start group">
                  <h3 className="text-base font-semibold text-ink-navy dark:text-white group-hover:text-tide-aqua dark:group-hover:text-tide-softBlue transition-colors">
                    {project.displayTitle}
                  </h3>
                  <button
                    onClick={(e) => handleAskAI(e, project)}
                    aria-label={`Ask AI about ${project.displayTitle}`}
                    className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors uppercase tracking-wider flex items-center gap-1 shrink-0 ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-1 -mr-1 py-1"
                  >
                    Ask AI <span aria-hidden="true">→</span>
                  </button>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {project.shortSummary}
                </p>
                <ProjectValueLayer project={project} />
                <div className="mt-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Role Relevance
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.canonicalRoleLanes.map((role) => (
                      <span
                        key={role}
                        className={`text-[11px] px-2 py-0.5 rounded border ${getRoleAccentRecipe(CANONICAL_ROLE_ACCENT[role]).chipClass}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="mt-4 inline-block text-sm font-semibold text-[#237f86] dark:text-tide-softBlue">
                  View Project →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#d8e8ee] bg-white dark:bg-slate-900 p-5">
          <h2 className="text-xl font-semibold text-ink-navy dark:text-white">
            Want the build methodology?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Projects show what was built. Process shows how the portfolio was planned, governed,
            hardened, and validated.
          </p>
          <a
            href={DEEP_DIVES_HREF}
            className="mt-4 inline-flex text-sm font-semibold text-[#237f86]"
          >
            View Process Deep Dives
          </a>
          <p className="mt-4 text-sm text-slate-500">
            Need the full map?{' '}
            <Link to={SITE_INDEX_HREF} className="font-semibold text-[#237f86]">
              Open Site Index
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProjectsIndexView;
