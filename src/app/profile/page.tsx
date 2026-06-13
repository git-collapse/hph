"use client";

import { useUser } from "@/context/UserContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { motion } from "framer-motion";
import { Trophy, Flame, Award, BookOpen, Star, Mail } from "lucide-react";

export default function ProfilePage() {
  const { currentUser } = useUser();

  if (!currentUser) return null;

  const totalCompletedLessons = currentUser.enrolledCourses.reduce((acc, c) => acc + c.completedLessons.length, 0);

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden mb-8"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/40 to-blue-500/40 opacity-50" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 mt-12">
            <div className="w-32 h-32 rounded-full border-4 border-black overflow-hidden bg-zinc-800 shadow-2xl">
              <img src={currentUser.photoUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center md:text-left mb-2">
              <h1 className="text-4xl font-extrabold flex items-center justify-center md:justify-start gap-3">
                {currentUser.name} 
                {currentUser.role === "admin" && (
                  <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded uppercase tracking-wider align-middle">Admin</span>
                )}
              </h1>
              <p className="text-zinc-400 flex items-center justify-center md:justify-start gap-2 mt-2">
                <Mail className="w-4 h-4" /> {currentUser.email}
              </p>
            </div>
            
            <button className="px-6 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg font-bold border border-white/10">
              Edit Profile
            </button>
          </div>
          
          <div className="relative z-10 mt-8">
            <h3 className="font-bold text-lg mb-2">About</h3>
            <p className="text-zinc-400">{currentUser.bio}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total XP", value: currentUser.xp, icon: Trophy, color: "text-yellow-500" },
            { label: "Current Level", value: currentUser.level, icon: Star, color: "text-primary" },
            { label: "Day Streak", value: currentUser.streak, icon: Flame, color: "text-orange-500" },
            { label: "Lessons Done", value: totalCompletedLessons, icon: BookOpen, color: "text-blue-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/10 text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-black mb-1">{stat.value}</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-3xl p-8 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-400" /> Recent Achievements
            </h2>
            <button className="text-sm text-primary hover:underline font-bold">View All</button>
          </div>

          <div className="flex gap-4">
            {/* Mocked achievement badges */}
            <div className="p-4 bg-black/50 border border-purple-500/30 rounded-xl flex items-center gap-4 flex-1">
              <div className="text-4xl">👶</div>
              <div>
                <p className="font-bold">First Steps</p>
                <p className="text-xs text-zinc-400">Enrolled in first course</p>
              </div>
            </div>
            {currentUser.streak >= 3 && (
              <div className="p-4 bg-black/50 border border-orange-500/30 rounded-xl flex items-center gap-4 flex-1">
                <div className="text-4xl">🔥</div>
                <div>
                  <p className="font-bold">On Fire</p>
                  <p className="text-xs text-zinc-400">3 Day Streak</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AuthGuard>
  );
}
