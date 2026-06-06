import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EXPERIENCE,
  SKILL_GROUPS,
  CERTIFICATIONS,
  SKILL_CHIP_CONFIG,
  PROJECT_REGISTRY,
} from '../constants';
import FlagshipSystemSection from '../components/home/FlagshipSystemSection';
import SupportingEvidenceSection from '../components/home/SupportingEvidenceSection';
import WhatIHelpTeamsDoSection from '../components/home/WhatIHelpTeamsDoSection';
import { GUYNODE_SYSTEM_HREF } from '../lib/routes';
import { isProjectPublic } from '../data/projectMetadata';
import { decisionBlocks, forensicEntries } from '../data/deepDiveContent';

// Friendly labels for the inspector's evidence links. Deep-dive ids → their titles so a
// skill linked to `/deep-dives#<id>` reads as a named deep dive rather than a raw anchor.
const DEEP_DIVE_TITLES: Record<string, string> = {
  ...Object.fromEntries(decisionBlocks.map((block) => [block.id, block.title])),
  ...Object.fromEntries(forensicEntries.map((entry) => [entry.id, entry.label])),
};

const resolveEvidenceLabel = (href: string): string => {
  if (href.startsWith('/projects/')) {
    const id = href.replace('/projects/', '');
    return PROJECT_REGISTRY.find((project) => project.id === id)?.title ?? id;
  }
  if (href.startsWith('/deep-dives#')) {
    const id = href.split('#')[1] ?? '';
    return `Deep Dive — ${DEEP_DIVE_TITLES[id] ?? id}`;
  }
  if (href === '/resume') return 'Résumé & credentials';
  return href;
};

const getCertConfig = (issuer: string, name: string) => {
  if (issuer.includes('IBM')) {
    return {
      bgClass:
        'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20 dark:border-blue-500/30',
      hoverGlow: 'hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:border-blue-500/40',
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="8" rx="1.5" />
          <rect x="2" y="14" width="20" height="8" rx="1.5" />
          <line x1="6" y1="6" x2="18" y2="6" />
          <line x1="6" y1="18" x2="18" y2="18" />
        </svg>
      ),
    };
  }
  if (name.includes('Project Management')) {
    return {
      bgClass:
        'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30',
      hoverGlow: 'hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/40',
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      ),
    };
  }
  if (name.includes('Data Analytics')) {
    return {
      bgClass:
        'bg-tide-aqua/10 text-[#237f86] dark:bg-tide-aqua/20 dark:text-tide-sky border-tide-aqua/20 dark:border-tide-aqua/30',
      hoverGlow: 'hover:shadow-[0_8px_30px_rgba(57,184,188,0.15)] hover:border-tide-aqua/40',
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M3 20h18" />
        </svg>
      ),
    };
  }
  // Default/Intercultural
  return {
    bgClass:
      'bg-gild/10 text-gild-deep dark:bg-gild/20 dark:text-gild-soft border-gild/20 dark:border-gild/30',
    hoverGlow: 'hover:shadow-[0_8px_30px_rgba(216,168,79,0.15)] hover:border-gild/40',
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  };
};

