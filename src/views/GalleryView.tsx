import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildProjectHref } from '../lib/routes';
import { PROJECT_REGISTRY } from '../constants';
import { HtmlPreviewCard } from '../components/CaseStudyComponents';
import { OperationalTriageSimulator } from '../components/ops-triage/OperationalTriageSimulator';
import { DiagramFull, DiagramThumb } from '../components/gallery/TechnicalDiagrams';
import SegmentedTabs from '../components/SegmentedTabs';

// TS Interfaces
interface TechnicalDiagram {
  id: string;
  title: string;
  type: string;
  description: string;
  diagramType: 'twin' | 'spatial' | 'state';
}

interface LiveProof {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  caseStudyId: string;
  metrics: string[];
  // How the artifact is surfaced: `component` = native React widget rendered inline;
  // `iframe` = live preview embed (launch to interact); `launch` = opens the on-site app.
  embedMode: 'component' | 'iframe' | 'launch';
}

// The former "Creative AI Automation" tab rendered simulated asset previews rather than
// real generated images — removed until genuine creative assets (with provenance) exist.
// See the pending gallery/poster-generator workstream.

const GALLERY_DIAGRAMS: TechnicalDiagram[] = [
  {
    id: 'twin-arch',
    title: 'Digital Twin Integration Architecture',
    type: 'System Flowchart',
    description:
      'Layered architecture for the on-site AI assistant: the React chat widget calls an Express gateway, guardrails screen each message, and only safe prompts reach Gemini 2.5 Flash — whose grounded reply streams back to the browser as chunked HTTP.',
    diagramType: 'twin',
  },
  {
    id: 'spatial-processing',
    title: 'Guynode Governed Spatial Catalog',
    type: 'Data Governance Flow',
    description:
      'Governed spatial-data catalog: fragmented legacy geodata is registered against a type-safe metadata schema, validated by a GeoJSON / SHP / KML format contract, and previewed in-browser with Leaflet before download — deployed on Google Cloud Run.',
    diagramType: 'spatial',
  },
  {
    id: 'triage-state',
    title: 'Ops Triage Simulator Policy Loop',
    type: 'Simulation Control Loop',
    description:
      'Policy-driven triage simulation loop: a throughput-vs-quality stance feeds a 2-second tick engine whose incidents are classified as processed, escalated, or blocked while first-pass yield, backlog, and SLA risk update live.',
    diagramType: 'state',
  },
];

const GALLERY_LIVE_PROOFS: LiveProof[] = [
  {
    id: 'ops-triage-console',
    title: 'Incident Response & Ops Simulation Console',
    subtitle: 'Interactive Triage Sandbox — Runs in This Page',
    description:
      'A fully interactive simulation where you move a policy between throughput and zero-trust validation and watch first-pass yield and backlog respond in real time — the same artifact embedded on the Implementation Consultant lens.',
    tech: ['React State Engine', 'Recharts', 'Tailwind CSS', 'Analytical Logic'],
    caseStudyId: 'ops-triage',
    metrics: ['Real-Time Tick Engine', 'Recharts Data Viz', 'Contextual Alert Tooltips'],
    embedMode: 'component',
  },
  {
    id: 'guynode-hub',
    title: 'Guynode Spatial Data Hub',
    subtitle: 'Live Public Spatial Catalog & Map Viewer',
    description:
      'The redesigned, public-facing spatial data platform: a dataset registry with standardized metadata and an interactive Leaflet map viewer. Preview embeds here; launch to explore the live deployment.',
    tech: ['React', 'Leaflet', 'GeoJSON', 'Cloud Run'],
    caseStudyId: 'guynode',
    metrics: ['Interactive Map Viewer', 'Dataset Registry', 'Metadata-Driven Catalog'],
    embedMode: 'iframe',
  },
  {
    id: 'luxe-lofts-redesign',
    title: 'Luxe Lofts Professional Redesign',
    subtitle: 'Customer Journey & High-Conversion Booking Engine',
    description:
      'A custom-developed professional replacement for the legacy Luxe Lofts brochure site, engineered with high-contrast typography, optimized conversion pathways, and a rate-engine / planning ingress prototype.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    caseStudyId: 'luxe-lofts',
    metrics: ['AAA Typography Contrast', 'Responsive Mobile Grid', 'Interactive Dynamic Flow'],
    embedMode: 'iframe',
  },
  {
    id: 'digital-twin-sandbox',
    title: 'AI Digital Twin Chat Sandbox',
    subtitle: 'Gemini-Powered Professional Persona',
    description:
      "A custom chatbot grounded in Kyle Semple's career history, work samples, and professional philosophy, with scoped guardrails, context triggers, and human-handoff fallback. Launches the on-site chat overlay.",
    tech: ['Gemini API', 'Express.js Node Backend', 'Guardrails', 'Context Injection'],
    caseStudyId: 'digital-twin',
    metrics: [
      'Real-Time Streaming Responses',
      'Custom Bot Guardrails',
      'Context-Triggered Prompts',
    ],
    embedMode: 'launch',
  },
];

