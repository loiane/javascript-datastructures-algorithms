import 'mocha';
// import { expect } from 'chai';
import { MinHeap } from '../../../src/ts/index';
import { MaxHeap } from '../../../src/ts/data-structures/heap';
import heapSort from '../../../src/ts/sorting/heap-sort';

describe('Heap', () => {
  let heap: MinHeap<number>;

  beforeEach(() => {
    heap = new MinHeap<number>();
  });

  it('starts empty', () => {

  });

  it('inserts elements in the AVLTree', () => {

    heap.insert(3);
    heap.insert(2);
    heap.insert(1);
    heap.insert(4);

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
