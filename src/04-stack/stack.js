// src/04-stack/stack.js

// @ts-ignore
class Stack {

  // private property
  #items = []; // {1}

  /**
   * Adds a new element to the top of the stack
   * @param {*} item - new element to be added to the stack
   */
  push(item) {
    this.#items.push(item);
  }

  /**
   * Removes the top element from the stack and returns it. If the stack is empty, undefined is returned and the stack is not modified.
   */
  pop() {
    return this.#items.pop();
  }

  /**
   * Returns the top element of the stack without removing it. The stack is not modified (it does not remove the element; it only returns the element for information purposes).
   */
  peek() {
    return this.#items[this.#items.length - 1];
  }

  /**
   * Returns true if the stack does not contain any elements and false if the size of the stack is bigger than 0.
   */
  isEmpty() {
    return this.#items.length === 0;
  }

  /**
   * Returns the number of elements in the stack. It is similar to the length property of an array.
   */
  get size() {
    return this.#items.length;
  }

  /**
   * Removes all the elements from the stack
   */
  clear() {
    /* while (!this.isEmpty()) {
        this.pop();
      } */
    this.#items = [];
  }

  /**
   * Returns a string representation of the stack, bottom to top, without modifying the stack
   */
  toString() {
    if (this.isEmpty()) {
      return 'Empty Stack';
    } else {
      return this.#items.map(item => { // {1}
        if (typeof item === 'object' && item !== null) { // {2}
          return JSON.stringify(item); // Handle objects
        } else {
          return item.toString(); // Handle other types {3}
        }
      }).join(', '); // {4}
    }
  }
}

// export node module so it can be used in different files
// CommonJS export
module.exports = Stack;