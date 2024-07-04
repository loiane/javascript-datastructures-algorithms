// src/06-linked-list/circular-linked-list.js

class LinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class CircularLinkedList {

  #head;
  #size = 0;

  append(data) {
    const newNode = new LinkedListNode(data);
    if (!this.#head) { // empty list                              
      this.#head = newNode;
      newNode.next = this.#head; // point to itself
    } else { // non-empty list
      let current = this.#head;
      while (current.next !== this.#head) { 
        current = current.next;
      }
      current.next = newNode; 
      newNode.next = this.#head; // circular reference
    }
    this.#size++;
  }

  prepend(data) {
    const newNode = new LinkedListNode(data, this.#head);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head; // make it circular
    } else {
      // Find the last node
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      this.head = newNode;
    }
    this.#size++;
  }

  insert(data, position) {
    if (this.#isInvalidPosition(position)) {
      return false;
    }
    const node = new LinkedListNode(data, null);
    if (position === 0) {
      this.prepend(data);
      return true;
    }
    let current = this.#head;
    let previous = null;
    let index = 0;
    while (index++ < position) {
      previous = current;
      current = current.next;
    }
    node.next = current;
    previous.next = node;
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
    } else if (position === this.#size - 1) {
      return this.#removeFromTail();
    } else {
      return this.#removeFromMiddle(position);
    }
  }

  #removeFromHead() {
    const nodeToRemove = this.#head;
    let lastNode = this.#head;
    while (lastNode.next !== this.#head) { // Find the last node
      lastNode = lastNode.next;
    }
    this.#head = nodeToRemove.next; // skip the head
    lastNode.next = this.#head;  // make it circular
  
    if (this.#size === 1) {  // only one node
      this.#head = null;
    }
    this.#size--;                
    return nodeToRemove.data; 
  }

  #removeFromTail() {
    if (this.#head.next === this.#head) { // single node case
      const nodeToRemove = this.#head;
      this.#head = null;
      this.#size--;
      return nodeToRemove.data;
    } else {
      let lastNode = this.#head;
      let previousNode = null;
      while (lastNode.next !== this.#head) { // Find the last node
        previousNode = lastNode;
        lastNode = lastNode.next;
      }
      previousNode.next = this.#head; // skip the last node to remove it
      this.#size--;                  
      return lastNode.data;          
    }
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

  clear() {
    this.#head = null;
    this.#size = 0;
  }

  remove(data: T): T | null {
    const index = this.indexOf(data);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  indexOf(data: T): number {
    let current = this.#head;
    let index = 0;
    while (current) {
      if (current.data === data) {
        return index;
      }
      index++;
      current = current.next;
      if (current === this.#head) {
        return -1;
      }
    }
    return -1;
  }

  toString() {
    let current = this.#head;
    let result = '';
    while (current) {
      result += current.data + (current.next !== this.#head ? ' -> ' : '');
      current = current.next;
      if (current === this.#head) {
        break;
      }
    }
    return result;
  }

  reverse() {
    let current = this.#head;
    let previous = null;
    let next = null;
    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
      if (current === this.#head) {
        break;
      }
    }
    this.#head = previous;
  }
}

export default CircularLinkedList;
