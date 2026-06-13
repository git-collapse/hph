"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "student" | "admin";

export type EnrolledCourse = {
  courseId: string;
  completedLessons: string[]; // array of lesson IDs
  progress: number; // 0 to 100
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  xp: number;
  level: number;
  streak: number;
  photoUrl: string;
  bio: string;
  enrolledCourses: EnrolledCourse[];
};

export type UserContextType = {
  currentUser: UserProfile | null;
  usersDb: UserProfile[];
  login: (email: string) => boolean;
  signup: (name: string, email: string) => boolean;
  logout: () => void;
  enrollInCourse: (courseId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string, lessonXp: number, totalLessonsInCourse: number) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  isCourseEnrolled: (courseId: string) => boolean;
  deleteUser: (userId: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [usersDb, setUsersDb] = useState<UserProfile[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem("hph_users_db");
    const activeUserId = localStorage.getItem("hph_active_user_id");

    let parsedUsers: UserProfile[] = [];
    if (storedUsers) {
      parsedUsers = JSON.parse(storedUsers);
    } else {
      // Seed an admin user for testing
      parsedUsers = [
        {
          id: "admin-1",
          name: "Admin User",
          email: "admin@jsverse.com",
          role: "admin",
          xp: 5000,
          level: 50,
          streak: 365,
          photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          bio: "Platform Administrator and Lead Instructor.",
          enrolledCourses: []
        }
      ];
      localStorage.setItem("hph_users_db", JSON.stringify(parsedUsers));
    }

    setUsersDb(parsedUsers);

    if (activeUserId) {
      const user = parsedUsers.find((u) => u.id === activeUserId);
      if (user) setCurrentUser(user);
    }

    setIsLoaded(true);
  }, []);

  // Save changes to DB whenever usersDb changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hph_users_db", JSON.stringify(usersDb));
      if (currentUser) {
        localStorage.setItem("hph_active_user_id", currentUser.id);
      } else {
        localStorage.removeItem("hph_active_user_id");
      }
    }
  }, [usersDb, currentUser, isLoaded]);

  const login = (email: string) => {
    const user = usersDb.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string) => {
    if (usersDb.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return false; // Email exists
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "student",
      xp: 0,
      level: 1,
      streak: 0,
      photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", // Default avatar
      bio: "Aspiring developer learning on JSVerse Hub.",
      enrolledCourses: []
    };

    setUsersDb([...usersDb, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    
    // Also update in usersDb
    setUsersDb(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const deleteUser = (userId: string) => {
    setUsersDb(prev => prev.filter(u => u.id !== userId));
    if (currentUser?.id === userId) {
      logout();
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (!currentUser) return;
    if (currentUser.enrolledCourses.find(c => c.courseId === courseId)) return; // Already enrolled

    const newEnrollment: EnrolledCourse = {
      courseId,
      completedLessons: [],
      progress: 0
    };

    updateCurrentUser({
      enrolledCourses: [...currentUser.enrolledCourses, newEnrollment]
    });
  };

  const markLessonComplete = (courseId: string, lessonId: string, lessonXp: number, totalLessonsInCourse: number) => {
    if (!currentUser) return;

    const courseIndex = currentUser.enrolledCourses.findIndex(c => c.courseId === courseId);
    if (courseIndex === -1) return; // Not enrolled
    
    const course = currentUser.enrolledCourses[courseIndex];
    if (course.completedLessons.includes(lessonId)) return; // Already completed

    const newCompleted = [...course.completedLessons, lessonId];
    const newProgress = Math.round((newCompleted.length / totalLessonsInCourse) * 100);

    const updatedCourses = [...currentUser.enrolledCourses];
    updatedCourses[courseIndex] = {
      ...course,
      completedLessons: newCompleted,
      progress: newProgress
    };

    const newXp = currentUser.xp + lessonXp;
    const newLevel = Math.floor(newXp / 100) + 1;

    updateCurrentUser({
      enrolledCourses: updatedCourses,
      xp: newXp,
      level: newLevel
    });
  };

  const isLessonCompleted = (courseId: string, lessonId: string) => {
    if (!currentUser) return false;
    const course = currentUser.enrolledCourses.find(c => c.courseId === courseId);
    if (!course) return false;
    return course.completedLessons.includes(lessonId);
  };

  const isCourseEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return currentUser.enrolledCourses.some(c => c.courseId === courseId);
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      usersDb, 
      login, 
      signup, 
      logout, 
      enrollInCourse, 
      markLessonComplete,
      isLessonCompleted,
      isCourseEnrolled,
      deleteUser
    }}>
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
