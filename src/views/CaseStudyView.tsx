import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownSection from '../components/MarkdownSection';
import ErrorBoundary from '../components/ErrorBoundary';
import { CASE_STUDY_REGISTRY } from '../constants';
import { CaseStudyCategory } from '../types';
import {
  RigorCard,
  HtmlPreviewCard,
  ArtifactGallery,
  TradeoffLog,
} from '../components/CaseStudyComponents';
import { generateSpeech } from '../geminiService';
import { decode, decodeAudioData } from '../utils/audioUtils';
import { useCaseStudyContent } from '../hooks/useCaseStudyContent';
import { useRecruiterMode } from '../context/RecruiterModeContext';
import { readingTime } from '../utils/readingTime';
import { recruiterSummary } from '../utils/recruiterSummary';
import { CATEGORY_COLORS } from '../constants/categories';

const CATEGORY_LABELS: Record<CaseStudyCategory, string> = {
  'ai-ops': 'AI Ops',
  'qa-data': 'QA & Data',
  'success-strategy': 'Strategy',
  creative: 'Creative',
};

// Define the "Forced Path" sequence explicitly
const SEQUENCE_ORDER = [
  'prompter-hub', // Step 1
  'project-aegis', // Step 2
  'ops-triage', // Step 3
  'nba-systems-qa',
  'luxe-lofts',
];

const PATH_INDICATORS: Record<string, { step: number; label: string }> = {
  'prompter-hub': { step: 1, label: 'Middleware' },
  'project-aegis': { step: 2, label: 'Governance' },
  'ops-triage': { step: 3, label: 'Scale & QA' },
};

