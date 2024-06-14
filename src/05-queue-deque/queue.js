// src/05-queue-deque/queue.js

class Queue {

  #items = [];

  enqueue(item) {
    this.#items.push(item);
  }

  dequeue() {
    return this.#items.shift();
  }

  front() {
    return this.#items[0];
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
      return 'Empty Queue';
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

module.exports = Queue;