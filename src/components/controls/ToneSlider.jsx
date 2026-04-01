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
    <div className="flex flex-col gap-3 w-full md:w-64 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Roast Intensity
        </label>
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/50 border border-slate-800 ${label.color}`}>
          {label.icon}
          <span className="text-[10px] font-black uppercase tracking-[0.1em]">{label.text}</span>
        </div>
      </div>

      <div className="relative group mt-2">
        <input
          type="range"
          min="0"
          max="100"
          value={tone}
          onChange={(e) => onToneChange(parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all focus:outline-none"
        />
        
        {/* Track decoration */}
        <div 
          className="absolute h-1.5 top-0 left-0 bg-gradient-to-r from-green-500 via-orange-500 to-red-500 rounded-lg pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity"
          style={{ width: `${tone}%` }}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-[10px] font-mono text-slate-600">0</span>
        <span className="text-[10px] font-black text-slate-400">{tone}%</span>
        <span className="text-[10px] font-mono text-slate-600">100</span>
      </div>
    </div>
  );
};

export default ToneSlider;
