import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CASE_STUDY_REGISTRY } from '../../constants';
import { PORTFOLIO_PROCESS_HREF, buildCaseStudyHref } from '../../lib/routes';

type RoleLane = 'Implementation' | 'QA' | 'GIS' | 'AI Systems';
type FilterKey = 'All' | RoleLane | 'Process';

interface EvidenceMetadata {
  relevantRoles: RoleLane[];
  proofType: 'Workflow' | 'Testing' | 'Documentation' | 'Governance';
  statusLabel: 'Supporting Proof' | 'Methodology' | 'Featured Project' | 'Flagship System';
  summary: string;
  cardTitle?: string;
}

const ROLE_CHIP_STYLES: Record<RoleLane, string> = {
  Implementation:
    'border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200',
  QA: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200',
  GIS: 'border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-200',
  'AI Systems':
    'border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200',
};

const FILTER_ORDER: FilterKey[] = ['All', 'Implementation', 'QA', 'GIS', 'AI Systems', 'Process'];

const EVIDENCE_METADATA_BY_ID: Record<string, EvidenceMetadata> = {
  'digital-twin': {
    cardTitle: 'Digital Twin AI Agent · AI Implementation System',
    summary:
      'Portfolio-bound AI assistant with scope controls, route/action commands, cost guardrails, failure planning, and human handoff.',
    relevantRoles: ['Implementation', 'QA', 'AI Systems'],
    proofType: 'Governance',
    statusLabel: 'Featured Project',
  },
  'project-aegis': {
    cardTitle: 'Project Aegis Protocol · Role-Lane Governance',
    summary:
      'Governance framework used to enforce role-specific information architecture, implementation rigor, and review discipline.',
    relevantRoles: ['Implementation', 'QA'],
    proofType: 'Governance',
    statusLabel: 'Supporting Proof',
  },
  'ops-triage': {
    cardTitle: 'Systems at Scale: Triage & QA · Operational Workflow',
    summary:
      'Operational triage system with escalation logic, throughput controls, and QA documentation loops under production pressure.',
    relevantRoles: ['Implementation', 'QA', 'GIS'],
    proofType: 'Workflow',
    statusLabel: 'Flagship System',
  },
  'nba-systems-qa': {
    summary:
      'Controlled testing artifact for variable isolation, reproducible analysis, and QA decision logic in probabilistic systems.',
    relevantRoles: ['QA'],
    proofType: 'Testing',
    statusLabel: 'Methodology',
  },
  'luxe-lofts': {
    summary:
      'Proposal-phase workflow artifact mapping business process constraints into modular implementation planning.',
    relevantRoles: ['Implementation'],
    proofType: 'Workflow',
    statusLabel: 'Supporting Proof',
  },
  'prompter-hub': {
    cardTitle: 'Prompter Hub V9 · AI Governance Evidence Architecture',
    summary:
      'Structured AI-assisted build and documentation workflow showing repeatable quality controls and governance standards.',
    relevantRoles: ['Implementation', 'QA'],
    proofType: 'Documentation',
    statusLabel: 'Methodology',
  },
};

const SupportingEvidenceSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');

  const evidenceItems = useMemo(
    () =>
      CASE_STUDY_REGISTRY.filter((study) => EVIDENCE_METADATA_BY_ID[study.id]).map((study) => {
        const metadata = EVIDENCE_METADATA_BY_ID[study.id];
        return {
          studyId: study.id,
          title: metadata.cardTitle ?? study.title,
          summary: metadata.summary,
          relevantRoles: metadata.relevantRoles,
          proofType: metadata.proofType,
          statusLabel: metadata.statusLabel,
        };
      }),
    [],
  );

  const prioritizedItems = useMemo(() => {
    const priorityById: Record<string, number> = { 'digital-twin': 0, 'ops-triage': 1 };
    return [...evidenceItems].sort(
      (a, b) => (priorityById[a.studyId] ?? 99) - (priorityById[b.studyId] ?? 99),
    );
  }, [evidenceItems]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return prioritizedItems;
    if (activeFilter === 'Process')
      return prioritizedItems.filter((item) => item.statusLabel === 'Methodology');
    return prioritizedItems.filter((item) => item.relevantRoles.includes(activeFilter));
  }, [activeFilter, prioritizedItems]);

  return (
    <section className="border-b border-[#e4dfd7] dark:border-white/5 bg-[#f9f6f1] dark:bg-slate-950/60 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4 max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            PROJECT_LIBRARY
          </p>
          <h2 className="text-3xl md:text-4xl font-outfit font-semibold text-navy-900 dark:text-white">
            Projects
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Scannable project proof across implementation, QA, GIS, AI systems, and workflow design.
          </p>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Start with Guynode and the Digital Twin for the strongest system-level proof, then use
            the filters to inspect supporting projects and methods.
          </p>
        </div>

        <a
          href={PORTFOLIO_PROCESS_HREF}
          className="inline-flex text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-300"
        >
          View process deep dives →
        </a>

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects by role relevance"
        >
          {FILTER_ORDER.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700 dark:border-indigo-400/40 dark:bg-indigo-500/15 dark:text-indigo-200'
                    : 'border-[#d7d1c8] bg-white/90 text-slate-600 hover:border-indigo-300 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <article
              key={item.studyId}
              className="rounded-xl border border-[#ddd7cd] dark:border-white/10 bg-white/95 dark:bg-slate-900/70 px-4 py-4 md:px-5 shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {item.statusLabel}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 border border-[#d7d1c8] dark:border-white/10 rounded-full px-2 py-0.5">
                  {item.proofType}
                </span>
              </div>

              <h3 className="mt-3 text-base font-semibold text-navy-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.summary}
              </p>

              <div className="mt-3 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Role relevance
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.relevantRoles.map((role) => (
                    <span
                      key={`${item.studyId}-${role}`}
                      className={`text-[11px] px-2 py-0.5 rounded-md border ${ROLE_CHIP_STYLES[role]}`}
                    >
                      {role === 'Implementation'
                        ? 'Technical Implementation Specialist'
                        : role === 'QA'
                          ? 'Quality Assurance Analyst'
                          : role === 'GIS'
                            ? 'GIS Analyst'
                            : 'AI Systems'}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={buildCaseStudyHref(item.studyId)}
                aria-label={`View detail for ${item.title}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              >
                View Project Detail
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportingEvidenceSection;
