import React from 'react';
import { Link } from 'react-router-dom';

interface ArtifactItem {
  label: string;
  href: string;
}

interface SupportingArtifactsGridProps {
  items: ArtifactItem[];
}

const SupportingArtifactsGrid: React.FC<SupportingArtifactsGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item) => {
        const isExternal = item.href.startsWith('http');
        const className =
          'flex items-center justify-between gap-3 px-4 py-3 glass-card rounded-xl group transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500/30';
        const inner = (
          <>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {item.label}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0"
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
          </>
        );

        if (isExternal) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {inner}
            </a>
          );
        }

        return (
          <Link key={item.href} to={item.href} className={className}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
};

export default SupportingArtifactsGrid;
