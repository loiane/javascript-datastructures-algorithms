// src/04-stack/01-undo-feature.js

const Stack = require('./stack'); 
// import { Stack } from './stack';  // or './stack.js' if you are using ES modules

const undoFeature = new Stack();

console.log(undoFeature.isEmpty()); // true

undoFeature.push({action: 'typing', text: 'S'});
undoFeature.push({action: 'typing', text: 't'});

console.log(undoFeature.peek()); // { action: 'typing', text: 't' }

console.log(undoFeature.size); // 2

undoFeature.push({action: 'typing', text: 'a'});
undoFeature.push({action: 'typing', text: 'c'});
undoFeature.push({action: 'typing', text: 'k'});

console.log(undoFeature.size); // 5
console.log(undoFeature.isEmpty()); // false

// removing two elements from the stack
undoFeature.pop();
undoFeature.pop();

console.log(undoFeature.size); // 3
console.log(undoFeature.peek()); // { action: 'typing', text: 'a' }

// toString
console.log(undoFeature.toString());

// to see the output of this file use the command: node src/04-stack/01-undo-feature.js