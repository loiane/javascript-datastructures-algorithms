const { SortedLinkedList } = PacktDataStructuresAlgorithms;
const { util } = PacktDataStructuresAlgorithms;

const list = new SortedLinkedList();

console.log('');
for (let i = 5; i > 0; i--) {
  list.push(i);
}

console.log('list after pushing 5, 4, 3, 2, and 1 => ', list.toString());

console.log('list.removeAt(1) => ', list.removeAt(1));

console.log('remove element 16 => ', list.remove(5));

console.log('list.toString() => ', list.toString());

// ------- Example 02

class MyObj {
  constructor(el1, el2) {
    this.el1 = el1;
    this.el2 = el2;
  }
  toString() {
    return `${this.el1.toString()}|${this.el2.toString()}`;
  }
}

function myObjCompare(a, b) {
  return a.toString().localeCompare(b.toString());
}

const ds = new SortedLinkedList(util.defaultEquals, myObjCompare);

console.log('*** SortedLinkedList with custom sorting function');

ds.push(new MyObj(3, 4));
console.log('push MyObj(3, 4)');
console.log('list.toString() => ', ds.toString());

ds.push(new MyObj(1, 2));
console.log('push MyObj(1, 2)');
console.log('list.toString() => ', ds.toString());

ds.push(new MyObj(5, 6));
console.log('push MyObj(5, 6)');
console.log('list.toString() => ', ds.toString());

ds.insert(new MyObj(0, 0), 4);
console.log('insert MyObj(0, 0) pos 4 (pos ignored)');
console.log('list.toString() => ', ds.toString());
