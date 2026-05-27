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
import { componentRecipes, proseTheme, semanticTokens } from '../lib/design-system';

type IndexTab = { key: SectionKey; title: string; description: string; id: string };
type TimelineRow = {
  phase: string;
  changed: string;
  mattered: string;
  proves: string;
  validation: string;
};

const sectionOrder = [
  'build-timeline',
  'multi-llm-toolchain',
  'ai-assisted-delivery-model',
  'project-architecture-migration',
  'digital-twin-governance',
  'validation-trail',
  'evidence-ledger',
] as const;

type SectionKey = (typeof sectionOrder)[number];

const processIndexTabs: IndexTab[] = [
  {
    key: 'build-timeline',
    title: 'Build Timeline',
    description:
      'Major implementation phases from role-track redesign through Projects migration and Digital Twin hardening.',
    id: 'build-timeline',
  },
  {
    key: 'multi-llm-toolchain',
    title: 'Multi-LLM Toolchain',
    description:
      'How ChatGPT, Gemini, Claude, Claude Code, Google Jules, Codex, and GitHub contributed to a governed AI-assisted build process.',
    id: 'multi-llm-toolchain',
  },
  {
    key: 'ai-assisted-delivery-model',
    title: 'AI-Assisted Delivery Model',
    description:
      'Scoped branch-level execution model used to convert architecture decisions into validated implementation cycles.',
    id: 'ai-assisted-delivery-model',
  },
  {
    key: 'project-architecture-migration',
    title: 'Project Architecture Migration',
    description:
      'Migration from case-study language to canonical Projects routes, shared metadata, and recruiter-friendly proof browsing.',
    id: 'projects-architecture',
  },
  {
    key: 'digital-twin-governance',
    title: 'Digital Twin Governance',
    description:
      'Scope controls, cost limits, relevance gates, prompt-injection handling, approved commands, and human handoff.',
    id: 'digital-twin-governance',
  },
  {
    key: 'validation-trail',
    title: 'Validation Trail',
    description:
      'Typecheck, lint, tests, build checks, route validation, bugfixes, and known manual QA gaps.',
    id: 'validation-trail',
  },
  {
    key: 'evidence-ledger',
    title: 'Evidence Ledger',
    description:
      'Source-of-truth audit documenting files, commits, decisions, toolchain use, and remaining risks.',
    id: 'evidence-ledger',
  },
];

const hashToSectionMap: Partial<Record<string, SectionKey>> = {
  '#build-timeline': 'build-timeline',
  '#multi-llm-toolchain': 'multi-llm-toolchain',
  '#ai-assisted-delivery-model': 'ai-assisted-delivery-model',
  '#projects-architecture': 'project-architecture-migration',
  '#projects-architecture-migration': 'project-architecture-migration',
  '#digital-twin-governance': 'digital-twin-governance',
  '#validation-trail': 'validation-trail',
  '#evidence-ledger': 'evidence-ledger',
  '#decision-log': 'evidence-ledger',
  '#remaining-release-hardening': 'evidence-ledger',
};

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

