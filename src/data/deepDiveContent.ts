export type DecisionBlock = {
  id: string;
  title: string;
  problem: string;
  risk: string;
  decision: string;
  tradeoff: string;
  validation: string;
  businessRelevance: string;
  chips: string[];
};

export type TimelineEntry = {
  phase: string;
  title: string;
  description: string;
  tags?: string[];
};

export type ArchitectureSummary = {
  title: string;
  summary: string;
  chips: string[];
};

export type LLMRole = {
  name: string;
  role: string;
  description: string;
  examples: string[];
};

export type ArchiveEntry = {
  id: string;
  label: string;
  description: string;
  chips: string[];
};

// ── Release Ladder ─────────────────────────────────────────────────────────

export const releaseLadder: TimelineEntry[] = [
  {
    phase: 'Phase 1',
    title: 'Protocol refinement / early AI Studio constraints',
    description:
      'Established the initial AI workflow protocols using Google AI Studio. Defined role boundaries for each LLM, set output constraints, and built the governance framework that would constrain all subsequent AI usage. Design authority stayed human-controlled from the start.',
    tags: ['AI Governance', 'Protocol Design', 'Google AI Studio'],
  },
  {
    phase: 'Phase 2',
    title: 'Baseline scaffold',
    description:
      'Built the initial React application with a typed component structure designed for composability, a content model that could accommodate multiple role lanes, and a routing stub that established the base URL surface. The baseline proved the application could deploy and created the architectural foundation that all subsequent hardening phases would build on.',
    tags: ['React', 'Scaffold', 'Content Model'],
  },
  {
    phase: 'Phase 3',
    title: 'Hardening and safe rendering',
    description:
      'Applied DOMPurify sanitization across all HTML rendering paths. Removed unsafe rendering patterns, tightened component boundaries, and validated the sanitization layer with explicit test cases. Rendering became a trust problem, not just a display problem.',
    tags: ['DOMPurify', 'Security', 'Quality Engineering'],
  },
  {
    phase: 'Phase 4',
    title: 'Server boundary and routing',
    description:
      'Moved Gemini API calls behind a Cloud Run Express proxy to eliminate credential exposure in the client bundle. Migrated to React Router v6 with createBrowserRouter, enabling multi-route navigation, URL-addressable views, and the layout composition that all subsequent pages depend on.',
    tags: ['Express', 'Cloud Run', 'React Router'],
  },
  {
    phase: 'Phase 5',
    title: 'Tests / CI / release controls',
    description:
      'Added Vitest unit tests for core components and configured a GitHub Actions CI pipeline: Prettier → ESLint → TypeScript → Vitest → Vite build → npm audit. The system moved from manual pre-push verification to automated self-checking on every push and pull request.',
    tags: ['Vitest', 'GitHub Actions', 'CI/CD'],
  },
  {
    phase: 'Phase 6',
    title: 'Recruiter proof / observability layer',
    description:
      'Restructured the portfolio into two recruiter-native role lanes (Implementation/CSE-lite and Ops Analytics/QA). Added track pages with structured proof blocks and built this deep-dive page as the second-layer evidence destination so all track-page links resolve to real content.',
    tags: ['Track Pages', 'Proof Architecture', 'Stakeholder Design'],
  },
];

// ── Decision-Impact Blocks ─────────────────────────────────────────────────

