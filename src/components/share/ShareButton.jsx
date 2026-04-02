import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Download, Flame, Ghost, Terminal, Sparkles } from 'lucide-react';

const ShareButton = ({ roast, language, mode = 'savage' }) => {
  const cardRef = useRef(null);

  if (!roast) return null;

  const handleShare = async () => {
    if (!cardRef.current) return;
    
    try {
      // Adding a small delay for any rendering to settle
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        quality: 1.0,
        pixelRatio: 2, // High DPI for premium look
        backgroundColor: '#020617' 
      });
      
      const link = document.createElement('a');
      link.download = `roast-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to share roast:', err);
    }
  };

  // Extract a clean version of the roast (no markdown symbols for the card)
  const cleanRoast = roast
    .replace(/[#*`]/g, '')
    .split('\n')
    .filter(line => line.trim())[0] || roast;

  return (
    <>
      <button 
        onClick={handleShare}
        className="group relative flex items-center gap-3 px-8 py-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(139,92,246,0.1)] active:scale-95 active:duration-100"
      >
        {/* Animated Background Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <Download size={18} className="text-violet-400 group-hover:scale-110 group-active:translate-y-1 transition-all duration-300 relative z-10" />
        <span className="text-[11px] font-black text-slate-400 group-hover:text-slate-100 uppercase tracking-[0.3em] transition-colors relative z-10">
          Share My Shame
        </span>
        
        <div className="absolute top-1 right-1">
          <Sparkles size={10} className="text-violet-500/0 group-hover:text-violet-500/40 transition-all duration-700 delay-100" />
        </div>
      </button>

      {/* Hidden Card for Capture */}
      <div className="fixed -left-[5000px] top-0 pointer-events-none select-none">
        <div 
          ref={cardRef} 
          className="w-[800px] p-16 bg-[#020617] border-[12px] border-slate-900 rounded-[4rem] relative overflow-hidden flex flex-col gap-12"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {/* Dynamic Accents */}
          <div className={`absolute top-0 right-0 w-[400px] h-[400px] blur-[150px] opacity-20 ${
            mode === 'savage' ? 'bg-rose-600' : 'bg-cyan-600'
          }`} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600 blur-[180px] opacity-[0.05]" />

          {/* Header */}
          <div className="flex items-center justify-between relative z-10">
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_20px_50px_rgba(139,92,246,0.4)]">
                   <Flame size={44} color="white" fill="white" />
                </div>
                <div>
                   <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                     Roast My <span className="text-cyan-400">Code</span>
                   </h2>
                   <p className="text-lg font-mono text-slate-500 uppercase tracking-[0.3em] font-black mt-2">
                     AI Core Protocol v1.5
                   </p>
                </div>
             </div>
             
             <div className={`px-6 py-3 rounded-2xl border-2 ${
               mode === 'savage' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
             } flex items-center gap-3`}>
                {mode === 'savage' ? <Ghost size={24} /> : <Terminal size={24} />}
                <span className="text-lg font-black uppercase tracking-[0.2em]">{mode}</span>
             </div>
          </div>

          {/* Content Body */}
          <div className="relative z-10 bg-slate-900/50 border-2 border-slate-800/50 p-12 rounded-[3.5rem] shadow-[-20px_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
             <div className="flex items-center gap-3 mb-8 opacity-50">
                <Sparkles size={20} className="text-slate-400" />
                <span className="text-sm font-mono text-slate-500 uppercase tracking-widest font-bold">Language: {language.toUpperCase()}</span>
             </div>
             
             <p className="text-4xl leading-[1.4] text-slate-100 font-bold italic tracking-tight">
               "{cleanRoast}"
             </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 relative z-10 border-t-2 border-slate-900/50 mt-4">
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
             </div>
             <p className="text-[12px] font-black text-slate-600 uppercase tracking-[0.4em]">
                ROASTMYCODE.APP • 0% EGOS REMAINING
             </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareButton;
