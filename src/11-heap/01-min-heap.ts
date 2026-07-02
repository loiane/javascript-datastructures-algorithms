export {};

import Heap from './heap';

class Task {
  id: number;
  priority: number;
  executionTime: number;

  constructor(id: number, priority: number, executionTime: number) {
    this.id = id;
    this.priority = priority;
    this.executionTime = executionTime;
  }
}

class TaskScheduler {
  taskQueue: Heap<Task>;

  constructor() {
    this.taskQueue = new Heap<Task>((a, b) => a.priority - b.priority);
  }

  addTask(task: Task): void {
    this.taskQueue.insert(task);
  }

  scheduleNextTask(): Task | null {
    if (this.taskQueue.isEmpty()) {
      return null; // No tasks to schedule
    }
    return this.taskQueue.extract() ?? null;
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

// to see the output of this file use the command: node src/11-heap/01-min-heap.ts
