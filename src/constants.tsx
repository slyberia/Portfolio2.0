/* eslint-disable react-refresh/only-export-components */
import { ExperienceItem, SkillGroup, Certification, ProjectEntry, SkillChipConfig } from './types';
import { CASE_STUDY_CONTENT } from './data/caseStudyData';
import { LUXE_LOFTS_MOCKUP_HTML, OPS_TRIAGE_MOCKUP_HTML } from './mockups';

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
      },
      {
        name: 'Onboarding Support',
        lane: 'Implementation',
        description:
          'Used to guide users through setup and early adoption so systems become usable quickly and support load stays controlled.',
      },
      {
        name: 'Documentation',
        lane: 'Implementation',
        description:
          'Used to produce handoff-ready guides that reduce repeat questions and preserve decision context for future contributors.',
      },
      {
        name: 'Stakeholder Communication',
        lane: 'Implementation',
        description:
          'Helps translate technical status into decision-ready updates for cross-functional teams, reviewers, and non-technical partners.',
      },
      {
        name: 'Support Handoff',
        lane: 'Implementation',
        description:
          'Applied when transferring ownership between teams so unresolved issues, context, and next actions remain traceable.',
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
      },
      {
        name: 'Data QA / Validation',
        lane: 'QA',
        description:
          'Used to verify data quality before downstream use so reports, maps, and operational decisions stay reliable.',
      },
      {
        name: 'Process Improvement',
        lane: 'QA',
        description:
          'Applied when refining workflows to reduce repeat failure patterns and improve throughput without losing controls.',
      },
      {
        name: 'Operational Throughput',
        lane: 'QA',
        description:
          'Useful for balancing speed and quality in high-volume queues with clear escalation and completion standards.',
      },
      {
        name: 'Launch Readiness',
        lane: 'QA',
        description:
          'Used to assess whether systems meet baseline reliability, documentation, and support criteria before release.',
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
      },
      {
        name: 'ESRI ArcMap',
        lane: 'GIS',
        description:
          'Applied in production data maintenance workflows to execute map edits and utility-related updates with repeatable QA checks.',
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
      },
      {
        name: 'Metadata',
        lane: 'GIS',
        description:
          'Used to document dataset context, source quality, and handling constraints so teams can trust and reuse spatial assets.',
      },
      {
        name: 'Dataset Cataloging',
        lane: 'GIS',
        description:
          'Applied to organize data inventories and access paths so reviewers can locate relevant spatial assets quickly.',
      },
      {
        name: 'Map-Based UX',
        lane: 'GIS',
        description:
          'Used to present complex spatial information through clear interaction patterns that non-specialists can interpret.',
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
        proof: 'Applied in Project Aegis governance framework',
        proofHref: '/projects/project-aegis',
      },
      {
        name: 'AI-Assisted Development',
        lane: 'AI Systems',
        description:
          'Supports faster build iteration by combining AI drafting with human validation, scope checks, and targeted patching.',
      },
      {
        name: 'LLM Workflow Design',
        lane: 'AI Systems',
        description:
          'Applied when designing multi-step AI workflows that require guardrails, fallback plans, and clear handoff points.',
      },
      {
        name: 'Documentation Systems',
        lane: 'AI Systems',
        description:
          'Used to maintain structured records of implementation decisions, risks, and validation outcomes across phases.',
      },
      {
        name: 'Evidence Architecture',
        lane: 'AI Systems',
        description:
          'Helps organize claims, artifacts, and proof links so portfolio systems can be reviewed quickly and credibly.',
      },
      {
        name: 'Human Review Loops',
        lane: 'AI Systems',
        description:
          'Used to keep humans in critical checkpoints where judgment, risk acceptance, or external-facing quality must be confirmed.',
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
      },
      {
        name: 'Salesforce & CRM',
        lane: 'Tools',
        description:
          'Supports CRM-oriented workflow planning where lead context, ownership, and follow-up paths need to stay visible.',
      },
      {
        name: 'Notion',
        lane: 'Tools',
        description:
          'Used to centralize project notes, planning artifacts, and implementation references for cross-functional visibility.',
      },
      {
        name: 'Jira',
        lane: 'Tools',
        description:
          'Applied to track issues, implementation tasks, QA follow-up, and delivery progress across teams.',
      },
      {
        name: 'Asana',
        lane: 'Tools',
        description:
          'Used for task coordination and timeline management when delivery work spans multiple owners and dependencies.',
      },
      {
        name: 'Tableau',
        lane: 'Tools',
        description:
          'Useful for translating operational data into visual summaries that support trend review and stakeholder reporting.',
      },
      {
        name: 'Power BI',
        lane: 'Tools',
        description:
          'Used to structure dashboards that highlight performance patterns, exceptions, and workflow outcomes over time.',
      },
      {
        name: 'BigQuery',
        lane: 'Tools',
        description:
          'Supports large-scale data querying and analysis workflows when operational datasets need structured exploration.',
      },
      {
        name: 'HTML / CSS',
        lane: 'Implementation',
        description:
          'Used to build and refine responsive interface structure, accessibility behavior, and visual hierarchy.',
      },
      {
        name: 'React',
        lane: 'Implementation',
        description:
          'Used to build modular portfolio interfaces where reusable components can be validated, refined, and extended.',
      },
      {
        name: 'TypeScript',
        lane: 'Implementation',
        description:
          'Used to enforce safer contracts across components and data models so implementation changes remain predictable.',
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
    content: CASE_STUDY_CONTENT['luxe-lofts'],
    heroArtifact: {
      type: 'html',
      label: 'Luxe Lofts: Operational Hub',
      description: 'Functional Rate Engine, AI Planning ingress, and CRM path orchestration.',
      content: LUXE_LOFTS_MOCKUP_HTML,
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
    roleLanes: ['Solutions Architect', 'Spatial Systems Architect'],
    content: CASE_STUDY_CONTENT['ops-triage'],
    heroArtifact: {
      type: 'html',
      label: 'Operational Triage Dashboard',
      description: 'Synthetic dashboard demonstrating throughput tracking and error visibility.',
      content: OPS_TRIAGE_MOCKUP_HTML,
    },
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
    roleLanes: ['Spatial Systems Architect', 'Forward Deployed Engineer', 'Solutions Architect'],
    content: CASE_STUDY_CONTENT.guynode,
    heroArtifact: {
      type: 'html',
      label: 'Guynode Data Access Flow',
      description:
        'High-level architecture flow for public spatial data access and dataset governance.',
      content: `<div style="font-family:Inter,system-ui,sans-serif;background:#faf8f5;border:1px solid #e5e7eb;border-radius:14px;padding:16px;max-width:640px;color:#0f172a;">
  <h4 style="margin:0 0 12px;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#475569;">Guynode Data Access Flow</h4>
  <div style="display:grid;gap:8px;">
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">Legacy files</div>
    <div style="text-align:center;color:#14b8a6;">↓</div>
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">Dataset registry</div>
    <div style="text-align:center;color:#14b8a6;">↓</div>
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">Metadata and category structure</div>
    <div style="text-align:center;color:#14b8a6;">↓</div>
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">Catalog / search / filter</div>
    <div style="text-align:center;color:#14b8a6;">↓</div>
    <div style="padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;">Map preview or download path</div>
    <div style="text-align:center;color:#14b8a6;">↓</div>
    <div style="padding:10px;border:1px solid #99f6e4;border-radius:10px;background:#f0fdfa;">Public user access</div>
  </div>
</div>`,
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
      'Solutions Architect',
    ],
    content: CASE_STUDY_CONTENT['digital-twin'],
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
    ],
  },
];

// TODO: remove case-study registry alias after all internal references are migrated.
export const CASE_STUDY_REGISTRY = PROJECT_REGISTRY;
