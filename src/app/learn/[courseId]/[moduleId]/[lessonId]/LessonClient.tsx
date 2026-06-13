"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Course, Lesson, Module } from "@/data/courses";
import { CONTENT_MAP } from "@/data/contentMap";
import { ArrowRight, ArrowLeft, Trophy, CheckCircle } from "lucide-react";
import Link from "next/link";
import { TheoryRenderer } from "@/components/lessons/TheoryRenderer";
import { QuizEngine } from "@/components/lessons/QuizEngine";

export function LessonClient({ 
  course,
  module, 
  lesson, 
  nextLessonUrl,
  prevLessonUrl
}: { 
  course: Course,
  module: Module, 
  lesson: Lesson, 
  nextLessonUrl: string | null,
  prevLessonUrl: string | null
}) {
  const { currentUser, markLessonComplete, isLessonCompleted } = useUser();
  const router = useRouter();
  
  const alreadyCompleted = isLessonCompleted(course.id, lesson.id);
  const [completed, setCompleted] = useState(alreadyCompleted);
  const [quizPassed, setQuizPassed] = useState(alreadyCompleted);

  // Pull detailed content from CONTENT_MAP
  const lessonData = CONTENT_MAP[lesson.id];

  const totalLessonsInCourse = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const handleComplete = () => {
    if (completed) {
      if (nextLessonUrl) {
        router.push(nextLessonUrl);
      } else {
        router.push(`/course/${course.id}`);
      }
      return;
    }

    // For quizzes, block completion unless passed
    if (lesson.type === "quiz" && !quizPassed) {
      alert("You must pass the quiz to complete this lesson.");
      return;
    }

    setCompleted(true);
    
    if (currentUser) {
      markLessonComplete(course.id, lesson.id, lesson.xp, totalLessonsInCourse);
    }

    if (nextLessonUrl) {
      router.push(nextLessonUrl);
    } else {
      router.push(`/course/${course.id}`);
    }
  };

  const handleQuizComplete = (passed: boolean) => {
    setQuizPassed(passed);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href={`/course/${course.id}`} className="text-zinc-400 hover:text-white transition-colors text-sm mb-2 inline-block">
            ← Back to {course.title}
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold">{lesson.title}</h1>
            {alreadyCompleted && <CheckCircle className="text-green-500 w-6 h-6" />}
          </div>
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
            <p className="mt-8 text-zinc-500 text-sm">Visualizers are preserved from JSVerse Ultimate.</p>
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

      <div className="flex justify-between items-center pt-8 border-t border-white/10">
        {prevLessonUrl ? (
          <Link href={prevLessonUrl}>
            <button className="flex items-center px-6 py-3 bg-white/5 text-zinc-300 font-bold rounded-lg hover:bg-white/10 transition-colors border border-white/10">
              <ArrowLeft className="mr-2 w-5 h-5" /> Previous
            </button>
          </Link>
        ) : <div />}

        {lesson.type !== "quiz" || quizPassed || alreadyCompleted ? (
          <button 
            onClick={handleComplete}
            className={`flex items-center px-8 py-4 font-bold rounded-lg transition-colors ${alreadyCompleted ? 'bg-white/10 text-white border border-white/20' : 'bg-primary text-black hover:bg-yellow-400 shadow-[0_0_20px_4px_rgba(247,223,30,0.2)]'}`}
          >
            {alreadyCompleted ? (nextLessonUrl ? "Next Lesson" : "Finish Course") : "Complete & Continue"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