export const decisionBlocks: DecisionBlock[] = [
  {
    id: 'two-track-framing',
    title: 'Recruiter-native two-track framing',
    problem:
      'Portfolio proof was blended across implementation and ops-analytics work. Reviewers had to infer which evidence applied to which role.',
    risk: 'Reviewers disengage before finding relevant proof, or apply the wrong framing to the strongest evidence.',
    decision:
      'Restructured into two explicit role lanes — Implementation/CSE-lite and Ops Analytics/QA — each with dedicated proof blocks, artifacts, and CTAs.',
    tradeoff:
      'More maintenance overhead: two track pages instead of one. Accepted because reviewer clarity outweighs authoring cost.',
    validation:
      'Track pages reviewed against real role expectations for each lane. Link structure tested end-to-end.',
    businessRelevance:
      'Matches how technical portfolios are evaluated in hiring: by role fit, not general capability breadth.',
    chips: ['Strategy', 'Information Architecture', 'Stakeholder Design'],
  },
  {
    id: 'server-proxy',
    title: 'Server-side Express proxy for Gemini',
    problem:
      'Calling the Gemini API directly from React would embed the API key in the client bundle.',
    risk: 'Credential exposure in source maps or the network inspector; key rotation cost if leaked.',
    decision:
      'All Gemini calls route through an Express backend on Cloud Run. The client sends requests to /api/chat; the server holds the key and applies prompt constraints.',
    tradeoff:
      'Added deployment complexity: separate server process, Cloud Run config, environment variable management. Accepted — security is non-negotiable.',
    validation:
      'Verified that no API keys appear in the browser network tab or bundled JS under any request pattern.',
    businessRelevance:
      'Demonstrates production-grade security thinking, not demo-mode implementation.',
    chips: ['Architecture', 'Security', 'Deployability'],
  },
  {
    id: 'react-router-migration',
    title: 'React Router migration',
    problem:
      'The single-scroll layout could not support deep-linked pages, URL-addressable sections, or role-specific routes.',
    risk: 'Without routing, the portfolio could not scale to track pages, deep-dive layers, or case study views without degrading UX.',
    decision:
      'Migrated to React Router v6 createBrowserRouter with a nested route structure, shared AppLayout, and view-level ErrorBoundaries.',
    tradeoff:
      'More complex routing config; requires careful scroll-position management across route transitions.',
    validation:
      'All routes tested across browsers. Scroll behavior verified after navigation events. Error boundaries tested for fallback rendering.',
    businessRelevance:
      'Architecture decisions compound. This migration created the foundation for every subsequent proof-layer addition.',
    chips: ['Architecture', 'React', 'SPA Design'],
  },
  {
    id: 'dompurify-hardening',
    title: 'DOMPurify sanitization hardening',
    problem:
      'Case study content includes markdown-sourced HTML strings rendered into the DOM. Without sanitization, arbitrary HTML could execute.',
    risk: 'XSS surface in a portfolio viewed by third parties. Undermines trust for any technical reviewer who inspects the rendering layer.',
    decision:
      'All HTML rendering gated through DOMPurify with an explicit allowlist. No unsanitized HTML strings anywhere in the component tree.',
    tradeoff:
      'Slightly more rigid rendering rules — some valid but unusual HTML may be stripped. Accepted: safe rendering is non-negotiable.',
    validation:
      'Sanitization boundary tested with explicit test cases. Known XSS payloads verified as stripped before the component renders.',
    businessRelevance:
      'Shows security-aware rendering discipline. Treating rendering as a trust problem, not just a display problem.',
    chips: ['DOMPurify', 'Security', 'Quality Engineering'],
  },
  {
    id: 'ci-and-tests',
    title: 'Vitest + CI pipeline',
    problem:
      'No automated validation existed before release. Changes were verified only by manual inspection before push.',
    risk: 'Formatting drift, type errors, broken builds, and dependency vulnerabilities could ship undetected.',
    decision:
      'Added Vitest unit tests for core components and utilities. Configured GitHub Actions CI: Prettier format check → ESLint → TypeScript typecheck → Vitest → Vite build → npm audit. All gates must pass before merge.',
    tradeoff:
      'CI adds merge friction. Accepted — the cost of a failing pipeline is lower than the cost of a bad release.',
    validation:
      'CI runs on every push and PR. Pipeline has caught real formatting violations and lint failures on previous branches.',
    businessRelevance:
      "QA maturity signal: the system moves from 'works right now' to 'checks itself before release.'",
    chips: ['Vitest', 'GitHub Actions', 'CI/CD'],
  },
  {
    id: 'multi-llm-workflow',
    title: 'Governed multi-LLM workflow',
    problem:
      'Using AI tools without defined roles risks scope drift, inconsistent output quality, and unattributable decisions.',
    risk: 'AI-generated content gets published without review; decisions become unattributable; the portfolio loses credibility as a human-directed artifact.',
    decision:
      'Assigned each LLM a defined, non-overlapping role: ChatGPT for strategy and audit, Gemini for synthesis and proof translation, Google AI Studio for iterative archive and forensics. All output reviewed before use.',
    tradeoff:
      'More overhead than ad-hoc AI usage. Accepted — discipline is the point, not just the constraint.',
    validation:
      'No LLM output was published without an operator checkpoint. Role boundaries were maintained throughout the project lifecycle.',
    businessRelevance:
      'Shows applied AI governance maturity: AI as a controlled workflow tool, not an autonomous author.',
    chips: ['AI Governance', 'Workflow Design', 'Traceability'],
  },
  {
    id: 'app-modularization',
    title: 'App.tsx modularization',
    problem:
      'A monolithic App.tsx was handling routing, layout, global state, theme, and content rendering in a single file.',
    risk: 'Any routing, theming, or navigation change required touching the same file as content changes, creating coupling and merge risk.',
    decision:
      'Decomposed into a router module (router.tsx), dedicated view components, a data layer (src/data/), and context providers. Each concern has its own file and scope.',
    tradeoff:
      'More files; slightly more import overhead. Accepted — isolation and independent testability outweigh co-location convenience.',
    validation:
      'Each view component independently testable. Routing tests confirm view isolation. New routes can be added by editing only router.tsx.',
    businessRelevance:
      'Modular architecture is a governance and velocity concern: systems that cannot be changed cleanly do not scale.',
    chips: ['Refactoring', 'Maintainability', 'Systems Design'],
  },
  {
    id: 'feature-governance',
    title: 'Client-side mutability / Admin Mode removal',
    problem:
      'A client-side Admin Mode allowed runtime content mutation directly in the browser during development.',
    risk: 'Complex, fragile code path; trust risk for technical reviewers who could trigger unintended state changes while reviewing the live portfolio.',
    decision:
      'Removed Admin Mode entirely. No client-side content mutation paths remain. Content is static and deterministic from the server.',
    tradeoff:
      'Lost the ability to demo live content changes in-browser. Accepted — the feature created more risk than value.',
    validation:
      'Code path confirmed removed from bundle. No admin-related routes, state, or UI controls remain in the application.',
    businessRelevance:
      'Knowing when to remove is as important as knowing when to build. Simplification under constraint is a delivery skill.',
    chips: ['Governance', 'Product Judgment', 'Risk Reduction'],
  },
  {
    id: 'sandbox-hardening',
    title: 'Sandbox and preview environment hardening',
    problem:
      'React Router navigation used browser history APIs that fail inconsistently in preview environments, iframes, and restricted sandboxes.',
    risk: 'Portfolio would silently fail to navigate in the exact environments where recruiters are most likely to view it — LinkedIn previews, email clients, sandboxed iframes.',
    decision:
      'Diagnosed the environment-specific failure, identified which browser assumptions were broken, and reworked navigation to remain stable across sandbox, iframe, and restricted-preview contexts.',
    tradeoff:
      'Slightly more defensive navigation logic. Requires re-testing across environments on any future routing change.',
    validation:
      'Navigation tested in three distinct deployment environments. Recruiter-facing preview confirmed stable before release.',
    businessRelevance:
      "The portfolio's primary audience uses preview environments. Navigation reliability is a trust signal, not a technical footnote.",
    chips: ['Debugging', 'Reliability', 'Environment Resilience'],
  },
];

