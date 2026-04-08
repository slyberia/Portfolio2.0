
import { ExperienceItem, SkillGroup, Certification, CaseStudyEntry } from './types';
import { CASE_STUDY_CONTENT } from './caseStudyData';
import { 
  PROMPTER_HUB_MOCKUP_HTML, 
  LUXE_LOFTS_MOCKUP_HTML, 
  PROJECT_AEGIS_MOCKUP_HTML, 
  OPS_TRIAGE_MOCKUP_HTML 
} from './mockups';

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "HPS Geospatial",
    role: "GIS Technician",
    period: "Oct 2021 – Present",
    tools: "ESRI ArcMap · Stakeholder Dashboards · Technical Documentation · Data Visualization",
    bullets: [
      "Built stakeholder-facing dashboards and data visualizations to support operational decision-making and reporting.",
      "Created demo environments and presentation materials to clarify data formats, feature behavior, risks, and open questions during status meetings.",
      "Produced end-user documentation and support assets to help stakeholders navigate tooling and workflows more efficiently.",
      "Coordinated project workflows and deliverables, improving consistency and operational execution."
    ]
  },
  {
    company: "Apex Systems",
    role: "Quality Control Specialist (Contractor)",
    period: "Sep 2022 – Dec 2023",
    tools: "ESRI ArcMap · Triage Workflows · QA Protocols · Process Improvement · SQL",
    bullets: [
      "Supported a contracted team for CentrePoint Energy maintaining the accuracy and consistency of Indiana's electric operations dataset.",
      "Improved data quality through structured updates and attribute corrections (via ESRI ArcMap) aligned to field operations and internal record keeping.",
      "Completed 120+ service requests/week using triage and reporting loops to maintain throughput and accuracy.",
      "Coordinated with supervisors and team leads through weekly meetings to report status, surface pain points, and plan objectives."
    ]
  },
  {
    company: "Printful",
    role: "Customer Service Representative",
    period: "Sep 2021 – Dec 2021",
    tools: "Zendesk · Internal Tooling · SOPs · Escalation Workflows · QA Checks",
    bullets: [
      "Provided technical support for international customer accounts via Zendesk, averaging 100+ conversations/week, including $100k+ revenue customers.",
      "Triaged issues across e-commerce store integration, account management, product workflows/warehousing, and shipping; coordinated with internal teams and partner SMEs to drive timely resolutions.",
      "Maintained strong customer satisfaction on rated conversations through clear communication, accurate troubleshooting, and follow-through.",
      "Conducted live-chat discovery with prospective public and private sector customers to understand goals and route them to the right product path."
    ]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Strategic Support & CS",
    items: ["Customer Success Support", "Technical Troubleshooting", "Issue Triage", "Implementation/Onboarding", "Stakeholder Communication"]
  },
  {
    category: "Operations & Enablement",
    items: ["Documentation & Enablement Assets", "Demo Environments", "Process Improvement", "Dashboards & Reporting", "Data QA / Validation", "Operational Throughput"]
  },
  {
    category: "Tools & Technologies",
    items: ["Zendesk", "Salesforce & CRM", "Tableau", "Power BI", "BigQuery", "Notion", "Asana", "Jira", "ESRI ArcMap"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "IBM AI-Enabled Applications for Customer Service", issuer: "IBM" },
  { name: "Google Project Management Professional Certificate", issuer: "Google" },
  { name: "Google Data Analytics Professional Certificate", issuer: "Google" },
  { name: "Intercultural Competency", issuer: "Queen's University International Center" }
];

