
import React, { useState } from 'react';
import { CaseStudyArtifact, CaseStudyRigor, CaseStudyEntry } from '../types';
import MarkdownSection, { CodeBlock } from './MarkdownSection';
import AuditLog from './AuditLog';

export const RigorCard: React.FC<{ rigor: CaseStudyRigor; title?: string; className?: string }> = ({ rigor, title, className = "mb-12" }) => (
  <div className={`${className} glass-card rounded-3xl border border-indigo-500/20 overflow-hidden relative group/rigor shadow-xl shadow-indigo-500/5`}>
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover/rigor:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
    </div>
    <div className="p-8 md:p-12 bg-indigo-500/5 border-b border-indigo-500/10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <h4 className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] font-outfit">{title || 'Operational Rigor Protocol'}</h4>
      </div>
      <p className="text-navy-900 dark:text-white font-outfit text-lg font-bold leading-tight">"{rigor.statement}"</p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/5 dark:divide-white/5">
      {[
        { label: 'Baseline', val: rigor.baseline, icon: '📉' },
        { label: 'Definition', val: rigor.definition, icon: '🎯' },
        { label: 'Method', val: rigor.method, icon: '🧪' },
        { label: 'Window', val: rigor.window, icon: '⏱️' }
      ].map((item, i) => (
        <div key={i} className="p-6 md:p-8 hover:bg-white/5 transition-colors">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>{item.icon}</span> {item.label}
          </div>
          <div className="text-[13px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed break-words">{item.val}</div>
        </div>
      ))}
    </div>
  </div>
);

export const HtmlPreviewCard: React.FC<{ content: string; label: string; description?: string; isHero?: boolean; accentColor?: string }> = ({ content, label, description, isHero = false, accentColor = 'indigo' }) => {
  const handleLaunch = () => {
    const blob = new Blob([content], { type: 'text/html' });
    window.open(URL.createObjectURL(blob), '_blank');
  };
  const isRed = accentColor === 'red';
  return (
    <div className={`glass-card rounded-3xl border overflow-hidden shadow-lg transition-all duration-500 ${isRed ? 'border-red-500/20' : 'border-indigo-500/20'} ${isHero ? 'mb-12' : ''} flex flex-col`}>
      <div className="px-8 md:px-12 py-5 bg-slate-50 dark:bg-white/5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <span className="text-[11px] font-bold text-navy-900 dark:text-white font-outfit tracking-wide">{label}</span>
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${isRed ? 'bg-red-500/10 text-red-400' : 'bg-indigo-500/10 text-indigo-400'}`}>Interactive Prototype</span>
      </div>
      <div className={`relative ${isHero ? 'h-[500px]' : 'h-96'} bg-slate-100 dark:bg-slate-900 w-full overflow-hidden cursor-pointer group/preview`} onClick={handleLaunch}>
        <iframe srcDoc={content} title={label} className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none opacity-60 transition-all duration-500 group-hover/preview:opacity-100 group-hover/preview:scale-[0.51]" tabIndex={-1} />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 dark:bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity backdrop-blur-sm">
          <button className="bg-white dark:bg-slate-800 text-navy-900 dark:text-white px-8 py-3.5 rounded-full text-[13px] font-bold shadow-2xl flex items-center gap-3">Launch Prototype</button>
        </div>
      </div>
      {description && <div className="p-8 md:p-12 bg-slate-50/50 dark:bg-black/20 text-[11px] text-slate-500 leading-relaxed italic border-t border-black/5">{description}</div>}
    </div>
  );
};

export const TabsArtifact: React.FC<{ artifacts: CaseStudyArtifact[] }> = ({ artifacts }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeArt = artifacts[activeIndex];

  return (
    <div className="glass-card rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden shadow-lg">
      <div className="px-4 py-2 bg-slate-50 dark:bg-white/5 border-b border-black/5 dark:border-white/10 flex gap-1 overflow-x-auto scrollbar-hide">
        {artifacts.map((art, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
              i === activeIndex 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-500 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {art.label}
          </button>
        ))}
      </div>
      <div className="p-0">
        {activeArt.type === 'audit-log' && activeArt.auditData ? (
          <AuditLog data={activeArt.auditData} />
        ) : activeArt.type === 'code' ? (
          <div className="max-h-[400px] overflow-y-auto chat-scroll">
            <CodeBlock className="my-0 rounded-none border-0 pt-8 px-8 md:px-12">{activeArt.content as string}</CodeBlock>
          </div>
        ) : (
          <div className="p-8 md:p-12 text-sm text-slate-500 italic">Preview not available for this tab type.</div>
        )}
      </div>
    </div>
  );
};

export const ArtifactGallery: React.FC<{ artifacts: Exclude<CaseStudyEntry['artifacts'], undefined> }> = ({ artifacts }) => (
  <div className="space-y-8 my-16">
    <div className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-slate-400" /><h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] font-outfit">Evidence Vault</h4><div className="h-px w-full bg-black/5 dark:bg-white/5" /></div>
    <div className="grid gap-10">
      {artifacts.map((art, i) => (
        <div key={i} className="min-w-0">
            {art.type === 'html' ? (
                <HtmlPreviewCard content={art.content as string} label={art.label} description={art.description} />
            ) : art.type === 'insight' && art.data ? (
                <div className="space-y-2"><RigorCard rigor={art.data} title={art.label.toUpperCase()} className="mb-0" /></div>
            ) : art.type === 'audit-log' && art.auditData ? (
                <div className="glass-card rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden shadow-lg">
                   <AuditLog data={art.auditData} />
                </div>
            ) : art.type === 'tabs' && Array.isArray(art.content) ? (
                <TabsArtifact artifacts={art.content as CaseStudyArtifact[]} />
            ) : (
                <div className="glass-card rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden shadow-lg">
                <div className="px-8 md:px-12 py-5 bg-slate-50 dark:bg-white/5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-navy-900 dark:text-white font-outfit tracking-wide">{art.label}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md">{art.type}</span>
                </div>
                <div className="p-0">
                    {art.type === 'code' ? <div className="max-h-[400px] overflow-y-auto chat-scroll"><CodeBlock className="my-0 rounded-none border-0 pt-8 px-8 md:px-12">{art.content as string}</CodeBlock></div> : null}
                </div>
                {art.description && <div className="p-8 md:p-12 bg-slate-50/50 dark:bg-black/20 text-[11px] text-slate-500 leading-relaxed italic border-t border-black/5">{art.description}</div>}
                </div>
            )}
        </div>
      ))}
    </div>
  </div>
);

export const TradeoffLog: React.FC<{ constraints: Exclude<CaseStudyEntry['constraints'], undefined> }> = ({ constraints }) => (
  <div className="my-16 space-y-8">
     <div className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-slate-400" /><h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] font-outfit">Decision Journal</h4><div className="h-px w-full bg-black/5 dark:bg-white/5" /></div>
    <div className="grid gap-4">
      {constraints.map((c, i) => (
        <div key={i} className="grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900/50 border border-black/5 shadow-sm">
             <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-3 font-outfit">The Constraint</div>
             <p className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{c.problem}</p>
          </div>
          <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 shadow-sm">
             <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3 font-outfit">The Operational Choice</div>
             <p className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{c.tradeoff}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
