import { GUYNODE_SYSTEM_HREF } from '../lib/routes';

export type TrackAccent = 'implementation' | 'qa' | 'gis';

export type SupportingEvidenceCard = {
  title: string;
  relevance: string;
  proofType: string;
  href?: string;
  roleChips?: string[];
};

export type CtaAction = {
  label: string;
  href?: string;
  type?: 'link' | 'contact';
  twinSource?: 'implementation' | 'qa' | 'gis' | 'general';
  twinStarterPrompt?: string;
};

// Specific, per-lens answer to "why/how Kyle adds value in THIS context".
// Business = the organizational outcome; people = the value to the humans who use the system.
// No invented metrics, no CSM seniority claims.
export type ValueBridge = {
  business: string;
  people: string;
};

// Embedded interactive evidence rendered inline on the track page by reusing
// existing components (OperationalTriageSimulator, HtmlPreviewCard). `project-preview`
// pulls its content/iframe from PROJECT_REGISTRY by id so we never duplicate artifact HTML.
export type EmbeddedArtifact =
  | { kind: 'ops-triage-simulator'; label: string; caption: string }
  | {
      kind: 'project-preview';
      projectId: 'guynode' | 'luxe-lofts' | 'digital-twin' | 'moh';
      label: string;
      caption: string;
      accentColor?: 'red' | 'indigo';
    };

export type TrackPageContent = {
  route: string;
  accent: TrackAccent;
  title: string;
  eyebrow: string;
  headline: string;
  summary: string;
  valueBridge: ValueBridge;
  proves: string[];
  flagshipLabel: string;
  flagshipTitle: string;
  flagshipSummary: string;
  flagshipBullets: string[];
  flagshipHref: string;
  flagshipCtaLabel: string;
  embeddedArtifacts: EmbeddedArtifact[];
  supportingEvidence: SupportingEvidenceCard[];
  skillsTools: string[];
  ctaTitle: string;
  ctaCopy: string;
  ctaActions: CtaAction[];
};

export type TrackSelectorCard = {
  title: string;
  subcopy: string;
  href: string;
};