export const CASE_STUDY_REGISTRY: CaseStudyEntry[] = [
  {
    id: 'prompter-hub',
    title: 'Prompter Hub V9',
    rationale: 'Middleware architecture and structured prompt engineering for AI workflows.',
    category: 'ai-ops',
    tags: ["Technical Troubleshooting", "Implementation/Onboarding", "Documentation & Enablement Assets", "Process Improvement"],
    content: CASE_STUDY_CONTENT['prompter-hub'],
    heroArtifact: {
      type: 'html',
      label: 'V9 Hub: Sandbox Environment',
      description: 'Functional Prompt Generator and Recursive Schema Builder engines.',
      content: PROMPTER_HUB_MOCKUP_HTML
    },
    rigor: {
      statement: "Infrastructure is the only way to scale reliable intelligence.",
      baseline: "Manual schema drafting was a primary source of downstream pipeline failure.",
      definition: "'Infrastructure Parity' = The ability for a sandbox to mirror production logic 1:1.",
      method: "Ported recursive inference engine directly from production source code.",
      window: "Sandbox validation covers 100% of core V9 feature set."
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
};`
      }
    ],
    constraints: [
      {
        problem: "Production Firebase dependencies are inaccessible to public visitors.",
        tradeoff: "Used LocalStorage for sandbox persistence to provide 100% functional proof without auth walls."
      }
    ]
  },
  {
    id: 'project-aegis',
    title: 'Project Aegis Protocol',
    rationale: 'LLM governance frameworks and reliability engineering in code generation.',
    category: 'ai-ops',
    tags: ["Documentation & Enablement Assets", "Process Improvement", "Technical Troubleshooting"],
    content: CASE_STUDY_CONTENT['project-aegis'],
    heroArtifact: {
      type: 'html',
      label: 'Aegis: Governance Console',
      description: 'Simulates cognitive reasoning and architectural enforcement.',
      content: PROJECT_AEGIS_MOCKUP_HTML
    },
    rigor: {
      statement: "Governance is the infrastructure that allows for creative scale.",
      baseline: "Conversations > 10 turns typically lose 22% context adherence (Entropy Drift).",
      definition: "'Drift' = LLM introducing hallucinations conflicting with project context.",
      method: "Ambiguous prompt stress-testing combined with <thinking> audits.",
      window: "Continuous 50+ turn sessions across multiple unique tech stacks."
    },
    artifacts: [
      {
        type: 'code',
        label: 'Aegis: Governance Layer XML',
        description: 'System instruction forcing model into logic-first architectural role.',
        content: `<system_core>
  <identity>Principal Architect - Priority: Context Adherence</identity>
  <mandate_thinking>CRITICAL: No output without prior <thinking> block.</mandate_thinking>
</system_core>`
      }
    ],
    constraints: [
      {
        problem: "Regenerating massive files flushes context memory (FIFO logic).",
        tradeoff: "Implemented 'Surgical Patching' protocol, reducing token usage by 90% and extending memory 3x."
      }
    ]
  },
  {
    id: 'nba-systems-qa',
    title: 'NBA 2K Systems Analysis',
    rationale: 'Systemic consistency and variable isolation in probabilistic engines.',
    category: 'qa-data',
    tags: ["Data QA / Validation", "Operational Throughput", "Issue Triage"],
    content: CASE_STUDY_CONTENT['nba-systems-qa'],
    rigor: {
      statement: "In a probabilistic engine, the only truth is the controlled baseline.",
      baseline: "Community testing typically uses low N samples, leading to high variance.",
      definition: "'Sample Power' = Controlled attempts per condition to stabilize patterns.",
      method: "Test harness (Street Kings) with architectural alignment measuring perfect release feedback.",
      window: "Evaluation of bundle effects under Hall of Fame difficulty."
    },
    constraints: [
      {
        problem: "Online latency overwhelms marginal systemic effects.",
        tradeoff: "Excluded online play to establish an 'optimal-state' baseline in the harness."
      }
    ]
  },
  {
    id: 'luxe-lofts',
    title: 'Luxe Lofts Ecosystem',
    rationale: 'Blueprint for unified digital systems and automated conversion paths.',
    category: 'success-strategy',
    tags: ["Stakeholder Communication", "Process Improvement", "Notion"],
    content: CASE_STUDY_CONTENT['luxe-lofts'],
    heroArtifact: {
      type: 'html',
      label: 'Luxe Lofts: Operational Hub',
      description: 'Functional Rate Engine, AI Planning ingress, and CRM path orchestration.',
      content: LUXE_LOFTS_MOCKUP_HTML
    },
    rigor: {
      statement: "Fragmentation is the friction that kills conversion paths.",
      baseline: "Legacy presence was fragmented across multiple domains with conflicting info.",
      definition: "'Unified System' = Single hub aligning SEO, social signals, and booking.",
      method: "Multi-domain audit scoped against all active client properties.",
      window: "Pre-deployment proposal phase prototype."
    }
  },
  {
    id: 'ops-triage',
    title: 'Systems at Scale: Triage & QA',
    rationale: 'Operationalizing the gap between training theory and production reality.',
    category: 'qa-data',
    tags: ["Data QA / Validation", "Operational Throughput", "Issue Triage", "ESRI ArcMap"],
    content: CASE_STUDY_CONTENT['ops-triage'],
    heroArtifact: {
      type: 'html',
      label: 'Operational Triage Dashboard',
      description: 'Synthetic dashboard demonstrating throughput tracking and error visibility.',
      content: OPS_TRIAGE_MOCKUP_HTML
    },
    rigor: {
      statement: "The system defines the result. Optimize for flow AND trust.",
      baseline: "Legacy workflows applied a single pace to disparate data risks.",
      definition: "'First-Pass Yield' = Percentage of records accepted without revision.",
      method: "Dual-mode: Batch-processing vs Zero-trust validation.",
      window: "Daily capacity vs Weekly defect capture."
    }
  }
];
