const { Queue } = PacktDataStructuresAlgorithms;

const queue = new Queue();
console.log(queue.isEmpty()); // outputs true
queue.enqueue('John');
queue.enqueue('Jack');
console.log(queue.toString()); // John,Jack
queue.enqueue('Camila');
console.log(queue.toString()); // John,Jack,Camila
console.log(queue.size()); // outputs 3
console.log(queue.isEmpty()); // outputs false
queue.dequeue();
queue.dequeue();
console.log(queue.toString()); // Camila
