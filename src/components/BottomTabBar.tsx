import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PROJECTS_DEFAULT_HREF } from '../lib/routes';
import { navStyles } from '../lib/design-system';

const BottomTabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCases = location.pathname.startsWith('/projects');
  const isResume = location.pathname === '/resume';
  const scrollToExperience = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(
        () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }),
        100,
      );
    } else document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };
  const tabs = [
    { id: 'home', label: 'Home', active: isHome, onClick: () => navigate('/'), icon: '⌂' },
    {
      id: 'cases',
      label: 'Projects',
      active: isCases,
      onClick: () => navigate(PROJECTS_DEFAULT_HREF),
      icon: '◫',
    },
    { id: 'logic', label: 'Experience', active: false, onClick: scrollToExperience, icon: '◌' },
    {
      id: 'resume',
      label: 'Resume',
      active: isResume,
      onClick: () => navigate('/resume'),
      icon: '▤',
    },
  ];
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden bg-ink-mist dark:bg-ink-deep border-t border-ink-border dark:border-white/10"
      aria-label="Mobile Navigation"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={tab.onClick}
          aria-label={tab.label}
          aria-current={tab.active ? 'page' : undefined}
          className={`relative flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] transition-colors ${tab.active ? 'text-tide-aqua' : 'text-ink-slate dark:text-ink-border hover:text-ink-navy dark:hover:text-white'} ${navStyles.itemFocus}`}
        >
          <span>{tab.icon}</span>
          <span className="font-mono text-[9px] uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomTabBar;
