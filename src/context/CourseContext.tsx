"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Course, PLATFORM_COURSES } from "@/data/courses";

export type CourseContextType = {
  coursesDb: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Course) => void;
  deleteCourse: (id: string) => void;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [coursesDb, setCoursesDb] = useState<Course[]>(PLATFORM_COURSES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCourses = localStorage.getItem("hph_courses_db");
    if (storedCourses) {
      const parsed = JSON.parse(storedCourses);
      // Merge custom courses with default ones (just in case)
      // For simplicity, we just take the stored courses.
      if (parsed.length > 0) {
        setCoursesDb(parsed);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hph_courses_db", JSON.stringify(coursesDb));
    }
  }, [coursesDb, isLoaded]);

  const addCourse = (course: Course) => {
    setCoursesDb(prev => [...prev, course]);
  };

  const updateCourse = (id: string, updatedCourse: Course) => {
    setCoursesDb(prev => prev.map(c => c.id === id ? updatedCourse : c));
  };

  const deleteCourse = (id: string) => {
    setCoursesDb(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CourseContext.Provider value={{ coursesDb, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};
