// src/05-queue-deque/queue.ts

class Queue<T> {

  private items: T[] = [];

  /**
   * Adds an item to the rear of the queue.
   * @param item - The item to enqueue
   * @complexity Time O(1) | Space O(1)
   */
  enqueue(item: T): void {
    this.items.push(item);
  }

  /**
   * Removes and returns the front item; returns undefined if empty.
   * @returns The front item, or undefined if the queue is empty
   * @complexity Time O(n) | Space O(1)
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  /**
   * Returns the front item without removing it; returns undefined if empty.
   * @returns The front item, or undefined if the queue is empty
   * @complexity Time O(1) | Space O(1)
   */
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  /**
   * Returns true if the queue has no items.
   * @returns Whether the queue is empty
   * @complexity Time O(1) | Space O(1)
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Number of items in the queue.
   * @complexity Time O(1) | Space O(1)
   */
  get size(): number {
    return this.items.length;
  }

  /**
   * Removes all items from the queue.
   * @complexity Time O(1) | Space O(1)
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Returns a comma-separated string representation of the queue contents.
   * @returns String representation, or 'Empty Queue' if empty
   * @complexity Time O(n) | Space O(n)
   */
  toString(): string {
    if (this.isEmpty()) {
      return 'Empty Queue';
    } else {
      return this.items.map(item => { // {1}
        if (typeof item === 'object' && item !== null) { // {2}
          return JSON.stringify(item); // Handle objects
        } else {
          return String(item); // Handle other types {3}
        }
      }).join(', '); // {4}
    }
  }
}

export default Queue;