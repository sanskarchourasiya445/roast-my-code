import React from 'react';
import { Flame, GraduationCap } from 'lucide-react';

const ModeToggle = ({ mode, onModeChange }) => {
  return (
    <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800 w-full md:w-fit backdrop-blur-sm">
      <button
        onClick={() => onModeChange('savage')}
        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
          mode === 'savage'
            ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/20'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
      >
        <Flame size={16} className={mode === 'savage' ? 'animate-pulse' : ''} />
        <span>Savage Roast</span>
      </button>
      <button
        onClick={() => onModeChange('mentor')}
        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
          mode === 'mentor'
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
      >
        <GraduationCap size={16} />
        <span>Mentor Mode</span>
      </button>
    </div>
  );
};

export default ModeToggle;
