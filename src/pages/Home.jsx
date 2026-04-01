import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Terminal, Code2, ShieldAlert, Zap, TrendingDown, Loader2 } from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import RoastResult from '../components/features/RoastResult';
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

  const LeftPanel = (
    <div className="space-y-8 flex-1 flex flex-col min-h-[600px]">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Is your code <span className="premium-gradient-text">garbage?</span>
          <br />
          <span className="text-slate-400">Let AI tell you the truth.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          The only code reviewer that doesn't care about your feelings. Paste your snippet below and prepare for the burn.
        </p>
      </div>

      <div className="flex-1 flex flex-col min-h-[500px]">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Terminal size={20} className="text-orange-500" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Code Submission</h2>
          </div>
        </div>
        
        <CodeEditor 
          value={code} 
          onChange={(val) => setCode(val)} 
          language={language}
          onLanguageChange={(lang) => setLanguage(lang)}
          onClear={handleClear}
        />

        {/* Result moved to RightPanel */}
      </div>
    </div>
  );

  const RightPanel = (
    <div className="space-y-6">
      {/* Roast Controls & CTA */}
      <div className="glass-panel p-6 bg-slate-900 border-slate-800 shadow-2xl relative overflow-hidden group/controls">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/controls:opacity-20 transition-opacity">
          <Zap size={80} className="text-orange-500" />
        </div>
        
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <Zap size={16} className="text-orange-500" />
          Roast Configuration
        </h3>

        <div className="space-y-6">
          <ModeToggle mode={mode} onModeChange={setMode} />
          <ToneSlider tone={tone} onToneChange={setTone} />
          
          <button 
            onClick={handleRoast}
            disabled={isRoasting || !code.trim()}
            className="w-full py-5 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed group/btn relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            
            {isRoasting ? (
              <>
                <Loader2 size={24} className="animate-spin text-white" />
                <span className="text-lg uppercase tracking-tight">Generating Burns...</span>
              </>
            ) : (
              <>
                <span className="text-lg uppercase tracking-tight">🔥 Roast It!</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:rotate-12 transition-transform">
                  <Zap size={18} fill="currentColor" />
                </div>
              </>
            )}
          </button>
          
          {(roastResult || isRoasting || error) && (
            <div className="mt-6 border-t border-slate-800 pt-6">
              {error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                  <ShieldAlert size={18} className="text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-red-500 uppercase">System Error</p>
                    <p className="text-xs text-red-400 mt-1 leading-relaxed">{error}</p>
                  </div>
                </div>
              ) : (
                <RoastResult result={roastResult} onCopy={handleCopy} isRoasting={isRoasting} mode={mode} />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="glass-panel p-5 bg-slate-900 border-slate-800 shadow-xl">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <ShieldAlert size={16} className="text-red-500" />
          Live Roasts
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-slate-500">USER_8231</span>
                <span className="text-[10px] uppercase text-orange-500 font-bold">SAVAGE</span>
              </div>
              <p className="text-xs text-slate-400 italic line-clamp-2 group-hover:text-slate-300">
                "This O(n^3) complexity is basically a DDoS attack on your own infrastructure."
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800">
          <button className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">
            View All Casualties
          </button>
        </div>
      </div>

      <div className="glass-panel p-5 bg-orange-500/5 border-orange-500/10 shadow-xl overflow-hidden relative">
        <div className="absolute -right-4 -top-4 text-orange-500/10 rotate-12">
            <TrendingDown size={120} />
        </div>
        <div className="relative z-10">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-[0.2em] mb-2">
            Performance Burn
          </h3>
          <p className="text-xs text-orange-300/70 leading-relaxed mb-4">
            AI has detected that your code is 400% slower than a potato.
          </p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[15%] bg-orange-500 rounded-full" />
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-[10px] font-bold text-slate-500">TIER: SPAGHETTI</span>
            <span className="text-[10px] font-bold text-orange-500">15/100 QUALITY</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout leftPanel={LeftPanel} rightPanel={RightPanel} />
  );
};

export default Home;