const DeepDiveView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeMainTab, setActiveMainTab] = React.useState<'process' | 'luxe-lofts'>(
    tabParam === 'luxe-lofts' ? 'luxe-lofts' : 'process',
  );
  const [activeSection, setActiveSection] = React.useState<SectionKey>('build-timeline');
  const currentIndex = sectionOrder.indexOf(activeSection);

  const [activeDiagTab, setActiveDiagTab] = React.useState<
    'visuals' | 'ux' | 'technical' | 'content'
  >('visuals');
  const [kpiView, setKpiView] = React.useState<'owner' | 'telemetry'>('owner');

  React.useEffect(() => {
    if (tabParam === 'luxe-lofts' || tabParam === 'process') {
      setActiveMainTab(tabParam);
    }
  }, [tabParam]);

  const handleMainTabChange = (tab: 'process' | 'luxe-lofts') => {
    setActiveMainTab(tab);
    setSearchParams({ tab });
  };

  React.useEffect(() => {
    const syncSectionToHash = () => {
      const mappedSection = hashToSectionMap[window.location.hash];
      if (mappedSection) setActiveSection(mappedSection);
    };

    syncSectionToHash();
    window.addEventListener('hashchange', syncSectionToHash);
    return () => window.removeEventListener('hashchange', syncSectionToHash);
  }, []);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      return;
    }
    event.preventDefault();
    if (event.key === 'Home') return setActiveSection(sectionOrder[0]);
    if (event.key === 'End') return setActiveSection(sectionOrder[sectionOrder.length - 1]);
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + delta + sectionOrder.length) % sectionOrder.length;
    setActiveSection(sectionOrder[nextIndex]);
  };

  return (
    <div id="deep-dive-top" className="min-h-screen pt-20 pb-20 px-6">
      <ErrorBoundary location="Deep Dive View">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-wrap gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
            <button
              onClick={() => handleMainTabChange('process')}
              className={`text-lg font-bold px-4 py-2 rounded-t-lg transition ${activeMainTab === 'process' ? 'bg-slate-100 dark:bg-slate-800 text-navy-900 dark:text-white border-b-2 border-tide-aqua' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
            >
              Portfolio 2.0 Process & Governance
            </button>
            <button
              onClick={() => handleMainTabChange('luxe-lofts')}
              className={`text-lg font-bold px-4 py-2 rounded-t-lg transition ${activeMainTab === 'luxe-lofts' ? 'bg-slate-100 dark:bg-slate-800 text-navy-900 dark:text-white border-b-2 border-rose-500' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
            >
              Luxe Lofts Digital Restructuring Strategy
            </button>
          </div>

          {activeMainTab === 'process' ? (
            <div className="space-y-12">
              <section className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-tide-aqua">
                  Process
                </p>
                <h1 className="text-4xl font-outfit font-extrabold text-navy-900 dark:text-white">
                  Portfolio 2.0 Process Deep Dive
                </h1>
                <p className={`${semanticTokens.text.body} max-w-4xl`}>
                  This page documents how Portfolio 2.0 evolved from an AI-assisted prototype into a
                  role-track portfolio system with dedicated project architecture, Digital Twin
                  guardrails, site-wide navigation, and validation-backed implementation phases.
                </p>
                <p className={`${semanticTokens.text.body} max-w-4xl`}>
                  Projects show what was built. Process shows how the portfolio was planned,
                  governed, implemented, validated, and iterated.
                </p>
                <p className={`${semanticTokens.text.body} max-w-4xl`}>
                  Use this page to inspect the planning logic, AI-assisted workflow, route
                  migrations, project taxonomy, validation passes, and remaining cleanup work behind
                  the portfolio.
                </p>
                <div className="flex flex-wrap gap-4 text-sm font-semibold text-[#237f86]">
                  <Link to={PROJECTS_HREF}>View Projects Library</Link>
                  <Link to={SITE_INDEX_HREF}>Open Site Index</Link>
                  <Link to={DIGITAL_TWIN_PROJECT_HREF}>View Digital Twin Project</Link>
                  <Link to={GUYNODE_SYSTEM_HREF}>View Guynode Project</Link>
                  <Link to={RESUME_HREF}>View Resume</Link>
                </div>
              </section>

              <section className="space-y-4" aria-labelledby="process-index-tabs-heading">
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Process Index</h2>
                <div
                  role="tablist"
                  aria-label="Process Deep Dive sections"
                  className={`rounded-2xl p-3 border ${semanticTokens.border.default} ${semanticTokens.surface.panel}`}
                >
                  <div className="flex flex-wrap gap-2">
                    {processIndexTabs.map((tab, index) => (
                      <button
                        key={tab.key}
                        id={`process-tab-${tab.key}`}
                        type="button"
                        role="tab"
                        aria-selected={activeSection === tab.key}
                        aria-controls={`process-panel-${tab.key}`}
                        tabIndex={activeSection === tab.key ? 0 : -1}
                        onClick={() => setActiveSection(tab.key)}
                        onKeyDown={(event) => handleTabKeyDown(event, index)}
                        className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${activeSection === tab.key ? `${componentRecipes.button.primary} border-transparent shadow-sm ring-2 ring-offset-2 ring-tide-aqua dark:ring-offset-slate-950` : `${componentRecipes.button.secondary} bg-transparent`}`}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-ink-slate dark:text-slate-200">
                  Active section: <strong>{processIndexTabs[currentIndex]?.title}</strong>
                </p>
              </section>

              {activeSection === 'build-timeline' && (
                <section
                  id="build-timeline"
                  role="tabpanel"
                  aria-labelledby="process-tab-build-timeline"
                  aria-live="polite"
                  className={`scroll-mt-24 space-y-4 rounded-2xl border p-6 ${componentRecipes.card.surface}`}
                >
                  <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
                    Build Timeline / Phase Ladder
                  </h2>
                  <p className={`${proseTheme.paragraph} max-w-4xl`}>
                    This table captures phased implementation changes, why each shift mattered, and
                    the validation trail used to verify delivery outcomes.
                  </p>
                  <div className="max-h-[36rem] overflow-y-auto overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
                    <table className="min-w-full text-sm">
                      <thead className="sticky top-0 bg-slate-100 dark:bg-slate-900 z-10">
                        <tr>
                          <th className="text-left p-3">Phase</th>
                          <th className="text-left p-3">What changed</th>
                          <th className="text-left p-3">Why it mattered</th>
                          <th className="text-left p-3">What it proves</th>
                          <th className="text-left p-3">Validation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {buildTimeline.map((row) => (
                          <tr
                            key={row.phase}
                            className="border-t border-black/10 dark:border-white/10 align-top"
                          >
                            <td className="p-4 font-semibold">{row.phase}</td>
                            <td className="p-4">{row.changed}</td>
                            <td className="p-4">{row.mattered}</td>
                            <td className="p-4">{row.proves}</td>
                            <td className="p-4">{row.validation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {activeSection === 'multi-llm-toolchain' && (
                <section
                  id="multi-llm-toolchain"
                  role="tabpanel"
                  aria-labelledby="process-tab-multi-llm-toolchain"
                  className={`scroll-mt-24 space-y-4 rounded-2xl border p-6 ${componentRecipes.card.surface}`}
                >
                  <h2 className="text-2xl font-bold">Multi-LLM Toolchain</h2>
                  <p>
                    The workflow used scoped tool roles, patch-note review, and validation gates. AI
                    accelerated delivery; human judgment controlled scope and acceptance.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>ChatGPT</strong> — Strategy, critique, prompt design, information
                      architecture, audit logic, and sequencing (user-reported context in ledger).
                    </li>
                    <li>
                      <strong>Google AI Studio / Gemini</strong> — Early generation, scaffolding, UI
                      experimentation context; Gemini also powers runtime assistant behavior via
                      proxy (repo-confirmed for runtime integration).
                    </li>
                    <li>
                      <strong>Claude</strong> — Planning/review and implementation support where
                      used (repo evidence includes Claude co-author metadata on commits).
                    </li>
                    <li>
                      <strong>Claude Code</strong> — Repo-level edits/refactoring and implementation
                      support in commit/PR evidence.
                    </li>
                    <li>
                      <strong>Google Jules</strong> — Task orchestration/code support in
                      user-reported workflow context.
                    </li>
                    <li>
                      <strong>Codex</strong> — Branch-based implementation prompts, targeted
                      migration fixes, test-repair iteration in git history.
                    </li>
                    <li>
                      <strong>GitHub</strong> — Branch/PR traceability, merges, and validation trail
                      control plane.
                    </li>
                  </ul>
                </section>
              )}

              {activeSection === 'ai-assisted-delivery-model' && (
                <section
                  id="ai-assisted-delivery-model"
                  role="tabpanel"
                  aria-labelledby="process-tab-ai-assisted-delivery-model"
                  className={`scroll-mt-24 space-y-3 rounded-2xl border p-6 ${componentRecipes.card.surface}`}
                >
                  <h2 className="text-2xl font-bold">AI-Assisted Delivery Model</h2>
                  <p>
                    The portfolio was developed through scoped implementation cycles rather than
                    open-ended generation. Each cycle converted a design or architecture problem
                    into a branch-level task, reviewed the resulting patch notes, validated the
                    output, and used follow-up prompts to resolve defects or drift.
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Strategy and critique.</li>
                    <li>Scoped implementation prompt.</li>
                    <li>Branch-based execution.</li>
                    <li>Patch-note review.</li>
                    <li>Static validation.</li>
                    <li>Manual/visual audit where possible.</li>
                    <li>Bugfix prompt.</li>
                    <li>Evidence ledger update.</li>
                  </ol>
                </section>
              )}

              {activeSection === 'project-architecture-migration' && (
                <section
                  id="projects-architecture"
                  role="tabpanel"
                  aria-labelledby="process-tab-project-architecture-migration"
                  className={`scroll-mt-24 space-y-3 rounded-2xl border p-6 ${componentRecipes.card.surface}`}
                >
                  <div id="projects-architecture-migration" />
                  <h2 className="text-2xl font-bold">Projects Architecture Migration</h2>
                  <p>
                    Legacy <code>/case-studies</code> naming became technical debt as project
                    taxonomy expanded. The canonical model moved to <code>/projects</code> and{' '}
                    <code>/projects/:projectId</code>, while compatibility redirects were preserved
                    to avoid breakage during migration. Shared metadata in{' '}
                    <code>projectMetadata.ts</code> now powers featured/supporting taxonomy, role
                    filters, and consistent links across Home, Projects Index, Site Index, and
                    Project Detail. Guynode and Digital Twin are featured systems; Ops Triage moved
                    into supporting project status.
                  </p>
                </section>
              )}

              {activeSection === 'digital-twin-governance' && (
                <section
                  id="digital-twin-governance"
                  role="tabpanel"
                  aria-labelledby="process-tab-digital-twin-governance"
                  className={`scroll-mt-24 space-y-3 rounded-2xl border p-6 ${componentRecipes.card.surface}`}
                >
                  <h2 className="text-2xl font-bold">Digital Twin Governance + Failure Planning</h2>
                  <p>
                    The Digital Twin is designed as a scoped AI support system, not a general
                    chatbot. Its value comes from how it handles relevance, cost, routing, failure
                    states, and human escalation.
                  </p>
                  <p>
                    Governance includes portfolio-only scope, response budget, rate limits,
                    message-length controls, relevance and expensive-query gates, prompt-injection
                    deflection, approved navigation/action commands, command validation, fallback
                    behaviors, and human handoff when confidence or relevance fails. QA scenarios
                    and tests focus on these constraints, not open-ended chat performance.
                  </p>
                </section>
              )}

              {activeSection === 'validation-trail' && (
                <section
                  id="validation-trail"
                  role="tabpanel"
                  aria-labelledby="process-tab-validation-trail"
                  className={`scroll-mt-24 space-y-3 rounded-2xl border p-6 ${componentRecipes.card.surface}`}
                >
                  <h2 className="text-2xl font-bold">Validation Trail</h2>
                  <table className="min-w-full text-sm border border-black/10 dark:border-white/10">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-900/70">
                        <th className="text-left p-2">Area</th>
                        <th className="text-left p-2">Validation</th>
                        <th className="text-left p-2">Result</th>
                        <th className="text-left p-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-black/10 dark:border-white/10">
                        <td className="p-2">Repo checks</td>
                        <td className="p-2">npm run typecheck / lint / test / build</td>
                        <td className="p-2">Passing in ledger trail</td>
                        <td className="p-2">
                          Build includes non-blocking Vite chunk-size advisory.
                        </td>
                      </tr>
                      <tr className="border-t border-black/10 dark:border-white/10">
                        <td className="p-2">Routing</td>
                        <td className="p-2">routing.test.tsx updates</td>
                        <td className="p-2">Validated</td>
                        <td className="p-2">Covers canonical and compatibility behavior.</td>
                      </tr>
                      <tr className="border-t border-black/10 dark:border-white/10">
                        <td className="p-2">Project detail bugfix</td>
                        <td className="p-2">route param + loader fallback tests</td>
                        <td className="p-2">Validated</td>
                        <td className="p-2">
                          Addresses projectId compatibility and app-shell fallback hardening.
                        </td>
                      </tr>
                      <tr className="border-t border-black/10 dark:border-white/10">
                        <td className="p-2">Manual browser QA</td>
                        <td className="p-2">Interactive page checks</td>
                        <td className="p-2">Partial / iterative</td>
                        <td className="p-2">
                          Ledger distinguishes automated evidence from full browser-interactive
                          sweeps.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              )}

              <section id="decision-log" className="scroll-mt-24">
                <h2 className="text-2xl font-bold">Decision Log</h2>
                <p className="mt-2">
                  Key decisions: migrate to canonical projects routes, preserve compatibility
                  aliases during transition, promote Guynode and Digital Twin as flagship proof
                  systems, centralize metadata, and keep Process separate from Projects browsing for
                  reviewer clarity.
                </p>
              </section>
              {activeSection === 'evidence-ledger' && (
                <section
                  id="evidence-ledger"
                  role="tabpanel"
                  aria-labelledby="process-tab-evidence-ledger"
                  className={`scroll-mt-24 rounded-2xl border p-6 ${componentRecipes.card.surface}`}
                >
                  <h2 className="text-2xl font-bold">Evidence Ledger</h2>
                  <p className="mt-2">
                    The public Process page summarizes the build. The evidence ledger records the
                    deeper source trail: files, phases, decisions, Git evidence, validation notes,
                    and remaining risks. In this repo, it is maintained as an internal documentation
                    artifact at <code>docs/portfolio2-evidence-audit-ledger.md</code>.
                  </p>
                </section>
              )}
              <section id="governance-logs" className="scroll-mt-24">
                <h2 className="text-2xl font-bold">Governance & Implementation Logs</h2>
                <p className="mt-2 text-ink-slate dark:text-slate-200">
                  Audit logs for the Portfolio 2.0 implementation phases, including automated review
                  summaries, design system alignment reports, and accessibility validation trails.
                </p>
              </section>
              <section id="remaining-release-hardening" className="scroll-mt-24">
                <h2 className="text-2xl font-bold">Remaining Release-Hardening Items</h2>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Final browser-interactive QA sweep.</li>
                  <li>Scroll-to-top and long-page usability polish.</li>
                  <li>Contextual Digital Twin entry points on track pages.</li>
                  <li>Final accessibility and mobile audit.</li>
                  <li>Legacy case-study alias/naming cleanup after dependency checks.</li>
                  <li>Final public copy audit for concise consistency.</li>
                </ul>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
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
                <h1 className="text-4xl font-outfit font-extrabold text-navy-900 dark:text-white">
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

              {/* Deployed Mockup Call-to-Action */}
              <section className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 dark:border-rose-500/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white flex items-center gap-2">
                      <span className="text-xl">🏛️</span> Deployed Luxe Lofts Mockup Website
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                      Experience the premium frontend showcase deployed on **Google Cloud Run**. The
                      mockup features client-side navigation, stylized booking package cards, and a
                      demo AI Event Planner assistant.
                    </p>
                  </div>
                  <a
                    href="https://luxe-lofts-roadmap-repo-786228485832.us-central1.run.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm px-5 py-3 transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  >
                    Launch Mockup Prototype →
                  </a>
                </div>
              </section>

              {/* Backlink to Simulator Callout */}
              <section className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 dark:border-rose-500/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white flex items-center gap-2">
                      <span className="text-xl">🎛️</span> Looking for the Operational Triage
                      Simulator?
                    </h3>
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
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
                    1. Strategic Context & "Visual vs. Operational" Dichotomy
                  </h2>
                  <p className={`${semanticTokens.text.body} max-w-4xl`}>
                    Commercial local venues suffer when websites act merely as static catalogs. A
                    true digital turnaround requires bridging the gap between elegant first
                    impressions and frictionless business execution.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Brochure-Ware */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/40 space-y-4">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                      <span className="text-lg">📉</span>
                      <h3 className="font-bold text-lg">
                        Brochure-Ware (Contractor & Legacy Audits)
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
                      structural qualifiers, dynamic pricing, and direct administrative routes into
                      a unified, high-performing lead generation engine.
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
                          <strong>Real Venue Asset Plan:</strong> Gallery layouts emphasizing layout
                          boundaries, event types (showers, weddings), and spatial flow.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>
                          <strong>Guided Triage Funnel:</strong> Booking inquires capture backup
                          dates, guest counts, and caterer requirements with strict guardrails.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>
                          <strong>Modern Serverless Tech Stack:</strong> Local Leaflet integrations,
                          LocalBusiness JSON-LD structure, and Cloud Run backend APIs.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2: Interactive Audit Diagnostics Panel */}
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
                    2. Interactive Audit Diagnostics Panel
                  </h2>
                  <p className={`${semanticTokens.text.body} max-w-4xl`}>
                    Browse our detailed findings across four core operational domains. Explore the
                    gaps uncovered in prior audits and see the concrete design translations
                    implemented within our high-conversion mockup system.
                  </p>
                </div>

                {/* Sub-tab selection */}
                <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
                  {(['visuals', 'ux', 'technical', 'content'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveDiagTab(tab)}
                      className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                        activeDiagTab === tab
                          ? 'bg-rose-500 text-white shadow'
                          : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-white/10'
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
                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/40 space-y-6">
                  {activeDiagTab === 'visuals' && (
                    <div className="space-y-4">
                      <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                        <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                          🎨 Brand & Visual Consistency
                        </h3>
                        <p className="text-xs text-slate-500">
                          How typography, styling, and visual proof dictate price perception.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-rose-500">Uncovered Gap</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            The contractor-delivered site looked visually passable but lacked
                            strategic depth. Re-used template blocks, generic dark and gold accents,
                            and stock image placeholders diluted brand credibility, while
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
                            physical space is equally generic, driving them to lower their spending
                            limits or doubt the venue's operational capabilities.
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
                        <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                          🧭 UX & Navigation Flow
                        </h3>
                        <p className="text-xs text-slate-500">
                          Eliminating friction points to capture high-intent leads.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-rose-500">Uncovered Gap</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            The contractor site worked like a brochure rather than a booking funnel.
                            Standard "Book a Tour" triggers opened raw mailto tags with no fields to
                            capture guest capacity, budgeting range, backup dates, or catering
                            preferences.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-rose-500">
                            Strategic Business Impact
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            Incomplete leads force operations to spend hours chasing basics (guest
                            count, budget, date alignment). High-intent planners drop off instantly
                            if they cannot verify spatial layout availability or capacity rules
                            during their initial search.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-emerald-500">
                            Mockup Implementation
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            Designed a single-page conversion pathway. Embedded a structured intake
                            form capturing essential event attributes with explicit qualifiers
                            ("Submitting this does not confirm booking"). Created bypass links (
                            <code>?demo=1</code>) to easily preview client and admin modules.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDiagTab === 'technical' && (
                    <div className="space-y-4">
                      <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                        <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                          ⚡ Technical & SEO Discovery
                        </h3>
                        <p className="text-xs text-slate-500">
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
                            Adopted structured React components optimized for rapid layout scaling.
                            Ported interactive maps to an open-source Leaflet + OpenStreetMap engine
                            to eliminate API setup blockers. Implemented canonical{' '}
                            <strong>LocalBusiness JSON-LD schema</strong> and semantic SEO heading
                            routes.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDiagTab === 'content' && (
                    <div className="space-y-4">
                      <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                        <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                          📝 Content & Offer Architecture
                        </h3>
                        <p className="text-xs text-slate-500">
                          Structuring pricing, rules, and social proof with commercial clarity.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-rose-500">Uncovered Gap</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            Pricing cards showing blank placeholders (like <strong>"$ -"</strong>),
                            leaving users completely in the dark. Testimonials and policy guidelines
                            lacking capacity bounds, alcohol/bar limits, catering guidelines, or
                            deposit instructions.
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
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
                    3. Structured Solution Architecture & "4 Pillars"
                  </h2>
                  <p className={`${semanticTokens.text.body} max-w-4xl`}>
                    Our digital turnaround strategy rests upon four foundational pillars, connecting
                    front-end conversions directly to backend database operations and customer
                    scheduling.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pillar 1 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                    <span className="text-2xl">🖼️</span>
                    <h3 className="font-bold text-navy-900 dark:text-white text-base">
                      Pillar 1: High-Conversion Brand Showcase
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Elegantly designed layouts using <strong>Spectral + Jost</strong> display
                      typography. Consolidates real venue imagery, event-type capability cards, and
                      spatial layout planning maps into a single guided decision page that enhances
                      venue prestige.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                    <span className="text-2xl">🎯</span>
                    <h3 className="font-bold text-navy-900 dark:text-white text-base">
                      Pillar 2: Guided Intent Intake Engine
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      An interactive planning helper and structured booking form capturing backup
                      dates, guest counts, and catering preferences. Integrates campaign UTM source
                      capture utilities to map marketing traffic directly to CRM lead entries.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                    <span className="text-2xl">🔑</span>
                    <h3 className="font-bold text-navy-900 dark:text-white text-base">
                      Pillar 3: Unified Client Planning Portal
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      A frictionless client-facing workspace featuring reviewer bypass modes (
                      <code>?demo=1</code>). Built to integrate with{' '}
                      <strong>Firebase Auth & Google Sign-In</strong> for frictionless client
                      access, secure collaborative seating layouts, and payment tracking.
                    </p>
                  </div>

                  {/* Pillar 4 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                    <span className="text-2xl">📊</span>
                    <h3 className="font-bold text-navy-900 dark:text-white text-base">
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
              <section className="space-y-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
                      4. Dual-Perspective KPI Dashboard
                    </h2>
                    <p className={`${semanticTokens.text.body} max-w-xl`}>
                      Track results across two operational planes: Business/Owner operations and
                      technical system telemetry.
                    </p>
                  </div>
                  {/* View switcher */}
                  <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl shrink-0 border border-slate-200 dark:border-white/10">
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
                      {/* Metric 1 */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                          Lead Qualification Accuracy
                        </span>
                        <div className="text-3xl font-extrabold text-navy-900 dark:text-white font-outfit">
                          +40%
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Projected lift from structured, multi-field intake forms vs. raw emails.
                        </p>
                      </div>
                      {/* Metric 2 */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                          Administrative Overhead
                        </span>
                        <div className="text-3xl font-extrabold text-navy-900 dark:text-white font-outfit">
                          -15 hrs/wk
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Average owner administrative time saved by automated CRM intake pipelines.
                        </p>
                      </div>
                      {/* Metric 3 */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                          Average Contract Value
                        </span>
                        <div className="text-3xl font-extrabold text-navy-900 dark:text-white font-outfit">
                          +25%
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Projected revenue lift via upfront tiered packages and upsell menus.
                        </p>
                      </div>
                      {/* Metric 4 */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                          Booking Funnel Conversion
                        </span>
                        <div className="text-3xl font-extrabold text-navy-900 dark:text-white font-outfit">
                          +3.2%
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Estimated increase driven by real proof visuals and immediate policy
                          clarity.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Metric 1 */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                          Pipeline First-Pass Yield (FPY)
                        </span>
                        <div className="text-3xl font-extrabold text-navy-900 dark:text-white font-outfit">
                          94.2%
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Verified transition accuracy across database updates under simulator
                          loads.
                        </p>
                      </div>
                      {/* Metric 2 */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                          System Backlog SLA Risk
                        </span>
                        <div className="text-3xl font-extrabold text-navy-900 dark:text-white font-outfit">
                          &lt; 1.0%
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Risk rating limit managed by automated high-capacity queuing thresholds.
                        </p>
                      </div>
                      {/* Metric 3 */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                          Microservices Latency
                        </span>
                        <div className="text-3xl font-extrabold text-navy-900 dark:text-white font-outfit">
                          &lt; 200ms
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Average endpoint request time across Cloud Run serverless execution
                          points.
                        </p>
                      </div>
                      {/* Metric 4 */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                          Incident Defect Leakage
                        </span>
                        <div className="text-3xl font-extrabold text-navy-900 dark:text-white font-outfit">
                          &lt; 0.5%
                        </div>
                        <p className="text-[10px] text-slate-500">
                          QA triage filter validation rate limiting raw data payload escapes.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Section 5: Commercial Offering / Pricing Tiers */}
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
                    5. Commercial Offering & Pricing Menu
                  </h2>
                  <p className={`${semanticTokens.text.body} max-w-4xl`}>
                    A transparent offer architecture designed to address legacy pricing ambiguity.
                    Mapped guest limits, support staffing, and coordination resources to specific
                    price boundaries to streamline client qualification.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Package 1 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Tier 1
                      </span>
                      <h3 className="font-bold text-navy-900 dark:text-white text-lg">
                        Keep It Simple
                      </h3>
                      <div className="text-2xl font-extrabold text-navy-900 dark:text-white">
                        $500
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Essential space access for quick events. Best-fit for micro-showers,
                        photography sessions, and content creation.
                      </p>
                    </div>
                    <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-white/5 pt-3 font-sans">
                      <li>• Max Capacity: 30 guests</li>
                      <li>• Renter setup & teardown</li>
                      <li>• Basic sound system hookup</li>
                      <li>• Standard policy qualifiers</li>
                    </ul>
                  </div>

                  {/* Package 2 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Tier 2
                      </span>
                      <h3 className="font-bold text-navy-900 dark:text-white text-lg">
                        Starter Package
                      </h3>
                      <div className="text-2xl font-extrabold text-navy-900 dark:text-white">
                        $1,500
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Extended half-day access with fundamental hosting features. Perfect for
                        family celebrations and mixers.
                      </p>
                    </div>
                    <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-white/5 pt-3 font-sans">
                      <li>• Max Capacity: 50 guests</li>
                      <li>• 6-Hour rental window</li>
                      <li>• 1 Dedicated host coordinator</li>
                      <li>• Cleaning & waste services</li>
                    </ul>
                  </div>

                  {/* Package 3 */}
                  <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 dark:border-rose-500/40 dark:bg-rose-500/10 space-y-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-rose-500 text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                      Popular
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block">
                        Tier 3
                      </span>
                      <h3 className="font-bold text-navy-900 dark:text-white text-lg">
                        Standard Experience
                      </h3>
                      <div className="text-2xl font-extrabold text-navy-900 dark:text-white">
                        $2,500
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Full-day premium venue package. Crafted for weddings, larger formal events,
                        and upscale corporate workshops.
                      </p>
                    </div>
                    <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 border-t border-rose-500/15 pt-3 font-sans">
                      <li>• Max Capacity: 75 guests</li>
                      <li>• 12-Hour full-day access</li>
                      <li>• Premier coordinator & AV staff</li>
                      <li>• Pre-event spatial layout helper</li>
                    </ul>
                  </div>

                  {/* Package 4 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Tier 4
                      </span>
                      <h3 className="font-bold text-navy-900 dark:text-white text-lg">
                        Premium Experience
                      </h3>
                      <div className="text-2xl font-extrabold text-navy-900 dark:text-white">
                        $4,000+
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Full weekend private booking. The ultimate venue bundle featuring curated
                        decor styling and catering channels.
                      </p>
                    </div>
                    <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-white/5 pt-3 font-sans">
                      <li>• Capacity: 100 max boundary</li>
                      <li>• Multi-day full weekend use</li>
                      <li>• Full coordination & concierge</li>
                      <li>• Custom caterer/alcohol options</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 6: Prototype Bounding & Production Roadmap */}
              <section className="space-y-6 pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
                    6. Prototype Bounding & Production Roadmap
                  </h2>
                  <p className={`${semanticTokens.text.body} max-w-4xl`}>
                    To ensure the portfolio mockup remains high-performing, portable, and entirely
                    secure, certain operational integrations have been strategically bounded. Below
                    is an explicit translation of what was deferred from the prototype, how it would
                    be built in production, and the value it delivers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Item 1 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                        <span>🔒</span>
                        <span>Google Cloud Run & Firebase Auth Integration</span>
                      </div>
                      <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
                        <p className="text-slate-600 dark:text-slate-300">
                          <strong>Mockup Strategy:</strong> Kept the frontend UI completely
                          client-side. The dashboard, client portals, and contact pipelines simulate
                          operations locally using state variables.
                        </p>
                        <p className="text-slate-500">
                          <strong>Production Build:</strong> Runs behind a secure{' '}
                          <strong>Google Cloud Run API</strong> backend connected to{' '}
                          <strong>Firebase Auth / Identity Platform</strong>.
                        </p>
                      </div>
                    </div>
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium text-[10px] pt-2 border-t border-slate-100 dark:border-white/5">
                      Value: Direct integration with Google Cloud makes it frictionless to natively
                      support Google Sign-On/Google OAuth for high-trust auth.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                        <span>🤖</span>
                        <span>Bounded AI Chatbot & Event Planner Suite</span>
                      </div>
                      <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
                        <p className="text-slate-600 dark:text-slate-300">
                          <strong>Mockup Strategy:</strong> Houses both the conversational AI Event
                          Planner and a supportive site assistant chatbot, simulated locally for
                          zero latency.
                        </p>
                        <p className="text-slate-500">
                          <strong>Rationale & Skills Transfer:</strong> Reinforces the identical
                          conversational logic and safety state-machine framework deployed in the{' '}
                          <strong>"Digital Twin"</strong> project, adapted here to guide booking
                          intent and resolve logistical objections.
                        </p>
                      </div>
                    </div>
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium text-[10px] pt-2 border-t border-slate-100 dark:border-white/5">
                      Value: Demonstrates ability to implement commercial chatbot architectures
                      while avoiding live LLM billing exploitation.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40 space-y-3 flex flex-col justify-between">
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
                        <p className="text-slate-500">
                          <strong>Production Build:</strong> Integrates Google Calendar OAuth2
                          client sync, booking schedules directly onto the venue’s master calendar
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
                    You may observe a strategic variation between the public-facing mockup packages
                    (which focus on <strong>frictionless value qualification</strong> like{' '}
                    <em>Simple Rental</em>, <em>Celebration Setup</em>, and{' '}
                    <em>Premium Experience</em>) and the precise pricing models featured in the deep
                    dive dashboard (which detail exact financial tiers like{' '}
                    <strong>$500 to $4,000+</strong>). This is an{' '}
                    <strong>intentional operations choice</strong>:
                  </p>
                  <ul className="space-y-1 text-[11px] text-slate-500 leading-relaxed list-disc list-inside font-sans pl-2">
                    <li>
                      <strong>Public-Facing Site:</strong> Focuses on emotional buy-in, spatial
                      visualization, and conversion. It groups offers conceptually to capture leads
                      without triggering immediate price-anchoring friction.
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
          )}
        </div>
      </ErrorBoundary>
      <ScrollToTopButton />
    </div>
  );
};

export default DeepDiveView;
