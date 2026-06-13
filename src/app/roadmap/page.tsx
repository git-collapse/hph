"use client";

import { motion } from "framer-motion";
import { PLATFORM_COURSES } from "@/data/courses";
import { useUser } from "@/context/UserContext";
import { Map, CheckCircle } from "lucide-react";
import Link from "next/link";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function RoadmapPage() {
  const { isLessonCompleted } = useUser();
  const jsCourse = PLATFORM_COURSES.find(c => c.id === "jsverse");

  if (!jsCourse) return null;

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4 flex justify-center items-center gap-3">
            <Map className="text-green-400 w-10 h-10" /> JavaScript Mastery Roadmap
          </h1>
          <p className="text-zinc-400 text-lg">Follow the path to JavaScript Mastery. Complete each module to progress.</p>
        </div>

        <div className="relative border-l-4 border-white/10 ml-6 md:ml-12">
          {jsCourse.modules.map((mod, index) => {
            // Check if user completed the last lesson of this module
            const lastLessonId = mod.lessons[mod.lessons.length - 1].id;
            const isDone = isLessonCompleted("jsverse", lastLessonId);
            
            // Unlocked if first module, or if previous module is done
            const prevModLastLesson = index > 0 ? jsCourse.modules[index - 1].lessons[jsCourse.modules[index - 1].lessons.length - 1].id : null;
            const isUnlocked = index === 0 || (prevModLastLesson && isLessonCompleted("jsverse", prevModLastLesson));

            return (
              <motion.div 
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-12 relative pl-8"
              >
                <div className={`absolute -left-[26px] top-0 w-12 h-12 rounded-full border-4 flex items-center justify-center bg-black ${isDone ? 'border-green-500 text-green-500' : isUnlocked ? 'border-primary text-primary' : 'border-white/10 text-zinc-600'}`}>
                  {isDone ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold">{index + 1}</span>}
                </div>
                
                <div className={`glass-card rounded-2xl p-6 border transition-all ${isUnlocked ? 'border-white/10' : 'border-transparent opacity-50 grayscale'}`}>
                  <h3 className="text-2xl font-bold mb-2">{mod.title}</h3>
                  <p className="text-zinc-400 mb-6">{mod.description}</p>
                  {isUnlocked ? (
                    <Link href={`/course/jsverse`}>
                      <button className="px-6 py-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-lg text-sm font-bold">
                        {isDone ? "Review Module" : "Continue Learning"}
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="px-6 py-2 bg-black/50 text-zinc-500 border border-transparent rounded-lg text-sm font-bold cursor-not-allowed">
                      Locked
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AuthGuard>
  );
}
