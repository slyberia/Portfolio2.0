import { PROJECT_REGISTRY } from '../constants';
import { buildProjectHref } from '../lib/routes';

export type ProjectRoleLane = 'Implementation' | 'QA' | 'GIS';
export type ProjectFilter = 'Implementation' | 'QA' | 'GIS' | 'AI Systems' | 'Process';
export type ProjectHierarchy = 'featured' | 'supporting';
export type ProjectAccent = 'orange' | 'blue' | 'teal' | 'slate' | 'violet';

export type ProjectMetadata = {
  id: string;
  displayTitle: string;
  shortSummary: string;
  hierarchy: ProjectHierarchy;
  featuredLabel?: string;
  statusLabel: string;
  roleLanes: ProjectRoleLane[];
  filters: ProjectFilter[];
  proofType: string;
  accent: ProjectAccent;
  sortOrder: number;
  href: string;
};

export const PROJECT_FILTERS: Array<'All' | ProjectFilter> = [
  'All',
  'Implementation',
  'QA',
  'GIS',
  'AI Systems',
  'Process',
];

export const PROJECT_METADATA: ProjectMetadata[] = [
  {
    id: 'guynode',
    displayTitle: 'Guynode Spatial Data Hub',
    shortSummary:
      'Spatial data platform proof for dataset cataloging, metadata, map-preview workflows, public access, and launch-readiness review.',
    hierarchy: 'featured',
    featuredLabel: 'FLAGSHIP GIS SYSTEM',
    statusLabel: 'Featured System',
    roleLanes: ['GIS', 'Implementation', 'QA'],
    filters: ['GIS', 'Implementation', 'QA', 'Process'],
    proofType: 'System',
    accent: 'teal',
    sortOrder: 1,
    href: buildProjectHref('guynode'),
  },
  {
    id: 'digital-twin',
    displayTitle: 'Digital Twin AI Agent',
    shortSummary:
      'Portfolio-bound AI assistant with scope controls, route/action commands, cost guardrails, failure planning, and human handoff.',
    hierarchy: 'featured',
    featuredLabel: 'FEATURED AI IMPLEMENTATION',
    statusLabel: 'Featured System',
    roleLanes: ['Implementation', 'QA'],
    filters: ['Implementation', 'QA', 'AI Systems', 'Process'],
    proofType: 'System',
    accent: 'orange',
    sortOrder: 2,
    href: buildProjectHref('digital-twin'),
  },
  {
    id: 'ops-triage',
    displayTitle: 'Ops Triage',
    shortSummary:
      'Operational triage system with escalation logic, throughput controls, and QA documentation loops under production pressure.',
    hierarchy: 'supporting',
    statusLabel: 'QA / Operations',
    roleLanes: ['Implementation', 'QA', 'GIS'],
    filters: ['Implementation', 'QA', 'GIS', 'Process'],
    proofType: 'Workflow',
    accent: 'blue',
    sortOrder: 3,
    href: buildProjectHref('ops-triage'),
  },
  {
    id: 'prompter-hub',
    displayTitle: 'Prompter Hub',
    shortSummary:
      'Structured AI-assisted build and documentation workflow showing repeatable quality controls and governance standards.',
    hierarchy: 'supporting',
    statusLabel: 'AI Governance',
    roleLanes: ['Implementation', 'QA'],
    filters: ['Implementation', 'QA', 'AI Systems', 'Process'],
    proofType: 'Documentation',
    accent: 'violet',
    sortOrder: 4,
    href: buildProjectHref('prompter-hub'),
  },
  {
    id: 'project-aegis',
    displayTitle: 'Project Aegis',
    shortSummary:
      'Governance framework for role-specific architecture, implementation rigor, and review discipline.',
    hierarchy: 'supporting',
    statusLabel: 'AI Governance',
    roleLanes: ['Implementation', 'QA'],
    filters: ['Implementation', 'QA', 'AI Systems', 'Process'],
    proofType: 'Governance',
    accent: 'slate',
    sortOrder: 5,
    href: buildProjectHref('project-aegis'),
  },
  {
    id: 'nba-systems-qa',
    displayTitle: 'NBA 2K Systems Analysis',
    shortSummary:
      'Controlled testing artifact for variable isolation, reproducible analysis, and QA decision logic in probabilistic systems.',
    hierarchy: 'supporting',
    statusLabel: 'Systems Testing',
    roleLanes: ['QA'],
    filters: ['QA', 'Process'],
    proofType: 'Testing',
    accent: 'blue',
    sortOrder: 6,
    href: buildProjectHref('nba-systems-qa'),
  },
  {
    id: 'luxe-lofts',
    displayTitle: 'Luxe Lofts',
    shortSummary:
      'Proposal-phase workflow artifact mapping business process constraints into modular implementation planning.',
    hierarchy: 'supporting',
    statusLabel: 'Workflow Prototype',
    roleLanes: ['Implementation'],
    filters: ['Implementation', 'Process'],
    proofType: 'Workflow',
    accent: 'slate',
    sortOrder: 7,
    href: buildProjectHref('luxe-lofts'),
  },
];

const sorted = (projects: ProjectMetadata[]) =>
  [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

export const getProjectMetadata = (id: string) =>
  PROJECT_METADATA.find((project) => project.id === id);
export const getProjectHref = (id: string) => getProjectMetadata(id)?.href ?? buildProjectHref(id);
export const getFeaturedProjects = () =>
  sorted(PROJECT_METADATA.filter((project) => project.hierarchy === 'featured'));
export const getSupportingProjects = () =>
  sorted(PROJECT_METADATA.filter((project) => project.hierarchy === 'supporting'));
export const getProjectsByFilter = (filter: ProjectFilter | 'All') =>
  filter === 'All'
    ? sorted(PROJECT_METADATA)
    : sorted(PROJECT_METADATA.filter((project) => project.filters.includes(filter)));
export const getProjectsByRoleLane = (roleLane: ProjectRoleLane) =>
  sorted(PROJECT_METADATA.filter((project) => project.roleLanes.includes(roleLane)));

export const validateProjectMetadataIds = () => {
  const registryIds = new Set(PROJECT_REGISTRY.map((project) => project.id));
  const missing = PROJECT_METADATA.filter((project) => !registryIds.has(project.id)).map(
    (project) => project.id,
  );
  const duplicates = PROJECT_METADATA.map((project) => project.id).filter(
    (id, index, arr) => arr.indexOf(id) !== index,
  );
  return { missing, duplicates };
};
