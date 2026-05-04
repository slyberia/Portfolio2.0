import React from 'react';
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

const NAV_ITEMS = [
  {
    label: 'Home',
    href: HOME_HREF,
    accent: 'neutral',
    activeMatch: (p: string) => p === HOME_HREF,
  },
  {
    label: 'Implementation',
    href: IMPLEMENTATION_TRACK_HREF,
    accent: 'aqua',
    activeMatch: (p: string) => p === IMPLEMENTATION_TRACK_HREF,
  },
  {
    label: 'QA',
    href: QA_TRACK_HREF,
    accent: 'blue',
    activeMatch: (p: string) => p === QA_TRACK_HREF,
  },
  {
    label: 'GIS',
    href: GIS_TRACK_HREF,
    accent: 'cyan',
    activeMatch: (p: string) => p === GIS_TRACK_HREF,
  },
  {
    label: 'Projects',
    href: PROJECTS_HREF,
    accent: 'neutral',
    activeMatch: (p: string) => p.startsWith('/projects'),
  },
  {
    label: 'Process',
    href: PORTFOLIO_PROCESS_HREF,
    accent: 'neutral',
    activeMatch: (p: string) => p === PORTFOLIO_PROCESS_HREF,
  },
] as const;

const TopNav: React.FC<TopNavProps> = ({ theme, toggleTheme, onOpenContact }) => {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-ink-border dark:border-white/10 bg-ink-mist/95 dark:bg-ink-deep/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        <Link
          to={HOME_HREF}
          className={`text-xl font-outfit font-bold tracking-tight text-ink-navy dark:text-white ${navStyles.itemFocus}`}
        >
          ARCHITECT.SYS
        </Link>
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = item.activeMatch(location.pathname);
            const activeClass =
              item.accent === 'aqua'
                ? 'text-tide-aqua'
                : item.accent === 'blue'
                  ? 'text-tide-blue'
                  : item.accent === 'cyan'
                    ? 'text-tide-cyan'
                    : navStyles.itemActive;
            return (
              <NavLink
                key={item.label}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative pb-1 text-sm font-medium ${navStyles.item} ${navStyles.itemFocus} ${isActive ? activeClass : ''}`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className={`inline-flex items-center justify-center rounded-sm border border-ink-border dark:border-white/20 px-2.5 py-2 text-ink-slate dark:text-ink-border hover:bg-ink-panel dark:hover:bg-slate-800 ${interactionStyles.focusVisible}`}
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
