import { LessonContent } from "../contentMap";

export const module1Content: Record<string, LessonContent> = {
  "m1-intro": {
    sections: [
      {
        type: "text",
        title: "What is JavaScript?",
        content: "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard. It has dynamic typing, prototype-based object-orientation, and first-class functions."
      },
      {
        type: "alert",
        alertType: "info",
        content: "JavaScript was created by Brendan Eich in 1995 in just 10 days while he was working at Netscape."
      },
      {
        type: "text",
        title: "Key Characteristics",
        content: [
          "**High-Level**: You don't have to manage memory manually (unlike C). The Garbage Collector handles it.",
          "**Single-Threaded**: JavaScript executes one operation at a time in a single main thread.",
          "**Non-Blocking**: Through asynchronous events, callbacks, and promises, JS can handle multiple tasks seemingly simultaneously without blocking the main thread.",
          "**Multi-paradigm**: Supports object-oriented, imperative, and declarative (functional) programming styles."
        ]
      },
      {
        type: "text",
        title: "Interview Question: Java vs JavaScript?",
        content: "Despite the name, Java and JavaScript have entirely different semantics, syntax, and use cases. The name 'JavaScript' was actually a marketing tactic to ride the popularity wave of Java in the 90s."
      }
    ]
  },
  "m1-role": {
    sections: [
      {
        type: "text",
        title: "The Three Pillars of the Web",
        content: "HTML provides the structure, CSS provides the styling, and JavaScript provides the logic and interactivity."
      },
      {
        type: "list",
        title: "Where JavaScript is used today",
        content: [
          "**Frontend (Browser)**: React, Vue, Angular, Vanilla DOM manipulation.",
          "**Backend (Server)**: Node.js, Deno, Bun allow running JS on the server.",
          "**Mobile Apps**: React Native, Ionic, Expo.",
          "**Desktop Apps**: Electron (VS Code, Slack are built with this).",
          "**Databases**: MongoDB uses JavaScript as its query language."
        ]
      }
    ]
  },
  "m1-engine": {
    sections: [
      {
        type: "text",
        title: "What is a JavaScript Engine?",
        content: "A JavaScript engine is a computer program that executes JavaScript code. The most famous one is Google's V8 engine, but there are others like SpiderMonkey (Firefox) and JavaScriptCore (Safari)."
      },
      {
        type: "alert",
        alertType: "tip",
        content: "The engine's job is to take your human-readable JS code and convert it into machine code that the processor can understand."
      }
    ]
  },
  "m1-runtime": {
    sections: [
      {
        type: "text",
        title: "Engine vs Runtime",
        content: "A JavaScript engine (like V8) is just a component. A Runtime environment (like the Browser or Node.js) provides the Engine with surrounding APIs to interact with the outside world."
      },
      {
        type: "list",
        title: "Web APIs (Browser Runtime)",
        content: [
          "DOM (Document Object Model) - \`document.getElementById\`",
          "Fetch API - Making network requests",
          "Timers - \`setTimeout\`, \`setInterval\`",
          "Storage - \`localStorage\`, \`sessionStorage\`"
        ]
      },
      {
        type: "alert",
        alertType: "warning",
        content: "\`setTimeout\` is NOT a part of the JavaScript language. It is a Web API provided by the browser runtime!"
      }
    ]
  },
  "m1-v8": {
    sections: [
      {
        type: "text",
        title: "Inside the V8 Engine",
        content: "V8 translates JavaScript into machine code using a combination of an interpreter and a Just-In-Time (JIT) compiler."
      },
      {
        type: "list",
        title: "The V8 Pipeline",
        content: [
          "**Parser**: Converts source code into an Abstract Syntax Tree (AST).",
          "**Ignition (Interpreter)**: Generates unoptimized bytecode fast so execution can start immediately.",
          "**TurboFan (JIT Compiler)**: Takes hot (frequently executed) bytecode and optimizes it into highly efficient machine code."
        ]
      }
    ]
  },
  "m1-execution": {
    sections: [
      {
        type: "text",
        title: "The Execution Process",
        content: "When JS runs, an Execution Context is created. This happens in two phases:"
      },
      {
        type: "list",
        title: "Two Phases",
        content: [
          "**Memory Creation Phase**: JS scans the code, allocates memory for variables and functions. Variables are initialized with \`undefined\`, while functions are stored in their entirety. This is known as Hoisting.",
          "**Code Execution Phase**: Code is executed line by line, and variables are assigned their actual values."
        ]
      }
    ]
  },
  "m1-quiz": {
    sections: [],
    questions: [
      {
        id: "q1",
        question: "Which phase of execution context initializes variables to 'undefined'?",
        options: ["Compilation Phase", "Memory Creation Phase", "Code Execution Phase", "Garbage Collection Phase"],
        correctAnswer: 1,
        explanation: "During the Memory Creation Phase, the engine scans the code and allocates memory for variables (initialized to undefined) and functions."
      },
      {
        id: "q2",
        question: "Is 'setTimeout' a core feature of the JavaScript Engine (like V8)?",
        options: ["Yes, it is part of the ECMAScript standard.", "No, it is a Web API provided by the runtime environment.", "Yes, it is built into the V8 compiler.", "No, it is a CSS feature."],
        correctAnswer: 1,
        explanation: "setTimeout is not part of JS itself; it's a Web API provided by the browser runtime."
      },
      {
        id: "q3",
        question: "What is the name of V8's Just-In-Time (JIT) Compiler?",
        options: ["Ignition", "SpiderMonkey", "TurboFan", "Babel"],
        correctAnswer: 2,
        explanation: "TurboFan is the optimizing compiler in V8. Ignition is the interpreter."
      }
    ]
  }
};
