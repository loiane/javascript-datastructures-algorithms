// src/05-queue-deque/queue.ts

class Queue<T> {

  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  get size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toString(): string {
    if (this.isEmpty()) {
      return 'Empty Queue';
    } else {
      return this.items.map(item => { // {1}
        if (typeof item === 'object' && item !== null) { // {2}
          return JSON.stringify(item); // Handle objects
        } else {
          return item.toString(); // Handle other types {3}
        }
      }).join(', '); // {4}
    }
  }
}

export default Queue;