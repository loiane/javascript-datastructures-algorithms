let queue = new Queue2();
console.log(queue.isEmpty()); //outputs true
queue.enqueue("John");
queue.enqueue("Jack");
queue.print();
queue.enqueue("Camila");
queue.print();
console.log(queue.size()); //outputs 3
console.log(queue.isEmpty()); //outputs false
queue.dequeue();
queue.dequeue();
queue.print();