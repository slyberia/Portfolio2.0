import React from 'react';
import {
  northernGrindGallery,
  resolveGallerySrc,
  type GalleryCategory,
  type GalleryImage,
} from '../../data/northernGrindGallery';

// Lazy-loading, category-filterable gallery for the Northern Grind AI-built
// assets. Images come from the GCS-backed manifest; the component renders a
// graceful empty state until assets are added, so it never shows broken images.

const CATEGORIES: GalleryCategory[] = ['Brand', 'Menu', 'Social'];

const EmptyState: React.FC = () => (
  <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-8 text-center space-y-1">
    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
      Asset gallery coming soon
    </p>
    <p className="text-xs text-slate-500 dark:text-slate-400">
      The AI-built logo, menu, and social mockups are being uploaded to the project's image bucket.
    </p>
  </div>
);

export const BrandGallery: React.FC = () => {
  const [filter, setFilter] = React.useState<GalleryCategory | 'All'>('All');
  const [active, setActive] = React.useState<GalleryImage | null>(null);

  if (northernGrindGallery.length === 0) return <EmptyState />;

  const available = CATEGORIES.filter((c) => northernGrindGallery.some((g) => g.category === c));
  const images =
    filter === 'All'
      ? northernGrindGallery
      : northernGrindGallery.filter((g) => g.category === filter);

  return (
    <div className="space-y-4">
      {available.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
          {(['All', ...available] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
                filter === cat
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((img) => (
          <figure
            key={img.id}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setActive(img)}
              className="block w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={`View ${img.caption}`}
            >
              <img
                src={resolveGallerySrc(img.src)}
                alt={img.alt}
                loading="lazy"
                className="aspect-square w-full object-cover transition group-hover:opacity-90"
              />
            </button>
            <figcaption className="p-3 space-y-1">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                {img.caption}
              </p>
              {img.tool && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {img.tool}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setActive(null)}
        >
          <div className="max-w-4xl w-full space-y-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={resolveGallerySrc(active.src)}
              alt={active.alt}
              className="w-full max-h-[80vh] object-contain rounded-xl bg-white"
            />
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-white/90">{active.caption}</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="shrink-0 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-3 py-1.5"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandGallery;
