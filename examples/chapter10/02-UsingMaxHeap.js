const { MaxHeap } = PacktDataStructuresAlgorithms;

const maxHeap = new MaxHeap();

maxHeap.insert(2);
maxHeap.insert(3);
maxHeap.insert(4);
maxHeap.insert(5);

maxHeap.insert(1);

console.log(maxHeap.getAsArray());

console.log('Heap size: ', maxHeap.size()); // 5
console.log('Heap is empty: ', maxHeap.isEmpty()); // false
console.log('Heap min value: ', maxHeap.findMinimum()); // 5

maxHeap.insert(6);
maxHeap.insert(9);
maxHeap.insert(10);
maxHeap.insert(14);

console.log(maxHeap.getAsArray());

console.log('Extract minimum: ', maxHeap.extract());
console.log(maxHeap.getAsArray());

