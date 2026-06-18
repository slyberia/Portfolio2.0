import React from 'react';
import ResumeActions from '../components/ResumeActions';
import { RESUME_CONTENT } from '../data/resumeContent';

const ResumeView: React.FC = () => {
  const {
    name,
    title,
    location,
    phone,
    email,
    linkedInUrl,
    summary,
    experience,
    coreSkills,
    tools,
    education,
    certifications,
    additional,
  } = RESUME_CONTENT;

  return (
    <div className="min-h-screen bg-ink-panel dark:bg-ink-deep text-ink-navy dark:text-slate-200 selection:bg-tide-aqua selection:text-white font-sans px-8 pt-24 pb-8 md:p-16 max-w-[8.5in] mx-auto shadow-2xl print:shadow-none print:p-0">
      {/* Download / share actions */}
      <ResumeActions />

      {/* Header */}
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-bold mb-1">{name}</h1>
        <p className="text-base font-semibold text-slate-700 mb-2">{title}</p>
        <div className="text-sm text-slate-600 flex flex-wrap gap-x-3 gap-y-1 justify-center sm:justify-start">
          <span>{location}</span>
          <span className="hidden sm:inline">•</span>
          <span>{phone}</span>
          <span className="hidden sm:inline">•</span>
          <a href={`mailto:${email}`} className="text-tide-aqua">
            {email}
          </a>
          <span className="hidden sm:inline">•</span>
          <a href={linkedInUrl} className="text-tide-aqua">
            LinkedIn
          </a>
        </div>
      </header>

      {/* Summary */}
      <section id="resume-summary" className="mb-10 scroll-mt-24">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">
          Professional Summary
        </h2>
        <p className="text-sm leading-relaxed text-slate-800">{summary}</p>
      </section>

      {/* Experience */}
      <section id="resume-experience" className="mb-10 scroll-mt-24">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-6">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-base">
                  {exp.role} — {exp.company}
                </h3>
                <span className="text-sm text-slate-600 italic">{exp.period}</span>
              </div>
              {exp.tools && (
                <div className="text-[10px] font-bold uppercase tracking-widest text-tide-aqua mb-3 px-2 py-1 bg-tide-aqua/10 border border-tide-aqua/20 rounded inline-block">
                  {exp.tools}
                </div>
              )}
              <ul className="list-disc pl-5 space-y-1.5">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-slate-800 leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="resume-skills" className="mb-10 scroll-mt-24">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">
          Core Skills
        </h2>
        <ul className="list-disc pl-5 grid grid-cols-1 gap-1">
          {coreSkills.map((skill, idx) => (
            <li key={idx} className="text-sm text-slate-800">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* Education & Certs */}
      <section id="resume-education" className="mb-10 scroll-mt-24">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">
          Education & Certifications
        </h2>
        <div className="mb-4">
          <h3 className="font-bold text-sm">
            {education.degree} — {education.school}
          </h3>
          <p className="text-[13px] text-slate-600 italic">{education.coursework}</p>
        </div>
        <ul className="list-disc pl-5 space-y-1">
          {certifications.map((cert, idx) => (
            <li key={idx} className="text-sm text-slate-800">
              {cert.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Tools */}
      <section id="resume-tools" className="mb-10 scroll-mt-24">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">
          Tools & Technologies
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          {tools.map((tool, idx) => (
            <li key={idx} className="text-sm text-slate-800">
              {tool}
            </li>
          ))}
        </ul>
      </section>

      {/* Additional */}
      <section id="resume-additional" className="mb-10 scroll-mt-24">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">
          Additional Information
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          {additional.map((item, idx) => (
            <li key={idx} className="text-sm text-slate-800">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResumeView;
