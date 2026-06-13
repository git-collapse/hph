"use client";

import { useCourses } from "@/context/CourseContext";
import { notFound, useParams } from "next/navigation";
import { LessonClient } from "./LessonClient";
import { useEffect, useState } from "react";

export default function LessonPage() {
  const { courseId, moduleId, lessonId } = useParams() as { courseId: string; moduleId: string; lessonId: string };
  const { coursesDb } = useCourses();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-20 text-center text-zinc-500">Loading lesson...</div>;
  }

  const course = coursesDb.find((c) => c.id === courseId);
  if (!course) return notFound();

  const module = course.modules.find((m) => m.id === moduleId);
  if (!module) return notFound();

  const lesson = module.lessons.find((l) => l.id === lessonId);
  if (!lesson) return notFound();

  // Calculate next and prev lesson URLs
  let nextLessonUrl = null;
  let prevLessonUrl = null;

  const currentModuleIndex = course.modules.findIndex((m) => m.id === moduleId);
  const currentLessonIndex = module.lessons.findIndex((l) => l.id === lessonId);

  // Next Lesson
  if (currentLessonIndex < module.lessons.length - 1) {
    nextLessonUrl = `/learn/${courseId}/${moduleId}/${module.lessons[currentLessonIndex + 1].id}`;
  } else if (currentModuleIndex < course.modules.length - 1) {
    nextLessonUrl = `/learn/${courseId}/${course.modules[currentModuleIndex + 1].id}/${course.modules[currentModuleIndex + 1].lessons[0].id}`;
  }

  // Prev Lesson
  if (currentLessonIndex > 0) {
    prevLessonUrl = `/learn/${courseId}/${moduleId}/${module.lessons[currentLessonIndex - 1].id}`;
  } else if (currentModuleIndex > 0) {
    const prevMod = course.modules[currentModuleIndex - 1];
    prevLessonUrl = `/learn/${courseId}/${prevMod.id}/${prevMod.lessons[prevMod.lessons.length - 1].id}`;
  }

  return (
    <LessonClient 
      course={course}
      module={module} 
      lesson={lesson} 
      nextLessonUrl={nextLessonUrl} 
      prevLessonUrl={prevLessonUrl}
    />
  );
}
