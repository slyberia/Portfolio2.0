import React from 'react';

interface HowIWorkListProps {
  items: string[];
}

const HowIWorkList: React.FC<HowIWorkListProps> = ({ items }) => {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1 w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          </span>
          <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default HowIWorkList;
