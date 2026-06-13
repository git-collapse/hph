import { COURSE_MODULES } from "@/data/courses";
import { notFound } from "next/navigation";
import { LessonClient } from "./LessonClient";

export async function generateStaticParams() {
  const params = [];
  for (const module of COURSE_MODULES) {
    for (const lesson of module.lessons) {
      params.push({ moduleId: module.id, lessonId: lesson.id });
    }
  }
  return params;
}

export default async function LessonPage({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const resolvedParams = await params;
  const { moduleId, lessonId } = resolvedParams;

  const module = COURSE_MODULES.find((m) => m.id === moduleId);
  if (!module) return notFound();

  const lesson = module.lessons.find((l) => l.id === lessonId);
  if (!lesson) return notFound();

  // Calculate next lesson
  let nextLessonUrl = null;
  const currentLessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
  if (currentLessonIndex < module.lessons.length - 1) {
    nextLessonUrl = `/courses/${moduleId}/${module.lessons[currentLessonIndex + 1].id}`;
  } else {
    const currentModuleIndex = COURSE_MODULES.findIndex((m) => m.id === moduleId);
    if (currentModuleIndex < COURSE_MODULES.length - 1) {
      nextLessonUrl = `/courses/${COURSE_MODULES[currentModuleIndex + 1].id}/${COURSE_MODULES[currentModuleIndex + 1].lessons[0].id}`;
    }
  }

  return <LessonClient module={module} lesson={lesson} nextLessonUrl={nextLessonUrl} />;
}
