
import React from 'react';
import { EXPERIENCE, CERTIFICATIONS } from '../constants';

const ResumeView: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500 selection:text-white font-sans p-8 md:p-16 max-w-[8.5in] mx-auto shadow-2xl print:shadow-none print:p-0">
      {/* Header */}
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-bold mb-2">Kyle Semple</h1>
        <div className="text-sm text-slate-600 flex flex-wrap gap-x-3 gap-y-1 justify-center sm:justify-start">
          <span>Washtenaw County, MI</span>
          <span className="hidden sm:inline">•</span>
          <span>734-882-9095</span>
          <span className="hidden sm:inline">•</span>
          <a href="mailto:kmsemple26@gmail.com" className="text-indigo-600">kmsemple26@gmail.com</a>
          <span className="hidden sm:inline">•</span>
          <a href="https://www.linkedin.com/in/kyle-semple-522537165/" className="text-indigo-600">LinkedIn</a>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">Professional Summary</h2>
        <p className="text-sm leading-relaxed text-slate-800">
          Customer-facing operator with experience spanning technical support, stakeholder-facing 
          dashboards, and high-volume operational triage. Skilled in troubleshooting across tooling 
          and workflows, coordinating cross-functional solutions, and producing documentation and 
          enablement assets that improve clarity and execution. Targeting Customer Success, 
          Implementation, and Enablement roles in AI-adjacent products.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-6">Experience</h2>
        <div className="space-y-8">
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-base">{exp.role} — {exp.company}</h3>
                <span className="text-sm text-slate-600 italic">{exp.period}</span>
              </div>
              {exp.tools && (
                <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-3 px-2 py-1 bg-indigo-50 border border-indigo-100 rounded inline-block">
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
      <section className="mb-10">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">Core Skills</h2>
        <ul className="list-disc pl-5 grid grid-cols-1 gap-1">
          <li className="text-sm text-slate-800">Customer Success Support • Technical Troubleshooting • Issue Triage</li>
          <li className="text-sm text-slate-800">Implementation/Onboarding Support • Cross-functional Coordination • Stakeholder Communication</li>
          <li className="text-sm text-slate-800">Documentation & Enablement Assets • Demo Environments • Process Improvement</li>
          <li className="text-sm text-slate-800">Dashboards & Reporting • Data QA / Validation • Operational Throughput</li>
        </ul>
      </section>

      {/* Education & Certs */}
      <section className="mb-10">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">Education & Certifications</h2>
        <div className="mb-4">
          <h3 className="font-bold text-sm">B.A., Geography — Queen’s University</h3>
          <p className="text-[13px] text-slate-600 italic">Relevant Coursework: Data Analytics, Geographic Information Science, Project Management</p>
        </div>
        <ul className="list-disc pl-5 space-y-1">
          {CERTIFICATIONS.map((cert, idx) => (
            <li key={idx} className="text-sm text-slate-800">{cert.name}</li>
          ))}
        </ul>
      </section>

      {/* Tools */}
      <section className="mb-10">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">Tools & Technologies</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-sm text-slate-800">Zendesk • CRM & customer support platforms</li>
          <li className="text-sm text-slate-800">Microsoft Office • Google Workspace</li>
          <li className="text-sm text-slate-800">Tableau • Power BI • BigQuery</li>
          <li className="text-sm text-slate-800">Notion • Asana • Jira</li>
        </ul>
      </section>

      {/* Additional */}
      <section className="mb-10">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">Additional Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-sm text-slate-800">Fluent in English; formal training in French and Spanish</li>
          <li className="text-sm text-slate-800">Experience in social impact initiatives; recipient-first / customer-first service approach</li>
          <li className="text-sm text-slate-800">Familiarity with operational program workflows and stakeholder-facing reporting</li>
        </ul>
      </section>

      {/* Print Trigger */}
      <div className="fixed bottom-8 right-8 print:hidden">
        <button 
          onClick={() => window.print()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
          Print to PDF
        </button>
      </div>
    </div>
  );
};

export default ResumeView;
