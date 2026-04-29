import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EXPERIENCE, SKILL_GROUPS, CERTIFICATIONS, SKILL_CHIP_CONFIG } from '../constants';
import SkillDiscoveryModal from '../components/SkillDiscoveryModal';
import FlagshipSystemSection from '../components/home/FlagshipSystemSection';
import SupportingEvidenceSection from '../components/home/SupportingEvidenceSection';
import { GUYNODE_SYSTEM_HREF } from '../lib/routes';

interface HomeViewProps {
  onNavigateToCaseStudy: (id?: string) => void;
  onOpenContact: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToCaseStudy, onOpenContact }) => {
  void onOpenContact;
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const getCategoryColorClass = (category: string) => {
    if (category.includes('Technical')) {
      return 'hover:border-indigo-400/60 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-700 dark:hover:text-indigo-300 focus-visible:ring-indigo-500';
    }
    if (category.includes('Operations')) {
      return 'hover:border-blue-400/60 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300 focus-visible:ring-blue-500';
    }
    return 'hover:border-teal-400/60 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-300 focus-visible:ring-teal-500';
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <Link
                to={GUYNODE_SYSTEM_HREF}
                aria-label="View Guynode system"
                className="group min-h-[74px] border border-[#d9d1c6] dark:border-white/10 bg-[#fbfaf7]/90 dark:bg-slate-900/70 rounded-md px-4 py-3 flex items-center justify-between gap-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-orange-400/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                {/* TODO: update this href to the dedicated Guynode case-study route when it exists. */}
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0 bg-orange-500"
                      aria-hidden="true"
                    />
                    FLAGSHIP PROJECT
                  </p>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-tight text-navy-900 dark:text-white">
                    GUYNODE_SYSTEM
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 shrink-0 text-slate-700 dark:text-slate-200 group-hover:translate-x-0.5 group-hover:text-orange-600 transition-all"
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
                className="group min-h-[74px] border border-[#d9d1c6] dark:border-white/10 bg-[#fbfaf7]/90 dark:bg-slate-900/70 rounded-md px-4 py-3 flex items-center justify-between gap-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-slate-400/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
              >
                {/* TODO: replace /resume with a direct resume PDF asset link when available. */}
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0 bg-slate-500"
                      aria-hidden="true"
                    />
                    DOWNLOAD RESUME
                  </p>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-tight text-navy-900 dark:text-white">
                    RESUME_PDF
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 shrink-0 text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
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
                className={`group block w-full focus:outline-none focus-visible:ring-2 ${track.focusClass}`}
              >
                <article className="relative overflow-hidden rounded-2xl border border-[#d7d1c8] dark:border-white/10 bg-white/95 dark:bg-slate-900/75 p-5 md:p-6 pl-7 md:pl-8 shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
                  <div className={`absolute left-0 top-0 h-full w-1.5 ${track.railClass}`} />
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center ${track.iconTileClass}`}
                        >
                          {track.icon}
                        </div>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.18em] ${track.labelClass}`}
                        >
                          {track.systemLabel}
                        </span>
                      </div>

                      <div className="shrink-0 text-right text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <div>{track.stream}</div>
                        <div className="mt-1">{track.path}</div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl md:text-2xl font-outfit font-semibold text-navy-900 dark:text-white">
                        {track.title}
                      </h2>
                      <div
                        className={`mt-3 h-0.5 w-16 rounded ${track.railClass}`}
                        aria-hidden="true"
                      />
                    </div>

                    <p className="text-sm md:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {track.subcopy}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {track.chips.map((chip, index) => (
                        <span
                          key={chip}
                          className={`text-xs px-2.5 py-1 rounded-md border ${index === 0 ? track.primaryChipClass : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-white/10'}`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FlagshipSystemSection guynodeHref={GUYNODE_SYSTEM_HREF} />

      <section
        id="about"
        className="py-28 px-6 scroll-mt-24 bg-[#f7f5f1]/70 dark:bg-slate-950/60 border-y border-[#e4dfd7] dark:border-white/5"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              WORKING_PROFILE
            </p>
            <h2 className="text-3xl md:text-4xl font-outfit font-semibold text-navy-900 dark:text-white">
              About Me
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              I&apos;m a systems-minded technical operator who likes turning ambiguity into
              structure. My work connects technical implementation, QA reasoning, GIS workflows,
              customer support, and AI-assisted development.
            </p>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              I&apos;m especially interested in the moments where tools, users, and processes stop
              lining up. That is usually where the useful work begins: clarifying the goal, mapping
              the workflow, testing the weak points, and documenting the path forward.
            </p>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Outside of work, I&apos;m drawn to maps, games, music tools, creative systems, and
              product experiences. I tend to notice how things are organized, where friction
              appears, and what would make the experience clearer.
            </p>
          </div>

          <article className="rounded-2xl border border-[#ddd7cd] dark:border-white/10 bg-[#fbfaf7]/95 dark:bg-slate-900/70 p-6 shadow-[0_6px_20px_rgba(15,23,42,0.06)] space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              PROFILE_SIGNAL
            </p>
            {/* TODO: add approved profile asset at public/images/about-profile-medallion.png if missing from repo. */}
            <div className="mx-auto w-full max-w-[320px] rounded-full border border-[#ddd7cd] bg-[#fbfaf7] p-2 shadow-sm">
              <img
                src="/images/about-profile-medallion.png"
                alt="Stylized circular portrait emblem of Kyle Semple with systems, code, game, and GIS motifs."
                className="w-full h-auto rounded-full"
                loading="lazy"
              />
            </div>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li>Systems thinker</li>
              <li>Technical translator</li>
              <li>GIS + workflow builder</li>
              <li>QA-minded operator</li>
            </ul>
            <div className="h-px w-full bg-[#e5e0d6] dark:bg-white/10" />
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold uppercase tracking-[0.16em]">Working style:</span>{' '}
              Structured · Curious · Practical · Documentation-first
            </p>
          </article>
        </div>
      </section>

      <SupportingEvidenceSection />

      {/* Experience */}
      <section id="experience" className="py-32 px-6 scroll-mt-24 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
                EXPERIENCE_LOG
              </h2>
              <h3 className="text-3xl md:text-4xl font-outfit font-semibold text-navy-900 dark:text-white">
                Career Experience
              </h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Relevant experience across technical implementation, GIS operations, workflow
              delivery, customer support, and validation-heavy production environments.
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
                className="glass-card p-8 rounded-3xl border border-[#ddd7cd] dark:border-white/10 shadow-sm scroll-mt-28"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-2xl font-outfit font-bold text-navy-900 dark:text-white">
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
                      <span className="mt-2 w-1.5 h-1.5 bg-indigo-600/50 dark:bg-indigo-500/50 rounded-full shrink-0"></span>
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
        className="py-32 px-6 scroll-mt-24 transition-colors duration-500 bg-[#f7f5f1]/70 dark:bg-slate-950/60"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 space-y-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              CAPABILITY_MATRIX
            </h2>
            <h3 className="text-3xl md:text-4xl font-outfit font-semibold text-navy-900 dark:text-white">
              Skills &amp; Technologies
            </h3>
            <p className="max-w-2xl text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Grouped by role relevance, with proof links where available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#ddd7cd] dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-6 space-y-4"
              >
                <h4 className="text-base font-outfit font-semibold text-navy-900 dark:text-white border-b border-[#e5e0d6] dark:border-white/10 pb-3">
                  {group.category}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {group.description}
                </p>
                <div className="flex flex-wrap items-start content-start gap-2">
                  {group.items.map((skill, i) => {
                    const chipConfig = SKILL_CHIP_CONFIG[skill];
                    const isFlagged = chipConfig?.linkMode === 'flagged';
                    const isDirect = chipConfig?.linkMode === 'direct';
                    const titleText = chipConfig?.evidenceNote;
                    const baseChipClass =
                      'h-8 inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md border border-[#d8d2c7] dark:border-white/10 bg-slate-50 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200';

                    if (isFlagged) {
                      return (
                        <span key={i} title={titleText} className={`${baseChipClass} select-none`}>
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
                        title={titleText}
                        className={`${baseChipClass} transition-colors active:scale-[0.99] focus:outline-none focus-visible:ring-2 ${getCategoryColorClass(group.category)}`}
                      >
                        {skill}
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
