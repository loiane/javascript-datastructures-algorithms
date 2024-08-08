
class SegmentTree {
  #inputArray;
  #segmentTree;
  #operationFallback;

  constructor(inputArray, operationFallback) {
    this.#inputArray = inputArray;
    this.#operationFallback = operationFallback;
    this.#segmentTree = Array(inputArray.length * 4).fill(0);

    this.#build(0, 0, inputArray.length - 1);
  }

  #build(currentIndex, leftIndex, rightIndex) {
    if (leftIndex === rightIndex) {
      this.#segmentTree[currentIndex] = this.#inputArray[leftIndex];
      return;
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    const leftChildIndex = 2 * currentIndex + 1;
    const rightChildIndex = 2 * currentIndex + 2;

    this.#build(leftChildIndex, leftIndex, middleIndex);
    this.#build(rightChildIndex, middleIndex + 1, rightIndex);

    this.#segmentTree[currentIndex] = this.#operationFallback(
      this.#segmentTree[leftChildIndex],
      this.#segmentTree[rightChildIndex]
    );
  }

  query(leftIndex, rightIndex) {
    return this.#query(0, 0, this.#inputArray.length - 1, leftIndex, rightIndex);
  }

  #query(currentIndex, leftIndex, rightIndex, queryLeftIndex, queryRightIndex) {
    if (queryLeftIndex > rightIndex || queryRightIndex < leftIndex) {
      return 0;
    }

    if (queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex) {
      return this.#segmentTree[currentIndex];
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    const leftChildIndex = 2 * currentIndex + 1;
    const rightChildIndex = 2 * currentIndex + 2;

    return this.#operationFallback(
      this.#query(leftChildIndex, leftIndex, middleIndex, queryLeftIndex, queryRightIndex),
      this.#query(rightChildIndex, middleIndex + 1, rightIndex, queryLeftIndex, queryRightIndex)
    );
  }

  update(index, value) {
    this.#update(0, 0, this.#inputArray.length - 1, index, value);
  }

  #update(currentIndex, leftIndex, rightIndex, index, value) {
    if (leftIndex === rightIndex) {
      this.#segmentTree[currentIndex] = value;
      return;
    }

    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    const leftChildIndex = 2 * currentIndex + 1;
    const rightChildIndex = 2 * currentIndex + 2;

    if (index <= middleIndex) {
      this.#update(leftChildIndex, leftIndex, middleIndex, index, value);
    } else {
      this.#update(rightChildIndex, middleIndex + 1, rightIndex, index, value);
    }

    this.#segmentTree[currentIndex] = this.#operationFallback(
      this.#segmentTree[leftChildIndex],
      this.#segmentTree[rightChildIndex]
    );
  }

  toString() {
    return this.#segmentTree.join(', ');
  }
}