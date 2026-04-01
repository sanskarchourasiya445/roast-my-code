import React from 'react';
import Editor from '@monaco-editor/react';
import { Trash2, ChevronDown, Code2 } from 'lucide-react';

const CodeEditor = ({ value, onChange, language = 'javascript', onLanguageChange, onClear }) => {
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
  ];

  const defaultCode = {
    javascript: `// Paste your nasty spaghetti code here...
function calculateTotal(price, tax) {
    const total = price + (price * tax);
    console.log("The total is: " + total);
    return total;
}

calculateTotal(100, 0.1);`,
    typescript: `// Roast your typed garbage...
interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "John" };
console.log(user);`,
    python: `# Spaghetti in Python? 
def greet(name):
    print(f"Hello, {name}!")

greet("Victim")`,
    java: `// Boilerplate hell...
public class Main {
    public static void main(String[] args) {
        System.out.println("Roast me!");
    }
}`,
    cpp: `// Segfault waiting to happen...
#include <iostream>

int main() {
    std::cout << "Roast me!" << std::endl;
    return 0;
}`,
    go: `// Gophers like it roasted...
package main
import "fmt"

func main() {
    fmt.Println("Roast me!")
}`,
  };

  const editorValue = value !== undefined && value !== null ? value : (defaultCode[language] || defaultCode.javascript);

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] shadow-2xl flex flex-col group/editor">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 min-w-[60px]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 hover:bg-red-500 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 hover:bg-yellow-500 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 hover:bg-green-500 transition-colors" />
          </div>
          
          <div className="h-4 w-px bg-slate-800" />

          {/* Language Selector */}
          <div className="relative flex items-center group/dropdown">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="appearance-none bg-slate-950/50 border border-slate-800 text-[11px] font-mono font-bold text-slate-400 hover:text-slate-200 px-3 pr-8 py-1 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-all uppercase tracking-widest"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value} className="bg-slate-900 text-slate-300">
                  {lang.label}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 text-slate-500 pointer-events-none group-hover/dropdown:text-slate-300 transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onClear}
            className="flex items-center gap-2 px-2.5 py-1 text-[10px] font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all uppercase tracking-widest bg-slate-950/30 border border-transparent hover:border-red-500/20"
          >
            <Trash2 size={12} />
            <span>Clear</span>
          </button>
          
          <div className="h-4 w-px bg-slate-800" />
          
          <Code2 size={14} className="text-slate-600 animate-pulse" />
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden relative">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={editorValue}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Fira Code, monospace',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            contextmenu: true,
            lineHeight: 1.5,
          }}
        />
      </div>
      
      {/* Footer Info */}
      <div className="px-4 py-1.5 bg-slate-950 flex items-center justify-between border-t border-slate-900 text-[9px] font-mono text-slate-600">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500/50" /> Connected</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-4 uppercase tracking-widest">
            <span>Spaces: 4</span>
            <span>{language}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
