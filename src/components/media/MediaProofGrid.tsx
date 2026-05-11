import React from 'react';
import { MediaAsset } from '../../types';

interface MediaProofGridProps {
  title?: string;
  description?: string;
  assets: MediaAsset[];
  maxItems?: number;
}

/**
 * MediaProofGrid - A reusable component to display visual evidence
 * from the Media Registry.
 */
const MediaProofGrid: React.FC<MediaProofGridProps> = ({
  title = 'Visual Evidence',
  description,
  assets,
  maxItems,
}) => {
  const visibleAssets = assets.slice(0, maxItems);

  if (visibleAssets.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-navy-900 dark:text-white">{title}</h3>
        {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleAssets.map((asset) => (
          <div
            key={asset.id}
            className="glass-card overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 flex flex-col"
          >
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden">
              <img
                src={asset.src}
                alt={asset.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {asset.captureStatus === 'pending-review' && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-md bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
                    Pending Review
                  </span>
                </div>
              )}
              {asset.viewport && (
                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-1 rounded-md bg-black/40 text-white/90 text-[10px] font-medium backdrop-blur-sm border border-white/10 uppercase tracking-tighter">
                    {asset.viewport}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 space-y-2 flex-grow">
              <p className="text-sm font-medium text-navy-900 dark:text-white leading-snug">
                {asset.caption}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {asset.mediaType.replace('-', ' ')}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                  ID: {asset.id}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaProofGrid;
