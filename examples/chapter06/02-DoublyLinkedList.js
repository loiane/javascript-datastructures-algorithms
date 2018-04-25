const { DoublyLinkedList } = PacktDataStructuresAlgorithms;

const list = new DoublyLinkedList();

console.log('push element 15');
list.push(15);
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('push element 16');
list.push(16);
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('push element 17');
list.push(17);
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('insert element 13 pos 0 => ', list.insert(13, 0));
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('insert element 18 pos 4 => ', list.insert(18, 4));
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('insert element 14 pos 1 => ', list.insert(14, 1));
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('list.removeAt(0) => ', list.removeAt(0));
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('list.removeAt(list.size() - 1) => ', list.removeAt(list.size() - 1));
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('list.removeAt(1) => ', list.removeAt(1));
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('remove element 16 => ', list.remove(16));
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('remove element 14 => ', list.remove(14));
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());

console.log('remove element 17 => ', list.remove(17));
console.log('list.toString() => ', list.toString());
console.log('list.inverseToString() => ', list.inverseToString());
