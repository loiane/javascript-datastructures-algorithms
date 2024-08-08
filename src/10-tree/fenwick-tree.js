// Binary Indexed Tree (Fenwick Tree)
class FenwickTree {
  #arraySize;
  #tree;

  constructor(arraySize) {
    this.#arraySize = arraySize;
    this.#tree = Array(arraySize + 1).fill(0);
  }

  update(index, value) {
    if (index < 1 || index > this.#arraySize) {
      throw new Error('Index is out of range');
    }

    for (let i = index; i <= this.#arraySize; i += this.#lowBit(i)) {
      this.#tree[i] += value;
    }
  }

  query(index) {
    if (index < 1 || index > this.#arraySize) {
      throw new Error('Index is out of range');
    }

    let sum = 0;

    for (let i = index; i > 0; i -= this.#lowBit(i)) {
      sum += this.#tree[i];
    }

    return sum;
  }

  #lowBit(x) {
    return x & -x;
  }

  get arraySize() {
    return this.#arraySize;
  }

  toString() {
    return this.#tree.join(', ');
  }
}