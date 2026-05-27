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
  route: '/tracks/forward-deployed',
  accent: 'implementation',
  title: 'Forward Deployed Engineer',
  eyebrow: 'Role Track',
  headline:
    'Bridging the gap between ambiguous requirements and production-ready workflows through disciplined technical implementation.',
  summary:
    'This track showcases work that translates high-level intent into supportable workflows, robust documentation, and user-centric delivery systems, ensuring long-term operational success.',
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
      roleChips: ['Forward Deployed Engineer', 'Spatial Systems Architect'],
    },
    {
      title: 'Systems at Scale: Triage & QA',
      relevance:
        'Operational triage workflow proof with support-ready process controls and escalation logic.',
      proofType: 'Workflow',
      href: '/projects/ops-triage',
      roleChips: ['Forward Deployed Engineer', 'Solutions Architect'],
    },
    {
      title: 'Luxe Lofts Ecosystem',
      relevance:
        'Proposal-phase implementation planning proof focused on modular delivery and stakeholder translation.',
      proofType: 'Workflow',
      href: '/projects/luxe-lofts',
      roleChips: ['Forward Deployed Engineer'],
    },
    {
      title: 'Portfolio2.0 Role-Lane Conversion System',
      relevance:
        'Information architecture proof showing role-lane alignment and recruiter-facing delivery clarity.',
      proofType: 'Documentation',
      href: '/portfolio2/deep-dive#proof-hierarchy',
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
    { label: 'Download Resume', href: '/resume' },
    { label: 'View Guynode System', href: GUYNODE_SYSTEM_HREF },
    {
      label: 'Ask the Digital Twin about implementation fit',
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
  title: 'Solutions Architect',
  eyebrow: 'Role Track',
  headline:
    'Driving system reliability through rigorous test design, methodical triage, and evidence-based root-cause analysis.',
  summary:
    'This track highlights the use of controlled analysis, defect taxonomy, and validation logic to deliver stable, high-quality systems and decision-ready reporting.',
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
      roleChips: ['Solutions Architect', 'Spatial Systems Architect'],
    },
    {
      title: 'Systems at Scale: Triage & QA',
      relevance: 'Issue triage and QA workflow evidence for high-volume operational scenarios.',
      proofType: 'Workflow',
      href: '/projects/ops-triage',
      roleChips: ['Solutions Architect'],
    },
    {
      title: 'Portfolio2.0 Role-Lane Conversion System',
      relevance:
        'Validation proof for route integrity, content alignment, and reviewer-ready information architecture.',
      proofType: 'Documentation QA',
      href: '/portfolio2/deep-dive#proof-hierarchy',
      roleChips: ['Solutions Architect'],
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
      twinStarterPrompt: 'Help this visitor evaluate Kyle for a Solutions Architect role.',
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
    'This track demonstrates expertise in spatial dataset organization, GIS workflow automation, and the delivery of public geospatial resources with high integrity.',
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
      roleChips: ['Spatial Systems Architect'],
    },
    {
      title: 'Systems at Scale: Triage & QA',
      relevance:
        'Utility operations and spatial QA workflow evidence with production-volume processing.',
      proofType: 'Spatial Workflow',
      href: '/projects/ops-triage',
      roleChips: ['Spatial Systems Architect', 'Solutions Architect'],
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
      href: '/portfolio2/deep-dive#proof-hierarchy',
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
    { label: 'Download Resume', href: '/resume' },
    { label: 'View Guynode System', href: GUYNODE_SYSTEM_HREF },
    {
      label: 'Ask the Digital Twin about GIS experience',
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
    title: 'Solutions Architect',
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
