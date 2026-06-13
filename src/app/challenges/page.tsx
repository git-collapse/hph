"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle2, Lock, Code2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

const CHALLENGES = [
  { id: 1, title: "Sum of Array", difficulty: "Beginner", xp: 50, reqLevel: 1 },
  { id: 2, title: "Reverse String", difficulty: "Beginner", xp: 50, reqLevel: 1 },
  { id: 3, title: "Find the Vowels", difficulty: "Beginner", xp: 50, reqLevel: 1 },
  { id: 4, title: "Debounce Function", difficulty: "Intermediate", xp: 100, reqLevel: 2 },
  { id: 5, title: "Throttle Function", difficulty: "Intermediate", xp: 100, reqLevel: 3 },
  { id: 6, title: "Deep Clone Object", difficulty: "Advanced", xp: 200, reqLevel: 4 },
  { id: 7, title: "Implement Promise.all", difficulty: "Advanced", xp: 300, reqLevel: 5 },
  { id: 8, title: "Create EventEmitter", difficulty: "Advanced", xp: 300, reqLevel: 6 },
];

export default function ChallengesPage() {
  const { level } = useUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-extrabold mb-6 flex items-center justify-center gap-4">
          <Zap className="w-12 h-12 text-yellow-500 fill-yellow-500" />
          JavaScript Challenges
        </h1>
        <p className="text-xl text-zinc-400">
          Put your skills to the test. Complete coding challenges to earn massive XP and prove your mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CHALLENGES.map((chal, i) => {
          const isUnlocked = level >= chal.reqLevel;
          return (
            <motion.div
              key={chal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-6 border transition-all flex flex-col ${isUnlocked ? 'border-white/10 hover:-translate-y-2 cursor-pointer hover:border-primary/50' : 'border-white/5 opacity-50 grayscale'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  chal.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  chal.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {chal.difficulty}
                </span>
                <span className="text-sm font-bold text-yellow-500">+{chal.xp} XP</span>
              </div>
              
              <h3 className="text-xl font-bold mb-4">{chal.title}</h3>
              
              <div className="mt-auto">
                {isUnlocked ? (
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 rounded-lg text-sm font-bold hover:bg-primary/20 hover:text-primary transition-colors">
                    <Code2 className="w-4 h-4" /> Solve Challenge
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-center gap-2 py-2 bg-black/50 rounded-lg text-sm font-medium text-zinc-500">
                    <Lock className="w-4 h-4" /> Unlocks at Level {chal.reqLevel}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
