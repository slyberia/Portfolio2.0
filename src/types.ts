export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  tools?: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
}

export type CaseStudyCategory = 'ai-ops' | 'qa-data' | 'success-strategy' | 'creative';

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
  description?: string;
  data?: CaseStudyRigor;
  auditData?: AuditLogData;
}

export interface CaseStudyConstraint {
  problem: string;
  tradeoff: string;
}

export interface CaseStudyEntry {
  id: string;
  title: string;
  content: string;
  rationale: string;
  category: CaseStudyCategory;
  tags: string[];
  // High-Rigor Evidence Fields
  heroArtifact?: CaseStudyArtifact;
  artifacts?: CaseStudyArtifact[];
  rigor?: CaseStudyRigor;
  constraints?: CaseStudyConstraint[];
}
