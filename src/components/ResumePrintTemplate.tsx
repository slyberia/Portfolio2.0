import React from 'react';
import { RESUME_CONTENT } from '../data/resumeContent';

// Dedicated print/PDF résumé template. This is intentionally NOT the screen résumé
// page (ResumeView): no cards, shadows, tinted backgrounds, share controls, or site
// chrome. It renders a single Letter-size page of print-native document typography and
// is the source rendered to public/Kyle-Semple-Resume.pdf (see scripts/generate-resume-pdf.mjs)
// via the bare /resume/print route. Content comes from the shared RESUME_CONTENT source,
// so it stays in sync with the on-site résumé.

const PRINT_CSS = `
  @page {
    size: letter;
    margin: 0.45in 0.5in;
  }
  /* The print route renders outside AppLayout, so the hard-coded <html class="dark">
     in index.html is never cleared and the .dark .bg-mesh rule would otherwise paint the
     body near-black (#07161f) — showing as a dark bar wherever the résumé doesn't reach
     the page edge. Force white with !important so the whole printed page stays white. */
  html,
  body {
    background: #ffffff !important;
    margin: 0;
    padding: 0;
  }
  .resume-print-template {
    width: 7.5in;
    margin: 0 auto;
    background: #ffffff;
    color: #111827;
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.24;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .resume-print-template * {
    box-sizing: border-box;
  }
  .resume-print-template .rp-name {
    font-size: 18pt;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0;
    color: #0f172a;
  }
  .resume-print-template .rp-title {
    font-size: 10pt;
    font-weight: 600;
    color: #0f172a;
    margin: 1px 0 2px;
  }
  .resume-print-template .rp-contact {
    font-size: 8.5pt;
    color: #475569;
    margin: 0;
  }
  .resume-print-template h2 {
    font-size: 10pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #0f172a;
    border-bottom: 1px solid #94a3b8;
    padding-bottom: 2px;
    margin: 11px 0 5px;
  }
  .resume-print-template section.rp-summary h2 {
    margin-top: 9px;
  }
  .resume-print-template p {
    margin: 0 0 3px;
  }
  .resume-print-template ul {
    margin: 2px 0 0;
    padding-left: 15px;
  }
  .resume-print-template li {
    margin-bottom: 2.5px;
  }
  .resume-print-template .rp-job {
    margin-bottom: 8px;
  }
  .resume-print-template .rp-job-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
  }
  .resume-print-template .rp-role {
    font-size: 10pt;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  .resume-print-template .rp-period {
    font-size: 8.5pt;
    font-style: italic;
    color: #475569;
    white-space: nowrap;
  }
  .resume-print-template .rp-tools {
    font-size: 7.5pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #0f766e;
    margin: 1px 0 2px;
  }
  .resume-print-template .rp-lower {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
  }
  .resume-print-template .rp-edu-degree {
    font-weight: 700;
    margin: 0;
  }
  .resume-print-template .rp-edu-course {
    font-style: italic;
    color: #475569;
    font-size: 8pt;
    margin: 0 0 2px;
  }
`;

const ResumePrintTemplate: React.FC = () => {
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
    <div className="resume-print-template">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      <header>
        <p className="rp-name">{name}</p>
        <p className="rp-title">{title}</p>
        <p className="rp-contact">
          {location} • {phone} • {email} •{' '}
          <a href={linkedInUrl} style={{ color: '#0f766e', textDecoration: 'none' }}>
            LinkedIn
          </a>
        </p>
      </header>

      <section className="rp-summary">
        <h2>Professional Summary</h2>
        <p>{summary}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {experience.map((exp, idx) => (
          <div className="rp-job" key={idx}>
            <div className="rp-job-head">
              <p className="rp-role">
                {exp.role} — {exp.company}
              </p>
              <span className="rp-period">{exp.period}</span>
            </div>
            {exp.tools && <p className="rp-tools">{exp.tools}</p>}
            <ul>
              {exp.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="rp-lower">
        <div>
          <section>
            <h2>Core Skills</h2>
            <ul>
              {coreSkills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Tools &amp; Technologies</h2>
            <ul>
              {tools.map((tool, idx) => (
                <li key={idx}>{tool}</li>
              ))}
            </ul>
          </section>
        </div>

        <div>
          <section>
            <h2>Education &amp; Certifications</h2>
            <p className="rp-edu-degree">
              {education.degree} — {education.school}
            </p>
            <p className="rp-edu-course">{education.coursework}</p>
            <ul>
              {certifications.map((cert, idx) => (
                <li key={idx}>{cert.name}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Additional Information</h2>
            <ul>
              {additional.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumePrintTemplate;
