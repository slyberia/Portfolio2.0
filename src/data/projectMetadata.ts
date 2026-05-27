import { PROJECT_REGISTRY } from '../constants';
import { buildProjectHref } from '../lib/routes';
import type { RoleLane } from '../lib/design-system';
import type { RecruiterRoleLane } from '../types';

export type ProjectRoleLane = 'Implementation' | 'QA' | 'GIS';
export type ProjectFilter = 'Implementation' | 'QA' | 'GIS' | 'AI Systems' | 'Process';
export type ProjectHierarchy = 'featured' | 'supporting';
export type ProjectAccent = 'aqua' | 'blue' | 'cyan' | 'gold' | 'slate';
export type EvidenceTier = 'primary' | 'secondary' | 'supporting';

export type ProjectMetadata = {
  id: string;
  displayTitle: string;
  shortSummary: string;
  hierarchy: ProjectHierarchy;
  featuredLabel?: string;
  statusLabel: string;
  roleLanes: ProjectRoleLane[];
  canonicalRoleLanes: RecruiterRoleLane[];
  filters: ProjectFilter[];
  proofType: string;
  accent: ProjectAccent;
  sortOrder: number;
  href: string;
  evidenceTier?: EvidenceTier;
  flagship?: boolean;
  showInSwitcher?: boolean;
  switcherRank?: number;
  caseStudyRoute?: string;
  markdownRoute?: string;
  crawlerRoute?: string;
};

export const CANONICAL_ROLE_ACCENT: Record<RecruiterRoleLane, RoleLane> = {
  'Forward Deployed Engineer': 'Implementation',
  'Solutions Architect': 'QA',
  'Spatial Systems Architect': 'GIS',
  'AI Workflow / Portfolio Governance': 'Implementation',
};

const PROJECT_ACCENTS: readonly ProjectAccent[] = [
  'aqua',
  'blue',
  'cyan',
  'gold',
  'slate',
] as const;

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
      'Flagship spatial platform proofing dataset governance, metadata integrity, and high-fidelity public access workflows.',
    hierarchy: 'featured',
    featuredLabel: 'FLAGSHIP GIS SYSTEM',
    statusLabel: 'Featured System',
    roleLanes: ['GIS', 'Implementation', 'QA'],
    canonicalRoleLanes: [
      'Spatial Systems Architect',
      'Forward Deployed Engineer',
      'Solutions Architect',
    ],
    filters: ['GIS', 'Implementation', 'QA', 'Process'],
    proofType: 'System',
    accent: 'gold',
    sortOrder: 1,
    href: buildProjectHref('guynode'),
    evidenceTier: 'primary',
    flagship: true,
    showInSwitcher: true,
    switcherRank: 1,
    caseStudyRoute: '/projects/guynode',
    markdownRoute: '/content/projects/guynode.md',
    crawlerRoute: '/projects/guynode/',
  },
  {
    id: 'digital-twin',
    displayTitle: 'Digital Twin AI Agent',
    shortSummary:
      'Advanced AI implementation featuring scoped interaction protocols, operational guardrails, and seamless human-in-the-loop handoff.',
    hierarchy: 'featured',
    featuredLabel: 'FEATURED AI IMPLEMENTATION',
    statusLabel: 'Featured System',
    roleLanes: ['Implementation', 'QA'],
    canonicalRoleLanes: [
      'AI Workflow / Portfolio Governance',
      'Forward Deployed Engineer',
      'Solutions Architect',
    ],
    filters: ['Implementation', 'QA', 'AI Systems', 'Process'],
    proofType: 'System',
    accent: 'aqua',
    sortOrder: 2,
    href: buildProjectHref('digital-twin'),
    evidenceTier: 'secondary',
    showInSwitcher: true,
    switcherRank: 2,
    caseStudyRoute: '/projects/digital-twin',
    markdownRoute: '/content/projects/digital-twin.md',
    crawlerRoute: '/projects/digital-twin/',
  },
  {
    id: 'ops-triage',
    displayTitle: 'Ops Triage',
    shortSummary:
      'High-pressure operational triage proof showcasing rigorous escalation logic, throughput management, and QA audit trails.',
    hierarchy: 'supporting',
    statusLabel: 'QA / Operations',
    roleLanes: ['Implementation', 'QA', 'GIS'],
    canonicalRoleLanes: ['Solutions Architect', 'Spatial Systems Architect'],
    filters: ['Implementation', 'QA', 'GIS', 'Process'],
    proofType: 'Workflow',
    accent: 'blue',
    sortOrder: 3,
    href: buildProjectHref('ops-triage'),
    evidenceTier: 'supporting',
    showInSwitcher: true,
    switcherRank: 3,
  },
  {
    id: 'luxe-lofts',
    displayTitle: 'Luxe Lofts',
    shortSummary:
      'Proposal-phase workflow artifact mapping business process constraints into modular implementation planning.',
    hierarchy: 'supporting',
    statusLabel: 'Workflow Prototype',
    roleLanes: ['Implementation'],
    canonicalRoleLanes: ['Forward Deployed Engineer'],
    filters: ['Implementation', 'Process'],
    proofType: 'Workflow',
    accent: 'slate',
    sortOrder: 7,
    href: buildProjectHref('luxe-lofts'),
    evidenceTier: 'supporting',
    showInSwitcher: true,
    switcherRank: 7,
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

export const validateProjectMetadataContracts = () => {
  const ids = PROJECT_METADATA.map((project) => project.id);
  const hrefs = PROJECT_METADATA.map((project) => project.href);
  const invalidAccents = PROJECT_METADATA.filter(
    (project) => !PROJECT_ACCENTS.includes(project.accent),
  ).map((project) => project.id);
  const invalidRoleLanes = PROJECT_METADATA.filter((project) => project.roleLanes.length === 0).map(
    (project) => project.id,
  );
  const invalidCanonicalRoleLanes = PROJECT_METADATA.filter(
    (project) => project.canonicalRoleLanes.length === 0,
  ).map((project) => project.id);
  const invalidFilters = PROJECT_METADATA.filter((project) => project.filters.length === 0).map(
    (project) => project.id,
  );
  const duplicateHrefs = hrefs.filter((href, index, arr) => arr.indexOf(href) !== index);
  const duplicateSortOrder = PROJECT_METADATA.map((project) => project.sortOrder).filter(
    (sortOrder, index, arr) => arr.indexOf(sortOrder) !== index,
  );
  const missingHrefPrefix = PROJECT_METADATA.filter(
    (project) => !project.href.startsWith('/projects/'),
  ).map((project) => project.id);
  const featuredWithoutEvidence = PROJECT_METADATA.filter(
    (p) => p.hierarchy === 'featured' && (!p.featuredLabel || !p.evidenceTier),
  ).map((p) => p.id);
  const flagshipCount = PROJECT_METADATA.filter((p) => p.flagship).length;
  const duplicateSwitcherRank = PROJECT_METADATA.filter((p) => typeof p.switcherRank === 'number')
    .map((p) => p.switcherRank as number)
    .filter((rank, index, arr) => arr.indexOf(rank) !== index);

  return {
    duplicateHrefs,
    duplicateSortOrder,
    invalidAccents,
    invalidFilters,
    invalidRoleLanes,
    invalidCanonicalRoleLanes,
    missingHrefPrefix,
    featuredWithoutEvidence,
    flagshipCount,
    duplicateSwitcherRank,
    uniqueIds: new Set(ids).size === ids.length,
  };
};
