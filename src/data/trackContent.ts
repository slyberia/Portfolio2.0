export type TrackProofBlock = {
  title: string;
  summary: string;
  whyItMatters: string;
  artifactChips: string[];
  href: string;
};

export type SupportingArtifactLink = {
  label: string;
  href: string;
};

export type TrackPageIntro = {
  heading: string;
  body: string;
};

export type TrackPageContent = {
  route: string;
  title: string;
  eyebrow: string;
  headline: string;
  subcopy: string;
  chips: string[];
  whatThisPageProves: TrackPageIntro;
  proofBlocks: TrackProofBlock[];
  howIWork: string[];
  supportingArtifacts: SupportingArtifactLink[];
  bestFitRoles: string[];
  ctaCopy: string;
  ctaLinks?: {
    resumeHref?: string;
    deepDiveHref?: string;
  };
};

export type TrackSelectorCard = {
  title: string;
  subcopy: string;
  href: string;
};

export const implementationTrackContent: TrackPageContent = {
  route: '/tracks/implementation',
  title: 'Implementation / CSE-lite',
  eyebrow: 'Track Path',
  headline: 'I design and harden systems that help users reach value faster.',
  subcopy:
    'I work at the intersection of implementation, technical guidance, rollout structure, and risk-aware delivery. My strongest proof comes from designing clearer user paths, making technical systems safer to operate, and turning complex builds into governed, usable workflows. The result is delivery that is easier to trust, easier to explain, and easier to maintain.',
  chips: [
    'Onboarding logic',
    'Triage design',
    'AI workflow governance',
    'Delivery under constraints',
    'Trust and usability',
  ],
  whatThisPageProves: {
    heading: 'What this page proves',
    body: 'This track focuses on implementation-facing proof: how I structure systems, reduce ambiguity, improve delivery trust, and make technical experiences easier for users and stakeholders to navigate.',
  },
  proofBlocks: [
    {
      title: 'Reframed a complex portfolio into recruiter-native delivery paths',
      summary:
        'Converted Portfolio2.0 from a blended hybrid story into two explicit role lanes so reviewers could retrieve the right proof faster.',
      whyItMatters:
        'This is implementation thinking in portfolio form: reduce ambiguity, shorten the path to value, and surface the right artifact at the right time.',
      artifactChips: ['Strategy', 'Information Architecture', 'Decision Block'],
      href: '/portfolio2/deep-dive#two-track-framing',
    },
    {
      title: 'Moved AI interactions server-side to eliminate exposed credentials',
      summary:
        'Shifted Gemini interactions behind a Cloud Run Express proxy so sensitive logic and credentials no longer lived in the client bundle.',
      whyItMatters:
        'Shows technical implementation judgment under real constraints: safer delivery over flashy convenience.',
      artifactChips: ['Architecture', 'Security', 'Deployability'],
      href: '/portfolio2/deep-dive#server-proxy',
    },
    {
      title: 'Built a governed AI delivery model instead of a novelty chatbot',
      summary:
        'Used multiple LLMs in differentiated roles across audit, synthesis, and execution support, while constraining behavior through protocols, operator checkpoints, and role-specific boundaries.',
      whyItMatters:
        'Shows applied AI implementation maturity: the AI layer was designed to support delivery and trust, not just add spectacle.',
      artifactChips: ['AI Governance', 'Workflow Design', 'Systems Thinking'],
      href: '/portfolio2/deep-dive#multi-llm-governance',
    },
    {
      title: 'Removed risky feature paths when they interfered with trust',
      summary:
        'Cut or constrained weak client-side mutation flows and unstable behavior paths when they made the system harder to trust or operate cleanly.',
      whyItMatters:
        'Strong implementation work is not just adding features. It is knowing when to simplify and stabilize.',
      artifactChips: ['Governance', 'Product Judgment', 'Risk Reduction'],
      href: '/portfolio2/deep-dive#feature-governance',
    },
    {
      title: 'Structured proof for fast stakeholder interpretation',
      summary:
        'Designed the portfolio\'s evidence architecture so recruiters and hiring managers could retrieve the right proof faster, with clearer pathways, role-lane framing, and supporting artifacts.',
      whyItMatters:
        'Technical delivery often fails when evidence is hard to consume. This shows the ability to shape information for faster stakeholder understanding and action.',
      artifactChips: ['Stakeholder Design', 'Proof Architecture', 'Delivery Clarity'],
      href: '/portfolio2/deep-dive#proof-hierarchy',
    },
  ],
  howIWork: [
    'Reduce ambiguity in the user or stakeholder path first',
    'Prefer governed, supportable systems over clever but fragile ones',
    'Make technical decisions with trust, rollout, and maintenance in mind',
    'Use documentation and visible proof to make delivery legible',
  ],
  supportingArtifacts: [
    { label: 'Decision-impact blocks', href: '/portfolio2/deep-dive#decision-blocks' },
    { label: 'Architecture boundary diagram', href: '/portfolio2/deep-dive#architecture-boundary' },
    { label: 'LLM governance summary', href: '/portfolio2/deep-dive#multi-llm-governance' },
    { label: 'Resume', href: '/resume' },
    { label: 'Portfolio2.0 deep-dive', href: '/portfolio2/deep-dive' },
  ],
  bestFitRoles: [
    'Implementation Specialist',
    'Customer Success Engineer',
    'Solutions / Enablement hybrid',
    'Technical Onboarding',
    'AI-forward support and rollout roles',
  ],
  ctaCopy:
    'Explore the supporting decision-impact blocks, implementation artifacts, and governance notes behind this track.',
  ctaLinks: {
    resumeHref: '/resume',
    deepDiveHref: '/portfolio2/deep-dive',
  },
};

