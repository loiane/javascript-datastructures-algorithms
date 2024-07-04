// src/06-linked-list/doubly-linked-list.js

class DoublyLinkedListNode {
  constructor(data, next = null, previous = null) {
    this.data = data;
    this.next = next;
    this.previous = previous; // new
  }  
}

class DoublyLinkedList {
  #head;
  #tail;
  #size = 0;

  append(data) {
    const newNode = new DoublyLinkedListNode(data);
    if (!this.#head) { // empty list
      this.#head = newNode;
      this.#tail = newNode;
    } else { // non-empty list
      newNode.previous = this.#tail;
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
    this.#size++;
  }

  prepend(data) {
    const newNode = new DoublyLinkedListNode(data);
    if (!this.#head) {  // empty list
      this.#head = newNode;
      this.#tail = newNode; 
    } else { // non-empty list
      newNode.next = this.#head;
      this.#head.previous = newNode;
      this.#head = newNode;
    }
    this.#size++;
  }

  insert(data, position) {
    if (this.#isInvalidPosition(position)) {
      return false; 
    }
  
    if (position === 0) { // first position
      this.prepend(data);
      return true;
    }
  
    if (position === this.#size) { // last position
      this.append(data);
      return true;
    }
  
    // middle position
    return this.#insertInTheMiddle(data, position);
  }

  #insertInTheMiddle(data, position) {
    const newNode = new DoublyLinkedListNode(data);
    let currentNode = this.#head;
    let previousNode;
  
    for (let index = 0; index < position; index++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
  
    newNode.next = currentNode;
    newNode.previous = previousNode;
    currentNode.previous = newNode;
    previousNode.next = newNode;
  
    this.#size++;
    return true;
  }

  removeAt(position) {
    if (this.#size === 0) {
      throw new RangeError('Cannot remove from an empty list.');
    }
    if (this.#isInvalidPosition(position)) {
      throw new RangeError('Invalid position.');
    }
  
    if (position === 0) {
      return this.#removeFromHead();
    } 
    if (position === this.#size - 1) {
      return this.#removeFromTail();
    } 
    return this.#removeFromMiddle(position);
  }

  #removeFromHead() {
    const nodeToRemove = this.#head;
    this.#head = nodeToRemove.next;
    if (this.#head) {
      this.#head.previous = null;
    } else {
      this.#tail = null; // List becomes empty
    }
    this.#size--;
    nodeToRemove.next = null;
    return nodeToRemove.data;
  }
  
  #removeFromTail() {
    const nodeToRemove = this.#tail;
    this.#tail = nodeToRemove.previous;
    if (this.#tail) {
      this.#tail.next = null;
    } else {
      this.#head = null; // List becomes empty
    }
    this.#size--;
    nodeToRemove.previous = null;
    return nodeToRemove.data;
  }
  
  #removeFromMiddle(position) {
    let nodeToRemove = this.#head;
    let previousNode;
    for (let index = 0; index < position; index++) {
      previousNode = nodeToRemove;
      nodeToRemove = nodeToRemove.next;
    }
  
    previousNode.next = nodeToRemove.next;
    nodeToRemove.next.previous = previousNode; 

    nodeToRemove.next = null;
    nodeToRemove.previous = null;
  
    this.#size--;
    return nodeToRemove.data;
  }

  #isInvalidPosition(position) {
    return position < 0 || position >= this.#size;
  }

  get size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  indexOf(data, compareFunction = (a, b) => a === b) {
    let current = this.#head;
    let index = 0;
    while (current) {
      if (compareFunction(current.data, data)) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }


  clear() {
    this.#head = null;
    this.#size = 0;
  }

  toString() {
    let current = this.#head;
    let objString = '';
    while (current) {
      objString += this.elementToString(current.data);
      current = current.next;
      if (current) {
        objString += ', ';
      }
    }
    return objString;
  }

  // inverse toString
  inverseToString() {
    let current = this.#tail;
    let objString = '';
    while (current) {
      objString += this.elementToString(current.data);
      current = current.previous;
    }
    return objString;
  }

  private elementToString(data: T): string {
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data);
    } else {
      return data.toString(); 
    }
  }

  reverse() {
    let current = this.#head;
    let previous = null;
    let next = null;
    while (current) {
      next = current.next;
      current.next = previous;
      current.previous = next;
      previous = current;
      current = next;
    }
    this.#tail = this.#head;
    this.#head = previous;
  }
}

export default DoublyLinkedList;