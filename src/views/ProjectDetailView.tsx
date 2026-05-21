import React from 'react';
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
import { PROJECT_FALLBACK_ID, PORTFOLIO_PROCESS_HREF } from '../lib/routes';
import {
  CANONICAL_ROLE_ACCENT,
  getProjectMetadata,
  PROJECT_METADATA,
} from '../data/projectMetadata';
import ScrollToTopButton from '../components/ScrollToTopButton';
import {
  componentRecipes,
  getProjectAccentRecipe,
  getRoleAccentRecipe,
  semanticTokens,
} from '../lib/design-system';
import MediaProofGrid from '../components/media/MediaProofGrid';
import { getPublicMediaByProject } from '../data/mediaRegistry';

const ProjectSwitcher: React.FC<{ activeId: string }> = ({ activeId }) => {
  const orderedProjects = [...PROJECT_METADATA].sort((a, b) => a.sortOrder - b.sortOrder);
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
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300">
          Project Navigation
        </p>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Featured
            </p>
            <div className="space-y-2">{featured.map(renderProjectLink)}</div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Supporting
            </p>
            <div className="space-y-2">{supporting.map(renderProjectLink)}</div>
          </div>
        </div>
      </aside>
    </>
  );
};

const ProjectHero: React.FC<{
  activeProjectTags: string[];
  metadata: NonNullable<ReturnType<typeof getProjectMetadata>>;
}> = ({ activeProjectTags, metadata }) => {
  const accentStyle = getProjectAccentRecipe(metadata.accent);
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
            to={PORTFOLIO_PROCESS_HREF}
            className="rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:ring-2 ring-slate-500 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/5"
          >
            View Process Deep Dive
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
  const displayContent = fetchedContent || activeProject?.content || '';

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

  return (
    <section className="pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <ProjectSwitcher activeId={activeProjectId} />
        <div className="space-y-6">
          <ProjectHero activeProjectTags={activeProject.tags} metadata={metadata} />

          <ErrorBoundary location="Project Detail">
            <div className="space-y-8">
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
                <ErrorBoundary
                  location="Project Detail Markdown"
                  rawContent={isRecruiterMode ? recruiterSummary(activeProject) : cleanContent}
                >
                  <MarkdownSection
                    content={isRecruiterMode ? recruiterSummary(activeProject) : cleanContent}
                    isLoading={contentLoading}
                  />
                </ErrorBoundary>
              </section>

              <MediaProofGrid
                title="Visual Proof"
                description={`Visual evidence of implementation for ${metadata.displayTitle}.`}
                assets={getPublicMediaByProject(activeProjectId)}
              />

              {activeProject.heroArtifact && (
                <section>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Project Artifacts
                  </p>
                  <HtmlPreviewCard
                    content={activeProject.heroArtifact.content as string}
                    label={activeProject.heroArtifact.label}
                    description={activeProject.heroArtifact.description}
                    isHero={true}
                    accentColor={activeProject.id === 'luxe-lofts' ? 'red' : 'indigo'}
                  />
                </section>
              )}
              {activeProject.artifacts && activeProject.artifacts.length > 0 && (
                <section>
                  <ArtifactGallery artifacts={activeProject.artifacts} />
                </section>
              )}
              {activeProject.constraints && activeProject.constraints.length > 0 && (
                <section>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Decision Journal
                  </p>
                  <TradeoffLog constraints={activeProject.constraints} />
                </section>
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
