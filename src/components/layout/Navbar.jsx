import React from 'react';
import { Flame, Code2, Globe, Terminal } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/70 backdrop-blur-xl transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_20px_rgba(249,115,22,0.35)] group-hover:shadow-[0_0_30px_rgba(249,115,22,0.55)] transition-all duration-500">
              <Flame size={28} className="text-white fill-current animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-slate-50 leading-none flex items-center gap-1.5 uppercase italic">
                Roast My <span className="text-orange-500">Code</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 group-hover:text-orange-500 transition-colors">
                AI CORE PROTOCOL
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a href="#" className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-100 transition-all">Mission</a>
            <a href="#" className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-100 transition-all">Hall of Shame</a>
            <div className="h-4 w-px bg-slate-800/80" />
            <a href="https://github.com" target="_blank" rel="noopener" className="text-slate-500 hover:text-slate-100 transition-all hover:scale-110">
              <svg height="22" viewBox="0 0 16 16" width="22" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <button className="px-6 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-xl bg-slate-900 border border-slate-800 text-slate-100 hover:bg-slate-800 hover:border-slate-700 hover:shadow-xl transition-all active:scale-95 shadow-2xl">
              Launch App
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
