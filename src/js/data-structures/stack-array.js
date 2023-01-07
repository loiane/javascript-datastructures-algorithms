// @ts-check

export default class StackArray {
  constructor() {
    this.items = [];
  }

  push() {
    for (let i in arguments) {
      this.items.push(arguments[i]);
    }
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  toArray() {
    return this.items;
  }

  toString() {
    return this.items.toString();
  }
}
