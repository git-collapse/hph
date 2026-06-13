import { LessonContent } from "../contentMap";

export const module2Content: Record<string, LessonContent> = {
  "m2-variables": {
    sections: [
      {
        type: "text",
        title: "Variables in JavaScript",
        content: "Variables are containers for storing data values. In modern JavaScript, we declare variables using `let` and `const`. Before ES6 (2015), `var` was the only way."
      },
      {
        type: "code",
        language: "javascript",
        content: `// The modern way
const maxUsers = 100; // Cannot be reassigned
let currentUserCount = 0; // Can be reassigned

currentUserCount = 1; // Valid
maxUsers = 101; // TypeError: Assignment to constant variable.`
      },
      {
        type: "list",
        title: "var vs let vs const",
        content: [
          "**var**: Function scoped, can be redeclared, gets hoisted with `undefined`.",
          "**let**: Block scoped, cannot be redeclared in the same scope, hoisted but resides in the Temporal Dead Zone (TDZ).",
          "**const**: Block scoped, cannot be reassigned or redeclared, hoisted to TDZ."
        ]
      },
      {
        type: "alert",
        alertType: "tip",
        content: "Best Practice: Always use `const` by default. Only use `let` if you know the value will change. Never use `var` in modern code."
      }
    ]
  },
  "m2-datatypes": {
    sections: [
      {
        type: "text",
        title: "Data Types",
        content: "JavaScript is dynamically typed, meaning a variable can hold a number, and later hold a string. There are 8 basic data types in JS: 7 Primitive types and 1 Reference type (Object)."
      },
      {
        type: "list",
        title: "Primitive Types",
        content: [
          "**String**: Text enclosed in quotes (`'hello'`).",
          "**Number**: Integers and floats (`42`, `3.14`). Includes `Infinity`, `-Infinity`, and `NaN`.",
          "**BigInt**: For numbers larger than the Number type can hold.",
          "**Boolean**: Logical `true` or `false`.",
          "**Undefined**: A variable that has been declared but not assigned a value.",
          "**Null**: An intentional absence of any object value.",
          "**Symbol**: Unique and immutable identifiers."
        ]
      },
      {
        type: "alert",
        alertType: "warning",
        content: "Interview Trap: `typeof null` returns `'object'`. This is a known, ancient bug in JavaScript that cannot be fixed without breaking older websites!"
      }
    ]
  },
  "m2-operators": {
    sections: [
      {
        type: "text",
        title: "Operators",
        content: "JavaScript provides operators for mathematical calculations, logical comparisons, and assignments."
      },
      {
        type: "code",
        language: "javascript",
        content: `// Arithmetic
console.log(5 ** 2); // 25 (Exponentiation)
console.log(10 % 3); // 1 (Remainder)

// Logical
console.log(true && false); // false (AND)
console.log(true || false); // true (OR)
console.log(!true); // false (NOT)

// Strict Equality
console.log(5 === "5"); // false
console.log(5 !== "5"); // true`
      }
    ]
  },
  "m2-coercion": {
    sections: [
      {
        type: "text",
        title: "Type Coercion",
        content: "Type coercion is the automatic or implicit conversion of values from one data type to another (such as strings to numbers)."
      },
      {
        type: "code",
        language: "javascript",
        content: `console.log(5 + "5"); // "55" (Number is coerced to String)
console.log("10" - 2); // 8 (String is coerced to Number)
console.log("10" * "2"); // 20
console.log(true + 1); // 2 (true coerced to 1)
console.log([] + []); // ""`
      },
      {
        type: "alert",
        alertType: "info",
        content: "The `+` operator prefers strings. If one operand is a string, it converts the other to a string and concatenates. Other math operators (`-`, `*`, `/`) prefer numbers and will coerce strings to numbers."
      }
    ]
  },
  "m2-memory": {
    sections: [
      {
        type: "text",
        title: "Stack vs Heap Memory",
        content: "Understanding how JavaScript stores data is crucial for mastering references and avoiding bugs."
      },
      {
        type: "list",
        title: "The Stack (Primitive Types)",
        content: [
          "Stores static data like numbers, strings, booleans, null, undefined.",
          "Size is known at compile time.",
          "Variables hold the actual value.",
          "When you copy a primitive, you create a brand new copy of the value."
        ]
      },
      {
        type: "list",
        title: "The Heap (Reference Types)",
        content: [
          "Stores dynamic data like Objects, Arrays, and Functions.",
          "Size is dynamic and can grow.",
          "Variables on the Stack only hold a **reference (memory address)** to the object in the Heap.",
          "When you copy an object, you are only copying the reference. Both variables point to the same object in memory!"
        ]
      }
    ]
  },
  "m2-quiz": {
    sections: [],
    questions: [
      {
        id: "q1",
        question: "What is the result of `typeof null` in JavaScript?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctAnswer: 2,
        explanation: "typeof null returns 'object'. This is a historical bug in JavaScript that remains for legacy compatibility."
      },
      {
        id: "q2",
        question: "What does `console.log('5' - 3)` output?",
        options: ["'53'", "2", "NaN", "TypeError"],
        correctAnswer: 1,
        explanation: "The minus operator (-) triggers numeric coercion. '5' is coerced to the number 5, and 5 - 3 = 2."
      },
      {
        id: "q3",
        question: "Where are objects and arrays stored in memory?",
        options: ["In the Call Stack", "In the Memory Heap", "In the Event Queue", "In the Web APIs"],
        correctAnswer: 1,
        explanation: "Complex data structures like objects, arrays, and functions are allocated in the Memory Heap."
      }
    ]
  }
};
