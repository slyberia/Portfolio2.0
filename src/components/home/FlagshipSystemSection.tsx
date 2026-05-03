import React from 'react';
import { Link } from 'react-router-dom';

type RoleTrack =
  | 'Technical Implementation Specialist'
  | 'Quality Assurance Analyst'
  | 'GIS Analyst';

interface FlagshipSystemSectionProps {
  guynodeHref: string;
}

const ROLE_CHIP_STYLES: Record<RoleTrack, string> = {
  'Technical Implementation Specialist':
    'border-tide-aqua/30 bg-tide-aqua/10 text-[#237f86] dark:border-tide-aqua/30 dark:bg-tide-aqua/10 dark:text-tide-aqua/30',
  'Quality Assurance Analyst':
    'border-blue-200 bg-tide-blue/10 text-blue-800 dark:border-tide-blue/30 dark:bg-tide-blue/10 dark:text-blue-200',
  'GIS Analyst':
    'border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-200',
};

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
        <div className="xl:col-span-5 space-y-6">
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              FLAGSHIP_SYSTEM
            </p>
            <p className="text-sm font-semibold text-navy-900 dark:text-white">Flagship System</p>
            <h2
              id="flagship-system-heading"
              className="text-3xl md:text-4xl font-outfit font-semibold text-navy-900 dark:text-white"
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
            {(Object.keys(ROLE_CHIP_STYLES) as RoleTrack[]).map((role) => (
              <span
                key={role}
                className={`text-xs font-medium px-2.5 py-1 rounded-md border ${ROLE_CHIP_STYLES[role]}`}
              >
                {role}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={guynodeHref}
              aria-label="View Guynode system proof details"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 dark:text-white border border-[#d8e8ee] dark:border-white/10 bg-white/95 dark:bg-slate-900/80 rounded-lg px-4 py-2.5 hover:border-tide-aqua/40 hover:shadow-[0_8px_20px_rgba(79,70,229,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua transition-all"
            >
              View Guynode System
              <span aria-hidden="true">↗</span>
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              EVIDENCE_SOURCE: GUYNODE_SYSTEM
            </p>
          </div>
        </div>

        <div className="xl:col-span-7 space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Proof Artifacts
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROOF_ARTIFACTS.map((artifact) => (
              <article
                key={artifact.title}
                className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-white/95 dark:bg-slate-900/70 p-4 md:p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
              >
                <h3 className="text-base font-semibold text-navy-900 dark:text-white">
                  {artifact.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {artifact.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {artifact.roles.map((role) => (
                    <span
                      key={`${artifact.title}-${role}`}
                      className={`text-[11px] px-2 py-0.5 rounded-md border ${ROLE_CHIP_STYLES[role]}`}
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
