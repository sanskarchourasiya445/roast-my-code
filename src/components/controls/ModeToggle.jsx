import React from 'react';
import { Flame, GraduationCap } from 'lucide-react';

const ModeToggle = ({ mode, onModeChange }) => {
  const base =
    "flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-2">
      <div className="flex gap-2">
        <button
          onClick={() => onModeChange('savage')}
          className={`${base} ${
            mode === 'savage'
              ? 'bg-rose-500/20 text-rose-300 shadow-lg shadow-rose-500/10'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Flame size={16} className={mode === 'savage' ? 'animate-pulse' : ''} /> 
          Savage
        </button>

        <button
          onClick={() => onModeChange('mentor')}
          className={`${base} ${
            mode === 'mentor'
              ? 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <GraduationCap size={16} /> 
          Mentor
        </button>
      </div>
    </div>
  );
};

export default ModeToggle;
