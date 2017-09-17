// @ts-check

let items;
export default class Stack {
  constructor() {
    items = [];
  }
  push(element) {
    items.push(element);
  }

  pop() {
    return items.pop();
  }

  peek() {
    return items[items.length - 1];
  }

  isEmpty() {
    return items.length === 0;
  }

  size() {
    return items.length;
  }

  clear() {
    items = [];
  }

  toArray() {
    return items;
  }

  toString() {
    return items.toString();
  }
}

// export default Stack;
