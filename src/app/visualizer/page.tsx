"use client";

import { motion } from "framer-motion";
import { PlaySquare, Plus, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function VisualizerPage() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      code: "const name = 'JSVerse';",
      stack: ["Global Execution Context"],
      memory: [{ key: "name", val: "'JSVerse'", type: "primitive" }]
    },
    {
      code: "const user = { age: 25 };",
      stack: ["Global Execution Context"],
      memory: [
        { key: "name", val: "'JSVerse'", type: "primitive" },
        { key: "user", val: "<ref 0x01>", type: "reference" }
      ],
      heap: [{ address: "0x01", val: "{ age: 25 }" }]
    },
    {
      code: "function greet() {\\n  console.log(name);\\n}\\ngreet();",
      stack: ["greet() Execution Context", "Global Execution Context"],
      memory: [
        { key: "name", val: "'JSVerse'", type: "primitive" },
        { key: "user", val: "<ref 0x01>", type: "reference" },
        { key: "greet", val: "<func ref>", type: "reference" }
      ],
      heap: [{ address: "0x01", val: "{ age: 25 }" }]
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-3">
          <PlaySquare className="text-blue-400 w-10 h-10" /> JavaScript Visualizer
        </h1>
        <p className="text-zinc-400 text-lg">Watch how the JavaScript Engine executes code, manages the Call Stack, and allocates Memory.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Code Editor Side */}
        <div className="glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden">
          <div className="bg-black/60 px-4 py-3 border-b border-white/10 text-sm font-bold text-zinc-200">
            Execution Flow
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed text-green-400 bg-black/40 flex-1">
            {steps.map((s, i) => (
              <div 
                key={i} 
                className={`p-2 rounded ${i === step ? 'bg-white/10 border border-white/20' : 'opacity-50'}`}
              >
                <pre>{s.code}</pre>
              </div>
            ))}
          </div>
          <div className="p-4 bg-black/60 border-t border-white/10 flex justify-end">
            <button 
              onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
              disabled={step === steps.length - 1}
              className="flex items-center px-6 py-2 bg-primary text-black font-bold rounded-lg disabled:opacity-50 transition-colors"
            >
              Step Forward <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            {step === steps.length - 1 && (
              <button 
                onClick={() => setStep(0)}
                className="ml-4 flex items-center px-4 py-2 bg-white/10 text-white font-bold rounded-lg transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Engine Side */}
        <div className="lg:col-span-2 grid grid-rows-2 gap-6">
          {/* Call Stack */}
          <motion.div 
            key={`stack-${step}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden"
          >
            <div className="bg-black/60 px-4 py-3 border-b border-white/10 text-sm font-bold text-zinc-200 flex justify-between">
              Call Stack
            </div>
            <div className="p-6 flex-1 flex flex-col justify-end gap-2 bg-black/20">
              {currentStep.stack.map((frame, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={frame + i}
                  className="bg-blue-500/20 border border-blue-500/50 p-4 rounded-xl text-center font-bold text-blue-200"
                >
                  {frame}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Memory */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              key={`stackmem-${step}`}
              className="glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden"
            >
              <div className="bg-black/60 px-4 py-3 border-b border-white/10 text-sm font-bold text-zinc-200">
                Stack Memory (Primitives)
              </div>
              <div className="p-4 flex-1 bg-black/20 font-mono text-sm space-y-2">
                {currentStep.memory.map((mem) => (
                  <div key={mem.key} className="flex justify-between p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-zinc-400">{mem.key}</span>
                    <span className={mem.type === 'reference' ? 'text-purple-400' : 'text-yellow-400'}>{mem.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              key={`heapmem-${step}`}
              className="glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden"
            >
              <div className="bg-black/60 px-4 py-3 border-b border-white/10 text-sm font-bold text-zinc-200">
                Heap Memory (Objects/Funcs)
              </div>
              <div className="p-4 flex-1 bg-black/20 font-mono text-sm space-y-2 relative">
                {currentStep.heap?.map((mem) => (
                  <div key={mem.address} className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <div className="text-xs text-purple-400 mb-1">{mem.address}</div>
                    <div className="text-white">{mem.val}</div>
                  </div>
                ))}
                {!currentStep.heap && (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                    Empty Heap
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
