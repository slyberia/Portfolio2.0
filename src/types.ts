export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  tools?: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  description: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  description: string;
  proof?: string;
  proofHref?: string;
  lane?: 'Implementation' | 'QA' | 'GIS' | 'AI Systems' | 'Tools';
}

export type SkillLinkMode = 'direct' | 'filtered' | 'secondary' | 'flagged';

export interface SkillChipConfig {
  linkMode: SkillLinkMode;
  linkedSlugs: string[];
  evidenceNote?: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export type ProjectCategory = 'ai-ops' | 'qa-data' | 'success-strategy' | 'creative';
export type CaseStudyCategory = ProjectCategory;
export type RecruiterRoleLane =
  | 'Forward Deployed Engineer'
  | 'Implementation Consultant'
  | 'Spatial Systems Architect'
  | 'AI Workflow / Portfolio Governance';

export type EvidenceType =
  | 'governance'
  | 'implementation'
  | 'ui-proof'
  | 'qa'
  | 'workflow'
  | 'case-study'
  | 'artifact'
  | 'media'
  | 'documentation';

export type ProofCategory =
  | 'artifact'
  | 'metric'
  | 'tradeoff'
  | 'validation'
  | 'decision'
  | 'constraint'
  | 'business-relevance';

export type MaturityStatus =
  | 'shipped'
  | 'implemented'
  | 'partially-implemented'
  | 'architecture-complete'
  | 'prototype'
  | 'conceptual'
  | 'planned'
  | 'deployment-pending';

export type Visibility = 'public' | 'internal' | 'draft' | 'hidden';

export type EvidencePriority = 'high' | 'medium' | 'low';

export type EvidenceConfidence = 'high' | 'medium' | 'low' | 'needs-review';

export type MetadataStatus =
  | 'explicit'
  | 'registry-derived'
  | 'heuristic-fallback'
  | 'needs-tagging'
  | 'unmapped';

export interface CaseStudyRigor {
  statement: string;
  baseline: string;
  definition: string;
  method: string;
  window: string;
}

export interface AuditLogFinding {
  category: string;
  icon?: string; // 'image', 'type', 'link', 'shield', 'activity', 'search', 'database', 'layout'
  observation: string;
  status: 'critical' | 'warning' | 'stable' | 'optimized' | 'info';
}

export interface AuditLogRecommendation {
  priority: 'High' | 'Medium' | 'Low';
  action: string;
  impact: string;
  effort?: string;
}

export interface AuditLogData {
  title: string;
  target: string;
  date: string;
  status: 'Critical' | 'Warning' | 'Healthy' | 'Pre-Launch';
  findings: AuditLogFinding[];
  recommendations: AuditLogRecommendation[];
  summary: string;
}

export interface CaseStudyArtifact {
  type: 'image' | 'code' | 'diagram' | 'link' | 'html' | 'tabs' | 'insight' | 'audit-log';
  label: string;
  content: string | CaseStudyArtifact[]; // content can be string or array of artifacts for tabs
  iframeUrl?: string; // used for live embedded prototype links
  description?: string;
  data?: CaseStudyRigor;
  auditData?: AuditLogData;
}

export interface CaseStudyConstraint {
  problem: string;
  tradeoff: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  rationale: string;
  category: ProjectCategory;
  tags: string[];
  roleLanes?: RecruiterRoleLane[];
  heroArtifact?: CaseStudyArtifact;
  artifacts?: CaseStudyArtifact[];
  rigor?: CaseStudyRigor;
  constraints?: CaseStudyConstraint[];
}

export type CaseStudyEntry = ProjectEntry;

/**
 * Represents a structured block of evidence extracted from pipeline governance logs.
 * Used to surface technical and business outcomes to the portfolio UI.
 */
export interface EvidenceBlock {
  /** Unique identifier for the block, ideally derived from source filename for stability. */
  id: string;
  /** Primary title of the initiative being evidenced. */
  initiativeTitle: string;
  /** Brief context summarizing the background and scope. */
  context: string;
  /** Detailed technical implementation or process specifics. */
  technicalDetail: string;
  /** Quantifiable outcome or business impact of the initiative. */
  businessValue: string;
  /** List of recruiter-facing role lanes this evidence belongs to. */
  roleLanes?: RecruiterRoleLane[];
  /** Explicit list of technology or process chips to display (e.g., 'Automation', 'AI-Assisted'). */
  artifactChips?: string[];
  /** NEW Phase 5.0 Metadata Fields */
  projectId?: string;
  evidenceTypes?: EvidenceType[];
  proofCategories?: ProofCategory[];
  maturityStatus?: MaturityStatus;
  visibility?: Visibility;
  priority?: EvidencePriority;
  confidence?: EvidenceConfidence;
  metadataStatus?: MetadataStatus;
  relatedMediaIds?: string[];
  relatedProjectIds?: string[];
  sourceDoc?: string;
  sourceSection?: string;
}

/**
 * Represents a visual or interactive asset supporting a project or evidence block.
 */
export interface MediaAsset {
  id: string;
  projectId: string;
  roleLanes: RecruiterRoleLane[];
  mediaType: 'screenshot' | 'diagram' | 'video' | 'live-link' | 'document' | 'architecture-map';
  src: string;
  alt: string;
  caption: string;
  relatedEvidenceIds: string[];
  maturityStatus: MaturityStatus;
  visibility: Visibility;
  captureStatus?:
    | 'user-provided'
    | 'agent-captured'
    | 'pending-capture'
    | 'pending-review'
    | 'approved'
    | 'rejected'
    | 'replace-requested';
  routeCaptured?: string;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  capturedBy?: 'user' | 'agent';
}

export const VALID_RECRUITER_LANES = [
  'AI Workflow / Portfolio Governance',
  'Forward Deployed Engineer',
  'Implementation Consultant',
  'Spatial Systems Architect',
];
