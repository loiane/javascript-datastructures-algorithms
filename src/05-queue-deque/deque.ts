// src/05-queue-deque/deque.ts

class Deque<T> {
  private items: T[] = [];

  addFront(item: T): void {
    this.items.unshift(item);
  }

  addRear(item: T): void {
    this.items.push(item);
  }

  removeFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  removeRear(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  peekRear(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
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
      return 'Empty Deque';
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

export default Deque;