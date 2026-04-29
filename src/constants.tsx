import {
  ExperienceItem,
  SkillGroup,
  Certification,
  CaseStudyEntry,
  SkillChipConfig,
} from './types';
import { CASE_STUDY_CONTENT } from './data/caseStudyData';
import {
  PROMPTER_HUB_MOCKUP_HTML,
  LUXE_LOFTS_MOCKUP_HTML,
  PROJECT_AEGIS_MOCKUP_HTML,
  OPS_TRIAGE_MOCKUP_HTML,
} from './mockups';

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
      'Workflow Design',
      'Technical Troubleshooting',
      'Implementation Planning',
      'Onboarding Support',
      'Documentation',
      'Stakeholder Communication',
      'Support Handoff',
    ],
  },
  {
    category: 'Quality Assurance & Operations',
    description: 'Testing logic, triage systems, data validation, and operational reliability.',
    items: [
      'QA Protocols',
      'Issue Triage',
      'Root-Cause Analysis',
      'Data QA / Validation',
      'Process Improvement',
      'Operational Throughput',
      'Launch Readiness',
    ],
  },
  {
    category: 'GIS & Spatial Data',
    description:
      'Spatial data workflows, mapping interfaces, metadata structure, and public data access.',
    items: [
      'ArcGIS',
      'ESRI ArcMap',
      'Leaflet',
      'Spatial Data',
      'Metadata',
      'Dataset Cataloging',
      'Map-Based UX',
    ],
  },
  {
    category: 'AI-Assisted Workflow Design',
    description: 'Structured AI collaboration, prompt systems, governance, and human review.',
    items: [
      'Prompt Governance',
      'AI-Assisted Development',
      'LLM Workflow Design',
      'Documentation Systems',
      'Evidence Architecture',
      'Human Review Loops',
    ],
  },
  {
    category: 'Tools & Platforms',
    description:
      'Platforms and tools used across support, data, documentation, GIS, and frontend workflows.',
    items: [
      'Zendesk',
      'Salesforce & CRM',
      'Notion',
      'Jira',
      'Asana',
      'Tableau',
      'Power BI',
      'BigQuery',
      'HTML / CSS',
      'React',
      'TypeScript',
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
    linkMode: 'filtered',
    linkedSlugs: ['prompter-hub', 'ops-triage'],
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

export const CASE_STUDY_REGISTRY: CaseStudyEntry[] = [
  {
    id: 'prompter-hub',
    title: 'Prompter Hub V9',
    rationale: 'Middleware architecture and structured prompt engineering for AI workflows.',
    category: 'ai-ops',
    tags: [
      'Technical Troubleshooting',
      'Implementation/Onboarding',
      'Documentation & Enablement Assets',
      'Process Improvement',
    ],
    content: CASE_STUDY_CONTENT['prompter-hub'],
    heroArtifact: {
      type: 'html',
      label: 'V9 Hub: Sandbox Environment',
      description: 'Functional Prompt Generator and Recursive Schema Builder engines.',
      content: PROMPTER_HUB_MOCKUP_HTML,
    },
    rigor: {
      statement: 'Infrastructure is the only way to scale reliable intelligence.',
      baseline: 'Manual schema drafting was a primary source of downstream pipeline failure.',
      definition:
        "'Infrastructure Parity' = The ability for a sandbox to mirror production logic 1:1.",
      method: 'Ported recursive inference engine directly from production source code.',
      window: 'Sandbox validation covers 100% of core V9 feature set.',
    },
    artifacts: [
      {
        type: 'code',
        label: 'V9 Logic: Recursive Inference',
        description: 'Type-safe inference logic used to ensure Gemini schema compliance.',
        content: `const buildSchema = (obj) => {
  if (Array.isArray(obj)) {
    return { type: "ARRAY", items: obj.length > 0 ? buildSchema(obj[0]) : { type: "STRING" } };
  } else if (typeof obj === 'object' && obj !== null) {
    const properties = {};
    for (const key in obj) { properties[key] = buildSchema(obj[key]); }
    return { type: "OBJECT", properties, propertyOrdering: Object.keys(obj) };
  } else {
    return { type: typeof obj === 'boolean' ? "BOOLEAN" : typeof obj === 'number' ? "NUMBER" : "STRING" };
  }
};`,
      },
    ],
    constraints: [
      {
        problem: 'Production Firebase dependencies are inaccessible to public visitors.',
        tradeoff:
          'Used LocalStorage for sandbox persistence to provide 100% functional proof without auth walls.',
      },
    ],
  },
  {
    id: 'project-aegis',
    title: 'Project Aegis Protocol',
    rationale: 'LLM governance frameworks and reliability engineering in code generation.',
    category: 'ai-ops',
    tags: ['Documentation & Enablement Assets', 'Process Improvement', 'Technical Troubleshooting'],
    content: CASE_STUDY_CONTENT['project-aegis'],
    heroArtifact: {
      type: 'html',
      label: 'Aegis: Governance Console',
      description: 'Simulates cognitive reasoning and architectural enforcement.',
      content: PROJECT_AEGIS_MOCKUP_HTML,
    },
    rigor: {
      statement: 'Governance is the infrastructure that allows for creative scale.',
      baseline: 'Conversations > 10 turns typically lose 22% context adherence (Entropy Drift).',
      definition: "'Drift' = LLM introducing hallucinations conflicting with project context.",
      method: 'Ambiguous prompt stress-testing combined with <thinking> audits.',
      window: 'Continuous 50+ turn sessions across multiple unique tech stacks.',
    },
    artifacts: [
      {
        type: 'code',
        label: 'Aegis: Governance Layer XML',
        description: 'System instruction forcing model into logic-first architectural role.',
        content: `<system_core>
  <identity>Principal Architect - Priority: Context Adherence</identity>
  <mandate_thinking>CRITICAL: No output without prior <thinking> block.</mandate_thinking>
</system_core>`,
      },
    ],
    constraints: [
      {
        problem: 'Regenerating massive files flushes context memory (FIFO logic).',
        tradeoff:
          "Implemented 'Surgical Patching' protocol, reducing token usage by 90% and extending memory 3x.",
      },
    ],
  },
  {
    id: 'nba-systems-qa',
    title: 'NBA 2K Systems Analysis',
    rationale: 'Systemic consistency and variable isolation in probabilistic engines.',
    category: 'qa-data',
    tags: ['Data QA / Validation', 'Operational Throughput', 'Issue Triage'],
    content: CASE_STUDY_CONTENT['nba-systems-qa'],
    rigor: {
      statement: 'In a probabilistic engine, the only truth is the controlled baseline.',
      baseline: 'Community testing typically uses low N samples, leading to high variance.',
      definition: "'Sample Power' = Controlled attempts per condition to stabilize patterns.",
      method:
        'Test harness (Street Kings) with architectural alignment measuring perfect release feedback.',
      window: 'Evaluation of bundle effects under Hall of Fame difficulty.',
    },
    constraints: [
      {
        problem: 'Online latency overwhelms marginal systemic effects.',
        tradeoff: "Excluded online play to establish an 'optimal-state' baseline in the harness.",
      },
    ],
  },
  {
    id: 'luxe-lofts',
    title: 'Luxe Lofts Ecosystem',
    rationale: 'Blueprint for unified digital systems and automated conversion paths.',
    category: 'success-strategy',
    tags: ['Stakeholder Communication', 'Process Improvement', 'Notion'],
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
];
