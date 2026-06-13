"use client";

import { motion } from "framer-motion";
import { Calculator, CloudRain, ListTodo, PiggyBank, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PROJECTS = [
  { id: "calculator", title: "Calculator App", icon: Calculator, desc: "A fully functional calculator with history and operations.", difficulty: "Beginner" },
  { id: "weather", title: "Weather Dashboard", icon: CloudRain, desc: "Fetch and display real-time weather data using APIs.", difficulty: "Intermediate" },
  { id: "todo", title: "Task Manager", icon: ListTodo, desc: "A robust to-do list with drag & drop and local storage.", difficulty: "Beginner" },
  { id: "expense", title: "Expense Tracker", icon: PiggyBank, desc: "Track income and expenses with charts and analytics.", difficulty: "Advanced" },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">Mini Project Zone</h1>
          <p className="text-zinc-400 text-lg">Build real-world applications to solidify your knowledge.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map((project, i) => {
          const Icon = project.icon;
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col hover:-translate-y-2 transition-transform cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {project.difficulty}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-zinc-400 flex-1 mb-6">{project.desc}</p>
              
              <Link href={`/projects/${project.id}`}>
                <button className="w-full py-3 bg-white/5 hover:bg-primary hover:text-black transition-colors rounded-xl font-bold border border-white/10 hover:border-transparent">
                  Build Project
                </button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
