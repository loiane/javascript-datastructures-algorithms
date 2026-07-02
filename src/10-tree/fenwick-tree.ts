// Binary Indexed Tree (Fenwick Tree)
class FenwickTree {
  #arraySize: number;
  #tree: number[];

  constructor(arraySize: number) {
    this.#arraySize = arraySize;
    this.#tree = Array(arraySize + 1).fill(0);
  }

  /**
   * Adds value to the element at index and updates prefix sums.
   * @param index - 1-based index to update
   * @param value - Value to add
   * @complexity Time O(log n) | Space O(1)
   */
  update(index: number, value: number): void {
    if (index < 1 || index > this.#arraySize) {
      throw new Error('Index is out of range');
    }

    for (let i = index; i <= this.#arraySize; i += this.#lowBit(i)) {
      this.#tree[i] += value;
    }
  }

  /**
   * Returns the prefix sum from index 1 to the given index.
   * @param index - 1-based upper bound index
   * @returns Prefix sum up to index
   * @complexity Time O(log n) | Space O(1)
   */
  query(index: number): number {
    if (index < 1 || index > this.#arraySize) {
      throw new Error('Index is out of range');
    }

    let sum = 0;

    for (let i = index; i > 0; i -= this.#lowBit(i)) {
      sum += this.#tree[i];
    }

    return sum;
  }

  #lowBit(x: number): number {
    return x & -x;
  }

  /**
   * The size of the original array.
   * @complexity Time O(1) | Space O(1)
   */
  get arraySize(): number {
    return this.#arraySize;
  }

  /**
   * Returns a comma-separated string of the internal tree array.
   * @returns String representation of the Fenwick tree
   * @complexity Time O(n) | Space O(n)
   */
  toString(): string {
    return this.#tree.join(', ');
  }
}

export default FenwickTree;
