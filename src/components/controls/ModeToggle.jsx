import React from 'react';
import { Flame, GraduationCap } from 'lucide-react';

const ModeToggle = ({ mode, onModeChange }) => {
  return (
    <div className="flex bg-slate-950/50 p-1.5 rounded-[1.25rem] border border-slate-800/80 w-full md:w-fit backdrop-blur-xl shadow-inner">
      <button
        onClick={() => onModeChange('savage')}
        className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
          mode === 'savage'
            ? 'bg-gradient-to-br from-orange-600 to-orange-500 text-white shadow-[0_10px_20px_rgba(249,115,22,0.3)] scale-100'
            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50 scale-95 opacity-70'
        }`}
      >
        <Flame size={18} className={mode === 'savage' ? 'animate-pulse' : ''} />
        <span>Savage Roast</span>
      </button>
      <button
        onClick={() => onModeChange('mentor')}
        className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
          mode === 'mentor'
            ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] scale-100'
            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50 scale-95 opacity-70'
        }`}
      >
        <GraduationCap size={18} />
        <span>Mentor Mode</span>
      </button>
    </div>
  );
};

export default ModeToggle;