export const implementationTrackContent: TrackPageContent = {
  route: '/tracks/forward-deployed',
  accent: 'implementation',
  title: 'Forward Deployed Engineer',
  eyebrow: 'Role Track',
  headline:
    'Bridging the gap between ambiguous requirements and production-ready workflows through disciplined technical implementation.',
  summary:
    'This track shows work that turns high-level intent into supportable workflows, plain-language documentation, and user-centric delivery — so a system keeps working after the engineer steps back.',
  valueBridge: {
    business:
      'Teams adopt what they can run without the vendor in the room. Kyle turns ambiguous requirements into documented, supportable workflows so a rollout becomes something the customer’s own staff can operate, extend, and trust after handoff — not a dependency.',
    people:
      'The people who actually use the system get a guided setup, plain-language docs, and a clear path to help, instead of a black box only one specialist understands.',
  },
  proves: [
    'Workflow Setup',
    'Technical Discovery',
    'Documentation',
    'Implementation Planning',
    'Support Handoff',
    'Customer-Facing Problem Solving',
  ],
  flagshipLabel: 'FLAGSHIP_SYSTEM',
  flagshipTitle: 'How Luxe Lofts Supports This Track',
  flagshipSummary:
    'Luxe Lofts is the forward-deployed proof: it takes a fragmented, multi-domain client presence and reframes it as one operational hub — a rate engine, AI planning ingress, and CRM path — packaged as something the client’s team could adopt.',
  flagshipBullets: [
    'Discovery across fragmented client domains, translated into a single delivery model',
    'Modular build (rate engine, planning ingress, CRM path) scoped for a staged rollout',
    'Stakeholder-facing prototype that makes the proposed system tangible before commitment',
    'Implementation planning framed for handoff, not just demo',
  ],
  flagshipHref: '/projects/luxe-lofts',
  flagshipCtaLabel: 'View Luxe Lofts Prototype',
  embeddedArtifacts: [
    {
      kind: 'project-preview',
      projectId: 'luxe-lofts',
      label: 'Luxe Lofts — Operational Hub (Live Prototype)',
      caption:
        'The forward-deployed prototype: rate engine, AI planning ingress, and CRM path orchestration in one hub. Launch it to interact with the proposed system the way a client would.',
      accentColor: 'red',
    },
    {
      kind: 'ops-triage-simulator',
      label: 'Operational Triage Simulator',
      caption:
        'Cross-reference: move the policy between throughput and validation to see how a workflow’s tradeoffs reshape first-pass yield and backlog — the kind of process tuning an FDE owns at rollout and handoff.',
    },
  ],
  supportingEvidence: [
    {
      title: 'Luxe Lofts Ecosystem',
      relevance:
        'Flagship implementation proof: proposal-phase discovery, modular delivery planning, and a stakeholder-ready prototype built for handoff.',
      proofType: 'Flagship System',
      href: '/projects/luxe-lofts',
      roleChips: ['Forward Deployed Engineer'],
    },
    {
      title: 'Systems at Scale: Triage & QA',
      relevance:
        'Operational triage workflow proof with support-ready process controls and escalation logic.',
      proofType: 'Workflow',
      href: '/projects/ops-triage',
      roleChips: ['Forward Deployed Engineer', 'Implementation Consultant'],
    },
    {
      title: 'Guynode Spatial Data Hub',
      relevance:
        'Cross-reference implementation proof: legacy-to-platform migration planning, system structure, and launch readiness.',
      proofType: 'Cross-Reference',
      href: GUYNODE_SYSTEM_HREF,
      roleChips: ['Forward Deployed Engineer', 'Spatial Systems Architect'],
    },
    {
      title: 'Portfolio2.0 Role-Lane Conversion System',
      relevance:
        'Information architecture proof showing role-lane alignment and recruiter-facing delivery clarity.',
      proofType: 'Documentation',
      href: '/deep-dives#proof-hierarchy',
      roleChips: ['Forward Deployed Engineer'],
    },
  ],
  skillsTools: [
    'Workflow design',
    'Documentation',
    'Technical support',
    'Implementation planning',
    'Frontend systems',
    'AI-assisted build workflows',
    'Stakeholder translation',
  ],
  ctaTitle: 'Next Step',
  ctaCopy: 'Review implementation-focused proof artifacts or move directly to resume and contact.',
  ctaActions: [
    { label: 'View Resume', href: '/resume' },
    { label: 'View Luxe Lofts Prototype', href: '/projects/luxe-lofts' },
    {
      label: 'Ask the Digital Twin About Implementation Fit',
      type: 'link',
      twinSource: 'implementation',
      twinStarterPrompt: 'Help this visitor evaluate Kyle for a Forward Deployed Engineer role.',
    },
    { label: 'Contact Me', type: 'contact' },
  ],
};

