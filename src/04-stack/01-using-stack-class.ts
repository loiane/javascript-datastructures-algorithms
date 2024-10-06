// src/04-stack/01-using-stack-class.ts

import Stack from './stack';

enum Action {
  TYPE = 'typing',
  // Add more actions like DELETE, FORMAT, etc.
}

interface EditorAction {
  action: Action;
  text?: string; // Optional text for typing actions
}

const stack = new Stack<EditorAction>();

console.log(stack.isEmpty()); // true

console.log(stack.peek()); // undefined

stack.push({action: Action.TYPE, text: 'S'});
stack.push({action: Action.TYPE, text: 't'});

console.log(stack.peek()); //  { action: 'typing', text: 't' }

console.log(stack.size); // 2

stack.push({action: Action.TYPE, text: 'a'});
stack.push({action: Action.TYPE, text: 'c'});
stack.push({action: Action.TYPE, text: 'k'});

console.log(stack.size); // 5
console.log(stack.isEmpty()); // false

// removing two elements from the stack
stack.pop();
stack.pop();

console.log(stack.size); // 3
console.log(stack.peek()); // { action: 'typing', text: 'a' }

// toString
console.log(stack.toString());

// to see the output of this file use the command: npx ts-node src/04-stack/01-using-stack-class.ts