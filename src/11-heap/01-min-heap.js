// src/11-heap/01-min-heap.js

const Heap = require('./heap');

class Task {
  constructor(id, priority, executionTime) {
    this.id = id;
    this.priority = priority; 
    this.executionTime = executionTime;
  }
}

class TaskScheduler {
  constructor() {
    this.taskQueue = new Heap((a,b) => a.priority - b.priority); 
  }

  addTask(task) {
    this.taskQueue.insert(task);
  }

  scheduleNextTask() {
    if (this.taskQueue.isEmpty()) {
      return null; // No tasks to schedule
    }
    return this.taskQueue.extract();
  }
}

const scheduler = new TaskScheduler();
scheduler.addTask(new Task(2, 2, 10)); 
scheduler.addTask(new Task(3, 3, 5));  
scheduler.addTask(new Task(4, 4, 8));  
scheduler.addTask(new Task(5, 5, 15));
scheduler.addTask(new Task(1, 1, 20));

console.log(scheduler.taskQueue.toArray());

console.log(scheduler.scheduleNextTask()); // Output: Task 1 (highest priority)

console.log(scheduler.taskQueue.toArray());

// to see the output of this file use the command: node src/11-heap/01-min-heap.js
