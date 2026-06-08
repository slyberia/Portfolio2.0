import { PROJECT_REGISTRY } from '../constants';
import { buildProjectHref } from '../lib/routes';
import type { RoleLane } from '../lib/design-system';
import type { RecruiterRoleLane, Visibility } from '../types';

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
  /**
   * Why the system exists / the problem it addresses, framed for a non-technical reader.
   * Part of the stakeholder-value layer (Purpose · Stakeholder Value · Role Relevance · Proof Type).
   */
  purpose?: string;
  /**
   * Who it helped and what got easier — the stakeholder/customer value, not just what was built.
   * Must be specific to the project; never generic copy or invented metrics.
   */
  stakeholderValue?: string;
  accent: ProjectAccent;
  sortOrder: number;
  href: string;
  evidenceTier?: EvidenceTier;
  /**
   * Controls whether the project is surfaced to visitors. Defaults to 'public' when omitted.
   * Non-public projects (e.g. 'draft', 'hidden') are excluded from every list, the project
   * switcher, structured data, and crawler output, but remain reachable by direct URL so they
   * can be previewed before publishing. Flip to 'public' to publish everywhere at once.
   */
  visibility?: Visibility;
  flagship?: boolean;
  showInSwitcher?: boolean;
  switcherRank?: number;
  caseStudyRoute?: string;
  markdownRoute?: string;
  crawlerRoute?: string;
};

export const CANONICAL_ROLE_ACCENT: Record<RecruiterRoleLane, RoleLane> = {
  'Forward Deployed Engineer': 'Implementation',
  'Implementation Consultant': 'QA',
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
      'Implementation Consultant',
    ],
    filters: ['GIS', 'Implementation', 'QA', 'Process'],
    proofType: 'System',
    purpose:
      'Make a large, fragmented spatial dataset trustworthy enough to publish and query without manual cleanup first.',
    stakeholderValue:
      'Analysts and public users get governed, metadata-complete layers they can rely on — integrity checks happen upstream, not in every downstream decision.',
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
      'Implementation Consultant',
    ],
    filters: ['Implementation', 'QA', 'AI Systems', 'Process'],
    proofType: 'System',
    purpose:
      'Let recruiters and visitors interrogate the portfolio conversationally without the assistant overstepping its scope.',
    stakeholderValue:
      "Visitors get fast, grounded answers about Kyle's work; guardrails keep responses scoped and hand off to a human when a question runs past them.",
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
    canonicalRoleLanes: ['Implementation Consultant', 'Spatial Systems Architect'],
    filters: ['Implementation', 'QA', 'GIS', 'Process'],
    proofType: 'Workflow',
    purpose:
      'Keep a high-volume operations queue moving without losing escalation rigor under pressure.',
    stakeholderValue:
      'Support leads and downstream teams get predictable triage, clear escalation paths, and an audit trail they can actually review.',
    accent: 'blue',
    sortOrder: 3,
    href: buildProjectHref('ops-triage'),
    evidenceTier: 'supporting',
    showInSwitcher: true,
    switcherRank: 3,
  },
  {
    id: 'project-aegis',
    displayTitle: 'Automation & Operational Protocols',
    shortSummary:
      'A decoupled AI-automation ecosystem — Aegis governance plus emOS execution over a Notion state machine — built to run with a human or an automated Guardian.',
    hierarchy: 'featured',
    featuredLabel: 'FEATURED AUTOMATION SYSTEM',
    statusLabel: 'Working Prototype',
    roleLanes: ['Implementation'],
    canonicalRoleLanes: ['AI Workflow / Portfolio Governance', 'Forward Deployed Engineer'],
    filters: ['AI Systems', 'Process', 'Implementation'],
    proofType: 'System Architecture',
    purpose:
      'Put AI-generated work under an explicit governance layer before it is trusted — and keep the whole pipeline auditable in a plain Notion workspace.',
    stakeholderValue:
      'Anyone running AI agents against a real system gets output that must pass an explicit check, a readable audit trail in Notion, and a safe path from human review toward automation.',
    accent: 'aqua',
    sortOrder: 4,
    href: buildProjectHref('project-aegis'),
    evidenceTier: 'secondary',
    showInSwitcher: true,
    switcherRank: 4,
  },
  {
    id: 'portfolio-pipeline',
    displayTitle: 'Portfolio 2.0 — Governed AI Build Pipeline',
    shortSummary:
      'The governed, multi-LLM pipeline behind this site — AI-assisted build under a one-subphase protocol, gated by CI (lint, types, tests, build, secret-scan) and crawler drift-guards, deployed via Docker to Cloud Run.',
    hierarchy: 'supporting',
    statusLabel: 'In Production',
    roleLanes: ['Implementation'],
    canonicalRoleLanes: ['AI Workflow / Portfolio Governance', 'Forward Deployed Engineer'],
    filters: ['AI Systems', 'Process', 'Implementation'],
    proofType: 'System / Process',
    purpose:
      'Prove AI-assisted development can reach production-grade reliability when it stays under human design authority, automated CI gates, and a transparent attribution ledger.',
    stakeholderValue:
      'A reviewer can trust what shipped: every change clears the same CI gate, semantic drift-guards block silent regressions, and AI_ATTRIBUTION.md demarcates human direction from AI execution.',
    accent: 'aqua',
    sortOrder: 5,
    href: buildProjectHref('portfolio-pipeline'),
    evidenceTier: 'supporting',
    showInSwitcher: true,
    switcherRank: 5,
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
    purpose:
      "Turn a prospective client's loose requirements into a scoped, modular build plan before any code is written.",
    stakeholderValue:
      'A non-technical client can see how their requirements and constraints map to delivery phases — and price the work — before committing budget.',
    accent: 'slate',
    sortOrder: 7,
    href: buildProjectHref('luxe-lofts'),
    evidenceTier: 'supporting',
    showInSwitcher: true,
    switcherRank: 7,
  },
  {
    id: 'northern-grind',
    displayTitle: 'Northern Grind',
    shortSummary:
      'Café digital rebrand & systems strategy — brand identity, menu UX, and break-even POS/loyalty modeling unified into one operational loop.',
    hierarchy: 'supporting',
    statusLabel: 'Implementation Ready',
    roleLanes: ['Implementation'],
    canonicalRoleLanes: ['Forward Deployed Engineer'],
    filters: ['Implementation', 'Process'],
    proofType: 'Case Study',
    purpose:
      "Unify a café's brand, menu experience, and POS/loyalty economics into a single operating loop.",
    stakeholderValue:
      'The owner gets a break-even-aware system where brand, menu, and loyalty decisions reinforce each other instead of pulling in different directions.',
    accent: 'cyan',
    sortOrder: 8,
    href: buildProjectHref('northern-grind'),
    evidenceTier: 'supporting',
    showInSwitcher: true,
    switcherRank: 8,
  },
  {
    id: 'moh',
    displayTitle: 'Public Health GIS Workflow Support',
    shortSummary:
      'Supported public-health contact-tracing workflows through GIS documentation, dashboard planning, UI/UX review, and implementation guidance for a national Ministry of Health.',
    hierarchy: 'supporting',
    statusLabel: 'Implementation Support',
    roleLanes: ['GIS', 'Implementation'],
    canonicalRoleLanes: [
      'Spatial Systems Architect',
      'Implementation Consultant',
      'Forward Deployed Engineer',
    ],
    filters: ['GIS', 'Implementation', 'AI Systems', 'Process'],
    proofType: 'Workflow',
    purpose:
      'Help a public-health team see how contact-tracing information could move from intake forms into GIS layers, dashboards, and reports as one connected workflow — and choose tools their staff could actually adopt.',
    stakeholderValue:
      'Non-technical stakeholders could discuss platform and workflow decisions in plain language — what each tool was for, where it fit, and what would be easy or hard to adopt — instead of getting stuck on technical detail.',
    accent: 'blue',
    sortOrder: 9,
    href: buildProjectHref('moh'),
    evidenceTier: 'supporting',
    showInSwitcher: true,
    switcherRank: 9,
  },
];

