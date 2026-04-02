import React from 'react';
import Navbar from './Navbar';

export const MainLayout = ({ children, leftPanel, rightPanel, topSection }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-orange-500/30 selection:text-orange-200 overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-10 md:py-20 animate-in fade-in duration-1000">
        {topSection && (
          <div className="w-full">
            {topSection}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 h-full">
          {/* Left Content Panel (Main Area) */}
          <div className="lg:col-span-8 flex flex-col space-y-16 md:space-y-24">
            {leftPanel || children}
          </div>

          {/* Right Content Panel (Sidebar / Context Area) */}
          <aside className="lg:col-span-4 flex flex-col gap-12 md:gap-20">
            {rightPanel}
          </aside>
        </div>
      </main>

      <footer className="w-full border-t border-slate-900 bg-slate-950/50 backdrop-blur-sm px-4 py-10 text-center sm:px-6 lg:px-8 mt-auto">
        <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em] font-black">
          © {new Date().getFullYear()} ROAST MY CODE • NO EGOS SURVIVED
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
