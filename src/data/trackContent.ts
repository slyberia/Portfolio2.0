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
    'My work covers implementation design, technical enablement, and risk-aware delivery — onboarding logic, rollout structure, and triage systems built to hold under real operational conditions. My strongest proof comes from designing clearer user paths, making technical systems safer to operate, and turning complex builds into governed, usable workflows. The result is delivery that is easier to trust, easier to explain, and easier to maintain.',
  chips: [
    'Onboarding logic',
    'Triage design',
    'AI workflow governance',
    'Delivery under constraints',
    'Trust and usability',
  ],
  whatThisPageProves: {
    heading: 'What this page proves',
    body: 'Five proof blocks cover how I restructured the reviewer path, moved risk-bearing logic server-side, governed AI as a controlled delivery tool, reduced the feature surface to what added trust, and designed retrieval-ready evidence. Each links to the supporting decision record or revision trail.',
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
        'Cut client-side Admin Mode — a runtime content mutation path that added coupling, fragility, and trust risk for any technical reviewer who triggered it while reviewing the live portfolio.',
      whyItMatters:
        'Demonstrates the product judgment that separates implementation maturity from feature accumulation: when a code path adds risk or trust friction without commensurate value, removing it is the right delivery call.',
      artifactChips: ['Governance', 'Product Judgment', 'Risk Reduction'],
      href: '/portfolio2/deep-dive#feature-governance',
    },
    {
      title: 'Structured proof for fast stakeholder interpretation',
      summary:
        'Designed evidence across three retrieval layers — skim-level proof blocks, decision-depth blocks, and a forensic archive — so the right artifact is findable at the right time investment, regardless of reviewer context.',
      whyItMatters:
        'Evidence architecture is a delivery problem. Proof buried in a repo or lost in dense prose fails the reviewer. This shows the ability to structure technical depth for retrieval, not just produce it.',
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
    "The decision-impact blocks, architecture boundary, and governance notes behind this track are one click away. Start with the deep-dive, or pull the resume if you're ready to move forward.",
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
    body: 'Five proof blocks cover how I introduced CI gates before release, hardened a brittle navigation path against sandbox failures, applied sanitization as a rendering trust constraint, maintained a traceable record of revisions and risks, and structured technical depth as decision-ready reporting. Each links to the decision record or revision trail.',
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
      title: 'Structured ops evidence into a three-layer, retrieval-ready reporting system',
      summary:
        'Structured the evidence across three retrieval layers — role-framed track summaries, decision-depth blocks, and a forensic archive — so a reviewer at any time threshold can pull the relevant proof without reading everything. Ops work that cannot be surfaced fast does not land with evaluators.',
      whyItMatters:
        'Ops and QA work routinely loses value when it is poorly surfaced. This proves the ability to convert raw technical depth into structured, retrievable reporting — the same skill that makes ops evidence usable in stakeholder reviews.',
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
    {
      label: 'Sandbox failure / mitigation block',
      href: '/portfolio2/deep-dive#sandbox-hardening',
    },
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
    "The validation trail, revision trail, and CI/testing decision block behind this track are one click away. Start with the deep-dive, or pull the resume if you're ready to move forward.",
  ctaLinks: {
    resumeHref: '/resume',
    deepDiveHref: '/portfolio2/deep-dive',
  },
};

