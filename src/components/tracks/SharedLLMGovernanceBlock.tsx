import React from 'react';
import { Link } from 'react-router-dom';

interface GovernanceLink {
  label: string;
  href: string;
}

interface SharedLLMGovernanceBlockProps {
  headline: string;
  copy: string;
  links?: GovernanceLink[];
}

const SharedLLMGovernanceBlock: React.FC<SharedLLMGovernanceBlockProps> = ({
  headline,
  copy,
  links,
}) => {
  return (
    <div className="glass-card rounded-2xl p-8 border-l-4 border-indigo-500/40 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-indigo-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a10 10 0 1 0 10 10" />
            <path d="M12 12v-2" />
            <path d="M12 16h.01" />
            <path d="M18 2v4" />
            <path d="M20 4h-4" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-navy-900 dark:text-white leading-snug">
          {headline}
        </h3>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{copy}</p>
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-2">
          {links.map((link) => {
            const isExternal = link.href.startsWith('http');
            const className =
              'text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-2';
            if (isExternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {link.label} →
                </a>
              );
            }
            return (
              <Link key={link.href} to={link.href} className={className}>
                {link.label} →
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SharedLLMGovernanceBlock;
