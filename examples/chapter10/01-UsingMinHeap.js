const { MinHeap } = PacktDataStructuresAlgorithms;

const heap = new MinHeap();

heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);

heap.insert(1);

console.log(heap.getAsArray());

console.log('Heap size: ', heap.size()); // 5
console.log('Heap is empty: ', heap.isEmpty()); // false
console.log('Heap min value: ', heap.findMinimum()); // 1

heap.insert(6);
heap.insert(7);

console.log(heap.getAsArray());

console.log('Extract minimum: ', heap.extract());
console.log(heap.getAsArray());

