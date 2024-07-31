// src/09-recursion/01-intro-recursion.js

// To understand recursion, one must first understand recursion
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function understandRecursion() {
  readline.question('Do you understand recursion? (y/n) ', (answer) => {
    if (answer.toLowerCase() === 'y') { // Base case
      console.log("Excellent! You've grasped recursion.");
      readline.close(); // Exit the program
    } else {
      console.log("Let's try again...");
      understandRecursion(); // Recursive call
    }
  });
}

understandRecursion();

// to see the output of this file use the command: node src/09-recursion/01-intro-recursion.js
