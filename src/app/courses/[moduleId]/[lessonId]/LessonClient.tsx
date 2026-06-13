"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Lesson, Module } from "@/data/courses";
import { CONTENT_MAP } from "@/data/contentMap";
import { ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import { TheoryRenderer } from "@/components/lessons/TheoryRenderer";
import { QuizEngine } from "@/components/lessons/QuizEngine";

export function LessonClient({ 
  module, 
  lesson, 
  nextLessonUrl 
}: { 
  module: Module, 
  lesson: Lesson, 
  nextLessonUrl: string | null 
}) {
  const { addXp, markModuleComplete } = useUser();
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Pull detailed content from CONTENT_MAP
  const lessonData = CONTENT_MAP[lesson.id];

  const handleComplete = () => {
    if (completed) return;

    // For quizzes, block completion unless passed
    if (lesson.type === "quiz" && !quizPassed) {
      alert("You must pass the quiz to complete this lesson.");
      return;
    }

    setCompleted(true);
    addXp(lesson.xp);
    
    // Check if this is the last lesson in the module
    const isLast = module.lessons[module.lessons.length - 1].id === lesson.id;
    if (isLast) {
      markModuleComplete(module.id);
    }

    if (nextLessonUrl) {
      router.push(nextLessonUrl);
    } else {
      router.push('/courses');
    }
  };

  const handleQuizComplete = (passed: boolean) => {
    setQuizPassed(passed);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/courses" className="text-zinc-400 hover:text-white transition-colors text-sm mb-2 inline-block">
            ← Back to Syllabus
          </Link>
          <h1 className="text-3xl font-extrabold">{lesson.title}</h1>
          <p className="text-zinc-400 mt-1">{module.title}</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-xl font-bold border border-yellow-500/20">
          <Trophy className="w-5 h-5" />
          +{lesson.xp} XP
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 min-h-[400px] mb-8"
      >
        {lesson.type === "theory" && (
          <TheoryRenderer sections={lessonData?.sections || []} />
        )}

        {lesson.type === "quiz" && (
          <QuizEngine 
            questions={lessonData?.questions || []} 
            onComplete={handleQuizComplete} 
          />
        )}

        {lesson.type === "interactive" && (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Interactive Visualizer</h2>
              <p className="text-zinc-400">Loading {lesson.title} Engine...</p>
            </div>
            <div className="w-full max-w-md aspect-video bg-black/50 border border-white/10 rounded-xl flex items-center justify-center shadow-2xl">
              <span className="text-4xl animate-pulse">⚙️</span>
            </div>
            <p className="mt-8 text-zinc-500 text-sm">Visualizers are being upgraded in Phase 3.</p>
          </div>
        )}

        {lesson.type === "playground" && (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Code Playground</h2>
              <p className="text-zinc-400">Launch the Playground to practice {lesson.title}.</p>
            </div>
            <Link href="/playground">
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-mono text-primary transition-colors">
                Open Integrated Playground ↗
              </button>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Hide complete button for quizzes until they pass. QuizEngine handles passing state internally and we block clicking complete. */}
      {lesson.type !== "quiz" || quizPassed ? (
        <div className="flex justify-end">
          <button 
            onClick={handleComplete}
            className="flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-[0_0_20px_4px_rgba(247,223,30,0.2)]"
          >
            {completed ? "Completed!" : "Complete & Continue"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
