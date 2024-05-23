// src/04-stack/01-using-stack-class.js

const Stack = require('./stack'); 
// import { Stack } from './stack';  // or './stack.js' if you are using ES modules

const stack = new Stack();

console.log(stack.isEmpty()); // true

stack.push({action: 'typing', text: 'S'});
stack.push({action: 'typing', text: 't'});

console.log(stack.peek()); // { action: 'typing', text: 't' }

console.log(stack.size); // 2

stack.push({action: 'typing', text: 'a'});
stack.push({action: 'typing', text: 'c'});
stack.push({action: 'typing', text: 'k'});

console.log(stack.size); // 5
console.log(stack.isEmpty()); // false

// removing two elements from the stack
stack.pop();
stack.pop();

console.log(stack.size); // 3
console.log(stack.peek()); // { action: 'typing', text: 'a' }

// toString
console.log(stack.toString());

// to see the output of this file use the command: node src/04-stack/01-using-stack-class.js