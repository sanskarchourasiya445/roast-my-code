import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Terminal, Code2, ShieldAlert, Zap, TrendingDown, Loader2 } from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import RoastResult from '../components/features/RoastResult';

const Home = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isRoasting, setIsRoasting] = useState(false);
  const [roastResult, setRoastResult] = useState(null);

  const mockRoastsByLanguage = {
    javascript: [
      "This O(n^3) complexity is basically a DDoS attack on your own infrastructure. Have you considered a career in management?",
      "Your callback hell has more layers than an onion, and it's making me cry just as much.",
      "The way you handle promises makes me think you have serious commitment issues."
    ],
    typescript: [
      "Adding 'any' to every type doesn't make it TypeScript, it makes it a cry for help.",
      "Your interfaces are so loose, a truck could drive through them. What exactly are you protecting against?",
      "Type safety? More like type suggestion. This code belongs in a museum of 'How Not To Typed State'."
    ],
    python: [
      "Your indentation is the only thing providing structure to your life, and it's still inconsistent.",
      "List comprehensions are not intended to replace entire libraries. Please, think of the readability.",
      "This Python code is so slow, it should come with a calendar instead of a debugger."
    ],
    java: [
      "The amount of boilerplate here could construct a skyscraper. Why write 100 lines for a 'Hello World'?",
      "Your class hierarchy is so deep, I'm getting decompression sickness just reading it.",
      "Object-oriented? More like Abstract-Factory-Strategy-Decorator-Hell-Oriented."
    ],
    cpp: [
      "This memory leak is so massive, it’s basically an underwater volcano. Your heap is a disaster zone.",
      "I see a segfault in your future. Probably in the next 0.5 seconds of runtime.",
      "Your pointer arithmetic is how accidental nuclear launches happen. Please stop."
    ],
    go: [
      "If err != nil { return err } ... yes, we get it. We all get it. You write Go.",
      "Goroutine leaks? In this economy? Your concurrency model is basically a race condition in a suit.",
      "This code is as sterile as an operating room, and just as painful to stay in for too long."
    ],
  };

  const handleClear = () => {
    setCode('');
    setRoastResult(null);
  };

  const handleRoast = () => {
    if (!code.trim()) return;

    setIsRoasting(true);
    setRoastResult(null);

    // Simulate AI "Processing"
    setTimeout(() => {
      const languageRoasts = mockRoastsByLanguage[language] || mockRoastsByLanguage.javascript;
      const randomRoast = languageRoasts[Math.floor(Math.random() * languageRoasts.length)];
      setRoastResult(randomRoast);
      setIsRoasting(false);
    }, 2000);
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
        <div className="flex items-center gap-3 mb-4">
          <Terminal size={20} className="text-orange-500" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Code Submission</h2>
        </div>
        
        <CodeEditor 
          value={code} 
          onChange={(val) => setCode(val)} 
          language={language}
          onLanguageChange={(lang) => setLanguage(lang)}
          onClear={handleClear}
        />

        <div className="mt-6">
          <button 
            onClick={handleRoast}
            disabled={isRoasting || !code.trim()}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            {isRoasting ? (
              <>
                <Loader2 size={18} className="animate-spin text-white" />
                <span>Generating Burns...</span>
              </>
            ) : (
              <>
                <span>Roast This Snippet</span>
                <Zap size={18} fill="currentColor" className="group-hover:animate-bounce" />
              </>
            )}
          </button>
        </div>

        {/* Display The Roast */}
        <RoastResult result={roastResult} onCopy={handleCopy} />
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
