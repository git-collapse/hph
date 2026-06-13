"use client";

import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { Trophy, Flame, Star, Award, BookOpen, CheckCircle, Target } from "lucide-react";
import { COURSE_MODULES } from "@/data/courses";

export default function DashboardPage() {
  const { xp, level, streak, completedModules } = useUser();
  const totalModules = COURSE_MODULES.length;
  const progressPercent = Math.round((completedModules.length / totalModules) * 100) || 0;
  const xpForNextLevel = level * 100;
  const xpProgress = ((xp % 100) / 100) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Your Dashboard</h1>
        <p className="text-zinc-400 text-lg">Track your progress, achievements, and statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Stats Cards */}
        <StatCard 
          icon={<Trophy className="w-8 h-8 text-yellow-500" />} 
          title="Total XP" 
          value={xp.toString()} 
          delay={0.1}
        />
        <StatCard 
          icon={<Star className="w-8 h-8 text-primary" />} 
          title="Current Level" 
          value={level.toString()} 
          delay={0.2}
        />
        <StatCard 
          icon={<Flame className="w-8 h-8 text-orange-500" />} 
          title="Day Streak" 
          value={streak.toString()} 
          delay={0.3}
        />
        <StatCard 
          icon={<BookOpen className="w-8 h-8 text-blue-400" />} 
          title="Modules Done" 
          value={`${completedModules.length} / ${totalModules}`} 
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Section */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Target className="text-primary" /> Level Progress
            </h2>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-zinc-400">Level {level}</span>
              <span className="text-zinc-400">Level {level + 1}</span>
            </div>
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-yellow-500 to-primary rounded-full"
              />
            </div>
            <p className="text-center text-sm text-zinc-400">
              {xp % 100} / 100 XP to next level
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="text-blue-400" /> Course Progress
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center relative">
                {/* SVG Circle for progress */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle 
                    cx="44" cy="44" r="40" 
                    fill="none" stroke="currentColor" 
                    strokeWidth="8" 
                    className="text-white/5" 
                  />
                  <circle 
                    cx="44" cy="44" r="40" 
                    fill="none" stroke="currentColor" 
                    strokeWidth="8" 
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * progressPercent) / 100}
                    className="text-blue-400 transition-all duration-1000 ease-out" 
                  />
                </svg>
                <span className="text-2xl font-bold">{progressPercent}%</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">JavaScript Master Syllabus</h3>
                <p className="text-zinc-400">{completedModules.length} of {totalModules} modules completed</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {COURSE_MODULES.map((mod) => {
                const isDone = completedModules.includes(mod.id);
                return (
                  <div key={mod.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className={`font-medium ${isDone ? 'text-white' : 'text-zinc-500'}`}>{mod.title}</span>
                    {isDone && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Badges / Achievements Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Award className="text-purple-400" /> Achievements
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <BadgeCard 
              icon="👶" 
              name="First Steps" 
              desc="Started learning" 
              unlocked={xp > 0} 
            />
            <BadgeCard 
              icon="🔥" 
              name="On Fire" 
              desc="3 Day Streak" 
              unlocked={streak >= 3} 
            />
            <BadgeCard 
              icon="🧠" 
              name="Smarty" 
              desc="Reached Level 5" 
              unlocked={level >= 5} 
            />
            <BadgeCard 
              icon="👑" 
              name="JS King" 
              desc="Finished Course" 
              unlocked={progressPercent === 100} 
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, delay }: { icon: React.ReactNode, title: string, value: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-6"
    >
      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        {icon}
      </div>
      <div>
        <p className="text-zinc-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
}

function BadgeCard({ icon, name, desc, unlocked }: { icon: string, name: string, desc: string, unlocked: boolean }) {
  return (
    <div className={`p-4 rounded-xl text-center border transition-all ${unlocked ? 'bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(247,223,30,0.1)]' : 'bg-white/5 border-white/10 opacity-50 grayscale'}`}>
      <div className="text-4xl mb-2">{icon}</div>
      <h4 className="font-bold text-sm mb-1">{name}</h4>
      <p className="text-xs text-zinc-400">{desc}</p>
    </div>
  );
}
