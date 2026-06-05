import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PROJECTS_DEFAULT_HREF,
  IMPLEMENTATION_TRACK_HREF,
  QA_TRACK_HREF,
  GIS_TRACK_HREF,
  DEEP_DIVES_HREF,
  GALLERY_HREF,
} from '../lib/routes';

interface SidebarNavProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenContact: () => void;
}

const TRACK_ITEMS = [
  {
    label: 'Forward Deployed Engineer',
    href: IMPLEMENTATION_TRACK_HREF,
    accentClass: 'bg-tide-aqua',
  },
  {
    label: 'Solutions Architect',
    href: QA_TRACK_HREF,
    accentClass: 'bg-tide-blue',
  },
  {
    label: 'Spatial Systems Architect',
    href: GIS_TRACK_HREF,
    accentClass: 'bg-tide-cyan',
  },
] as const;

const SidebarNav: React.FC<SidebarNavProps> = ({ theme, toggleTheme, onOpenContact }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === '/';
  const isCases = location.pathname.startsWith('/projects');
  const isGallery = location.pathname.startsWith(GALLERY_HREF);
  const isResume = location.pathname === '/resume';
  const isProcess = location.pathname.startsWith(DEEP_DIVES_HREF);
  const isTrackActive =
    location.pathname === IMPLEMENTATION_TRACK_HREF ||
    location.pathname === QA_TRACK_HREF ||
    location.pathname === GIS_TRACK_HREF;

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        </svg>
      ),
    },
    {
      id: 'cases',
      label: 'Evidence',
      active: isCases,
      onClick: () => navigate(PROJECTS_DEFAULT_HREF),
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
      id: 'process',
      label: 'Deep Dives',
      active: isProcess,
      onClick: () => navigate(DEEP_DIVES_HREF),
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
    },
    {
      id: 'gallery',
      label: 'Gallery',
      active: isGallery,
      onClick: () => navigate(GALLERY_HREF),
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
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      ),
    },
    {
      id: 'roles',
      label: 'Role Lens',
      active: isTrackActive,
      onClick: () => setIsDropdownOpen((prev) => !prev),
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
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'experience',
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
    {
      id: 'contact',
      label: 'Contact',
      active: false,
      onClick: onOpenContact,
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-20 hidden md:flex flex-col z-40 bg-[#f5f3ee] dark:bg-[#07161f] border-r border-black/10 dark:border-white/5 transition-colors duration-500"
      aria-label="Section Navigation"
    >
      {/* Monogram */}
      <div className="flex items-center justify-center h-14 border-b border-black/5 dark:border-white/5 shrink-0 select-none">
        <span className="font-mono text-[9px] uppercase tracking-widest text-navy-900/40 dark:text-white/30">
          KS_01
        </span>
      </div>

      {/* Primary nav */}
      <nav className="flex flex-col flex-1 py-3 gap-0.5" aria-label="Page sections">
        {items.map((item) => {
          if (item.id === 'roles') {
            return (
              <div
                key={item.id}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  onClick={item.onClick}
                  aria-label={item.label}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  className={`flex flex-col items-center justify-center py-3.5 gap-1.5 w-full transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-tide-aqua ${
                    item.active
                      ? 'bg-tide-aqua/10 text-tide-aqua'
                      : 'text-navy-900/40 dark:text-white/30 hover:text-navy-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span className="font-mono text-[9px] uppercase tracking-wider leading-tight text-center">
                    {item.label}
                  </span>
                </button>

                {/* Popover Flyout Menu (extending to the right) */}
                {isDropdownOpen && (
                  <div
                    className="absolute left-full top-0 ml-1 w-64 rounded-xl border bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 flex flex-col text-left animate-in fade-in slide-in-from-left-1 duration-200"
                    role="menu"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1 select-none">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase block">
                        Explore by role lens
                      </span>
                    </div>
                    {TRACK_ITEMS.map((track) => {
                      const isItemActive = location.pathname === track.href;
                      return (
                        <button
                          key={track.label}
                          onClick={() => {
                            navigate(track.href);
                            setIsDropdownOpen(false);
                          }}
                          role="menuitem"
                          className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold border-l-2 transition-all cursor-pointer ${
                            isItemActive
                              ? 'border-tide-aqua bg-slate-50 dark:bg-slate-900 text-tide-aqua dark:text-tide-softBlue'
                              : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-tide-aqua dark:hover:text-tide-softBlue hover:bg-slate-50 dark:hover:bg-slate-900/60'
                          }`}
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${track.accentClass} shrink-0`}
                          />
                          <span className="text-left leading-normal">{track.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              aria-label={item.label}
              aria-current={item.active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-3.5 gap-1.5 w-full transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-tide-aqua ${
                item.active
                  ? 'bg-tide-aqua/10 text-tide-aqua'
                  : 'text-navy-900/40 dark:text-white/30 hover:text-navy-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="font-mono text-[9px] uppercase tracking-wider leading-tight text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Zone 2: Social/external */}
      <div className="flex flex-col items-center gap-1 shrink-0 border-t border-black/5 dark:border-white/5 pt-3">
        {/* GitHub */}
        <a
          href="https://github.com/slyberia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit GitHub Profile"
          className="flex items-center justify-center w-10 h-10 text-navy-900/40 dark:text-white/30 hover:text-navy-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-tide-aqua"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/kyle-semple-522537165/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn Profile"
          className="flex items-center justify-center w-10 h-10 text-[#0A66C2] hover:bg-blue-500/10 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-tide-aqua"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </div>

      {/* Zone 3: Utility */}
      <div className="flex flex-col items-center pb-4 gap-1 shrink-0 border-t border-black/5 dark:border-white/5 pt-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="flex items-center justify-center w-10 h-10 text-navy-900/40 dark:text-white/30 hover:text-navy-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-tide-aqua relative overflow-hidden"
        >
          <div
            className={`transition-all duration-500 transform ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0 opacity-0 absolute'}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
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
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
        </button>

        {/* Status indicator */}
        <div className="flex flex-col items-center mt-2 gap-2">
          <span
            className="font-mono text-[8px] uppercase tracking-widest text-navy-900/25 dark:text-white/20 select-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            active_protocol
          </span>
          <span className="w-2 h-2 bg-emerald-500 animate-pulse block shrink-0" />
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
