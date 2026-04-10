import React, { createContext, useContext, useState } from 'react';

interface RecruiterModeContextValue {
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
}

const RecruiterModeContext = createContext<RecruiterModeContextValue | null>(null);

export const RecruiterModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  const toggleRecruiterMode = () => setIsRecruiterMode((prev) => !prev);

  return (
    <RecruiterModeContext.Provider value={{ isRecruiterMode, toggleRecruiterMode }}>
      {children}
    </RecruiterModeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useRecruiterMode(): RecruiterModeContextValue {
  const ctx = useContext(RecruiterModeContext);
  if (!ctx) throw new Error('useRecruiterMode must be used within RecruiterModeProvider');
  return ctx;
}
