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
import { getProjectMetadata, PROJECT_METADATA } from '../data/projectMetadata';
import ScrollToTopButton from '../components/ScrollToTopButton';

const ACCENT_STYLES = {
  aqua: 'border-tide-aqua/40 bg-tide-aqua/10 text-[#237f86]',
  blue: 'border-tide-blue/40 bg-tide-blue/10 text-[#2a77a8]',
  cyan: 'border-tide-cyan/40 bg-tide-cyan/10 text-[#237f86]',
  slate: 'border-slate-300/70 bg-slate-50 text-slate-700',
  gold: 'border-gild/50 bg-gild-soft/20 text-gild-deep',
} as const;

const ProjectSwitcher: React.FC<{ activeId: string }> = ({ activeId }) => {
  const orderedProjects = [...PROJECT_METADATA].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        Related Projects
      </p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">Project Switcher</h3>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {orderedProjects.map((project) => {
          const isActive = project.id === activeId;
          return (
            <Link
              key={project.id}
              to={project.href}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Open project: ${project.displayTitle}`}
              className={`rounded-xl border p-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 ${isActive ? 'border-slate-900 bg-slate-100' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-900">{project.displayTitle}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {isActive
                    ? 'Current Project'
                    : project.hierarchy === 'featured'
                      ? 'Featured'
                      : 'Supporting'}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600">{project.shortSummary}</p>
            </Link>
          );
        })}
      </div>
    </section>
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

  const accentStyle = ACCENT_STYLES[metadata.accent];

  return (
    <section className="pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <Link
              to="/projects"
              className="text-slate-700 hover:text-slate-900 focus-visible:ring-2 ring-slate-500 rounded"
            >
              ← Back to Projects
            </Link>
            <Link
              to={PORTFOLIO_PROCESS_HREF}
              className="text-slate-600 hover:text-slate-900 focus-visible:ring-2 ring-slate-500 rounded"
            >
              View Process Deep Dives
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${accentStyle}`}
            >
              {metadata.proofType}
            </span>
            <h1 className="text-3xl font-bold text-slate-900">{metadata.displayTitle}</h1>
            <p className="max-w-3xl text-slate-600">{metadata.shortSummary}</p>
            <div className="flex flex-wrap gap-2">
              {metadata.roleLanes.map((lane) => (
                <span
                  key={lane}
                  className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {lane}
                </span>
              ))}
              {metadata.featuredLabel && (
                <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {metadata.featuredLabel}
                </span>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/projects"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 focus-visible:ring-2 ring-slate-500"
            >
              View Projects Library
            </Link>
            <Link
              to={PORTFOLIO_PROCESS_HREF}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 focus-visible:ring-2 ring-slate-500"
            >
              View Process Deep Dives
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 focus-visible:ring-2 ring-slate-500"
            >
              Contact Kyle
            </button>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-[#f8fbfd] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Project Overview
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">What this proves</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-slate-500">Role relevance</p>
              <p className="text-sm text-slate-700">{metadata.roleLanes.join(' • ')}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-500">Proof type</p>
              <p className="text-sm text-slate-700">{metadata.proofType}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-500">Key capabilities</p>
              <p className="text-sm text-slate-700">{activeProject.tags.join(', ')}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-500">Why it matters</p>
              <p className="text-sm text-slate-700">{activeProject.rationale}</p>
            </div>
          </div>
        </section>

        <ProjectSwitcher activeId={activeProjectId} />

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
              <MarkdownSection
                content={isRecruiterMode ? recruiterSummary(activeProject) : cleanContent}
                isLoading={contentLoading}
              />
            </section>

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
      <ScrollToTopButton />
    </section>
  );
};

export default ProjectDetailView;
