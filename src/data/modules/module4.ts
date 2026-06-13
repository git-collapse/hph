import { LessonContent } from "../contentMap";

export const module4Content: Record<string, LessonContent> = {
  "m4-functions": {
    sections: [
      {
        type: "text",
        title: "Functions",
        content: "A JavaScript function is a block of code designed to perform a particular task. Functions are First-Class Citizens in JS, meaning they can be passed as arguments, returned from other functions, and assigned to variables."
      },
      {
        type: "code",
        language: "javascript",
        content: `// Function Declaration (Hoisted)
function greet() {
  console.log("Hello!");
}

// Function Expression (Not Hoisted)
const sayGoodbye = function() {
  console.log("Goodbye!");
};`
      }
    ]
  },
  "m4-params": {
    sections: [
      {
        type: "text",
        title: "Parameters & Arguments",
        content: "Parameters are the names listed in the function definition. Arguments are the real values passed to (and received by) the function."
      },
      {
        type: "code",
        language: "javascript",
        content: `function add(a, b) { // a and b are parameters
  return a + b;
}

add(5, 10); // 5 and 10 are arguments

// Default Parameters (ES6)
function greet(name = "Guest") {
  console.log("Hello " + name);
}`
      }
    ]
  },
  "m4-returns": {
    sections: [
      {
        type: "text",
        title: "Return Values",
        content: "When JavaScript reaches a `return` statement, the function will stop executing. If the function was invoked from a statement, JavaScript will 'return' to execute the code after the invoking statement."
      },
      {
        type: "alert",
        alertType: "warning",
        content: "If a function does not have a `return` statement, it implicitly returns `undefined`."
      }
    ]
  },
  "m4-arrow": {
    sections: [
      {
        type: "text",
        title: "Arrow Functions",
        content: "Arrow functions were introduced in ES6. They allow us to write shorter function syntax and, importantly, they do not bind their own `this` keyword."
      },
      {
        type: "code",
        language: "javascript",
        content: `// Traditional Function
const multiply = function(x, y) {
  return x * y;
};

// Arrow Function
const multiplyArrow = (x, y) => x * y; // Implicit return!`
      }
    ]
  },
  "m4-scope": {
    sections: [
      {
        type: "text",
        title: "Scope & Lexical Environment",
        content: "Scope determines the accessibility (visibility) of variables. JavaScript has Global Scope, Function Scope, and Block Scope (for let/const)."
      },
      {
        type: "list",
        title: "Scope Rules",
        content: [
          "Inner scopes can access outer scopes (Lexical Scoping).",
          "Outer scopes CANNOT access inner scopes.",
          "`var` is function scoped, meaning it ignores block (`{}`) boundaries unless it's a function block."
        ]
      }
    ]
  },
  "m4-hoisting": {
    sections: [
      {
        type: "text",
        title: "Hoisting",
        content: "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope before code execution. Only the declarations are hoisted, NOT the initializations!"
      },
      {
        type: "code",
        language: "javascript",
        content: `console.log(myVar); // undefined
var myVar = 10;

console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 20;

sayHello(); // Works!
function sayHello() {
  console.log("Hello!");
}`
      }
    ]
  },
  "m4-context": {
    sections: [
      {
        type: "text",
        title: "Execution Context",
        content: "Everything in JavaScript happens inside an Execution Context. It's like a box that contains your code. There is one Global Execution Context, and a new Function Execution Context is created every time a function is invoked."
      }
    ]
  },
  "m4-quiz": {
    sections: [],
    questions: [
      {
        id: "q1",
        question: "Which keyword creates variables that are Block Scoped?",
        options: ["var only", "let and const", "var and let", "function"],
        correctAnswer: 1,
        explanation: "let and const respect block scope (like inside an if statement or a for loop). var ignores blocks and is only constrained by functions."
      },
      {
        id: "q2",
        question: "What does an arrow function NOT bind?",
        options: ["Its own 'this' keyword", "Its own scope", "Return values", "Parameters"],
        correctAnswer: 0,
        explanation: "Arrow functions do not bind their own 'this'. They inherit 'this' from the enclosing lexical context."
      },
      {
        id: "q3",
        question: "If a function lacks a return statement, what does it return?",
        options: ["null", "NaN", "undefined", "It throws an error"],
        correctAnswer: 2,
        explanation: "Functions in JS return undefined by default if no explicit return value is provided."
      }
    ]
  }
};