interface HomeViewProps {
  onNavigateToCaseStudy: (id?: string) => void;
  onOpenContact: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToCaseStudy, onOpenContact }) => {
  void onNavigateToCaseStudy;
  void onOpenContact;
  const [activeSkillName, setActiveSkillName] = useState<string | null>(null);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const activeSkill = useMemo(() => {
    if (!activeSkillName) return null;
    for (const group of SKILL_GROUPS) {
      const found = group.items.find((item) => item.name === activeSkillName);
      if (found) return found;
    }
    return null;
  }, [activeSkillName]);

  const chipConfig = useMemo(() => {
    if (!activeSkill) return null;
    return SKILL_CHIP_CONFIG[activeSkill.name] || null;
  }, [activeSkill]);

  // Deduped, friendly-labeled evidence links for the active skill. Every skill carries an
  // explicit curated `proofHref` (a public project, a proven deep-dive anchor, or /resume);
  // tag-matched and chip-config-linked public projects are surfaced as additional context.
  const activeSkillEvidence = useMemo(() => {
    if (!activeSkill) return [];

    const links: { label: string; href: string }[] = [];
    const seen = new Set<string>();
    const add = (href?: string) => {
      if (!href || seen.has(href)) return;
      seen.add(href);
      links.push({ label: resolveEvidenceLabel(href), href });
    };
    const addProject = (id: string) => {
      if (PROJECT_REGISTRY.some((project) => project.id === id) && isProjectPublic(id)) {
        add(`/projects/${id}`);
      }
    };

    // 1. The curated primary evidence link (present on every skill).
    add(activeSkill.proofHref);
    // 2. Public projects whose tags name this skill.
    PROJECT_REGISTRY.forEach((project) => {
      if (project.tags.includes(activeSkill.name)) addProject(project.id);
    });
    // 3. Public projects linked via SKILL_CHIP_CONFIG.
    chipConfig?.linkedSlugs?.forEach((slug) => addProject(slug));

    return links;
  }, [activeSkill, chipConfig]);

  const getCategoryColorClass = (category: string) => {
    if (category.includes('Technical')) {
      return 'border-tide-aqua/30 bg-tide-aqua/5 text-[#1e6b70] dark:text-tide-sky dark:bg-tide-aqua/10 dark:border-tide-aqua/20 hover:border-tide-aqua/60 hover:bg-tide-aqua/15 hover:text-[#18565a] dark:hover:text-white focus-visible:ring-tide-aqua';
    }
    if (category.includes('Operations')) {
      return 'border-tide-blue/30 bg-tide-blue/5 text-tide-blue dark:text-tide-softBlue dark:bg-tide-blue/10 dark:border-tide-blue/20 hover:border-tide-blue/60 hover:bg-tide-blue/15 hover:text-tide-blue dark:hover:text-white focus-visible:ring-tide-blue';
    }
    return 'border-tide-cyan/30 bg-tide-cyan/5 text-tide-cyan dark:text-tide-cyan dark:bg-tide-cyan/10 dark:border-tide-cyan/20 hover:border-tide-cyan/60 hover:bg-tide-cyan/15 hover:text-tide-cyan dark:hover:text-white focus-visible:ring-tide-cyan';
  };

  const roleTrackCards = [
    {
      systemLabel: 'IMPLEMENTATION_TRACK',
      title: 'Forward Deployed Engineer',
      subcopy:
        'Customer-facing technical delivery, workflow setup, onboarding support, and implementation-focused problem solving.',
      chips: ['Onboarding', 'Workflow Design', 'Documentation'],
      stream: 'STREAM 01',
      path: 'SYS_PATH: 01.00',
      href: '/tracks/forward-deployed',
      railClass: 'bg-tide-aqua',
      iconTileClass: 'bg-tide-aqua/10 text-[#237f86] dark:bg-tide-aqua/15 dark:text-tide-sky',
      labelClass: 'text-[#237f86] dark:text-tide-sky',
      primaryChipClass:
        'bg-tide-aqua/10 text-[#237f86] border-tide-aqua/30 dark:bg-tide-aqua/15 dark:text-tide-sky dark:border-tide-aqua/30',
      focusClass: 'focus-visible:ring-tide-aqua hover:border-tide-sky/50',
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
      systemLabel: 'SOLUTIONS_TRACK',
      title: 'Solutions Architect',
      subcopy:
        'System and solution design backed by structured testing, root-cause analysis, and reliability review — architecture you can trust in production.',
      chips: ['Solution Design', 'Reliability', 'Root-Cause Analysis'],
      stream: 'STREAM 02',
      path: 'SYS_PATH: 02.00',
      href: '/tracks/solutions-architect',
      railClass: 'bg-tide-blue',
      iconTileClass: 'bg-tide-blue/10 text-tide-blue dark:bg-tide-blue/15 dark:text-tide-softBlue',
      labelClass: 'text-tide-blue dark:text-tide-softBlue',
      primaryChipClass:
        'bg-tide-blue/10 text-tide-blue border-tide-blue/30 dark:bg-tide-blue/15 dark:text-tide-softBlue dark:border-tide-blue/30',
      focusClass: 'focus-visible:ring-tide-blue hover:border-tide-softBlue/50',
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
      title: 'Spatial Systems Architect',
      subcopy:
        'Spatial data operations, mapping workflows, dataset governance, and GIS-focused system delivery.',
      chips: ['ArcGIS', 'Leaflet', 'Spatial Data'],
      stream: 'STREAM 03',
      path: 'SYS_PATH: 03.00',
      href: '/tracks/spatial-systems',
      railClass: 'bg-tide-cyan',
      iconTileClass: 'bg-tide-cyan/10 text-tide-cyan dark:bg-tide-cyan/15 dark:text-tide-cyan',
      labelClass: 'text-tide-cyan dark:text-tide-cyan',
      primaryChipClass:
        'bg-tide-cyan/10 text-tide-cyan border-tide-cyan/30 dark:bg-tide-cyan/15 dark:text-tide-cyan dark:border-tide-cyan/30',
      focusClass: 'focus-visible:ring-tide-cyan hover:border-tide-cyan/50',
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
      <section className="relative pt-16 overflow-hidden bg-[#f5f9fb] dark:bg-slate-950 border-b border-[#d8e8ee] dark:border-white/5">
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

        <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1.45fr_0.85fr] gap-10 lg:gap-14 items-center">
            {/* Identity + primary actions */}
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-5">
                <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-600 dark:text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-[3px] bg-gild dark:bg-gild-soft shrink-0"
                    aria-hidden="true"
                  />
                  SYSTEMS · ADOPTION · PROOF
                </p>
                <h1 className="text-5xl md:text-6xl font-outfit font-bold tracking-tight text-ink-navy dark:text-white">
                  Kyle Semple
                </h1>
                <p className="text-xl md:text-2xl font-outfit font-semibold text-tide-aqua dark:text-tide-sky">
                  Forward Deployed Engineer
                </p>
                {/* Gild-led rule: a deliberate secondary-accent moment */}
                <div className="flex items-center gap-2 w-full max-w-md" aria-hidden="true">
                  <span className="h-1 w-12 rounded-full bg-gild dark:bg-gild-soft shrink-0" />
                  <span className="h-px flex-1 bg-slate-300 dark:bg-white/15" />
                </div>
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed max-w-xl">
                  I help teams turn complex technical, operational, and spatial problems into
                  systems people can understand, adopt, and use.
                </p>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  My work connects forward-deployed engineering, technical implementation, customer
                  success, solutions and systems architecture, GIS, operations, and AI workflow
                  design.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
                <Link
                  to={GUYNODE_SYSTEM_HREF}
                  aria-label="View Flagship Project"
                  className="group min-h-[80px] border border-[#0d9488] dark:border-tide-sky/60 bg-[#0d9488] dark:bg-tide-sky rounded-md px-5 py-4 flex items-center justify-between gap-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-[#0f766e] dark:hover:bg-tide-sky/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9fb] dark:focus-visible:ring-offset-slate-950 focus-visible:ring-tide-aqua"
                >
                  {/* TODO: update this href to the dedicated Guynode case-study route when it exists. */}
                  <div>
                    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/90 dark:text-ink-navy/70">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0 bg-white/80 dark:bg-ink-navy/60"
                        aria-hidden="true"
                      />
                      PRIMARY ACTION
                    </p>
                    <p className="mt-1 text-base md:text-lg font-outfit font-semibold text-white dark:text-ink-navy">
                      View Flagship Project
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0 text-white dark:text-ink-navy group-hover:translate-x-0.5 transition-all"
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
                  className="group min-h-[80px] border border-[#c2d6df] dark:border-white/20 bg-white/95 dark:bg-slate-900/75 rounded-md px-5 py-4 flex items-center justify-between gap-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-slate-500/80 dark:hover:border-slate-300/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9fb] dark:focus-visible:ring-offset-slate-950 focus-visible:ring-slate-500"
                >
                  {/* TODO: replace /resume with a direct resume PDF asset link when available. */}
                  <div>
                    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0 bg-gild dark:bg-gild-soft"
                        aria-hidden="true"
                      />
                      SECONDARY ACTION
                    </p>
                    <p className="mt-1 text-base md:text-lg font-outfit font-semibold text-ink-navy dark:text-white">
                      Download Resume
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

            {/* Portrait anchor */}
            <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-3">
              <Link
                to="/gallery"
                aria-label="View the AI art gallery"
                className="group inline-block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9fb] dark:focus-visible:ring-offset-slate-950 focus-visible:ring-tide-aqua"
              >
                <span className="block w-44 md:w-52 lg:w-56 rounded-full border border-[#d8e8ee] dark:border-white/15 bg-[#f8fbfd] dark:bg-slate-900 p-2 shadow-sm ring-1 ring-transparent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-gild/40 dark:group-hover:ring-gild-soft/40">
                  <img
                    src="/images/about-profile-medallion.png"
                    alt="Stylized circular portrait medallion of Kyle Semple with systems, code, game, and GIS motifs."
                    className="w-full h-auto rounded-full"
                    loading="lazy"
                  />
                </span>
              </Link>
              <p className="max-w-[14rem] text-xs text-slate-600 dark:text-slate-300 text-center lg:text-right">
                AI-generated portrait — a deliberate piece.{' '}
                <Link
                  to="/gallery"
                  className="font-medium text-tide-aqua hover:underline dark:text-tide-sky"
                >
                  Explore the gallery →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhatIHelpTeamsDoSection />

      <FlagshipSystemSection guynodeHref={GUYNODE_SYSTEM_HREF} />

      <section
        id="about"
        className="py-16 px-6 scroll-mt-24 bg-[#f5f9fb]/70 dark:bg-slate-950/60 border-y border-[#d8e8ee] dark:border-white/5"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-600 dark:text-slate-300">
              WORKING_PROFILE
            </p>
            <h2 className="text-3xl md:text-4xl font-outfit font-semibold text-ink-navy dark:text-white">
              About Me
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              I&apos;m a systems-minded technical operator who likes turning ambiguity into
              structure. My work connects forward deployed engineering, solutions architecture,
              spatial systems, customer support, and AI-assisted development.
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

          <article className="rounded-2xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd]/95 dark:bg-slate-900/70 p-6 shadow-[0_6px_20px_rgba(15,23,42,0.06)] space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
              PROFILE_SIGNAL
            </p>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li>Systems thinker</li>
              <li>Technical translator</li>
              <li>GIS + workflow builder</li>
              <li>QA-minded operator</li>
            </ul>
            <div className="h-px w-full bg-[#e5e0d6] dark:bg-white/10" />
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="font-semibold uppercase tracking-[0.16em]">Working style:</span>{' '}
              Structured · Curious · Practical · Documentation-first
            </p>
          </article>
        </div>
      </section>

      <SupportingEvidenceSection />

      <section className="py-16 px-6 bg-[#f5f9fb] dark:bg-slate-950 border-y border-[#d8e8ee] dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-600 dark:text-slate-300 font-bold">
              ROLE_LENSES
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-outfit font-semibold text-ink-navy dark:text-white">
              Explore by role lens
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300">
              Optional — the same work, filtered to how a specific role evaluates it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {roleTrackCards.map((track) => (
              <Link
                key={track.href}
                to={track.href}
                aria-label={`Open ${track.title} track`}
                className={`group block w-full focus:outline-none focus-visible:ring-2 ${track.focusClass}`}
              >
                <article className="relative h-full overflow-hidden rounded-2xl border border-[#d8e8ee] dark:border-white/10 bg-white/95 dark:bg-slate-900/75 p-5 md:p-6 pl-7 md:pl-8 shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
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
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-outfit font-semibold text-ink-navy dark:text-white">
                        {track.title}
                      </h3>
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

      {/* Deep Dives Feature Block */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 font-bold">
              DEEP_DIVES
            </span>
            <h2 className="text-3xl font-outfit font-extrabold text-ink-navy dark:text-white">
              Process, Governance &amp; Strategy
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Go beyond the final products to explore the strategic decisions, architectural
              trade-offs, and automated review systems that shape this portfolio. Learn how advanced
              AI workflow orchestration and rigorous validation frameworks guarantee system
              reliability.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:justify-end">
            <Link
              to="/deep-dives?tab=process"
              className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              Process &amp; Governance Deep Dive <span>→</span>
            </Link>
            <Link
              to="/deep-dives?tab=luxe-lofts"
              className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Luxe Lofts Redesign Strategy <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 scroll-mt-24 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-tide-aqua dark:text-tide-aqua uppercase tracking-[0.3em]">
                EXPERIENCE_LOG
              </h2>
              <h3 className="text-3xl md:text-4xl font-outfit font-semibold text-ink-navy dark:text-white">
                Career Experience
              </h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 max-w-md leading-relaxed">
              Relevant experience across forward deployed engineering, spatial systems operations,
              workflow delivery, customer support, and validation-heavy production environments.
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
                className="glass-card p-8 rounded-3xl border border-[#d8e8ee] dark:border-white/10 shadow-sm scroll-mt-28"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-2xl font-outfit font-bold text-ink-navy dark:text-white">
                      {exp.role}
                    </h4>
                    <p className="text-lg text-slate-500 dark:text-slate-300 flex items-center gap-2 mt-1 font-medium">
                      {exp.company}
                    </p>
                    {exp.tools && (
                      <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-tide-aqua dark:text-tide-sky opacity-80">
                        {exp.tools}
                      </p>
                    )}
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium shrink-0 border border-black/5 dark:border-white/5">
                    {exp.period}
                  </span>
                </div>
                <ul className="grid md:grid-cols-2 gap-4">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 bg-tide-aqua/50 dark:bg-tide-aqua/50 rounded-full shrink-0"></span>
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
        className="py-20 px-6 scroll-mt-24 transition-colors duration-500 bg-[#f5f9fb]/70 dark:bg-slate-950/60"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 space-y-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-600 dark:text-slate-300">
              CAPABILITY_MATRIX
            </h2>
            <h3 className="text-3xl md:text-4xl font-outfit font-semibold text-ink-navy dark:text-white">
              Skills &amp; Technologies
            </h3>
            <p className="max-w-2xl text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Grouped by role relevance, with proof links where available.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div
              id="skills-inspector"
              aria-live="polite"
              className="lg:col-span-5 lg:order-2 h-fit lg:sticky lg:top-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm"
            >
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                Inspector Panel
              </p>
              <h4 className="text-xl font-outfit font-semibold text-ink-navy dark:text-white">
                {activeSkill ? activeSkill.name : 'Skill Inspector'}
              </h4>
              {activeSkill?.lane && (
                <p className="inline-flex rounded-md border border-tide-aqua/30 dark:border-tide-sky/40 bg-tide-aqua/10 dark:bg-tide-sky/10 px-2.5 py-1 text-xs font-semibold text-[#237f86] dark:text-tide-sky">
                  {activeSkill.lane}
                </p>
              )}
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {activeSkill
                  ? activeSkill.description
                  : 'Select a skill from the matrix to view its operational definition and portfolio use case.'}
              </p>
              {activeSkill && (
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {activeSkillEvidence.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Evidence:
                      </p>
                      <ul className="space-y-1.5">
                        {activeSkillEvidence.map((item) => (
                          <li key={item.href} className="flex items-center text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-tide-aqua mr-2 shrink-0"></span>
                            <Link
                              to={item.href}
                              className="font-medium text-[#237f86] dark:text-tide-sky hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua rounded-sm"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {chipConfig?.evidenceNote && (
                    <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3.5 border border-slate-200/50 dark:border-slate-800 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      <span className="font-semibold block text-slate-700 dark:text-slate-300 mb-1">
                        Operational Context &amp; Evidence:
                      </span>
                      {chipConfig.evidenceNote}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="lg:col-span-7 lg:order-1">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                <div
                  role="tablist"
                  aria-label="Skill groups"
                  className="flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-800 p-2 scrollbar-hide"
                >
                  {SKILL_GROUPS.map((group, idx) => {
                    const selected = idx === activeGroupIndex;
                    return (
                      <button
                        key={group.category}
                        type="button"
                        role="tab"
                        id={`skill-tab-${idx}`}
                        aria-selected={selected}
                        aria-controls={`skill-panel-${idx}`}
                        onClick={() => setActiveGroupIndex(idx)}
                        className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs md:text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua ${selected ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                      >
                        {group.category}
                      </button>
                    );
                  })}
                </div>

                {SKILL_GROUPS.map((group, idx) => (
                  <div
                    key={group.category}
                    role="tabpanel"
                    id={`skill-panel-${idx}`}
                    aria-labelledby={`skill-tab-${idx}`}
                    hidden={idx !== activeGroupIndex}
                    className="p-6 space-y-4"
                  >
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {group.description}
                    </p>
                    <div className="flex flex-wrap items-start content-start gap-2">
                      {group.items.map((skill) => {
                        const skillChip = SKILL_CHIP_CONFIG[skill.name];
                        const titleText = skillChip?.evidenceNote;
                        const isActive = activeSkillName === skill.name;

                        return (
                          <button
                            key={skill.name}
                            type="button"
                            onClick={() => setActiveSkillName(skill.name)}
                            title={titleText}
                            aria-pressed={isActive}
                            aria-controls="skills-inspector"
                            className={`h-8 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors active:scale-[0.99] focus:outline-none focus-visible:ring-2 ${getCategoryColorClass(group.category)} ${isActive ? 'border-tide-aqua dark:border-tide-sky ring-1 ring-tide-aqua/60 dark:ring-tide-sky/50' : ''}`}
                          >
                            {/* Fixed-width slot keeps chip width identical active/inactive (no reflow) */}
                            <span
                              aria-hidden="true"
                              className={`grid w-3 place-items-center text-[10px] leading-none ${isActive ? 'opacity-100' : 'opacity-0'}`}
                            >
                              ✓
                            </span>
                            <span className="sr-only">
                              {isActive ? 'Active skill:' : 'Activate skill:'}
                            </span>
                            <span>{skill.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section
        id="foundation"
        className="py-24 px-6 scroll-mt-24 transition-colors duration-500 border-t border-[#e5e0d6]/60 dark:border-white/5 bg-slate-50/30 dark:bg-slate-950/20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-14 space-y-3 animate-fade-in-up">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-600 dark:text-slate-300">
              Academic & Professional Foundation
            </p>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-ink-navy dark:text-white">
              Education & Certifications
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Rigorous academic credentials combined with verified, industry-standard professional
              certifications in AI application, systems QA, data governance, and intercultural
              competence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Education Card */}
            <div
              className="lg:col-span-1 flagship-sheen-card animate-fade-in-up rounded-3xl border border-[#d8e8ee] dark:border-white/10 bg-white/95 dark:bg-slate-900/70 p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:shadow-none flex flex-col justify-between"
              style={{ animationDelay: '100ms' }}
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
                      Higher Education
                    </p>
                    <h3 className="text-2xl font-outfit font-bold text-ink-navy dark:text-white mt-1">
                      B.A., Geography
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20 dark:border-rose-500/30 shrink-0">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <circle cx="12" cy="11" r="3" />
                      <path d="M12 2v20" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-outfit font-medium text-[#237f86] dark:text-tide-sky">
                    Queen&#39;s University
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    A rigorous academic foundation analyzing spatial patterns, data correlations,
                    and regional systems dynamics.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Relevant Focus Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30">
                    Geographic Information Science (GIS)
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30">
                    Data Analytics
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border bg-tide-aqua/10 text-[#237f86] border-tide-aqua/20 dark:bg-tide-aqua/20 dark:text-tide-sky dark:border-tide-aqua/30">
                    Project Management
                  </span>
                </div>
              </div>
            </div>

            {/* Certifications Sub-Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, idx) => {
                const config = getCertConfig(cert.issuer, cert.name);
                return (
                  <div
                    key={idx}
                    className={`flagship-sheen-card animate-fade-in-up flex flex-col justify-between rounded-2xl border border-[#d8e8ee] dark:border-white/10 bg-white/95 dark:bg-slate-900/70 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)] dark:shadow-none hover:translate-y-[-2px] transition-all cursor-default ${config.hoverGlow}`}
                    style={{ animationDelay: `${(idx + 2) * 80}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${config.bgClass}`}
                      >
                        {config.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-outfit font-bold text-ink-navy dark:text-white text-sm md:text-base leading-snug line-clamp-2">
                          {cert.name}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        Verified Credential
                      </span>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Active
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;
