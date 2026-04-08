import React from 'react';

interface HTMLSectionProps {
  content: string;
  isLoading?: boolean;
}

const HTMLSection: React.FC<HTMLSectionProps> = ({ content, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl animate-pulse">
        <div className="h-8 bg-slate-800 rounded w-1/3 mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-5/6"></div>
          <div className="h-4 bg-slate-800 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto relative group">
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Container */}
      <div className="relative">
         <div className="absolute top-0 right-0 p-4 z-10">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold bg-slate-900/10 border border-slate-900/10 px-2 py-1 rounded">Provisioned via HTML</span>
        </div>
        {/* Render HTML Content */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default HTMLSection;