import { redirect } from 'next/navigation';

export default async function LegacyLessonRedirect({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const { moduleId, lessonId } = await params;
  redirect(`/learn/jsverse/${moduleId}/${lessonId}`);
}
