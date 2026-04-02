import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Flame, Ghost, Terminal, Loader2, Sparkles } from 'lucide-react';

const RoastOutput = ({ result, isLoading, mode = 'savage' }) => {
  // Empty state
  if (!result && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 glass-panel bg-slate-900/40 border-slate-800/60 rounded-[2rem] animate-in fade-in zoom-in duration-1000 shadow-2xl group hover:border-slate-700/50 transition-all">
        <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-600/30 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="relative w-20 h-20 rounded-3xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 shadow-2xl rotate-3">
             <Flame size={40} className="text-orange-500 animate-bounce" />
          </div>
        </div>
        <h3 className="text-2xl font-black text-slate-100 mb-2 tracking-tight">Ready for the burn?</h3>
        <p className="text-slate-500 text-sm max-w-[220px] font-medium leading-relaxed italic opacity-80 text-center">
          "Your savage roast will appear here 🔥"
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col glass-panel bg-slate-950/80 border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl relative group ${
      mode === 'savage' ? 'hover:border-orange-500/20' : 'hover:border-blue-500/20'
    } transition-all duration-500`}>
      {/* Dynamic Background Glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 blur-3xl opacity-10 pointer-events-none transition-colors duration-1000 ${
        mode === 'savage' ? 'bg-orange-500' : 'bg-blue-500'
      }`} />
      
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-2xl border-2 ${
            mode === 'savage' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
          } shadow-lg`}>
            {mode === 'savage' ? <Ghost size={22} /> : <Terminal size={22} />}
          </div>
          <div>
            <h3 className="text-[11px] font-black text-slate-100 uppercase tracking-[0.3em]">
              {mode === 'savage' ? 'Burning Verdict' : 'Mentorship Report'}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)] ${
                isLoading ? 'bg-amber-500' : 'bg-green-500'
              }`} />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.1em] font-bold">
                {isLoading ? 'Processing Inefficiency...' : 'Analysis Complete'}
              </span>
            </div>
          </div>
        </div>
        
        {!isLoading && (
          <div className="flex items-center gap-2 pr-2">
            <Sparkles size={14} className="text-slate-600 animate-pulse" />
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">AI CORE V1.5</span>
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 max-h-[500px]">
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-8 bg-slate-800/50 rounded-lg w-3/4" />
            <div className="space-y-3">
              <div className="h-4 bg-slate-800/30 rounded-md w-full" />
              <div className="h-4 bg-slate-800/30 rounded-md w-11/12" />
              <div className="h-4 bg-slate-800/30 rounded-md w-5/6" />
            </div>
            <div className="h-32 bg-slate-800/20 rounded-xl border border-slate-800/50" />
            <div className="space-y-3">
              <div className="h-4 bg-slate-800/30 rounded-md w-full" />
              <div className="h-4 bg-slate-800/30 rounded-md w-4/5" />
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <article className={`prose prose-invert max-w-none 
              prose-headings:font-black prose-headings:tracking-tight prose-headings:mb-4
              ${mode === 'savage' ? 'prose-headings:text-orange-400' : 'prose-headings:text-blue-400'}
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
              prose-strong:text-slate-50 prose-strong:font-black
              prose-ul:my-6 prose-li:text-slate-300 prose-li:marker:text-slate-600
              prose-code:text-orange-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-900/80 prose-pre:border prose-pre:border-slate-800/80 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-pre:p-0
            `}>
              <ReactMarkdown
                components={{
                  code({ node, inline, children, className, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline ? (
                      <div className="my-6 relative group/code overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/50 shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/80">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{match ? match[1] : 'code'}</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed custom-scrollbar">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {result}
              </ReactMarkdown>
            </article>
          </div>
        )}
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 p-4 pointer-events-none select-none overflow-hidden h-32 w-32 flex items-center justify-center">
         <Loader2 size={120} className={`opacity-[0.02] ${isLoading ? 'animate-spin' : ''}`} />
      </div>
    </div>
  );
};

export default RoastOutput;