const sorted = (projects: ProjectMetadata[]) =>
  [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

/** A project is publicly listed when visibility is omitted or explicitly 'public'. */
const isPublic = (project: ProjectMetadata) => (project.visibility ?? 'public') === 'public';

/** Public-only base list, used by every visitor-facing helper below. */
const publicProjects = () => PROJECT_METADATA.filter(isPublic);

/** True when the project with this id is visible to visitors (unknown ids default to public). */
export const isProjectPublic = (id: string) => {
  const project = getProjectMetadata(id);
  return project ? isPublic(project) : true;
};

// Single-id lookup is intentionally NOT visibility-filtered so draft/hidden projects remain
// reachable by their direct URL for preview before publishing.
export const getProjectMetadata = (id: string) =>
  PROJECT_METADATA.find((project) => project.id === id);
export const getProjectHref = (id: string) => getProjectMetadata(id)?.href ?? buildProjectHref(id);
export const getFeaturedProjects = () =>
  sorted(publicProjects().filter((project) => project.hierarchy === 'featured'));
export const getSupportingProjects = () =>
  sorted(publicProjects().filter((project) => project.hierarchy === 'supporting'));
export const getProjectsByFilter = (filter: ProjectFilter | 'All') =>
  filter === 'All'
    ? sorted(publicProjects())
    : sorted(publicProjects().filter((project) => project.filters.includes(filter)));
export const getProjectsByRoleLane = (roleLane: ProjectRoleLane) =>
  sorted(publicProjects().filter((project) => project.roleLanes.includes(roleLane)));

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
