import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
  useOutletContext,
} from 'react-router-dom';
import HomeView from './views/HomeView';
import BottomTabBar from './components/BottomTabBar';
import TopNav from './components/TopNav';
import CaseStudyView from './views/CaseStudyView';
import ResumeView from './views/ResumeView';
import ImplementationTrackView from './views/ImplementationTrackView';
import OpsAnalyticsTrackView from './views/OpsAnalyticsTrackView';
import GisTrackView from './views/GisTrackView';
import DeepDiveView from './views/DeepDiveView';
import ContactModal from './components/ContactModal';
import CommandPalette from './components/CommandPalette';
import ChatWidget from './components/ChatWidget';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import { buildCaseStudyHref, SUPPORTING_EVIDENCE_DEFAULT_HREF } from './lib/routes';
import { useRecruiterMode } from './context/RecruiterModeContext';

type LayoutContext = {
  onNavigateToCaseStudy: (id?: string) => void;
  onOpenContact: () => void;
};

export const RouteErrorFallback: React.FC = () => (
  <div
    data-testid="route-error"
    className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400 text-sm font-medium flex items-center gap-3"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    <span>This section is currently unavailable due to a technical error.</span>
  </div>
);

export const AppLayout: React.FC = () => {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [isContactOpen, setIsContactOpen] = useState(false);

  const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({
    message: '',
    isVisible: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  // Allow child components (e.g. recruiter CTA) to open contact modal via custom event
  useEffect(() => {
    const handler = () => setIsContactOpen(true);
    window.addEventListener('open-contact', handler);
    return () => window.removeEventListener('open-contact', handler);
  }, []);


  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
  };

  const handleCopyEmail = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Email copied to clipboard');
  };

  const navigateToCaseStudy = (id?: string) => {
    navigate(id ? buildCaseStudyHref(id) : SUPPORTING_EVIDENCE_DEFAULT_HREF);
  };

  const navigateToResume = () => navigate('/resume');

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleCommandNavigation = (path: string) => {
    if (path === 'home') {
      navigate('/');
    } else if (path === 'case-study') {
      navigateToCaseStudy();
    } else if (path === 'resume') {
      navigateToResume();
    } else if (path.startsWith('case-study:')) {
      navigateToCaseStudy(path.split(':')[1]);
    } else if (path === 'experience' || path === 'skills' || path.startsWith('#')) {
      const id = path.replace('#', '');
      scrollToSection(id);
    }
  };

  const handleCommandAction = (action: string) => {
    if (action === 'contact') setIsContactOpen(true);
    if (action === 'resume') navigateToResume();
  };

  const isOnResume = location.pathname === '/resume';

  const context: LayoutContext = {
    onNavigateToCaseStudy: navigateToCaseStudy,
    onOpenContact: () => setIsContactOpen(true),
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-500">
      <TopNav theme={theme} toggleTheme={toggleTheme} onOpenContact={() => setIsContactOpen(true)} />

      <div className="pt-20 pb-16 md:pb-0">
        {/* Recruiter Mode Banner */}
        {isRecruiterMode && (
          <div className="bg-emerald-500 text-white px-6 py-3 flex items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-bold">
                Recruiter Mode Active — Simplified view for hiring review
              </span>
            </div>
            <button
              onClick={toggleRecruiterMode}
              className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none"
              aria-label="Exit recruiter mode"
            >
              Exit
            </button>
          </div>
        )}

        <main className="transition-opacity duration-300">
          <Outlet context={context} />
        </main>

        {/* Footer / Contact */}
        {!isOnResume && (
          <footer
            id="contact"
            className="py-20 px-6 border-t border-[#e4dfd7] dark:border-white/5 relative bg-[#f9f7f3] dark:bg-[#1a1712] overflow-hidden scroll-mt-24 transition-colors duration-500"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-[#e4dfd7] dark:bg-white/5"></div>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h2 className="text-4xl font-outfit font-extrabold text-navy-900 dark:text-white">
                  Open to AI-forward{' '}
                  <span className="text-indigo-500">Customer Success and Solutions</span> roles
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  I'm looking for my next challenge in an AI-forward company that values operational
                  excellence.
                </p>

                <div className="flex flex-wrap gap-4">
                  {/* Email Button */}
                  <button
                    onClick={() => handleCopyEmail('kmsemple26@gmail.com')}
                    className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group text-left p-2 rounded-2xl hover:bg-indigo-500/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 transition-all">
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
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">kmsemple26@gmail.com</span>
                      <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold">
                        Copy Email
                      </span>
                    </div>
                  </button>

                  {/* LinkedIn Link */}
                  <a
                    href="https://www.linkedin.com/in/kyle-semple-522537165/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group text-left p-2 rounded-2xl hover:bg-blue-500/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all">
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
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Professional Profile</span>
                      <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">
                        LinkedIn Profile
                      </span>
                    </div>
                  </a>

                  {/* Resume Button */}
                  <button
                    onClick={navigateToResume}
                    className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group text-left p-2 rounded-2xl hover:bg-emerald-500/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all">
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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Resume (Print/PDF)</span>
                      <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">
                        Open Resume
                      </span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs">
                    Based in
                  </span>
                  <span className="text-navy-900 dark:text-white font-outfit text-xl">
                    Ann Arbor, MI
                  </span>
                </div>
                <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <span className="text-slate-400 dark:text-slate-600 text-sm">
                    © 2024 Kyle Semple. All Rights Reserved.
                  </span>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.linkedin.com/in/kyle-semple-522537165/"
                      target="_blank"
                      rel="noopener"
                      className="text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
      <BottomTabBar />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onCopyEmail={handleCopyEmail}
      />
      <CommandPalette onNavigate={handleCommandNavigation} onAction={handleCommandAction} />
      <ChatWidget
        onNavigate={handleCommandNavigation}
        onAction={handleCommandAction}
        onShowToast={showToast}
      />
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

const HomeWrapper: React.FC = () => {
  const { onNavigateToCaseStudy, onOpenContact } = useOutletContext<LayoutContext>();
  return (
    <ErrorBoundary location="HomeView">
      <HomeView onNavigateToCaseStudy={onNavigateToCaseStudy} onOpenContact={onOpenContact} />
    </ErrorBoundary>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const routeDefinitions = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, element: <HomeWrapper /> },
      {
        path: 'case-studies',
        element: <Navigate to={SUPPORTING_EVIDENCE_DEFAULT_HREF} replace />,
      },
      {
        path: 'case-studies/:studyId',
        element: (
          <ErrorBoundary location="CaseStudyView">
            <CaseStudyView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'tracks/implementation',
        element: (
          <ErrorBoundary location="ImplementationTrackView">
            <ImplementationTrackView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'tracks/ops-analytics',
        element: (
          <ErrorBoundary location="OpsAnalyticsTrackView">
            <OpsAnalyticsTrackView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'tracks/gis',
        element: (
          <ErrorBoundary location="GisTrackView">
            <GisTrackView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'portfolio2/deep-dive',
        element: (
          <ErrorBoundary location="DeepDiveView">
            <DeepDiveView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'resume',
        element: (
          <ErrorBoundary location="ResumeView">
            <ResumeView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'resume/implementation',
        element: <Navigate to="/resume" replace />,
      },
    ],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter(routeDefinitions);
