// src/05-queue-deque/02-using-queue-two-pointers.js

const Queue = require('./queue-two-pointers');

const queue = new Queue();

console.log(queue.isEmpty()); // true

queue.enqueue({ document: 'Chapter05.docx', pages: 20 });
queue.enqueue({ document: 'JavaScript.pdf', pages: 60 });
queue.enqueue({ document: 'TypeScript.pdf', pages: 80 });

console.log(queue.toString());

console.log(queue.size); // 3

console.log(queue.isEmpty()); // false

console.log(queue.front()); // { document: 'Chapter05.docx', pages: 20 }

// print all documents
while (!queue.isEmpty()) {
  console.log(queue.dequeue());
}

// add more documents
queue.enqueue({ document: 'DataStructures.pdf', pages: 400 });

console.log(queue.toString());
console.log(queue.size); // 1
console.log(queue.front()); // { document: 'DataStructures.pdf', pages: 400 }

// to see the output of this file use the command: node src/05-queue-deque/02-using-queue-two-pointers.js