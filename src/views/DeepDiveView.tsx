import React from 'react';
import { Link } from 'react-router-dom';
import {
  releaseLadder,
  decisionBlocks,
  technicalBlocks,
  llmRoles,
  forensicEntries,
  appendixLinks,
} from '../data/deepDiveContent';

const SectionEyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
    {children}
  </p>
);

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-outfit font-extrabold text-navy-900 dark:text-white">{children}</h2>
);

const SectionIntro: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">{children}</p>
);

const Chip: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs font-medium">
    {label}
  </span>
);

const DeepDiveView: React.FC = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <SectionEyebrow>Portfolio2.0 — Deep Dive</SectionEyebrow>
          <h1 className="text-4xl sm:text-5xl font-outfit font-extrabold text-navy-900 dark:text-white leading-tight">
            Technical proof,{' '}
            <span className="gradient-text">decision rationale,</span>
            <br />
            and governance trail.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            This page consolidates the second-layer proof for Portfolio2.0 — the decisions behind
            the architecture, the evidence behind the track claims, and the governance model behind
            the AI workflow. Built for skim-first reading, with deeper detail available in each
            section.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              'Architecture',
              'Decision-impact',
              'CI / Testing',
              'LLM Governance',
              'Forensic Archive',
            ].map((chip) => (
              <Chip key={chip} label={chip} />
            ))}
          </div>
          {/* In-page nav anchors */}
          <nav
            aria-label="Page sections"
            className="flex flex-wrap gap-3 pt-4 border-t border-black/5 dark:border-white/5"
          >
            {[
              { label: 'Release ladder', href: '#release-ladder' },
              { label: 'Decision blocks', href: '#decision-blocks' },
              { label: 'Architecture', href: '#architecture-boundary' },
              { label: 'LLM governance', href: '#multi-llm-governance' },
              { label: 'Forensic archive', href: '#forensic-archive' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors underline underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Release Ladder ───────────────────────────────────── */}
      <section
        id="release-ladder"
        className="py-16 px-6 bg-slate-50/50 dark:bg-slate-900/20 border-y border-black/5 dark:border-white/5 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <SectionEyebrow>Project evolution</SectionEyebrow>
            <SectionHeading>Release ladder</SectionHeading>
            <SectionIntro>
              Portfolio2.0 was built iteratively across five phases. Each phase added proof
              capability, tightened architecture, or expanded the stakeholder surface. The release
              ladder shows how the system evolved and why.
            </SectionIntro>
          </div>
          <div className="relative space-y-0">
            {releaseLadder.map((entry, idx) => (
              <div key={entry.phase} className="flex gap-6">
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-500 shrink-0 mt-1.5 ring-4 ring-indigo-500/10" />
                  {idx < releaseLadder.length - 1 && (
                    <div className="w-px flex-1 bg-indigo-200 dark:bg-indigo-900/60 my-1" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8 space-y-1.5">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-widest">
                    {entry.phase}
                  </span>
                  <h3 className="font-outfit font-bold text-navy-900 dark:text-white">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Decision-Impact Blocks ───────────────────────────── */}
      <section id="decision-blocks" className="py-16 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-3">
            <SectionEyebrow>Decision-impact library</SectionEyebrow>
            <SectionHeading>Decision-impact blocks</SectionHeading>
            <SectionIntro>
              Each block documents a real decision made during Portfolio2.0 development — what was
              decided, what changed, and why it mattered beyond the immediate context. These are the
              decisions that shaped the architecture, the trust model, and the delivery structure.
            </SectionIntro>
          </div>
          <div className="space-y-6">
            {decisionBlocks.map((block) => (
              <div
                key={block.id}
                id={block.id}
                className="glass-card rounded-2xl p-6 space-y-4 scroll-mt-24"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-outfit font-bold text-lg text-navy-900 dark:text-white leading-snug">
                    {block.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {block.chips.map((chip) => (
                      <Chip key={chip} label={chip} />
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6 border-t border-black/5 dark:border-white/5 pt-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Decision
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {block.decision}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Impact
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {block.impact}
                    </p>
                  </div>
                </div>
                <div className="border-t border-black/5 dark:border-white/5 pt-4 space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Why it matters
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {block.whyItMatters}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture & Technical Hardening ──────────────── */}
      <section
        id="architecture-boundary"
        className="py-16 px-6 bg-slate-50/50 dark:bg-slate-900/20 border-y border-black/5 dark:border-white/5 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-3">
            <SectionEyebrow>Technical hardening</SectionEyebrow>
            <SectionHeading>Architecture and QA evidence</SectionHeading>
            <SectionIntro>
              Four hardening decisions moved the system from working to trustworthy: the
              client/server boundary, the CI gate, sandbox resilience, and the sanitization layer.
              Each is documented with context, the specific change, and the outcome.
            </SectionIntro>
          </div>
          <div className="space-y-8">
            {technicalBlocks.map((block) => (
              <div
                key={block.id}
                id={block.id}
                className="glass-card rounded-2xl p-6 space-y-5 scroll-mt-24"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-outfit font-bold text-lg text-navy-900 dark:text-white leading-snug">
                    {block.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {block.chips.map((chip) => (
                      <Chip key={chip} label={chip} />
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-5 border-t border-black/5 dark:border-white/5 pt-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Context
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {block.context}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      What changed
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {block.what}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Result
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {block.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LLM Governance ──────────────────────────────────── */}
      <section id="multi-llm-governance" className="py-16 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-3">
            <SectionEyebrow>Governed AI workflow</SectionEyebrow>
            <SectionHeading>Multi-LLM governance</SectionHeading>
            <SectionIntro>
              Portfolio2.0 used three LLMs in differentiated, role-specific capacities — not
              interchangeably. The value was not novelty. It was disciplined use of AI inside a
              controlled, human-directed workflow with explicit operator checkpoints.
            </SectionIntro>
          </div>

          {/* Governance model callout */}
          <div className="border-l-4 border-indigo-500 pl-6 py-2 space-y-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-widest">
              Governance model
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Each LLM was assigned a defined scope and reviewed output before it moved to the next
              stage. No LLM output was published without an operator checkpoint. Role boundaries were
              maintained to prevent scope drift and maintain traceability of decisions back to a
              specific tool and context.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {llmRoles.map((role) => (
              <div key={role.name} className="glass-card rounded-2xl p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-outfit font-bold text-navy-900 dark:text-white">
                    {role.name}
                  </h3>
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-widest">
                    {role.role}
                  </p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {role.description}
                </p>
                <div className="border-t border-black/5 dark:border-white/5 pt-4 space-y-2">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Used for
                  </span>
                  <ul className="space-y-1">
                    {role.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Forensic Archive ─────────────────────────────────── */}
      <section
        className="py-16 px-6 bg-slate-50/50 dark:bg-slate-900/20 border-y border-black/5 dark:border-white/5"
      >
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-3">
            <SectionEyebrow>Evidence bank</SectionEyebrow>
            <SectionHeading>Forensic archive</SectionHeading>
            <SectionIntro>
              The forensic archive preserves the revision history, risk documentation, validation
              trail, and governance notes accumulated during Portfolio2.0 development. Later
              decisions are traceable back to real evidence — not memory or polished summaries.
            </SectionIntro>
          </div>
          <div className="space-y-6">
            {forensicEntries.map((entry) => (
              <div
                key={entry.id}
                id={entry.id}
                className="glass-card rounded-2xl p-6 space-y-4 scroll-mt-24"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-outfit font-bold text-navy-900 dark:text-white">
                    {entry.label}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.chips.map((chip) => (
                      <Chip key={chip} label={chip} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Appendix / Supporting Artifacts ──────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <SectionEyebrow>Appendix</SectionEyebrow>
            <SectionHeading>Supporting artifacts</SectionHeading>
            <SectionIntro>
              Related pages and artifacts in the Portfolio2.0 proof system.
            </SectionIntro>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {appendixLinks.map((link) => {
              const isExternal = link.href.startsWith('http');
              const inner = (
                <div className="glass-card rounded-2xl p-4 flex items-center justify-between group transition-all duration-300 hover:border-indigo-500/30 hover:-translate-y-0.5 cursor-pointer">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {link.label}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              );
              if (isExternal) {
                return (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                );
              }
              return (
                <Link key={link.href} to={link.href}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Back nav ─────────────────────────────────────────── */}
      <div className="py-8 px-6 pb-16">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4">
          <Link
            to="/tracks/implementation"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Implementation track
          </Link>
          <Link
            to="/tracks/ops-analytics"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Ops Analytics track
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeepDiveView;
