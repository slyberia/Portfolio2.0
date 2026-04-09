import React, { useState, useEffect } from 'react';
import HomeView from './views/HomeView';
import CaseStudyView from './views/CaseStudyView';
import ResumeView from './views/ResumeView';
import ContactModal from './components/ContactModal';
import CommandPalette from './components/CommandPalette';
import ChatWidget from './components/ChatWidget';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import { CASE_STUDY_REGISTRY } from './constants';

const App: React.FC = () => {
  // Theme Management
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

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

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const getPageFromHash = (): 'home' | 'case-study' | 'resume' | '404' => {
    try {
      const hash = window.location.hash;
      if (hash.startsWith('#case-study')) return 'case-study';
      if (hash.startsWith('#resume')) return 'resume';
      return 'home';
    } catch (e) {
      return 'home';
    }
  };

  const [activePage, setActivePage] = useState<'home' | 'case-study' | 'resume' | '404'>(
    getPageFromHash(),
  );
  const [currentHash, setCurrentHash] = useState<string>('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeStudyId, setActiveStudyId] = useState<string>(CASE_STUDY_REGISTRY[0].id);

  // Toast State
  const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({
    message: '',
    isVisible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
  };

  const handleCopyEmail = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Email copied to clipboard');
  };

  useEffect(() => {
    try {
      setCurrentHash(window.location.hash);
    } catch (e) {}

    const handleHashChange = () => {
      const newPage = getPageFromHash();
      setActivePage(newPage);
      try {
        setCurrentHash(window.location.hash);
      } catch (e) {}
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smart Scroll Handling
  useEffect(() => {
    if (activePage === 'case-study' || activePage === '404' || activePage === 'resume') {
      window.scrollTo(0, 0);
    } else {
      const targetHash = currentHash;

      if (
        targetHash &&
        targetHash !== '#' &&
        !targetHash.startsWith('#case-study') &&
        !targetHash.startsWith('#resume')
      ) {
        setTimeout(() => {
          const id = targetHash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else if (activePage === 'home' && !targetHash) {
        window.scrollTo(0, 0);
      }
    }
  }, [activePage, currentHash]);

  const navigateToHome = () => {
    setActivePage('home');
    setCurrentHash('');
    try {
      window.location.hash = '';
    } catch (e) {}
  };

  const navigateToCaseStudy = (id?: string) => {
    if (id) setActiveStudyId(id);
    setActivePage('case-study');
    setCurrentHash('#case-study');
    try {
      window.location.hash = 'case-study';
    } catch (e) {}
  };

  const navigateToResume = () => {
    setActivePage('resume');
    setCurrentHash('#resume');
    try {
      window.location.hash = 'resume';
    } catch (e) {}
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (activePage !== 'home') setActivePage('home');
    setCurrentHash(hash);

    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      window.location.hash = hash;
    } catch (err) {}
  };

  const handleCommandNavigation = (path: string) => {
    if (path === 'home') {
      navigateToHome();
    } else if (path === 'case-study') {
      navigateToCaseStudy();
    } else if (path === 'resume') {
      navigateToResume();
    } else if (path.startsWith('case-study:')) {
      const id = path.split(':')[1];
      navigateToCaseStudy(id);
    } else if (path.startsWith('#') || path === 'experience' || path === 'skills') {
      const hash = path.startsWith('#') ? path : `#${path}`;
      if (activePage !== 'home') setActivePage('home');
      setCurrentHash(hash);
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      try {
        window.location.hash = hash;
      } catch (e) {}
    }
  };

  const handleCommandAction = (action: string) => {
    if (action === 'contact') setIsContactOpen(true);
    if (action === 'resume') {
      navigateToResume();
    }
  };

  // If on resume page, render it cleanly
  if (activePage === 'resume') {
    return (
      <ErrorBoundary location="ResumeView">
        <ResumeView />
      </ErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-500">
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-50 border-b border-black/5 dark:border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/20 dark:supports-[backdrop-filter]:bg-slate-950/20 transition-all duration-300"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={navigateToHome}
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            aria-label="Return to Homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg text-white font-outfit group-hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20">
              KS
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-navy-900 dark:text-white hidden sm:block">
              Kyle Semple
            </span>
          </button>

          <div className="flex items-center gap-2 md:gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            <button
              onClick={navigateToHome}
              className={`hidden sm:block hover:text-navy-900 dark:hover:text-white transition-colors focus:outline-none focus:text-navy-900 dark:focus:text-white ${
                activePage === 'home' && !currentHash ? 'text-navy-900 dark:text-white' : ''
              }`}
            >
              Home
            </button>
            <a
              href="#experience"
              onClick={(e) => handleAnchorClick(e, '#experience')}
              className={`hidden md:block hover:text-navy-900 dark:hover:text-white transition-colors focus:outline-none ${
                currentHash === '#experience' ? 'text-navy-900 dark:text-white' : ''
              }`}
            >
              Experience
            </a>
            <button
              onClick={() => navigateToCaseStudy()}
              className={`hover:text-navy-900 dark:hover:text-white transition-colors focus:outline-none ${
                activePage === 'case-study' ? 'text-navy-900 dark:text-white font-bold' : ''
              }`}
            >
              Case Studies
            </button>

            <button
              onClick={navigateToResume}
              className="hover:text-navy-900 dark:hover:text-white transition-colors focus:outline-none"
            >
              Resume
            </button>

            <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 dark:text-slate-600 border border-black/5 dark:border-white/10 px-2 py-1 rounded bg-black/5 dark:bg-white/5">
              <span className="font-sans">⌘</span>
              <span>K</span>
            </div>

            {/* Social & Utility Group */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* LinkedIn Header Shortcut */}
              <a
                href="https://www.linkedin.com/in/kyle-semple-522537165/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-blue-500/10 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all focus:outline-none"
                aria-label="Visit LinkedIn Profile"
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
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white transition-all relative group overflow-hidden"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div
                  className={`transition-all duration-500 transform ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0 opacity-0 absolute'}`}
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
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                </div>
                <div
                  className={`transition-all duration-500 transform ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0 opacity-0 absolute'}`}
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
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Nav Divider */}
            <div className="hidden md:block w-px h-6 bg-black/10 dark:bg-white/10"></div>

            {/* Contact - Primary CTA */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center px-3 sm:px-5 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all focus:outline-none text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/20"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      <main className="transition-opacity duration-300">
        {activePage === 'home' ? (
          <ErrorBoundary location="HomeView">
            <HomeView
              onNavigateToCaseStudy={navigateToCaseStudy}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </ErrorBoundary>
        ) : activePage === 'case-study' ? (
          <ErrorBoundary location="CaseStudyView">
            <CaseStudyView
              onNavigateToHome={navigateToHome}
              activeStudyId={activeStudyId}
              onActiveStudyChange={setActiveStudyId}
            />
          </ErrorBoundary>
        ) : (
          <div className="min-h-screen flex items-center justify-center px-6 pt-20">
            <div className="text-center space-y-6 max-w-md animate-in fade-in zoom-in-95">
              <div className="w-24 h-24 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20">
                <span className="font-outfit font-bold text-3xl">404</span>
              </div>
              <h1 className="text-3xl font-outfit font-bold text-navy-900 dark:text-white">
                Page Not Found
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <button
                onClick={navigateToHome}
                className="px-6 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-navy-900 dark:text-white rounded-xl font-medium transition-all"
              >
                Return Home
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer / Contact */}
      <footer
        id="contact"
        className="py-20 px-6 border-t border-black/5 dark:border-white/5 relative bg-white dark:bg-slate-950 overflow-hidden scroll-mt-24 transition-colors duration-500"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-4xl font-outfit font-extrabold text-navy-900 dark:text-white">
              Open to AI-forward{' '}
              <span className="gradient-text">Customer Success and Solutions</span> roles
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

export default App;
