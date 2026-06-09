import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  DIGITAL_TWIN_PROJECT_HREF,
  GUYNODE_SYSTEM_HREF,
  PROJECTS_HREF,
  RESUME_HREF,
  SITE_INDEX_HREF,
} from '../lib/routes';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ErrorBoundary from '../components/ErrorBoundary';
import CostBreakEvenChart from '../components/northern-grind/CostBreakEvenChart';
import BrandGallery from '../components/northern-grind/BrandGallery';
import { componentRecipes, semanticTokens } from '../lib/design-system';
import { automationSystems, automationThesis, governancePrimitives } from '../data/deepDiveContent';
import type { Visibility } from '../types';

type MainTab = 'landing' | 'process' | 'luxe-lofts' | 'northern-grind';

// `?tab=automation` is an alias for the umbrella governance tab so existing
// links and the original deep-dive brief keep resolving after the Option C
// restructure (the tab itself is the renamed 'process' tab).
const TAB_ALIASES: Record<string, MainTab> = { automation: 'process' };
const resolveTabParam = (param: string | null): MainTab | null => {
  if (
    param === 'landing' ||
    param === 'process' ||
    param === 'luxe-lofts' ||
    param === 'northern-grind'
  )
    return param;
  if (param && param in TAB_ALIASES) return TAB_ALIASES[param];
  return null;
};

// Deep-dive tabs are config-driven so any tab can be shown/hidden via `visibility`.
// A hidden tab's button is not rendered, but its content remains reachable by `?tab=<id>`
// for preview before publishing (mirrors the project visibility rule). 'landing' should
// stay public so the page always has a default tab.
const DEEP_DIVE_TABS: {
  id: MainTab;
  label: string;
  activeBorder: string;
  visibility: Visibility;
}[] = [
  { id: 'landing', label: 'Overview', activeBorder: 'border-tide-aqua', visibility: 'public' },
  {
    id: 'process',
    label: 'Automation & Governance Architecture',
    activeBorder: 'border-tide-aqua',
    visibility: 'public',
  },
  {
    id: 'luxe-lofts',
    label: 'Luxe Lofts Digital Restructuring Strategy',
    activeBorder: 'border-rose-500',
    visibility: 'public',
  },
  {
    id: 'northern-grind',
    label: 'Northern Grind Business Systems',
    activeBorder: 'border-amber-500',
    visibility: 'public',
  },
];

// ── Northern Grind deep dive data ──────────────────────────────────────────
// Long-form modeling behind the Northern Grind case study: brand iteration,
// break-even POS math, loyalty redesign, channel economics, and the social
// audit. Figures are modeled from published rates / industry norms and the
// $6.25 latte + $10 sandwich baseline — flagged as a proposal, no real metrics.

const NG_PHASES = [
  { id: 'ng-1', label: 'Strategic Context' },
  { id: 'ng-2', label: 'Brand Identity' },
  { id: 'ng-3', label: 'POS & Loyalty' },
  { id: 'ng-4', label: 'Channel Economics' },
  { id: 'ng-5', label: 'Digital Marketing' },
  { id: 'ng-gallery', label: 'Asset Gallery' },
  { id: 'ng-6', label: 'Impact & Reflection' },
] as const;

const NG_PALETTE = [
  { name: 'Brown', hex: '#5B3A29', meaning: 'Tradition, warmth, craft' },
  { name: 'Cream', hex: '#FFF8E7', meaning: 'Clean canvas' },
  { name: 'Gold', hex: '#D6B25E', meaning: 'Premium quality' },
  { name: 'Green', hex: '#1E6635', meaning: 'Community, locality' },
];

const NG_LOGO_VARIANTS = [
  { variant: 'Brown + Gold', purpose: 'Premium accent; strongest overall performer (primary)' },
  {
    variant: 'Community Green',
    purpose: 'Community tie-in via local university colors (secondary)',
  },
  { variant: 'Brown Circle', purpose: 'Warm, traditional baseline' },
  { variant: 'Blue + Gold', purpose: 'Prestige experiment; ultimately deprioritized' },
];

const NG_POS_ROWS = [
  {
    factor: 'Swipe / in-person',
    dripos: '2.6% + 15¢ or 2.9% + 5¢',
    square: '2.6% + 15¢',
    stripe: '2.7% + 5¢',
  },
  { factor: 'Online', dripos: '2.9% + 30¢', square: '2.9% + 30¢', stripe: '2.9% + 30¢' },
  {
    factor: 'Monthly',
    dripos: '$160 (loyalty/team/marketing)',
    square: '$45–$105 loyalty add-on',
    stripe: '$0, loyalty extra',
  },
  { factor: 'Latte fee ($6.25)', dripos: '23–31¢', square: '31¢', stripe: '22¢' },
  { factor: 'Sandwich fee ($10)', dripos: '34–41¢', square: '41¢', stripe: '32¢' },
  {
    factor: 'Best for',
    dripos: 'High-volume cafés needing bundled tools',
    square: 'Simple POS + loyalty under ~1k txns/mo',
    stripe: 'Lowest per-swipe if loyalty app is affordable',
  },
];

const NG_LOYALTY_MODELS = [
  {
    name: 'Margin-based rewards',
    body: 'Weight rewards toward high-margin items (specialty drinks, food) instead of flat spend, so the incentive protects margin rather than eroding it.',
  },
  {
    name: 'Tiered rewards',
    body: 'Escalating perks that pull occasional buyers toward regular-visit behavior — the structure the flat $5/100pts loop never created.',
  },
  {
    name: 'Hybrid punch-card',
    body: 'A fast, legible streak mechanic layered on points to reinforce the daily ritual without adding checkout friction.',
  },
];

const NG_CHANNEL_MODEL = [
  {
    label: 'Direct-order benchmark',
    value: '4–8%',
    body: 'In-house POS, processing, packaging, and labor — the preferred transaction-cost floor.',
  },
  {
    label: 'True third-party burden',
    value: '30–35%',
    body: 'Base commission (~25%) + processing (~3%) + promo (~2%) on a representative $30 order.',
  },
  {
    label: 'First-order result',
    value: 'Net loss',
    body: 'At a 20% pre-commission margin, the first DoorDash order can lose money — so commission is CAC, not a transaction cost.',
  },
  {
    label: 'LTV:CAC target',
    value: '3:1',
    body: 'A DoorDash-acquired customer needs ~2–3 profitable direct orders afterward to justify the acquisition.',
  },
];

const NG_IG_AUDIT = [
  {
    category: 'Consistency',
    state: 'Infrequent posts (~2/mo)',
    impact: 'Low visibility, weak algorithm performance',
  },
  {
    category: 'Authenticity',
    state: 'Reused imagery; little staff or customer presence',
    impact: 'Room to strengthen local connection',
  },
  {
    category: 'Storytelling',
    state: 'Mostly product photos',
    impact: 'Room for more brand voice and emotional hook',
  },
  { category: 'Engagement', state: 'Below 1%; few comments', impact: 'Limited dialogue' },
  {
    category: 'Aesthetic cohesion',
    state: 'Mixed tones and edits',
    impact: 'Room to align with the new palette',
  },
  {
    category: 'Call-to-action',
    state: 'Rare or absent',
    impact: 'Few paths to loyalty, pickup, or conversion',
  },
];

const NG_KPIS = [
  { metric: 'Posts / month', baseline: '2', goal: '10–12' },
  { metric: 'Engagement rate', baseline: '<1%', goal: '≥3%' },
  { metric: 'Followers', baseline: '~150', goal: '+50%' },
  { metric: 'Story views', baseline: '<40', goal: '>150' },
  { metric: 'Loyalty conversions', baseline: 'Not tracked', goal: '≥25/mo' },
  { metric: 'UGC mentions', baseline: '<5', goal: '30+' },
];

const NG_BEFORE_AFTER = [
  {
    aspect: 'Brand identity',
    before: 'Inconsistent across surfaces',
    after: 'Cohesive and premium',
  },
  { aspect: 'POS system', before: 'Cost-heavy at low volume', after: 'Modular and data-driven' },
  { aspect: 'Loyalty', before: 'Flat voucher loop', after: 'Tiered and margin-aware' },
  {
    aspect: 'Menu design',
    before: 'Fragmented across surfaces',
    after: 'Structured and UX-optimized',
  },
  {
    aspect: 'Digital presence',
    before: 'Infrequent, off-brand posting',
    after: 'Authentic and engaging',
  },
];

type TimelineRow = {
  phase: string;
  changed: string;
  mattered: string;
  proves: string;
  validation: string;
};

const PROCESS_PHASES = [
  { id: 'arch-thesis', label: 'Governance Thesis' },
  { id: 'arch-spectrum', label: 'Autonomy Spectrum' },
  { id: 'arch-primitives', label: 'Reused Primitives' },
  { id: 'proc-1', label: 'Pipeline Overview' },
  { id: 'proc-2', label: 'Build Timeline' },
  { id: 'proc-3', label: 'Multi-LLM Toolchain' },
  { id: 'proc-4', label: 'Delivery Model' },
  { id: 'proc-5', label: 'Architecture & Governance' },
  { id: 'proc-6', label: 'Validation & Evidence' },
] as const;

