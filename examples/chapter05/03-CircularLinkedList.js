const { CircularLinkedList } = PacktDataStructuresAlgorithms;

const list = new CircularLinkedList();

console.log('push element 15');
list.push(15);
console.log('list.toString() => ', list.toString());

console.log('push element 16');
list.push(16);
console.log('list.toString() => ', list.toString());

console.log('insert element 14 pos 0 => ', list.insert(14, 0));
console.log('list.toString() => ', list.toString());

console.log('insert element 14.5 pos 1 => ', list.insert(14.5, 1));
console.log('list.toString() => ', list.toString());

console.log('insert element 17 pos 4 => ', list.insert(17, 4));
console.log('list.toString() => ', list.toString());

console.log('list.removeAt(0) => ', list.removeAt(0));
console.log('list.toString() => ', list.toString());

console.log('list.removeAt(1) => ', list.removeAt(1));
console.log('list.toString() => ', list.toString());

console.log('list.removeAt(2) => ', list.removeAt(2));
console.log('list.toString() => ', list.toString());

console.log('list.indexOf(14.5) => ', list.indexOf(14.5));
console.log('list.indexOf(16) => ', list.indexOf(16));
