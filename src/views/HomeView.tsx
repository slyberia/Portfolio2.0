import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EXPERIENCE, SKILL_GROUPS, CERTIFICATIONS, CASE_STUDY_REGISTRY } from '../constants';
import SkillDiscoveryModal from '../components/SkillDiscoveryModal';
import TrackSelectorSection from '../components/tracks/TrackSelectorSection';
import { trackSelectorCards } from '../data/trackContent';

interface HomeViewProps {
  onNavigateToCaseStudy: (id?: string) => void;
  onOpenContact: () => void;
}

interface TickerProps {
  metric: string;
  label: string;
  tooltip: string;
  targetId: string;
  caseStudyId: string;
}

const TickerCard: React.FC<TickerProps> = ({ metric, label, tooltip, targetId, caseStudyId }) => {
  const scrollToTarget = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="relative group/ticker">
      <button
        onClick={() => scrollToTarget(targetId)}
        className="w-full text-center p-4 rounded-xl transition-all duration-300 hover:bg-white dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 active:scale-95 group-hover/ticker:shadow-xl dark:group-hover/ticker:shadow-none"
        aria-label={`Jump to ${label} details`}
      >
        <h3 className="text-3xl font-outfit font-bold text-navy-900 dark:text-white group-hover/ticker:text-indigo-600 dark:group-hover/ticker:text-indigo-400 transition-colors">
          {metric}
        </h3>
        <div className="text-sm text-slate-500 uppercase tracking-widest mt-1 group-hover/ticker:text-slate-900 dark:group-hover/ticker:text-slate-300 transition-colors">
          {label}
        </div>
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 opacity-0 group-hover/ticker:opacity-100 pointer-events-none group-hover/ticker:pointer-events-auto transition-all duration-300 translate-y-2 group-hover/ticker:translate-y-0 z-50">
        <div className="relative bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 p-3 rounded-xl shadow-2xl text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-center space-y-2">
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-white/10 rotate-45"></div>
          <p>{tooltip}</p>
          <Link
            to={`/case-studies/${caseStudyId}`}
            className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            See evidence →
          </Link>
        </div>
      </div>
    </div>
  );
};

// 3-card preview strip using the first 3 entries from CASE_STUDY_REGISTRY
const PREVIEW_STUDIES = CASE_STUDY_REGISTRY.slice(0, 3);

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToCaseStudy, onOpenContact }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const getCategoryColorClass = (category: string) => {
    if (category.includes('Strategic'))
      return 'hover:border-indigo-500/50 hover:bg-indigo-500/5 text-indigo-700 dark:text-indigo-400';
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

  return (
    <>
      {/* Hero Section — reduced padding so stats row is visible at 1080p */}
      <section
        className="relative pt-24 pb-6 md:pt-28 md:pb-10 px-6 overflow-hidden group"
        onMouseMove={handleMouseMove}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08), transparent 40%)`,
          }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6 relative z-10">
          {/* Open-to-work signal pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.6)]"></span>
            Open to AI Ops &amp; CX Success roles
          </div>

          {/* Role identity pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span>Customer Success</span>
            <span className="w-1 h-1 bg-indigo-500 rounded-full shadow-[0_0_5px_currentColor]"></span>
            <span>Systems Architect</span>
            <span className="w-1 h-1 bg-indigo-500 rounded-full shadow-[0_0_5px_currentColor]"></span>
            <span>AI Operations</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-outfit font-extrabold text-navy-900 dark:text-white leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 drop-shadow-sm dark:drop-shadow-2xl">
            Bridging <span className="gradient-text">Operations</span> &amp;{' '}
            <span className="gradient-text">Intelligence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Technical Customer Success and Solutions Enablement hybrid specializing in AI workflows,
            operational triage, and reliable data systems. I partner with AI platform and SaaS teams
            to bridge the gap between model potential and enterprise-grade customer outcomes at
            scale.
          </p>

          {/* CTAs — "View Case Studies" is primary, "Get in Touch" is secondary */}
          <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <button
              onClick={() => onNavigateToCaseStudy()}
              className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-3 group/btn"
            >
              View Case Studies
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
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
            </button>
            <button
              onClick={onOpenContact}
              className="px-10 py-4 bg-indigo-500/5 dark:bg-indigo-500/10 backdrop-blur-md text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 rounded-2xl font-bold shadow-sm hover:shadow-indigo-500/10 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-60"
          aria-hidden="true"
        ></div>
      </section>

      <TrackSelectorSection tracks={trackSelectorCards} />

      {/* Stats/Quick Glance */}
      <section className="py-12 border-y border-black/5 dark:border-white/5 bg-white/30 dark:bg-slate-900/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <TickerCard
            metric="100+"
            label="Weekly Tickets"
            tooltip="Managed enterprise-grade pressure with ~100+ Zendesk conversations weekly at Printful."
            targetId="exp-printful"
            caseStudyId="ops-triage"
          />
          <TickerCard
            metric="$100k+"
            label="Client Tiers"
            tooltip="Experience handling high-stakes accounts where operational accuracy is critical for revenue."
            targetId="exp-printful"
            caseStudyId="ops-triage"
          />
          <TickerCard
            metric="120+"
            label="SLA Requests/wk"
            tooltip="Validated high-volume throughput in utility datasets via strict triage protocols at Apex Systems."
            targetId="exp-apex"
            caseStudyId="ops-triage"
          />
          <TickerCard
            metric="4+ Years"
            label="GIS Expertise"
            tooltip="Core technical foundation in spatial data systems and architectural design."
            targetId="foundation"
            caseStudyId="nba-systems-qa"
          />
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
                  <div className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover/power:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-outfit font-bold text-indigo-700 dark:text-indigo-300 tracking-tight">
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
                  {group.items.map((skill, i) => (
                    <button
                      key={i}
                      onClick={() => handleSkillClick(skill)}
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
                  ))}
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
              A curated selection of case studies demonstrating systems thinking, AI operations, and
              customer success outcomes.
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
