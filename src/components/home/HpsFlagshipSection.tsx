import { Link } from 'react-router-dom';
import { HPS_GEOSPATIAL_HREF } from '../../lib/routes';

const evidence = [
  {
    number: '17',
    label: 'browser regressions resolved',
    context: 'Reliability phase: 98 browser tests passed; 228 backend tests passed.',
  },
  {
    number: '33/33',
    label: 'browser workflow matrix',
    context: 'PNG → provenance → Recovery → GeoTIFF, with 266 backend tests passed.',
  },
  {
    number: '26',
    label: 'country entries audited',
    context: '5 verified, 10 partial, 10 unavailable, 1 retained legacy result.',
  },
] as const;

const HpsFlagshipSection = () => (
  <section
    aria-labelledby="hps-flagship-heading"
    className="border-b border-[#d8e8ee] bg-white px-6 py-16 dark:border-white/10 dark:bg-slate-950"
  >
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="space-y-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#237f86] dark:text-tide-sky">
          FLAGSHIP SYSTEM · HPS GEOSPATIAL
        </p>
        <h2
          id="hps-flagship-heading"
          className="font-outfit text-3xl font-semibold text-ink-navy dark:text-white md:text-4xl"
        >
          GIS design, spatial data, and georeferencing in one workflow
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
          I worked across the HPS GIS design portal: country-aware river-name artifacts, poster
          production, a controlled Studio-to-Georeferencer handoff, provenance checks, Recovery, and
          an audit that keeps verified, partial, and unavailable coverage distinct.
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The end-to-end workflow evidence is local and synthetic. Publication deployment and live
          production-database behavior need separate verification.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to={HPS_GEOSPATIAL_HREF}
            className="inline-flex rounded-lg border border-[#0d9488] bg-[#0d9488] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f766e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua dark:border-tide-sky dark:bg-tide-sky dark:text-ink-navy"
          >
            Explore the HPS case study →
          </Link>
          <span className="text-xs text-slate-600 dark:text-slate-300">
            Problem → system → decisions → evidence
          </span>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1" aria-label="Selected HPS evidence">
        {evidence.map((item) => (
          <div
            key={item.number}
            className="rounded-xl border border-[#d8e8ee] bg-[#f8fbfd] p-4 dark:border-white/10 dark:bg-slate-900"
          >
            <p className="font-outfit text-2xl font-semibold text-[#1e6b70] dark:text-tide-sky">
              {item.number}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink-navy dark:text-white">{item.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {item.context}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HpsFlagshipSection;
