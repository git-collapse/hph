export type ContentSection = {
  type: "text" | "code" | "alert" | "list";
  title?: string;
  content: string | string[];
  language?: string;
  alertType?: "info" | "warning" | "tip";
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type LessonContent = {
  sections: ContentSection[];
  questions?: QuizQuestion[]; // For quiz types
};

// We will store the actual deep content in separate files and export them here
import { module1Content } from "./modules/module1";
import { module2Content } from "./modules/module2";
import { module3Content } from "./modules/module3";
import { module4Content } from "./modules/module4";
import { module5Content } from "./modules/module5";

export const CONTENT_MAP: Record<string, LessonContent> = {
  ...module1Content,
  ...module2Content,
  ...module3Content,
  ...module4Content,
  ...module5Content,
};
