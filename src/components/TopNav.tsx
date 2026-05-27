import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  GIS_TRACK_HREF,
  HOME_HREF,
  IMPLEMENTATION_TRACK_HREF,
  PORTFOLIO_PROCESS_HREF,
  QA_TRACK_HREF,
  PROJECTS_HREF,
} from '../lib/routes';
import { navStyles, interactionStyles, componentRecipes } from '../lib/design-system';

interface TopNavProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenContact: () => void;
}

const TRACK_ITEMS = [
  {
    label: 'Forward Deployed Engineer',
    href: IMPLEMENTATION_TRACK_HREF,
    accent: 'aqua',
    accentClass: 'bg-tide-aqua',
  },
  {
    label: 'Solutions Architect',
    href: QA_TRACK_HREF,
    accent: 'blue',
    accentClass: 'bg-tide-blue',
  },
  {
    label: 'Spatial Systems Architect',
    href: GIS_TRACK_HREF,
    accent: 'cyan',
    accentClass: 'bg-tide-cyan',
  },
] as const;

const TopNav: React.FC<TopNavProps> = ({ theme, toggleTheme, onOpenContact }) => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Determine if any track route is currently active
  const isTrackActive =
    location.pathname === IMPLEMENTATION_TRACK_HREF ||
    location.pathname === QA_TRACK_HREF ||
    location.pathname === GIS_TRACK_HREF;

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-ink-border dark:border-slate-800 bg-ink-mist dark:bg-ink-deep transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        <Link
          to={HOME_HREF}
          className={`text-xl font-outfit font-bold tracking-tight text-ink-navy dark:text-white ${navStyles.itemFocus}`}
        >
          ARCHITECT.SYS
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          <NavLink
            to={HOME_HREF}
            className={({ isActive }) =>
              `relative pb-1 text-sm font-medium ${navStyles.item} ${navStyles.itemFocus} ${isActive ? navStyles.itemActive : ''}`
            }
          >
            Home
          </NavLink>

          {/* Targeted Roles Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              className={`relative pb-1 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none ${navStyles.item} ${navStyles.itemFocus} ${
                isTrackActive ? 'text-tide-aqua font-bold' : ''
              }`}
            >
              <span>Targeted Roles</span>
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Panel */}
            {isDropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 rounded-xl border bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 flex flex-col animate-in fade-in slide-in-from-top-1 duration-200"
                role="menu"
              >
                {TRACK_ITEMS.map((item) => {
                  const isItemActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      role="menuitem"
                      onClick={() => setIsDropdownOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold border-l-2 transition-all ${
                        isItemActive
                          ? 'border-tide-aqua bg-slate-50 dark:bg-slate-900 text-tide-aqua dark:text-tide-softBlue'
                          : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-tide-aqua dark:hover:text-tide-softBlue hover:bg-slate-50 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${item.accentClass} shrink-0`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <NavLink
            to={PROJECTS_HREF}
            className={({ isActive }) =>
              `relative pb-1 text-sm font-medium ${navStyles.item} ${navStyles.itemFocus} ${isActive ? navStyles.itemActive : ''}`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to={PORTFOLIO_PROCESS_HREF}
            className={({ isActive }) =>
              `relative pb-1 text-sm font-medium ${navStyles.item} ${navStyles.itemFocus} ${isActive ? navStyles.itemActive : ''}`
            }
          >
            Process
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className={`inline-flex items-center justify-center rounded-sm border border-ink-border dark:border-slate-800 px-2.5 py-2 text-ink-slate dark:text-ink-border hover:bg-ink-panel dark:hover:bg-slate-800 ${interactionStyles.focusVisible}`}
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>
          <button
            onClick={onOpenContact}
            className={`inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm font-semibold ${componentRecipes.button.primary}`}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
