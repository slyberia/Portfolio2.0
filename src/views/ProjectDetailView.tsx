import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MarkdownSection from '../components/MarkdownSection';
import ErrorBoundary from '../components/ErrorBoundary';
import { PROJECT_REGISTRY } from '../constants';
import {
  RigorCard,
  HtmlPreviewCard,
  ArtifactGallery,
  TradeoffLog,
} from '../components/CaseStudyComponents';
import { useCaseStudyContent } from '../hooks/useCaseStudyContent';
import { useRecruiterMode } from '../context/RecruiterModeContext';
import { recruiterSummary } from '../utils/recruiterSummary';
import { PROJECT_FALLBACK_ID, DEEP_DIVES_HREF } from '../lib/routes';
import {
  CANONICAL_ROLE_ACCENT,
  getProjectMetadata,
  PROJECT_METADATA,
} from '../data/projectMetadata';
import { OperationalTriageSimulator } from '../components/ops-triage/OperationalTriageSimulator';
import ScrollToTopButton from '../components/ScrollToTopButton';
import {
  componentRecipes,
  getProjectAccentRecipe,
  getRoleAccentRecipe,
  semanticTokens,
} from '../lib/design-system';

const ProjectSwitcher: React.FC<{ activeId: string }> = ({ activeId }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const orderedProjects = [...PROJECT_METADATA]
    .filter((project) => (project.visibility ?? 'public') === 'public')
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const featured = orderedProjects.filter((project) => project.hierarchy === 'featured');
  const supporting = orderedProjects.filter((project) => project.hierarchy === 'supporting');

  const renderProjectLink = (project: (typeof PROJECT_METADATA)[number]) => {
    const isActive = project.id === activeId;
    return (
      <Link
        key={project.id}
        to={project.href}
        aria-current={isActive ? 'page' : undefined}
        aria-label={`Open project: ${project.displayTitle}`}
        className={`block rounded-xl border px-3 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 ${
          isActive
            ? 'border-slate-900 bg-slate-100 text-slate-900 dark:border-tide-softBlue dark:bg-tide-softBlue/15 dark:text-white'
            : 'border-slate-300/90 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-white/20 dark:hover:bg-slate-900'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-semibold leading-snug">{project.displayTitle}</span>
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              isActive
                ? 'border-slate-700/30 bg-slate-900/10 text-slate-700 dark:border-tide-softBlue/40 dark:bg-tide-softBlue/20 dark:text-tide-sky'
                : 'border-slate-300 text-slate-600 dark:border-white/20 dark:text-slate-300'
            }`}
          >
            {isActive ? 'Current' : project.hierarchy === 'featured' ? 'Featured' : 'Supporting'}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300/90">{project.shortSummary}</p>
      </Link>
    );
  };

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:hidden dark:border-white/10 dark:bg-slate-900/70">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">
          Project Navigation
        </p>
        <div className="mt-3 overflow-x-auto">
          <div className="flex min-w-max gap-2 pb-1">
            {orderedProjects.map((project) => {
              const isActive = project.id === activeId;
              return (
                <Link
                  key={project.id}
                  to={project.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white dark:border-tide-softBlue dark:bg-tide-softBlue/25 dark:text-white'
                      : 'border-slate-300 bg-white text-slate-700 dark:border-white/15 dark:bg-slate-900 dark:text-slate-200'
                  }`}
                >
                  {project.displayTitle}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <aside className="sticky top-24 hidden self-start rounded-2xl border border-slate-200 bg-white p-4 lg:block dark:border-white/10 dark:bg-slate-900/70">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300">
            Project Navigation
          </p>
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-expanded={!isCollapsed}
            aria-controls="project-navigation-list"
            className="flex items-center gap-1 rounded-md border border-slate-300 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:border-white/20 dark:text-slate-300 dark:hover:border-white/30 dark:hover:bg-white/5"
          >
            <span
              aria-hidden="true"
              className={`transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
            >
              ▾
            </span>
            {isCollapsed ? 'Show' : 'Hide'}
          </button>
        </div>
        {!isCollapsed && (
          <div id="project-navigation-list" className="mt-4 space-y-4">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                Featured
              </p>
              <div className="space-y-2">{featured.map(renderProjectLink)}</div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                Supporting
              </p>
              <div className="space-y-2">{supporting.map(renderProjectLink)}</div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

const ProjectHero: React.FC<{
  activeProjectTags: string[];
  metadata: NonNullable<ReturnType<typeof getProjectMetadata>>;
}> = ({ activeProjectTags, metadata }) => {
  const accentStyle = getProjectAccentRecipe(metadata.accent);

  const deepDiveInfo = React.useMemo(() => {
    if (metadata.id === 'luxe-lofts') {
      return {
        href: `${DEEP_DIVES_HREF}?tab=luxe-lofts`,
        label: 'View Strategic Deep Dive',
      };
    }
    if (metadata.id === 'ops-triage') {
      return {
        href: `${DEEP_DIVES_HREF}?tab=process`,
        label: 'View Process Deep Dive',
      };
    }
    if (metadata.id === 'northern-grind') {
      return {
        href: `${DEEP_DIVES_HREF}?tab=northern-grind`,
        label: 'View Business Systems Deep Dive',
      };
    }
    return {
      href: `${DEEP_DIVES_HREF}?tab=process`,
      label: 'View Process Deep Dive',
    };
  }, [metadata.id]);

  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/70">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="space-y-3">
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${accentStyle.chipClass}`}
          >
            {metadata.featuredLabel ?? metadata.statusLabel}
          </span>
          <h1 className={`text-3xl font-bold ${semanticTokens.text.heading}`}>
            {metadata.displayTitle}
          </h1>
          <p className="max-w-3xl text-slate-700 dark:text-slate-200">{metadata.shortSummary}</p>
          <div className="flex flex-wrap gap-2">
            {metadata.canonicalRoleLanes.map((lane) => (
              <span
                key={lane}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getRoleAccentRecipe(CANONICAL_ROLE_ACCENT[lane]).chipClass}`}
              >
                {lane}
              </span>
            ))}
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Capabilities:</span> {activeProjectTags.join(' • ')}
          </p>
        </div>
        <div className="flex min-w-[220px] flex-col gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${componentRecipes.button.primary}`}
          >
            Contact Kyle
          </button>
          <Link
            to="/projects"
            className="rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-medium text-slate-800 hover:bg-slate-50 focus-visible:ring-2 ring-slate-500 dark:border-white/20 dark:text-slate-100 dark:hover:bg-white/5"
          >
            View Project Library
          </Link>
          <Link
            to={deepDiveInfo.href}
            className="rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:ring-2 ring-slate-500 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/5"
          >
            {deepDiveInfo.label}
          </Link>
          <Link
            to="/projects"
            className="text-xs font-medium text-slate-600 hover:text-slate-900 focus-visible:ring-2 ring-slate-500 rounded dark:text-slate-300 dark:hover:text-white"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </header>
  );
};

const ProjectDetailView: React.FC = () => {
  const { projectId, studyId } = useParams<{ projectId?: string; studyId?: string }>();
  const { isRecruiterMode } = useRecruiterMode();
  const activeProjectId = projectId ?? studyId ?? PROJECT_FALLBACK_ID;

  const activeProject = PROJECT_REGISTRY.find((s) => s.id === activeProjectId);
  const metadata = getProjectMetadata(activeProjectId);
  const { content: fetchedContent, isLoading: contentLoading } =
    useCaseStudyContent(activeProjectId);
  const displayContent = fetchedContent;

  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'tradeoffs' | 'proofs'>(
    'overview',
  );

  React.useEffect(() => {
    setActiveTab('overview');
  }, [activeProjectId]);

  const cleanContent = React.useMemo(() => {
    if (!displayContent || !metadata) return displayContent;
    const escaped = metadata.displayTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const titleMatch = new RegExp(`^#\\s+${escaped}\\s*\\n+`, 'i');
    return displayContent.replace(titleMatch, '');
  }, [displayContent, metadata]);

  if (!activeProject || !metadata) {
    return (
      <section className="pt-28 pb-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          Project not found.
        </div>
      </section>
    );
  }

  // The Interactive Proofs tab only earns a slot when it has a live proof to show: the
  // ops-triage simulator or the digital-twin agent. Otherwise it renders blank, so we drop it.
  const hasInteractiveProofs =
    activeProjectId === 'ops-triage' || activeProjectId === 'digital-twin';

  const tabsList: { id: 'overview' | 'architecture' | 'tradeoffs' | 'proofs'; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'Architecture & Strategy' },
    { id: 'tradeoffs', label: 'Decisions & Trade-offs' },
    ...(hasInteractiveProofs ? [{ id: 'proofs' as const, label: 'Interactive Proofs' }] : []),
  ];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabsList.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabsList.length) % tabsList.length;
    } else {
      return;
    }
    e.preventDefault();
    const nextTab = tabsList[nextIndex].id;
    setActiveTab(nextTab);
    const button = document.getElementById(`tab-${nextTab}`);
    if (button) button.focus();
  };

  return (
    <section className="pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <ProjectSwitcher activeId={activeProjectId} />
        <div className="space-y-6">
          <ProjectHero activeProjectTags={activeProject.tags} metadata={metadata} />

          <div className="border-b border-slate-200 dark:border-slate-800">
            <div
              className="flex gap-6 overflow-x-auto"
              role="tablist"
              aria-label="Project Details Navigation"
            >
              {tabsList.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`py-3 border-b-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua whitespace-nowrap ${
                      isActive
                        ? 'border-gild text-gild font-semibold'
                        : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <ErrorBoundary location="Project Detail">
            <div className="space-y-8">
              {activeTab === 'overview' && (
                <div
                  role="tabpanel"
                  id="panel-overview"
                  aria-labelledby="tab-overview"
                  className="space-y-8 focus:outline-none"
                >
                  {activeProject.rigor && (
                    <section>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Project Proof Summary
                      </p>
                      <RigorCard rigor={activeProject.rigor} className="mb-0" />
                    </section>
                  )}

                  <section>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      Project Detail
                    </p>
                    {!isRecruiterMode && !contentLoading && !cleanContent ? (
                      <div
                        data-testid="case-study-empty"
                        className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300"
                      >
                        <p className="font-medium text-slate-800 dark:text-slate-100">
                          The full write-up for this project isn’t available right now.
                        </p>
                        <p className="mt-2">
                          Explore the proof summary and architecture artifacts above, or{' '}
                          <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                            className="font-semibold text-tide-aqua hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
                          >
                            contact Kyle
                          </button>{' '}
                          for the details.
                        </p>
                      </div>
                    ) : (
                      <ErrorBoundary
                        location="Project Detail Markdown"
                        rawContent={
                          isRecruiterMode ? recruiterSummary(activeProject) : cleanContent
                        }
                      >
                        <MarkdownSection
                          content={isRecruiterMode ? recruiterSummary(activeProject) : cleanContent}
                          isLoading={contentLoading}
                        />
                      </ErrorBoundary>
                    )}
                  </section>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div
                  role="tabpanel"
                  id="panel-architecture"
                  aria-labelledby="tab-architecture"
                  className="space-y-8 focus:outline-none"
                >
                  {activeProject.heroArtifact && (
                    <section>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Primary Architecture Artifact
                      </p>
                      <HtmlPreviewCard
                        content={activeProject.heroArtifact.content as string}
                        label={activeProject.heroArtifact.label}
                        description={activeProject.heroArtifact.description}
                        isHero={true}
                        accentColor={activeProject.id === 'luxe-lofts' ? 'red' : 'indigo'}
                        iframeUrl={activeProject.heroArtifact.iframeUrl}
                      />
                    </section>
                  )}
                  {activeProject.artifacts && activeProject.artifacts.length > 0 ? (
                    <section>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Supporting Deliverables
                      </p>
                      <ArtifactGallery artifacts={activeProject.artifacts} />
                    </section>
                  ) : (
                    !activeProject.heroArtifact && (
                      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-white/10 dark:bg-slate-900/70">
                        No architectural diagrams or mockups logged for this project.
                      </div>
                    )
                  )}
                </div>
              )}

              {activeTab === 'tradeoffs' && (
                <div
                  role="tabpanel"
                  id="panel-tradeoffs"
                  aria-labelledby="tab-tradeoffs"
                  className="space-y-8 focus:outline-none"
                >
                  {activeProject.constraints && activeProject.constraints.length > 0 ? (
                    <section>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Decision Journal
                      </p>
                      <TradeoffLog constraints={activeProject.constraints} />
                    </section>
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-white/10 dark:bg-slate-900/70">
                      <p className="font-semibold text-slate-900 dark:text-white mb-2">
                        Decision Journal Empty
                      </p>
                      <p className="text-sm">
                        This supporting project represents direct systems implementation without
                        active multi-stage trade-off constraints.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'proofs' && (
                <div
                  role="tabpanel"
                  id="panel-proofs"
                  aria-labelledby="tab-proofs"
                  className="space-y-8 focus:outline-none"
                >
                  {activeProjectId === 'ops-triage' && (
                    <section className="space-y-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Live Operational Simulator
                      </p>
                      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/70 space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-ink-navy dark:text-white mb-2">
                            Operational Triage Console
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
                            This interactive dashboard models the real-world operational triage
                            controls built for the system turnaround. Adjust the Policy Slider to
                            explore how the tradeoff decisions between raw pipeline throughput and
                            quality assurance affect first-pass yield, incident leakage, unprocessed
                            backlog capacity, and SLA risk.
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                          <OperationalTriageSimulator />
                        </div>
                      </div>
                    </section>
                  )}

                  {activeProjectId === 'digital-twin' && (
                    <section className="space-y-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-tide-aqua">
                        Interactive Live Agent
                      </p>
                      <div className="rounded-2xl border border-tide-aqua/20 bg-tide-aqua/5 p-6 dark:border-tide-aqua/30 dark:bg-tide-aqua/10 space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-ink-navy dark:text-white mb-2">
                            Digital Twin Assistant
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl mb-4">
                            Engage with the Digital Twin directly. This custom AI assistant
                            leverages Gemini with strict system instructions and portfolio-specific
                            context. It demonstrates prompt engineering, context boundary
                            enforcement, and safe fallback orchestration.
                          </p>
                          <button
                            onClick={() => {
                              window.dispatchEvent(
                                new CustomEvent('open-digital-twin', {
                                  detail: {
                                    source: 'general',
                                    starterPrompt:
                                      "Hi! I'm Kyle's Digital Twin. Let's discuss my implementation details or test my guardrails.",
                                    modeLabel: 'Interactive Proof Mode',
                                  },
                                }),
                              );
                            }}
                            className="inline-flex items-center gap-2 rounded-xl bg-tide-aqua px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-tide-sky hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-tide-aqua focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            Launch Interactive Proof
                          </button>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>
          </ErrorBoundary>
        </div>
      </div>
      <ScrollToTopButton />
    </section>
  );
};

export default ProjectDetailView;
