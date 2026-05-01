import React from 'react';
import { Link } from 'react-router-dom';
import {
  DIGITAL_TWIN_PROJECT_HREF,
  GUYNODE_SYSTEM_HREF,
  PROJECTS_HREF,
  RESUME_HREF,
  SITE_INDEX_HREF,
} from '../lib/routes';
import ScrollToTopButton from '../components/ScrollToTopButton';

type IndexCard = { title: string; description: string; href: string };
type TimelineRow = {
  phase: string;
  changed: string;
  mattered: string;
  proves: string;
  validation: string;
};

const processIndexCards: IndexCard[] = [
  {
    title: 'Build Timeline',
    description:
      'Major implementation phases from role-track redesign through Projects migration and Digital Twin hardening.',
    href: '#build-timeline',
  },
  {
    title: 'Multi-LLM Workflow',
    description:
      'How ChatGPT, Gemini, Claude, Claude Code, Google Jules, Codex, and GitHub contributed to a governed AI-assisted build process.',
    href: '#multi-llm-toolchain',
  },
  {
    title: 'Projects Architecture',
    description:
      'Migration from case-study language to canonical Projects routes, shared metadata, and recruiter-friendly proof browsing.',
    href: '#projects-architecture',
  },
  {
    title: 'Digital Twin Governance',
    description:
      'Scope controls, cost limits, relevance gates, prompt-injection handling, approved commands, and human handoff.',
    href: '#digital-twin-governance',
  },
  {
    title: 'QA / Validation Trail',
    description:
      'Typecheck, lint, tests, build checks, route validation, bugfixes, and known manual QA gaps.',
    href: '#validation-trail',
  },
  {
    title: 'Evidence Ledger',
    description:
      'Source-of-truth audit documenting files, commits, decisions, toolchain use, and remaining risks.',
    href: '#evidence-ledger',
  },
];

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

