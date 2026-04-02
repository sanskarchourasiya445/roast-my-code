import React from 'react';
import Editor, { loader } from '@monaco-editor/react';

// Configure Monaco to use a different CDN or local source if needed to bypass 'Tracking Prevention' blocks
loader.config({
  paths: {
    vs: 'https://unpkg.com/monaco-editor@0.55.1/min/vs'
  }
});
import { Trash2, ChevronDown, Code2 } from 'lucide-react';
import { DEFAULT_CODE, SUPPORTED_LANGUAGES } from '../../constants/editor';

const CodeEditor = ({ value, onChange, language = 'javascript', onLanguageChange, onClear }) => {
  const languages = SUPPORTED_LANGUAGES;
  const defaultCode = DEFAULT_CODE;

  const editorValue = value !== undefined && value !== null ? value : (defaultCode[language] || defaultCode.javascript);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700/60 bg-[#111827]/80 shadow-2xl w-full h-[400px] md:h-[600px] flex flex-col group/editor transition-all duration-500">
      {/* Editor Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 gap-4 sm:gap-0 w-full overflow-x-hidden">
        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20 hover:bg-amber-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500 transition-colors cursor-pointer" />
          </div>
          
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Language Selector */}
          <div className="relative flex items-center group/dropdown flex-shrink-0">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="appearance-none bg-slate-900/50 border border-slate-800/50 text-[10px] font-black text-slate-400 hover:text-slate-100 hover:bg-slate-900 px-4 pr-10 py-1.5 rounded-xl cursor-not-allowed pointer-events-none focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all uppercase tracking-[0.2em]"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value} className="bg-slate-900 text-slate-300">
                  {lang.label}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-3.5 text-slate-500 pointer-events-none group-hover/dropdown:text-slate-300 transition-colors" />
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-800/50 sm:border-0">
          <button 
            onClick={onClear}
            className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-black text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all uppercase tracking-widest bg-slate-950/20 border border-transparent hover:border-rose-500/20 group/clear"
          >
            <Trash2 size={13} className="text-slate-600 group-hover/clear:text-rose-500 transition-colors" />
            <span>Clear</span>
          </button>
          
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-violet-400 animate-pulse" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest hidden sm:inline">Monaco Engine</span>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest sm:hidden">Monaco</span>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden relative custom-scrollbar">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={editorValue}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 20, bottom: 20 },
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            contextmenu: true,
            lineHeight: 1.6,
            backgroundColor: '#020617',
          }}
        />
      </div>
      
      {/* Footer Info */}
      <div className="px-4 sm:px-6 py-2 bg-slate-950/80 backdrop-blur-md flex flex-wrap gap-2 items-center justify-between border-t border-slate-900/80 text-[10px] font-bold text-slate-600 tracking-wider">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-2 hover:text-slate-400 transition-colors cursor-pointer"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> <span className="hidden sm:inline">READY</span></span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer">UTF-8</span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer hidden sm:inline">LN 1, COL 1</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 uppercase">
            <span className="hover:text-slate-400 transition-colors cursor-pointer hidden sm:inline">Tab Size: 4</span>
            <span className="text-cyan-400 font-black tracking-[0.2em]">{language}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
