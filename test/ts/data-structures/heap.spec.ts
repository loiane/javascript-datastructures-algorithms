import 'mocha';
import { expect } from 'chai';
import { MinHeap } from '../../../src/ts/index';
import { MaxHeap } from '../../../src/ts/data-structures/heap';
import heapSort from '../../../src/ts/algorithms/sorting/heap-sort';

describe('Heap', () => {
  let heap: MinHeap<number>;

  beforeEach(() => {
    heap = new MinHeap<number>();
  });

  it('starts empty', () => {

  });

  it('inserts elements in the Heap', () => {

    let min = 2;

    heap.insert(2);
    expect(heap.findMinimum()).to.equal(min);
    heap.insert(3);
    expect(heap.findMinimum()).to.equal(min);
    heap.insert(4);
    expect(heap.findMinimum()).to.equal(min);
    heap.insert(5);
    expect(heap.findMinimum()).to.equal(min);

    heap.insert(1);
    min = 1;
    expect(heap.findMinimum()).to.equal(min);

    heap.insert(6);
    heap.insert(9);
    heap.insert(10);
    heap.insert(14);

    heap.extract();
    heap.extract();
    heap.extract();
    heap.extract();

    heap.isEmpty();

    const maxHeap = new MaxHeap<number>();
    maxHeap.insert(3);
    maxHeap.insert(2);
    maxHeap.insert(1);
    maxHeap.insert(4);

    maxHeap.extract();
    maxHeap.extract();
    maxHeap.extract();
    maxHeap.extract();

    maxHeap.isEmpty();
  });

  it('Heap Sort', () => {
    const array = [3, 2, 5, 6, 1, 7, 8, 9];

    heapSort(array);
  });
});
