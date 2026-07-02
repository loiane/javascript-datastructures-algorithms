// Binary Indexed Tree (Fenwick Tree)
class FenwickTree {
  #arraySize: number;
  #tree: number[];

  constructor(arraySize: number) {
    this.#arraySize = arraySize;
    this.#tree = Array(arraySize + 1).fill(0);
  }

  update(index: number, value: number): void {
    if (index < 1 || index > this.#arraySize) {
      throw new Error('Index is out of range');
    }

    for (let i = index; i <= this.#arraySize; i += this.#lowBit(i)) {
      this.#tree[i] += value;
    }
  }

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

  get arraySize(): number {
    return this.#arraySize;
  }

  toString(): string {
    return this.#tree.join(', ');
  }
}

export default FenwickTree;
