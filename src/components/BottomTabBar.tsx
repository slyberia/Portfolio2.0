import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CASE_STUDY_REGISTRY } from '../constants';

const BottomTabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isCases = location.pathname.startsWith('/case-studies');
  const isResume = location.pathname === '/resume';

  const scrollToExperience = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      active: isHome,
      onClick: () => navigate('/'),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'cases',
      label: 'Cases',
      active: isCases,
      onClick: () => navigate(`/case-studies/${CASE_STUDY_REGISTRY[0].id}`),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="7" height="7" x="3" y="3" />
          <rect width="7" height="7" x="14" y="3" />
          <rect width="7" height="7" x="14" y="14" />
          <rect width="7" height="7" x="3" y="14" />
        </svg>
      ),
    },
    {
      id: 'logic',
      label: 'Experience',
      active: false,
      onClick: scrollToExperience,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      ),
    },
    {
      id: 'resume',
      label: 'Resume',
      active: isResume,
      onClick: () => navigate('/resume'),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden bg-[#f9f7f3] dark:bg-[#1a1712] border-t border-[#e4dfd7] dark:border-white/5"
      aria-label="Mobile Navigation"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={tab.onClick}
          aria-label={tab.label}
          aria-current={tab.active ? 'page' : undefined}
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-indigo-500 ${
            tab.active
              ? 'text-indigo-500'
              : 'text-navy-900/40 dark:text-white/30 hover:text-navy-900 dark:hover:text-white'
          }`}
        >
          {tab.active && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-indigo-500" />
          )}
          {tab.icon}
          <span className="font-mono text-[9px] uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomTabBar;