// ── Architecture Section Summaries ─────────────────────────────────────────

export const architectureSummaries: ArchitectureSummary[] = [
  {
    title: 'Server / client boundary',
    summary:
      'The React client is intentionally dumb about AI: it sends chat messages to /api/chat and displays responses. The Express proxy on Cloud Run holds credentials, applies prompt constraints, and controls the Gemini call. No secrets touch the browser layer.',
    chips: ['Express', 'Cloud Run', 'Security Boundary'],
  },
  {
    title: 'Routing upgrade',
    summary:
      'React Router v6 createBrowserRouter replaced the original single-scroll layout. Routes are nested under a shared AppLayout that handles the nav, footer, theme, and modals. Each view is independently error-bounded and testable.',
    chips: ['React Router v6', 'AppLayout', 'Nested Routes'],
  },
  {
    title: 'Sanitization and rendering safety',
    summary:
      'All HTML rendered from markdown-sourced case study content passes through DOMPurify with an explicit allowlist before touching the DOM. The sanitization boundary is enforced at the component level, not the call site.',
    chips: ['DOMPurify', 'Allowlist', 'XSS Prevention'],
  },
  {
    title: 'CI and regression prevention',
    summary:
      'GitHub Actions runs six sequential gates on every push and PR: Prettier format check, ESLint, TypeScript typecheck, Vitest unit tests, Vite production build, and npm security audit. Merge requires all gates to pass.',
    chips: ['GitHub Actions', 'Vitest', 'npm audit'],
  },
  {
    title: 'Modularization and maintainability',
    summary:
      'App.tsx was decomposed into a router module, view components, data files, and context providers. New routes, views, and content can be added without touching unrelated files. Each concern is independently changeable and testable.',
    chips: ['Separation of Concerns', 'Testability', 'Scalability'],
  },
];