const EvidenceMap: React.FC<{ activeId: string; onSelect: (id: string) => void }> = ({
  activeId,
  onSelect,
}) => {
  return (
    <div className="glass-card p-6 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
      {/* Header / Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div>
            <h3 className="font-outfit font-bold text-navy-900 dark:text-white text-sm uppercase tracking-wide">
              Evidence Map
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Select a node to navigate the system.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span>Recommended Path</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-slate-400"></span>
            <span>Supplemental</span>
          </div>
        </div>
      </div>

      {/* The Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {SEQUENCE_ORDER.map((id, _index) => {
          const study = CASE_STUDY_REGISTRY.find((s) => s.id === id);
          if (!study) return null;

          const isPath = PATH_INDICATORS[id];
          const isActive = activeId === id;

          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`relative p-3 rounded-xl border text-left transition-all duration-300 group hover:-translate-y-1 ${
                isActive
                  ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-500/20 z-10 scale-105'
                  : isPath
                    ? 'bg-white/80 dark:bg-white/5 border-indigo-500/20 hover:border-indigo-500/50'
                    : 'bg-transparent border-black/5 dark:border-white/5 hover:bg-white/5'
              }`}
            >
              {/* Badge */}
              <div className="flex justify-between items-start mb-2">
                {isPath ? (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                      isActive
                        ? 'bg-white/20 text-white border-transparent'
                        : 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30'
                    }`}
                  >
                    STEP 0{isPath.step}
                  </span>
                ) : (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                      isActive
                        ? 'bg-white/20 text-white border-transparent'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-black/5 dark:border-white/5'
                    }`}
                  >
                    {CATEGORY_LABELS[study.category].split(' ')[0]}
                  </span>
                )}

                {isActive && (
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></span>
                )}
              </div>

              {/* Title */}
              <div
                className={`font-outfit font-bold text-xs leading-tight mb-1 ${
                  isActive
                    ? 'text-white'
                    : 'text-navy-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                }`}
              >
                {study.title
                  .replace('Prompter Hub V9', 'Prompter Hub')
                  .replace('Project Aegis Protocol', 'Project Aegis')}
              </div>

              {/* Sublabel */}
              <div
                className={`text-[9px] leading-tight truncate ${
                  isActive ? 'text-indigo-200' : 'text-slate-400'
                }`}
              >
                {isPath ? isPath.label : study.rationale.split(' ')[0] + '...'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const CaseStudyView: React.FC = () => {
  const { studyId } = useParams<{ studyId: string }>();
  const navigate = useNavigate();
  const { isRecruiterMode } = useRecruiterMode();

  const activeStudyId = studyId ?? CASE_STUDY_REGISTRY[0].id;

  const [activeFilter, setActiveFilter] = useState<CaseStudyCategory | 'all'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isGlowActive, setIsGlowActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceError, setVoiceError] = useState(false);

  const { content: fetchedContent, isLoading: contentLoading } = useCaseStudyContent(activeStudyId);

  useEffect(() => {
    setIsGlowActive(true);
    setVoiceError(false);
    const timer = setTimeout(() => setIsGlowActive(false), 2000);
    return () => clearTimeout(timer);
  }, [activeStudyId]);

  const filteredStudies = useMemo(() => {
    if (activeFilter === 'all') return CASE_STUDY_REGISTRY;
    return CASE_STUDY_REGISTRY.filter((s) => s.category === activeFilter);
  }, [activeFilter]);

  const activeStudy = CASE_STUDY_REGISTRY.find((s) => s.id === activeStudyId);

  // Use fetched content when available, fall back to in-memory content
  const displayContent = fetchedContent || activeStudy?.content || '';

  const handleStudyChange = (id: string) => {
    navigate(`/case-studies/${id}`);
  };

  const handleVoiceBrief = async () => {
    if (!activeStudy || isSpeaking) return;
    setIsSpeaking(true);
    setVoiceError(false);

    try {
      const summary = `Case Study: ${activeStudy.title}. Rationale: ${activeStudy.rationale}. Key methodology: ${activeStudy.rigor?.method || 'Operational excellence and system design'}. This project demonstrates high-fidelity engineering and strategic oversight.`;
      const base64Audio = await generateSpeech(summary);

      if (base64Audio) {
        const AudioContextClass =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
      } else {
        setVoiceError(true);
        setIsSpeaking(false);
      }
    } catch (e) {
      console.error(e);
      setVoiceError(true);
      setIsSpeaking(false);
    }
  };

  return (
    <section className="pt-32 pb-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-slate-500 hover:text-navy-900 dark:hover:text-white transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Overview
          </button>

          {activeStudy && (
            <div className="flex flex-col items-end gap-3">
              <button
                onClick={handleVoiceBrief}
                disabled={isSpeaking}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 font-outfit font-bold text-xs uppercase tracking-widest transition-all hover:bg-indigo-500 hover:text-white shadow-lg shadow-indigo-500/10 active:scale-95 ${isSpeaking ? 'opacity-50 animate-pulse' : ''}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 6V3" />
                  <path d="m4.9 8.9-2.1-2.1" />
                  <path d="M2.5 18h3.7" />
                  <path d="m19.1 8.9 2.1-2.1" />
                  <path d="M15.3 18h6.2" />
                  <path d="m5 18 3.5-3.5L12 18l3.5-3.5L19 18" />
                  <path d="M12 18v3" />
                </svg>
                {isSpeaking ? 'Narrating...' : 'Voice Brief'}
              </button>

              {voiceError && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Voice Brief unavailable in demo mode. Summary shown below.
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className={`grid gap-8 lg:gap-16 items-start transition-all duration-500 ease-in-out ${
            isSidebarOpen
              ? 'md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr]'
              : 'md:grid-cols-[60px_1fr]'
          }`}
        >
          {/* Navigation Rail */}
          <aside className="space-y-6 md:sticky md:top-32 h-fit transition-all duration-500 z-10">
            <div className="flex items-start justify-between">
              <div
                className={`space-y-1 transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}
              >
                <h1 className="text-3xl font-outfit font-bold text-navy-900 dark:text-white whitespace-nowrap">
                  Evidence Hub
                </h1>
                {displayContent && (
                  <p className="text-[11px] text-slate-400 font-medium">
                    {readingTime(displayContent)}
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-500 hover:text-navy-900 dark:hover:text-white transition-all shadow-sm"
              >
                {isSidebarOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m11 17-5-5 5-5" />
                    <path d="m18 17-5-5 5-5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m13 17 5-5-5-5" />
                    <path d="m6 17 5-5-5-5" />
                  </svg>
                )}
              </button>
            </div>

            <div
              className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none absolute'}`}
            >
              <div className="flex flex-wrap gap-1.5 pb-3 mb-1 border-b border-black/5 dark:border-white/5">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${activeFilter === 'all' ? 'bg-navy-900 dark:bg-white text-white dark:text-navy-900 border-transparent' : 'text-slate-400 border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'}`}
                >
                  All
                </button>
                {(Object.keys(CATEGORY_LABELS) as CaseStudyCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${activeFilter === cat ? `${CATEGORY_COLORS[cat]} text-white border-transparent` : 'text-slate-400 border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'}`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
              <div className="grid gap-2 mt-4">
                {filteredStudies.map((study) => (
                  <button
                    key={study.id}
                    onClick={() => handleStudyChange(study.id)}
                    className={`text-left p-5 rounded-2xl transition-all duration-200 border relative overflow-hidden ${activeStudyId === study.id ? 'glass-card border-indigo-500/30 shadow-md' : 'bg-transparent border-black/5 dark:border-white/5 hover:border-indigo-500/20 hover:bg-white/40 dark:hover:bg-white/[0.03]'}`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${activeStudyId === study.id ? CATEGORY_COLORS[study.category] : 'bg-slate-200 dark:bg-slate-800'}`}
                    />
                    <h3
                      className={`font-outfit font-bold text-sm ${activeStudyId === study.id ? 'text-navy-900 dark:text-white' : 'text-slate-500'}`}
                    >
                      {study.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-400 mt-1">{study.rationale}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Content Pipeline */}
          <main className="min-w-0 md:pl-4 border-l border-black/5 dark:border-white/5 relative">
            <div
              className={`absolute -inset-2 bg-indigo-500/5 rounded-[3rem] transition-opacity duration-1000 pointer-events-none border border-indigo-500/10 ${isGlowActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              aria-hidden="true"
            />

            <ErrorBoundary location="Documentation Hub">
              {!activeStudy ? (
                <div className="glass-card p-12 rounded-3xl text-center">
                  <p className="text-slate-500">Selection required.</p>
                </div>
              ) : isRecruiterMode ? (
                /* Recruiter Mode — skim title → structured summary → CTA */
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8 mx-auto w-full max-w-3xl">
                  {/* Skim layer */}
                  <div className="space-y-2 pb-2 border-b border-black/5 dark:border-white/5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white ${CATEGORY_COLORS[activeStudy.category]}`}
                    >
                      {CATEGORY_LABELS[activeStudy.category]}
                    </span>
                    <h2 className="text-2xl font-outfit font-bold text-navy-900 dark:text-white leading-tight">
                      {activeStudy.title}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {activeStudy.rationale}
                    </p>
                  </div>
                  {activeStudy.rigor && <RigorCard rigor={activeStudy.rigor} className="" />}
                  <MarkdownSection content={recruiterSummary(activeStudy)} isLoading={false} />
                  <div className="pt-4">
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-indigo-500/20 group/cta"
                    >
                      Get in Touch
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform"
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
                  </div>
                </div>
              ) : (
                /* Full engineering view — skim → structured → deep validation */
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10 mx-auto w-full max-w-4xl">
                  {/* Layer 1 — Skim summary */}
                  <div className="space-y-3 pb-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white ${CATEGORY_COLORS[activeStudy.category]}`}
                      >
                        {CATEGORY_LABELS[activeStudy.category]}
                      </span>
                      {displayContent && (
                        <span className="text-xs text-slate-400 font-medium">
                          {readingTime(displayContent)}
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-outfit font-bold text-navy-900 dark:text-white leading-tight">
                      {activeStudy.title}
                    </h2>
                    <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                      {activeStudy.rationale}
                    </p>
                    {activeStudy.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeStudy.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-black/5 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Navigation context */}
                  <EvidenceMap activeId={activeStudyId} onSelect={handleStudyChange} />

                  {/* Layer 2 — Structured explanation */}
                  {activeStudy.rigor && <RigorCard rigor={activeStudy.rigor} className="" />}
                  <MarkdownSection content={displayContent} isLoading={contentLoading} />

                  {/* Layer 3 — Deep validation (hero artifact moved below prose) */}
                  {activeStudy.heroArtifact && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] font-outfit">
                          Interactive Artifact
                        </span>
                        <div className="h-px flex-1 bg-black/5 dark:bg-white/5" />
                      </div>
                      <HtmlPreviewCard
                        content={activeStudy.heroArtifact.content as string}
                        label={activeStudy.heroArtifact.label}
                        description={activeStudy.heroArtifact.description}
                        isHero={true}
                        accentColor={activeStudy.id === 'luxe-lofts' ? 'red' : 'indigo'}
                      />
                    </div>
                  )}
                  {activeStudy.artifacts && activeStudy.artifacts.length > 0 && (
                    <ArtifactGallery artifacts={activeStudy.artifacts} />
                  )}
                  {activeStudy.constraints && activeStudy.constraints.length > 0 && (
                    <TradeoffLog constraints={activeStudy.constraints} />
                  )}
                </div>
              )}
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyView;
