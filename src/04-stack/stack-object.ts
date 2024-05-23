// src/04-stack/stack-object.ts

class Stack<T> {

  // private properties
  private items = {}; // {1}
  private count = 0; // {2}

  push(item: T) {
    this.items[this.count] = item;
    this.count++;
  }

  pop(): T | undefined {
    if (this.isEmpty()) { // {1}
      return undefined;
    }
    this.count--; // {2}
    const result = this.items[this.count]; // {3}
    delete this.items[this.count]; // {4}
    return result; // {5}
  }

  /**
   * 
   * @returns the last element in the stack or undefined if the stack is empty
    */
  peek(): T | undefined {
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  get size() {
    return this.count;
  }

  clear() {
    /* while (!this.isEmpty()) {
        this.pop();
      } */
    this.items = {};
    this.count = 0;
  }

  /**
   * Returns a string representation of the stack, bottom to top, without modifying the stack
   */
  toString() {
    if (this.isEmpty()) {
      return 'Empty Stack';
    }
    let objString = this.itemToString(this.items[0]); // {1}
    for (let i = 1; i < this.count; i++) { // {2}
      objString = `${objString}, ${this.itemToString(this.items[i])}`; // {3}
    }
    return objString;
  }

  private itemToString(item): string { // {4}
    if (typeof item === 'object' && item !== null) {
      return JSON.stringify(item); // Handle objects
    } else {
      return item.toString(); // Handle other types
    }
  }
}

// export node module so it can be used in different files
export default Stack;