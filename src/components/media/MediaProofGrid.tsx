import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MediaAsset } from '../../types';

interface MediaProofGridProps {
  title?: string;
  description?: string;
  assets: MediaAsset[];
  maxItems?: number;
}

const getProjectLink = (projectId: string) => {
  if (projectId === 'portfolio-v2' || projectId === 'codex-technical-tide') {
    return '/projects/digital-twin';
  }
  if (projectId === 'spatial-intel-ops' || projectId === 'guynode') {
    return '/projects/guynode';
  }
  return `/projects/${projectId}`;
};

/**
 * MediaProofGrid - An interactive component to display visual evidence
 * with expandable zoom modals and direct case study routes.
 */
const MediaProofGrid: React.FC<MediaProofGridProps> = ({
  title = 'Visual Evidence',
  description,
  assets,
  maxItems,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const visibleAssets = assets.slice(0, maxItems);

  if (visibleAssets.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-bold text-ink-navy dark:text-white">{title}</h3>}
          {description && (
            <p className="text-sm text-slate-650 dark:text-slate-350">{description}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleAssets.map((asset) => {
          const projectLink = getProjectLink(asset.projectId);
          return (
            <div
              key={asset.id}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-amber-500/40 dark:hover:border-amber-500/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedAsset(asset)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedAsset(asset);
                    }
                  }}
                  aria-label={`Expand image: ${asset.alt}`}
                  className="relative aspect-video bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden cursor-zoom-in border border-slate-100 dark:border-slate-800 group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors"
                >
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-955/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-full bg-slate-950/80 text-white text-[11px] font-semibold border border-white/10 uppercase tracking-wider transition-opacity shadow-lg backdrop-blur-sm">
                      Click to Expand
                    </span>
                  </div>
                  {asset.viewport && (
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-1 rounded-md bg-black/70 text-white/90 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                        {asset.viewport}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-ink-navy dark:text-white leading-snug">
                    {asset.caption}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      {asset.mediaType.replace('-', ' ')}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-750" />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                      ID: {asset.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedAsset(asset)}
                  className="text-xs font-semibold text-[#237f86] dark:text-tide-sky hover:underline underline-offset-2 focus:outline-none"
                >
                  View Large Image
                </button>
                <Link
                  to={projectLink}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#237f86] dark:hover:text-tide-sky focus:outline-none uppercase tracking-wider"
                >
                  Go to Case Study <span>→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAsset && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 animate-fade-in">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedAsset(null)}
          />
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-zoom-in flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-tide-aqua dark:text-tide-sky">
                  Visual Proof Artifact
                </span>
                <h3 className="text-xl font-bold text-ink-navy dark:text-white mt-1">
                  {selectedAsset.alt}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 hover:text-ink-navy dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-grow flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950/40 min-h-0">
              <div className="relative w-full h-full flex justify-center items-center max-h-[55vh]">
                <img
                  src={selectedAsset.src}
                  alt={selectedAsset.alt}
                  className="max-w-full max-h-full object-contain rounded-lg border border-slate-200 dark:border-slate-800 shadow-md"
                />
              </div>
              <div className="mt-6 w-full text-center space-y-2">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
                  {selectedAsset.caption}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Surface Viewport:{' '}
                  <span className="font-semibold uppercase">{selectedAsset.viewport}</span> ·
                  Target: <span className="font-semibold">{selectedAsset.projectId}</span>
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
              <Link
                to={getProjectLink(selectedAsset.projectId)}
                onClick={() => setSelectedAsset(null)}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
              >
                Go to Case Study <span>→</span>
              </Link>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-905 text-sm font-semibold transition-colors focus:outline-none"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaProofGrid;
