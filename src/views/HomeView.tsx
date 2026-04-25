import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EXPERIENCE, SKILL_GROUPS, CERTIFICATIONS, CASE_STUDY_REGISTRY, SKILL_CHIP_CONFIG } from '../constants';
import SkillDiscoveryModal from '../components/SkillDiscoveryModal';
import TrackSelectorSection from '../components/tracks/TrackSelectorSection';
import { trackSelectorCards } from '../data/trackContent';

interface HomeViewProps {
  onNavigateToCaseStudy: (id?: string) => void;
  onOpenContact: () => void;
}

// 3-card preview strip using the first 3 entries from CASE_STUDY_REGISTRY
const PREVIEW_STUDIES = CASE_STUDY_REGISTRY.slice(0, 3);

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToCaseStudy, onOpenContact }) => {
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

  const RECRUITER_SKILLS = [
    'Workflow Design + Triage Systems',
    'Technical Customer Enablement',
    'QA + Data Integrity',
    'Documentation + Stakeholder Dashboards',
    'AI Tooling / Prompt Governance',
  ];

  // Real data for annotations — sourced from constants/experience
  const CASE_COUNT = String(CASE_STUDY_REGISTRY.length).padStart(2, '0');

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="relative pt-20 min-h-[92vh] md:min-h-[88vh] overflow-hidden bg-gold-50 dark:bg-slate-950">
        {/* Graph-paper grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(30,32,48,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(30,32,48,0.045) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Dark-mode grid */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top-right annotation — real portfolio data */}
        <div
          className="absolute top-24 right-6 hidden lg:block font-mono text-right leading-relaxed select-none"
          style={{ fontSize: '10px', opacity: 0.3 }}
          aria-hidden="true"
        >
          PORT_REF: KS.V2 / CASES: {CASE_COUNT}
          <br />
          BUILD: 2026.04 / ANN_ARBOR_MI
        </div>

        {/* ── 12-column content grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-12 min-h-[88vh] md:min-h-[80vh]">
          {/* Left column — text content — appears second on mobile, first on desktop */}
          <div className="col-span-12 md:col-span-7 order-2 md:order-1 flex flex-col justify-center px-8 md:px-12 pt-8 pb-10 md:pt-10 md:pb-16">
            {/* Eyebrow — horizontal rule + mono label */}
            <div className="flex items-center gap-3 mb-7 animate-in fade-in duration-700">
              <div className="w-8 h-px bg-indigo-500 shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-500">
                Customer Success / AI Operations
              </span>
            </div>

            {/* Headline — split two-line architectural format */}
            <h1
              className="font-outfit font-extrabold text-navy-900 dark:text-white tracking-tight leading-[1.05] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-75"
              style={{ fontSize: 'clamp(2rem, 4.75vw, 4.34rem)' }}
            >
              <span className="block">OPERATIONS</span>
              <span className="block italic text-indigo-500 md:pl-8 lg:pl-14">INTELLIGENCE_V2</span>
            </h1>

            {/* Open-to-work signal */}
            <div className="flex items-center gap-2.5 mb-5 md:pl-8 lg:pl-14 animate-in fade-in duration-700 delay-100">
              <span className="w-2 h-2 bg-emerald-500 animate-pulse shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Open to AI Ops &amp; CX Success roles
              </span>
            </div>

            {/* Body text */}
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mb-10 md:pl-8 lg:pl-14 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              This portfolio covers three areas of work — implementation and technical enablement,
              ops analytics and QA, and geospatial data systems. Each track is built around concrete
              artifacts: how problems were framed, how tradeoffs were handled, and how decisions
              held up under constraint.
            </p>

            {/* CTAs — sharp corners, full-width on mobile */}
            <div className="flex flex-col sm:flex-row gap-0 md:pl-8 lg:pl-14 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <button
                onClick={() => onNavigateToCaseStudy()}
                className="flex items-center justify-between gap-4 px-8 py-4 bg-indigo-500 text-white font-mono text-sm uppercase tracking-wider hover:bg-indigo-600 active:bg-indigo-700 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <span>View Case Studies</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={onOpenContact}
                className="flex items-center justify-center px-8 py-4 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-sm uppercase tracking-wider hover:border-indigo-500/60 hover:bg-indigo-500/5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Right column — geometric visual — appears first on mobile */}
          <div className="col-span-12 md:col-span-5 order-1 md:order-2 relative flex items-stretch">
            {/* Visual frame */}
            <div className="relative w-full min-h-[320px] md:min-h-0 bg-[#fefcf9] dark:bg-[#1e1a14] border-b md:border-b-0 md:border-l border-[#e4dfd7] dark:border-white/5 overflow-hidden">
              {/* Grid background inside frame */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(30,32,48,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,32,48,0.04) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Version / ref tag — top-right, sharp corners */}
              <div className="absolute top-0 right-0 z-10 bg-indigo-500 text-white font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 select-none">
                OPS_REF: V2
              </div>

              {/* Corner brackets */}
              <svg
                className="absolute top-3 left-3 text-indigo-500/60"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M24 0 L0 0 L0 24" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <svg
                className="absolute bottom-12 right-3 text-indigo-500/60"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M0 24 L24 24 L24 0" stroke="currentColor" strokeWidth="1.5" />
              </svg>

              {/* Operations network diagram — SVG */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 380 460"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                aria-label="Operations workflow network diagram"
                role="img"
              >
                {/* Dot grid */}
                {Array.from({ length: 11 }, (_, row) =>
                  Array.from({ length: 9 }, (_, col) => (
                    <circle
                      key={`d-${row}-${col}`}
                      cx={20 + col * 40}
                      cy={20 + row * 40}
                      r="1.5"
                      fill="#1e2030"
                      opacity="0.07"
                    />
                  )),
                )}

                {/* Primary connection paths */}
                <line
                  x1="60"
                  y1="80"
                  x2="180"
                  y2="160"
                  stroke="#c4592a"
                  strokeWidth="1"
                  opacity="0.75"
                />
                <line
                  x1="180"
                  y1="160"
                  x2="300"
                  y2="100"
                  stroke="#c4592a"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1="180"
                  y1="160"
                  x2="180"
                  y2="300"
                  stroke="#c4592a"
                  strokeWidth="1"
                  opacity="0.8"
                />
                <line
                  x1="180"
                  y1="160"
                  x2="300"
                  y2="240"
                  stroke="#c4592a"
                  strokeWidth="1"
                  opacity="0.55"
                />
                <line
                  x1="300"
                  y1="240"
                  x2="180"
                  y2="360"
                  stroke="#c4592a"
                  strokeWidth="1"
                  opacity="0.65"
                />
                <line
                  x1="180"
                  y1="300"
                  x2="60"
                  y2="380"
                  stroke="#c4592a"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1="180"
                  y1="360"
                  x2="60"
                  y2="380"
                  stroke="#c4592a"
                  strokeWidth="1"
                  opacity="0.4"
                />

                {/* Secondary dashed paths */}
                <line
                  x1="300"
                  y1="100"
                  x2="300"
                  y2="240"
                  stroke="#c4592a"
                  strokeWidth="1"
                  opacity="0.2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="60"
                  y1="80"
                  x2="60"
                  y2="380"
                  stroke="#1e2030"
                  strokeWidth="1"
                  opacity="0.06"
                  strokeDasharray="2 6"
                />

                {/* Nodes — squares (zero radius, consistent with design) */}
                {/* Input node */}
                <rect x="54" y="74" width="12" height="12" fill="#c4592a" opacity="0.9" />
                {/* Primary junction */}
                <rect x="173" y="153" width="14" height="14" fill="#c4592a" />
                {/* Branch A */}
                <rect
                  x="294"
                  y="94"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="#c4592a"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                {/* Branch B */}
                <rect x="294" y="234" width="12" height="12" fill="#c4592a" opacity="0.75" />
                {/* Convergence A */}
                <rect
                  x="174"
                  y="294"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="#c4592a"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                {/* Convergence B */}
                <rect
                  x="174"
                  y="354"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="#c4592a"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
                {/* Output node */}
                <rect x="54" y="374" width="12" height="12" fill="#c4592a" opacity="0.65" />

                {/* Measurement annotation line */}
                <line
                  x1="330"
                  y1="100"
                  x2="330"
                  y2="380"
                  stroke="#1e2030"
                  strokeWidth="0.75"
                  opacity="0.15"
                />
                <line
                  x1="324"
                  y1="100"
                  x2="336"
                  y2="100"
                  stroke="#1e2030"
                  strokeWidth="0.75"
                  opacity="0.15"
                />
                <line
                  x1="324"
                  y1="380"
                  x2="336"
                  y2="380"
                  stroke="#1e2030"
                  strokeWidth="0.75"
                  opacity="0.15"
                />
              </svg>

              {/* Side annotation — real data, rotated */}
              <div
                className="absolute right-[-1.75rem] top-1/2 -translate-y-1/2 font-mono uppercase tracking-widest text-navy-900/25 dark:text-white/15 select-none hidden md:block"
                style={{ fontSize: '8px', writingMode: 'vertical-rl' }}
                aria-hidden="true"
              >
                120+ REQ/WK · $100K+ ACCOUNTS
              </div>

              {/* Status overlay — bottom strip */}
              <div className="absolute bottom-0 left-0 right-0 bg-navy-900/90 dark:bg-[#0d0c09]/95 text-white px-4 py-3 flex items-center gap-3">
                <span
                  className="w-2 h-2 bg-emerald-500 animate-pulse shrink-0"
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  UNIT_STATUS: OPEN_TO_WORK
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrackSelectorSection tracks={trackSelectorCards} />

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

                    const handleClick = isDirect && chipConfig.linkedSlugs[0]
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
                className="glass-card p-6 rounded-3xl flex flex-col gap-4 hover:translate-y-[-4px] transition-all duration-300 group"
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