// ── LLM Governance ─────────────────────────────────────────────────────────

export const llmRoles: LLMRole[] = [
  {
    name: 'ChatGPT',
    role: 'Strategy, audit, and evidence architecture',
    description:
      'Used for high-level framing decisions, evidence gap audits, stakeholder-facing copy review, and structuring the proof hierarchy. Operated as a strategic collaborator with operator-defined scope. Design authority remained human-controlled.',
    examples: [
      'Two-track framing strategy',
      'Proof hierarchy design',
      'Evidence gap audit',
      'Recruiter-native copy review',
    ],
  },
  {
    name: 'Gemini',
    role: 'Canonical synthesis and technical proof translation',
    description:
      'Used for synthesizing technical detail into recruiter-readable proof, translating architecture decisions into stakeholder language, and producing the canonical deep-dive content. Also deployed as the portfolio chat assistant via the server-side proxy.',
    examples: [
      'Release ladder synthesis',
      'Decision-block writing',
      'Architecture narrative translation',
      'Live chat assistant (server-side)',
    ],
  },
  {
    name: 'Google AI Studio',
    role: 'Iterative archive and development forensics',
    description:
      'Used for preserving the iterative development trail, capturing revision history context, documenting governance decisions in-flight, and maintaining the forensic archive of what changed and why. The authoritative source for process evidence.',
    examples: [
      'Revision and risk documentation',
      'Governance trail preservation',
      'In-flight decision capture',
      'Development forensics archive',
    ],
  },
];

// ── Forensic Archive ───────────────────────────────────────────────────────

