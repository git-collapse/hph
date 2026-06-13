"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCourses } from "@/context/CourseContext";
import { Search, Sparkles, BookOpen, Clock, BarChart, Users } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const { coursesDb } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(coursesDb.map(c => c.category)))];

  const filteredCourses = coursesDb.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl aspect-square bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
                The New Standard in Tech Education
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight"
            >
              Master In-Demand Skills <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-green-400">
                Faster Than Ever
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto"
            >
              Interactive visualizers, real-world projects, and a community of dedicated learners. Stop watching tutorials and start building.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/signup">
                <button className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-[0_0_30px_rgba(247,223,30,0.3)]">
                  Start Learning for Free
                </button>
              </Link>
              <Link href="#explore">
                <button className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                  Explore Catalog
                </button>
              </Link>
            </motion.div>
          </div>
          
          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-card border border-white/10 rounded-3xl"
          >
            {[
              { label: "Active Learners", value: "50,000+", icon: Users },
              { label: "Premium Courses", value: "24", icon: BookOpen },
              { label: "Hours of Content", value: "1,200+", icon: Clock },
              { label: "Success Rate", value: "98%", icon: BarChart },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 border-r border-white/5 last:border-0">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course Marketplace Section */}
      <section id="explore" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Explore Our Catalog</h2>
              <p className="text-zinc-400">Find the perfect course to level up your career.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white w-full sm:w-64"
                />
              </div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white cursor-pointer"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-3xl overflow-hidden border border-white/10 group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold border border-white/10 text-white uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-zinc-500 mb-6">
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.modules.length} Modules</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                    <span className={`flex items-center gap-1 ${
                      course.difficulty === 'Beginner' ? 'text-green-400' :
                      course.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      <BarChart className="w-4 h-4" /> {course.difficulty}
                    </span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                        {course.instructor.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-zinc-300">{course.instructor}</span>
                    </div>
                    <Link href={`/course/${course.id}`}>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold transition-colors border border-white/10">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredCourses.length === 0 && (
              <div className="col-span-full py-20 text-center text-zinc-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg">No courses found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
