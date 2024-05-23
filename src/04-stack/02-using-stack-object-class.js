// src/04-stack/02-using-stack-object-class.js

const Stack = require('./stack-object'); 
// import { Stack } from './stack-object';  // or './stack-object.js' if you are using ES modules

const stack = new Stack();

console.log(stack.isEmpty()); // true

console.log(stack.peek()); // undefined

stack.push({action: 'typing', text: 'S'});
stack.push({action: 'typing', text: 't'});

// internal object representation
// #items = { 
//   0: { action: 'typing', text: 'S' }, 
//   1: { action: 'typing', text: 't' }}
// };
// #count = 2; 

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
console.log(stack);


// to see the output of this file use the command: node src/04-stack/02-using-stack-object-class.js