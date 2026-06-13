import { notFound } from "next/navigation";
import { ProjectClient } from "./ProjectClient";

const PROJECTS_DATA = {
  "calculator": { title: "Calculator App", type: "react" },
  "weather": { title: "Weather Dashboard", type: "react" },
  "todo": { title: "Task Manager", type: "react" },
  "expense": { title: "Expense Tracker", type: "react" }
};

export async function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map(id => ({ id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = PROJECTS_DATA[resolvedParams.id as keyof typeof PROJECTS_DATA];
  
  if (!project) return notFound();

  return <ProjectClient project={{ id: resolvedParams.id, ...project }} />;
}
