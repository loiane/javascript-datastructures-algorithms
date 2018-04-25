import 'mocha';
import { expect } from 'chai';
import { MinHeap, heapSort } from '../../../src/js/index';

describe('Heap', () => {
  let heap;

  beforeEach(() => {
    heap = new MinHeap();
  });

  it('starts empty MinHeap', () => {
    expect(heap.size()).to.equal(0);
    expect(heap.isEmpty()).to.equal(true);
  });

  it('inserts values in the MinHeap', () => {
    const resultArray = [];
    for (let i = 1; i < 10; i++) {
      resultArray.push(i);
      heap.insert(i);
      expect(heap.getAsArray()).to.deep.equal(resultArray);
    }
  });

  it('finds the min value from the MinHeap', () => {
    const resultArray = [];
    for (let i = 10; i >= 1; i--) {
      resultArray.push(i);
      heap.insert(i);
      expect(heap.findMinimum()).to.equal(i);
    }
  });

  it('performs heapify in the MinHeap', () => {
    const resultArray = [];
    for (let i = 10; i >= 1; i--) {
      resultArray.push(i);
    }
    expect(heap.heapify(resultArray)).to.deep.equal(resultArray);
  });

  it('extracts the min value from the MinHeap', () => {
    let resultArray = [];
    for (let i = 1; i < 10; i++) {
      resultArray.push(i);
      heap.insert(i);
      expect(heap.getAsArray()).to.deep.equal(resultArray);
    }

    resultArray = [
      [],
      [2, 4, 3, 8, 5, 6, 7, 9],
      [3, 4, 6, 8, 5, 9, 7],
      [4, 5, 6, 8, 7, 9],
      [5, 7, 6, 8, 9],
      [6, 7, 9, 8],
      [7, 8, 9],
      [8, 9],
      [9],
      []
    ];

    for (let i = 1; i < 10; i++) {
      expect(heap.extract()).to.equal(i);
      expect(heap.getAsArray()).to.deep.equal(resultArray[i]);
    }
  });

  it('Heap Sort', () => {
    const array = [3, 2, 5, 6, 1, 7, 8, 9];

    expect(heapSort(array)).to.deep.equal([1, 2, 3, 5, 6, 7, 8, 9]);
  });
});
