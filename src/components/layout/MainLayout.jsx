import React from 'react';
import Navbar from './Navbar';

export const MainLayout = ({ children, leftPanel, rightPanel }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* Left Content Panel (Main Area) */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            {leftPanel || children}
          </div>

          {/* Right Content Panel (Sidebar / Context Area) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {rightPanel}
          </aside>
        </div>
      </main>

      <footer className="w-full border-t border-slate-900 bg-slate-950 px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="text-xs text-slate-500 uppercase tracking-widest">
          No egos were harmed in the making of this roasting service... probably.
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
