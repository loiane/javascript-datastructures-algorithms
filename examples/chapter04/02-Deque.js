const { Deque } = PacktDataStructuresAlgorithms;

const deque = new Deque();
console.log(deque.isEmpty()); // outputs true
deque.addBack('John');
deque.addBack('Jack');
console.log(deque.toString()); // John,Jack
deque.addBack('Camila');
console.log(deque.toString()); // John,Jack,Camila
console.log(deque.size()); // outputs 3
console.log(deque.isEmpty()); // outputs false
deque.removeFront(); // remove John
console.log(deque.toString()); // Jack,Camila
deque.removeBack(); // Camila decides to leave
console.log(deque.toString()); // Jack
deque.addFront('John'); // John comes back for information
console.log(deque.toString()); // John,Jack
