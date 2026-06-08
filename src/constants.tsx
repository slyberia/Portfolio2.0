/* eslint-disable react-refresh/only-export-components */
import { ExperienceItem, SkillGroup, Certification, ProjectEntry, SkillChipConfig } from './types';
import { MOH_SUPERVISOR_DASHBOARD_HTML } from './data/mohSupervisorDashboard';
import { AEGIS_STATE_MACHINE_HTML } from './data/aegisStateMachine';
import { PORTFOLIO_PIPELINE_HTML } from './data/portfolioPipelineDiagram';

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'HPS Geospatial',
    role: 'Independent Systems & Web Consultant',
    period: '2021–Present',
    tools:
      'React · TypeScript · Vite · GitHub · Google Cloud Run · Google AI Studio · Claude Code · Documentation',
    bullets: [
      'Designed and refined web-based systems intended to improve user clarity, trust, and delivery readiness for external reviewers and stakeholders.',
      'Built AI-assisted application workflows using governed multi-tool processes, including roadmap creation, implementation planning, architecture hardening, and documentation.',
      'Translated ambiguous goals into structured delivery plans, scoped phases, and supporting artifacts rather than ad hoc iteration.',
      'Produced handoff-ready implementation guidance, roadmap materials, and documentation to support continued development and deployment.',
    ],
  },
  {
    company: 'Apex Systems / CenterPoint Energy',
    role: 'GIS Data Operations Analyst',
    period: '2022–2024',
    tools: 'ESRI ArcMap · Utility GIS Workflows · Data QA · Triage · Production Data Maintenance',
    bullets: [
      'Worked within structured utility GIS workflows to process service-related edits, data updates, and mapping changes with attention to accuracy and downstream usability.',
      'Handled high-volume operational requests in a controlled environment where repeatability, consistency, and validation mattered.',
      'Supported backlog reduction and workflow continuity through reliable data maintenance and structured execution.',
      'Strengthened discipline around production-safe procedures, quality checks, and working within systems where errors could affect downstream operations.',
    ],
  },
  {
    company: 'Printful',
    role: 'Technical Customer Support Representative',
    period: '2021',
    tools: 'Zendesk · E-commerce Support · Escalation Workflows · Customer Troubleshooting',
    bullets: [
      'Provided technical support through Zendesk for customer issues spanning e-commerce integrations, account workflows, product questions, warehousing, and shipping.',
      'Triaged support requests, clarified customer needs, and coordinated with internal teams or partner SMEs to drive timely resolution.',
      'Supported customer trust through clear troubleshooting, accurate communication, escalation discipline, and follow-through.',
      'Conducted live-chat discovery with prospective customers to understand goals and route them toward the right product path.',
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Technical Implementation',
    description:
      'Workflow setup, technical translation, onboarding support, and handoff-ready documentation.',
    items: [
      {
        name: 'Workflow Design',
        lane: 'Implementation',
        description:
          'Used to map requirements into step-by-step delivery flows so onboarding and implementation work can move without guesswork.',
        proofHref: '/projects/luxe-lofts',
      },
      {
        name: 'Technical Troubleshooting',
        lane: 'Implementation',
        description:
          'Applied when diagnosing blockers across tooling, configuration, and handoff boundaries to keep delivery moving under time pressure.',
        proof: 'Demonstrated in Ops Triage workflow diagnostics',
        proofHref: '/projects/ops-triage',
      },
      {
        name: 'Implementation Planning',
        lane: 'Implementation',
        description:
          'Supports phased rollout planning by turning broad goals into scoped tasks, dependencies, and validation checkpoints.',
        proofHref: '/projects/luxe-lofts',
      },
      {
        name: 'Onboarding Support',
        lane: 'Implementation',
        description:
          'Used to guide users through setup and early adoption so systems become usable quickly and support load stays controlled.',
        proofHref: '/projects/ops-triage',
      },
      {
        name: 'Documentation',
        lane: 'Implementation',
        description:
          'Used to produce handoff-ready guides that reduce repeat questions and preserve decision context for future contributors.',
        proofHref: '/projects/guynode',
      },
      {
        name: 'Stakeholder Communication',
        lane: 'Implementation',
        description:
          'Helps translate technical status into decision-ready updates for cross-functional teams, reviewers, and non-technical partners.',
        proofHref: '/projects/luxe-lofts',
      },
      {
        name: 'Support Handoff',
        lane: 'Implementation',
        description:
          'Applied when transferring ownership between teams so unresolved issues, context, and next actions remain traceable.',
        proofHref: '/projects/ops-triage',
      },
    ],
  },
  {
    category: 'Quality Assurance & Operations',
    description: 'Testing logic, triage systems, data validation, and operational reliability.',
    items: [
      {
        name: 'QA Protocols',
        lane: 'QA',
        description:
          'Used to run consistent validation passes so defects are surfaced early and release decisions are evidence-based.',
        proofHref: '/deep-dives#ci-and-tests',
      },
      {
        name: 'Issue Triage',
        lane: 'QA',
        description:
          'Applied to prioritize incoming problems by impact, urgency, and dependency risk so teams address the right failures first.',
        proof: 'Used in Ops Triage incident workflow',
        proofHref: '/projects/ops-triage',
      },
      {
        name: 'Root-Cause Analysis',
        lane: 'QA',
        description:
          'Supports post-issue analysis by tracing failures to process, data, or implementation causes rather than treating symptoms.',
        proofHref: '/projects/ops-triage',
      },
      {
        name: 'Data QA / Validation',
        lane: 'QA',
        description:
          'Used to verify data quality before downstream use so reports, maps, and operational decisions stay reliable.',
        proofHref: '/deep-dives#validation-trail',
      },
      {
        name: 'Process Improvement',
        lane: 'QA',
        description:
          'Applied when refining workflows to reduce repeat failure patterns and improve throughput without losing controls.',
        proofHref: '/projects/luxe-lofts',
      },
      {
        name: 'Operational Throughput',
        lane: 'QA',
        description:
          'Useful for balancing speed and quality in high-volume queues with clear escalation and completion standards.',
        proofHref: '/projects/ops-triage',
      },
      {
        name: 'Launch Readiness',
        lane: 'QA',
        description:
          'Used to assess whether systems meet baseline reliability, documentation, and support criteria before release.',
        proofHref: '/projects/guynode',
      },
    ],
  },
  {
    category: 'GIS & Spatial Data',
    description:
      'Spatial data workflows, mapping interfaces, metadata structure, and public data access.',
    items: [
      {
        name: 'ArcGIS',
        lane: 'GIS',
        description:
          'Used to manage and validate spatial datasets in structured GIS workflows where data accuracy affects downstream operations.',
        proofHref: '/projects/moh',
      },
      {
        name: 'ESRI ArcMap',
        lane: 'GIS',
        description:
          'Applied in production data maintenance workflows to execute map edits and utility-related updates with repeatable QA checks.',
        proofHref: '/projects/ops-triage',
      },
      {
        name: 'Leaflet',
        lane: 'GIS',
        description:
          'Used to create lightweight web map previews and interactive spatial interfaces for portfolio and project communication.',
        proof: 'Used in Guynode Spatial Data Hub',
        proofHref: '/projects/guynode',
      },
      {
        name: 'Spatial Data',
        lane: 'GIS',
        description:
          'Supports location-based analysis by structuring geospatial information for map display, validation, and operational decision support.',
        proofHref: '/projects/guynode',
      },
      {
        name: 'Metadata',
        lane: 'GIS',
        description:
          'Used to document dataset context, source quality, and handling constraints so teams can trust and reuse spatial assets.',
        proofHref: '/projects/guynode',
      },
      {
        name: 'Dataset Cataloging',
        lane: 'GIS',
        description:
          'Applied to organize data inventories and access paths so reviewers can locate relevant spatial assets quickly.',
        proofHref: '/projects/guynode',
      },
      {
        name: 'Map-Based UX',
        lane: 'GIS',
        description:
          'Used to present complex spatial information through clear interaction patterns that non-specialists can interpret.',
        proofHref: '/projects/guynode',
      },
    ],
  },
  {
    category: 'AI-Assisted Workflow Design',
    description: 'Structured AI collaboration, prompt systems, governance, and human review.',
    items: [
      {
        name: 'Prompt Governance',
        lane: 'AI Systems',
        description:
          'Used to enforce prompt standards and review controls so AI outputs remain consistent with project constraints.',
        proof: 'Applied in the Digital Twin AI Agent guardrail and prompt-governance framework',
        proofHref: '/projects/digital-twin',
      },
      {
        name: 'AI-Assisted Development',
        lane: 'AI Systems',
        description:
          'Supports faster build iteration by combining AI drafting with human validation, scope checks, and targeted patching.',
        proofHref: '/projects/digital-twin',
      },
      {
        name: 'LLM Workflow Design',
        lane: 'AI Systems',
        description:
          'Applied when designing multi-step AI workflows that require guardrails, fallback plans, and clear handoff points.',
        proofHref: '/projects/digital-twin',
      },
      {
        name: 'Documentation Systems',
        lane: 'AI Systems',
        description:
          'Used to maintain structured records of implementation decisions, risks, and validation outcomes across phases.',
        proofHref: '/projects/guynode',
      },
      {
        name: 'Evidence Architecture',
        lane: 'AI Systems',
        description:
          'Helps organize claims, artifacts, and proof links so portfolio systems can be reviewed quickly and credibly.',
        proofHref: '/deep-dives#proof-hierarchy',
      },
      {
        name: 'Human Review Loops',
        lane: 'AI Systems',
        description:
          'Used to keep humans in critical checkpoints where judgment, risk acceptance, or external-facing quality must be confirmed.',
        proofHref: '/projects/digital-twin',
      },
    ],
  },
  {
    category: 'Tools & Platforms',
    description:
      'Platforms and tools used across support, data, documentation, GIS, and frontend workflows.',
    items: [
      {
        name: 'Zendesk',
        lane: 'Tools',
        description:
          'Used in customer support workflows for ticket triage, escalation tracking, and communication continuity.',
        proofHref: '/resume',
      },
      {
        name: 'Salesforce & CRM',
        lane: 'Tools',
        description:
          'Supports CRM-oriented workflow planning where lead context, ownership, and follow-up paths need to stay visible.',
        proofHref: '/projects/luxe-lofts',
      },
      {
        name: 'Notion',
        lane: 'Tools',
        description:
          'Used to centralize project notes, planning artifacts, and implementation references for cross-functional visibility.',
        proofHref: '/projects/luxe-lofts',
      },
      {
        name: 'Jira',
        lane: 'Tools',
        description:
          'Applied to track issues, implementation tasks, QA follow-up, and delivery progress across teams.',
        proofHref: '/projects/ops-triage',
      },
      {
        name: 'Asana',
        lane: 'Tools',
        description:
          'Used for task coordination and timeline management when delivery work spans multiple owners and dependencies.',
        proofHref: '/projects/luxe-lofts',
      },
      {
        name: 'Tableau',
        lane: 'Tools',
        description:
          'Useful for translating operational data into visual summaries that support trend review and stakeholder reporting.',
        proofHref: '/resume',
      },
      {
        name: 'Power BI',
        lane: 'Tools',
        description:
          'Used to structure dashboards that highlight performance patterns, exceptions, and workflow outcomes over time.',
        proofHref: '/resume',
      },
      {
        name: 'BigQuery',
        lane: 'Tools',
        description:
          'Supports large-scale data querying and analysis workflows when operational datasets need structured exploration.',
        proofHref: '/resume',
      },
      {
        name: 'HTML / CSS',
        lane: 'Implementation',
        description:
          'Used to build and refine responsive interface structure, accessibility behavior, and visual hierarchy.',
        proofHref: '/projects/digital-twin',
      },
      {
        name: 'React',
        lane: 'Implementation',
        description:
          'Used to build modular portfolio interfaces where reusable components can be validated, refined, and extended.',
        proofHref: '/projects/digital-twin',
      },
      {
        name: 'TypeScript',
        lane: 'Implementation',
        description:
          'Used to enforce safer contracts across components and data models so implementation changes remain predictable.',
        proofHref: '/projects/digital-twin',
      },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  { name: 'IBM AI-Enabled Applications for Customer Service', issuer: 'IBM' },
  { name: 'Google Project Management Professional Certificate', issuer: 'Google' },
  { name: 'Google Data Analytics Professional Certificate', issuer: 'Google' },
  { name: 'Intercultural Competency', issuer: "Queen's University International Center" },
];

export const SKILL_CHIP_CONFIG: Record<string, SkillChipConfig> = {
  'Customer Success Support': {
    linkMode: 'secondary',
    linkedSlugs: ['ops-triage'],
    evidenceNote:
      'ops-triage documents high-volume operational support at scale (Apex Systems); direct customer-facing CS evidence exists in the Printful/Zendesk role but no dedicated case study has been built for it yet.',
  },
  'Demo Environments': {
    linkMode: 'direct',
    linkedSlugs: ['ops-triage'],
  },
  'Dashboards & Reporting': {
    linkMode: 'direct',
    linkedSlugs: ['ops-triage'],
  },
  Asana: {
    linkMode: 'flagged',
    linkedSlugs: [],
    evidenceNote:
      'Project coordination evidence exists via Google Project Management certificate and the Luxe Lofts workflow design, but no case study explicitly documents Asana usage.',
  },
  Jira: {
    linkMode: 'direct',
    linkedSlugs: ['ops-triage'],
  },
  BigQuery: {
    linkMode: 'flagged',
    linkedSlugs: [],
    evidenceNote:
      'No case study currently references BigQuery. Google Data Analytics certificate covers data tooling breadth.',
  },
  'Power BI': {
    linkMode: 'flagged',
    linkedSlugs: [],
    evidenceNote: 'No case study currently references Power BI.',
  },
  Tableau: {
    linkMode: 'flagged',
    linkedSlugs: [],
    evidenceNote: 'No case study currently references Tableau.',
  },
  'Salesforce & CRM': {
    linkMode: 'secondary',
    linkedSlugs: ['luxe-lofts'],
    evidenceNote:
      'Luxe Lofts prototype includes CRM path orchestration (as documented in the hero artifact). The case study is proposal-phase work and does not reference Salesforce by name.',
  },
  Zendesk: {
    linkMode: 'flagged',
    linkedSlugs: [],
    evidenceNote:
      'Zendesk used at Printful (100+ conversations/week including $100k+ revenue accounts); no dedicated case study documents this work yet.',
  },
};

export const PROJECT_REGISTRY: ProjectEntry[] = [
  {
    id: 'luxe-lofts',
    title: 'Luxe Lofts Ecosystem',
    rationale: 'Blueprint for unified digital systems and automated conversion paths.',
    category: 'success-strategy',
    tags: ['Stakeholder Communication', 'Process Improvement', 'Notion'],
    roleLanes: ['Forward Deployed Engineer'],
    heroArtifact: {
      type: 'html',
      label: 'Luxe Lofts: Operational Hub',
      description: 'Functional Rate Engine, AI Planning ingress, and CRM path orchestration.',
      content: '',
      iframeUrl: 'https://luxe-lofts-roadmap-repo-786228485832.us-central1.run.app/',
    },
    rigor: {
      statement: 'Fragmentation is the friction that kills conversion paths.',
      baseline: 'Legacy presence was fragmented across multiple domains with conflicting info.',
      definition: "'Unified System' = Single hub aligning SEO, social signals, and booking.",
      method: 'Multi-domain audit scoped against all active client properties.',
      window: 'Pre-deployment proposal phase prototype.',
    },
  },
  {
    id: 'ops-triage',
    title: 'Systems at Scale: Triage & QA',
    rationale: 'Operationalizing the gap between training theory and production reality.',
    category: 'qa-data',
    tags: ['Data QA / Validation', 'Operational Throughput', 'Issue Triage', 'ESRI ArcMap'],
    roleLanes: ['Implementation Consultant', 'Spatial Systems Architect'],
    heroArtifact: undefined,
    rigor: {
      statement: 'The system defines the result. Optimize for flow AND trust.',
      baseline: 'Legacy workflows applied a single pace to disparate data risks.',
      definition: "'First-Pass Yield' = Percentage of records accepted without revision.",
      method: 'Dual-mode: Batch-processing vs Zero-trust validation.',
      window: 'Daily capacity vs Weekly defect capture.',
    },
  },
  {
    id: 'guynode',
    title: 'Guynode Spatial Data Hub',
    rationale:
      'Modernized a legacy geospatial data site into a public-facing spatial data platform for organizing, previewing, documenting, and validating spatial datasets for Guyana.',
    category: 'qa-data',
    tags: [
      'GIS',
      'Spatial Data',
      'Dataset Cataloging',
      'Metadata',
      'Leaflet',
      'GeoJSON',
      'Launch Readiness',
      'Data QA / Validation',
      'Technical Implementation',
      'Documentation',
    ],
    roleLanes: [
      'Spatial Systems Architect',
      'Forward Deployed Engineer',
      'Implementation Consultant',
    ],
    heroArtifact: {
      type: 'html',
      label: 'Guynode Data Access Flow',
      description:
        'How a visitor moves from discovery to a trusted download in the redesigned portal. Click to launch the live redesign.',
      content: `<div style="font-family:Inter,system-ui,sans-serif;background:#f8fbfd;border:1px solid #d8e8ee;border-radius:14px;padding:18px;max-width:680px;color:#0f172a;">
  <h4 style="margin:0 0 14px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#475569;">Guynode · Data Access Flow</h4>
  <div style="display:grid;gap:8px;">
    <div style="padding:11px 14px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;"><strong>1 · Discover</strong> — browse the governed dataset registry by category, tag, or search</div>
    <div style="text-align:center;color:#0d9488;">↓</div>
    <div style="padding:11px 14px;border:1px solid #99f6e4;border-radius:10px;background:#f0fdfa;"><strong>2 · Preview</strong> — inspect spatial layers on an in-browser Leaflet map before downloading</div>
    <div style="text-align:center;color:#0d9488;">↓</div>
    <div style="padding:11px 14px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;"><strong>3 · Verify</strong> — confirm provenance, format, and last-updated metadata up front</div>
    <div style="text-align:center;color:#0d9488;">↓</div>
    <div style="padding:11px 14px;border:1px solid #fed7aa;border-radius:10px;background:#fff7ed;"><strong>4 · Download</strong> — pull the dataset in a standard format via a clear, validated path</div>
  </div>
  <p style="margin:14px 0 0;font-size:11px;color:#64748b;">Click to launch the live redesigned Spatial Data Hub →</p>
</div>`,
      iframeUrl: 'https://guynode-spatial-data-hub-786228485832.us-central1.run.app/',
    },
    rigor: {
      statement:
        'Spatial data platforms succeed when users can trust what exists, understand what it contains, and access it without decoding the file system.',
      baseline:
        'Legacy spatial data access often depends on file listings, inconsistent metadata, and unclear preview/download paths.',
      definition:
        'Dataset readiness = clear title, category, description, format, provenance/attribution, download behavior, and preview status where applicable.',
      method:
        'Reorganized legacy spatial data access into a structured registry, map-aware frontend model, metadata-driven catalog, and launch-readiness review path.',
      window: 'Guynode v2 modernization and portfolio proof build.',
    },
    constraints: [
      {
        problem:
          'Legacy geospatial data access can become hard to navigate as datasets accumulate.',
        tradeoff:
          'Use a structured registry and public-facing catalog model before adding unnecessary complexity.',
      },
      {
        problem: 'Spatial datasets vary in format, size, and preview suitability.',
        tradeoff:
          'Use metadata and viewer-type fields to distinguish previewable layers from download-only assets.',
      },
      {
        problem: 'A public data hub must balance technical depth with general-user clarity.',
        tradeoff:
          'Use clearer copy, categories, tags, and download paths instead of exposing raw file storage logic.',
      },
    ],
  },
  {
    id: 'digital-twin',
    title: 'Digital Twin AI Agent',
    rationale:
      'A portfolio-bound AI assistant that answers recruiter questions, routes visitors to relevant proof, triggers resume/contact actions, and demonstrates scoped AI implementation with guardrails and human handoff.',
    category: 'ai-ops',
    tags: [
      'AI Implementation',
      'Digital Twin',
      'Guardrails',
      'Human Handoff',
      'Triage Logic',
      'Prompt Governance',
      'Portfolio Navigation',
      'Technical Implementation',
      'QA Scenarios',
    ],
    roleLanes: [
      'AI Workflow / Portfolio Governance',
      'Forward Deployed Engineer',
      'Implementation Consultant',
    ],
    heroArtifact: {
      type: 'html',
      label: 'Digital Twin: Architecture Flow',
      description: 'High-level flow of guarded responses, command parsing, and handoff routing.',
      content: `<div style="font-family:Inter,system-ui,sans-serif;background:#faf8f5;border:1px solid #e5e7eb;border-radius:14px;padding:16px;max-width:640px;color:#0f172a;">
  <h4 style="margin:0 0 12px;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#475569;">Digital Twin AI Agent · Architecture</h4>
  <div style="display:grid;gap:8px;">
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">User question</div>
    <div style="text-align:center;color:#fb923c;">↓</div>
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">ChatWidget UI</div>
    <div style="text-align:center;color:#0ea5e9;">↓</div>
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">Gemini proxy</div>
    <div style="text-align:center;color:#0ea5e9;">↓</div>
    <div style="padding:10px;border:1px solid #99f6e4;border-radius:10px;background:#f0fdfa;">Guardrail checks (scope, relevance, limits)</div>
    <div style="text-align:center;color:#14b8a6;">↓</div>
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">Portfolio-scoped response</div>
    <div style="text-align:center;color:#0ea5e9;">↓</div>
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">Command parser</div>
    <div style="text-align:center;color:#fb923c;">↓</div>
    <div style="padding:10px;border:1px solid #fed7aa;border-radius:10px;background:#fff7ed;">Navigation / resume / contact / handoff</div>
  </div>
</div>`,
    },
    rigor: {
      statement:
        'The value of a portfolio AI assistant is not just answering questions; it is routing users to proof while controlling scope, cost, and failure states.',
      baseline:
        'Generic chat widgets can drift off-topic, produce long expensive responses, or trap users in unresolved answer loops.',
      definition:
        'Reliable AI support = scoped answers, safe routing, failure-aware fallback, and human handoff when automation is insufficient.',
      method:
        'Implemented relevance gates, response-budget rules, approved navigation/action commands, rate limits, prompt-injection deflection, session history trimming, and human handoff UX.',
      window: 'Portfolio visitor interaction during recruiter review.',
    },
    constraints: [
      {
        problem: 'A general chatbot could become expensive, irrelevant, or unsafe.',
        tradeoff:
          'The assistant is intentionally scoped to portfolio/recruiter use cases and deflects unrelated prompts.',
      },
      {
        problem: 'AI answers may be incomplete or unsatisfying.',
        tradeoff:
          'The system provides human handoff rather than trapping the visitor in repeated AI replies.',
      },
      {
        problem: 'Generated navigation commands could create unsafe or broken behavior.',
        tradeoff:
          'Only approved route/action commands are supported, and unknown commands are ignored.',
      },
      {
        problem: 'Session state drift and hallucination risk in long conversations.',
        tradeoff:
          'Strict token caps and session history trimming to enforce safe context boundaries.',
      },
    ],
  },
  {
    id: 'project-aegis',
    title: 'Automation & Operational Protocols',
    rationale:
      'A decoupled AI-automation system — Aegis governance plus emOS execution over a Notion state machine — that evolved from human-in-the-loop review toward autonomous operation.',
    category: 'ai-ops',
    tags: [
      'AI Workflow',
      'Prompt Governance',
      'Multi-Agent Systems',
      'Notion API',
      'Docker',
      'Cloud Run',
      'TypeScript',
      'Automation',
    ],
    roleLanes: ['AI Workflow / Portfolio Governance', 'Forward Deployed Engineer'],
    heroArtifact: {
      type: 'html',
      label: 'Aegis / emOS — Sanitized State Machine',
      description:
        'Conceptual reconstruction of the decoupled loop (Notion task → emOS execution → Guardian check → Notion result). Toggle the Guardian seat to compare human-in-the-loop with autonomous operation. No real workspace IDs, keys, or credentials.',
      content: AEGIS_STATE_MACHINE_HTML,
    },
    rigor: {
      statement:
        'AI automation scales reliably only when execution is bound to an explicit governance layer — not left to unvalidated generation.',
      baseline:
        'Volatile "vibe-coding" cycles that depended on manual validation and were vulnerable to context drift and recursive re-prompting.',
      definition:
        'Every automated change passes a structural-integrity check against an explicit ruleset before it resolves — no silent, unvalidated mutations.',
      method:
        'Decoupled the judge from the executor: a private Notion database as a headless state machine links containerized emOS runners to Aegis validation — run first with a human Guardian, then with an automated one.',
      window: 'Q4 2025 – 2026 (HITL iteration tested; autonomous iteration developed).',
    },
    constraints: [
      {
        problem:
          'Notion has no outbound webhooks for database changes and enforces a strict ~3 requests/second rate cap.',
        tradeoff:
          'A TypeScript daemon polls on a ~15-second loop and batches state queries into grouped update payloads, accepting a short propagation delay to keep Notion as the single source of truth.',
      },
      {
        problem: 'A single agent cannot reliably grade its own output.',
        tradeoff:
          'The Executor (emOS) and Guardian (Aegis) are fully decoupled with no shared context, so validation stays independent of generation.',
      },
      {
        problem: 'Running every change through the full Aegis check adds a delay per run.',
        tradeoff:
          'Accepted deliberately — a brief validation delay avoids the far larger cost of tracing hallucinated runtime bugs later.',
      },
    ],
  },
  {
    id: 'portfolio-pipeline',
    title: 'Portfolio 2.0 — Governed AI Build Pipeline',
    rationale:
      'Proves AI-assisted development can reach production-grade reliability when wrapped in human design authority, automated assertion gates, and a transparent attribution ledger.',
    category: 'ai-ops',
    tags: [
      'CI/CD',
      'Multi-LLM Workflow',
      'AI Governance',
      'Vitest',
      'TypeScript',
      'Docker',
      'Cloud Run',
      'Documentation',
    ],
    roleLanes: ['AI Workflow / Portfolio Governance', 'Forward Deployed Engineer'],
    heroArtifact: {
      type: 'html',
      label: 'Governed Build Pipeline — Flow & Toolchain',
      description:
        'Sanitized overview of this repo’s build governance: Author → subphase protocol → CI gates → crawler/drift guards → Cloud Run, with the multi-LLM toolchain side rail. No secrets or credentials.',
      content: PORTFOLIO_PIPELINE_HTML,
    },
    rigor: {
      statement:
        'AI-assisted development is only trustworthy when it is strictly governed — bounded scope, automated CI gates, and an immutable, auditable trail.',
      baseline:
        'Ungoverned "vibe coding" produces fast, localized output that is brittle, hard to review, prone to regression, and impossible to attribute.',
      definition:
        'Every change clears typecheck, lint, format, tests, build, secret-scan, and semantic drift guards before merge; each subphase is independently validated and forensically attributed.',
      method:
        'A one-subphase sequential execution protocol plus a multi-LLM toolchain operating under human design authority, behind an immutable CI gate and an AI attribution ledger.',
      window: '2025–2026, across build Phases 1–7.',
    },
    constraints: [
      {
        problem:
          'An AI agent can generate massive, unreviewable changes that overwhelm human oversight.',
        tradeoff:
          'The one-subphase protocol intentionally bottlenecks velocity, capping the blast radius so every diff stays digestible and reviewable.',
      },
      {
        problem: 'Letting an agent orchestrate the build risks leaking secrets into the bundle.',
        tradeoff:
          'API keys are stripped from the client and served only via a server-side proxy, enforced by a CI key-audit and a gitleaks scan that block any leak.',
      },
      {
        problem: 'Third-party CI actions are a supply-chain risk via mutable version tags.',
        tradeoff:
          'All actions are pinned to immutable commit SHAs, so an upstream tag repoint cannot compromise the validation environment.',
      },
    ],
  },
  {
    id: 'northern-grind',
    title: 'Northern Grind',
    rationale:
      'Reframed a café rebrand as a full system redesign — connecting brand identity, high-speed menu UX, and break-even-modeled POS/loyalty recommendations into one operational loop.',
    category: 'success-strategy',
    tags: [
      'Customer Experience',
      'Operations Design',
      'Service Design',
      'Small Business Systems',
      'Brand Strategy',
    ],
    roleLanes: ['Forward Deployed Engineer'],
  },
  {
    id: 'moh',
    title: 'Public Health GIS Workflow Support',
    rationale:
      'Supported a national Ministry of Health contact-tracing initiative through GIS workflow planning, dashboard mockups, UI/UX review, documentation, and implementation guidance — translating a complex spatial system into something non-technical stakeholders could understand and adopt.',
    category: 'qa-data',
    tags: [
      'GIS',
      'Public Health',
      'ArcGIS Enterprise',
      'Survey123',
      'ArcGIS Online',
      'Dashboard Planning',
      'UI/UX Audit',
      'Technical Documentation',
    ],
    roleLanes: [
      'Spatial Systems Architect',
      'Implementation Consultant',
      'Forward Deployed Engineer',
    ],
    heroArtifact: {
      type: 'html',
      label: 'Public Health GIS — System Explorer',
      description:
        'Sanitized, interactive reconstruction of the contact-tracing architecture and workflow. No confidential materials, real screenshots, or patient data are shown.',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Public Health GIS Workflow Support — System Explorer</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; font-family: Inter, system-ui, -apple-system, sans-serif; background:#faf8f5; color:#0f172a; }
  .wrap { max-width: 880px; margin:0 auto; padding: 22px; }
  .head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
  .sub { font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:.16em; margin-bottom:4px; }
  .title { font-size:16px; font-weight:700; letter-spacing:.01em; }
  .badge { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#0369a1; background:#e0f2fe; border:1px solid #bae6fd; border-radius:8px; padding:5px 9px; }
  .tabs { display:flex; gap:8px; margin-bottom:16px; }
  .tab { font-size:12px; font-weight:600; padding:8px 15px; border-radius:9px; border:1px solid #cbd5e1; background:#fff; color:#334155; cursor:pointer; }
  .tab.active { background:#0f172a; color:#fff; border-color:#0f172a; }
  .panel { display:none; }
  .panel.active { display:block; }
  .cols { display:grid; grid-template-columns: 1fr; gap:16px; }
  @media (min-width:600px){ .cols { grid-template-columns: 1.15fr .85fr; } }
  .grid { display:grid; gap:9px; }
  .node { text-align:left; width:100%; padding:12px 14px; border:1px solid #cbd5e1; border-radius:11px; background:#fff; cursor:pointer; font-size:13px; font-weight:600; color:#0f172a; transition:all .15s; display:flex; align-items:center; gap:10px; }
  .node:hover { border-color:#0ea5e9; }
  .node.active { border-color:#0ea5e9; background:#f0f9ff; box-shadow:0 0 0 1px #0ea5e9; }
  .dot { width:9px; height:9px; border-radius:50%; background:#0ea5e9; flex:none; }
  .arrow { text-align:center; color:#94a3b8; font-size:13px; line-height:1; }
  .rail { padding:13px 15px; border:1px dashed #cbd5e1; border-radius:11px; background:#fff; font-size:12px; color:#475569; line-height:1.55; }
  .rail b { color:#0f172a; display:block; margin-bottom:6px; font-size:10px; text-transform:uppercase; letter-spacing:.12em; }
  .detail { margin-top:14px; padding:14px 16px; border:1px solid #e2e8f0; border-left:3px solid #0ea5e9; border-radius:10px; background:#f8fafc; font-size:13px; line-height:1.6; color:#334155; min-height:60px; }
  .detail b { color:#0f172a; }
  .what { font-size:13px; line-height:1.6; color:#334155; }
  .why { margin-top:12px; padding-top:11px; border-top:1px dashed #cbd5e1; }
  .why-h { font-size:10px; text-transform:uppercase; letter-spacing:.12em; color:#0369a1; font-weight:700; margin-bottom:9px; }
  .why-row { display:flex; gap:9px; align-items:flex-start; font-size:12.5px; line-height:1.55; color:#475569; margin-bottom:8px; }
  .why-row:last-child { margin-bottom:0; }
  .tag { flex:none; font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; padding:3px 0; border-radius:6px; margin-top:1px; width:74px; text-align:center; }
  .tag-biz { background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; }
  .tag-user { background:#ecfdf5; color:#047857; border:1px solid #a7f3d0; }
  .foot { margin-top:16px; font-size:11px; color:#94a3b8; font-style:italic; line-height:1.5; }
</style>
</head>
<body>
<div class="wrap">
  <div class="head">
    <div>
      <div class="sub">Sanitized System Explorer</div>
      <div class="title">Public Health GIS Workflow Support</div>
    </div>
    <span class="badge">Conceptual · No real data</span>
  </div>
  <div class="tabs">
    <button class="tab active" data-tab="arch" onclick="showTab('arch')">Architecture</button>
    <button class="tab" data-tab="flow" onclick="showTab('flow')">Workflow</button>
  </div>

  <div class="panel active" id="arch">
    <div class="cols">
      <div class="grid">
        <button class="node" onclick="pick('arch', this, 'a-intake')"><span class="dot"></span>Intake forms (Survey123)</button>
        <div class="arrow">&#9660;</div>
        <button class="node" onclick="pick('arch', this, 'a-gis')"><span class="dot"></span>ArcGIS Enterprise / ArcGIS Online</button>
        <div class="arrow">&#9660;</div>
        <button class="node" onclick="pick('arch', this, 'a-data')"><span class="dot"></span>Feature layers / database</button>
        <div class="arrow">&#9660;</div>
        <button class="node" onclick="pick('arch', this, 'a-dash')"><span class="dot"></span>Dashboards &amp; maps</button>
        <div class="arrow">&#9660;</div>
        <button class="node" onclick="pick('arch', this, 'a-portal')"><span class="dot"></span>Stakeholder portal / reporting</button>
      </div>
      <div class="rail">
        <b>Cross-cutting support</b>
        Documentation, plain-language explanations, UI/UX audit notes, and AI-assisted troubleshooting (Codex, Claude Code) ran alongside every layer to keep non-technical users oriented.
      </div>
    </div>
    <div class="detail" id="arch-detail">Select a layer to see what it did and why it mattered.</div>
  </div>

  <div class="panel" id="flow">
    <div class="grid">
      <button class="node" onclick="pick('flow', this, 'f-submit')"><span class="dot"></span>1 · Health staff submits contact-tracing information</button>
      <div class="arrow">&#9660;</div>
      <button class="node" onclick="pick('flow', this, 'f-store')"><span class="dot"></span>2 · Data enters the structured GIS / database layer</button>
      <div class="arrow">&#9660;</div>
      <button class="node" onclick="pick('flow', this, 'f-review')"><span class="dot"></span>3 · Record is reviewed or validated</button>
      <div class="arrow">&#9660;</div>
      <button class="node" onclick="pick('flow', this, 'f-update')"><span class="dot"></span>4 · Dashboard / map views update</button>
      <div class="arrow">&#9660;</div>
      <button class="node" onclick="pick('flow', this, 'f-act')"><span class="dot"></span>5 · Stakeholders identify follow-up needs</button>
      <div class="arrow">&#9660;</div>
      <button class="node" onclick="pick('flow', this, 'f-doc')"><span class="dot"></span>6 · Documentation keeps usage consistent</button>
    </div>
    <div class="detail" id="flow-detail">Select a step to trace how contact-tracing information moved through the workflow.</div>
  </div>

  <div class="foot">Sanitized reconstruction for portfolio use. No confidential health-system materials, real screenshots, patient data, or operational records are shown.</div>
</div>
<script>
  function block(what, biz, user){
    return '<div class="what">' + what + '</div>'
      + '<div class="why"><div class="why-h">Why this matters</div>'
      + '<div class="why-row"><span class="tag tag-biz">Business</span><span>' + biz + '</span></div>'
      + '<div class="why-row"><span class="tag tag-user">For people</span><span>' + user + '</span></div>'
      + '</div>';
  }
  var details = {
    'a-intake': block(
      '<b>Intake forms (Survey123).</b> Standardized field capture so contact-tracing information enters the system the same way every time, instead of free-form notes that are hard to map or validate.',
      'Clean, consistent input at the source means less cleanup later and fewer errors flowing downstream.',
      'Health staff get a simple, guided form instead of guessing what to record — faster to fill and harder to get wrong.'),
    'a-gis': block(
      '<b>ArcGIS Enterprise / ArcGIS Online.</b> The secure GIS backbone hosting the layers and services — the single system of record for spatial data.',
      'One trusted source of truth keeps the whole program consistent and auditable, instead of scattered spreadsheets.',
      'Everyone is looking at the same up-to-date map, so teams are not working from conflicting copies.'),
    'a-data': block(
      '<b>Feature layers / database.</b> Where each record is stored, related, and made queryable, so a single submission can feed maps, dashboards, and reports at once.',
      'Structured data is reusable — capture once, use it across every report without re-entering it.',
      'Staff do not re-type the same information into multiple tools; the system connects it for them.'),
    'a-dash': block(
      '<b>Dashboards &amp; maps.</b> Turn records into operational visibility supervisors can read at a glance — built as role-specific views so they inform rather than overwhelm.',
      'Leaders can see status and direct resources quickly, instead of waiting on manual reports.',
      'Non-technical users get a clear picture of what is happening without needing GIS skills.'),
    'a-portal': block(
      '<b>Stakeholder portal / reporting.</b> Role-appropriate views and reporting so stakeholders can see status and act without touching raw GIS tooling.',
      'Decision-makers stay informed and accountable with less hand-holding from technical staff.',
      'Each audience sees only what is relevant to them — no clutter and little training overhead.'),
    'f-submit': block(
      '<b>Step 1 — Submit.</b> Health staff capture contact-tracing information through a standardized intake form, in the field or at a desk.',
      'Reliable, structured intake is the foundation — everything downstream is only as good as what is captured here.',
      'A guided form makes reporting quick and low-stress for busy frontline staff.'),
    'f-store': block(
      '<b>Step 2 — Store.</b> The submission becomes a governed record in the GIS / database layer, linked to the right people, places, and follow-up state.',
      'Centralized, connected records let the program answer questions across the whole dataset, not one form at a time.',
      'Staff can trust that what they submitted is safely captured and will not be lost or duplicated.'),
    'f-review': block(
      '<b>Step 3 — Review.</b> The record is checked for completeness and accuracy before it drives maps, dashboards, and reporting downstream.',
      'Catching gaps here keeps every downstream decision trustworthy, instead of propagating bad data across the system.',
      'Supervisors and field staff can act on confirmed information rather than second-guessing it.'),
    'f-update': block(
      '<b>Step 4 — Update.</b> Dashboards and maps refresh to reflect the new or changed record, keeping the operational picture current.',
      'A current picture means the response adapts to what is actually happening on the ground.',
      'Users always see the latest status without asking someone to pull a fresh report.'),
    'f-act': block(
      '<b>Step 5 — Act.</b> Supervisors and stakeholders read the views and identify who needs follow-up, and where to focus next.',
      'Data turns into action — better, faster decisions are the entire point of the system.',
      'The public and patients benefit when follow-up reaches the right people sooner.'),
    'f-doc': block(
      '<b>Step 6 — Document.</b> Plain-language documentation keeps usage consistent across technical and non-technical staff as people and tools change.',
      'Good documentation protects the investment — the system keeps working through staff turnover and handoffs.',
      'New users get up to speed quickly instead of relying on tribal knowledge.')
  };
  function setDetail(panel, key){ document.getElementById(panel + '-detail').innerHTML = details[key]; }
  function showTab(t){
    var tabs = document.querySelectorAll('.tab');
    for (var i=0;i<tabs.length;i++){ tabs[i].classList.toggle('active', tabs[i].getAttribute('data-tab') === t); }
    var panels = document.querySelectorAll('.panel');
    for (var j=0;j<panels.length;j++){ panels[j].classList.toggle('active', panels[j].id === t); }
  }
  function pick(panel, el, key){
    var sib = el.parentNode.querySelectorAll('.node');
    for (var i=0;i<sib.length;i++){ sib[i].classList.remove('active'); }
    el.classList.add('active');
    setDetail(panel, key);
  }
</script>
</body>
</html>`,
    },
    artifacts: [
      {
        type: 'html',
        label: 'Contact Tracing — Supervisor View (sample)',
        description:
          'Sanitized, interactive supervisor dashboard mockup: KPI tiles, a clickable point map replicating the Survey123-linked datapoints, a status-mix donut, and a filterable follow-up queue. Synthetic data on a generic extent — no real records, locations, or metrics.',
        content: MOH_SUPERVISOR_DASHBOARD_HTML,
      },
    ],
    rigor: {
      statement:
        'Public-health GIS workflows succeed when data collection, reporting, interface design, and stakeholder documentation are treated as one connected operating system.',
      baseline:
        'A contact-tracing workflow had to track and communicate cases across GIS tools, dashboards, and database-backed processes — while staying understandable for users without deep GIS, database, or software-development experience.',
      definition:
        '"Good" meant the system was explainable, usable, implementation-aware, and safe to present publicly — without exposing confidential health-system details or overstating personal ownership.',
      method:
        'Reviewed the project as a GIS-enabled workflow rather than a single tool; produced pitch material, dashboard mockups, and UI/UX audit feedback; translated ArcGIS Enterprise, Survey123, database, and AI-assisted development concepts into plain language; evaluated a low-code option and recommended pivoting away from it.',
      window:
        'Advisory and documentation support during an active public-health GIS / contact-tracing initiative.',
    },
    constraints: [
      {
        problem:
          'Real screenshots, sensitive workflows, and health-system materials could not be used freely in a public portfolio.',
        tradeoff:
          'Use sanitized conceptual artifacts — architecture and workflow diagrams and an implementation audit matrix — instead of operational records.',
      },
      {
        problem:
          'The work involved meaningful contributions but not sole ownership of the full system architecture or production deployment.',
        tradeoff:
          'Frame the role as geospatial systems support, documentation, UI/UX review, dashboard planning, and implementation advisory — not full system ownership.',
      },
      {
        problem:
          'A low-code interface layer was explored, but operational constraints and client aversion made it a poor final fit.',
        tradeoff:
          'Pivot away from it and treat the evaluation itself as evidence of implementation judgment, not failed adoption.',
      },
      {
        problem:
          'ArcGIS Enterprise, Survey123, dashboards, and database workflows can overwhelm non-technical stakeholders.',
        tradeoff:
          'Emphasize plain-language documentation, workflow diagrams, audit reports, and role-based explanations to reduce confusion.',
      },
    ],
  },
];

// TODO: remove case-study registry alias after all internal references are migrated.
export const CASE_STUDY_REGISTRY = PROJECT_REGISTRY;
