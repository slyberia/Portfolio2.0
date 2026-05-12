import React from 'react';
import { Link } from 'react-router-dom';
import { MediaAsset } from '../../types';
import MediaProofGrid from '../media/MediaProofGrid';

export interface ProofBlockCardProps {
  id: string;
  title: string;
  summary: string;
  whyItMatters: string;
  artifactChips: string[];
  href: string;
  relatedMedia?: MediaAsset[];
}

const ProofBlockCard: React.FC<ProofBlockCardProps> = ({
  title,
  summary,
  whyItMatters,
  artifactChips,
  href,
  relatedMedia,
}) => {
  const isExternal = href.startsWith('http');
  const isInternal = !isExternal;

  const cardContent = (
    <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 h-full group transition-all duration-300 hover:-translate-y-1 hover:border-tide-aqua/30 cursor-pointer">
      <div className="space-y-4">
        <h3 className="text-base font-bold text-navy-900 dark:text-white leading-snug group-hover:text-tide-aqua dark:group-hover:text-tide-softBlue transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{summary}</p>
        <div className="border-t border-black/5 dark:border-white/5 pt-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Why it matters
          </span>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {whyItMatters}
          </p>
        </div>
      </div>

      {relatedMedia && relatedMedia.length > 0 && (
        <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 pointer-events-none">
          <MediaProofGrid assets={relatedMedia} maxItems={2} title="" />
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
        {artifactChips.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs font-medium"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );

  if (isInternal) {
    return (
      <Link to={href} className="block" aria-label={`View full proof: ${title}`}>
        {cardContent}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      aria-label={`View external proof: ${title} (opens in new tab)`}
    >
      {cardContent}
    </a>
  );
};

export default ProofBlockCard;
