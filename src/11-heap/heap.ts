import Comparator from '../10-tree/comparator';

class Heap<T> {
  #heap: T[] = [];
  #compareFn: Comparator<T>;

  constructor(compareFn: (a: T, b: T) => number = Comparator.defaultCompareFn) {
    this.#compareFn = new Comparator<T>(compareFn as (a: T, b: T) => -1 | 1 | 0);
  }

  /**
   * Returns the index of the left child of the node at parentIndex.
   * @param parentIndex - Index of the parent node
   * @returns Left child index
   * @complexity Time O(1) | Space O(1)
   */
  getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  /**
   * Returns the index of the right child of the node at parentIndex.
   * @param parentIndex - Index of the parent node
   * @returns Right child index
   * @complexity Time O(1) | Space O(1)
   */
  getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  /**
   * Returns the index of the parent of the node at childIndex, or undefined for root.
   * @param childIndex - Index of the child node
   * @returns Parent index, or undefined if childIndex is 0
   * @complexity Time O(1) | Space O(1)
   */
  getParentIndex(childIndex: number): number | undefined {
    if (childIndex === 0) { return undefined; }
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * Inserts a value into the heap.
   * @param value - The value to insert
   * @returns true if inserted, false if value is falsy
   * @complexity Time O(log n) | Space O(1)
   */
  insert(value: T): boolean {
    if (value) {
      const index = this.#heap.length;
      this.#heap.push(value);
      this.#siftUp(index);
      return true;
    }
    return false;
  }

  #siftUp(index: number): void {
    const parentIndex = this.getParentIndex(index);

    if (parentIndex !== undefined && parentIndex >= 0 &&
      this.#compareFn.greaterThan(this.#heap[parentIndex]!, this.#heap[index]!)
    ) {
      [this.#heap[parentIndex], this.#heap[index]] = [this.#heap[index]!, this.#heap[parentIndex]!];
      this.#siftUp(parentIndex);
    }
  }

  /**
   * Removes and returns the root (min or max) element.
   * @returns The root element, or undefined if empty
   * @complexity Time O(log n) | Space O(1)
   */
  extract(): T | undefined {
    if (this.#heap.length === 0) {
      return undefined;
    }

    if (this.#heap.length === 1) {
      return this.#heap.shift();
    }

    const root = this.#heap[0];
    this.#heap[0] = this.#heap.pop()!;
    this.#siftDown(0);
    return root;
  }

  #siftDown(index: number): void {
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);
    let smallerIndex = index;

    if (leftIndex < this.#heap.length &&
      this.#compareFn.lessThan(this.#heap[leftIndex]!, this.#heap[smallerIndex]!)
    ) {
      smallerIndex = leftIndex;
    }

    if (rightIndex < this.#heap.length &&
      this.#compareFn.lessThan(this.#heap[rightIndex]!, this.#heap[smallerIndex]!)
    ) {
      smallerIndex = rightIndex;
    }

    if (smallerIndex !== index) {
      [this.#heap[index], this.#heap[smallerIndex]] = [this.#heap[smallerIndex]!, this.#heap[index]!];
      this.#siftDown(smallerIndex);
    }
  }

  /**
   * Builds the heap from an existing array in-place.
   * @param array - The array to heapify
   * @complexity Time O(n) | Space O(1)
   */
  heapify(array: T[]): void {
    this.#heap = array;
    const lastParentIndex = this.getParentIndex(this.#heap.length - 1);
    if (lastParentIndex !== undefined) {
      for (let i = lastParentIndex; i >= 0; i--) {
        this.#siftDown(i);
      }
    }
  }

  /**
   * Returns the root element without removing it; undefined if empty.
   * @returns The root element or undefined
   * @complexity Time O(1) | Space O(1)
   */
  peek(): T | undefined {
    return this.#heap.length === 0 ? undefined : this.#heap[0];
  }

  /**
   * Number of elements in the heap.
   * @complexity Time O(1) | Space O(1)
   */
  get size(): number {
    return this.#heap.length;
  }

  /**
   * Returns true if the heap has no elements.
   * @returns Whether the heap is empty
   * @complexity Time O(1) | Space O(1)
   */
  isEmpty(): boolean {
    return this.#heap.length === 0;
  }

  /**
   * Returns a shallow copy of the internal heap array.
   * @returns Array of heap elements
   * @complexity Time O(n) | Space O(n)
   */
  toArray(): T[] {
    return this.#heap.slice();
  }

  /**
   * Removes all elements from the heap.
   * @complexity Time O(1) | Space O(1)
   */
  clear(): void {
    this.#heap = [];
  }

  /**
   * Returns a comma-separated string of all heap elements.
   * @returns String representation of the heap
   * @complexity Time O(n) | Space O(n)
   */
  toString(): string {
    return this.#heap.toString();
  }
}

export default Heap;
