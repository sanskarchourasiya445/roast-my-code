import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Flame, AlertTriangle, Ghost, Terminal, Copy, Share2, Info } from 'lucide-react';

export const RoastResult = ({ result, onCopy, isRoasting, mode }) => {
  if (!result && !isRoasting) return null;

  return (
    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`glass-panel p-8 border-t-4 ${
        mode === 'savage' ? 'border-orange-500/50 bg-orange-950/10' : 'border-blue-500/50 bg-blue-950/10'
      } relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-4 opacity-5">
          {mode === 'savage' ? (
            <Flame size={120} className="text-orange-500" />
          ) : (
            <Info size={120} className="text-blue-500" />
          )}
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              mode === 'savage' ? 'bg-orange-500/20 text-orange-500 border-orange-500/20' : 'bg-blue-500/20 text-blue-500 border-blue-500/20'
            } border`}>
              {mode === 'savage' ? <Ghost size={24} /> : <Terminal size={24} />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-50 uppercase tracking-widest">
                {mode === 'savage' ? 'The Burning Verdict' : 'The Mentorship Report'}
              </h3>
              <p className={`text-xs font-mono uppercase ${
                mode === 'savage' ? 'text-orange-400' : 'text-blue-400'
              }`}>
                Status: {isRoasting ? 'Analyzing garbage...' : mode === 'savage' ? 'DEVASTATED' : 'REVIEWED'}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800/50 font-sans text-sm leading-relaxed text-slate-300">
            <div className="prose prose-invert max-w-none 
              prose-headings:text-orange-400 prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-2
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-orange-500 prose-strong:font-black
              prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-4
              prose-li:mb-1
              prose-code:text-orange-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-800 prose-pre:p-4 prose-pre:rounded-lg
            ">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {result}
              </ReactMarkdown>
              {isRoasting && (
                <div className="flex items-center gap-2 mt-4 text-orange-400 font-mono text-xs">
                  <span className="w-2 h-4 bg-orange-500 animate-pulse" />
                  <span>DECODING INEFFIENCY...</span>
                </div>
              )}
            </div>
          </div>

          {!isRoasting && result && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
               <div className="flex items-center gap-4">
                  <button 
                    onClick={onCopy}
                    className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest group"
                  >
                    <Copy size={12} className="group-hover:scale-110 transition-transform" />
                    Copy Burn
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest group">
                    <Share2 size={12} className="group-hover:scale-110 transition-transform" />
                    Share Shame
                  </button>
               </div>
               
               <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  mode === 'savage' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'
               } border`}>
                  <AlertTriangle size={10} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {mode === 'savage' ? '100% Savage' : 'Constructive'}
                  </span>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoastResult;
