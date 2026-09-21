import React from 'react';
import { Link } from 'react-router-dom';
import {
  HPS_ARCHITECTURE_LAYERS,
  HPS_ARTIFACTS,
  HPS_BENCHMARKS,
  HPS_LIMITATIONS,
  HPS_WORKFLOW_STEPS,
  type HpsEvidenceStatus,
} from '../../data/hpsDeepDiveContent';
import { HPS_GEOSPATIAL_HREF, PROJECTS_HREF } from '../../lib/routes';

const SECTIONS = [
  ['hps-architecture', 'Architecture'],
  ['hps-workflow', 'Workflow'],
  ['hps-artifacts', 'Artifacts'],
  ['hps-benchmarks', 'Benchmarks'],
  ['hps-limitations', 'Limitations'],
] as const;

const statusStyles: Record<HpsEvidenceStatus, string> = {
  Completed: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-800 dark:text-emerald-300',
  Partial: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300',
  'Implemented · deployment unverified':
    'border-sky-600/30 bg-sky-600/10 text-sky-800 dark:text-sky-300',
  Ongoing: 'border-slate-400/40 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
};

const HpsDeepDive: React.FC = () => (
  <article className="space-y-12" data-testid="hps-deep-dive">
    <header className="rounded-3xl border border-amber-500/40 bg-amber-50 p-6 dark:bg-[#16130B] md:p-10">
      <div className="space-y-5">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 dark:text-amber-300">
          Flagship system · geospatial production and validation
        </p>
        <div className="max-w-4xl space-y-4">
          <h2 className="font-outfit text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white md:text-5xl">
            HPS Geospatial: From Map Application to Inspectable Production Workflow
          </h2>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200 md:text-lg">
            HPS Geospatial is a GIS design portal for creating and inspecting map-based outputs. My
            work connected country-specific river data, poster production, provenance, and
            georeferencing into one workflow whose coverage and failure states could be audited.
          </p>
        </div>
        <div className="grid gap-4 border-t border-amber-500/30 pt-5 text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-3">
          <p>
            <strong className="block text-slate-950 dark:text-white">System outcome</strong>
            PNG export → verified handoff → Recovery → GeoTIFF, with explicit country coverage.
          </p>
          <p>
            <strong className="block text-slate-950 dark:text-white">Strongest evidence</strong>
            33/33 browser matrix, 266 backend tests passed, and a 26-entry closeout audit.
          </p>
          <p>
            <strong className="block text-slate-950 dark:text-white">Evidence boundary</strong>
            End-to-end proof was local and synthetic; full production behavior is not claimed.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://hydro-frontend-786228485832.us-central1.run.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Open HPS GIS design portal ↗
          </a>
          <Link
            to={HPS_GEOSPATIAL_HREF}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-amber-500 dark:border-slate-700 dark:bg-[#0B0F19] dark:text-white"
          >
            Read the project overview
          </Link>
        </div>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          The portal link confirms an accessible application surface; it does not establish the
          live-database or deployment claims bounded below.
        </p>
      </div>
    </header>

    <nav
      aria-label="HPS deep dive sections"
      className="sticky top-20 z-30 -mx-6 overflow-x-auto border-y border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto flex w-max min-w-full gap-2 md:justify-center">
        {SECTIONS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="whitespace-nowrap rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-amber-500 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-slate-700 dark:text-slate-200 dark:hover:text-amber-300"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>

    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19] md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Translation · Adoption · Implementation maturity
      </p>
      <div className="mt-5 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">Translation</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Country data, poster exports, provenance checks, and spatial recovery became one
            understandable operator workflow rather than disconnected technical steps.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">Adoption</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Manual upload fallback, explicit transfer states, map inspection, and country status
            labels were designed around how an operator detects and recovers from incomplete work.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">Implementation maturity</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Completed, partial, deployment-unverified, and ongoing work stay visibly separate so
            implemented architecture is not presented as production proof.
          </p>
        </div>
      </div>
    </section>

    <section id="hps-architecture" className="scroll-mt-40 space-y-6">
      <div className="max-w-3xl space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
          System architecture
        </p>
        <h2 className="font-outfit text-3xl font-bold text-slate-950 dark:text-white">
          Five layers, one evidence chain
        </h2>
        <p className="leading-relaxed text-slate-600 dark:text-slate-300">
          The architecture keeps source processing, operator transfer, Recovery, publication, and
          audit responsibilities distinct while connecting them through manifests and explicit
          state.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {HPS_ARCHITECTURE_LAYERS.map((layer, index) => (
          <article
            key={layer.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19]"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">
              Layer {index + 1}
            </p>
            <h3 className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{layer.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {layer.responsibility}
            </p>
            <dl className="mt-5 space-y-3 border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
              <div>
                <dt className="font-bold text-slate-900 dark:text-slate-100">Decision</dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-300">{layer.decision}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900 dark:text-slate-100">Evidence boundary</dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-300">
                  {layer.evidenceBoundary}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>

    <section id="hps-workflow" className="scroll-mt-40 space-y-6">
      <div className="max-w-3xl space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
          Operator workflow
        </p>
        <h2 className="font-outfit text-3xl font-bold text-slate-950 dark:text-white">
          Failure states are part of the workflow
        </h2>
        <p className="leading-relaxed text-slate-600 dark:text-slate-300">
          The central decision was not simply to connect two interfaces. It was to make transfer,
          provenance, processing, and recovery failures legible enough to diagnose.
        </p>
      </div>
      <ol className="grid gap-4 lg:grid-cols-5">
        {HPS_WORKFLOW_STEPS.map((item) => (
          <li
            key={item.step}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19]"
          >
            <h3 className="font-bold text-amber-800 dark:text-amber-300">{item.step}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {item.systemBehavior}
            </p>
            <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
              <strong>Failure handling:</strong> {item.failureHandling}
            </p>
          </li>
        ))}
      </ol>
    </section>

    <section id="hps-artifacts" className="scroll-mt-40 space-y-6">
      <div className="max-w-3xl space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
          Artifact design and maturity
        </p>
        <h2 className="font-outfit text-3xl font-bold text-slate-950 dark:text-white">
          Outputs designed to carry provenance and status
        </h2>
      </div>
      <div
        className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"
        tabIndex={0}
        role="region"
        aria-label="HPS artifact maturity table"
      >
        <table className="min-w-[780px] w-full border-collapse bg-white text-left text-sm dark:bg-[#0B0F19]">
          <thead className="bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-white">
            <tr>
              <th className="px-4 py-3">Artifact</th>
              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Evidence</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {HPS_ARTIFACTS.map((row) => (
              <tr key={row.artifact} className="border-t border-slate-200 dark:border-slate-800">
                <th className="px-4 py-4 align-top font-bold text-slate-950 dark:text-white">
                  {row.artifact}
                </th>
                <td className="px-4 py-4 align-top leading-relaxed text-slate-600 dark:text-slate-300">
                  {row.purpose}
                </td>
                <td className="px-4 py-4 align-top leading-relaxed text-slate-600 dark:text-slate-300">
                  {row.evidence}
                </td>
                <td className="px-4 py-4 align-top">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300 md:hidden">
        Swipe horizontally to inspect the complete artifact table.
      </p>
    </section>

    <section id="hps-benchmarks" className="scroll-mt-40 space-y-6">
      <div className="max-w-3xl space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
          Validation and benchmarks
        </p>
        <h2 className="font-outfit text-3xl font-bold text-slate-950 dark:text-white">
          Evidence kept with its test boundary
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {HPS_BENCHMARKS.map((benchmark) => (
          <article
            key={benchmark.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19]"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
              {benchmark.label}
            </p>
            <p className="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white">
              {benchmark.value}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {benchmark.detail}
            </p>
            <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
              <strong>Boundary:</strong> {benchmark.boundary}
            </p>
          </article>
        ))}
      </div>
    </section>

    <section id="hps-limitations" className="scroll-mt-40 space-y-6">
      <div className="rounded-2xl border border-amber-500/40 bg-amber-50 p-6 dark:bg-[#16130B] md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
          Known limitations
        </p>
        <h2 className="mt-2 font-outfit text-3xl font-bold text-slate-950 dark:text-white">
          What the retained evidence does not establish
        </h2>
        <ul className="mt-5 space-y-3">
          {HPS_LIMITATIONS.map((limitation) => (
            <li
              key={limitation}
              className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            >
              <span aria-hidden="true" className="font-bold text-amber-700 dark:text-amber-300">
                —
              </span>
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B0F19] md:p-8">
        <h2 className="font-outfit text-2xl font-bold text-slate-950 dark:text-white">
          Capability signal
        </h2>
        <p className="mt-3 max-w-4xl leading-relaxed text-slate-600 dark:text-slate-300">
          This work demonstrates cross-system implementation, geospatial data modeling,
          failure-aware workflow design, artifact lineage, and the discipline to close a program
          with explicit evidence states instead of unsupported completeness claims.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-amber-800 dark:text-amber-300">
          <Link to={HPS_GEOSPATIAL_HREF} className="hover:underline">
            ← Back to the HPS project entry
          </Link>
          <Link to={PROJECTS_HREF} className="hover:underline">
            View projects library
          </Link>
        </div>
      </div>
    </section>
  </article>
);

export default HpsDeepDive;
