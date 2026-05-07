import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_PROCESS_HREF, SITE_INDEX_HREF } from '../lib/routes';
import {
  CANONICAL_ROLE_ACCENT,
  PROJECT_FILTERS,
  ProjectFilter,
  getFeaturedProjects,
  getSupportingProjects,
} from '../data/projectMetadata';
import { getRoleAccentRecipe } from '../lib/design-system';

const ProjectsIndexView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectFilter>('All');

  const featured = useMemo(() => getFeaturedProjects(), []);
  const supporting = useMemo(() => getSupportingProjects(), []);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return supporting;
    return supporting.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter, supporting]);

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
          <p className="text-sm text-slate-600 dark:text-slate-400">
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
                className="rounded-xl border border-[#d8e8ee] bg-white dark:bg-slate-900 p-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
              >
                <div
                  className={`h-1 w-20 rounded ${project.accent === 'cyan' ? 'bg-cyan-500' : 'bg-tide-aqua'}`}
                  aria-hidden="true"
                />
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {project.featuredLabel}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-ink-navy dark:text-white">
                  {project.displayTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {project.shortSummary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.canonicalRoleLanes.map((role) => (
                    <span
                      key={role}
                      className={`text-[11px] px-2 py-0.5 rounded border ${getRoleAccentRecipe(CANONICAL_ROLE_ACCENT[role]).chipClass}`}
                    >
                      {role}
                    </span>
                  ))}
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
                <h3 className="mt-3 text-base font-semibold text-ink-navy dark:text-white">
                  {project.displayTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {project.shortSummary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.canonicalRoleLanes.map((role) => (
                    <span
                      key={role}
                      className={`text-[11px] px-2 py-0.5 rounded border ${getRoleAccentRecipe(CANONICAL_ROLE_ACCENT[role]).chipClass}`}
                    >
                      {role}
                    </span>
                  ))}
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
            href={PORTFOLIO_PROCESS_HREF}
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
