// src/04-stack/stack.ts

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
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
      return 'Empty Stack';
    } else {
      return this.items.map(item => {
        if (typeof item === 'object' && item !== null) {
          return JSON.stringify(item);
        } else {
          return item.toString();
        }
      }).join(', ');
    }
  }
}

export default Stack;