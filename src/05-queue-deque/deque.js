// src/05-queue-deque/deque.js

class Deque {
  #items = [];

  addFront(item) {
    this.#items.unshift(item);
  }

  addRear(item) {
    this.#items.push(item);
  }

  removeFront() {
    return this.#items.shift();
  }

  removeRear() {
    return this.#items.pop();
  }

  peekFront() {
    return this.#items[0];
  }

  peekRear() {
    return this.#items[this.#items.length - 1];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  get size() {
    return this.#items.length;
  }

  clear() {
    this.#items = [];
  }

  toString() {
    if (this.isEmpty()) {
      return 'Empty Deque';
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

module.exports = Deque;