export const opsAnalyticsTrackContent: TrackPageContent = {
  route: '/tracks/ops-analytics',
  title: 'Ops Analytics / QA',
  eyebrow: 'Track Path',
  headline:
    'I build and evaluate systems with a bias toward validation, traceability, and operational clarity.',
  subcopy:
    'My work emphasizes controlled testing, regression prevention, edge-case hardening, and turning messy technical history into decision-ready proof. I focus on how systems behave under constraints, how failures are isolated, and how evidence is preserved so later decisions stay grounded in reality.',
  chips: [
    'Validation-first',
    'Regression prevention',
    'Failure isolation',
    'Audit trail',
    'Decision-ready reporting',
  ],
  whatThisPageProves: {
    heading: 'What this page proves',
    body: 'This track focuses on QA and ops-analysis proof: how I prevent regressions, harden brittle paths, preserve traceability, and convert technical detail into structured evidence others can act on.',
  },
  proofBlocks: [
    {
      title: 'Added automated test and CI gates before release',
      summary:
        'Introduced test and CI checks so formatting issues, type failures, broken builds, and unsafe changes could fail before release.',
      whyItMatters:
        'This is the clearest QA maturity signal in the portfolio: the system moved from "works right now" to "checks itself before release."',
      artifactChips: ['QA', 'CI/CD', 'Regression Prevention'],
      href: '/portfolio2/deep-dive#ci-and-tests',
    },
    {
      title: 'Hardened navigation against sandbox and edge-environment failures',
      summary:
        'Diagnosed brittle browser assumptions and reworked navigation behavior so the application remained stable in restricted preview and sandbox environments.',
      whyItMatters:
        'Shows controlled debugging and environment-aware QA thinking: isolate the failure condition, then redesign around it.',
      artifactChips: ['Debugging', 'Reliability', 'Environment Resilience'],
      href: '/portfolio2/deep-dive#sandbox-hardening',
    },
    {
      title: 'Applied strict sanitization to remove unsafe rendering paths',
      summary:
        'Added DOMPurify-based sanitization and explicit constraints to reduce unsafe HTML rendering behavior.',
      whyItMatters:
        'Treats rendering as a trust and validation problem, not just a display problem.',
      artifactChips: ['Security', 'Quality Engineering', 'Risk Mitigation'],
      href: '/portfolio2/deep-dive#dompurify-hardening',
    },
    {
      title: 'Preserved a forensic trail of revisions, risks, and validations',
      summary:
        'Maintained archive-level evidence of revisions, mitigations, validation traces, and governance notes instead of relying only on polished summaries.',
      whyItMatters:
        'Shows traceability and audit discipline. Later decisions can be tied back to real evidence instead of memory or spin.',
      artifactChips: ['Traceability', 'Documentation', 'Operational Maturity'],
      href: '/portfolio2/deep-dive#forensic-archive',
    },
    {
      title: 'Built a layered proof system so technical depth could be understood quickly',
      summary:
        'Created an evidence architecture that makes technical seriousness retrievable under skim-time conditions instead of leaving it buried in repos and notes.',
      whyItMatters:
        'Ops and QA work often loses value when it is poorly presented. This proves the ability to convert technical depth into decision-ready reporting.',
      artifactChips: ['Evidence Architecture', 'Reporting Design', 'Decision Support'],
      href: '/portfolio2/deep-dive#proof-hierarchy',
    },
  ],
  howIWork: [
    'Isolate the actual failure condition before changing the system',
    'Build regression and validation checks into the workflow',
    'Preserve the audit trail so later decisions stay grounded',
    'Translate technical depth into proof others can evaluate quickly',
  ],
  supportingArtifacts: [
    { label: 'CI workflow and testing notes', href: '/portfolio2/deep-dive#ci-and-tests' },
    { label: 'Validation trail excerpts', href: '/portfolio2/deep-dive#validation-trail' },
    { label: 'Sandbox failure / mitigation block', href: '/portfolio2/deep-dive#sandbox-hardening' },
    { label: 'Risk and revision archive', href: '/portfolio2/deep-dive#forensic-archive' },
    { label: 'Portfolio2.0 deep-dive', href: '/portfolio2/deep-dive' },
  ],
  bestFitRoles: [
    'QA Analyst',
    'Operations Analyst',
    'Technical Support / Reliability hybrid',
    'Experimentation-minded ops roles',
    'AI / systems validation roles',
  ],
  ctaCopy:
    'Explore the validation artifacts, audit trail, and decision-impact blocks that support this track.',
  ctaLinks: {
    resumeHref: '/resume',
    deepDiveHref: '/portfolio2/deep-dive',
  },
};

export const trackSelectorCards: TrackSelectorCard[] = [
  {
    title: 'Implementation / CSE-lite',
    subcopy:
      'Onboarding, technical guidance, rollout logic, triage design, governed AI delivery.',
    href: '/tracks/implementation',
  },
  {
    title: 'Ops Analytics / QA',
    subcopy:
      'Validation, regression prevention, failure isolation, audit trails, decision-ready reporting.',
    href: '/tracks/ops-analytics',
  },
];