export const forensicEntries: ArchiveEntry[] = [
  {
    id: 'evidence-bank',
    label: 'Evidence bank overview',
    description:
      'The evidence architecture for Portfolio2.0 spans three layers: track-level proof blocks (role-framed, skim-readable), deep-dive technical blocks (architecture detail, decision rationale), and a forensic revision trail (raw decision capture, governance notes, in-flight risk documentation). Each layer was designed for a different reviewer time investment and trust threshold. The forensic layer exists so that later decisions are traceable back to real evidence — not memory or polished summaries.',
    chips: ['Evidence Architecture', 'Proof System', 'Three-layer Design'],
  },
  {
    id: 'validation-trail',
    label: 'Validation trail excerpts',
    description:
      'Key validation checkpoints preserved in the governance trail: (1) CI pipeline added and confirmed passing before release branch merges; (2) DOMPurify sanitization boundary validated with explicit test cases before enabling HTML rendering in case study view; (3) Sandbox navigation behavior validated across three deployment environments before marking stable; (4) Server-proxy credential isolation verified — no API keys appear in the client network tab under any request pattern; (5) Each track-page proof block reviewed against actual implementation artifacts before publishing; (6) /resume/implementation redirect added to prevent dead-route 404s from Implementation track supporting-artifact links.',
    chips: ['Validation', 'Traceability', 'Governance Checkpoints'],
  },
  {
    id: 'proof-hierarchy',
    label: 'Proof hierarchy design',
    description:
      'The Portfolio2.0 proof system was structured across three retrieval layers, each targeting a different reviewer time investment and trust threshold. Layer one — track-level proof blocks — is written for skim conditions: role-framed, recruiter-readable, one scroll. Layer two — deep-dive decision blocks — is written for reviewers who need rationale: each block documents the problem, risk, decision, tradeoff, validation, and business relevance. Layer three — this forensic archive — is written for reviewers who need evidence provenance: governance notes, validation checkpoints, and revision traces. The three-layer design ensures the portfolio does not require a time-committed reviewer to find its strongest proof, and does not fail a thorough reviewer who needs more.',
    chips: ['Evidence Architecture', 'Stakeholder Design', 'Proof Layers'],
  },
  {
    id: 'ai-protocol-log',
    label: 'AI protocol log: role assignments and constraint history',
    description:
      'AI workflow protocols were established before any content generation began. ChatGPT was assigned to strategy, evidence architecture, and audit — explicitly excluded from synthesis or content generation to prevent tone inconsistency. Gemini was assigned to synthesis and technical proof translation — explicitly excluded from strategic framing decisions to prevent scope creep. Google AI Studio was assigned to iterative archive and forensics — acting as a capture layer for in-flight decisions, not a content generator. These role boundaries were set before use, maintained throughout the project, and reviewed at each phase transition. No LLM output was published without an operator review checkpoint. The constraint model was the point, not a side effect: if the portfolio claims disciplined AI governance, the process behind it had to demonstrate the same discipline.',
    chips: ['AI Governance', 'Protocol Design', 'Role Constraints'],
  },
  {
    id: 'scope-reduction-log',
    label: 'Scope reduction log',
    description:
      'Two features were removed during Portfolio2.0 development rather than shipped. (1) Admin Mode: a client-side runtime content mutation path built during early scaffolding was removed when review showed it added coupling, trust risk for technical reviewers who might trigger it, and fragility without commensurate value. The code path was confirmed absent from the production bundle before release. (2) Direct Gemini client calls: the initial implementation called the Gemini API from the React client, embedding the API key in the bundle. This was replaced with the server-side Express proxy on Cloud Run before any public deployment. No version with client-side credentials was ever released to a public URL. Both removals were governance decisions: the question was not whether each feature worked, but whether keeping it made the system safer and more trustworthy to operate.',
    chips: ['Governance', 'Risk Reduction', 'Scope Control'],
  },
];

// ── Appendix Links ─────────────────────────────────────────────────────────

export const appendixLinks = [
  { label: 'Decision-impact blocks', href: '/portfolio2/deep-dive#decision-blocks' },
  { label: 'LLM governance summary', href: '/portfolio2/deep-dive#multi-llm-governance' },
  { label: 'Architecture boundary', href: '/portfolio2/deep-dive#architecture-boundary' },
  { label: 'Validation trail', href: '/portfolio2/deep-dive#validation-trail' },
  { label: 'Forensic archive', href: '/portfolio2/deep-dive#forensic-archive' },
  { label: 'Proof hierarchy design', href: '/portfolio2/deep-dive#proof-hierarchy' },
  { label: 'Implementation track', href: '/tracks/implementation' },
  { label: 'Ops Analytics track', href: '/tracks/ops-analytics' },
  { label: 'Resume', href: '/resume' },
];
