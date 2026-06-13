import { LessonContent } from "../contentMap";

export const module3Content: Record<string, LessonContent> = {
  "m3-if-else": {
    sections: [
      {
        type: "text",
        title: "If / Else Statements",
        content: "Control flow allows your program to make decisions. The `if` statement executes a block of code if a specified condition is truthy. If the condition is falsy, another block of code can be executed using `else`."
      },
      {
        type: "code",
        language: "javascript",
        content: `const age = 18;

if (age >= 18) {
  console.log("You can vote!");
} else if (age >= 16) {
  console.log("You can drive, but not vote.");
} else {
  console.log("Too young.");
}`
      },
      {
        type: "alert",
        alertType: "tip",
        content: "Falsy values in JS: `false`, `0`, `\"\"` (empty string), `null`, `undefined`, and `NaN`. Everything else is Truthy!"
      }
    ]
  },
  "m3-switch": {
    sections: [
      {
        type: "text",
        title: "Switch Statement",
        content: "The `switch` statement is used to perform different actions based on different conditions. It's often cleaner than a long chain of `if/else if` statements when checking a single value."
      },
      {
        type: "code",
        language: "javascript",
        content: `const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week!");
    break; // Crucial! Without break, it falls through to the next case.
  case "Friday":
    console.log("Weekend is near!");
    break;
  default:
    console.log("Just another day.");
}`
      }
    ]
  },
  "m3-ternary": {
    sections: [
      {
        type: "text",
        title: "Ternary Operator",
        content: "The conditional (ternary) operator is the only JavaScript operator that takes three operands. It is frequently used as a one-line shorthand for an `if...else` statement."
      },
      {
        type: "code",
        language: "javascript",
        content: `const age = 20;
// condition ? ifTrue : ifFalse
const status = age >= 18 ? "Adult" : "Minor";

console.log(status); // "Adult"`
      }
    ]
  },
  "m3-loops": {
    sections: [
      {
        type: "text",
        title: "Loops",
        content: "Loops are handy, if you want to run the same code over and over again, each time with a different value."
      },
      {
        type: "list",
        title: "Types of Loops",
        content: [
          "**for**: Loops through a block of code a number of times. Contains initialization, condition, and increment.",
          "**while**: Loops through a block of code as long as a specified condition is true.",
          "**do...while**: Also loops while a condition is true, but it will execute the code block AT LEAST once before checking the condition."
        ]
      },
      {
        type: "code",
        language: "javascript",
        content: `// For loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// While loop
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}`
      }
    ]
  },
  "m3-break": {
    sections: [
      {
        type: "text",
        title: "Break and Continue",
        content: "The `break` statement 'jumps out' of a loop. The `continue` statement 'jumps over' one iteration in the loop."
      },
      {
        type: "code",
        language: "javascript",
        content: `for (let i = 0; i < 10; i++) {
  if (i === 3) {
    continue; // Skips 3
  }
  if (i === 7) {
    break; // Stops the loop entirely at 7
  }
  console.log(i);
}`
      }
    ]
  },
  "m3-quiz": {
    sections: [],
    questions: [
      {
        id: "q1",
        question: "What does the 'break' statement do in a loop?",
        options: ["Restarts the loop", "Exits the loop entirely", "Skips the current iteration", "Pauses the loop"],
        correctAnswer: 1,
        explanation: "The 'break' statement terminates the current loop, switch, or label statement and transfers program control to the statement following the terminated statement."
      },
      {
        id: "q2",
        question: "Which of the following is a falsy value?",
        options: ["'false' (string)", "0", "[] (empty array)", "{} (empty object)"],
        correctAnswer: 1,
        explanation: "The number 0 is falsy. A string containing 'false', an empty array, and an empty object are all truthy."
      },
      {
        id: "q3",
        question: "How many operands does a ternary operator take?",
        options: ["One", "Two", "Three", "Four"],
        correctAnswer: 2,
        explanation: "The ternary operator takes three operands: a condition, an expression to execute if truthy, and an expression to execute if falsy."
      }
    ]
  }
};
