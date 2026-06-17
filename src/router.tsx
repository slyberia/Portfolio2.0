import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
  useOutletContext,
  Link,
  useParams,
} from 'react-router-dom';
import HomeView from './views/HomeView';
import BottomTabBar from './components/BottomTabBar';
import TopNav from './components/TopNav';
import ProjectDetailView from './views/ProjectDetailView';
import ProjectsIndexView from './views/ProjectsIndexView';
import ResumeView from './views/ResumeView';
import ImplementationTrackView from './views/ImplementationTrackView';
import OpsAnalyticsTrackView from './views/OpsAnalyticsTrackView';
import GisTrackView from './views/GisTrackView';
import ApplyImplementationView from './views/ApplyImplementationView';
import ApplyOpsAnalyticsView from './views/ApplyOpsAnalyticsView';
import ApplyGisView from './views/ApplyGisView';
import DeepDiveView from './views/DeepDiveView';
import SiteIndexView from './views/SiteIndexView';
import GalleryView from './views/GalleryView';
import ContactModal from './components/ContactModal';
import CommandPalette from './components/CommandPalette';
import ChatWidget from './components/ChatWidget';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import RouteSeo from './components/RouteSeo';
import {
  SITE_INDEX_HREF,
  buildProjectHref,
  PROJECTS_DEFAULT_HREF,
  DEEP_DIVES_HREF,
} from './lib/routes';
import { useRecruiterMode } from './context/RecruiterModeContext';

type LayoutContext = {
  onNavigateToProject: (id?: string) => void;
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

  const navigateToProject = (id?: string) => {
    navigate(id ? buildProjectHref(id) : PROJECTS_DEFAULT_HREF);
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
    } else if (path === 'deep-dives') {
      navigate(DEEP_DIVES_HREF);
    } else if (path === 'project') {
      navigateToProject();
    } else if (path === 'resume') {
      navigateToResume();
    } else if (path.startsWith('project:') || path.startsWith('case-study:')) {
      navigateToProject(path.split(':')[1]);
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
    onNavigateToProject: navigateToProject,
    onOpenContact: () => setIsContactOpen(true),
  };

  return (
    // overflow-x-clip (not -hidden) contains horizontal overflow WITHOUT creating a scroll
    // container, so descendant `position: sticky` (e.g. the skills inspector) works.
    <div className="min-h-screen relative overflow-x-clip transition-colors duration-500">
      <RouteSeo />
      <TopNav
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenContact={() => setIsContactOpen(true)}
      />

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
            className="py-14 px-6 border-t border-[#d8e8ee] dark:border-white/5 relative bg-[#f5f9fb] dark:bg-[#07161f] overflow-hidden scroll-mt-24 transition-colors duration-500"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-[#d8e8ee] dark:bg-white/5"></div>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h2 className="text-4xl font-outfit font-extrabold text-navy-900 dark:text-white">
                  Open to{' '}
                  <span className="text-tide-aqua">
                    Forward-Deployed Engineering, Implementation &amp; Technical Systems Roles
                  </span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  Seeking AI-forward teams that value operational clarity, adoption-ready systems,
                  and evidence-backed implementation.
                </p>

                <div className="flex flex-wrap gap-4">
                  {/* Email Button */}
                  <button
                    onClick={() => handleCopyEmail('kmsemple26@gmail.com')}
                    className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-tide-aqua dark:hover:text-tide-softBlue transition-colors group text-left p-2 rounded-2xl hover:bg-tide-aqua/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-tide-aqua dark:text-tide-softBlue group-hover:bg-tide-aqua group-hover:text-white group-hover:scale-110 transition-all">
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
                      <span className="text-[10px] uppercase tracking-widest text-tide-aqua font-bold">
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

                  {/* GitHub Link */}
                  <a
                    href="https://github.com/slyberia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group text-left p-2 rounded-2xl hover:bg-slate-500/5 dark:hover:bg-slate-400/10"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-slate-800 group-hover:text-white dark:group-hover:bg-slate-200 dark:group-hover:text-slate-900 group-hover:scale-110 transition-all">
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
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">GitHub Projects</span>
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                        Code Portfolio
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs">
                    Location
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-tide-aqua/10 dark:bg-tide-aqua/15 flex items-center justify-center text-tide-aqua shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-navy-900 dark:text-white font-outfit text-lg font-semibold">
                        Ann Arbor, MI
                      </p>
                      <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 tracking-wide">
                        42.2808° N · 83.7430° W
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Eastern Time · UTC−5
                      </p>
                    </div>
                  </div>
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
                    <a
                      href="https://github.com/slyberia"
                      target="_blank"
                      rel="noopener"
                      className="text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                    <Link
                      to={SITE_INDEX_HREF}
                      className="text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors"
                    >
                      Site Index
                    </Link>
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

const CaseStudyRedirect: React.FC = () => {
  const { studyId } = useParams<{ studyId: string }>();
  return <Navigate to={studyId ? buildProjectHref(studyId) : PROJECTS_DEFAULT_HREF} replace />;
};

const HomeWrapper: React.FC = () => {
  const { onNavigateToProject, onOpenContact } = useOutletContext<LayoutContext>();
  return (
    <ErrorBoundary location="HomeView">
      <HomeView onNavigateToCaseStudy={onNavigateToProject} onOpenContact={onOpenContact} />
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
        element: <Navigate to="/projects" replace />,
      },
      {
        path: 'projects',
        element: (
          <ErrorBoundary location="ProjectsIndexView">
            <ProjectsIndexView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'gallery',
        element: (
          <ErrorBoundary location="GalleryView">
            <GalleryView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'projects/:projectId',
        element: (
          <ErrorBoundary location="ProjectDetailView">
            <ProjectDetailView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'case-studies/:studyId',
        element: <CaseStudyRedirect />,
      },
      {
        path: 'tracks/forward-deployed',
        element: (
          <ErrorBoundary location="ImplementationTrackView">
            <ImplementationTrackView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'tracks/solutions-architect',
        element: (
          <ErrorBoundary location="OpsAnalyticsTrackView">
            <OpsAnalyticsTrackView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'tracks/spatial-systems',
        element: (
          <ErrorBoundary location="GisTrackView">
            <GisTrackView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'apply/forward-deployed',
        element: (
          <ErrorBoundary location="ApplyImplementationView">
            <ApplyImplementationView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'apply/solutions-architect',
        element: (
          <ErrorBoundary location="ApplyOpsAnalyticsView">
            <ApplyOpsAnalyticsView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'apply/spatial-systems',
        element: (
          <ErrorBoundary location="ApplyGisView">
            <ApplyGisView />
          </ErrorBoundary>
        ),
      },
      {
        path: 'deep-dives',
        element: (
          <ErrorBoundary location="DeepDiveView">
            <DeepDiveView />
          </ErrorBoundary>
        ),
      },
      // Legacy routes to prevent 404s
      {
        path: 'portfolio2/deep-dive',
        element: <Navigate to="/deep-dives" replace />,
      },
      {
        path: 'site-index',
        element: (
          <ErrorBoundary location="SiteIndexView">
            <SiteIndexView />
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
