"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Code2, Zap, LayoutDashboard, Trophy, BookOpen, Map, Award, PlaySquare } from "lucide-react";
import { useUser } from "@/context/UserContext";

const NAV_LINKS = [
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Visualizer", href: "/visualizer", icon: PlaySquare },
  { name: "Playground", href: "/playground", icon: Code2 },
  { name: "Projects", href: "/projects", icon: LayoutDashboard },
  { name: "Challenges", href: "/challenges", icon: Zap },
  { name: "Dashboard", href: "/dashboard", icon: Trophy },
  { name: "Achievements", href: "/achievements", icon: Award },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Certificate", href: "/certificate", icon: Award },
];

export function Navbar() {
  const pathname = usePathname();
  const { level, xp } = useUser();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-black">
                JS
              </div>
              <span className="font-bold text-xl hidden sm:block">JSVerse Ultimate</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => {
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
            <div className="hidden sm:flex items-center bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
              <Trophy className="w-4 h-4 text-primary mr-2" />
              <div className="flex flex-col">
                <span className="text-xs text-zinc-400 leading-none">Level {level}</span>
                <span className="text-sm font-bold leading-none">{xp} XP</span>
              </div>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center font-bold text-black">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
