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
    <div className="flex flex-col gap-4 w-full p-6 rounded-[2rem] bg-slate-950/40 border border-slate-800/60 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
          Roast Intensity
        </label>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800/50 ${label.color} shadow-lg transition-all duration-500`}>
          {label.icon}
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label.text}</span>
        </div>
      </div>

      <div className="relative group/slider mt-2 flex items-center h-6">
        <input
          type="range"
          min="0"
          max="100"
          value={tone}
          onChange={(e) => onToneChange(parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-orange-500 transition-all focus:outline-none z-10"
        />
        
        {/* Animated track decoration */}
        <div 
          className="absolute h-1.5 top-[9px] left-0 bg-gradient-to-r from-green-500 via-orange-500 to-red-600 rounded-lg pointer-events-none opacity-30 group-hover/slider:opacity-60 transition-opacity blur-[1px]"
          style={{ width: `${tone}%` }}
        />
      </div>

      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Minimal</span>
        <span className="text-[12px] font-black text-slate-300 font-mono bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">{tone}%</span>
        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Lethal</span>
      </div>
    </div>
  );
};

export default ToneSlider;
