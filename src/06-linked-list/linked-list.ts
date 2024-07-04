// src/06-linked-list/linked-list.ts

class LinkedListNode<T> {
  constructor(public element: T, public next?: LinkedListNode<T>) {}
}

class LinkedList<T> {

  private head: LinkedListNode<T> | null;
  private size = 0;

  append(element: T) {
    const node = new LinkedListNode(element, null);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new LinkedListNode(element, this.head);
    this.head = node;
    this.size++;
  }

  insert(position: number, element: T): boolean {
    if (this.isInvalidPosition(position)) {
      return false;
    }
    const node = new LinkedListNode(element, null);
    if (position === 0) {
      this.prepend(element);
      return true
    } 
    let current = this.head;
    let previous = null;
    let index = 0;
    while (index++ < position) {
      previous = current;
      current = current.next;
    }
    node.next = current;
    previous.next = node;
    this.size++;
    return true;
  }

  removeAt(position: number): T {
    if (this.isInvalidPosition(position)) {
      throw new Error('Invalid position');
    }
    let current = this.head;
    let previous = null;
    if (position === 0) {
      this.head = current.next;
    } else {
      for (let index = 0; index < position; index++) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
    return current.element;
  }

  private isInvalidPosition(position: number) {
    return position < 0 || position >= this.size;
  }

  remove(element: T): T | null {
    const index = this.indexOf(element);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  indexOf(element: T) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.element === element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this.size === 0;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  reverse() {
    let current = this.head;
    let previous = null;
    let next = null;
    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.head = previous;
  }

  toString() {
    let current = this.head;
    let objString = '';
    while (current) {
      objString += this.elementToString(current.element);
      current = current.next;
      if (current) {
        objString += ', ';
      }
    }
    return objString;
  }

  private elementToString(element: T): string {
    if (typeof element === 'object' && element !== null) {
      return JSON.stringify(element);
    } else {
      return element.toString(); 
    }
  }
}

export default LinkedList;