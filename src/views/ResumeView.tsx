import React from 'react';
import ResumeActions from '../components/ResumeActions';
import { RESUME_CONTENT } from '../data/resumeContent';
import type { ResumeEntry } from '../data/resumeContent';

const EntryLinks: React.FC<{ entry: ResumeEntry }> = ({ entry }) => {
  if (!entry.links || entry.links.length === 0) return null;
  return (
    <p className="text-[13px] mb-2">
      {entry.linksLabel && (
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {entry.linksLabel}:{' '}
        </span>
      )}
      {entry.links.map((link, i) => (
        <React.Fragment key={link.url}>
          {i > 0 && <span className="text-slate-400"> · </span>}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-tide-aqua hover:underline"
          >
            {link.label}
          </a>
        </React.Fragment>
      ))}
    </p>
  );
};

const ResumeView: React.FC = () => {
  const {
    name,
    title,
    location,
    phone,
    email,
    headerLinks,
    summary,
    sections,
    skills,
    education,
    certifications,
  } = RESUME_CONTENT;

  return (
    <div className="min-h-screen bg-ink-panel dark:bg-ink-deep text-ink-navy dark:text-slate-200 selection:bg-tide-aqua selection:text-white font-sans px-8 pt-24 pb-8 md:p-16 max-w-[8.5in] mx-auto shadow-2xl print:shadow-none print:p-0">
      {/* Download / share actions */}
      <ResumeActions />

      {/* Header */}
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-bold mb-1">{name}</h1>
        <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">{title}</p>
        <div className="text-sm text-slate-600 dark:text-slate-400 flex flex-wrap gap-x-3 gap-y-1 justify-center sm:justify-start">
          <span>{location}</span>
          <span className="hidden sm:inline">•</span>
          <span>{phone}</span>
          <span className="hidden sm:inline">•</span>
          <a href={`mailto:${email}`} className="text-tide-aqua">
            {email}
          </a>
          {headerLinks.map((link) => (
            <React.Fragment key={link.url}>
              <span className="hidden sm:inline">•</span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tide-aqua"
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Summary */}
      <section id="resume-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 dark:border-slate-200 pb-1 mb-4">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">{summary}</p>
      </section>

      {/* Experience & project sections */}
      {sections.map((section, sIdx) => (
        <section
          key={section.heading}
          id={sIdx === 0 ? 'resume-experience' : undefined}
          className="mb-10 scroll-mt-24"
        >
          <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 dark:border-slate-200 pb-1 mb-6">
            {section.heading}
          </h2>
          <div className="space-y-8">
            {section.entries.map((entry) => (
              <div key={entry.title}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-x-8">
                  <h3 className="font-bold text-base">{entry.title}</h3>
                  {entry.meta && (
                    <span className="text-sm text-slate-600 dark:text-slate-400 italic whitespace-nowrap">
                      {entry.meta}
                    </span>
                  )}
                </div>
                {entry.tagline && (
                  <div className="text-[10px] font-bold uppercase tracking-widest text-tide-aqua mb-2 px-2 py-1 bg-tide-aqua/10 border border-tide-aqua/20 rounded inline-block">
                    {entry.tagline}
                  </div>
                )}
                <EntryLinks entry={entry} />
                <ul className="list-disc pl-5 space-y-1.5">
                  {entry.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Skills */}
      <section id="resume-skills" className="mb-10 scroll-mt-24">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 dark:border-slate-200 pb-1 mb-4">
          Technical Skills
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          {skills.map((group) => (
            <li key={group.label} className="text-sm text-slate-800 dark:text-slate-200">
              <span className="font-semibold">{group.label}:</span> {group.items}
            </li>
          ))}
        </ul>
      </section>

      {/* Education & Certs */}
      <section id="resume-education" className="mb-10 scroll-mt-24">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 dark:border-slate-200 pb-1 mb-4">
          Education & Certifications
        </h2>
        <div className="mb-4">
          <h3 className="font-bold text-sm">
            {education.degree} — {education.school}
          </h3>
          <p className="text-[13px] text-slate-600 dark:text-slate-400 italic">
            {education.detail}
          </p>
        </div>
        <ul className="list-disc pl-5 space-y-1">
          {certifications.map((cert) => (
            <li key={cert} className="text-sm text-slate-800 dark:text-slate-200">
              {cert}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResumeView;
