// src/11-heap/heap.js

const Comparator = require('../10-tree/comparator');

class Heap {
  #heap = [];
  #compareFn;

  constructor(compareFn = Comparator.defaultCompareFn) {
    this.#compareFn = new Comparator(compareFn);
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    if (childIndex === 0) { return undefined; }
    return Math.floor((childIndex - 1) / 2);
  }

  insert(value) {
    if (value) {
      const index = this.#heap.length;
      this.#heap.push(value);
      this.#siftUp(index);
      return true;
    }
    return false;
  }

  #siftUp(index) {
    const parentIndex = this.getParentIndex(index);

    if (parentIndex !== undefined && parentIndex >= 0 &&
      this.#compareFn.greaterThan(this.#heap[parentIndex], this.#heap[index])
    ) {
      [this.#heap[parentIndex], this.#heap[index]] = [this.#heap[index], this.#heap[parentIndex]];
      this.#siftUp(parentIndex);
    }
  }

  extract() {
    if (this.#heap.length === 0) {
      return undefined;
    }

    if (this.#heap.length === 1) {
      return this.#heap.shift();
    }

    const root = this.#heap[0];
    this.#heap[0] = this.#heap.pop();
    this.#siftDown(0);
    return root;
  }

  #siftDown(index) {
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);
    let smallerIndex = index;

    if (leftIndex < this.#heap.length &&
      this.#compareFn.lessThan(this.#heap[leftIndex], this.#heap[smallerIndex])
    ) {
      smallerIndex = leftIndex;
    }

    if (rightIndex < this.#heap.length &&
      this.#compareFn.lessThan(this.#heap[rightIndex], this.#heap[smallerIndex])
    ) {
      smallerIndex = rightIndex;
    }

    if (smallerIndex !== index) {
      [this.#heap[index], this.#heap[smallerIndex]] = [this.#heap[smallerIndex], this.#heap[index]];
      this.#siftDown(smallerIndex);
    }
  }

  heapify(array) {
    this.#heap = array;
    const lastParentIndex = this.getParentIndex(this.#heap.length - 1);
    if (lastParentIndex !== undefined) {
      for (let i = lastParentIndex; i >= 0; i--) {
        this.#siftDown(i);
      }
    }
  }

  peek() {
    return this.#heap.length === 0 ? undefined : this.#heap[0];
  }

  get size() {
    return this.#heap.length;
  }

  isEmpty() {
    return this.#heap.length === 0;
  }

  toArray() {
    return this.#heap.slice();
  }

  clear() {
    this.#heap = [];
  }

  toString() {
    return this.#heap.toString();
  }
}  

module.exports = Heap;