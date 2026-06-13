"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, Compass, BookOpen, UserCircle, LogOut, Settings, Award, Users, Trophy, Sun, Moon } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "next-themes";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useUser();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const GLOBAL_LINKS = [
    { name: "Explore", href: "/", icon: Compass },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Community", href: "/community", icon: Users },
  ];

  const LOGGED_IN_LINKS = [
    { name: "My Dashboard", href: "/dashboard", icon: BookOpen },
    { name: "Achievements", href: "/achievements", icon: Award },
  ];

  const adminLinks = currentUser?.role === "admin" 
    ? [{ name: "Admin Panel", href: "/admin", icon: Settings }] 
    : [];

  const ALL_LINKS = [...GLOBAL_LINKS, ...(currentUser ? LOGGED_IN_LINKS : []), ...adminLinks];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary to-green-500 rounded flex items-center justify-center font-bold text-black shadow-lg shadow-primary/20">
                Hub
              </div>
              <span className="font-bold text-xl hidden sm:block tracking-tight">EdTech Hub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {ALL_LINKS.map((link) => {
                const isActive = pathname.startsWith(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-white/10 text-white" 
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="pl-9 pr-4 py-1.5 bg-black/50 border border-white/10 rounded-full text-sm focus:outline-none focus:border-primary transition-colors w-48 focus:w-64"
              />
            </div>

            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
                  <Trophy className="w-4 h-4 text-primary mr-2" />
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-400 leading-none">Level {currentUser.level}</span>
                    <span className="text-sm font-bold leading-none">{currentUser.xp} XP</span>
                  </div>
                </div>
                
                <div className="relative group">
                  <Link href="/profile" className="flex items-center gap-2">
                    <img 
                      src={currentUser.photoUrl} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border border-white/20 object-cover"
                    />
                  </Link>
                  <div className="absolute right-0 top-full mt-2 w-48 glass-card border border-white/10 rounded-xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
                    <div className="px-3 py-2 border-b border-white/10 mb-2">
                      <p className="font-bold text-sm truncate">{currentUser.name}</p>
                      <p className="text-xs text-zinc-400 truncate">{currentUser.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <UserCircle className="w-4 h-4 mr-2" /> My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1">
                      <LogOut className="w-4 h-4 mr-2" /> Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-sm font-bold text-zinc-300 hover:text-white transition-colors">
                  Log in
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-primary text-black font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors shadow-lg shadow-primary/20">
                  Sign Up
                </Link>
              </div>
            )}
            
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-zinc-400 hover:text-white"
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 block dark:hidden" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
