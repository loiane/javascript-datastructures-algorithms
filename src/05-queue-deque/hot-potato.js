class CircularQueue {
  #items = [];
  #capacity = 0;
  #front = 0;
  #rear = -1;
  #size = 0;

  constructor(capacity) {
    this.#items = new Array(capacity);
    this.#capacity = capacity;
  }

  enqueue(item) {
    if (this.isFull()) {
      throw new Error("Queue is full");
    }
    this.#rear = (this.#rear + 1) % this.#capacity;
    this.#items[this.#rear] = item;
    this.#size++;
  }

  dequeue() {
    if (this.isEmpty()) { throw new Error("Queue is empty"); }

    const item = this.#items[this.#front];
    this.#size--;

    if (this.isEmpty()) { 
      this.#front = 0;
      this.#rear = -1;
    } else {
      this.#front = (this.#front + 1) % this.#capacity; 
    }

    return item;
  }

  isEmpty() { return this.#size === 0;  }
  isFull() { return this.#size === this.#capacity; }
  get size() { return this.#size; }
}

// Hot Potato Game Function
function hotPotato(players, numPasses) {
  const queue = new CircularQueue(players.length);
  for (const player of players) {
    queue.enqueue(player);
  }

  while (queue.size > 1) {
    for (let i = 0; i < numPasses; i++) {
      queue.enqueue(queue.dequeue());
    }
    console.log(`${queue.dequeue()} is eliminated!`);
  }

  return queue.dequeue(); // The winner
}

// Example Usage
const players = ["Violet", "Feyre", "Poppy", "Oraya", "Aelin"];
const winner = hotPotato(players, 7);
console.log(`The winner is: ${winner}!`);

// Output
// Poppy is eliminated!
// Feyre is eliminated!
// Aelin is eliminated!
// Oraya is eliminated!
// The winner is: Violet!

// to see the output of this file use the command: node src/05-queue-deque/hot-potato.js