import React, { useEffect } from 'react';
import { useRecruiterMode } from '../context/RecruiterModeContext';

const ApplyGisView: React.FC = () => {
  const { setRecruiterMode } = useRecruiterMode();

  // Ensure recruiter mode is active when hitting this start path
  useEffect(() => {
    setRecruiterMode(true);
  }, [setRecruiterMode]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-outfit font-extrabold text-navy-900 dark:text-white">
          GIS & Spatial Systems Profile
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
          Unlocking the value of spatial data through governed catalogs and robust metadata.
        </p>
      </header>

      <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5">
        <p className="text-slate-500 dark:text-slate-400">
          [Placeholder: Phase 7.2 Proof Bundle Assembly for GIS/Spatial]
        </p>
      </div>
    </div>
  );
};

export default ApplyGisView;
