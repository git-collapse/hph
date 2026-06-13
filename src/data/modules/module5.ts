import { LessonContent } from "../contentMap";

export const module5Content: Record<string, LessonContent> = {
  "m5-stack": {
    sections: [
      {
        type: "text",
        title: "The Call Stack",
        content: "The Call Stack is a mechanism for an interpreter to keep track of its place in a script that calls multiple functions — what function is currently being run and what functions are called from within that function."
      },
      {
        type: "list",
        title: "LIFO Principle",
        content: [
          "**LIFO**: Last In, First Out.",
          "When a script calls a function, the interpreter adds it to the call stack and then starts carrying out the function.",
          "Any functions that are called by that function are added to the call stack further up, and run where their calls are reached.",
          "When the current function is finished, the interpreter takes it off the stack and resumes execution where it left off."
        ]
      }
    ]
  },
  "m5-frames": {
    sections: [
      {
        type: "text",
        title: "Stack Frames",
        content: "Every time a function is called, a new Stack Frame is pushed onto the Call Stack. This frame contains the function's Execution Context (its arguments, local variables, and the return address)."
      },
      {
        type: "alert",
        alertType: "warning",
        content: "Stack Overflow: If you have a recursive function that calls itself endlessly without a base case, it will keep adding stack frames until the stack runs out of memory, causing a 'Maximum call stack size exceeded' error."
      }
    ]
  },
  "m5-closures": {
    sections: [
      {
        type: "text",
        title: "Closures",
        content: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment)."
      },
      {
        type: "alert",
        alertType: "tip",
        content: "In simpler terms: A closure gives you access to an outer function's scope from an inner function, EVEN AFTER the outer function has finished executing and returned!"
      },
      {
        type: "code",
        language: "javascript",
        content: `function createCounter() {
  let count = 0; // Lexical scope of createCounter
  
  return function() {
    count++; // Accesses 'count' from outer scope
    console.log(count);
  }
}

const counter = createCounter();
// createCounter has finished executing here!
// But 'counter' still remembers 'count'

counter(); // 1
counter(); // 2`
      }
    ]
  },
  "m5-scopechain": {
    sections: [
      {
        type: "text",
        title: "The Scope Chain",
        content: "When a variable is used in JavaScript, the JS engine will try to find the variable's value in the current scope. If it cannot find the variable, it will look into the outer (lexical) scope, and continue doing so until it finds the variable or reaches the global scope."
      },
      {
        type: "text",
        title: "Lexical Environment",
        content: "A Lexical Environment consists of two parts: the environment record (local memory) and a reference to the outer environment. This chain of outer references forms the Scope Chain."
      }
    ]
  },
  "m5-quiz": {
    sections: [],
    questions: [
      {
        id: "q1",
        question: "In what order does the Call Stack process functions?",
        options: ["First In, First Out (FIFO)", "Last In, First Out (LIFO)", "Random Order", "Smallest First"],
        correctAnswer: 1,
        explanation: "The Call Stack uses LIFO. The last function pushed onto the stack is the first one to be popped off and executed completely."
      },
      {
        id: "q2",
        question: "What happens if the call stack gets too large (e.g., infinite recursion)?",
        options: ["The browser allocates more memory", "Stack Overflow error is thrown", "The oldest frame is deleted", "The engine switches to the heap"],
        correctAnswer: 1,
        explanation: "When the stack size limit is exceeded, a Stack Overflow error (Maximum call stack size exceeded) is thrown."
      },
      {
        id: "q3",
        question: "What is a closure?",
        options: ["A function that takes another function as an argument", "A function that remembers its outer lexical environment even after the outer function returns", "A built-in method to close browser tabs", "A variable declared with const"],
        correctAnswer: 1,
        explanation: "A closure allows an inner function to remember and access variables from its outer function's scope, even after the outer function has finished executing."
      }
    ]
  }
};
