import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Terminal, Code2, ShieldAlert, Zap, TrendingDown, Loader2, Sparkles, Flame } from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import RoastOutput from '../components/output/RoastOutput';
import ShareButton from '../components/share/ShareButton';
import ModeToggle from '../components/controls/ModeToggle';
import ToneSlider from '../components/controls/ToneSlider';
import { roastCode } from '../lib/gemini';
import { DEFAULT_CODE } from '../constants/editor';

const Home = () => {
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [language, setLanguage] = useState('javascript');
  const [isRoasting, setIsRoasting] = useState(false);
  const [roastResult, setRoastResult] = useState('');
  const [mode, setMode] = useState('savage');
  const [tone, setTone] = useState(70);
  const [error, setError] = useState('');

  const handleClear = () => {
    setCode('');
    setRoastResult('');
  };

  const handleRoast = async () => {
    if (!code.trim()) {
      setError("Paste some code first, newbie!");
      return;
    }

    setIsRoasting(true);
    setRoastResult('');
    setError('');

    try {
      // lib/gemini.js returns the full text directly
      const result = await roastCode(code, language, mode, tone);
      setRoastResult(result);
    } catch (err) {
      console.error("Roasting failed:", err);
      setError(err.message || "Ugh, something went wrong. Even the AI couldn't handle your code.");
    } finally {
      setIsRoasting(false);
    }
  };

  const handleCopy = () => {
    if (roastResult) {
      navigator.clipboard.writeText(roastResult);
      alert("Burn copied to clipboard! Spread the shame.");
    }
  };

  return (
    <MainLayout 
      leftPanel={
        <div className="space-y-16 animate-in slide-in-from-left-4 duration-700">
          <div className="flex-1 flex flex-col gap-6 md:gap-8 min-h-[400px] md:min-h-[500px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
                    <Terminal size={24} className="text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-[0.3em] text-slate-100">Code Terminal</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 italic">V1.5 CORE INTERFACE</p>
                  </div>
               </div>
               {code && (
                  <div className="px-4 py-1 rounded-xl bg-violet-500/5 border border-violet-500/20 animate-pulse">
                    <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Awaiting Analysis</span>
                  </div>
               )}
            </div>
            
            <CodeEditor 
              value={code} 
              onChange={(val) => setCode(val)} 
              language={language}
              onLanguageChange={(lang) => setLanguage(lang)}
              onClear={handleClear}
            />
          </div>

          <div className="animate-in slide-in-from-bottom-8 duration-1000 delay-300">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                  <ShieldAlert size={24} className="text-rose-400" />
                </div>
                <div>
                  <h2 className="text-lg font-black uppercase tracking-[0.3em] text-slate-100">Analysis Results</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 italic">GENERATED INTELLIGENCE</p>
                </div>
             </div>
             <div className="rounded-[2.5rem]">
               <RoastOutput result={roastResult} isLoading={isRoasting} mode={mode} />
             </div>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-12 animate-in slide-in-from-right-4 duration-700">
          {/* Roast Controls & CTA */}
          <div className="glass-panel p-6 bg-slate-900/40 border-slate-800/60 shadow-xl relative overflow-hidden group/controls">
            <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] group-hover/controls:opacity-10 transition-opacity duration-700 rotate-12">
              <Zap size={200} className="text-violet-500" />
            </div>
            
            <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-6 flex items-center gap-2">
              <Zap size={16} className="text-violet-500" />
              Settings
            </h3>

            <div className="space-y-6">
              <div className="space-y-3">
                 <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">AI Persona</span>
                 <ModeToggle mode={mode} onModeChange={setMode} />
              </div>
              
              <div className="space-y-3">
                 <ToneSlider tone={tone} onToneChange={setTone} />
              </div>
              
              <button 
                onClick={handleRoast}
                disabled={isRoasting || !code.trim()}
                className="w-full rounded-2xl bg-violet-600 px-5 py-4 mt-2 text-sm font-semibold tracking-wide text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-violet-500 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
              >
                {isRoasting ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-white" />
                    <span className="text-sm uppercase tracking-wider">INCINERATING...</span>
                  </>
                ) : (
                  <>
                    <Flame size={18} className="text-white fill-current group-hover/btn:animate-pulse" />
                    <span className="text-sm uppercase tracking-wider">ROAST THIS CODE</span>
                  </>
                )}
              </button>
              
              {roastResult && !isRoasting && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-700 pt-4">
                   <div className="h-px bg-slate-800/80 w-full" />
                   <ShareButton roast={roastResult} language={language} mode={mode} />
                </div>
              )}
              
              {error && (
                <div className="mt-10 border-t border-slate-800/80 pt-10">
                  <div className="p-6 bg-red-500/5 border-2 border-red-500/20 rounded-[2rem] flex items-start gap-5 animate-in slide-in-from-bottom-2 duration-500">
                    <div className="p-3 bg-red-500/10 rounded-xl">
                      <ShieldAlert size={24} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-red-500 uppercase tracking-widest">Protocol Breach</p>
                      <p className="text-[13px] text-red-400 mt-2 leading-relaxed font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="glass-panel p-6 bg-slate-900/40 border-slate-800/60 shadow-xl overflow-hidden relative group/feed">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/feed:opacity-10 transition-opacity duration-700">
                <Terminal size={100} className="text-slate-500" />
              </div>

              <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                Live Intelligence
              </h3>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 bg-slate-900/40 backdrop-blur-xl border border-slate-700/60 rounded-xl hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group/item hover:bg-slate-800/40">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">ID: VICTIM_0{i}</span>
                      <span className="text-[9px] uppercase text-cyan-400 font-black tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 leading-none">High Heat</span>
                    </div>
                    <p className="text-xs text-slate-400 tracking-tight leading-relaxed font-medium group-hover/item:text-slate-200 transition-colors line-clamp-2 italic">
                      "{i === 1 ? "This O(n^3) complexity is basically a DDoS attack on your own infrastructure." : "Recursion without a base case? Are you trying to discover the end of the universe?"}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 shadow-xl overflow-hidden relative group/burn">
              <div className="absolute -right-12 -top-12 text-violet-500/10 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-1000">
                  <TrendingDown size={220} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                   <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
                     <ShieldAlert size={22} className="text-violet-400" />
                   </div>
                   <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    System Status
                  </h3>
                </div>
                
                <p className="text-[14px] text-slate-400 leading-relaxed mb-8 font-medium">
                  Intelligence core reports <span className="text-rose-400 font-black italic">critical inefficiency</span> levels in your current deployment.
                </p>
                
                <div className="space-y-4">
                  <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                    <div className="h-full w-[15%] bg-gradient-to-r from-rose-600 to-rose-400 rounded-full shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-pulse" />
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap justify-between items-end gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 leading-none mb-1">Tier Status</span>
                      <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Spaghetti V1.0</span>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 leading-none mb-1">Quality Index</span>
                      <div className="text-3xl font-black text-rose-500 tracking-tighter italic leading-none">15<span className="text-sm text-rose-500/40 font-black not-italic ml-1">/100</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      topSection={
        <div className="mb-20 space-y-10 animate-in fade-in slide-in-from-top-12 duration-1000">
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-2">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em]">Next-Gen Code Humiliation</span>
           </div>
           
           <div className="max-w-4xl space-y-6 md:space-y-8">
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black leading-none tracking-tight break-words">
                <span className="text-slate-100">IS YOUR CODE</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">
                  GARBAGE?
                </span>
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                 <p className="text-lg sm:text-xl md:text-2xl text-slate-400/90 max-w-2xl leading-relaxed font-bold tracking-tight">
                    The only code reviewer that doesn't care about your feelings. Paste your code and prepare for <span className="text-violet-400 font-extrabold underline underline-offset-8 decoration-violet-500/30">the digital burn.</span>
                 </p>
                 
                 <div className="flex-shrink-0 animate-float hidden md:block">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-slate-900 border-2 border-slate-800 flex items-center justify-center shadow-2xl relative">
                       <div className="absolute inset-0 bg-violet-500/10 blur-xl rounded-full" />
                       <Flame size={48} className="text-violet-500 relative z-10" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      }
    />
  );
};

export default Home;
