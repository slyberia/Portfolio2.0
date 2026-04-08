import React, { useState, useEffect } from 'react';

interface PaletteAction {
  id: string;
  label: string;
  type: 'nav' | 'action';
  path?: string;
  action?: string;
}

interface CommandPaletteProps {
  onNavigate: (path: string) => void;
  onAction: (action: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions: PaletteAction[] = [
    { id: 'home', label: 'Go to Home', type: 'nav', path: 'home' },
    { id: 'experience', label: 'Go to Experience', type: 'nav', path: '#experience' },
    { id: 'skills', label: 'Go to Skills', type: 'nav', path: '#skills' },
    { id: 'case-studies', label: 'Read Case Studies', type: 'nav', path: 'case-study' },
    { id: 'contact', label: 'Get in Touch', type: 'action', action: 'contact' },
    { id: 'resume', label: 'Download Resume', type: 'action', action: 'resume' },
  ];

  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleNav = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const action = filteredActions[selectedIndex];
        if (action) execute(action);
      }
    };
    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, filteredActions, selectedIndex]);

  const execute = (action: PaletteAction) => {
    setIsOpen(false);
    if (action.type === 'nav' && action.path) onNavigate(action.path);
    if (action.type === 'action' && action.action) onAction(action.action);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-white/5 bg-white/5">
          <svg className="w-5 h-5 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            autoFocus
            className="w-full bg-transparent border-none focus:ring-0 py-4 text-white placeholder-slate-500 font-outfit text-lg outline-none"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filteredActions.map((action, i) => (
            <button
              key={action.id}
              onClick={() => execute(action)}
              className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all ${
                i === selectedIndex ? 'bg-indigo-600/10 border-l-2 border-indigo-500' : 'hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <span className={`text-sm font-medium ${i === selectedIndex ? 'text-indigo-400' : 'text-slate-300'}`}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;