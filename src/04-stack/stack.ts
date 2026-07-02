// src/04-stack/stack.ts

class Stack<T> {
  private items: T[] = [];

  /**
   * Pushes an item onto the top of the stack.
   * @param item - The item to push
   * @complexity Time O(1) | Space O(1)
   */
  push(item: T): void {
    this.items.push(item);
  }

  /**
   * Removes and returns the top item; returns undefined if empty.
   * @returns The top item, or undefined if the stack is empty
   * @complexity Time O(1) | Space O(1)
   */
  pop(): T | undefined {
    return this.items.pop();
  }

  /**
   * Returns the top item without removing it; returns undefined if empty.
   * @returns The top item, or undefined if the stack is empty
   * @complexity Time O(1) | Space O(1)
   */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /**
   * Returns true if the stack has no items.
   * @returns Whether the stack is empty
   * @complexity Time O(1) | Space O(1)
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Number of items in the stack.
   * @complexity Time O(1) | Space O(1)
   */
  get size(): number {
    return this.items.length;
  }

  /**
   * Removes all items from the stack.
   * @complexity Time O(1) | Space O(1)
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Returns a comma-separated string representation of the stack contents.
   * @returns String representation, or 'Empty Stack' if empty
   * @complexity Time O(n) | Space O(n)
   */
  toString(): string {
    if (this.isEmpty()) {
      return 'Empty Stack';
    } else {
      return this.items.map(item => {
        if (typeof item === 'object' && item !== null) {
          return JSON.stringify(item);
        } else {
          return String(item);
        }
      }).join(', ');
    }
  }
}

export default Stack;