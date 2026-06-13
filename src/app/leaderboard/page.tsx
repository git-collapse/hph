"use client";

import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp, Medal } from "lucide-react";

export default function LeaderboardPage() {
  const { usersDb } = useUser();

  // Sort users by XP descending
  const sortedUsers = [...usersDb].sort((a, b) => b.xp - a.xp);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold flex items-center justify-center gap-4 mb-4">
          <Trophy className="w-12 h-12 text-yellow-500" />
          Global Leaderboard
        </h1>
        <p className="text-xl text-zinc-400">See how you stack up against top learners on JSVerse Hub.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Top 3 Podium */}
        {sortedUsers.slice(0, 3).map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className={`glass-card rounded-3xl p-8 border border-white/10 flex flex-col items-center relative overflow-hidden ${
              idx === 0 ? "md:-mt-8 shadow-[0_0_50px_rgba(234,179,8,0.2)] border-yellow-500/50" :
              idx === 1 ? "border-gray-400/50" : "border-orange-500/50"
            }`}
          >
            <div className={`absolute top-0 left-0 w-full h-2 ${
              idx === 0 ? "bg-yellow-500" : idx === 1 ? "bg-gray-400" : "bg-orange-500"
            }`} />
            
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden bg-zinc-800">
                <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl border-4 border-black ${
                idx === 0 ? "bg-yellow-500 text-white" : idx === 1 ? "bg-gray-400 text-white" : "bg-orange-500 text-white"
              }`}>
                {idx === 0 ? "1" : idx === 1 ? "2" : "3"}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-1">{user.name}</h3>
            <div className="flex items-center gap-2 text-yellow-500 font-bold text-lg mb-4">
              <Star className="w-5 h-5 fill-yellow-500" /> {user.xp} XP
            </div>
            
            <div className="w-full grid grid-cols-2 gap-2 text-center text-sm">
              <div className="bg-white/5 rounded-lg py-2">
                <div className="text-zinc-500 font-bold mb-1">LEVEL</div>
                <div>{user.level}</div>
              </div>
              <div className="bg-white/5 rounded-lg py-2">
                <div className="text-zinc-500 font-bold mb-1">STREAK</div>
                <div className="text-orange-400 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {user.streak}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 pl-8 text-sm font-bold text-zinc-400 w-24">Rank</th>
              <th className="p-4 text-sm font-bold text-zinc-400">Student</th>
              <th className="p-4 text-sm font-bold text-zinc-400 text-center">Level</th>
              <th className="p-4 text-sm font-bold text-zinc-400 text-center">Streak</th>
              <th className="p-4 pr-8 text-sm font-bold text-zinc-400 text-right">Total XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedUsers.slice(3).map((user, idx) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (idx * 0.05) }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="p-4 pl-8 font-mono text-zinc-500 font-bold">
                  #{idx + 4}
                </td>
                <td className="p-4 flex items-center gap-4">
                  <img src={user.photoUrl} alt={user.name} className="w-10 h-10 rounded-full bg-zinc-800" />
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-xs text-zinc-500">{user.role === 'admin' ? 'Admin' : 'Student'}</div>
                  </div>
                </td>
                <td className="p-4 text-center font-bold text-zinc-300">{user.level}</td>
                <td className="p-4 text-center font-bold text-orange-400 flex items-center justify-center gap-1 h-full pt-6">
                  {user.streak} <TrendingUp className="w-3 h-3" />
                </td>
                <td className="p-4 pr-8 text-right font-bold text-yellow-500">
                  {user.xp}
                </td>
              </motion.tr>
            ))}
            {sortedUsers.length <= 3 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500">
                  No other learners yet. Invite some friends!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
