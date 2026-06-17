"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useCourses } from "@/context/CourseContext";
import { Sparkles, BookOpen, Clock, BarChart, Users, ChevronRight, Code2, Database, LayoutTemplate, Network } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useRef } from "react";

export default function HomePage() {
  const { coursesDb } = useCourses();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const categoryIcons: Record<string, any> = {
    "Frontend": LayoutTemplate,
    "Backend": Network,
    "Fullstack": Code2,
    "Data Science": Database,
  };

  const categoryGradients: Record<string, string> = {
    "Frontend": "from-primary to-orange-500",
    "Backend": "from-green-400 to-emerald-600",
    "Fullstack": "from-blue-400 to-indigo-600",
    "Data Science": "from-purple-400 to-pink-600",
  };

  return (
    <div className="min-h-screen font-sans" ref={containerRef}>
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-10 shadow-[0_0_20px_rgba(247,223,30,0.15)]"
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              Enter The Javascript Universe
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-[0.9]"
          >
            CODE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              DESTINY
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Embark on an interactive journey across floating islands of knowledge. Master algorithms, visualize the stack, and build your legacy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="#explore">
              <button className="group relative px-10 py-5 bg-primary text-black font-extrabold text-lg rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(247,223,30,0.4)] hover:shadow-[0_0_60px_rgba(247,223,30,0.6)] transition-all hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-3">
                  Embark on Journey <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </Link>
          </motion.div>

          {/* Floating Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 p-8 glass-card border border-white/10 rounded-[2rem] w-full max-w-4xl"
          >
            {[
              { label: "Active Explorers", value: 50420, prefix: "", suffix: "+", icon: Users },
              { label: "Realms Conquered", value: 24, prefix: "", suffix: "", icon: BookOpen },
              { label: "Hours of Lore", value: 1200, prefix: "", suffix: "+", icon: Clock },
              { label: "Ascension Rate", value: 98, prefix: "", suffix: "%", icon: BarChart },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <stat.icon className="w-8 h-8 text-zinc-500 group-hover:text-primary transition-colors mx-auto mb-4" />
                <div className="text-4xl font-black mb-2 tracking-tighter">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Map-Based Course Catalog */}
      <section id="explore" className="relative py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative">
          
          <div className="text-center mb-32 relative z-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">The Realms of Code</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Choose your path carefully. Each waypoint unlocks new powers and abilities in your developer arsenal.</p>
          </div>

          {/* Map Container */}
          <div className="relative min-h-[1200px] md:min-h-[1000px] w-full">
            
            {/* SVG Connecting Path */}
            <div className="absolute inset-0 z-0 hidden md:block">
              <svg width="100%" height="100%" className="overflow-visible" preserveAspectRatio="none">
                <motion.path
                  d="M 200 100 C 400 100, 600 300, 800 300 S 200 600, 400 800 S 800 900, 600 1000"
                  fill="transparent"
                  strokeWidth="4"
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="10 10"
                />
                <motion.path
                  d="M 200 100 C 400 100, 600 300, 800 300 S 200 600, 400 800 S 800 900, 600 1000"
                  fill="transparent"
                  strokeWidth="4"
                  stroke="rgba(247,223,30,0.5)"
                  strokeDasharray="10 10"
                  style={{ pathLength }}
                />
              </svg>
            </div>

            {/* Course Nodes */}
            {coursesDb.map((course, idx) => {
              const Icon = categoryIcons[course.category] || Code2;
              const gradient = categoryGradients[course.category] || categoryGradients["Frontend"];
              
              // Map-like layout positioning
              const positions = [
                "md:top-[50px] md:left-[10%]",
                "md:top-[250px] md:right-[10%]",
                "md:top-[600px] md:left-[20%]",
                "md:top-[850px] md:right-[20%]"
              ];

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative md:absolute w-full md:w-[400px] mb-12 md:mb-0 z-10 group ${positions[idx % positions.length]}`}
                >
                  <Link href={`/course/${course.id}`}>
                    <div className="glass-card rounded-[2rem] p-2 border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                      {/* Node Artwork */}
                      <div className={`h-48 rounded-[1.5rem] bg-gradient-to-br ${gradient} p-1 overflow-hidden relative`}>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl"
                          >
                            <Icon className="w-12 h-12 text-white" />
                          </motion.div>
                        </div>
                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-xs font-black text-white uppercase tracking-wider border border-white/10">
                            {course.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-xs font-black text-white uppercase tracking-wider border border-white/10 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {course.duration}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-black mb-3 leading-tight">{course.title}</h3>
                        <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
                        
                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center border border-white/5">
                              <span className="text-xs font-black text-white">{course.instructor.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Guide</p>
                              <p className="text-sm font-bold text-white">{course.instructor}</p>
                            </div>
                          </div>
                          <div className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border ${
                            course.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            course.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                            'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {course.difficulty}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
