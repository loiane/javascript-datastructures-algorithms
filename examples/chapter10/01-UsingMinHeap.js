const { MinHeap } = PacktDataStructuresAlgorithms;

let heap = new MinHeap();

heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);

heap.insert(2);

console.log(heap.getAsArray());

console.log('Heap size: ', heap.size()); // 5
console.log('Heap is empty: ', heap.isEmpty()); // false
console.log('Heap min value: ', heap.findMinimum()); // 1

heap = new MinHeap();
for (let i = 1; i < 10; i++) {
  heap.insert(i);
}

console.log(heap.getAsArray());

console.log('Extract minimum: ', heap.extract()); // 1
console.log(heap.getAsArray()); // [2, 4, 3, 8, 5, 6, 7, 9]

