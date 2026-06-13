"use client";

import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { PLATFORM_COURSES } from "@/data/courses";
import { Trophy, Flame, Clock, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardPage() {
  const { currentUser } = useUser();

  if (!currentUser) return null;

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
            <p className="text-zinc-400 text-lg">Here's your learning progress today.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-400 font-bold">Current Streak</p>
                <p className="text-2xl font-black">{currentUser.streak} Days</p>
              </div>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-400 font-bold">Total XP</p>
                <p className="text-2xl font-black">{currentUser.xp}</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Your Enrolled Courses</h2>
        
        {currentUser.enrolledCourses.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl border border-white/10">
            <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No courses yet</h3>
            <p className="text-zinc-400 mb-6">Enroll in a course to start your learning journey.</p>
            <Link href="/explore">
              <button className="px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors">
                Explore Courses
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentUser.enrolledCourses.map((enrollment, idx) => {
              const course = PLATFORM_COURSES.find(c => c.id === enrollment.courseId);
              if (!course) return null;

              return (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col md:flex-row gap-6 relative overflow-hidden group"
                >
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full md:w-48 h-32 object-cover rounded-xl border border-white/10"
                  />
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 font-mono mb-4">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                      <span>•</span>
                      <span>{enrollment.completedLessons.length} Lessons Done</span>
                    </div>

                    <div className="mb-2 flex justify-between text-xs font-bold text-zinc-400">
                      <span>Progress</span>
                      <span>{enrollment.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${enrollment.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <Link href={`/course/${course.id}`} className="absolute inset-0 z-10" />
                  
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 hidden md:block">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
