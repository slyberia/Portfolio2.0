import React from 'react';
import { Link } from 'react-router-dom';

interface FlagshipSystemSectionProps {
  guynodeHref: string;
}

import {
  getRoleAccentRecipe,
  componentRecipes,
  getProjectAccentRecipe,
} from '../../lib/design-system';
const roleToLane = {
  'Technical Implementation Specialist': 'Implementation',
  'Quality Assurance Analyst': 'QA',
  'GIS Analyst': 'GIS',
} as const;

type RoleTrack = keyof typeof roleToLane;

const PROOF_ARTIFACTS: Array<{ title: string; description: string; roles: RoleTrack[] }> = [
  {
    title: 'Dataset Registry',
    description:
      'Structured dataset records with titles, categories, tags, formats, download paths, and viewer metadata.',
    roles: ['GIS Analyst', 'Technical Implementation Specialist'],
  },
  {
    title: 'Map Viewer',
    description:
      'Interactive GIS viewing layer for previewing spatial data and making the catalog more usable.',
    roles: ['GIS Analyst', 'Technical Implementation Specialist'],
  },
  {
    title: 'Metadata Schema',
    description:
      'Standardized fields for dataset descriptions, formats, provenance, tags, and viewer behavior.',
    roles: ['GIS Analyst', 'Quality Assurance Analyst'],
  },
  {
    title: 'Migration Workflow',
    description:
      'Process for converting legacy file-hosted content into a structured, searchable data platform.',
    roles: ['Technical Implementation Specialist', 'GIS Analyst'],
  },
  {
    title: 'Launch Readiness',
    description:
      'Readiness checks for content accuracy, navigation clarity, broken links, deployment readiness, and reviewer trust.',
    roles: ['Quality Assurance Analyst', 'Technical Implementation Specialist'],
  },
  {
    title: 'AI-Assisted Build Governance',
    description:
      'Use of structured prompts, implementation protocols, audits, and human review to guide AI-assisted development.',
    roles: ['Technical Implementation Specialist', 'Quality Assurance Analyst'],
  },
];

const FlagshipSystemSection: React.FC<FlagshipSystemSectionProps> = ({ guynodeHref }) => {
  return (
    <section
      aria-labelledby="flagship-system-heading"
      className="relative border-b border-[#d8e8ee] dark:border-white/5 bg-[#f8fbfd] dark:bg-slate-950/70"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,32,48,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(30,32,48,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-16 lg:py-20 grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10">
        <div
          className="xl:col-span-5 space-y-6 animate-fade-in-up"
          style={{ animationDelay: '50ms' }}
        >
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              FLAGSHIP_SYSTEM
            </p>
            <p className="text-sm font-semibold text-ink-navy dark:text-white">Flagship System</p>
            <h2
              id="flagship-system-heading"
              className="text-3xl md:text-4xl font-outfit font-semibold text-ink-navy dark:text-white"
            >
              Guynode Spatial Data Hub
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Modernizing a legacy geospatial data site into a public-facing spatial data platform
              for organizing, previewing, and documenting spatial datasets for Guyana.
            </p>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Guynode anchors the portfolio because it combines technical implementation, GIS
              systems thinking, dataset governance, documentation, and launch-readiness work in one
              tangible build.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(roleToLane) as Array<keyof typeof roleToLane>).map((role) => {
              const accent = getRoleAccentRecipe(roleToLane[role]);
              return (
                <span
                  key={role}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md border ${accent.chipClass}`}
                >
                  {role}
                </span>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={guynodeHref}
                aria-label="View Guynode system proof details"
                className={`inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${componentRecipes.button.secondary} ${getProjectAccentRecipe('gold').borderClass}`}
              >
                View Guynode Case Study
                <span aria-hidden="true">→</span>
              </Link>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                EVIDENCE_SOURCE: GUYNODE_SYSTEM
              </p>
            </div>

            <div className="pt-2 border-t border-[#d8e8ee] dark:border-white/5 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Direct External Access
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://guynode.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3.5 py-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-[#0d9488] hover:bg-[#0f766e] text-white shadow-sm"
                >
                  Live Production Site
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://guynode-spatial-data-hub-786228485832.us-central1.run.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3.5 py-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 shadow-sm"
                >
                  Redesigned Mockup Hub
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-7 space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Proof Artifacts
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROOF_ARTIFACTS.map((artifact, index) => (
              <article
                key={artifact.title}
                className="flagship-sheen-card animate-fade-in-up rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-white/95 dark:bg-slate-900/70 p-4 md:p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                style={{ animationDelay: `${index * 80 + 100}ms` }}
              >
                <h3 className="text-base font-semibold text-ink-navy dark:text-white">
                  {artifact.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {artifact.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {artifact.roles.map((role) => (
                    <span
                      key={`${artifact.title}-${role}`}
                      className={`text-[11px] px-2 py-0.5 rounded-md border ${getRoleAccentRecipe(roleToLane[role]).chipClass}`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlagshipSystemSection;