const buildTimeline: TimelineRow[] = [
  {
    phase: 'Role-track hero redesign',
    changed: 'Home shifted to Implementation / QA / GIS role-track framing.',
    mattered: 'Made recruiter scanning role-first instead of artifact-first.',
    proves: 'Information architecture aligned to hiring behavior.',
    validation: 'Git evidence PR #29/#33.',
  },
  {
    phase: 'Top navigation redesign',
    changed: 'Added TopNav and route-helper alignment.',
    mattered: 'Reduced navigation ambiguity across tracks and proof surfaces.',
    proves: 'Global wayfinding designed intentionally.',
    validation: 'Git evidence PR #34.',
  },
  {
    phase: 'Guynode flagship positioning',
    changed: 'Guynode promoted as flagship GIS system.',
    mattered: 'Raised concrete systems proof, not just summary claims.',
    proves: 'Flagship-level GIS delivery framing.',
    validation: 'Git evidence PR #27/#44.',
  },
  {
    phase: 'About + Working Profile',
    changed: 'Added contextual working profile section.',
    mattered: 'Improved evaluator context for collaboration style.',
    proves: 'Portfolio includes delivery context, not only outputs.',
    validation: 'Git evidence PR #37/#38.',
  },
  {
    phase: 'Career Experience rewrite',
    changed: 'Resume-aligned experience entries and language.',
    mattered: 'Consistency between portfolio narrative and resume proof.',
    proves: 'Cross-surface content governance.',
    validation: 'PR #35/#36/#38 stream.',
  },
  {
    phase: 'Skills & Technologies matrix',
    changed: 'Expanded capability matrix with clearer strength framing.',
    mattered: 'Improved role-specific skill scanning.',
    proves: 'Capability taxonomy linked to project proof.',
    validation: 'Feature commits in same stream.',
  },
  {
    phase: 'Digital Twin guardrails',
    changed: 'Added scope, rate, relevance, cost, and injection controls.',
    mattered: 'Moved assistant from demo bot to constrained support system.',
    proves: 'AI governance and safety implementation depth.',
    validation: 'Server tests and PR #39.',
  },
  {
    phase: 'Digital Twin human handoff',
    changed: 'Added feedback controls and escalation to contact flow.',
    mattered: 'Created failure-aware support path for unresolved answers.',
    proves: 'Human-in-the-loop design.',
    validation: 'Git evidence PR #40/#41.',
  },
  {
    phase: 'Digital Twin project page',
    changed: 'Published Digital Twin as explicit project artifact.',
    mattered: 'Converted hidden feature work into recruiter-visible proof.',
    proves: 'AI system delivery traceability.',
    validation: 'Git evidence PR #41.',
  },
  {
    phase: 'Projects route migration',
    changed: 'Canonical routes migrated to /projects and /projects/:projectId.',
    mattered: 'Reduced naming drift and improved URL clarity.',
    proves: 'Systematic route architecture change.',
    validation: 'Routing tests + PR #45/#48.',
  },
  {
    phase: 'Dedicated Projects Index',
    changed: 'Added /projects index view with browsing model.',
    mattered: 'Improved recruiter proof retrieval speed.',
    proves: 'Scannable project library architecture.',
    validation: 'Git evidence PR #46.',
  },
  {
    phase: 'Shared project metadata',
    changed: 'Centralized project taxonomy in projectMetadata.ts.',
    mattered: 'Eliminated duplicated labels/hrefs across views.',
    proves: 'Single-source-of-truth content architecture.',
    validation: 'PR #46 and cross-view usage.',
  },
  {
    phase: 'Project Detail redesign',
    changed: 'Refactored detail layout around project-first narrative.',
    mattered: 'Improved technical deep-dive readability.',
    proves: 'Project proof UX maturation.',
    validation: 'Git evidence PR #47.',
  },
  {
    phase: 'Project Detail route/content bugfix',
    changed: 'Fixed projectId compatibility and loader fallback hardening.',
    mattered: 'Prevented empty/wrong detail resolution and app-shell misreads.',
    proves: 'Reliability-focused iteration.',
    validation: 'Tests in PR #48.',
  },
  {
    phase: 'Site Index',
    changed: 'Added global site index route and view.',
    mattered: 'Improved discoverability across the portfolio.',
    proves: 'Navigation architecture completeness.',
    validation: 'Git evidence PR #43.',
  },
  {
    phase: 'Evidence audit ledger',
    changed: 'Published evidence-ledger source trail in docs.',
    mattered: 'Anchored public process claims to repository evidence.',
    proves: 'Traceability and audit discipline.',
    validation: 'docs/portfolio2-evidence-audit-ledger.md.',
  },
];

const PROCESS_CARD_DETAILS: Record<string, { headline: string; body: string }> = {
  'PRs Merged': {
    headline: '50+ pull requests — one per validated decision',
    body: 'Every implementation cycle opened a dedicated branch and closed with a reviewed PR. This created a complete audit trail: each PR captures what changed, why it was scoped that way, and what validation it passed before merging. The PR history is the primary evidence source backing every claim on this page.',
  },
  'LLMs Used': {
    headline: 'Six tools, each with a defined role',
    body: 'The multi-LLM workflow was explicit: ChatGPT handled strategy and critique, Gemini powered the runtime assistant, Claude Code handled repo-level implementation cycles, Codex ran targeted branch fixes, Jules provided task orchestration, and GitHub was the validation control plane. No tool had overlapping authority — each operated within its lane.',
  },
  'Build Phases': {
    headline: 'Five-plus phases, each validated before advancing',
    body: 'No phase began until the previous one passed typecheck, lint, build, and a manual review gate. This sequential discipline prevented accumulated drift — a common failure mode in AI-assisted builds where unreviewed changes compound. Phase completion = zero validation errors + committed evidence ledger entry.',
  },
  Routes: {
    headline: 'Ten-plus canonical routes, zero naming drift',
    body: 'The migration from legacy /case-studies to /projects/:projectId was systematic: canonical routes were established first, compatibility aliases were wired to preserve existing links, then shared metadata centralized every label, href, and taxonomy reference. The result is a routing architecture that scales without fragmentation.',
  },
};

type LlmTool = {
  tool: string;
  role: string;
  tasks: string[];
  contribution: string;
};

const LLM_TOOLS: LlmTool[] = [
  {
    tool: 'ChatGPT',
    role: 'Strategy, critique, prompt design, information architecture, audit logic, and sequencing.',
    tasks: [
      'Portfolio information architecture design',
      'Role-track framing and recruiter-scanning critique',
      'Audit logic for evidence ledger structure',
      'Sequencing of build phases and dependency ordering',
      'Prompt design for implementation cycles',
    ],
    contribution:
      'Primary strategy and independent critique partner throughout the build. Used before every major implementation cycle to stress-test scope and identify gaps.',
  },
  {
    tool: 'Gemini / Google AI Studio',
    role: 'Early generation, scaffolding, UI experimentation; powers runtime assistant behavior via proxy.',
    tasks: [
      'Early UI scaffolding and layout experimentation',
      'Initial component generation passes',
      'Runtime Digital Twin assistant via Gemini proxy API',
      'Prompt-response behavior calibration for the chatbot',
    ],
    contribution:
      'Provided early-stage generation speed and now runs the live Digital Twin assistant in production. Gemini Flash handles all runtime portfolio assistant queries.',
  },
  {
    tool: 'Claude',
    role: 'Planning, review, and implementation support. Co-author metadata visible in commit history.',
    tasks: [
      'Implementation planning and scoping',
      'Code review and patch-note audit',
      'Architecture decision documentation',
      'Cross-file consistency checks',
    ],
    contribution:
      'Handled planning-heavy cycles and code review passes where broad context was needed before scoped execution.',
  },
  {
    tool: 'Claude Code',
    role: 'Repo-level edits, refactoring, and implementation support in commit and PR evidence.',
    tasks: [
      'Full-file rewrites and refactoring cycles',
      'Design system token corrections',
      'Route migration and compatibility alias wiring',
      'Validation trail — typecheck/lint/build execution',
    ],
    contribution:
      'Primary implementation engine for repo-level changes. Each session operated on a dedicated branch with a specific scoped prompt, producing reviewable patch output.',
  },
  {
    tool: 'Google Jules',
    role: 'Task orchestration and code support in user-reported workflow context.',
    tasks: [
      'Task orchestration across parallel workstreams',
      'Code support for targeted feature branches',
    ],
    contribution:
      'Used for workstream coordination where parallel task execution was beneficial. Contributed to the multi-tool governance model.',
  },
  {
    tool: 'Codex',
    role: 'Branch-based implementation prompts, targeted migration fixes, test-repair iteration.',
    tasks: [
      'Branch-based implementation from scoped prompts',
      'Targeted migration fixes (route param, loader fallback)',
      'Test-repair iteration on failing Vitest suites',
      'Compatibility alias wiring',
    ],
    contribution:
      'Handled targeted, scope-bounded fixes where precision mattered more than breadth. Strong on test repair and compatibility edge cases.',
  },
  {
    tool: 'GitHub',
    role: 'Branch and PR traceability, merges, and validation trail control plane.',
    tasks: [
      'Branch isolation for every implementation cycle',
      'PR review and merge gate enforcement',
      'CI validation trail (typecheck, lint, build)',
      'Evidence ledger through commit and PR history',
    ],
    contribution:
      'The control plane that made the multi-LLM workflow auditable. Every AI-generated change was traceable through a PR, not applied directly to main.',
  },
];

// Deep-dive-specific "bridge" copy. Each ties one deep dive back to the central thesis —
// turning complex technical/operational/spatial problems into systems people can understand,
// adopt, and use — across three facets: translation, adoption, and implementation maturity.
// Intentionally distinct per deep dive (no shared boilerplate).
type BridgeFacet = { title: string; body: string };
type DeepDiveBridgeContent = { label: string; statement: string; facets: BridgeFacet[] };

const DEEP_DIVE_BRIDGES: Record<
  'process' | 'luxe-lofts' | 'northern-grind',
  DeepDiveBridgeContent
> = {
  process: {
    label: 'Why this deep dive matters',
    statement:
      'One governance philosophy across three systems: AI treated as an untrusted worker that must clear an explicit gate before its output is accepted — from human-in-the-loop to autonomous. The Portfolio 2.0 build pipeline is where that philosophy is documented in full; Aegis and emOS are its structural evolution.',
    facets: [
      {
        title: 'Translation',
        body: 'Turns an opaque "AI built and runs my systems" story into a legible model — an explicit ruleset, a reasoning trace, drift checks, and an audit trail — that a reviewer can actually evaluate.',
      },
      {
        title: 'Adoption',
        body: 'Maps each system to who holds the Guardian seat, so a team can see the same gate scale from a person reviewing every change to an automated judge running between iterations.',
      },
      {
        title: 'Implementation maturity',
        body: 'A decoupled judge-vs-executor pattern reused across a CI pipeline, a human-in-the-loop judge, and an autonomous runtime — the same discipline applied at three autonomy levels.',
      },
    ],
  },
  'luxe-lofts': {
    label: 'Why this deep dive matters',
    statement:
      "A spatial and operational problem — a venue whose site couldn't convert — translated into a system the owner can run and a customer can navigate with confidence.",
    facets: [
      {
        title: 'Translation',
        body: 'Audit findings become one clear conversion journey: pricing, policies, and spatial proof made visible instead of hidden behind "request a quote."',
      },
      {
        title: 'Adoption',
        body: 'Designed around the people who use it — a triage dashboard for the owner, a guided intake for planners — so the workflow gets adopted, not worked around.',
      },
      {
        title: 'Implementation maturity',
        body: "Explicitly bounds what's prototyped versus how it ships in production, and is framed honestly as an audit-driven proposal — no overstated claims.",
      },
    ],
  },
  'northern-grind': {
    label: 'Why this deep dive matters',
    statement:
      'A cosmetic rebrand reframed as a system redesign — brand, menu, POS, loyalty, and channel economics treated as one operational loop the owner can actually run, not five separate deliverables.',
    facets: [
      {
        title: 'Translation',
        body: "Turns 'make the logo nicer' into a legible operating model: break-even POS math, margin-aware loyalty, and delivery reframed as a measurable acquisition cost.",
      },
      {
        title: 'Adoption',
        body: 'Designed around the people who run it — a responsive mark for any surface, a menu built for scan speed, and a loyalty pilot the POS can actually measure.',
      },
      {
        title: 'Implementation maturity',
        body: 'Framed honestly as a proposal: every figure is modeled from published rates and industry norms, flagged to be re-grounded against real COGS and the live DoorDash agreement.',
      },
    ],
  },
};

