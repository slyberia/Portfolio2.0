import React from 'react';
import { CASE_STUDY_REGISTRY, SKILL_CHIP_CONFIG } from '../constants';
import { CaseStudyCategory } from '../types';

interface SkillDiscoveryModalProps {
  skill: string;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStudy: (id: string) => void;
}

const CATEGORY_TAGS: Record<CaseStudyCategory, string> = {
  'ai-ops': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  'qa-data': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'success-strategy':
    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  creative: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

const SkillDiscoveryModal: React.FC<SkillDiscoveryModalProps> = ({
  skill,
  isOpen,
  onClose,
  onNavigateToStudy,
}) => {
  const chipConfig = SKILL_CHIP_CONFIG[skill];
  const relevantStudies = chipConfig
    ? CASE_STUDY_REGISTRY.filter((study) => chipConfig.linkedSlugs.includes(study.id))
    : CASE_STUDY_REGISTRY.filter((study) => study.tags.includes(skill));
  const isSecondary = chipConfig?.linkMode === 'secondary';
  const evidenceNote = chipConfig?.evidenceNote;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-slate-950/40 dark:bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2">
              Relational Discovery
            </div>
            <h2 className="text-3xl font-outfit font-bold text-navy-900 dark:text-white flex items-center gap-3">
              Skill: <span className="text-indigo-600 dark:text-indigo-400">{skill}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors"
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
              <path d="m6 6 18 18" />
            </svg>
          </button>
        </div>

        <div className="p-8 max-h-[60vh] overflow-y-auto chat-scroll space-y-6">
          {relevantStudies.length > 0 ? (
            <>
              {isSecondary && evidenceNote && (
                <div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-700 dark:text-amber-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mt-0.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <p className="text-xs leading-relaxed">{evidenceNote}</p>
                </div>
              )}
              <div className="grid gap-4">
                {relevantStudies.map((study) => (
                  <button
                    key={study.id}
                    onClick={() => {
                      onNavigateToStudy(study.id);
                      onClose();
                    }}
                    className="text-left w-full group p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${CATEGORY_TAGS[study.category]}`}
                      >
                        {study.category.replace('-', ' ')}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-outfit font-bold text-navy-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {study.rationale}
                    </p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                </svg>
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                No specific case study found for this skill yet. Reach out to learn more!
              </p>
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-50 dark:bg-white/5 border-t border-black/5 dark:border-white/5 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Mapping the architecture of operational success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillDiscoveryModal;
