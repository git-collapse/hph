"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, PlaySquare, Trophy, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-white/10 glass text-sm font-medium mb-6 inline-block">
              Welcome to the future of learning ✨
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Master JavaScript.<br />
              <span className="text-gradient">Build the Web.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-zinc-400 mb-10">
              An interactive, gamified universe to learn JavaScript from zero to mastery. 
              Visualize concepts, write code, and build real-world projects.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses">
                <button className="flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-[0_0_40px_8px_rgba(247,223,30,0.3)]">
                  Start Learning Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <Link href="/playground">
                <button className="flex items-center px-8 py-4 glass text-white font-bold rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                  Open Playground
                  <Code2 className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <FeatureCard 
              icon={<PlaySquare className="w-8 h-8 text-blue-400" />}
              title="Interactive Visualizers"
              description="Watch the Call Stack, Event Loop, and Memory Heap in real-time."
            />
            <FeatureCard 
              icon={<Code2 className="w-8 h-8 text-green-400" />}
              title="Built-in Playground"
              description="Write, run, and debug code directly in your browser without any setup."
            />
            <FeatureCard 
              icon={<Trophy className="w-8 h-8 text-yellow-400" />}
              title="Gamified Learning"
              description="Earn XP, level up, unlock achievements, and climb the leaderboard."
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card p-6 rounded-2xl text-left hover:-translate-y-2 transition-transform duration-300">
      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
