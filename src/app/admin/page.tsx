"use client";

import { useUser } from "@/context/UserContext";
import { useCourses } from "@/context/CourseContext";
import { AdminGuard } from "@/components/auth/AuthGuard";
import { useState } from "react";
import { Users, BookOpen, Trash2, Edit, PlusCircle, LayoutDashboard } from "lucide-react";
import { Course } from "@/data/courses";

export default function AdminDashboard() {
  const { usersDb, deleteUser } = useUser();
  const { coursesDb, deleteCourse, addCourse } = useCourses();
  
  const [activeTab, setActiveTab] = useState<"users" | "courses">("users");

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id);
    }
  };

  const handleAddMockCourse = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: "New Draft Course",
      description: "A dynamically generated course draft.",
      category: "Frontend",
      difficulty: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
      instructor: "Admin",
      duration: "0 hours",
      outcomes: ["Draft Outcome"],
      modules: []
    };
    addCourse(newCourse);
  };

  return (
    <AdminGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold flex items-center gap-3">
            <LayoutDashboard className="w-10 h-10 text-primary" /> Admin Portal
          </h1>
          <p className="text-zinc-400 mt-2">Manage users and courses across the JSVerse Hub platform.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors ${activeTab === "users" ? "bg-primary text-black" : "glass text-zinc-400 hover:text-white"}`}
          >
            <Users className="w-5 h-5" /> Manage Users ({usersDb.length})
          </button>
          <button 
            onClick={() => setActiveTab("courses")}
            className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors ${activeTab === "courses" ? "bg-primary text-black" : "glass text-zinc-400 hover:text-white"}`}
          >
            <BookOpen className="w-5 h-5" /> Manage Courses ({coursesDb.length})
          </button>
        </div>

        {activeTab === "users" && (
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 text-sm font-bold text-zinc-400">User</th>
                    <th className="p-4 text-sm font-bold text-zinc-400">Email</th>
                    <th className="p-4 text-sm font-bold text-zinc-400">Role</th>
                    <th className="p-4 text-sm font-bold text-zinc-400">Level / XP</th>
                    <th className="p-4 text-sm font-bold text-zinc-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {usersDb.map(u => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={u.photoUrl} alt={u.name} className="w-10 h-10 rounded-full bg-zinc-800" />
                        <span className="font-bold">{u.name}</span>
                      </td>
                      <td className="p-4 text-zinc-300">{u.email}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${u.role === 'admin' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-300">Lvl {u.level} ({u.xp} XP)</td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleDeleteUser(u.id)}
                          disabled={u.role === 'admin'}
                          className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title={u.role === 'admin' ? "Cannot delete admin" : "Delete User"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={handleAddMockCourse}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Add Draft Course
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesDb.map(c => (
                <div key={c.id} className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                  <div className="h-32 overflow-hidden relative">
                    <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-xs font-bold text-white uppercase">
                      {c.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                    <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{c.description}</p>
                    <div className="text-xs text-zinc-400 mb-6 space-y-1">
                      <div>Instructor: {c.instructor}</div>
                      <div>Modules: {c.modules.length}</div>
                    </div>
                    <div className="mt-auto flex items-center gap-2">
                      <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(c.id)}
                        disabled={c.id === 'jsverse'}
                        className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title={c.id === 'jsverse' ? "Cannot delete flagship course" : "Delete"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