const DeepDiveView: React.FC = () => (
  <div id="deep-dive-top" className="min-h-screen pt-20 pb-20 px-6">
    <div className="max-w-6xl mx-auto space-y-12">
      <section className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600">Process</p>
        <h1 className="text-4xl font-outfit font-extrabold text-navy-900 dark:text-white">
          Portfolio 2.0 Process Deep Dive
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-4xl">
          This page documents how Portfolio 2.0 evolved from an AI-assisted prototype into a
          role-track portfolio system with dedicated project architecture, Digital Twin guardrails,
          site-wide navigation, and validation-backed implementation phases.
        </p>
        <p className="text-slate-600 dark:text-slate-300 max-w-4xl">
          Projects show what was built. Process shows how the portfolio was planned, governed,
          implemented, validated, and iterated.
        </p>
        <p className="text-slate-600 dark:text-slate-300 max-w-4xl">
          Use this page to inspect the planning logic, AI-assisted workflow, route migrations,
          project taxonomy, validation passes, and remaining cleanup work behind the portfolio.
        </p>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-indigo-700">
          <Link to={PROJECTS_HREF}>View Projects Library</Link>
          <Link to={SITE_INDEX_HREF}>Open Site Index</Link>
          <Link to={DIGITAL_TWIN_PROJECT_HREF}>View Digital Twin Project</Link>
          <Link to={GUYNODE_SYSTEM_HREF}>View Guynode Project</Link>
          <Link to={RESUME_HREF}>View Resume</Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Process Index</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {processIndexCards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="rounded-xl border border-[#ddd7cd] bg-[#fcfaf7] dark:bg-slate-900/60 dark:border-white/10 p-4"
            >
              <h3 className="font-semibold text-navy-900 dark:text-white">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="build-timeline" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
          Build Timeline / Phase Ladder
        </h2>
        <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-900/70">
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
                  <td className="p-3 font-semibold">{row.phase}</td>
                  <td className="p-3">{row.changed}</td>
                  <td className="p-3">{row.mattered}</td>
                  <td className="p-3">{row.proves}</td>
                  <td className="p-3">{row.validation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="multi-llm-toolchain" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold">Multi-LLM Toolchain</h2>
        <p>
          The workflow used scoped tool roles, patch-note review, and validation gates. AI
          accelerated delivery; human judgment controlled scope and acceptance.
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            <strong>ChatGPT</strong> — Strategy, critique, prompt design, information architecture,
            audit logic, and sequencing (user-reported context in ledger).
          </li>
          <li>
            <strong>Google AI Studio / Gemini</strong> — Early generation, scaffolding, UI
            experimentation context; Gemini also powers runtime assistant behavior via proxy
            (repo-confirmed for runtime integration).
          </li>
          <li>
            <strong>Claude</strong> — Planning/review and implementation support where used (repo
            evidence includes Claude co-author metadata on commits).
          </li>
          <li>
            <strong>Claude Code</strong> — Repo-level edits/refactoring and implementation support
            in commit/PR evidence.
          </li>
          <li>
            <strong>Google Jules</strong> — Task orchestration/code support in user-reported
            workflow context.
          </li>
          <li>
            <strong>Codex</strong> — Branch-based implementation prompts, targeted migration fixes,
            test-repair iteration in git history.
          </li>
          <li>
            <strong>GitHub</strong> — Branch/PR traceability, merges, and validation trail control
            plane.
          </li>
        </ul>
      </section>

      <section id="ai-assisted-delivery-model" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold">AI-Assisted Delivery Model</h2>
        <p>
          The portfolio was developed through scoped implementation cycles rather than open-ended
          generation. Each cycle converted a design or architecture problem into a branch-level
          task, reviewed the resulting patch notes, validated the output, and used follow-up prompts
          to resolve defects or drift.
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

      <section id="projects-architecture" className="scroll-mt-24 space-y-3">
        <div id="projects-architecture-migration" />
        <h2 className="text-2xl font-bold">Projects Architecture Migration</h2>
        <p>
          Legacy <code>/case-studies</code> naming became technical debt as project taxonomy
          expanded. The canonical model moved to <code>/projects</code> and{' '}
          <code>/projects/:projectId</code>, while compatibility redirects were preserved to avoid
          breakage during migration. Shared metadata in <code>projectMetadata.ts</code> now powers
          featured/supporting taxonomy, role filters, and consistent links across Home, Projects
          Index, Site Index, and Project Detail. Guynode and Digital Twin are featured systems; Ops
          Triage moved into supporting project status.
        </p>
      </section>

      <section id="digital-twin-governance" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold">Digital Twin Governance + Failure Planning</h2>
        <p>
          The Digital Twin is designed as a scoped AI support system, not a general chatbot. Its
          value comes from how it handles relevance, cost, routing, failure states, and human
          escalation.
        </p>
        <p>
          Governance includes portfolio-only scope, response budget, rate limits, message-length
          controls, relevance and expensive-query gates, prompt-injection deflection, approved
          navigation/action commands, command validation, fallback behaviors, and human handoff when
          confidence or relevance fails. QA scenarios and tests focus on these constraints, not
          open-ended chat performance.
        </p>
      </section>

      <section id="validation-trail" className="scroll-mt-24 space-y-3">
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
              <td className="p-2">Build includes non-blocking Vite chunk-size advisory.</td>
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
                Ledger distinguishes automated evidence from full browser-interactive sweeps.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="decision-log" className="scroll-mt-24">
        <h2 className="text-2xl font-bold">Decision Log</h2>
        <p className="mt-2">
          Key decisions: migrate to canonical projects routes, preserve compatibility aliases during
          transition, promote Guynode and Digital Twin as flagship proof systems, centralize
          metadata, and keep Process separate from Projects browsing for reviewer clarity.
        </p>
      </section>
      <section id="evidence-ledger" className="scroll-mt-24">
        <h2 className="text-2xl font-bold">Evidence Ledger</h2>
        <p className="mt-2">
          The public Process page summarizes the build. The evidence ledger records the deeper
          source trail: files, phases, decisions, Git evidence, validation notes, and remaining
          risks. In this repo, it is maintained as an internal documentation artifact at{' '}
          <code>docs/portfolio2-evidence-audit-ledger.md</code>.
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
    <ScrollToTopButton />
  </div>
);

export default DeepDiveView;
