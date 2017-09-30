const _items = Symbol('stackItems');

class Stack {
  constructor() {
    this[_items] = [];
  }

  push(element) {
    this[_items].push(element);
  }

  pop() {
    return this[_items].pop();
  }

  peek() {
    return this[_items][this[_items].length - 1];
  }

  isEmpty() {
    return this[_items].length === 0;
  }

  size() {
    return this[_items].length;
  }

  clear() {
    this[_items] = [];
  }

  print() {
    console.log(this.toString());
  }

  toString() {
    return this[_items].toString();
  }
}

const stack = new Stack();
const objectSymbols = Object.getOwnPropertySymbols(stack);
console.log(objectSymbols.length); // 1
console.log(objectSymbols); // [Symbol()]
console.log(objectSymbols[0]); // Symbol()
stack[objectSymbols[0]].push(1);
stack.print(); // 5, 8, 1
