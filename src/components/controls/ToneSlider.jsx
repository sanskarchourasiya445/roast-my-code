import React from 'react';
import { Volume2, VolumeX, ShieldAlert } from 'lucide-react';

const ToneSlider = ({ tone, onToneChange }) => {
  const getLabel = () => {
    if (tone <= 30) return { text: 'Kind', color: 'text-green-400', icon: <VolumeX size={14} /> };
    if (tone <= 70) return { text: 'Balanced', color: 'text-blue-400', icon: <Volume2 size={14} /> };
    return { text: 'Savage', color: 'text-red-400', icon: <ShieldAlert size={14} /> };
  };

  const label = getLabel();

  return (
    <div className="flex flex-col gap-3 w-full p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Burn Level
        </label>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 ${label.color} shadow-sm transition-all duration-500`}>
          {label.icon}
          <span className="text-[10px] font-bold uppercase tracking-wider">{label.text}</span>
        </div>
      </div>

      <div className="relative group/slider mt-1 mb-1 flex items-center h-5">
        <input
          type="range"
          min="0"
          max="100"
          value={tone}
          onChange={(e) => onToneChange(parseInt(e.target.value))}
          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 transition-all focus:outline-none z-10"
        />
        
        {/* Animated track decoration */}
        <div 
          className="absolute h-1 top-[10px] left-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-rose-500 rounded-lg pointer-events-none opacity-40 group-hover/slider:opacity-80 transition-opacity"
          style={{ width: `${tone}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[10px] font-medium text-slate-500">Kind</span>
        <span className="text-xs font-mono text-slate-400">{tone}%</span>
        <span className="text-[10px] font-medium text-slate-500">Lethal</span>
      </div>
    </div>
  );
};

export default ToneSlider;
