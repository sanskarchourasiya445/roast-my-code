import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Terminal, Code2, ShieldAlert, Zap, TrendingDown } from 'lucide-react';

const Home = () => {
  const LeftPanel = (
    <div className="space-y-8">
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

      <div className="glass-panel p-6 border-orange-500/20 shadow-2xl shadow-orange-500/5">
        <div className="flex items-center gap-3 mb-4">
          <Terminal size={20} className="text-orange-500" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Code Submission</h2>
        </div>
        <div className="relative group">
          <textarea 
            placeholder="Paste your nasty spaghetti code here..."
            className="w-full h-80 bg-slate-950/50 border border-slate-800 rounded-lg p-4 font-mono text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-slate-700"
          />
          <div className="absolute inset-0 bg-blue-500/0 group-focus-within:bg-blue-500/0 pointer-events-none transition-all rounded-lg" />
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-8 py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            Roast This Snippet
            <Zap size={18} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );

  const RightPanel = (
    <div className="space-y-6">
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
