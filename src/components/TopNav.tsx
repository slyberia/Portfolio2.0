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

interface TopNavProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenContact: () => void;
}

type NavAccent = 'aqua' | 'blue' | 'cyan' | 'neutral';

const NAV_ITEMS: Array<{
  label: string;
  href: string;
  accent: NavAccent;
  activeMatch: (pathname: string) => boolean;
}> = [
  {
    label: 'Home',
    href: HOME_HREF,
    accent: 'neutral',
    activeMatch: (pathname) => pathname === HOME_HREF,
  },
  {
    label: 'Implementation',
    href: IMPLEMENTATION_TRACK_HREF,
    accent: 'aqua',
    activeMatch: (pathname) => pathname === IMPLEMENTATION_TRACK_HREF,
  },
  {
    label: 'QA',
    href: QA_TRACK_HREF,
    accent: 'blue',
    activeMatch: (pathname) => pathname === QA_TRACK_HREF,
  },
  {
    label: 'GIS',
    href: GIS_TRACK_HREF,
    accent: 'cyan',
    activeMatch: (pathname) => pathname === GIS_TRACK_HREF,
  },
  {
    label: 'Projects',
    href: PROJECTS_HREF,
    accent: 'neutral',
    activeMatch: (pathname) => pathname.startsWith('/projects'),
  },
  {
    label: 'Process',
    href: PORTFOLIO_PROCESS_HREF,
    accent: 'neutral',
    activeMatch: (pathname) => pathname === PORTFOLIO_PROCESS_HREF,
  },
];

const baseLinkClass =
  'relative pb-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-300';

const getAccentClass = (accent: NavAccent, isActive: boolean) => {
  if (accent === 'aqua') {
    return isActive
      ? 'text-tide-aqua after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-tide-aqua after:to-gild'
      : 'text-ink-slate hover:text-ink-navy dark:text-slate-300 dark:hover:text-white hover:after:absolute hover:after:left-0 hover:after:-bottom-1 hover:after:h-0.5 hover:after:w-full hover:after:bg-tide-aqua/70';
  }

  if (accent === 'blue') {
    return isActive
      ? 'text-[#2a77a8] dark:text-tide-softBlue after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-tide-blue'
      : 'text-ink-slate hover:text-[#2a77a8] dark:text-slate-300 dark:hover:text-tide-softBlue hover:after:absolute hover:after:left-0 hover:after:-bottom-1 hover:after:h-0.5 hover:after:w-full hover:after:bg-tide-softBlue/80';
  }

  if (accent === 'cyan') {
    return isActive
      ? 'text-tide-cyan after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-tide-cyan'
      : 'text-ink-slate hover:text-ink-navy dark:text-slate-300 dark:hover:text-white hover:after:absolute hover:after:left-0 hover:after:-bottom-1 hover:after:h-0.5 hover:after:w-full hover:after:bg-tide-cyan/70';
  }

  return isActive
    ? 'text-ink-navy dark:text-white after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-slate-400/80'
    : 'text-ink-slate hover:text-ink-navy dark:text-slate-300 dark:hover:text-white hover:after:absolute hover:after:left-0 hover:after:-bottom-1 hover:after:h-0.5 hover:after:w-full hover:after:bg-slate-400/70';
};

const TopNav: React.FC<TopNavProps> = ({ theme, toggleTheme, onOpenContact }) => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-[#d8e8ee] dark:border-white/10 bg-[#f5f9fb]/95 dark:bg-slate-950/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        <Link
          to={HOME_HREF}
          className="text-xl font-outfit font-bold tracking-tight text-ink-navy dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-300"
          aria-label="Go to homepage"
        >
          ARCHITECT.SYS
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = item.activeMatch(location.pathname);
            return (
              <NavLink
                key={item.label}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`${baseLinkClass} ${getAccentClass(item.accent, isActive)}`}
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
            className="inline-flex items-center justify-center rounded-sm border border-slate-300 dark:border-white/20 px-2.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-300"
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center justify-center rounded-sm bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 px-5 py-2.5 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-300"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
