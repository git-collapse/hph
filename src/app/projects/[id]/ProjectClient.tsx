"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Save, Play } from "lucide-react";
import { useState } from "react";

export function ProjectClient({ project }: { project: { id: string, title: string, type: string } }) {
  const [code, setCode] = useState(`// Write your ${project.title} code here\\n\\nexport default function App() {\\n  return (\\n    <div className="p-4 bg-white/5 rounded">\\n      <h1>${project.title}</h1>\\n      <p>Start building!</p>\\n    </div>\\n  );\\n}`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/projects" className="text-zinc-400 hover:text-white transition-colors text-sm mb-2 inline-block flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <h1 className="text-3xl font-extrabold">{project.title}</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
            <Save className="w-4 h-4 mr-2" /> Save Progress
          </button>
          <button className="flex items-center px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-[0_0_20px_2px_rgba(247,223,30,0.2)]">
            <Play className="w-4 h-4 mr-2 fill-black" /> Run Project
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
            <span>App.jsx</span>
            <span className="text-blue-400 text-xs border border-blue-400/30 bg-blue-400/10 px-2 py-0.5 rounded">React JSX</span>
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
          className="glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden bg-white"
        >
          <div className="bg-zinc-800 px-4 py-2 border-b border-zinc-700 text-sm font-mono text-zinc-400 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2">Live Preview (Mock)</span>
          </div>
          <div className="flex-1 w-full p-6 text-black flex items-center justify-center">
             <div className="text-center">
               <div className="text-6xl mb-4">🚀</div>
               <h3 className="text-2xl font-bold mb-2">Live Preview Area</h3>
               <p className="text-zinc-500">In a full application, this would run a sandboxed iframe with an esbuild compiler.</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
