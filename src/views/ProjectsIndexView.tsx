import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_PROCESS_HREF, SITE_INDEX_HREF } from '../lib/routes';
import {
  PROJECT_FILTERS,
  ProjectFilter,
  ProjectRoleLane,
  getFeaturedProjects,
  getSupportingProjects,
} from '../data/projectMetadata';

const roleLabel: Record<ProjectRoleLane, string> = {
  Implementation: 'Technical Implementation Specialist',
  QA: 'Quality Assurance Analyst',
  GIS: 'GIS Analyst',
};

const roleStyles: Record<ProjectRoleLane, string> = {
  Implementation: 'border-orange-200 bg-orange-50 text-orange-800',
  QA: 'border-blue-200 bg-blue-50 text-blue-800',
  GIS: 'border-teal-200 bg-teal-50 text-teal-800',
};

const ProjectsIndexView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectFilter>('All');

  const featured = useMemo(() => getFeaturedProjects(), []);
  const supporting = useMemo(() => getSupportingProjects(), []);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return supporting;
    return supporting.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter, supporting]);

  return (
    <div className="min-h-screen pt-20 pb-20 px-6 bg-[#f8f7f3] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
            PROJECT_LIBRARY
          </p>
          <h1 className="text-4xl md:text-5xl font-outfit font-semibold text-navy-900 dark:text-white">
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
            className="text-2xl font-outfit font-bold text-navy-900 dark:text-white"
          >
            Featured Systems
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featured.map((project) => (
              <Link
                key={project.id}
                to={project.href}
                className="rounded-xl border border-[#d9d1c6] bg-white dark:bg-slate-900 p-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <div
                  className={`h-1 w-20 rounded ${project.accent === 'teal' ? 'bg-teal-500' : 'bg-orange-500'}`}
                  aria-hidden="true"
                />
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {project.featuredLabel}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-navy-900 dark:text-white">
                  {project.displayTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {project.shortSummary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.roleLanes.map((role) => (
                    <span
                      key={role}
                      className={`text-[11px] px-2 py-0.5 rounded border ${roleStyles[role]}`}
                    >
                      {roleLabel[role]}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-block text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                  View Project →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="supporting-projects" className="space-y-4">
          <h2
            id="supporting-projects"
            className="text-2xl font-outfit font-bold text-navy-900 dark:text-white"
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
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${isActive ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'border-[#d7d1c8] bg-white text-slate-600'}`}
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
                className="rounded-xl border border-[#ddd7cd] bg-white dark:bg-slate-900 p-5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">
                    {project.statusLabel}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 border border-[#d7d1c8] rounded-full px-2 py-0.5">
                    {project.proofType}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-navy-900 dark:text-white">
                  {project.displayTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {project.shortSummary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.roleLanes.map((role) => (
                    <span
                      key={role}
                      className={`text-[11px] px-2 py-0.5 rounded border ${roleStyles[role]}`}
                    >
                      {roleLabel[role]}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-block text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                  View Project →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#ddd7cd] bg-white dark:bg-slate-900 p-5">
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">
            Want the build methodology?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Projects show what was built. Process shows how the portfolio was planned, governed,
            hardened, and validated.
          </p>
          <a
            href={PORTFOLIO_PROCESS_HREF}
            className="mt-4 inline-flex text-sm font-semibold text-indigo-700"
          >
            View Process Deep Dives
          </a>
          <p className="mt-4 text-sm text-slate-500">
            Need the full map?{' '}
            <Link to={SITE_INDEX_HREF} className="font-semibold text-indigo-700">
              Open Site Index
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProjectsIndexView;
