// src/11-heap/02-max-heap.js

const Heap = require('./heap');

class Patient {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }
}

const PRIORITY = { LOW: 1, MEDIUM: 2, HIGH: 3 };

const erHeap = new Heap((a, b) => b.priority - a.priority);

erHeap.insert(new Patient('Poppy', PRIORITY.LOW));
erHeap.insert(new Patient('Kieran', PRIORITY.HIGH));
erHeap.insert(new Patient('Camila', PRIORITY.MEDIUM));
erHeap.insert(new Patient('Casteel', PRIORITY.LOW));
erHeap.insert(new Patient('Mike', PRIORITY.HIGH));

console.log('Head', erHeap.toArray());

while (!erHeap.isEmpty()) {
  const patient = erHeap.extract();
  console.log('Next patient:', patient.name, patient.priority);
}
// Next patient: Kieran 3
// Next patient: Mike 3
// Next patient: Camila 2
// Next patient: Casteel 1
// Next patient: Poppy 1

// to see the output of this file use the command: node src/11-heap/02-max-heap.js
