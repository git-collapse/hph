"use client";

import { useParams, useRouter } from "next/navigation";
import { useCourses } from "@/context/CourseContext";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import { Clock, BookOpen, BarChart, CheckCircle2, PlayCircle, Lock, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { currentUser, enrollInCourse, isCourseEnrolled } = useUser();
  const [enrolling, setEnrolling] = useState(false);

  const { coursesDb } = useCourses();
  const course = coursesDb.find(c => c.id === courseId);

  if (!course) {
    return <div className="text-center py-20 text-zinc-400">Course not found.</div>;
  }

  const enrolled = isCourseEnrolled(course.id);

  const handleEnroll = () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    
    setEnrolling(true);
    // Simulate network request
    setTimeout(() => {
      enrollInCourse(course.id);
      setEnrolling(false);
      // Removed the auto-redirect so they stay on the page and can see the curriculum unlocked
    }, 800);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Course Hero */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black/60 border-b border-white/10">
        <div className="absolute inset-0">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-10 blur-xl scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-lg text-xs font-bold uppercase tracking-wider">
                {course.difficulty}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{course.title}</h1>
            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm font-bold text-zinc-300 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white">
                  {course.instructor.charAt(0)}
                </div>
                {course.instructor}
              </div>
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-zinc-500" /> {course.duration}</div>
              <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-zinc-500" /> {course.modules.length} Modules</div>
            </div>

            {enrolled ? (
              <button 
                onClick={() => {
                   const firstLessonUrl = `/learn/${course.id}/${course.modules[0].id}/${course.modules[0].lessons[0].id}`;
                   router.push(firstLessonUrl);
                }}
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/10 flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" /> Continue Learning
              </button>
            ) : (
              <button 
                onClick={handleEnroll}
                disabled={enrolling}
                className="px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-[0_0_30px_rgba(247,223,30,0.3)] disabled:opacity-50"
              >
                {enrolling ? "Enrolling..." : "Enroll for Free"}
              </button>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl relative">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                  <PlayCircle className="w-10 h-10 text-white ml-1" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details & Curriculum */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Course Curriculum</h2>
            {course.modules.length > 0 ? (
              <div className="space-y-4">
                {course.modules.map((mod, idx) => (
                  <div key={mod.id} className="glass-card rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-2">Module {idx + 1}: {mod.title}</h3>
                    <p className="text-zinc-400 mb-4">{mod.description}</p>
                    <div className="space-y-2">
                      {mod.lessons.map((lesson, lIdx) => {
                        const lessonUrl = `/learn/${course.id}/${mod.id}/${lesson.id}`;
                        
                        if (enrolled) {
                          return (
                            <Link href={lessonUrl} key={lesson.id} className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/5 hover:border-primary/50 transition-colors group">
                              <div className="flex items-center gap-3 text-sm text-zinc-300 group-hover:text-white transition-colors">
                                <span className="text-zinc-500 w-5">{lIdx + 1}.</span>
                                {lesson.title}
                              </div>
                              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                                {lesson.type}
                              </span>
                            </Link>
                          );
                        }

                        return (
                          <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/5 opacity-70">
                            <div className="flex items-center gap-3 text-sm text-zinc-300">
                              <span className="text-zinc-500 w-5">{lIdx + 1}.</span>
                              {lesson.title}
                            </div>
                            <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                              {lesson.type}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center glass-card rounded-3xl border border-white/10 text-zinc-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Curriculum is being finalized and will be available soon.</p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Sticky Stats */}
        <div className="relative">
          <div className="sticky top-24 glass-card p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-6">Course Features</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-zinc-300">
                <Clock className="w-5 h-5 text-primary" /> {course.duration} of content
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <BarChart className="w-5 h-5 text-primary" /> {course.difficulty} Level
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <Trophy className="w-5 h-5 text-primary" /> Certificate of Completion
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <PlayCircle className="w-5 h-5 text-primary" /> Interactive Visualizers
              </li>
            </ul>

            <button 
              onClick={handleEnroll}
              disabled={enrolled || enrolling}
              className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enrolled ? "You are enrolled" : enrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
