import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildProjectHref } from '../lib/routes';
import { PROJECT_REGISTRY } from '../constants';
import { HtmlPreviewCard } from '../components/CaseStudyComponents';
import { OperationalTriageSimulator } from '../components/ops-triage/OperationalTriageSimulator';
import { DiagramFull, DiagramThumb } from '../components/gallery/TechnicalDiagrams';

// TS Interfaces
interface AIVisualAsset {
  id: string;
  title: string;
  category: string;
  prompt: string;
  seed: number;
  model: string;
  parameters: string;
  aspect: string;
  visualStyle: 'loft' | 'dashboard' | 'vector';
}

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

const GALLERY_AI_ASSETS: AIVisualAsset[] = [
  {
    id: 'luxe-lofts-interior',
    title: 'Luxe Lofts Luxury Penthouse Interior',
    category: 'Interior Architectural Concept',
    prompt:
      'A midcentury modern luxury penthouse interior, concrete plaster walls, warm glowing brass highlights, large architectural windows showing Ann Arbor cityscape at dusk, architectural digest style, cinematic lighting, high-fidelity architectural rendering',
    seed: 849301824,
    model: 'DALL-E 3 (ChatGPT)',
    parameters: 'Quality: HD, Size: 1792x1024 (16:9), Style: Natural',
    aspect: '16:9',
    visualStyle: 'loft',
  },
  {
    id: 'ops-dashboard-ui',
    title: 'Ops Dashboard HUD Wireframe',
    category: 'User Interface Concept',
    prompt:
      'Sleek futuristic operations control dashboard interface, complex node graph network, cybersecurity data visualization overlay, cybernetic color palette with amber and cyan accents, HUD layout, high contrast dashboard interface design',
    seed: 194857104,
    model: 'Gemini (Imagen 3)',
    parameters: 'Aspect Ratio: 16:9, Mode: Graphic/UI',
    aspect: '16:9',
    visualStyle: 'dashboard',
  },
  {
    id: 'spatial-intel-icons',
    title: 'Spatial Intelligence Vector System',
    category: 'Brand Iconography Concept',
    prompt:
      'Set of flat vector glyph icons for spatial and geographical information systems, clean golden ratio curves, minimalist architectural lines, deep slate background, vector art, behance style',
    seed: 90231847,
    model: 'DALL-E 3 (ChatGPT)',
    parameters: 'Quality: Standard, Size: 1024x1024 (1:1), Style: Vivid',
    aspect: '1:1',
    visualStyle: 'vector',
  },
];

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
  const [activeTab, setActiveTab] = useState<'ai' | 'diagrams' | 'live'>('ai');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedDiagram, setSelectedDiagram] = useState<TechnicalDiagram | null>(null);

  // Zoom & Pan state for Diagram Modal
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
            Explore AI generation pipelines, zoom into interactive PostGIS & node system
            architectures, or jump directly into live sandbox environments proving full stack
            readiness.
          </p>
        </header>

        {/* Tab switcher */}
        <div
          role="tablist"
          aria-label="Filter evidence type"
          className="flex flex-wrap border-b border-slate-200 dark:border-slate-800"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
            className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all focus:outline-none ${
              activeTab === 'ai'
                ? 'border-tide-aqua text-tide-aqua dark:text-tide-softBlue font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Creative AI Automation
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'diagrams'}
            onClick={() => setActiveTab('diagrams')}
            className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all focus:outline-none ${
              activeTab === 'diagrams'
                ? 'border-tide-aqua text-tide-aqua dark:text-tide-softBlue font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Technical Diagrams & Blueprints
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'live'}
            onClick={() => setActiveTab('live')}
            className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all focus:outline-none ${
              activeTab === 'live'
                ? 'border-tide-aqua text-tide-aqua dark:text-tide-softBlue font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Live Evidence & Sandboxes
          </button>
        </div>

        {/* TAB A: CREATIVE AI AUTOMATION */}
        {activeTab === 'ai' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_AI_ASSETS.map((asset) => (
              <div
                key={asset.id}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] overflow-hidden transition-all duration-300 hover:border-amber-500/30"
              >
                {/* Visual Asset Container */}
                <div className="relative h-48 bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center">
                  {asset.visualStyle === 'loft' && (
                    <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-br from-[#10242f] via-[#07161f] to-[#1a2b36]">
                      <div className="border border-amber-500/20 rounded p-2 text-center text-[10px] font-mono text-amber-300">
                        Strategic Marketing Layout
                      </div>
                      <div className="flex gap-2">
                        <div className="w-1/3 h-20 border border-slate-700/50 rounded flex flex-col justify-center items-center">
                          <span className="text-[10px] text-slate-500">Living</span>
                          <span className="text-xs text-white font-serif">Luxury</span>
                        </div>
                        <div className="w-2/3 h-20 border border-slate-700/50 rounded flex flex-col justify-between p-2">
                          <span className="text-[9px] text-amber-500">LUXE LOFTS</span>
                          <div className="h-1 bg-amber-500/30 w-12"></div>
                          <div className="h-1 bg-slate-600 w-full"></div>
                          <div className="h-1 bg-slate-600 w-2/3"></div>
                        </div>
                      </div>
                      <div className="text-[8px] text-slate-500 text-right">Ann Arbor, MI</div>
                    </div>
                  )}

                  {asset.visualStyle === 'dashboard' && (
                    <div className="absolute inset-0 flex flex-col justify-between p-4 bg-slate-950 font-mono text-[9px] text-cyan-400">
                      <div className="flex justify-between border-b border-cyan-900/50 pb-1">
                        <span>OPERATIONS_TRIAGE</span>
                        <span className="text-amber-500">LIVE_TICK</span>
                      </div>
                      <div className="flex items-end gap-1 h-20">
                        <div className="w-3 bg-cyan-500/10 border border-cyan-500/40 h-8"></div>
                        <div className="w-3 bg-cyan-500/10 border border-cyan-500/40 h-12"></div>
                        <div className="w-3 bg-cyan-500/10 border border-cyan-500/40 h-16"></div>
                        <div className="w-3 bg-amber-500/20 border border-amber-500/50 h-24 animate-pulse"></div>
                        <div className="w-3 bg-cyan-500/10 border border-cyan-500/40 h-10"></div>
                        <div className="w-3 bg-cyan-500/10 border border-cyan-500/40 h-14"></div>
                        <div className="w-3 bg-cyan-500/10 border border-cyan-500/40 h-20"></div>
                      </div>
                      <div className="flex justify-between text-[8px] text-slate-500">
                        <span>SYSTEM: ONLINE</span>
                        <span>LATENCY: 42ms</span>
                      </div>
                    </div>
                  )}

                  {asset.visualStyle === 'vector' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="w-12 h-12 border border-slate-700 rounded-lg flex items-center justify-center text-amber-500">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div className="w-12 h-12 border border-slate-700 rounded-lg flex items-center justify-center text-cyan-400">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Overlay Prompt UI */}
                  <div className="absolute inset-0 bg-slate-950/90 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold font-mono">
                        GENERATION PROMPT
                      </span>
                      <p className="text-[11px] text-slate-200 line-clamp-4 leading-relaxed font-mono">
                        "{asset.prompt}"
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyPrompt(asset.id, asset.prompt)}
                      className="w-full text-center text-xs font-semibold py-1.5 rounded bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors focus:outline-none"
                    >
                      {copiedId === asset.id ? 'Copied Prompt! ✓' : 'Copy Generation Prompt'}
                    </button>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                      {asset.category}
                    </span>
                    <h3 className="text-base font-semibold text-ink-navy dark:text-white mt-0.5">
                      {asset.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Engine</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {asset.model}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Seed</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {asset.seed}
                      </span>
                    </div>
                    <div className="col-span-2 mt-1">
                      <span className="text-slate-400 block text-[9px] uppercase">Parameters</span>
                      <span className="text-[10px] break-all text-slate-700 dark:text-slate-300 font-mono">
                        {asset.parameters}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