export const opsAnalyticsTrackContent: TrackPageContent = {
  route: '/tracks/solutions-architect',
  accent: 'qa',
  title: 'Implementation Consultant',
  eyebrow: 'Role Track',
  headline:
    'Making sure what ships actually works for the customer — through structured validation, launch-readiness review, and clear go/no-go reporting.',
  summary:
    'This lens shows how Kyle de-risks adoption: structured test planning, reproducible triage, and root-cause analysis that turn a build into a rollout a customer’s team can trust and run — quality demonstrated, not asserted.',
  valueBridge: {
    business:
      'An implementation isn’t done when it’s built — it’s done when the customer can trust and run it. Kyle designs the validation, triage, and launch-readiness checks that turn “it seems to work” into a defensible go/no-go a stakeholder can sign off on, moving problems earlier where they are cheaper to fix.',
    people:
      'Operators and reviewers get a decision-ready picture — what passed, what is risky, and why — instead of raw output they have to interpret under deadline pressure.',
  },
  proves: [
    'Test Planning',
    'Issue Triage',
    'Root-Cause Analysis',
    'Validation Logic',
    'Launch-Readiness Review',
    'Decision-Ready Reporting',
  ],
  flagshipLabel: 'FLAGSHIP_SYSTEM',
  flagshipTitle: 'How Ops Triage Supports This Track',
  flagshipSummary:
    'Systems at Scale: Triage & QA is the reliability proof — a dual-mode triage model (throughput vs. zero-trust validation) that makes the quality-versus-velocity tradeoff explicit and observable in first-pass yield and backlog behavior.',
  flagshipBullets: [
    'Test and triage protocols that separate auto-processable work from records that need review',
    'Root-cause framing for why defects leak when throughput is prioritized over validation',
    'Launch-readiness lens: tuning the policy before a process goes into production',
    'Decision-ready telemetry — first-pass yield and backlog — instead of raw counts',
  ],
  flagshipHref: '/projects/ops-triage',
  flagshipCtaLabel: 'Explore the Triage Simulator',
  embeddedArtifacts: [
    {
      kind: 'ops-triage-simulator',
      label: 'Operational Triage Simulator',
      caption:
        'The flagship readiness artifact: move the policy slider between throughput and zero-trust validation and watch first-pass yield and backlog respond — the throughput-vs-validation tradeoff an Implementation Consultant has to make defensible before go-live.',
    },
    {
      kind: 'project-preview',
      projectId: 'digital-twin',
      label: 'Digital Twin — Architecture & Guardrails',
      caption:
        'A shipped AI system designed around failure states: relevance gates, response budgets, and human handoff — reliability engineering applied to an LLM workflow, with the validation logic made explicit.',
    },
  ],
  supportingEvidence: [
    {
      title: 'Systems at Scale: Triage & QA',
      relevance:
        'Flagship reliability surface: dual-mode triage, validation logic, and decision-ready telemetry for high-volume operational scenarios.',
      proofType: 'Flagship System',
      href: '/projects/ops-triage',
      roleChips: ['Implementation Consultant'],
    },
    {
      title: 'Digital Twin AI Agent',
      relevance:
        'Validation proof for a shipped system: guardrails, response-budget rules, failure-aware fallback, and human handoff.',
      proofType: 'Validation',
      href: '/projects/digital-twin',
      roleChips: ['Implementation Consultant', 'Forward Deployed Engineer'],
    },
    {
      title: 'Guynode Spatial Data Hub',
      relevance:
        'Cross-reference QA surface: metadata controls, public route validation, and launch-readiness checks.',
      proofType: 'Cross-Reference',
      href: GUYNODE_SYSTEM_HREF,
      roleChips: ['Implementation Consultant', 'Spatial Systems Architect'],
    },
    {
      title: 'Portfolio2.0 Role-Lane Conversion System',
      relevance:
        'Validation proof for route integrity, content alignment, and reviewer-ready information architecture.',
      proofType: 'Documentation QA',
      href: '/deep-dives#proof-hierarchy',
      roleChips: ['Implementation Consultant'],
    },
  ],
  skillsTools: [
    'QA protocols',
    'Test matrices',
    'Defect taxonomy',
    'Reproducibility',
    'Root-cause analysis',
    'Documentation QA',
    'Validation workflows',
  ],
  ctaTitle: 'Next Step',
  ctaCopy: 'Inspect validation proof artifacts or continue to resume and contact.',
  ctaActions: [
    { label: 'View Resume', href: '/resume' },
    { label: 'Explore the Triage Simulator', href: '/projects/ops-triage' },
    {
      label: 'Ask the Digital Twin About Implementation & Validation Proof',
      type: 'link',
      twinSource: 'qa',
      twinStarterPrompt: 'Help this visitor evaluate Kyle for an Implementation Consultant role.',
    },
    { label: 'Contact Me', type: 'contact' },
  ],
};