const DeepDiveBridge: React.FC<{
  bridge: DeepDiveBridgeContent;
  accent: 'aqua' | 'rose' | 'amber';
}> = ({ bridge, accent }) => {
  const accentText =
    accent === 'aqua'
      ? 'text-tide-aqua dark:text-tide-sky'
      : accent === 'amber'
        ? 'text-amber-600 dark:text-amber-400'
        : 'text-rose-600 dark:text-rose-400';
  const accentBorder =
    accent === 'aqua'
      ? 'border-tide-aqua'
      : accent === 'amber'
        ? 'border-amber-500'
        : 'border-rose-500';
  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] p-6 md:p-8 space-y-5">
      <div className={`border-l-2 ${accentBorder} pl-4 space-y-2`}>
        <span className={`block text-[10px] font-bold uppercase tracking-[0.25em] ${accentText}`}>
          {bridge.label}
        </span>
        <p className="max-w-3xl text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
          {bridge.statement}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bridge.facets.map((facet) => (
          <div key={facet.title} className="space-y-1.5">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${accentText}`}>
              {facet.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {facet.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const DeepDiveView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeMainTab, setActiveMainTab] = React.useState<MainTab>(
    () => resolveTabParam(tabParam) ?? 'landing',
  );

  const [activeProcessPhase, setActiveProcessPhase] = React.useState<string>('arch-thesis');
  const [activePhase, setActivePhase] = React.useState<string>('phase-1');
  const [activeNgPhase, setActiveNgPhase] = React.useState<string>('ng-1');
  const [activeDiagTab, setActiveDiagTab] = React.useState<
    'visuals' | 'ux' | 'technical' | 'content'
  >('visuals');
  const [kpiView, setKpiView] = React.useState<'owner' | 'telemetry'>('owner');

  const [activeProcessCard, setActiveProcessCard] = React.useState<number | null>(null);
  const [activeTimelineEntry, setActiveTimelineEntry] = React.useState<TimelineRow>(
    buildTimeline[0],
  );
  const [activeLlmTool, setActiveLlmTool] = React.useState<string | null>(null);

  React.useEffect(() => {
    const resolved = resolveTabParam(tabParam);
    if (resolved) setActiveMainTab(resolved);
  }, [tabParam]);

  const handleMainTabChange = (tab: MainTab) => {
    setActiveMainTab(tab);
    setSearchParams({ tab });
  };

  React.useEffect(() => {
    if (activeMainTab !== 'process') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveProcessPhase(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    PROCESS_PHASES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeMainTab]);

  React.useEffect(() => {
    if (activeMainTab !== 'luxe-lofts') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActivePhase(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    ['phase-1', 'phase-2', 'phase-3', 'phase-4', 'phase-5', 'phase-6'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeMainTab]);

  React.useEffect(() => {
    if (activeMainTab !== 'northern-grind') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNgPhase(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    NG_PHASES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeMainTab]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="deep-dive-top" className="min-h-screen pt-20 pb-20 px-6">
      <ErrorBoundary location="Deep Dive View">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
              OPERATIONAL_INTELLIGENCE
            </span>
            <h1 className="text-4xl md:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight">
              Process &amp; Strategy Deep Dives
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Analyze the engineering timelines, multi-LLM workflows, and commercial restructuring
              strategies behind this portfolio. These deep dives verify the strategic governance and
              rigorous validation backing every project.
            </p>
          </div>

          {/* Tab navigation */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            {DEEP_DIVE_TABS.filter((tab) => (tab.visibility ?? 'public') === 'public').map(
              (tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleMainTabChange(tab.id)}
                  className={`text-base font-bold px-4 py-2 rounded-t-lg transition ${
                    activeMainTab === tab.id
                      ? `bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white border-b-2 ${tab.activeBorder}`
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ),
            )}
          </div>

          {/* ── Landing Tab ── */}
          {activeMainTab === 'landing' && (
            <div className="space-y-12">
              <section className="space-y-8">
                <div className="space-y-3 max-w-2xl">
                  <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                    Choose a Deep Dive
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    These entries go beyond project summaries. Each documents the strategic
                    decisions, governance models, and implementation processes that turned intent
                    into working systems.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Automation & Governance Architecture Entry Card */}
                  <button
                    onClick={() => handleMainTabChange('process')}
                    className="text-left group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] hover:border-tide-aqua/40 dark:hover:border-tide-aqua/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="h-2 bg-tide-aqua dark:bg-tide-sky" />
                    <div className="p-8 space-y-5">
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-tide-aqua dark:text-tide-sky block">
                          Governed AI Automation
                        </span>
                        <h3 className="text-2xl font-outfit font-bold text-slate-950 dark:text-white group-hover:text-tide-aqua dark:group-hover:text-tide-sky transition-colors">
                          Automation &amp; Governance Architecture
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          One philosophy across three systems — AI as an untrusted worker behind an
                          explicit governance gate, from human-in-the-loop to autonomous. Documents
                          the Portfolio 2.0 build pipeline in full, then Aegis and emOS as its
                          structural evolution, with the multi-LLM toolchain and validation trail.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Autonomy Spectrum',
                          'Judge vs. Executor',
                          'Multi-LLM Workflow',
                          'Validation Trail',
                        ].map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tide-aqua/10 text-tide-aqua dark:text-tide-sky border border-tide-aqua/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-tide-aqua dark:text-tide-sky group-hover:gap-3 transition-all">
                        <span>Explore Automation &amp; Governance</span>
                        <span>→</span>
                      </div>
                    </div>
                  </button>

                  {/* Luxe Lofts Entry Card */}
                  <button
                    onClick={() => handleMainTabChange('luxe-lofts')}
                    className="text-left group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] hover:border-rose-500/40 dark:hover:border-rose-500/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="h-2 bg-rose-500" />
                    <div className="p-8 space-y-5">
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-rose-500 block">
                          Restructuring Strategy
                        </span>
                        <h3 className="text-2xl font-outfit font-bold text-slate-950 dark:text-white group-hover:text-rose-500 transition-colors">
                          Luxe Lofts Digital Restructuring Strategy
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          A commercial deep dive into the Luxe Lofts digital ecosystem — from
                          audit-driven diagnostics to solution architecture, KPI modeling, and
                          prototype bounding for a live venue booking platform.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Audit Diagnostics',
                          'Solution Architecture',
                          'KPI Dashboard',
                          'Commercial Strategy',
                        ].map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-rose-500 group-hover:gap-3 transition-all">
                        <span>Explore Restructuring Strategy</span>
                        <span>→</span>
                      </div>
                    </div>
                  </button>

                  {/* Northern Grind Entry Card */}
                  <button
                    onClick={() => handleMainTabChange('northern-grind')}
                    className="text-left group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] hover:border-amber-500/40 dark:hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="h-2 bg-amber-500" />
                    <div className="p-8 space-y-5">
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 block">
                          Brand &amp; Operations
                        </span>
                        <h3 className="text-2xl font-outfit font-bold text-slate-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          Northern Grind Business Systems
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          The modeling behind a café rebrand-as-system-redesign — break-even POS
                          math, a margin-aware loyalty redesign, DoorDash reframed as a measurable
                          acquisition cost, and a social audit. Brand, menu, payments, and channels
                          as one operational loop.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Break-Even POS',
                          'Loyalty Redesign',
                          'Channel Economics',
                          'Social Audit',
                        ].map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 group-hover:gap-3 transition-all">
                        <span>Explore Business Systems</span>
                        <span>→</span>
                      </div>
                    </div>
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* ── Process Tab ── */}
          {activeMainTab === 'process' && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <aside className="hidden md:block w-52 shrink-0 relative">
                <div className="sticky top-28 space-y-4 border-l-2 border-slate-200 dark:border-slate-800 py-4">
                  {PROCESS_PHASES.map((phase) => (
                    <div key={phase.id} className="relative -ml-[9px] flex items-center">
                      <button
                        onClick={() => scrollTo(phase.id)}
                        className="flex items-center gap-4 group w-full text-left focus:outline-none"
                      >
                        <span
                          className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                            activeProcessPhase === phase.id
                              ? 'bg-tide-aqua border-tide-aqua ring-4 ring-tide-aqua/20'
                              : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 group-hover:border-tide-aqua/60'
                          }`}
                        />
                        <span
                          className={`text-sm font-semibold transition-colors duration-300 ${
                            activeProcessPhase === phase.id
                              ? 'text-tide-aqua dark:text-tide-sky'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {phase.label}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 space-y-16 min-w-0">
                <DeepDiveBridge bridge={DEEP_DIVE_BRIDGES.process} accent="aqua" />

                {/* arch-thesis: Governance Thesis */}
                <section id="arch-thesis" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
                      The Spine
                    </p>
                    <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                      Governance Thesis — One Philosophy, Three Systems
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                      The Portfolio 2.0 build pipeline, Aegis, and emOS are one body of work seen at
                      three autonomy levels. What unifies them is not the tooling but the
                      discipline: execution is separated from validation, and no AI-generated output
                      is accepted until it clears an explicit gate.
                    </p>
                  </div>

                  <div
                    className={`p-6 md:p-8 rounded-2xl border space-y-4 ${componentRecipes.card.surface}`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-tide-aqua dark:text-tide-sky block">
                      Unifying thesis — untrusted-by-default AI execution
                    </span>
                    <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed max-w-4xl">
                      {automationThesis}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {automationSystems.map((system) => (
                      <div
                        key={`contrib-${system.id}`}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] p-5 space-y-2"
                      >
                        <h3 className="font-bold text-slate-950 dark:text-white text-sm">
                          {system.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {system.context}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {system.contributes}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* arch-spectrum: Autonomy Spectrum */}
                <section id="arch-spectrum" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
                      The Gradient
                    </p>
                    <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                      The Autonomy Spectrum
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                      The same gate at three points on a trust gradient. As confidence in the
                      ruleset grows, the Guardian seat hands off from a person to automated checks
                      to an automated judge — but the governance architecture stays the same.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <table className="min-w-full text-sm">
                      <thead className="bg-slate-100 dark:bg-slate-900">
                        <tr>
                          <th className="text-left p-3 text-slate-700 dark:text-slate-200 font-bold">
                            System
                          </th>
                          <th className="text-left p-3 text-slate-700 dark:text-slate-200 font-bold">
                            Autonomy
                          </th>
                          <th className="text-left p-3 text-slate-700 dark:text-slate-200 font-bold">
                            Who holds the Guardian seat
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {automationSystems.map((system, i) => (
                          <tr
                            key={system.id}
                            className={`align-top ${i > 0 ? 'border-t border-slate-200 dark:border-slate-800' : ''}`}
                          >
                            <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                              {system.name}
                            </td>
                            <td className="p-3 text-slate-600 dark:text-slate-300">
                              {system.autonomy}
                            </td>
                            <td className="p-3 text-slate-600 dark:text-slate-300">
                              {system.guardian}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {automationSystems.map((system) => (
                      <div
                        key={system.id}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] p-6 space-y-3 flex flex-col"
                      >
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-tide-aqua dark:text-tide-sky block">
                            {system.autonomy}
                          </span>
                          <h3 className="font-bold text-slate-950 dark:text-white text-lg">
                            {system.name}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {system.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {system.chips.map((chip) => (
                            <span
                              key={chip}
                              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tide-aqua/10 text-tide-aqua dark:text-tide-sky border border-tide-aqua/20"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                        <div className="pt-3 mt-auto">
                          <Link
                            to={system.href}
                            className="inline-flex items-center gap-2 text-sm font-bold text-tide-aqua dark:text-tide-sky hover:gap-3 transition-all"
                          >
                            <span>View project entry</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/projects/portfolio-pipeline"
                      className={`inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 transition-all ${componentRecipes.button.primary}`}
                    >
                      Portfolio 2.0 Build Pipeline
                    </Link>
                    <Link
                      to="/projects/project-aegis"
                      className={`inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 transition-all ${componentRecipes.button.secondary}`}
                    >
                      Aegis &amp; emOS
                    </Link>
                    <Link
                      to={RESUME_HREF}
                      className={`inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 transition-all ${componentRecipes.button.secondary}`}
                    >
                      View Resume
                    </Link>
                  </div>
                </section>

                {/* arch-primitives: Reused Governance Primitives */}
                <section id="arch-primitives" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
                      The Through-Line
                    </p>
                    <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                      Reused Governance Primitives
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                      The trust gradient scales because the same building blocks recur in all three
                      systems — only their implementation changes with the autonomy level. These
                      primitives are the mechanical proof behind the narrative arc.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] overflow-hidden">
                    {governancePrimitives.map((primitive, i) => (
                      <div
                        key={primitive.id}
                        className={`flex flex-col md:flex-row items-start gap-4 md:gap-6 p-5 ${i > 0 ? 'border-t border-slate-200 dark:border-slate-800' : ''}`}
                      >
                        <div className="md:w-64 shrink-0 space-y-1">
                          <h3 className="font-bold text-slate-950 dark:text-white text-sm">
                            {primitive.name}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {primitive.summary}
                          </p>
                        </div>
                        <div className="min-w-0 space-y-1.5 border-l-2 border-tide-aqua/30 pl-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-tide-aqua dark:text-tide-sky">
                            Across the three systems
                          </span>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {primitive.acrossSystems}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* proc-1: Pipeline Overview — the human-led, gated anchor of the spectrum */}
                <section id="proc-1" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
                      Portfolio 2.0 Pipeline · Human-led, gated
                    </p>
                    <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                      Build Overview &amp; Context
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                      Portfolio 2.0 evolved from an AI-assisted prototype into a role-track system
                      with dedicated project architecture, Digital Twin guardrails, site-wide
                      navigation, and validation-backed implementation phases.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'PRs Merged', value: '50+', sub: 'Implementation changes' },
                      { label: 'LLMs Used', value: '6', sub: 'Distinct AI tools' },
                      { label: 'Build Phases', value: '5+', sub: 'Validated phase cycles' },
                      { label: 'Routes', value: '10+', sub: 'Canonical project routes' },
                    ].map((stat, i) => (
                      <button
                        key={stat.label}
                        onClick={() => setActiveProcessCard(activeProcessCard === i ? null : i)}
                        className={`rounded-2xl border p-5 space-y-1 text-left transition-all duration-200 ${
                          activeProcessCard === i
                            ? 'border-tide-aqua/40 bg-tide-aqua/5 dark:bg-tide-aqua/10 ring-2 ring-tide-aqua shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-tide-aqua dark:text-tide-sky block">
                          {stat.label}
                        </span>
                        <div className="text-3xl font-extrabold font-outfit text-slate-950 dark:text-white">
                          {stat.value}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{stat.sub}</p>
                      </button>
                    ))}
                  </div>

                  {activeProcessCard !== null &&
                    (() => {
                      const stat = [
                        { label: 'PRs Merged' },
                        { label: 'LLMs Used' },
                        { label: 'Build Phases' },
                        { label: 'Routes' },
                      ][activeProcessCard];
                      const detail = PROCESS_CARD_DETAILS[stat.label];
                      return (
                        <div className="rounded-2xl border border-tide-aqua/30 bg-tide-aqua/5 dark:bg-tide-aqua/10 p-6 space-y-2 animate-in fade-in duration-200">
                          <h4 className="font-bold text-slate-950 dark:text-white text-base">
                            {detail.headline}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {detail.body}
                          </p>
                        </div>
                      );
                    })()}

                  <div
                    className={`p-6 md:p-8 rounded-2xl border space-y-4 ${componentRecipes.card.surface}`}
                  >
                    <div className="space-y-3 max-w-4xl">
                      <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                        Projects show what was built. Process shows how the portfolio was planned,
                        governed, implemented, validated, and iterated.
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        Use this page to inspect the planning logic, AI-assisted workflow, route
                        migrations, project taxonomy, validation passes, and remaining cleanup work
                        behind the portfolio.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <Link
                        to={PROJECTS_HREF}
                        className={`inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 transition-all ${componentRecipes.button.primary}`}
                      >
                        View Projects Library
                      </Link>
                      <Link
                        to={SITE_INDEX_HREF}
                        className={`inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 transition-all ${componentRecipes.button.secondary}`}
                      >
                        Open Site Index
                      </Link>
                      <Link
                        to={DIGITAL_TWIN_PROJECT_HREF}
                        className={`inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 transition-all ${componentRecipes.button.secondary}`}
                      >
                        Digital Twin Project
                      </Link>
                      <Link
                        to={GUYNODE_SYSTEM_HREF}
                        className={`inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 transition-all ${componentRecipes.button.secondary}`}
                      >
                        Guynode Project
                      </Link>
                      <Link
                        to={RESUME_HREF}
                        className={`inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 transition-all ${componentRecipes.button.secondary}`}
                      >
                        View Resume
                      </Link>
                    </div>
                  </div>
                </section>

                {/* proc-2: Build Timeline */}
                <section id="proc-2" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
                      Phase 2
                    </p>
                    <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                      Build Timeline
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                      Phased implementation changes, why each shift mattered, and the validation
                      trail used to verify delivery outcomes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Card ladder */}
                    <div className="lg:col-span-7 space-y-3">
                      {buildTimeline.map((row, i) => (
                        <button
                          key={row.phase}
                          onClick={() => setActiveTimelineEntry(row)}
                          className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 ${
                            activeTimelineEntry.phase === row.phase
                              ? 'border-tide-aqua/40 bg-tide-aqua/5 dark:bg-tide-aqua/10 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                activeTimelineEntry.phase === row.phase
                                  ? 'bg-tide-aqua text-white'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              {i + 1}
                            </span>
                            <div className="min-w-0">
                              <p
                                className={`font-semibold text-sm ${activeTimelineEntry.phase === row.phase ? 'text-tide-aqua dark:text-tide-sky' : 'text-slate-800 dark:text-slate-200'}`}
                              >
                                {row.phase}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                {row.changed}
                              </p>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`shrink-0 w-4 h-4 ml-auto transition-colors ${activeTimelineEntry.phase === row.phase ? 'text-tide-aqua dark:text-tide-sky' : 'text-slate-400'}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Right: Sticky Inspector */}
                    <div className="lg:col-span-5">
                      <div className="sticky top-28 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] overflow-hidden">
                        <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-900/60">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-tide-aqua dark:text-tide-sky block mb-1">
                            Phase Rigor Inspector
                          </span>
                          <h3 className="font-bold text-slate-950 dark:text-white">
                            {activeTimelineEntry.phase}
                          </h3>
                        </div>
                        <div className="p-6 space-y-5">
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              What changed
                            </span>
                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                              {activeTimelineEntry.changed}
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                              Strategic Impact
                            </span>
                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                              {activeTimelineEntry.mattered}
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                              Technical Proof
                            </span>
                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                              {activeTimelineEntry.proves}
                            </p>
                          </div>
                          <div className="space-y-1.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Commit Evidence
                            </span>
                            <p className="text-sm font-mono text-slate-600 dark:text-slate-300">
                              {activeTimelineEntry.validation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* proc-3: Multi-LLM Toolchain */}
                <section id="proc-3" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
                      Phase 3
                    </p>
                    <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                      Multi-LLM Toolchain
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                      The workflow used scoped tool roles, patch-note review, and validation gates.
                      AI accelerated delivery; human judgment controlled scope and acceptance.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {LLM_TOOLS.map((tool) => {
                      const isActive = activeLlmTool === tool.tool;
                      return (
                        <div
                          key={tool.tool}
                          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isActive ? 'border-tide-aqua/40 dark:border-tide-aqua/40' : 'border-slate-200 dark:border-slate-800'}`}
                        >
                          <button
                            onClick={() => setActiveLlmTool(isActive ? null : tool.tool)}
                            className="w-full text-left p-5 space-y-2 bg-white dark:bg-[#0B0F19] hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-tide-aqua' : 'bg-slate-300 dark:bg-slate-600'}`}
                                />
                                <h3
                                  className={`font-bold text-sm ${isActive ? 'text-tide-aqua dark:text-tide-sky' : 'text-slate-950 dark:text-white'}`}
                                >
                                  {tool.tool}
                                </h3>
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`shrink-0 w-4 h-4 transition-transform duration-200 text-slate-400 ${isActive ? 'rotate-180' : ''}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {tool.role}
                            </p>
                          </button>
                          {isActive && (
                            <div className="px-5 pb-5 bg-tide-aqua/5 dark:bg-tide-aqua/10 border-t border-tide-aqua/20 space-y-4 animate-in fade-in duration-150">
                              <div className="pt-4 space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-tide-aqua dark:text-tide-sky block">
                                  Key Tasks
                                </span>
                                <ul className="space-y-1.5">
                                  {tool.tasks.map((task) => (
                                    <li
                                      key={task}
                                      className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200"
                                    >
                                      <span className="w-1 h-1 rounded-full bg-tide-aqua mt-1.5 shrink-0" />
                                      {task}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                                  Contribution Context
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {tool.contribution}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* proc-4: AI-Assisted Delivery Model */}
                <section id="proc-4" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
                      Phase 4
                    </p>
                    <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                      AI-Assisted Delivery Model
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                      Each cycle converted a design or architecture problem into a branch-level
                      task, reviewed the resulting patch notes, validated the output, and used
                      follow-up prompts to resolve defects or drift.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] overflow-hidden">
                    {[
                      {
                        step: '1',
                        title: 'Strategy & Critique',
                        desc: 'Define the design or architecture problem. Get independent critique before scoping.',
                      },
                      {
                        step: '2',
                        title: 'Scoped Implementation Prompt',
                        desc: 'Convert the problem to a precisely bounded task. No open-ended generation.',
                      },
                      {
                        step: '3',
                        title: 'Branch-Based Execution',
                        desc: 'Implement in isolation. Each branch addresses a single scoped change.',
                      },
                      {
                        step: '4',
                        title: 'Patch-Note Review',
                        desc: 'Review AI-generated changes against the scoped intent. Reject drift.',
                      },
                      {
                        step: '5',
                        title: 'Static Validation',
                        desc: 'Run typecheck, lint, tests, and build. Zero-tolerance on failures.',
                      },
                      {
                        step: '6',
                        title: 'Manual & Visual Audit',
                        desc: 'Where possible, verify UI outcomes manually in addition to automated checks.',
                      },
                      {
                        step: '7',
                        title: 'Bugfix Prompt',
                        desc: 'Targeted follow-up for defects found in review. Document in the ledger.',
                      },
                      {
                        step: '8',
                        title: 'Evidence Ledger Update',
                        desc: 'Record the decision, outcome, and remaining risk before closing the cycle.',
                      },
                    ].map((item, i) => (
                      <div
                        key={item.step}
                        className={`flex items-start gap-5 p-5 ${i > 0 ? 'border-t border-slate-200 dark:border-slate-800' : ''}`}
                      >
                        <span className="shrink-0 w-8 h-8 rounded-full bg-tide-aqua/10 dark:bg-tide-aqua/20 border border-tide-aqua/30 flex items-center justify-center text-xs font-bold text-tide-aqua dark:text-tide-sky">
                          {item.step}
                        </span>
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-950 dark:text-white text-sm">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* proc-5: Architecture & Governance */}
                <section id="proc-5" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
                      Phase 5
                    </p>
                    <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                      Architecture Migration &amp; Digital Twin Governance
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] p-6 space-y-4">
                      <h3 className="font-bold text-slate-950 dark:text-white">
                        Projects Architecture Migration
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Legacy{' '}
                        <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          /case-studies
                        </code>{' '}
                        naming became technical debt as project taxonomy expanded. The canonical
                        model moved to{' '}
                        <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          /projects
                        </code>{' '}
                        and{' '}
                        <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          /projects/:projectId
                        </code>
                        , while compatibility redirects were preserved during migration.
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Shared metadata in{' '}
                        <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          projectMetadata.ts
                        </code>{' '}
                        now powers featured/supporting taxonomy, role filters, and consistent links
                        across Home, Projects Index, Site Index, and Project Detail.
                      </p>

                      <div className="space-y-2 pt-2">
                        <h4 className="font-semibold text-slate-950 dark:text-white text-sm">
                          Branch Isolation Model
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          Every implementation cycle ran on a dedicated branch:{' '}
                          <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            main
                          </code>{' '}
                          = stable production,{' '}
                          <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            feat/phase-5.3-deep-dive-overhaul
                          </code>{' '}
                          = scoped feature work,{' '}
                          <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            archive/phase-3-baseline
                          </code>{' '}
                          = frozen evidence snapshot. No AI-generated change was applied directly to
                          main — every change passed through a reviewed PR.
                        </p>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h4 className="font-semibold text-slate-950 dark:text-white text-sm">
                          Shared Metadata Structure
                        </h4>
                        <pre className="text-xs bg-slate-100 dark:bg-slate-800 rounded-xl p-4 overflow-x-auto text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                          {`// src/constants/projectMetadata.ts (simplified)
{
  id: 'guynode',
  title: 'Guynode GIS System',
  href: '/projects/guynode',
  category: 'featured',
  roles: ['gis', 'implementation'],
  tags: ['GIS', 'TypeScript', 'React'],
}`}
                        </pre>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] p-6 space-y-4">
                      <h3 className="font-bold text-slate-950 dark:text-white">
                        Digital Twin Governance
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Designed as a scoped AI support system, not a general chatbot. Its value
                        comes from how it handles relevance, cost, routing, failure states, and
                        human escalation.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {[
                          'Portfolio-only scope gate',
                          'Response budget & rate limits',
                          'Relevance and expensive-query gates',
                          'Prompt-injection deflection',
                          'Approved navigation commands',
                          'Human handoff on confidence failure',
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-tide-aqua shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* proc-6: Validation & Evidence */}
                <section id="proc-6" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua dark:text-tide-sky">
                      Phase 6
                    </p>
                    <h2 className="text-3xl font-outfit font-bold text-slate-950 dark:text-white">
                      Validation Trail &amp; Evidence
                    </h2>
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <table className="min-w-full text-sm">
                      <thead className="bg-slate-100 dark:bg-slate-900">
                        <tr>
                          <th className="text-left p-3 text-slate-700 dark:text-slate-200 font-bold">
                            Area
                          </th>
                          <th className="text-left p-3 text-slate-700 dark:text-slate-200 font-bold">
                            Validation
                          </th>
                          <th className="text-left p-3 text-slate-700 dark:text-slate-200 font-bold">
                            Result
                          </th>
                          <th className="text-left p-3 text-slate-700 dark:text-slate-200 font-bold">
                            Notes
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            area: 'Repo checks',
                            validation: 'npm run typecheck / lint / test / build',
                            result: 'Passing',
                            badge: 'green' as const,
                            notes: 'Build includes non-blocking Vite chunk-size advisory.',
                          },
                          {
                            area: 'Routing',
                            validation: 'routing.test.tsx updates',
                            result: 'Validated',
                            badge: 'green' as const,
                            notes: 'Covers canonical and compatibility behavior.',
                          },
                          {
                            area: 'Project detail bugfix',
                            validation: 'Route param + loader fallback tests',
                            result: 'Validated',
                            badge: 'green' as const,
                            notes:
                              'Addresses projectId compatibility and app-shell fallback hardening.',
                          },
                          {
                            area: 'Manual browser QA',
                            validation: 'Interactive page checks',
                            result: 'Partial',
                            badge: 'amber' as const,
                            notes:
                              'Ledger distinguishes automated evidence from full browser sweeps.',
                          },
                        ].map((row, i) => (
                          <tr
                            key={row.area}
                            className={`align-top ${i > 0 ? 'border-t border-slate-200 dark:border-slate-800' : ''}`}
                          >
                            <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                              {row.area}
                            </td>
                            <td className="p-3 text-slate-600 dark:text-slate-300">
                              {row.validation}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  row.badge === 'green'
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                }`}
                              >
                                {row.result}
                              </span>
                            </td>
                            <td className="p-3 text-slate-500 dark:text-slate-400 text-xs">
                              {row.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      className={`rounded-2xl border p-6 space-y-3 ${componentRecipes.card.surface}`}
                    >
                      <h3 className="font-bold text-slate-950 dark:text-white">Decision Log</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Key decisions: migrate to canonical projects routes, preserve compatibility
                        aliases during transition, promote Guynode and Digital Twin as flagship
                        proof systems, centralize metadata, and keep Process separate from Projects
                        browsing for reviewer clarity.
                      </p>
                    </div>
                    <div
                      className={`rounded-2xl border p-6 space-y-3 ${componentRecipes.card.surface}`}
                    >
                      <h3 className="font-bold text-slate-950 dark:text-white">
                        Remaining Release Hardening
                      </h3>
                      <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                        {[
                          'Final browser-interactive QA sweep.',
                          'Scroll-to-top and long-page usability polish.',
                          'Contextual Digital Twin entry points on track pages.',
                          'Final accessibility and mobile audit.',
                          'Legacy case-study alias cleanup after dependency checks.',
                          'Final public copy audit for concise consistency.',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0">
                              —
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`rounded-2xl border p-6 space-y-3 ${componentRecipes.card.surface}`}
                  >
                    <h3 className="font-bold text-slate-950 dark:text-white">Evidence Ledger</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      The public Process page summarizes the build. The evidence ledger records the
                      deeper source trail: files, phases, decisions, Git evidence, validation notes,
                      and remaining risks. Maintained as an internal documentation artifact at{' '}
                      <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        docs/portfolio2-evidence-audit-ledger.md
                      </code>
                      .
                    </p>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ── Luxe Lofts Tab ── */}
          {activeMainTab === 'luxe-lofts' && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Sidebar Timeline */}
              <aside className="hidden md:block w-48 shrink-0 relative">
                <div className="sticky top-28 space-y-4 border-l-2 border-slate-200 dark:border-slate-800 py-4">
                  {[
                    { id: 'phase-1', label: 'Strategic Context' },
                    { id: 'phase-2', label: 'Audit Diagnostics' },
                    { id: 'phase-3', label: 'Solution Architecture' },
                    { id: 'phase-4', label: 'KPI Dashboard' },
                    { id: 'phase-5', label: 'Commercial Offering' },
                    { id: 'phase-6', label: 'Prototype Bounding' },
                  ].map((phase) => (
                    <div key={phase.id} className="relative -ml-[9px] flex items-center">
                      <button
                        onClick={() => scrollTo(phase.id)}
                        className="flex items-center gap-4 group w-full text-left focus:outline-none"
                      >
                        <span
                          className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                            activePhase === phase.id
                              ? 'bg-rose-500 border-rose-500 ring-4 ring-rose-500/20'
                              : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 group-hover:border-rose-400'
                          }`}
                        />
                        <span
                          className={`text-sm font-semibold transition-colors duration-300 ${
                            activePhase === phase.id
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {phase.label}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 space-y-12 min-w-0">
                {/* Header and Context */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500">
                      Restructuring Strategy
                    </span>
                    <span className="rounded-full border border-rose-500/25 bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-rose-500 uppercase tracking-wider">
                      Audit-Driven Case Study
                    </span>
                  </div>
                  <h1 className="text-4xl font-outfit font-extrabold text-slate-950 dark:text-white">
                    Luxe Lofts: Digital Restructuring Strategy
                  </h1>
                  <p className={`${semanticTokens.text.body} max-w-4xl text-lg leading-relaxed`}>
                    A complete strategic deep dive into the Luxe Lofts digital ecosystem. This page
                    details how our comprehensive audits of the legacy, contractor-delivered, and
                    vibecoded web systems drove a transition from an inefficient, superficial
                    "brochure" site to a highly polished, conversion-oriented operational engine.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm font-semibold text-rose-600 dark:text-rose-400">
                    <Link
                      to="/projects/luxe-lofts"
                      className="hover:underline flex items-center gap-1"
                    >
                      ← Back to Luxe Lofts Case Study
                    </Link>
                    <Link
                      to="/projects/ops-triage"
                      className="hover:underline flex items-center gap-1"
                    >
                      ← Back to Ops Triage Case Study
                    </Link>
                    <Link to={PROJECTS_HREF} className="hover:underline">
                      View Projects Library
                    </Link>
                  </div>
                </section>

                <DeepDiveBridge bridge={DEEP_DIVE_BRIDGES['luxe-lofts']} accent="rose" />

                {/* Deployed Mockup Call-to-Action */}
                <section className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 dark:border-rose-500/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                        <span className="text-xl">🏛️</span> Proposed Luxe Lofts Redesign
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                        Experience the premium frontend showcase deployed on Google Cloud Run. The
                        prototype features client-side navigation, stylized booking package cards,
                        and a demo AI Event Planner assistant.
                      </p>
                    </div>
                    <a
                      href="https://luxe-lofts-roadmap-repo-786228485832.us-central1.run.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm px-5 py-3 transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    >
                      Launch Proposed Redesign →
                    </a>
                  </div>
                </section>

                {/* Backlink to Simulator Callout */}
                <section className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 dark:border-rose-500/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                        <span className="text-xl">🎛️</span> Looking for the Operational Triage
                        Simulator?
                      </h3>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-rose-500 font-bold">
                        Process Automation &amp; Ticket Telemetry Alignment
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                        While Luxe Lofts and the Operational Triage dashboard are distinct project
                        entries (representing local business strategy vs. high-velocity ticket queue
                        telemetry), their backend process automation algorithms are conceptually
                        aligned. You can interact with the live telemetry engine directly on the
                        dedicated Ops Triage case study page.
                      </p>
                    </div>
                    <Link
                      to="/projects/ops-triage"
                      className="shrink-0 inline-flex items-center justify-center rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm px-5 py-3 transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    >
                      Open Live Triage Console →
                    </Link>
                  </div>
                </section>

                {/* Section 1: Visual vs. Operational Dichotomy */}
                <section id="phase-1" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      1. Strategic Context &amp; "Visual vs. Operational" Dichotomy
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      Commercial local venues suffer when websites act merely as static catalogs. A
                      true digital turnaround requires bridging the gap between elegant first
                      impressions and frictionless business execution.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: Brochure-Ware */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19] space-y-4">
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                        <span className="text-lg">📉</span>
                        <h3 className="font-bold text-lg">
                          Brochure-Ware (Contractor &amp; Legacy Audits)
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        "Visually passable but strategically shallow." Relying on generic templates,
                        stock placeholders, and broken links, these layouts failed to convey brand
                        trust or qualify booking intent.
                      </p>
                      <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✕</span>
                          <span>
                            <strong>Placeholder Price Dilution:</strong> Unresolved pricing markers
                            (like "$ -") created evasive messaging and customer friction.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✕</span>
                          <span>
                            <strong>Stock Image Dependency:</strong> Non-authenticated photography
                            failed to demonstrate actual layout capabilities or lighting setups.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✕</span>
                          <span>
                            <strong>Static "Dead End" CTAs:</strong> Generic tour buttons opening
                            unformatted email drafts, creating extensive manual follow-up loops.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✕</span>
                          <span>
                            <strong>Heavy Technical Overhead:</strong> Brittle Google Maps API
                            dependencies and unoptimized media slowing mobile search crawling.
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Right Column: Dynamic Ecosystem */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 dark:border-rose-500/10 dark:bg-rose-500/5 space-y-4">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                        <span className="text-lg">📈</span>
                        <h3 className="font-bold text-lg">
                          Ecosystem Architecture (Redesigned Mockup)
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        A single-page-of-truth conversion journey. Consolidating visual proof,
                        structural qualifiers, dynamic pricing, and direct administrative routes
                        into a unified, high-performing lead generation engine.
                      </p>
                      <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>
                            <strong>Curated Offer Menus:</strong> Upfront pricing tiers that qualify
                            customer budgets and filter unviable bookings instantly.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>
                            <strong>Real Venue Asset Plan:</strong> Gallery layouts emphasizing
                            layout boundaries, event types (showers, weddings), and spatial flow.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>
                            <strong>Guided Triage Funnel:</strong> Booking inquiries capture backup
                            dates, guest counts, and caterer requirements with strict guardrails.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>
                            <strong>Modern Serverless Tech Stack:</strong> Local Leaflet
                            integrations, LocalBusiness JSON-LD structure, and Cloud Run backend
                            APIs.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2: Interactive Audit Diagnostics Panel */}
                <section id="phase-2" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      2. Interactive Audit Diagnostics Panel
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      Browse our detailed findings across four core operational domains. Explore the
                      gaps uncovered in prior audits and see the concrete design translations
                      implemented within our high-conversion mockup system.
                    </p>
                  </div>

                  {/* Sub-tab selection */}
                  <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    {(['visuals', 'ux', 'technical', 'content'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveDiagTab(tab)}
                        className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                          activeDiagTab === tab
                            ? 'bg-rose-500 text-white shadow'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-800'
                        }`}
                      >
                        {tab === 'visuals' && '🎨 Brand & Visuals'}
                        {tab === 'ux' && '🧭 UX & Navigation'}
                        {tab === 'technical' && '⚡ Technical & SEO'}
                        {tab === 'content' && '📝 Content & Offer'}
                      </button>
                    ))}
                  </div>

                  {/* Tab content panel */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19] space-y-6">
                    {activeDiagTab === 'visuals' && (
                      <div className="space-y-4">
                        <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                            🎨 Brand &amp; Visual Consistency
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            How typography, styling, and visual proof dictate price perception.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-rose-500">Uncovered Gap</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              The contractor-delivered site looked visually passable but lacked
                              strategic depth. Re-used template blocks, generic dark and gold
                              accents, and stock image placeholders diluted brand credibility, while
                              spell-check misses like <strong>"OCCASSIONS"</strong> eroded visual
                              polish.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-rose-500">
                              Strategic Business Impact
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              For a premium venue, visual polish is directly tied to pricing power.
                              When typography is generic or images feel fake, visitors assume the
                              physical space is equally generic, driving them to lower their
                              spending limits or doubt the venue's operational capabilities.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-emerald-500">
                              Mockup Implementation
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              We introduced an intentional brand system: <strong>Spectral</strong>{' '}
                              (elegant, warm editorial display) paired with <strong>Jost</strong>{' '}
                              (clean modern geometric body). Replaced generic stock files with a
                              highly targeted real-asset loading plan mapping high-atmosphere venue
                              photos directly to use cases.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeDiagTab === 'ux' && (
                      <div className="space-y-4">
                        <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                            🧭 UX &amp; Navigation Flow
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Eliminating friction points to capture high-intent leads.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-rose-500">Uncovered Gap</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              The contractor site worked like a brochure rather than a booking
                              funnel. Standard "Book a Tour" triggers opened raw mailto tags with no
                              fields to capture guest capacity, budgeting range, backup dates, or
                              catering preferences.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-rose-500">
                              Strategic Business Impact
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              Incomplete leads force operations to spend hours chasing basics (guest
                              count, budget, date alignment). High-intent planners drop off
                              instantly if they cannot verify spatial layout availability or
                              capacity rules during their initial search.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-emerald-500">
                              Mockup Implementation
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              Designed a single-page conversion pathway. Embedded a structured
                              intake form capturing essential event attributes with explicit
                              qualifiers ("Submitting this does not confirm booking"). Created
                              bypass links (<code>?demo=1</code>) to easily preview client and admin
                              modules.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeDiagTab === 'technical' && (
                      <div className="space-y-4">
                        <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                            ⚡ Technical &amp; SEO Discovery
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Accelerating search crawlers and eliminating external API friction.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-rose-500">Uncovered Gap</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              Heavy uncompressed images dragging down mobile performance. Brittle
                              dependency on hardcoded Google Maps API credentials which broke during
                              sandbox offline testing. Vague text headings that lacked localized
                              keywords for regional discoverability.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-rose-500">
                              Strategic Business Impact
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              Venues rely heavily on local organic queries (e.g., "event space near
                              me"). When headings lack structure, regional crawler search scores
                              plummet. Slow performance and Google API credential breakage during
                              reviews directly block user conversions.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-emerald-500">
                              Mockup Implementation
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              Adopted structured React components optimized for rapid layout
                              scaling. Ported interactive maps to an open-source Leaflet +
                              OpenStreetMap engine to eliminate API setup blockers. Implemented
                              canonical <strong>LocalBusiness JSON-LD schema</strong> and semantic
                              SEO heading routes.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeDiagTab === 'content' && (
                      <div className="space-y-4">
                        <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                            📝 Content &amp; Offer Architecture
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Structuring pricing, rules, and social proof with commercial clarity.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-rose-500">Uncovered Gap</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              Pricing cards showing blank placeholders (like <strong>"$ -"</strong>
                              ), leaving users completely in the dark. Testimonials and policy
                              guidelines lacking capacity bounds, alcohol/bar limits, catering
                              guidelines, or deposit instructions.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-rose-500">
                              Strategic Business Impact
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              Hiding pricing is a massive conversion killer. Planners suspect
                              custom-quoted venue costs are arbitrarily inflated. Missing basic
                              logistical rules (cancellations, deposits, cleaning responsibilities)
                              results in heavy manual client sorting overhead.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-emerald-500">
                              Mockup Implementation
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              Established clear commercial packages (Keep It Simple, Starter,
                              Standard, Premium Tiers) matching guest counts. Outlined a clean
                              logistical policy FAQ. Labeled mock testimonials transparently as
                              proposal visual layouts to verify site architecture without misleading
                              users.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Section 3: Structured Solution Architecture & "4 Pillars" */}
                <section id="phase-3" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      3. Structured Solution Architecture &amp; "4 Pillars"
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      Our digital turnaround strategy rests upon four foundational pillars,
                      connecting front-end conversions directly to backend database operations and
                      customer scheduling.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                      <span className="text-2xl">🖼️</span>
                      <h3 className="font-bold text-slate-950 dark:text-white text-base">
                        Pillar 1: High-Conversion Brand Showcase
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Elegantly designed layouts using <strong>Spectral + Jost</strong> display
                        typography. Consolidates real venue imagery, event-type capability cards,
                        and spatial layout planning maps into a single guided decision page that
                        enhances venue prestige.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                      <span className="text-2xl">🎯</span>
                      <h3 className="font-bold text-slate-950 dark:text-white text-base">
                        Pillar 2: Guided Intent Intake Engine
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        An interactive planning helper and structured booking form capturing backup
                        dates, guest counts, and catering preferences. Integrates campaign UTM
                        source capture utilities to map marketing traffic directly to CRM lead
                        entries.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                      <span className="text-2xl">🔑</span>
                      <h3 className="font-bold text-slate-950 dark:text-white text-base">
                        Pillar 3: Unified Client Planning Portal
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        A frictionless client-facing workspace featuring reviewer bypass modes (
                        <code>?demo=1</code>). Built to integrate with{' '}
                        <strong>Firebase Auth &amp; Google Sign-In</strong> for frictionless client
                        access, secure collaborative seating layouts, and payment tracking.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                      <span className="text-2xl">📊</span>
                      <h3 className="font-bold text-slate-950 dark:text-white text-base">
                        Pillar 4: Unified Admin Triage Dashboard
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        A unified operational control panel designed to run as a secure{' '}
                        <strong>Google Cloud Run</strong> backend service. Streamlines lead
                        assignment, pipeline queue triage, and automated AI coordination.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 4: Dual-Perspective KPI Dashboard */}
                <section id="phase-4" className="space-y-6 scroll-mt-24">
                  <div className="space-y-4 md:flex md:items-center md:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                        4. Dual-Perspective KPI Dashboard
                      </h2>
                      <p className={`${semanticTokens.text.body} max-w-xl`}>
                        Track results across two operational planes: Business/Owner operations and
                        technical system telemetry.
                      </p>
                    </div>
                    {/* View switcher */}
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl shrink-0 border border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => setKpiView('owner')}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                          kpiView === 'owner'
                            ? 'bg-rose-500 text-white shadow'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                        }`}
                      >
                        💼 Business Operations
                      </button>
                      <button
                        onClick={() => setKpiView('telemetry')}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                          kpiView === 'telemetry'
                            ? 'bg-rose-500 text-white shadow'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                        }`}
                      >
                        🎛️ System Telemetry
                      </button>
                    </div>
                  </div>

                  {/* Dashboard stats display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpiView === 'owner' ? (
                      <>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                            Lead Qualification Accuracy
                          </span>
                          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-outfit">
                            +40%
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Projected lift from structured, multi-field intake forms vs. raw emails.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                            Administrative Overhead
                          </span>
                          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-outfit">
                            -15 hrs/wk
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Average owner administrative time saved by automated CRM intake
                            pipelines.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                            Average Contract Value
                          </span>
                          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-outfit">
                            +25%
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Projected revenue lift via upfront tiered packages and upsell menus.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                            Booking Funnel Conversion
                          </span>
                          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-outfit">
                            +3.2%
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Estimated increase driven by real proof visuals and immediate policy
                            clarity.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                            Pipeline First-Pass Yield (FPY)
                          </span>
                          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-outfit">
                            94.2%
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Verified transition accuracy across database updates under simulator
                            loads.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                            System Backlog SLA Risk
                          </span>
                          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-outfit">
                            &lt; 1.0%
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Risk rating limit managed by automated high-capacity queuing thresholds.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                            Microservices Latency
                          </span>
                          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-outfit">
                            &lt; 200ms
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Average endpoint request time across Cloud Run serverless execution
                            points.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                            Incident Defect Leakage
                          </span>
                          <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-outfit">
                            &lt; 0.5%
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            QA triage filter validation rate limiting raw data payload escapes.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </section>

                {/* Section 5: Commercial Offering / Pricing Tiers */}
                <section id="phase-5" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      5. Commercial Offering &amp; Pricing Menu
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      A transparent offer architecture designed to address legacy pricing ambiguity.
                      Mapped guest limits, support staffing, and coordination resources to specific
                      price boundaries to streamline client qualification.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                          Tier 1
                        </span>
                        <h3 className="font-bold text-slate-950 dark:text-white text-lg">
                          Keep It Simple
                        </h3>
                        <div className="text-2xl font-extrabold text-slate-950 dark:text-white">
                          $500
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          Essential space access for quick events. Best-fit for micro-showers,
                          photography sessions, and content creation.
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-white/5 pt-3 font-sans">
                        <li>• Max Capacity: 30 guests</li>
                        <li>• Renter setup &amp; teardown</li>
                        <li>• Basic sound system hookup</li>
                        <li>• Standard policy qualifiers</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                          Tier 2
                        </span>
                        <h3 className="font-bold text-slate-950 dark:text-white text-lg">
                          Starter Package
                        </h3>
                        <div className="text-2xl font-extrabold text-slate-950 dark:text-white">
                          $1,500
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          Extended half-day access with fundamental hosting features. Perfect for
                          family celebrations and mixers.
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-white/5 pt-3 font-sans">
                        <li>• Max Capacity: 50 guests</li>
                        <li>• 6-Hour rental window</li>
                        <li>• 1 Dedicated host coordinator</li>
                        <li>• Cleaning &amp; waste services</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 dark:border-rose-500/40 dark:bg-rose-500/10 space-y-4 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-rose-500 text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                        Popular
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block">
                          Tier 3
                        </span>
                        <h3 className="font-bold text-slate-950 dark:text-white text-lg">
                          Standard Experience
                        </h3>
                        <div className="text-2xl font-extrabold text-slate-950 dark:text-white">
                          $2,500
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          Full-day premium venue package. Crafted for weddings, larger formal
                          events, and upscale corporate workshops.
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 border-t border-rose-500/15 pt-3 font-sans">
                        <li>• Max Capacity: 75 guests</li>
                        <li>• 12-Hour full-day access</li>
                        <li>• Premier coordinator &amp; AV staff</li>
                        <li>• Pre-event spatial layout helper</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                          Tier 4
                        </span>
                        <h3 className="font-bold text-slate-950 dark:text-white text-lg">
                          Premium Experience
                        </h3>
                        <div className="text-2xl font-extrabold text-slate-950 dark:text-white">
                          $4,000+
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          Full weekend private booking. The ultimate venue bundle featuring curated
                          decor styling and catering channels.
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-white/5 pt-3 font-sans">
                        <li>• Capacity: 100 max boundary</li>
                        <li>• Multi-day full weekend use</li>
                        <li>• Full coordination &amp; concierge</li>
                        <li>• Custom caterer/alcohol options</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 6: Prototype Bounding & Production Roadmap */}
                <section
                  id="phase-6"
                  className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800 scroll-mt-24"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      6. Prototype Bounding &amp; Production Roadmap
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      To ensure the portfolio mockup remains high-performing, portable, and entirely
                      secure, certain operational integrations have been strategically bounded.
                      Below is an explicit translation of what was deferred from the prototype, how
                      it would be built in production, and the value it delivers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                          <span>🔒</span>
                          <span>Google Cloud Run &amp; Firebase Auth Integration</span>
                        </div>
                        <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
                          <p className="text-slate-600 dark:text-slate-300">
                            <strong>Mockup Strategy:</strong> Kept the frontend UI completely
                            client-side. The dashboard, client portals, and contact pipelines
                            simulate operations locally using state variables.
                          </p>
                          <p className="text-slate-500 dark:text-slate-400">
                            <strong>Production Build:</strong> Runs behind a secure{' '}
                            <strong>Google Cloud Run API</strong> backend connected to{' '}
                            <strong>Firebase Auth / Identity Platform</strong>.
                          </p>
                        </div>
                      </div>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium text-[10px] pt-2 border-t border-slate-100 dark:border-white/5">
                        Value: Direct integration with Google Cloud makes it frictionless to
                        natively support Google Sign-On/Google OAuth for high-trust auth.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                          <span>🤖</span>
                          <span>Bounded AI Chatbot &amp; Event Planner Suite</span>
                        </div>
                        <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
                          <p className="text-slate-600 dark:text-slate-300">
                            <strong>Mockup Strategy:</strong> Houses both the conversational AI
                            Event Planner and a supportive site assistant chatbot, simulated locally
                            for zero latency.
                          </p>
                          <p className="text-slate-500 dark:text-slate-400">
                            <strong>Rationale &amp; Skills Transfer:</strong> Reinforces the
                            identical conversational logic and safety state-machine framework
                            deployed in the <strong>"Digital Twin"</strong> project, adapted here to
                            guide booking intent and resolve logistical objections.
                          </p>
                        </div>
                      </div>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium text-[10px] pt-2 border-t border-slate-100 dark:border-white/5">
                        Value: Demonstrates ability to implement commercial chatbot architectures
                        while avoiding live LLM billing exploitation.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                          <span>📅</span>
                          <span>Simulated Calendar vs. Live Google Calendar API</span>
                        </div>
                        <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
                          <p className="text-slate-600 dark:text-slate-300">
                            <strong>Mockup Strategy:</strong> Uses interactive date selection
                            components displaying mock slots to simulate date inquiry conflict
                            resolution.
                          </p>
                          <p className="text-slate-500 dark:text-slate-400">
                            <strong>Production Build:</strong> Integrates Google Calendar OAuth2
                            client sync, booking schedules directly onto the venue's master calendar
                            to automatically lock slots.
                          </p>
                        </div>
                      </div>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium text-[10px] pt-2 border-t border-slate-100 dark:border-white/5">
                        Value: Eliminates manual owner confirmation overhead and booking double-ups,
                        letting clients lock in dates instantly.
                      </p>
                    </div>
                  </div>

                  {/* Footnote on Package Dissonance */}
                  <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 dark:border-amber-500/40 dark:bg-amber-500/10 space-y-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                      <span>💡</span>
                      <span>Strategic Package Alignment Rationale</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      You may observe a strategic variation between the public-facing mockup
                      packages (which focus on <strong>frictionless value qualification</strong>{' '}
                      like <em>Simple Rental</em>, <em>Celebration Setup</em>, and{' '}
                      <em>Premium Experience</em>) and the precise pricing models featured in the
                      deep dive dashboard (which detail exact financial tiers like{' '}
                      <strong>$500 to $4,000+</strong>). This is an{' '}
                      <strong>intentional operations choice</strong>:
                    </p>
                    <ul className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed list-disc list-inside font-sans pl-2">
                      <li>
                        <strong>Public-Facing Site:</strong> Focuses on emotional buy-in, spatial
                        visualization, and conversion. It groups offers conceptually to capture
                        leads without triggering immediate price-anchoring friction.
                      </li>
                      <li>
                        <strong>Internal Business/Investor View:</strong> Outlines exact capacity
                        limits, staffing cost boundaries, and margin qualification standards to
                        support corporate turnaround strategy presentations.
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ── Northern Grind Tab ── */}
          {activeMainTab === 'northern-grind' && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Sidebar Timeline */}
              <aside className="hidden md:block w-48 shrink-0 relative">
                <div className="sticky top-28 space-y-4 border-l-2 border-slate-200 dark:border-slate-800 py-4">
                  {NG_PHASES.map((phase) => (
                    <div key={phase.id} className="relative -ml-[9px] flex items-center">
                      <button
                        onClick={() => scrollTo(phase.id)}
                        className="flex items-center gap-4 group w-full text-left focus:outline-none"
                      >
                        <span
                          className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                            activeNgPhase === phase.id
                              ? 'bg-amber-500 border-amber-500 ring-4 ring-amber-500/20'
                              : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 group-hover:border-amber-400'
                          }`}
                        />
                        <span
                          className={`text-sm font-semibold transition-colors duration-300 ${
                            activeNgPhase === phase.id
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {phase.label}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 space-y-12 min-w-0">
                {/* Header */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
                      Brand &amp; Operations
                    </span>
                    <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      Strategy Proposal
                    </span>
                  </div>
                  <h1 className="text-4xl font-outfit font-extrabold text-slate-950 dark:text-white">
                    Northern Grind: Business Systems Deep Dive
                  </h1>
                  <p className={`${semanticTokens.text.body} max-w-4xl text-lg leading-relaxed`}>
                    The long-form modeling behind the Northern Grind case study — where a café
                    rebrand was reframed as a system redesign. This page documents the brand
                    iteration, the break-even POS math, a margin-aware loyalty redesign, the
                    economics of treating delivery as customer acquisition, and a social-media
                    audit.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm font-semibold text-amber-600 dark:text-amber-400">
                    <Link
                      to="/projects/northern-grind"
                      className="hover:underline flex items-center gap-1"
                    >
                      ← Back to Northern Grind Case Study
                    </Link>
                    <Link to={PROJECTS_HREF} className="hover:underline">
                      View Projects Library
                    </Link>
                  </div>
                </section>

                <DeepDiveBridge bridge={DEEP_DIVE_BRIDGES['northern-grind']} accent="amber" />

                {/* Financial caveat */}
                <section className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 dark:border-amber-500/40 dark:bg-amber-500/10 space-y-2">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                    <span>💡</span>
                    <span>Modeling Caveat</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Every figure here is modeled from published U.S. processor rates and industry
                    norms, anchored to a <strong>$6.25 latte</strong> and{' '}
                    <strong>$10 sandwich</strong> baseline. This is a proposal — the numbers are to
                    be re-grounded against the café's actual COGS, margins, and live DoorDash
                    agreement before execution. No real revenue or customer figures are claimed.
                  </p>
                </section>

                {/* Section 1: Strategic Context */}
                <section id="ng-1" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      1. Strategic Context — Rebrand as System Redesign
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      The brief looked cosmetic — refresh the logo. The real opportunity was
                      operational: fragmented brand assets and a default loyalty setup were adding
                      decision friction for customers and leaving margin on the table — across five
                      surfaces that had never been designed as one system.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: 'The trap',
                        body: 'Treating brand, menu, POS, loyalty, and delivery as five separate one-off decisions — each locally reasonable, collectively leaking margin.',
                        tone: 'down',
                      },
                      {
                        title: 'The reframe',
                        body: 'One operational loop: a cohesive identity drives a faster menu, a margin-aware POS/loyalty layer, and delivery treated as a measurable acquisition channel.',
                        tone: 'up',
                      },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className={`rounded-2xl border p-6 space-y-3 ${
                          card.tone === 'up'
                            ? 'border-amber-500/20 bg-amber-500/5 dark:border-amber-500/20'
                            : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B0F19]'
                        }`}
                      >
                        <h3 className="font-bold text-lg text-slate-950 dark:text-white">
                          {card.tone === 'up' ? '📈 ' : '📉 '}
                          {card.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {card.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 2: Brand Identity */}
                <section id="ng-2" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      2. Brand Identity System
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      Six logo variants were explored against palette, symbolism, scalability, and
                      originality. The lesson held throughout: direction and curation matter more
                      than volume — simpler shapes and reduced text tested best with both staff and
                      customers.
                    </p>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Variant
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Purpose
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {NG_LOGO_VARIANTS.map((v) => (
                          <tr key={v.variant}>
                            <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                              {v.variant}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                              {v.purpose}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {NG_PALETTE.map((c) => (
                      <div
                        key={c.name}
                        className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2"
                      >
                        <span
                          className="block h-10 w-full rounded-lg border border-black/5"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-slate-950 dark:text-white">
                            {c.name}
                          </p>
                          <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                            {c.hex}
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300">
                            {c.meaning}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                    <strong className="text-slate-950 dark:text-white">Recommendation:</strong>{' '}
                    Brown + Gold as the primary mark, Community Green as the local secondary,
                    delivered as a responsive system (full badge → simplified icon → one-color) so
                    the identity holds from storefront signage down to a favicon.
                  </p>
                </section>

                {/* Section 3: POS & Loyalty */}
                <section id="ng-3" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      3. POS &amp; Loyalty Modeling
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      The café runs on Dripos with a flat loyalty loop ($5 off per 100 points, $1 =
                      1 point). I modeled three processors on margin preservation at small-ticket
                      volume — not feature sheets. (Dripos's published rates were inconsistent, so
                      both are carried as a range.)
                    </p>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Factor
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Dripos
                          </th>
                          <th className="px-4 py-3 font-bold text-amber-600 dark:text-amber-400">
                            Square
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Stripe
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {NG_POS_ROWS.map((row) => (
                          <tr key={row.factor}>
                            <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                              {row.factor}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                              {row.dripos}
                            </td>
                            <td className="px-4 py-3 text-slate-700 dark:text-slate-200 bg-amber-500/5">
                              {row.square}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                              {row.stripe}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2">
                    <h3 className="font-bold text-slate-950 dark:text-white">
                      Break-even findings
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <li>
                        <strong className="text-slate-800 dark:text-slate-100">
                          Dripos vs Square:
                        </strong>{' '}
                        even at its cheapest contract, Dripos only overtakes Square at ~1,037 latte
                        or ~1,215 sandwich transactions/month — beyond a typical single-location
                        volume.
                      </li>
                      <li>
                        <strong className="text-slate-800 dark:text-slate-100">
                          Stripe vs Square:
                        </strong>{' '}
                        Stripe stays cheaper overall while a third-party loyalty app stays under
                        ≈$170/mo at 1,000 transactions (≈$344/mo at 2,500) — the headroom that makes
                        the eventual loyalty build pay for itself.
                      </li>
                    </ul>
                    <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 pt-1">
                      Conclusion: Square now, Stripe as volume scales, skip Dripos.
                    </p>
                  </div>
                  <CostBreakEvenChart />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {NG_LOYALTY_MODELS.map((m) => (
                      <div
                        key={m.name}
                        className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2"
                      >
                        <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400">
                          {m.name}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {m.body}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
                    The three loyalty models are scoped as pilots — POS analytics pick the winner
                    rather than a guess locking in one structure.
                  </p>
                </section>

                {/* Section 4: Channel Economics */}
                <section id="ng-4" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      4. Channel Economics — DoorDash as Acquisition Cost
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      High-commission delivery was being treated as an ordinary sales channel. At
                      15–30% of gross order value, that erodes the gains from a better POS. The
                      reframe: stop measuring DoorDash as revenue and start measuring it as customer
                      acquisition.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {NG_CHANNEL_MODEL.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-2"
                      >
                        <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                          {stat.value}
                        </p>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                          {stat.label}
                        </p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                          {stat.body}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 dark:border-amber-500/20 space-y-3">
                    <h3 className="font-bold text-slate-950 dark:text-white flex items-center gap-2">
                      <span>🔁</span> The conversion funnel
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                      An in-bag card with a QR code routes every third-party order to the direct
                      Square/Stripe ordering page, offering{' '}
                      <strong>$5 off the first direct order</strong>. Avoiding a 25% commission on a
                      $30 order saves <strong>$7.50</strong> — so the $5 win-back pays for itself on
                      the very next order. A <strong>15–20% price differential</strong> on
                      third-party menus and a bias toward bundles/higher-AOV items absorb the
                      commission in the meantime.
                    </p>
                    <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                      Reclassify aggregators as a ~30% CAC channel — and track conversion rate,
                      repeat direct orders, and LTV:CAC instead of gross delivery revenue.
                    </p>
                  </div>
                </section>

                {/* Section 5: Digital Marketing */}
                <section id="ng-5" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      5. Digital Marketing Audit
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      The social presence didn't yet match the in-store experience — infrequent
                      posting and limited engagement meant Instagram read as a static product
                      catalog rather than a living brand. The smaller footprint is an advantage: a
                      few authentic, barista-generated posts can out-engage larger competitors on
                      locality and personality.
                    </p>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Category
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Current state
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Impact
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {NG_IG_AUDIT.map((row) => (
                          <tr key={row.category}>
                            <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                              {row.category}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                              {row.state}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                              {row.impact}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Metric
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Baseline
                          </th>
                          <th className="px-4 py-3 font-bold text-amber-600 dark:text-amber-400">
                            6-month goal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {NG_KPIS.map((row) => (
                          <tr key={row.metric}>
                            <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                              {row.metric}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                              {row.baseline}
                            </td>
                            <td className="px-4 py-3 text-slate-700 dark:text-slate-200 bg-amber-500/5 font-semibold">
                              {row.goal}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
                    Execution is built to be staff-sustainable: a shared content calendar, one
                    barista per week as Content Lead, three feed posts weekly, and one monthly
                    campaign — reviewed against the targets above. Goals are projected, not
                    measured.
                  </p>
                </section>

                {/* Asset Gallery */}
                <section id="ng-gallery" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      AI-Built Asset Gallery
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      Selected logo, menu, and social mockups produced for the rebrand — AI used for
                      generation and ideation, with manual curation and refinement. Direction and
                      taste did the deciding; the tools accelerated the exploration.
                    </p>
                  </div>
                  <BrandGallery />
                </section>

                {/* Section 6: Impact & Reflection */}
                <section id="ng-6" className="space-y-6 scroll-mt-24">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      6. Impact &amp; Reflection
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-4xl`}>
                      The throughline: small-business design succeeds when every visual and
                      operational choice tells the same story. Each surface below moves from a
                      one-off decision to part of one coherent, owner-runnable system.
                    </p>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Aspect
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-950 dark:text-white">
                            Before
                          </th>
                          <th className="px-4 py-3 font-bold text-amber-600 dark:text-amber-400">
                            After (proposed)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {NG_BEFORE_AFTER.map((row) => (
                          <tr key={row.aspect}>
                            <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                              {row.aspect}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                              {row.before}
                            </td>
                            <td className="px-4 py-3 text-slate-700 dark:text-slate-200 bg-amber-500/5">
                              {row.after}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm font-semibold text-amber-600 dark:text-amber-400 pt-2">
                    <Link
                      to="/projects/northern-grind"
                      className="hover:underline flex items-center gap-1"
                    >
                      ← Back to Northern Grind Case Study
                    </Link>
                    <Link to={PROJECTS_HREF} className="hover:underline">
                      View Projects Library
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
      <ScrollToTopButton />
    </div>
  );
};

export default DeepDiveView;
