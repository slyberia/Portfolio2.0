import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EXPERIENCE,
  SKILL_GROUPS,
  CERTIFICATIONS,
  CASE_STUDY_REGISTRY,
  SKILL_CHIP_CONFIG,
} from '../constants';
import SkillDiscoveryModal from '../components/SkillDiscoveryModal';
import FlagshipSystemSection from '../components/home/FlagshipSystemSection';

interface HomeViewProps {
  onNavigateToCaseStudy: (id?: string) => void;
  onOpenContact: () => void;
}

// 3-card preview strip using the first 3 entries from CASE_STUDY_REGISTRY
const PREVIEW_STUDIES = CASE_STUDY_REGISTRY.slice(0, 3);

const guynodeCaseStudy = CASE_STUDY_REGISTRY.find((study) => {
  const normalizedTitle = study.title.toLowerCase();
  const normalizedId = study.id.toLowerCase();

  return normalizedTitle.includes('guynode') || normalizedId.includes('guynode');
});

// TODO: replace this fallback logic with a dedicated Guynode route constant when it is added.
const GUYNODE_SYSTEM_HREF = `/case-studies/${guynodeCaseStudy?.id ?? CASE_STUDY_REGISTRY[0].id}`;

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToCaseStudy, onOpenContact }) => {
  void onOpenContact;
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const getCategoryColorClass = (category: string) => {
    if (category.includes('Strategic'))
      return 'hover:border-indigo-500/50 hover:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400';
    if (category.includes('Data & Systems'))
      return 'hover:border-amber-500/50 hover:bg-amber-500/5 text-amber-700 dark:text-amber-400';
    if (category.includes('Stack'))
      return 'hover:border-emerald-500/50 hover:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400';
    return 'hover:border-slate-500/50 hover:bg-slate-500/5';
  };

  const roleTrackCards = [
    {
      systemLabel: 'IMPLEMENTATION_TRACK',
      title: 'Technical Implementation Specialist',
      subcopy:
        'Customer-facing technical delivery, workflow setup, onboarding support, and implementation-focused problem solving.',
      chips: ['Onboarding', 'Workflow Design', 'Documentation'],
      stream: 'STREAM 01',
      path: 'SYS_PATH: 01.00',
      href: '/tracks/implementation',
      railClass: 'bg-orange-600',
      iconTileClass: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300',
      labelClass: 'text-orange-700 dark:text-orange-300',
      primaryChipClass:
        'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-500/15 dark:text-orange-200 dark:border-orange-500/30',
      focusClass: 'focus-visible:ring-orange-500 hover:border-orange-400/50',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2v4" />
          <path d="m16.2 7.8 2.9-2.9" />
          <path d="M18 12h4" />
          <path d="m16.2 16.2 2.9 2.9" />
          <path d="M12 18v4" />
          <path d="m7.8 16.2-2.9 2.9" />
          <path d="M2 12h4" />
          <path d="m7.8 7.8-2.9-2.9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      systemLabel: 'QA_TRACK',
      title: 'Quality Assurance Analyst',
      subcopy:
        'Structured testing, issue triage, root-cause analysis, and decision-ready quality reporting.',
      chips: ['QA Protocols', 'Test Plans', 'Root Cause Analysis'],
      stream: 'STREAM 02',
      path: 'SYS_PATH: 02.00',
      href: '/tracks/ops-analytics',
      railClass: 'bg-blue-600',
      iconTileClass: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
      labelClass: 'text-blue-700 dark:text-blue-300',
      primaryChipClass:
        'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:border-blue-500/30',
      focusClass: 'focus-visible:ring-blue-500 hover:border-blue-400/50',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      systemLabel: 'GIS_TRACK',
      title: 'GIS Analyst',
      subcopy:
        'Spatial data operations, mapping workflows, dataset governance, and GIS-focused system delivery.',
      chips: ['ArcGIS', 'Leaflet', 'Spatial Data'],
      stream: 'STREAM 03',
      path: 'SYS_PATH: 03.00',
      href: '/tracks/gis',
      railClass: 'bg-teal-600',
      iconTileClass: 'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300',
      labelClass: 'text-teal-700 dark:text-teal-300',
      primaryChipClass:
        'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-500/15 dark:text-teal-200 dark:border-teal-500/30',
      focusClass: 'focus-visible:ring-teal-500 hover:border-teal-400/50',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6 9 3l6 3 6-3v15l-6 3-6-3-6 3z" />
          <path d="M9 3v15" />
          <path d="M15 6v15" />
        </svg>
      ),
    },
  ];

  const RECRUITER_SKILLS = [
    'Workflow Design + Triage Systems',
    'Technical Customer Enablement',
    'QA + Data Integrity',
    'Documentation + Stakeholder Dashboards',
    'AI Tooling / Prompt Governance',
  ];

  return (
    <>
      <section className="relative pt-20 overflow-hidden bg-[#f7f5f1] dark:bg-slate-950 border-b border-[#e4dfd7] dark:border-white/5">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(30,32,48,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(30,32,48,0.045) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5 space-y-8 lg:pr-6">
            <div className="space-y-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                SYSTEM_ARCHITECT_V3.1
              </p>
              <h1 className="text-5xl md:text-6xl font-outfit font-bold tracking-tight text-navy-900 dark:text-white">
                Kyle Semple
              </h1>
              <div
                className="h-px w-full max-w-md bg-slate-300 dark:bg-white/15"
                aria-hidden="true"
              />
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                A portfolio built around three target roles: technical implementation, quality
                assurance, and GIS systems. Each path connects to tangible systems, workflows, and
                operational proof.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              <Link
                to={GUYNODE_SYSTEM_HREF}
                aria-label="Open flagship project case study"
                className="group border border-[#d7d1c8] dark:border-white/10 bg-white/90 dark:bg-slate-900/70 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-indigo-500/40 hover:shadow-[0_10px_35px_rgba(79,70,229,0.15)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {/* TODO: update this href to the dedicated Guynode case-study route when it exists. */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    FLAGSHIP PROJECT
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy-900 dark:text-white">
                    GUYNODE_SYSTEM
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </Link>

              <Link
                to="/resume"
                aria-label="Download resume"
                className="group border border-[#d7d1c8] dark:border-white/10 bg-white/90 dark:bg-slate-900/70 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-indigo-500/40 hover:shadow-[0_10px_35px_rgba(79,70,229,0.15)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {/* TODO: replace /resume with a direct resume PDF asset link when available. */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    DOWNLOAD RESUME
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy-900 dark:text-white">
                    RESUME_PDF
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              CHOOSE YOUR HIRING LENS
            </p>

            {roleTrackCards.map((track) => (
              <Link
                key={track.href}
                to={track.href}
                aria-label={`Open ${track.title} track`}
                className={`group relative rounded-2xl border border-[#d7d1c8] dark:border-white/10 bg-white/95 dark:bg-slate-900/75 p-5 md:p-6 pl-7 md:pl-8 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(15,23,42,0.12)] focus:outline-none focus-visible:ring-2 ${track.focusClass}`}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${track.railClass}`}
                />
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${track.iconTileClass}`}
                      >
                        {track.icon}
                      </div>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.18em] ${track.labelClass}`}
                      >
                        {track.systemLabel}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-outfit font-semibold text-navy-900 dark:text-white">
                        {track.title}
                      </h2>
                      <div
                        className={`mt-2 h-0.5 w-16 rounded ${track.railClass}`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm md:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                      {track.subcopy}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {track.chips.map((chip, index) => (
                        <span
                          key={chip}
                          className={`text-xs px-2.5 py-1 rounded-md border dark:border-white/10 ${index === 0 ? track.primaryChipClass : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-white/10'}`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col sm:items-end justify-between sm:justify-start gap-3 sm:gap-1 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 shrink-0">
                    <span>{track.stream}</span>
                    <span>{track.path}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FlagshipSystemSection guynodeHref={GUYNODE_SYSTEM_HREF} />

      {/* Evidence Row — Direction C: structured, no cards, typographic hierarchy */}
      <section className="border-y border-[#e4dfd7] dark:border-white/5 bg-[#fefcf9] dark:bg-[#221e17]">
        <div className="max-w-7xl mx-auto px-6">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e4dfd7] dark:divide-white/5">
            {[
              {
                metric: '100+',
                label: 'Weekly Tickets',
                sub: 'enterprise volume · Printful',
                caseId: 'ops-triage',
              },
              {
                metric: '$100K+',
                label: 'Client Tiers',
                sub: 'revenue-critical accounts',
                caseId: 'ops-triage',
              },
              {
                metric: '120+',
                label: 'SLA Requests/wk',
                sub: 'validated throughput · Apex',
                caseId: 'ops-triage',
              },
              {
                metric: '4+ yrs',
                label: 'GIS Depth',
                sub: 'spatial systems foundation',
                caseId: 'nba-systems-qa',
              },
            ].map(({ metric, label, sub, caseId }) => (
              <Link
                key={metric}
                to={`/case-studies/${caseId}`}
                className="px-6 py-8 first:pl-0 last:pr-0 group/stat flex flex-col gap-1 hover:bg-[#f5e2d5]/40 dark:hover:bg-[rgba(196,89,42,0.06)] transition-colors"
              >
                <dt className="text-3xl font-outfit font-bold text-navy-900 dark:text-white group-hover/stat:text-indigo-500 dark:group-hover/stat:text-indigo-400 transition-colors tabular-nums">
                  {metric}
                </dt>
                <dd className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</dd>
                <dd className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  {sub}
                </dd>
              </Link>
            ))}
          </dl>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 px-6 scroll-mt-24 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
                Trajectory
              </h2>
              <h3 className="text-4xl md:text-5xl font-outfit font-bold text-navy-900 dark:text-white">
                Career Experience
              </h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              A track record of stabilizing operations and delighting enterprise stakeholders in
              data-heavy environments.
            </p>
          </div>

          <div className="space-y-8">
            {EXPERIENCE.map((exp, idx) => (
              <div
                key={idx}
                id={
                  exp.company.toLowerCase().includes('printful')
                    ? 'exp-printful'
                    : exp.company.toLowerCase().includes('apex')
                      ? 'exp-apex'
                      : undefined
                }
                className="group glass-card p-8 rounded-3xl hover:translate-y-[-4px] transition-all duration-500 scroll-mt-28"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-2xl font-outfit font-bold text-navy-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-lg text-slate-500 dark:text-slate-300 flex items-center gap-2 mt-1 font-medium">
                      {exp.company}
                    </p>
                    {exp.tools && (
                      <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 opacity-80">
                        {exp.tools}
                      </p>
                    )}
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium shrink-0 border border-black/5 dark:border-white/5">
                    {exp.period}
                  </span>
                </div>
                <ul className="grid md:grid-cols-2 gap-4">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 bg-indigo-600/40 dark:bg-indigo-500/40 rounded-full shrink-0 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors"></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section
        id="skills"
        className="py-32 px-6 scroll-mt-24 transition-colors duration-500 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
              Toolbox
            </h2>
            <h3 className="text-4xl md:text-5xl font-outfit font-bold text-navy-900 dark:text-white">
              Skills &amp; Technologies
            </h3>
          </div>

          {/* Recruiter-Optimized Impact Strip */}
          <div className="relative mb-20 px-4 py-8 rounded-[3rem] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] border border-indigo-500/10 backdrop-blur-sm shadow-inner">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white dark:bg-slate-900 border border-indigo-500/20 rounded-full shadow-sm">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Executive Impact Summary
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {RECRUITER_SKILLS.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-indigo-500/10 group/power active:scale-95 cursor-default"
                >
                  <div className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover/power:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(196,89,42,0.3)]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-outfit font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-10">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold animate-pulse">
              Click a skill below to view relevant case study evidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SKILL_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="glass-card p-8 rounded-3xl space-y-6 hover:translate-y-[-4px] transition-transform duration-300"
              >
                <h4 className="text-xl font-outfit font-bold text-navy-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-4">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, i) => {
                    const chipConfig = SKILL_CHIP_CONFIG[skill];
                    const isFlagged = chipConfig?.linkMode === 'flagged';
                    const isDirect = chipConfig?.linkMode === 'direct';

                    if (isFlagged) {
                      return (
                        <span
                          key={i}
                          title={chipConfig.evidenceNote || 'No case study evidence available yet'}
                          className={`px-3 py-1 text-xs font-medium rounded-lg border border-black/5 dark:border-white/5 opacity-40 cursor-not-allowed select-none bg-slate-100 dark:bg-slate-800/50 ${getCategoryColorClass(group.category)}`}
                        >
                          {skill}
                        </span>
                      );
                    }

                    const handleClick =
                      isDirect && chipConfig.linkedSlugs[0]
                        ? () => onNavigateToCaseStudy(chipConfig.linkedSlugs[0])
                        : () => handleSkillClick(skill);

                    return (
                      <button
                        key={i}
                        onClick={handleClick}
                        className={`group/skill px-3 py-1 bg-slate-100 dark:bg-slate-800/50 text-xs font-medium rounded-lg border border-black/5 dark:border-white/5 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${getCategoryColorClass(group.category)}`}
                      >
                        {skill}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 opacity-0 group-hover/skill:opacity-100 transition-opacity"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Modal */}
      {selectedSkill && (
        <SkillDiscoveryModal
          skill={selectedSkill}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onNavigateToStudy={onNavigateToCaseStudy}
        />
      )}

      {/* Case Study Preview Strip */}
      <section className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/30 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
              Evidence
            </h2>
            <h3 className="text-4xl md:text-5xl font-outfit font-bold text-navy-900 dark:text-white">
              Featured Work
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Cases built around concrete decisions — governing AI workflows, stabilizing triage
              systems under volume, and maintaining spatial data accuracy. Each one shows how the
              problem was framed and what tradeoff was accepted.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PREVIEW_STUDIES.map((study) => (
              <div
                key={study.id}
                className="glass-card p-6 rounded-3xl flex flex-col gap-4 hover:-translate-y-1 hover:border-indigo-500/30 transition-all duration-300 group"
              >
                {/* Primary tag */}
                <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                  {study.tags[0]}
                </span>

                <h4 className="text-xl font-outfit font-bold text-navy-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {study.title}
                </h4>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                  {study.rationale}
                </p>

                <Link
                  to={`/case-studies/${study.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all"
                >
                  View Case Study
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section id="foundation" className="py-32 px-6 scroll-mt-24 transition-colors duration-500">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
                Foundation
              </h2>
              <h3 className="text-4xl font-outfit font-bold text-navy-900 dark:text-white">
                Education
              </h3>
              <div className="glass-card p-8 rounded-3xl mt-6">
                <h4 className="text-xl font-outfit font-bold text-navy-900 dark:text-white">
                  B.A., Geography
                </h4>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium font-outfit">
                  Queen&#39;s University
                </p>
                <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm leading-relaxed">
                  Relevant Coursework: Data Analytics, Geographic Information Science, Project
                  Management
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-4xl font-outfit font-bold text-navy-900 dark:text-white">
              Certifications
            </h3>
            <div className="grid gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 glass-card p-6 rounded-2xl hover:translate-x-2 transition-transform cursor-default"
                >
                  <div className="w-12 h-12 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 15V3" />
                      <path d="m15 12-3 3-3-3" />
                      <path d="M18 17.66A9 9 0 1 1 5.64 5.64" />
                      <rect width="8" height="4" x="8" y="13" rx="1" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-outfit font-bold text-navy-900 dark:text-white text-sm">
                      {cert.name}
                    </h5>
                    <p className="text-xs text-slate-500">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;
