// src/05-queue-deque/deque.ts

class Deque<T> {
  private items: T[] = [];

  /**
   * Adds an item to the front of the deque.
   * @param item - The item to add
   * @complexity Time O(n) | Space O(1)
   */
  addFront(item: T): void {
    this.items.unshift(item);
  }

  /**
   * Adds an item to the rear of the deque.
   * @param item - The item to add
   * @complexity Time O(1) | Space O(1)
   */
  addRear(item: T): void {
    this.items.push(item);
  }

  /**
   * Removes and returns the front item; returns undefined if empty.
   * @returns The front item, or undefined if the deque is empty
   * @complexity Time O(n) | Space O(1)
   */
  removeFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  /**
   * Removes and returns the rear item; returns undefined if empty.
   * @returns The rear item, or undefined if the deque is empty
   * @complexity Time O(1) | Space O(1)
   */
  removeRear(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  /**
   * Returns the front item without removing it; returns undefined if empty.
   * @returns The front item, or undefined if the deque is empty
   * @complexity Time O(1) | Space O(1)
   */
  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  /**
   * Returns the rear item without removing it; returns undefined if empty.
   * @returns The rear item, or undefined if the deque is empty
   * @complexity Time O(1) | Space O(1)
   */
  peekRear(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Returns true if the deque has no items.
   * @returns Whether the deque is empty
   * @complexity Time O(1) | Space O(1)
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Number of items in the deque.
   * @complexity Time O(1) | Space O(1)
   */
  get size(): number {
    return this.items.length;
  }

  /**
   * Removes all items from the deque.
   * @complexity Time O(1) | Space O(1)
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Returns a comma-separated string representation of the deque contents.
   * @returns String representation, or 'Empty Deque' if empty
   * @complexity Time O(n) | Space O(n)
   */
  toString(): string {
    if (this.isEmpty()) {
      return 'Empty Deque';
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

export default Deque;