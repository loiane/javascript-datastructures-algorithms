const Stack = (() => {
  let items;
  class DS {
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
  return DS;
})();

export default Stack;
