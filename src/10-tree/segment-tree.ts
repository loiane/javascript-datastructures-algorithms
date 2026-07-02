class SegmentTree {
  #inputArray: number[];
  #segmentTree: number[];
  #operationFallback: (a: number, b: number) => number;

  /**
   * Builds a segment tree from the input array using the given operation.
   * @param inputArray - The source array
   * @param operationFallback - Binary operation (e.g., Math.min, sum)
   * @complexity Time O(n) | Space O(n)
   */
  constructor(inputArray: number[], operationFallback: (a: number, b: number) => number) {
    this.#inputArray = inputArray;
    this.#operationFallback = operationFallback;
    this.#segmentTree = Array(inputArray.length * 4).fill(0);

    this.#build(0, 0, inputArray.length - 1);
  }

  #build(currentIndex: number, leftIndex: number, rightIndex: number): void {
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

  /**
   * Returns the result of applying the operation over the range [leftIndex, rightIndex].
   * @param leftIndex - Left bound (0-based, inclusive)
   * @param rightIndex - Right bound (0-based, inclusive)
   * @returns The aggregated result for the range
   * @complexity Time O(log n) | Space O(log n)
   */
  query(leftIndex: number, rightIndex: number): number {
    return this.#query(0, 0, this.#inputArray.length - 1, leftIndex, rightIndex);
  }

  #query(currentIndex: number, leftIndex: number, rightIndex: number, queryLeftIndex: number, queryRightIndex: number): number {
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

  /**
   * Updates the element at index to value and rebuilds affected tree nodes.
   * @param index - 0-based index to update
   * @param value - New value
   * @complexity Time O(log n) | Space O(log n)
   */
  update(index: number, value: number): void {
    this.#update(0, 0, this.#inputArray.length - 1, index, value);
  }

  #update(currentIndex: number, leftIndex: number, rightIndex: number, index: number, value: number): void {
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

  /**
   * Returns a comma-separated string of the internal segment tree array.
   * @returns String representation
   * @complexity Time O(n) | Space O(n)
   */
  toString(): string {
    return this.#segmentTree.join(', ');
  }
}

export default SegmentTree;
