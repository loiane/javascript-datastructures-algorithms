// src/11-heap/heap-sort.js

const Comparator = require('../10-tree/comparator');

/**
 * Heapify the array.
 * @param {*} array to be heapified.
 * @param {*} heapSize size of the heap.
 * @param {*} rootIndex index of the root.
 * @param {*} compareFn compare function.
*/
const siftDown = (array, heapSize, rootIndex, compareFn) => {
  let largest = rootIndex;
  let left = 2 * rootIndex + 1;
  let right = 2 * rootIndex + 2;

  if (left < heapSize && compareFn.greaterThan(array[left], array[largest])) {
    largest = left;
  }

  if (right < heapSize && compareFn.greaterThan(array[right], array[largest])) {
    largest = right;
  }

  if (largest !== rootIndex) {
    [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
    siftDown(array, heapSize, largest, compareFn);
  }
};

/**
 * Build max heap.
 * @param {*} array to be heapified.
 * @param {*} compareFn compare function.
 */
const buildMaxHeap = (array, compareFn) => {
  const heapSize = array.length;
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    siftDown(array, heapSize, i, compareFn);
  }
}

/**
 * Heap sort algorithm.
 * @param {*} array to be sorted.
 * @param {*} compareFn compare function.
 */
const HeapSort = (array, compareFn = Comparator.defaultCompareFn) => {
  const defaultCompareFn = new Comparator(compareFn);
  buildMaxHeap(array, defaultCompareFn);
  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    siftDown(array, i, 0, defaultCompareFn);
  }
}

module.exports = HeapSort;