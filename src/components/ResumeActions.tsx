import React, { useEffect, useRef, useState } from 'react';
import { interactionStyles } from '../lib/design-system';
import { RESUME_CONTENT } from '../data/resumeContent';

// Compact, professional action bar for the résumé page. Primary action is a real PDF
// download (public/Kyle-Semple-Resume.pdf, generated from the dedicated print template);
// Print / Save PDF remains as a secondary browser-print fallback. Sharing covers link
// copy, native share (when supported), email (mailto), Gmail compose, and LinkedIn — all
// without third-party scripts, SDKs, or tracking.

const RESUME_PDF_PATH = '/Kyle-Semple-Resume.pdf';
const SHARE_SUBJECT = 'Kyle Semple Resume';
const POSITIONING_LINE = RESUME_CONTENT.title;

const baseButton = `inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${interactionStyles.focusVisible}`;
const primaryButtonClass = `${baseButton} bg-tide-aqua text-white hover:bg-tide-aqua/90`;
const buttonClass = `${baseButton} border border-ink-border bg-white text-ink-navy hover:bg-ink-mist dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800`;

const iconProps = {
  className: 'w-4 h-4 shrink-0',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const ResumeActions: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Feature-detect the Web Share API on mount; desktop browser support varies, so the
  // explicit Email / Gmail / LinkedIn / Copy buttons remain the reliable cross-browser path.
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const resumeUrl = typeof window !== 'undefined' ? `${window.location.origin}/resume` : '/resume';
  const shareBody = `${POSITIONING_LINE}\n\nResume: ${resumeUrl}`;

  const announce = (message: string) => {
    setFeedback(message);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(''), 4000);
  };

  const handlePrint = () => window.print();

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(resumeUrl);
        announce('Resume link copied.');
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      // Fallback: surface the URL so the visitor can copy it manually.
      announce(`Copy failed — link: ${resumeUrl}`);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: SHARE_SUBJECT,
        text: POSITIONING_LINE,
        url: resumeUrl,
      });
    } catch {
      // User dismissed the share sheet or it failed — fall back to copying the link.
      void handleCopyLink();
    }
  };

  const mailtoHref = `mailto:?subject=${encodeURIComponent(SHARE_SUBJECT)}&body=${encodeURIComponent(
    shareBody,
  )}`;

  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
    SHARE_SUBJECT,
  )}&body=${encodeURIComponent(shareBody)}`;

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    resumeUrl,
  )}`;

  return (
    <div className="mb-8 print:hidden">
      <div className="flex flex-wrap items-center gap-2.5">
        <a href={RESUME_PDF_PATH} download className={primaryButtonClass}>
          <svg {...iconProps}>
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          Download PDF
        </a>

        <button type="button" onClick={handlePrint} className={buttonClass}>
          <svg {...iconProps}>
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect width="12" height="8" x="6" y="14" />
          </svg>
          Print / Save PDF
        </button>

        <button type="button" onClick={handleCopyLink} className={buttonClass}>
          <svg {...iconProps}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          Copy Link
        </button>

        {canNativeShare && (
          <button type="button" onClick={handleShare} className={buttonClass}>
            <svg {...iconProps}>
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        )}

        <a href={mailtoHref} className={buttonClass}>
          <svg {...iconProps}>
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Email
        </a>

        <a href={gmailHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          <svg {...iconProps}>
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m2 7 10 6 10-6" />
          </svg>
          Gmail
        </a>

        <a href={linkedInHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          <svg {...iconProps}>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          LinkedIn
        </a>
      </div>

      {/* Polite live region so the copy/share confirmation reaches assistive tech. */}
      <p
        aria-live="polite"
        className={`mt-2 text-sm font-medium text-[#237f86] dark:text-tide-sky ${
          feedback ? '' : 'sr-only'
        }`}
      >
        {feedback}
      </p>
    </div>
  );
};

export default ResumeActions;