const resolveLiveUrl = (caseStudyId: string): string | undefined =>
  PROJECT_REGISTRY.find((project) => project.id === caseStudyId)?.heroArtifact?.iframeUrl;

export const GalleryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diagrams' | 'live'>('diagrams');
  const [selectedDiagram, setSelectedDiagram] = useState<TechnicalDiagram | null>(null);

  // Zoom & Pan state for Diagram Modal
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleOpenDiagram = (diagram: TechnicalDiagram) => {
    setSelectedDiagram(diagram);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleCloseDiagram = () => {
    setSelectedDiagram(null);
  };

  // Zoom helpers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseDiagram();
    };
    if (selectedDiagram) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDiagram]);

  const launchDigitalTwin = () => {
    window.dispatchEvent(
      new CustomEvent('open-digital-twin', {
        detail: {
          source: 'general',
          modeLabel: 'Gallery Sandbox',
          starterPrompt:
            'I found you from the gallery — give me a quick tour of what Kyle can do and where the proof lives.',
        },
      }),
    );
  };

  // Consistent chrome for every interactive artifact; only the `body` (and the Embedded/Launch
  // badge) changes between a native component, a live-preview iframe, and a launch-out card.
  const renderArtifactCard = (proof: LiveProof, body: React.ReactNode) => {
    const isLaunch = proof.embedMode === 'launch';
    const liveUrl = resolveLiveUrl(proof.caseStudyId);
    return (
      <article
        key={proof.id}
        className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] overflow-hidden"
      >
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-ink-navy dark:text-white">{proof.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {proof.subtitle}
              </p>
            </div>
            <span
              className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                isLaunch
                  ? 'border-gild/40 bg-gild/10 text-gild-deep dark:text-gild-soft'
                  : 'border-tide-aqua/40 bg-tide-aqua/10 text-[#237f86] dark:text-tide-sky'
              }`}
            >
              {isLaunch ? 'Launch' : 'Embedded'}
            </span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {proof.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {proof.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[9px] font-mono tracking-wide px-2 py-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="px-6">{body}</div>

        <div className="mt-auto p-6 pt-4 space-y-3">
          <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
              Target Verification Metrics
            </span>
            <ul className="space-y-1">
              {proof.metrics.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300"
                >
                  <span className="w-1 h-1 rounded-full bg-tide-aqua shrink-0"></span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to={buildProjectHref(proof.caseStudyId)}
              className="flex-1 text-center text-xs font-semibold py-2.5 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
            >
              Read Technical Case Study
            </Link>
            {proof.embedMode === 'iframe' && liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-xs font-semibold py-2.5 rounded bg-tide-aqua text-white hover:bg-tide-aqua/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
              >
                Open Full App ↗
              </a>
            )}
          </div>
        </div>
      </article>
    );
  };

  const simulatorProof = GALLERY_LIVE_PROOFS.find((proof) => proof.embedMode === 'component');
  const iframeProofs = GALLERY_LIVE_PROOFS.filter((proof) => proof.embedMode === 'iframe');
  const launchProofs = GALLERY_LIVE_PROOFS.filter((proof) => proof.embedMode === 'launch');

  return (
    <div className="min-h-screen pt-20 pb-20 px-6 bg-[#f5f9fb] dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
            GALLERY_OF_EVIDENCE
          </p>
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-ink-navy dark:text-white">
            Evidence Library
          </h1>
          <p className="text-base text-slate-700 dark:text-slate-200">
            A comprehensive vault of tangible, system-level evidence proving design adherence,
            technical architecture, and product-focused system engineering.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Zoom into interactive PostGIS & node system architectures, or jump directly into live
            sandbox environments proving full stack readiness.
          </p>
        </header>

        {/* Tab switcher */}
        <SegmentedTabs
          tabs={[
            { id: 'diagrams' as const, label: 'Technical Diagrams & Blueprints' },
            { id: 'live' as const, label: 'Live Evidence & Sandboxes' },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
          ariaLabel="Filter evidence type"
          idPrefix="gallery-tab"
        />

        {/* TAB B: TECHNICAL DIAGRAMS & BLUEPRINTS */}
        {activeTab === 'diagrams' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_DIAGRAMS.map((diagram) => (
              <div
                key={diagram.id}
                onClick={() => handleOpenDiagram(diagram)}
                className="group cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] overflow-hidden transition-all duration-300 hover:border-tide-aqua"
              >
                {/* SVG Blueprint Thumbnail */}
                <div className="relative h-48 bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center p-4">
                  <DiagramThumb type={diagram.diagramType} />

                  {/* Zoom Overlay on Hover */}
                  <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-2 text-xs font-semibold py-2 px-4 rounded bg-white text-slate-950">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                      Inspect Blueprint
                    </span>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-5 space-y-2">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                      {diagram.type}
                    </span>
                    <h3 className="text-base font-semibold text-ink-navy dark:text-white mt-0.5">
                      {diagram.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-350 line-clamp-2">
                    {diagram.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB C: LIVE EVIDENCE & INTERACTIVE PROOFS */}
        {activeTab === 'live' && (
          <div className="space-y-8">
            {/* Embed-vs-launch legend */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-tide-aqua/40 bg-tide-aqua/10 text-[#237f86] dark:text-tide-sky">
                  Embedded
                </span>
                interact in this page (or launch the full deployment)
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-gild/40 bg-gild/10 text-gild-deep dark:text-gild-soft">
                  Launch
                </span>
                opens the live on-site experience
              </span>
            </div>

            {/* Native embedded component — full width */}
            {simulatorProof &&
              renderArtifactCard(
                simulatorProof,
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <OperationalTriageSimulator />
                </div>,
              )}

            {/* Live-preview iframes — two-up */}
            <div className="grid lg:grid-cols-2 gap-6">
              {iframeProofs.map((proof) =>
                renderArtifactCard(
                  proof,
                  <HtmlPreviewCard
                    content=""
                    label="Live preview — click to launch"
                    iframeUrl={resolveLiveUrl(proof.caseStudyId)}
                    accentColor={proof.caseStudyId === 'luxe-lofts' ? 'red' : 'indigo'}
                  />,
                ),
              )}
            </div>

            {/* Launch-out experiences */}
            {launchProofs.map((proof) =>
              renderArtifactCard(
                proof,
                <button
                  type="button"
                  onClick={launchDigitalTwin}
                  className="group w-full rounded-lg border border-dashed border-gild/40 dark:border-gild-soft/30 bg-gild/5 dark:bg-gild-soft/5 p-6 text-left transition-colors hover:bg-gild/10 dark:hover:bg-gild-soft/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
                >
                  <span className="block text-sm font-semibold text-ink-navy dark:text-white">
                    Launch the Digital Twin chat →
                  </span>
                  <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300">
                    Opens the on-site assistant overlay with a gallery-tour prompt; ask it about
                    Kyle&apos;s work, fit, or where the proof lives.
                  </span>
                </button>,
              ),
            )}
          </div>
        )}
      </div>

      {/* DIAGRAM INTERACTIVE ZOOM MODAL */}
      {selectedDiagram && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
        >
          <div className="relative w-full max-w-5xl h-[85vh] flex flex-col bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                  {selectedDiagram.type}
                </span>
                <h2
                  id="modal-title"
                  className="text-base font-bold text-ink-navy dark:text-white mt-0.5"
                >
                  {selectedDiagram.title}
                </h2>
              </div>
              <button
                onClick={handleCloseDiagram}
                aria-label="Close modal"
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Interactive Canvas */}
            <div
              className={`flex-1 relative bg-slate-950 overflow-hidden flex items-center justify-center ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            >
              {/* Internal SVG container affected by Zoom and Pan */}
              <div
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                }}
                className="w-full max-w-2xl h-auto aspect-square flex items-center justify-center p-8 text-tide-aqua"
              >
                <DiagramFull type={selectedDiagram.diagramType} />
              </div>
            </div>

            {/* Footer Control Panel */}
            <div className="p-4 bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400 max-w-sm">
                Drag to pan around the schematic. Use control buttons to adjust viewport sizing.
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold focus:outline-none"
                >
                  Zoom Out -
                </button>
                <span className="text-xs font-mono font-bold text-slate-200 min-w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold focus:outline-none"
                >
                  Zoom In +
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold focus:outline-none ml-2"
                >
                  Reset ↺
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryView;
