"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserContextType = {
  xp: number;
  level: number;
  streak: number;
  completedModules: string[];
  addXp: (amount: number) => void;
  markModuleComplete: (moduleId: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    const storedXp = localStorage.getItem("jsverse_xp");
    const storedLevel = localStorage.getItem("jsverse_level");
    const storedStreak = localStorage.getItem("jsverse_streak");
    const storedModules = localStorage.getItem("jsverse_completed_modules");

    if (storedXp) setXp(parseInt(storedXp, 10));
    if (storedLevel) setLevel(parseInt(storedLevel, 10));
    if (storedStreak) setStreak(parseInt(storedStreak, 10));
    if (storedModules) setCompletedModules(JSON.parse(storedModules));
    
    setIsLoaded(true);
  }, []);

  // Save to local storage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("jsverse_xp", xp.toString());
      localStorage.setItem("jsverse_level", level.toString());
      localStorage.setItem("jsverse_streak", streak.toString());
      localStorage.setItem("jsverse_completed_modules", JSON.stringify(completedModules));
    }
  }, [xp, level, streak, completedModules, isLoaded]);

  const addXp = (amount: number) => {
    setXp((prev) => {
      const newXp = prev + amount;
      // Level up logic (every 100 XP is a level)
      const newLevel = Math.floor(newXp / 100) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        // Here we could trigger a level up toast
      }
      return newXp;
    });
  };

  const markModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => {
      if (!prev.includes(moduleId)) {
        return [...prev, moduleId];
      }
      return prev;
    });
  };

  return (
    <UserContext.Provider value={{ xp, level, streak, completedModules, addXp, markModuleComplete }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
