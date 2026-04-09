import React, { useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyEmail?: (text: string) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onCopyEmail }) => {
  // Obfuscated parts for simple bot deterrent
  const emailUser = 'kmsemple26';
  const emailDomain = 'gmail.com';
  const fullEmail = `${emailUser}@${emailDomain}`;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCopyEmail) {
      onCopyEmail(text);
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const navigateToResume = () => {
    window.location.hash = 'resume';
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-colors duration-500">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900/90 border border-black/5 dark:border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <div className="absolute top-0 right-0 p-6">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
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

        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
              Contact
            </div>
            <h2 className="text-3xl font-outfit font-bold text-navy-900 dark:text-white">
              Let's Connect
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Currently accepting new opportunities in AI Operations & Customer Success.
            </p>
          </div>

          <div className="space-y-3">
            {/* Email - Split Action */}
            <div className="flex gap-2">
              <a
                href={`mailto:${fullEmail}`}
                className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-transform shadow-sm">
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
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold mb-0.5">
                    Email
                  </div>
                  <div className="text-navy-900 dark:text-white font-medium truncate">
                    {fullEmail}
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors shrink-0"
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
              </a>

              <button
                onClick={(e) => handleCopy(e, fullEmail)}
                className="w-16 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 text-slate-400 transition-all shadow-sm dark:shadow-none"
                aria-label="Copy email address"
                title="Copy to clipboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/kyle-semple-522537165/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all group shadow-sm hover:shadow-blue-500/10"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-transform">
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
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold mb-0.5">
                  LinkedIn
                </div>
                <div className="text-navy-900 dark:text-white font-medium">Connect on LinkedIn</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors"
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
            </a>

            {/* Resume Link */}
            <button
              onClick={navigateToResume}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all group shadow-sm hover:shadow-emerald-500/10"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-transform">
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold mb-0.5">
                  Resume
                </div>
                <div className="text-navy-900 dark:text-white font-medium">
                  View & Save PDF Resume
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-white transition-colors"
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
