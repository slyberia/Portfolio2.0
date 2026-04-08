import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900/90 backdrop-blur-md border border-indigo-500/30 text-indigo-100 px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 ring-1 ring-indigo-500/20">
        <div className="bg-indigo-500 rounded-full p-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="font-outfit font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
