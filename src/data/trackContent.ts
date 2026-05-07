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

export type TrackPageContent = {
  route: string;
  accent: TrackAccent;
  title: string;
  eyebrow: string;
  headline: string;
  summary: string;
  proves: string[];
  guynodeLabel: string;
  guynodeTitle: string;
  guynodeSummary: string;
  guynodeBullets: string[];
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
  route: '/tracks/implementation',
  accent: 'implementation',
  title: 'Implementation / CSE-lite',
  eyebrow: 'Role Track',
  headline:
    'Technical implementation proof for customer-facing systems, workflow setup, and operational handoff.',
  summary:
    'This track highlights work that translates ambiguous needs into supportable workflows, documentation, implementation steps, and user-facing delivery systems.',
  proves: [
    'Workflow setup',
    'Technical discovery',
    'Documentation',
    'Implementation planning',
    'Support handoff',
    'Customer-facing problem solving',
  ],
  guynodeLabel: 'FLAGSHIP_SYSTEM',
  guynodeTitle: 'How Guynode Supports This Track',
  guynodeSummary:
    'Guynode demonstrates implementation work from planning through launch readiness by turning fragmented legacy file access into a structured, public-facing system.',
  guynodeBullets: [
    'Content migration planning from legacy site structure to a cleaner delivery model',
    'Dataset registry setup with standardized metadata and route structure',
    'Public-facing system organization for faster reviewer and user retrieval',
    'Documentation and launch-readiness checks to support operational handoff',
  ],
  supportingEvidence: [
    {
      title: 'Guynode Spatial Data Hub',
      relevance:
        'Flagship implementation proof showing migration planning, platform structure, and launch readiness.',
      proofType: 'Flagship System',
      href: GUYNODE_SYSTEM_HREF,
      roleChips: ['Implementation / CSE-lite', 'GIS / Spatial Systems'],
    },
    {
      title: 'Systems at Scale: Triage & QA',
      relevance:
        'Operational triage workflow proof with support-ready process controls and escalation logic.',
      proofType: 'Workflow',
      href: '/projects/ops-triage',
      roleChips: ['Implementation / CSE-lite', 'Ops Analytics / QA'],
    },
    {
      title: 'Luxe Lofts Ecosystem',
      relevance:
        'Proposal-phase implementation planning proof focused on modular delivery and stakeholder translation.',
      proofType: 'Workflow',
      href: '/projects/luxe-lofts',
      roleChips: ['Implementation / CSE-lite'],
    },
    {
      title: 'Project Aegis Protocol',
      relevance:
        'AI governance and implementation control system for safer execution and maintainable workflows.',
      proofType: 'Proof Artifact',
      href: '/projects/project-aegis',
      roleChips: ['Implementation / CSE-lite', 'Ops Analytics / QA'],
    },
    {
      title: 'Portfolio2.0 Role-Lane Conversion System',
      relevance:
        'Information architecture proof showing role-lane alignment and recruiter-facing delivery clarity.',
      proofType: 'Documentation',
      href: '/portfolio2/deep-dive#proof-hierarchy',
      roleChips: ['Implementation / CSE-lite'],
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
    { label: 'Download Resume', href: '/resume' },
    { label: 'View Guynode System', href: GUYNODE_SYSTEM_HREF },
    {
      label: 'Ask the Digital Twin about implementation fit',
      type: 'link',
      twinSource: 'implementation',
      twinStarterPrompt: 'Help this visitor evaluate Kyle for an Implementation / CSE-lite role.',
    },
    { label: 'Contact Me', type: 'contact' },
  ],
};

export const opsAnalyticsTrackContent: TrackPageContent = {
  route: '/tracks/ops-analytics',
  accent: 'qa',
  title: 'Ops Analytics / QA',
  eyebrow: 'Role Track',
  headline:
    'QA proof for structured testing, issue triage, root-cause analysis, and validation workflows.',
  summary:
    'This track highlights work that uses controlled analysis, test design, defect reasoning, and launch-readiness checks to improve system reliability.',
  proves: [
    'Test planning',
    'Issue triage',
    'Root-cause analysis',
    'Validation logic',
    'Reproducible testing',
    'Launch-readiness review',
    'Decision-ready reporting',
  ],
  guynodeLabel: 'FLAGSHIP_SYSTEM',
  guynodeTitle: 'How Guynode Supports This Track',
  guynodeSummary:
    'Guynode provides QA proof through metadata validation, consistency checks, and launch-readiness review for public-facing spatial data delivery.',
  guynodeBullets: [
    'Metadata validation workflow for dataset consistency and field reliability',
    'Broken-link checks and route/content consistency controls',
    'Dataset QA loops to verify public-facing data quality',
    'Launch-readiness review to ensure the system is usable and trustworthy',
  ],
  supportingEvidence: [
    {
      title: 'Guynode Spatial Data Hub',
      relevance:
        'Flagship QA surface with metadata controls, public route validation, and launch-readiness checks.',
      proofType: 'Flagship System',
      href: GUYNODE_SYSTEM_HREF,
      roleChips: ['Ops Analytics / QA', 'GIS / Spatial Systems'],
    },
    {
      title: 'NBA 2K Systems Analysis',
      relevance:
        'Controlled testing case showing reproducibility logic, variable isolation, and decision-ready reporting.',
      proofType: 'Validation',
      href: '/projects/nba-systems-qa',
      roleChips: ['Ops Analytics / QA'],
    },
    {
      title: 'Systems at Scale: Triage & QA',
      relevance: 'Issue triage and QA workflow evidence for high-volume operational scenarios.',
      proofType: 'Workflow',
      href: '/projects/ops-triage',
      roleChips: ['Ops Analytics / QA'],
    },
    {
      title: 'Portfolio2.0 Role-Lane Conversion System',
      relevance:
        'Validation proof for route integrity, content alignment, and reviewer-ready information architecture.',
      proofType: 'Documentation QA',
      href: '/portfolio2/deep-dive#proof-hierarchy',
      roleChips: ['Ops Analytics / QA'],
    },
    {
      title: 'Project Aegis Protocol',
      relevance:
        'AI governance evidence showing quality controls, protocol boundaries, and root-cause prevention logic.',
      proofType: 'Governance',
      href: '/projects/project-aegis',
      roleChips: ['Ops Analytics / QA'],
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
    { label: 'Download Resume', href: '/resume' },
    { label: 'View Supporting Evidence', href: '/portfolio2/deep-dive#ci-and-tests' },
    {
      label: 'Ask the Digital Twin about QA proof',
      type: 'link',
      twinSource: 'qa',
      twinStarterPrompt: 'Help this visitor evaluate Kyle for an Ops Analytics / QA role.',
    },
    { label: 'Contact Me', type: 'contact' },
  ],
};

export const gisTrackContent: TrackPageContent = {
  route: '/tracks/gis',
  accent: 'gis',
  title: 'GIS / Spatial Systems',
  eyebrow: 'Role Track',
  headline: 'GIS proof for spatial data operations, mapping workflows, and dataset governance.',
  summary:
    'This track highlights work involving spatial datasets, GIS workflows, map-based interfaces, metadata structure, and geospatial system delivery.',
  proves: [
    'Spatial data organization',
    'GIS workflow understanding',
    'Map viewer logic',
    'Dataset governance',
    'Metadata schema design',
    'Public spatial data access',
    'Utility and spatial operations awareness',
  ],
  guynodeLabel: 'FLAGSHIP_SYSTEM',
  guynodeTitle: 'How Guynode Supports This Track',
  guynodeSummary:
    'Guynode is the flagship GIS proof for cataloging spatial datasets and delivering public geospatial access through map-based workflows.',
  guynodeBullets: [
    'Spatial data cataloging and dataset registry structure',
    'Leaflet map viewer integration and GIS-facing user experience',
    'Guyana-focused public data access with operational metadata',
    'Metadata and provenance handling for dataset governance',
  ],
  supportingEvidence: [
    {
      title: 'Guynode Spatial Data Hub',
      relevance:
        'Flagship GIS evidence for dataset governance, map viewer logic, and public geospatial access.',
      proofType: 'Flagship System',
      href: GUYNODE_SYSTEM_HREF,
      roleChips: ['GIS / Spatial Systems'],
    },
    {
      title: 'Systems at Scale: Triage & QA',
      relevance:
        'Utility operations and spatial QA workflow evidence with production-volume processing.',
      proofType: 'Spatial Workflow',
      href: '/projects/ops-triage',
      roleChips: ['GIS / Spatial Systems', 'Ops Analytics / QA'],
    },
    {
      title: 'HPS Geospatial Dashboard & Utility Ops Experience',
      relevance:
        'Operational GIS experience evidence for stakeholder dashboards, reporting workflows, and delivery support.',
      proofType: 'Proof Artifact',
      href: '/resume',
      roleChips: ['GIS / Spatial Systems'],
    },
    {
      title: 'Portfolio2.0 Role-Lane Conversion System',
      relevance:
        'Spatial portfolio delivery proof showing how GIS evidence is organized for recruiter retrieval.',
      proofType: 'Documentation',
      href: '/portfolio2/deep-dive#proof-hierarchy',
      roleChips: ['GIS / Spatial Systems'],
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
    { label: 'Download Resume', href: '/resume' },
    { label: 'View Guynode System', href: GUYNODE_SYSTEM_HREF },
    {
      label: 'Ask the Digital Twin about GIS experience',
      type: 'link',
      twinSource: 'gis',
      twinStarterPrompt: 'Help this visitor evaluate Kyle for a GIS / Spatial Systems role.',
    },
    { label: 'Contact Me', type: 'contact' },
  ],
};

export const trackSelectorCards: TrackSelectorCard[] = [
  {
    title: 'Implementation / CSE-lite',
    subcopy:
      'Onboarding, technical guidance, workflow setup, launch planning, and support handoff.',
    href: '/tracks/implementation',
  },
  {
    title: 'Ops Analytics / QA',
    subcopy:
      'Structured testing, issue triage, validation workflows, and decision-ready quality reporting.',
    href: '/tracks/ops-analytics',
  },
  {
    title: 'GIS / Spatial Systems',
    subcopy:
      'Spatial data operations, map workflows, metadata governance, and public-facing geospatial delivery.',
    href: '/tracks/gis',
  },
];
