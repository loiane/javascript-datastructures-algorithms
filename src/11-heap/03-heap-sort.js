// src/11-heap/03-heap-sort.js

const Comparator = require('../10-tree/comparator');
const Heap = require('./heap');
const HeapSort = require('./heap-sort');

const heapSort = (array, compareFn = Comparator.defaultCompareFn) => {
  const heap = new Heap(compareFn);
  heap.heapify(array);

  const sortedArray = [];
  while (!heap.isEmpty()){
    sortedArray.push(heap.extract());
  }


  return heap.toArray();
};

// using the Heap class and the heapify method
let unsortedArray = [7, 6, 3, 5, 4, 1, 2];
console.log(heapSort(unsortedArray)); // [1, 2, 3, 4, 5, 6, 7]

// using the heap sort algorithm
const unsortedArray = [7, 6, 3, 5, 4, 1, 2];
HeapSort(unsortedArray); // will modify the array in place
console.log(unsortedArray); // [1, 2, 3, 4, 5, 6, 7]

// to see the output of this file use the command: node src/11-heap/03-heap-sort.js