// src/06-linked-list/doubly-linked-list.ts

class DoublyLinkedListNode<T> {
  constructor(
    public data: T,
    public next?: DoublyLinkedListNode<T>,
    public previous?: DoublyLinkedListNode<T>
  ) {}
}

class DoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null;
  private tail: DoublyLinkedListNode<T> | null;
  private size = 0;

  append(data: T) {
    const node = new DoublyLinkedListNode(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  prepend(data: T) {
    const node = new DoublyLinkedListNode(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    }
    this.size++;
  }

  insert(data: T, position: number): boolean {
    if (this.isInvalidPosition(position)) {
      return false;
    }
    if (position === 0) {
      this.prepend(data);
      return true;
    }
    if (position === this.size) { 
      this.append(data);
      return true; 
    }
    const newNode = new DoublyLinkedListNode(data);
    let current = this.head;
    let previous = null;
    for (let index = 0; index < position; index++) {
      previous = current;
      current = current.next;
    }
    newNode.next = current;
    newNode.previous = previous;
    current.previous = newNode;
    previous.next = newNode;
    this.size++;
    return true;
  }

  removeAt(position: number): T {
    if (this.isInvalidPosition(position)) {
      throw new RangeError('Invalid position');
    }
    let nodeToRemove = this.head;
    let previousNode = null;

    if (position === 0) {
        this.head = nodeToRemove.next;
        if (this.head) { // Check if new head exists
            this.head.previous = null;
        } else {
            this.tail = null; // List becomes empty
        }
    } else if (position === this.size - 1) {
        nodeToRemove = this.tail;
        this.tail = nodeToRemove.previous;
        this.tail.next = null;
    } else {
        let index = 0;
        while (index < position) {
            previousNode = nodeToRemove;
            nodeToRemove = nodeToRemove.next;
            index++;
        }
        previousNode.next = nodeToRemove.next;
        nodeToRemove.next.previous = previousNode; 
    }
    this.size--;
    return nodeToRemove.data;
  }

  private isInvalidPosition(position: number) {
    return position < 0 || position >= this.size;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  indexOf(data: T) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.data === data) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  remove(data: T): T | null {
    const index = this.indexOf(data);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  toString() {
    let current = this.head;
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
    let current = this.tail;
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
    let current = this.head;
    let previous = null;
    let next = null;
    while (current) {
      next = current.next;
      current.next = previous;
      current.previous = next;
      previous = current;
      current = next;
    }
    this.tail = this.head;
    this.head = previous;
  }
}

export default DoublyLinkedList;