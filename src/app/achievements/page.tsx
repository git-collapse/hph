"use client";

import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { Award, Lock } from "lucide-react";

export default function AchievementsPage() {
  const { xp, level, streak, completedModules } = useUser();

  const BADGES = [
    { id: "first-steps", icon: "👶", name: "First Steps", desc: "Start learning your first module", unlocked: xp > 0 },
    { id: "on-fire", icon: "🔥", name: "On Fire", desc: "Reach a 3 Day Streak", unlocked: streak >= 3 },
    { id: "smarty", icon: "🧠", name: "Smarty Pants", desc: "Reach Level 5", unlocked: level >= 5 },
    { id: "js-king", icon: "👑", name: "JS King", desc: "Finish the entire Syllabus", unlocked: completedModules.length >= 5 },
    { id: "coder", icon: "💻", name: "Code Monkey", desc: "Run code in the Playground", unlocked: false }, // Mocked for now
    { id: "architect", icon: "🏗️", name: "Architect", desc: "Build 3 Mini Projects", unlocked: false }, // Mocked for now
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 flex justify-center items-center gap-3">
          <Award className="text-purple-400 w-10 h-10" /> Achievement Hall
        </h1>
        <p className="text-zinc-400 text-lg">Collect badges by completing milestones and proving your skills.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {BADGES.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card relative p-8 rounded-3xl flex flex-col items-center justify-center text-center border transition-all ${badge.unlocked ? 'border-primary/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] bg-purple-500/5' : 'border-white/5 opacity-60 grayscale'}`}
          >
            {!badge.unlocked && (
              <div className="absolute top-4 right-4 text-zinc-600">
                <Lock className="w-4 h-4" />
              </div>
            )}
            <div className="text-6xl mb-4 filter drop-shadow-lg">{badge.icon}</div>
            <h3 className="font-bold text-lg mb-2 text-white">{badge.name}</h3>
            <p className="text-sm text-zinc-400">{badge.desc}</p>
            {badge.unlocked && (
              <div className="mt-4 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
                Unlocked
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
