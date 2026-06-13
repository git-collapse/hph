export type Lesson = {
  id: string;
  title: string;
  type: "theory" | "interactive" | "quiz" | "playground";
  xp: number;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export const COURSE_MODULES: Module[] = [
  {
    id: "module-1",
    title: "Introduction to JavaScript",
    description: "The history, present, and future of the language that powers the web.",
    lessons: [
      { id: "m1-intro", title: "JavaScript Introduction", type: "theory", xp: 10 },
      { id: "m1-role", title: "Web Development Role", type: "theory", xp: 10 },
      { id: "m1-engine", title: "JavaScript Engine", type: "theory", xp: 15 },
      { id: "m1-runtime", title: "Runtime Environment", type: "theory", xp: 15 },
      { id: "m1-v8", title: "V8 Engine Deep Dive", type: "theory", xp: 20 },
      { id: "m1-execution", title: "Execution Process", type: "interactive", xp: 30 },
      { id: "m1-quiz", title: "Module 1 Quiz", type: "quiz", xp: 50 },
    ],
  },
  {
    id: "module-2",
    title: "JavaScript Fundamentals",
    description: "Variables, data types, operators, and how memory works.",
    lessons: [
      { id: "m2-variables", title: "Variables (var, let, const)", type: "playground", xp: 20 },
      { id: "m2-datatypes", title: "Data Types", type: "theory", xp: 15 },
      { id: "m2-operators", title: "Operators", type: "playground", xp: 20 },
      { id: "m2-coercion", title: "Type Coercion", type: "interactive", xp: 30 },
      { id: "m2-memory", title: "Stack vs Heap Visualizer", type: "interactive", xp: 40 },
      { id: "m2-quiz", title: "Module 2 Quiz", type: "quiz", xp: 50 },
    ],
  },
  {
    id: "module-3",
    title: "Control Flow",
    description: "Making decisions and looping in your code.",
    lessons: [
      { id: "m3-if-else", title: "if / else", type: "playground", xp: 20 },
      { id: "m3-switch", title: "switch", type: "playground", xp: 20 },
      { id: "m3-ternary", title: "Ternary Operator", type: "playground", xp: 20 },
      { id: "m3-loops", title: "Loops (for, while, do-while)", type: "playground", xp: 30 },
      { id: "m3-break", title: "Break and Continue", type: "playground", xp: 20 },
      { id: "m3-quiz", title: "Module 3 Quiz", type: "quiz", xp: 50 },
    ],
  },
  {
    id: "module-4",
    title: "Functions & Execution Context",
    description: "How functions are declared, invoked, and executed behind the scenes.",
    lessons: [
      { id: "m4-functions", title: "Functions Fundamentals", type: "playground", xp: 20 },
      { id: "m4-params", title: "Parameters & Arguments", type: "playground", xp: 20 },
      { id: "m4-returns", title: "Return Values", type: "playground", xp: 20 },
      { id: "m4-arrow", title: "Arrow Functions", type: "playground", xp: 20 },
      { id: "m4-scope", title: "Scope Visualizer", type: "interactive", xp: 30 },
      { id: "m4-hoisting", title: "Hoisting Visualizer", type: "interactive", xp: 30 },
      { id: "m4-context", title: "Execution Context Visualizer", type: "interactive", xp: 40 },
      { id: "m4-quiz", title: "Module 4 Quiz", type: "quiz", xp: 50 },
    ],
  },
  {
    id: "module-5",
    title: "Call Stack & Closures",
    description: "Deep dive into the call stack and the magic of closures.",
    lessons: [
      { id: "m5-stack", title: "Call Stack Visualizer", type: "interactive", xp: 40 },
      { id: "m5-frames", title: "Stack Frames", type: "theory", xp: 20 },
      { id: "m5-closures", title: "Closures Visualizer", type: "interactive", xp: 50 },
      { id: "m5-scopechain", title: "Scope Chain Visualizer", type: "interactive", xp: 40 },
      { id: "m5-quiz", title: "Module 5 Quiz", type: "quiz", xp: 50 },
    ],
  }
];