export const gisTrackContent: TrackPageContent = {
  route: '/tracks/spatial-systems',
  accent: 'gis',
  title: 'Spatial Systems Architect',
  eyebrow: 'Role Track',
  headline:
    'Unlocking the value of spatial data through governed catalogs, intuitive map-based interfaces, and robust metadata management.',
  summary:
    'This track shows spatial dataset organization, GIS workflow design, and the delivery of public geospatial resources people can find, trust, and use — not just store.',
  valueBridge: {
    business:
      'Spatial data only creates value when people can find it, trust it, and act on it. Kyle organizes catalogs, metadata, and map interfaces so a geospatial program becomes a governed, public-facing system instead of a folder of files only a specialist can navigate.',
    people:
      'Non-GIS stakeholders get a map-based interface and metadata they can actually read, so the data informs a decision instead of sitting unused behind a tool they don’t have.',
  },
  proves: [
    'Spatial Data Organization',
    'GIS Workflow Understanding',
    'Map Viewer Logic',
    'Dataset Governance',
    'Metadata Schema Design',
    'Public Spatial Data Access',
    'Utility and Spatial Operations Awareness',
  ],
  flagshipLabel: 'FLAGSHIP_SYSTEM',
  flagshipTitle: 'How Guynode Supports This Track',
  flagshipSummary:
    'Guynode is the flagship GIS proof for cataloging spatial datasets and delivering public geospatial access through map-based workflows.',
  flagshipBullets: [
    'Spatial data cataloging and dataset registry structure',
    'Leaflet map viewer integration and GIS-facing user experience',
    'Guyana-focused public data access with operational metadata',
    'Metadata and provenance handling for dataset governance',
  ],
  flagshipHref: GUYNODE_SYSTEM_HREF,
  flagshipCtaLabel: 'View Guynode System',
  embeddedArtifacts: [
    {
      kind: 'project-preview',
      projectId: 'guynode',
      label: 'Guynode Spatial Data Hub (Live)',
      caption:
        'The flagship spatial system: a public catalog with a map viewer, standardized metadata, and governed dataset access. Launch it to explore the redesigned portal.',
    },
    {
      kind: 'project-preview',
      projectId: 'moh',
      label: 'Public Health GIS — System Explorer',
      caption:
        'Secondary spatial evidence: a sanitized reconstruction of a national contact-tracing GIS workflow — architecture and dataflow only, with no confidential materials or patient data.',
    },
  ],
  supportingEvidence: [
    {
      title: 'Guynode Spatial Data Hub',
      relevance:
        'Flagship GIS evidence for dataset governance, map viewer logic, and public geospatial access.',
      proofType: 'Flagship System',
      href: GUYNODE_SYSTEM_HREF,
      roleChips: ['Spatial Systems Architect'],
    },
    {
      title: 'Public Health GIS Workflow Support',
      relevance:
        'Secondary spatial proof: GIS workflow planning, dashboard mockups, and stakeholder documentation for a national contact-tracing initiative.',
      proofType: 'Spatial Workflow',
      href: '/projects/moh',
      roleChips: ['Spatial Systems Architect', 'Implementation Consultant'],
    },
    {
      title: 'HPS Geospatial Dashboard & Utility Ops Experience',
      relevance:
        'Operational GIS experience evidence for stakeholder dashboards, reporting workflows, and delivery support.',
      proofType: 'Proof Artifact',
      href: '/resume',
      roleChips: ['Spatial Systems Architect'],
    },
    {
      title: 'Portfolio2.0 Role-Lane Conversion System',
      relevance:
        'Spatial portfolio delivery proof showing how GIS evidence is organized for recruiter retrieval.',
      proofType: 'Documentation',
      href: '/deep-dives#proof-hierarchy',
      roleChips: ['Spatial Systems Architect'],
    },
  ],
  skillsTools: [
    'ArcGIS',
    'Leaflet',
    'Spatial data',
    'Metadata',
    'Dataset cataloging',
    'GeoJSON and shapefile workflow concepts',
    'Spatial workflow documentation',
    'Map-based UX',
  ],
  ctaTitle: 'Next Step',
  ctaCopy: 'Review GIS system proof or move directly to resume and contact.',
  ctaActions: [
    { label: 'View Resume', href: '/resume' },
    { label: 'View Guynode System', href: GUYNODE_SYSTEM_HREF },
    {
      label: 'Ask the Digital Twin About GIS Experience',
      type: 'link',
      twinSource: 'gis',
      twinStarterPrompt: 'Help this visitor evaluate Kyle for a Spatial Systems Architect role.',
    },
    { label: 'Contact Me', type: 'contact' },
  ],
};

export const trackSelectorCards: TrackSelectorCard[] = [
  {
    title: 'Forward Deployed Engineer',
    subcopy:
      'Onboarding, technical guidance, workflow setup, launch planning, and support handoff.',
    href: '/tracks/forward-deployed',
  },
  {
    title: 'Implementation Consultant',
    subcopy:
      'Structured testing, issue triage, validation workflows, and decision-ready quality reporting.',
    href: '/tracks/solutions-architect',
  },
  {
    title: 'Spatial Systems Architect',
    subcopy:
      'Spatial data operations, map workflows, metadata governance, and public-facing geospatial delivery.',
    href: '/tracks/spatial-systems',
  },
];
