export type DecisionBlock = {
  id: string;
  title: string;
  decision: string;
  impact: string;
  whyItMatters: string;
  chips: string[];
};

export type TimelineEntry = {
  phase: string;
  title: string;
  description: string;
};

export type TechnicalBlock = {
  id: string;
  title: string;
  context: string;
  what: string;
  result: string;
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

export const releaseLadder: TimelineEntry[] = [
  {
    phase: 'Phase 1',
    title: 'Single-scroll static portfolio',
    description:
      'Initial deployment: React with no routing, all content in one scroll. Proved the baseline could be built and shipped. Identified the primary limitation — no deep-proof layer, no stakeholder navigation paths.',
  },
  {
    phase: 'Phase 2',
    title: 'React Router migration + multi-route SPA',
    description:
      'Introduced React Router v6, broke the monolithic scroll into discrete views (Home, Case Studies, Resume). Established the routing architecture that all subsequent deep-dive and track pages extend.',
  },
  {
    phase: 'Phase 3',
    title: 'Server-side Gemini proxy + CI pipeline',
    description:
      'Moved AI interactions behind a Cloud Run Express proxy to eliminate exposed credentials. Added Vitest unit tests and a GitHub Actions CI pipeline (format → lint → typecheck → test → build → security audit) to make the system self-checking before release.',
  },
  {
    phase: 'Phase 4',
    title: 'Recruiter-native two-track framing',
    description:
      'Restructured the portfolio into two explicit role lanes — Implementation/CSE-lite and Ops Analytics/QA. Each lane surfaces role-specific proof blocks and supporting artifacts so reviewers retrieve the right evidence without excavating.',
  },
  {
    phase: 'Phase 5',
    title: 'Deep-dive proof layer (current)',
    description:
      'Built this page as the second-layer destination for track-page links. Consolidates decision-impact blocks, architecture evidence, LLM governance notes, and forensic archive in one structured proof system.',
  },
];

export const decisionBlocks: DecisionBlock[] = [
  {
    id: 'two-track-framing',
    title: 'Recruiter-native two-track framing',
    decision:
      'Converted the portfolio from a blended hybrid story into two explicit role lanes: Implementation/CSE-lite and Ops Analytics/QA.',
    impact:
      'Reviewers now enter the correct proof lane from the homepage. Relevant proof blocks surface immediately without requiring the reviewer to infer which skills apply to which role.',
    whyItMatters:
      'Information architecture decision with implementation consequences — reduce ambiguity, shorten time-to-value, surface the right artifact at the right time.',
    chips: ['Strategy', 'Information Architecture', 'Stakeholder Design'],
  },
  {
    id: 'server-proxy',
    title: 'Server-side Express proxy for Gemini',
    decision:
      'Moved all Gemini interactions behind a Cloud Run Express backend instead of calling the API directly from the client bundle.',
    impact:
      'API credentials no longer live in the browser. The client sends requests to the Express proxy, which holds the key and controls the Gemini call. No environment variables exposed at the network layer.',
    whyItMatters:
      'Technical implementation judgment under real constraints: safer delivery over flashy convenience. Security and deployability are first-order concerns, not an afterthought.',
    chips: ['Architecture', 'Security', 'Deployability'],
  },
  {
    id: 'feature-governance',
    title: 'Client-side mutability / Admin Mode removal',
    decision:
      'Removed a client-side Admin Mode that allowed runtime content mutation. The feature added complexity, surface area, and trust risk without a clear stakeholder benefit.',
    impact:
      'Simplified the system surface area, removed an unstable code path, and eliminated a trust risk for reviewers running the live portfolio.',
    whyItMatters:
      'Strong implementation work is knowing when to remove. Simplification is an active decision, not a default.',
    chips: ['Governance', 'Product Judgment', 'Risk Reduction'],
  },
  {
    id: 'proof-hierarchy',
    title: 'Layered proof architecture',
    decision:
      'Designed a three-layer evidence structure: track pages (role-framed), deep-dive (technical seriousness), forensic archive (raw decision trail). Each layer serves a different reviewer need and time investment.',
    impact:
      'Technical depth is now retrievable under skim-time conditions. Recruiters get the summary. Technical reviewers get the architecture detail. Hiring managers get the decision rationale.',
    whyItMatters:
      'Technical delivery often fails when evidence is hard to consume. Proof architecture is an implementation discipline, not just documentation.',
    chips: ['Stakeholder Design', 'Proof Architecture', 'Delivery Clarity'],
  },
  {
    id: 'react-router-migration',
    title: 'React Router migration',
    decision:
      'Replaced the single-scroll layout with a proper multi-route SPA using React Router v6 createBrowserRouter, enabling distinct pages, URL-addressable sections, and layout composition.',
    impact:
      'Unlocked deep-link navigation, cleaner separation of views, and the routing architecture that all track pages and the deep-dive layer depend on.',
    whyItMatters:
      'Architecture decisions compound. The router migration created the foundation for every subsequent proof-layer addition.',
    chips: ['Architecture', 'React', 'SPA Design'],
  },
  {
    id: 'app-modularization',
    title: 'App.tsx modularization',
    decision:
      'Decomposed a monolithic App.tsx into distinct view components, a router module, and a data layer, separating concerns across routing, layout, state, and content.',
    impact:
      'Enabled isolated testing, simpler route additions, and a maintainable codebase that scales as new proof pages are added without re-touching existing views.',
    whyItMatters:
      'Modular architecture is not just a code quality concern — it is a governance and velocity concern for any system expected to evolve.',
    chips: ['Refactoring', 'Maintainability', 'Systems Design'],
  },
];

export const technicalBlocks: TechnicalBlock[] = [
  {
    id: 'architecture-boundary',
    title: 'Architecture boundary: client / server / AI',
    context:
      'The initial implementation called Gemini directly from the React client, exposing API credentials in the browser bundle.',
    what: 'Introduced an Express.js backend on Cloud Run as a proxy layer. The React client sends requests to /api/chat. The server holds the Gemini API key, applies prompt constraints, and forwards sanitized responses. No credentials touch the client.',
    result:
      'Clean separation between UI layer, API orchestration layer, and the AI provider. Each boundary is explicit and independently deployable.',
    chips: ['Express', 'Cloud Run', 'Gemini', 'React', 'Security Boundary'],
  },
  {
    id: 'ci-and-tests',
    title: 'Vitest + GitHub Actions CI pipeline',
    context:
      'The project had no automated validation before this stage. Changes were verified manually before push.',
    what: 'Added Vitest unit tests for core components and utilities. Configured a GitHub Actions workflow that runs: Prettier format check → ESLint → TypeScript typecheck → Vitest → Vite build → npm audit. All gates must pass before merge.',
    result:
      'The system now self-checks before release. Format issues, type failures, broken builds, and known dependency vulnerabilities fail the pipeline rather than reaching production.',
    chips: ['Vitest', 'GitHub Actions', 'ESLint', 'TypeScript', 'CI/CD'],
  },
  {
    id: 'sandbox-hardening',
    title: 'Sandbox and preview environment hardening',
    context:
      'React Router navigation relied on browser history APIs that behave inconsistently in preview environments, iframes, and restricted sandboxes. Navigation failures were silent and hard to diagnose.',
    what: 'Diagnosed the browser assumption dependency, identified the environments where it failed, and reworked navigation behavior to remain stable across sandbox, iframe, and restricted-preview contexts. Validated across deployment environments before releasing.',
    result:
      'Navigation remains stable regardless of the execution environment. The failure was isolatable because the symptoms were environment-specific, not code-specific.',
    chips: ['Debugging', 'Reliability', 'Environment Resilience', 'React Router'],
  },
  {
    id: 'dompurify-hardening',
    title: 'DOMPurify sanitization hardening',
    context:
      'The case study view rendered HTML content from markdown-sourced data. Without sanitization, this created an unsafe rendering path for arbitrary HTML.',
    what: 'Wrapped all HTML rendering through DOMPurify with an explicit allowlist configuration. Removed the ability to render unsanitized HTML strings anywhere in the component tree. Validated the sanitization boundary with test cases.',
    result:
      'Rendering is now treated as a trust and validation problem, not just a display problem. The sanitization boundary is explicit, auditable, and consistently applied.',
    chips: ['DOMPurify', 'Security', 'Quality Engineering', 'Risk Mitigation'],
  },
];

export const llmRoles: LLMRole[] = [
  {
    name: 'ChatGPT',
    role: 'Strategy, audit, and evidence architecture',
    description:
      'Used for high-level framing decisions, audit of evidence gaps, stakeholder-facing copy review, and structuring the proof hierarchy. Treated as a strategic collaborator with operator-defined scope.',
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
      'Used for preserving the iterative development trail, capturing revision history context, documenting governance decisions in-flight, and maintaining the forensic archive of what changed and why.',
    examples: [
      'Revision and risk documentation',
      'Governance trail preservation',
      'In-flight decision capture',
      'Development forensics archive',
    ],
  },
];

export const forensicEntries: ArchiveEntry[] = [
  {
    id: 'forensic-archive',
    label: 'Evidence bank overview',
    description:
      'The evidence architecture for Portfolio2.0 spans three layers: track-level proof blocks (role-framed, skim-readable), deep-dive technical blocks (architecture detail, decision rationale), and a forensic revision trail (raw decision capture, governance notes, in-flight risk documentation). Each layer was designed for a different reviewer time investment and trust threshold.',
    chips: ['Evidence Architecture', 'Proof System', 'Three-layer Design'],
  },
  {
    id: 'validation-trail',
    label: 'Validation trail excerpts',
    description:
      'Key validation checkpoints preserved in the governance trail: (1) CI pipeline added before release branch merges; (2) DOMPurify sanitization boundary validated with explicit test cases before enabling HTML rendering; (3) Sandbox navigation behavior validated across three deployment environments before marking stable; (4) Server-proxy credential isolation verified by confirming no API keys appear in the client network tab under any request; (5) Each track page proof block reviewed against actual implementation artifacts before publishing.',
    chips: ['Validation', 'Traceability', 'Governance Checkpoints'],
  },
];

export const appendixLinks = [
  { label: 'Implementation track page', href: '/tracks/implementation' },
  { label: 'Ops Analytics track page', href: '/tracks/ops-analytics' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Resume', href: '/resume' },
];