export const gisTrackContent: TrackPageContent = {
  route: '/tracks/gis',
  title: 'GIS Systems & Spatial Operations',
  eyebrow: 'Track Path',
  headline: 'I maintain the accuracy and operational clarity of spatial data systems.',
  subcopy:
    'My work covers utility dataset maintenance, spatial QA, and stakeholder-facing visualization — grounded in 4+ years of production ESRI ArcMap experience. My strongest proof comes from sustaining 120+ service requests per week for CentrePoint Energy through structured triage and validation, building operational dashboards at HPS Geospatial, and applying a QA methodology that matched the validation approach to the actual data risk. The result is throughput that held under production volume, accuracy that could be reported, and documentation that reduced friction for the people using the systems.',
  chips: ['Spatial QA', 'Utility Mapping', 'Data Integrity', 'Triage Workflows', 'ESRI ArcMap'],
  whatThisPageProves: {
    heading: 'What this page proves',
    body: 'Four proof blocks cover how I maintained a production utility dataset at volume, built stakeholder dashboards that made spatial data usable for operational decisions, applied dual-mode QA methodology to match the validation approach to the actual data risk, and produced documentation and support assets that reduced friction for end users. Each links to the supporting case study or resume.',
  },
  proofBlocks: [
    {
      title: 'Maintained Indiana electric operations dataset at 120+ requests per week',
      summary:
        'Supported a contracted team for CentrePoint Energy maintaining the accuracy and consistency of their electric operations dataset — processing service requests through structured triage and validation loops while sustaining throughput and accuracy under production volume.',
      whyItMatters:
        'High-volume spatial QA is a reliability problem, not just a technical one. Consistent throughput at 120+ requests/week demonstrates structured workflow discipline and the ability to hold data accuracy under operational load.',
      artifactChips: ['Spatial QA', 'Utility Operations', 'Throughput'],
      href: '/case-studies/ops-triage',
    },
    {
      title: 'Built stakeholder dashboards and visualization outputs for operational reporting',
      summary:
        'At HPS Geospatial, designed and built stakeholder-facing dashboards and data visualizations to support decision-making and status reporting. Created demo environments and presentation materials to communicate data formats, risks, and feature behavior clearly during stakeholder meetings.',
      whyItMatters:
        'GIS data only creates value when the right people can interpret it. Visualization work that supports operational decisions shows the ability to bridge technical data systems and stakeholder communication.',
      artifactChips: ['Data Visualization', 'Stakeholder Reporting', 'Dashboard Design'],
      href: '/resume',
    },
    {
      title: 'Applied dual-mode QA: batch validation and zero-trust triage',
      summary:
        'Used structured QA protocols across two validation modes — batch processing for high-throughput verification of consistent record types, and zero-trust validation for records with ambiguous or conflicting source data. The method matched the validation approach to the data risk profile rather than applying a single pace to all records.',
      whyItMatters:
        'Applying a single QA approach to all data types leaves the most ambiguous records underexamined. Matching the validation method to the risk profile is the judgment that separates reliable spatial operations from volume-only throughput.',
      artifactChips: ['QA Methodology', 'Validation Design', 'Data Integrity'],
      href: '/case-studies/ops-triage',
    },
    {
      title: 'Produced documentation and support assets to reduce stakeholder friction',
      summary:
        'Produced end-user documentation, support assets, and workflow guides to help stakeholders navigate tooling and operational processes. Coordinated project workflows and deliverables to improve consistency and execution quality across reporting cycles.',
      whyItMatters:
        'Documentation is an operational asset. Support materials that reduce friction for the people using spatial systems are as important as the systems themselves — and equally testable by the evidence they leave behind.',
      artifactChips: ['Technical Documentation', 'Enablement Assets', 'Operational Consistency'],
      href: '/resume',
    },
  ],
  howIWork: [
    'Match the validation method to the data risk — not all records deserve the same scrutiny',
    'Sustain throughput without sacrificing accuracy; volume is not an excuse for drift',
    'Design reporting and documentation for the people who need to act on it, not just read it',
    'Make spatial operations visible: if the data quality cannot be reported, it cannot be trusted',
  ],
  supportingArtifacts: [
    { label: 'Ops triage case study', href: '/case-studies/ops-triage' },
    { label: 'Dual-mode QA methodology', href: '/case-studies/ops-triage' },
    { label: 'Resume', href: '/resume' },
  ],
  bestFitRoles: [
    'GIS Analyst',
    'Utility GIS Specialist',
    'Geospatial Data QA',
    'Spatial Operations Analyst',
    'GIS Technician',
  ],
  ctaCopy:
    "The ops triage case study and resume behind this track are one click away. Start with the case study for QA methodology detail, or pull the resume if you're ready to move forward.",
  ctaLinks: {
    resumeHref: '/resume',
  },
};

export const trackSelectorCards: TrackSelectorCard[] = [
  {
    title: 'Implementation / CSE-lite',
    subcopy: 'Onboarding, technical guidance, rollout logic, triage design, governed AI delivery.',
    href: '/tracks/implementation',
  },
  {
    title: 'Ops Analytics / QA',
    subcopy:
      'Validation, regression prevention, failure isolation, audit trails, decision-ready reporting.',
    href: '/tracks/ops-analytics',
  },
  {
    title: 'GIS Systems & Spatial Operations',
    subcopy:
      'Utility mapping, spatial QA, and 4+ years of production ESRI ArcMap experience — dataset maintenance at volume, stakeholder dashboards, and structured validation workflows.',
    href: '/tracks/gis',
  },
];
