"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Save, Copy, Check } from "lucide-react";

export default function PlaygroundPage() {
  const [code, setCode] = useState(`// Welcome to the JSVerse Playground!
// Write your JavaScript code here...

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

console.log("Original:", numbers);
console.log("Doubled:", doubled);
`);
  const [output, setOutput] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    // Basic sandboxed execution capturing console.log
    const logs: string[] = [];
    const originalConsoleLog = console.log;
    
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };

    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(code);
      fn();
      if (logs.length === 0) {
        logs.push("Code executed successfully (no output).");
      }
    } catch (err: any) {
      logs.push(`Error: ${err.message}`);
    }

    console.log = originalConsoleLog;
    setOutput(logs);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <span className="text-4xl">💻</span> JavaScript Playground
          </h1>
          <p className="text-zinc-400 mt-1">Write, execute, and test code in real-time.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={copyCode} className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
            {copied ? <Check className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
            Copy
          </button>
          <button onClick={() => {setCode(""); setOutput([]);}} className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button onClick={runCode} className="flex items-center px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-[0_0_20px_2px_rgba(247,223,30,0.2)]">
            <Play className="w-4 h-4 mr-2 fill-black" />
            Run Code
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden"
        >
          <div className="bg-black/60 px-4 py-2 border-b border-white/10 flex justify-between items-center text-sm font-mono text-zinc-400">
            <span>index.js</span>
            <span className="text-primary text-xs border border-primary/30 bg-primary/10 px-2 py-0.5 rounded">JavaScript</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-transparent text-zinc-200 p-6 font-mono text-sm resize-none focus:outline-none focus:ring-0 leading-relaxed"
            spellCheck={false}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden"
        >
          <div className="bg-black/60 px-4 py-2 border-b border-white/10 text-sm font-mono text-zinc-400">
            Console Output
          </div>
          <div className="flex-1 w-full bg-black/40 p-6 font-mono text-sm overflow-y-auto">
            {output.length === 0 ? (
              <span className="text-zinc-600 italic">Run code to see output...</span>
            ) : (
              output.map((line, i) => (
                <div key={i} className={`mb-2 ${line.startsWith('Error:') ? 'text-red-400' : 'text-green-400'}`}>
                  <span className="text-zinc-600 mr-2">{">"}</span> {line}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
