import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CASE_STUDY_REGISTRY } from '../constants';

const SidebarNav: React.FC = () => {
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

  const items = [
    {
      id: 'status',
      label: 'Status',
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
          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        </svg>
      ),
    },
    {
      id: 'index',
      label: 'Index',
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
      label: 'Logic',
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
      id: 'system',
      label: 'System',
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
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className="fixed left-0 top-20 bottom-0 w-20 hidden md:flex flex-col z-40 bg-[#f5f3ee] dark:bg-[#1a1712] border-r border-black/10 dark:border-white/5"
      aria-label="Section Navigation"
    >
      {/* Monogram */}
      <div className="flex items-center justify-center h-12 border-b border-black/5 dark:border-white/5 shrink-0">
        <span className="font-mono text-[9px] uppercase tracking-widest text-navy-900/40 dark:text-white/30">
          KS_01
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col flex-1 py-3 gap-0.5" aria-label="Page sections">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            aria-label={item.label}
            aria-current={item.active ? 'page' : undefined}
            className={`flex flex-col items-center justify-center py-3.5 gap-1.5 w-full transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-indigo-500 ${
              item.active
                ? 'bg-indigo-500/10 text-indigo-500'
                : 'text-navy-900/40 dark:text-white/30 hover:text-navy-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-mono text-[9px] uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Status indicator */}
      <div className="flex flex-col items-center justify-end pb-6 gap-2 shrink-0">
        <span
          className="font-mono text-[8px] uppercase tracking-widest text-navy-900/25 dark:text-white/20 select-none"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          active_protocol
        </span>
        <span className="w-2 h-2 bg-emerald-500 animate-pulse block shrink-0" />
      </div>
    </aside>
  );
};

export default SidebarNav;
