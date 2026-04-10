import { CaseStudyEntry } from '../types';

/**
 * Returns a short markdown summary of a case study suitable for recruiter mode.
 */
export function recruiterSummary(study: CaseStudyEntry): string {
  const outcome = study.rigor?.statement ?? '';
  const skills = study.tags?.join(', ') ?? '';
  return `## ${study.title}\n\n${study.rationale}\n\n**Key Outcome:** ${outcome}\n\n**Relevant Skills:** ${skills}`;
}
