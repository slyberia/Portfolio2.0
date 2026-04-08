
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownSectionProps {
  content: string;
  isLoading?: boolean;
  imageBasePath?: string;
}

export const CodeBlock: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const codeContent = React.Children.toArray(children).join('').trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/code my-8">
      <div className="absolute top-0 right-0 p-3 flex items-center gap-2 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-black/5 dark:border-white/5 uppercase tracking-widest">
            Snippet
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-navy-900 dark:hover:text-white shadow-sm"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          )}
        </button>
      </div>
      <pre className={`rounded-2xl overflow-x-auto bg-slate-50 dark:bg-slate-950/80 p-5 pt-12 border border-slate-200 dark:border-indigo-500/40 text-slate-900 dark:text-indigo-50 font-mono text-sm leading-relaxed shadow-sm dark:shadow-[0_0_20px_rgba(99,102,241,0.05)] transition-all duration-300 group-hover/code:dark:border-indigo-500/60 ${className}`}>
        {children}
      </pre>
    </div>
  );
};

const MarkdownSection: React.FC<MarkdownSectionProps> = ({ content, isLoading = false, imageBasePath }) => {
  if (isLoading) {
    return (
      <div className="glass-card p-12 rounded-3xl animate-pulse" role="status">
        <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded w-1/3 mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!content) return null;

  const transformUrl = (url: string) => {
    if (url.startsWith('http') || url.startsWith('/') || url.startsWith('#')) return url;
    if (imageBasePath) {
      const cleanBase = imageBasePath.endsWith('/') ? imageBasePath : `${imageBasePath}/`;
      return `${cleanBase}${url}`;
    }
    return url;
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 blur-xl opacity-75 rounded-3xl dark:opacity-75" aria-hidden="true"></div>
      
      <div className="relative glass-card p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/10 transition-colors duration-500">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-indigo">
          <ReactMarkdown 
            urlTransform={transformUrl}
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({node, ...props}) => <h1 {...props} className="font-outfit font-bold text-navy-900 dark:text-white" />,
                h2: ({node, ...props}) => <h2 {...props} className="font-outfit font-bold text-navy-900 dark:text-white mt-12 mb-6" />,
                h3: ({node, ...props}) => <h3 {...props} className="font-outfit font-bold text-navy-900 dark:text-white mt-8 mb-4" />,
                pre: ({node, ...props}: any) => <CodeBlock {...props} />,
                img: ({node, ...props}) => (
                    <span className="block my-10 relative">
                        <img
                            {...props}
                            loading="lazy"
                            className="rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 w-full h-auto"
                            alt={props.alt || 'Case study visual'}
                        />
                    </span>
                ),
                a: ({node, ...props}) => (
                    <a {...props} className="text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 decoration-indigo-500/30 transition-colors font-medium" />
                ),
                blockquote: ({node, ...props}) => (
                    <blockquote {...props} className="border-l-4 border-indigo-600 dark:border-indigo-500 pl-6 italic text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/30 py-6 pr-4 rounded-r-lg" />
                ),
                table: ({node, ...props}) => (
                  <div className="my-12 overflow-x-auto rounded-3xl border border-indigo-500/10 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-2xl shadow-indigo-500/5 ring-1 ring-black/5 dark:ring-white/5">
                    <table {...props} className="w-full text-left border-collapse table-fixed" />
                  </div>
                ),
                thead: ({node, ...props}) => (
                  <thead {...props} className="bg-slate-50/80 dark:bg-white/5 border-b border-black/5 dark:border-white/10" />
                ),
                th: ({node, ...props}) => (
                  <th {...props} className="p-5 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 font-outfit" />
                ),
                td: ({node, ...props}) => (
                  <td {...props} className="p-5 text-sm text-slate-600 dark:text-slate-300 border-b border-black/5 dark:border-white/5 last:border-0 align-top" />
                ),
                tr: ({node, ...props}) => (
                  <tr {...props} className="hover:bg-indigo-500/[0.02] dark:hover:bg-indigo-500/[0.04] transition-colors" />
                )
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownSection;
