import { EXPERIENCE, CERTIFICATIONS } from '../constants';
import type { ExperienceItem, Certification } from '../types';

// Single source of truth for résumé content. Both the screen résumé page
// (ResumeView) and the print/PDF template (ResumePrintTemplate) consume this, so the
// downloadable PDF and the on-site résumé never drift apart. Experience and
// certifications already live in constants.tsx; the remaining sections previously
// lived inline in ResumeView and are consolidated here.

export interface ResumeEducation {
  degree: string;
  school: string;
  coursework: string;
}

export interface ResumeContent {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedInUrl: string;
  summary: string;
  experience: ExperienceItem[];
  coreSkills: string[];
  tools: string[];
  education: ResumeEducation;
  certifications: Certification[];
  additional: string[];
}

export const RESUME_CONTENT: ResumeContent = {
  name: 'Kyle Semple',
  title: 'Forward Deployed Engineer · Technical Systems Translator',
  location: 'Washtenaw County, MI',
  phone: '734-882-9095',
  email: 'kmsemple26@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/kyle-semple-522537165/',
  summary:
    'Forward Deployed Engineer and customer-facing technical operator. I build and ship ' +
    'AI-assisted web systems, turn ambiguous goals into structured delivery, and bring real ' +
    'technical-support and data-operations rigor to customer-facing work — translating complex ' +
    'technical, operational, and spatial problems into systems people can understand, adopt, ' +
    'and use. Targeting Forward Deployed Engineer, Implementation Engineer, and technical ' +
    'systems roles in AI-adjacent products.',
  experience: EXPERIENCE,
  coreSkills: [
    'Customer Success Support • Technical Troubleshooting • Issue Triage',
    'Implementation/Onboarding Support • Cross-functional Coordination • Stakeholder Communication',
    'Documentation & Enablement Assets • Demo Environments • Process Improvement',
    'Dashboards & Reporting • Data QA / Validation • Operational Throughput',
  ],
  tools: [
    'Zendesk • CRM & customer support platforms',
    'Microsoft Office • Google Workspace',
    'Tableau • Power BI • BigQuery',
    'Notion • Asana • Jira',
  ],
  education: {
    degree: 'B.A., Geography',
    school: 'Queen’s University',
    coursework:
      'Relevant Coursework: Data Analytics, Geographic Information Science, Project Management',
  },
  certifications: CERTIFICATIONS,
  additional: [
    'Fluent in English; formal training in French and Spanish',
    'Experience in social impact initiatives; recipient-first / customer-first service approach',
    'Familiarity with operational program workflows and stakeholder-facing reporting',
  ],
};
