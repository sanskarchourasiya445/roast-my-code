import React from 'react';
import { Flame, AlertTriangle, Ghost, Terminal, Copy, Share2 } from 'lucide-react';

export const RoastResult = ({ result, onCopy, isRoasting }) => {
  if (!result && !isRoasting) return null;

  return (
    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-panel p-8 border-orange-500/30 bg-orange-950/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Flame size={120} className="text-orange-500" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/20 text-orange-500">
              <Ghost size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-50 uppercase tracking-widest">The Burning Verdict</h3>
              <p className="text-xs text-orange-400 font-mono">Status: DEVASTATED</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/80 border border-orange-500/10 font-mono text-sm leading-relaxed text-slate-300">
            <span className="text-orange-500 font-bold block mb-2">{">"} VERDICT_OUTPUT:</span>
            <div className="flex flex-wrap items-center gap-x-1 transition-all duration-300">
                <p className="whitespace-pre-wrap">{result}</p>
                {isRoasting && <span className="w-2 h-4 bg-orange-500 animate-pulse ml-1 inline-block" />}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
             <div className="flex items-center gap-4">
                <button 
                  onClick={onCopy}
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest"
                >
                  <Copy size={12} />
                  Copy Burn
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">
                  <Share2 size={12} />
                  Share Shame
                </button>
             </div>
             
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                <AlertTriangle size={10} className="text-red-500" />
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">100% Savage</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoastResult;
