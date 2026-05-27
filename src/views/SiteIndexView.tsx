import React from 'react';
import { Link } from 'react-router-dom';
import {
  GIS_TRACK_HREF,
  GUYNODE_SYSTEM_HREF,
  IMPLEMENTATION_TRACK_HREF,
  PORTFOLIO_PROCESS_HREF,
  QA_TRACK_HREF,
  RESUME_HREF,
  PROJECTS_HREF,
  buildProjectHref,
} from '../lib/routes';
import { getFeaturedProjects, getSupportingProjects } from '../data/projectMetadata';
import ScrollToTopButton from '../components/ScrollToTopButton';

const roleTracks = [
  {
    title: 'Forward Deployed Engineer',
    description:
      'Customer-facing technical delivery, workflow setup, onboarding support, documentation, and implementation planning.',
    href: IMPLEMENTATION_TRACK_HREF,
    accent: 'bg-tide-aqua',
    role: 'Forward Deployed Engineer',
  },
  {
    title: 'Solutions Architect',
    description:
      'Structured testing, issue triage, validation workflows, root-cause analysis, and launch-readiness review.',
    href: QA_TRACK_HREF,
    accent: 'bg-blue-500',
    role: 'Solutions Architect',
  },
  {
    title: 'Spatial Systems Architect',
    description:
      'Spatial data operations, map-based workflows, dataset governance, and GIS system delivery.',
    href: GIS_TRACK_HREF,
    accent: 'bg-tide-cyan',
    role: 'Spatial Systems Architect',
  },
];

const processDeepDives = [
  {
    title: 'Release Ladder',
    description: 'See the phased evolution and release logic of Portfolio2.0.',
    href: '/portfolio2/deep-dive#build-timeline',
  },
  {
    title: 'Decision Blocks',
    description: 'Review architecture and product decisions with tradeoffs and outcomes.',
    href: '/portfolio2/deep-dive#projects-architecture',
  },
  {
    title: 'Architecture & QA',
    description: 'Inspect routing, testing boundaries, and reliability safeguards.',
    href: '/portfolio2/deep-dive#validation-trail',
  },
  {
    title: 'LLM Governance',
    description: 'Understand human review loops, constraints, and AI-use guardrails.',
    href: '/portfolio2/deep-dive#digital-twin-governance',
  },
  {
    title: 'Revision Trail',
    description: 'Trace major revisions and what ambiguity each change resolved.',
    href: '/portfolio2/deep-dive#evidence-ledger',
  },
  {
    title: 'Supporting Artifacts',
    description: 'Open supporting documents and linked proof assets.',
    href: '/portfolio2/deep-dive#remaining-release-hardening',
  },
];

