import React from 'react';

type Pillar = {
  index: string;
  title: string;
  description: string;
};

const PILLARS: Pillar[] = [
  {
    index: '01',
    title: 'Translate Complexity',
    description:
      'Clarify messy requirements, user needs, workflows, and technical constraints into something a team can actually act on.',
  },
  {
    index: '02',
    title: 'Build Adoption-Ready Systems',
    description:
      'Turn ideas into usable tools, documentation, support flows, and implementation-ready assets — not just prototypes.',
  },
  {
    index: '03',
    title: 'Support Better Decisions',
    description:
      'Create dashboards, triage flows, spatial systems, and AI assistants that make the next decision easier and faster.',
  },
  {
    index: '04',
    title: 'Bridge Technical & Non-Technical Teams',
    description:
      'Explain systems clearly so stakeholders, users, and teams can adopt them and act with confidence.',
  },
];

const WhatIHelpTeamsDoSection: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-white dark:bg-slate-950 border-b border-[#d8e8ee] dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-600 dark:text-slate-300 font-bold">
            WHAT_I_HELP_TEAMS_DO
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-outfit font-bold text-ink-navy dark:text-white">
            What I Help Teams Do
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Four patterns that show up across every project — the through-line behind
            forward-deployed engineering, technical implementation, GIS, operations, and AI workflow
            design.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.index}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] p-6 shadow-sm transition-colors duration-300 hover:border-tide-aqua/40 dark:hover:border-tide-sky/30"
            >
              <p className="font-mono text-xs font-bold tracking-[0.18em] text-tide-aqua dark:text-tide-sky">
                {pillar.index}
              </p>
              <h3 className="mt-3 text-lg md:text-xl font-outfit font-semibold text-ink-navy dark:text-white">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIHelpTeamsDoSection;
