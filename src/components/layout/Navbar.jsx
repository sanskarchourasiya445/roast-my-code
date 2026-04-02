import React, { useState, useEffect } from 'react';
import { Flame, Github } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
        scrolled
          ? 'border-slate-800/80 bg-slate-950/90 shadow-xl shadow-black/20'
          : 'border-slate-800/60 bg-slate-950/70'
      } backdrop-blur-xl`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 p-3 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-500">
            <Flame className="h-6 w-6 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-100 uppercase italic leading-none">
              Roast<span className="text-violet-400">My</span>Code
            </h1>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500 group-hover:text-slate-400 transition-colors mt-0.5">
              AI Core Protocol
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition-all duration-200 hover:text-violet-400"
          >
            About
          </a>
          <a
            href="#"
            className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition-all duration-200 hover:text-cyan-400"
          >
            Hall of Shame
          </a>

          <div className="h-4 w-px bg-slate-800/80" />

          <a
            href="https://github.com/sanskarchourasiya445/roast-my-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-100 transition-all duration-200 hover:scale-110"
            aria-label="GitHub Repository"
          >
            <Github className="h-5 w-5" />
          </a>

          <button className="rounded-2xl bg-violet-600 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:bg-violet-500 hover:shadow-violet-500/40 hover:scale-[1.03] active:scale-95">
            Launch App
          </button>
        </div>

        {/* Mobile hamburger hint */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="https://github.com/sanskarchourasiya445/roast-my-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-100 transition-all"
          >
            <Github className="h-5 w-5" />
          </a>
          <button className="rounded-xl bg-violet-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-violet-500/20 hover:bg-violet-500 transition-all active:scale-95">
            Launch
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