const SiteIndexView: React.FC = () => {
  const featuredSystems = getFeaturedProjects();
  const projects = getSupportingProjects();

  const openContact = () => {
    window.dispatchEvent(new CustomEvent('open-contact'));
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-6 bg-[#f8f7f3] dark:bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-16">
        <section id="site-index-top" className="space-y-5 scroll-mt-24">
          <p className="text-xs font-bold text-tide-aqua uppercase tracking-[0.3em]">SITE_INDEX</p>
          <h1 className="text-4xl sm:text-5xl font-outfit font-extrabold text-navy-900 dark:text-white">
            Portfolio Site Index
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
            A structured map of the portfolio’s role tracks, featured systems, project proof,
            process deep dives, resume, and contact paths.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
            Use this page if you want to quickly find the most relevant proof for a specific role,
            project, or implementation question.
          </p>
        </section>
        <nav aria-label="Jump to section" className="space-y-3">
          <p className="text-xs font-bold text-tide-aqua uppercase tracking-[0.3em]">INDEX_MAP</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              ['Role Tracks', '#role-tracks'],
              ['Featured Systems', '#featured-systems'],
              ['Projects', '#projects'],
              ['Process', '#process-deep-dives'],
              ['Resume / Contact', '#resume-contact'],
              ['Suggested Paths', '#suggested-paths'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full border border-[#d8e8ee] px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <section
          id="role-tracks"
          className="space-y-5 scroll-mt-24"
          aria-labelledby="site-index-role-tracks"
        >
          <h2
            id="site-index-role-tracks"
            className="text-2xl font-outfit font-extrabold text-navy-900 dark:text-white"
          >
            Role Tracks
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {roleTracks.map((track) => (
              <Link
                key={track.title}
                to={track.href}
                className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                  {track.role}
                </span>
                <div className={`h-1 w-14 ${track.accent} rounded mt-2 mb-3`} aria-hidden="true" />
                <h3 className="font-semibold text-navy-900 dark:text-white">{track.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {track.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="featured-systems"
          className="space-y-5 scroll-mt-24"
          aria-labelledby="site-index-featured-systems"
        >
          <h2
            id="site-index-featured-systems"
            className="text-2xl font-outfit font-extrabold text-navy-900 dark:text-white"
          >
            Featured Systems
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredSystems.map((system) => (
              <Link
                key={system.id}
                to={system.href}
                className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
              >
                <h3 className="font-semibold text-navy-900 dark:text-white">
                  {system.displayTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {system.shortSummary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="space-y-5 scroll-mt-24"
          aria-labelledby="site-index-projects"
        >
          <h2
            id="site-index-projects"
            className="text-2xl font-outfit font-extrabold text-navy-900 dark:text-white"
          >
            Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Scannable project proof across implementation, QA, GIS, AI systems, and workflow design.
          </p>
          <div className="mb-2">
            <Link
              to={PROJECTS_HREF}
              className="text-sm font-semibold text-[#237f86] dark:text-tide-softBlue"
            >
              Open full Projects Library
            </Link>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={project.href}
                className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
              >
                <h3 className="font-semibold text-navy-900 dark:text-white">
                  {project.displayTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {project.shortSummary}
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300">
                  Proof Type: {project.proofType}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#237f86] dark:text-tide-softBlue">
                  View Project
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="process-deep-dives"
          className="space-y-5 scroll-mt-24"
          aria-labelledby="site-index-process"
        >
          <h2
            id="site-index-process"
            className="text-2xl font-outfit font-extrabold text-navy-900 dark:text-white"
          >
            Process Deep Dives
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {processDeepDives.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
              >
                <h3 className="font-semibold text-navy-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section
          id="resume-contact"
          className="space-y-5 scroll-mt-24"
          aria-labelledby="site-index-resume-contact"
        >
          <h2
            id="site-index-resume-contact"
            className="text-2xl font-outfit font-extrabold text-navy-900 dark:text-white"
          >
            Resume & Contact
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to={RESUME_HREF}
              className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
            >
              <h3 className="font-semibold text-navy-900 dark:text-white">Resume</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Review the current resume and role-aligned professional summary.
              </p>
            </Link>
            <div className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5">
              <h3 className="font-semibold text-navy-900 dark:text-white">Contact</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Open the contact flow to reach Kyle directly.
              </p>
              <button
                onClick={openContact}
                className="mt-4 inline-flex text-sm font-semibold text-[#237f86] dark:text-tide-softBlue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua rounded"
              >
                Open Contact
              </button>
            </div>
          </div>
        </section>

        <section
          id="suggested-paths"
          className="space-y-5 scroll-mt-24"
          aria-labelledby="site-index-suggested-paths"
        >
          <h2
            id="site-index-suggested-paths"
            className="text-2xl font-outfit font-extrabold text-navy-900 dark:text-white"
          >
            Suggested Paths
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5">
              <h3 className="font-semibold text-navy-900 dark:text-white">
                I’m hiring for Forward Deployed Engineering
              </h3>
              <p className="mt-2">
                <Link to={IMPLEMENTATION_TRACK_HREF} className="underline">
                  Forward Deployed Track
                </Link>{' '}
                →{' '}
                <Link to={GUYNODE_SYSTEM_HREF} className="underline">
                  Guynode
                </Link>{' '}
                →{' '}
                <Link to={buildProjectHref('digital-twin')} className="underline">
                  Digital Twin
                </Link>{' '}
                →{' '}
                <Link to={RESUME_HREF} className="underline">
                  Resume
                </Link>
              </p>
            </div>
            <div className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5">
              <h3 className="font-semibold text-navy-900 dark:text-white">I’m hiring for Solutions Architecture</h3>
              <p className="mt-2">
                <Link to={QA_TRACK_HREF} className="underline">
                  Solutions Architect Track
                </Link>{' '}
                →{' '}
                <Link to={buildProjectHref('digital-twin')} className="underline">
                  Digital Twin QA Scenarios
                </Link>{' '}
                →{' '}
                <Link to={buildProjectHref('ops-triage')} className="underline">
                  Ops Triage
                </Link>{' '}
                →{' '}
                <Link to={buildProjectHref('nba-systems-qa')} className="underline">
                  NBA 2K Systems Analysis
                </Link>
              </p>
            </div>
            <div className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5">
              <h3 className="font-semibold text-navy-900 dark:text-white">I’m hiring for Spatial Systems Architecture</h3>
              <p className="mt-2">
                <Link to={GIS_TRACK_HREF} className="underline">
                  Spatial Systems Track
                </Link>{' '}
                →{' '}
                <Link to={GUYNODE_SYSTEM_HREF} className="underline">
                  Guynode
                </Link>{' '}
                →{' '}
                <Link to={buildProjectHref('ops-triage')} className="underline">
                  Apex / CenterPoint experience
                </Link>{' '}
                →{' '}
                <Link to={RESUME_HREF} className="underline">
                  Resume
                </Link>
              </p>
            </div>
            <div className="rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-[#f8fbfd] dark:bg-slate-900 p-5">
              <h3 className="font-semibold text-navy-900 dark:text-white">
                I want to inspect the build process
              </h3>
              <p className="mt-2">
                <Link to={PORTFOLIO_PROCESS_HREF} className="underline">
                  Process
                </Link>{' '}
                →{' '}
                <a href="/portfolio2/deep-dive#decision-blocks" className="underline">
                  Decision Blocks
                </a>{' '}
                →{' '}
                <a href="/portfolio2/deep-dive#architecture-boundary" className="underline">
                  Architecture & QA
                </a>{' '}
                →{' '}
                <a href="/portfolio2/deep-dive#multi-llm-governance" className="underline">
                  LLM Governance
                </a>
              </p>
            </div>
          </div>
        </section>

        <p className="text-xs text-slate-600 dark:text-slate-300">
          Need another entry point? Return to the{' '}
          <a href="#site-index-top" className="underline">
            Site Index top
          </a>
          .
        </p>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default SiteIndexView;
