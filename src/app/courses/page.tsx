"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COURSE_MODULES } from "@/data/courses";
import { useUser } from "@/context/UserContext";
import { CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";

export default function CoursesPage() {
  const { completedModules } = useUser();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Course Syllabus</h1>
        <p className="text-zinc-400 text-lg">
          Master JavaScript from the ground up. Complete modules to earn XP and level up.
        </p>
      </div>

      <div className="space-y-8">
        {COURSE_MODULES.map((module, index) => {
          const isCompleted = completedModules.includes(module.id);
          // Unlock first module by default, or if previous module is completed
          const isUnlocked = index === 0 || completedModules.includes(COURSE_MODULES[index - 1].id);

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-2xl p-6 ${!isUnlocked ? "opacity-50 grayscale pointer-events-none" : ""}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <span className="text-primary text-xl">Module {index + 1}</span>
                    <span className="text-white/20">|</span>
                    {module.title}
                  </h2>
                  <p className="text-zinc-400 mt-2">{module.description}</p>
                </div>
                <div className="bg-black/50 p-3 rounded-xl border border-white/10">
                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : isUnlocked ? (
                    <PlayCircle className="w-8 h-8 text-primary" />
                  ) : (
                    <Lock className="w-8 h-8 text-zinc-500" />
                  )}
                </div>
              </div>

              <div className="grid gap-3">
                {module.lessons.map((lesson, lIndex) => (
                  <Link
                    href={`/courses/${module.id}/${lesson.id}`}
                    key={lesson.id}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <Circle className="w-5 h-5 text-zinc-600" />
                      <span className="font-medium text-zinc-300">
                        {lIndex + 1}. {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold px-2 py-1 bg-black/50 rounded-md text-zinc-400 uppercase">
                        {lesson.type}
                      </span>
                      <span className="text-sm font-bold text-yellow-500">
                        +{lesson.xp} XP
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
