// src/06-linked-list/circular-linked-list.ts

class LinkedListNode<T> {
  constructor(public element: T, public next?: LinkedListNode<T>) {}
}

class CircularLinkedList<T> {

  private head: LinkedListNode<T> | null;
  private size = 0;

  append(element: T) {
    const node = new LinkedListNode(element, null);
    if (!this.head) {
      this.head = node;
      node.next = this.head;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = node;
      node.next = this.head;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new LinkedListNode(element, this.head);
    let current = this.head;
    while (current.next !== this.head) {
      current = current.next;
    }
    current.next = node;
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
      return true;
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
      let last = this.head;
      while (last.next !== this.head) {
        last = last.next;
      }
      this.head = current.next;
      last.next = this.head;
    } else {
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
    return current.element;
  }

  private isInvalidPosition(position: number): boolean {
    return position < 0 || position >= this.size;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getHead(): LinkedListNode<T> | null {
    return this.head;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }

  remove(element: T): T | null {
    const index = this.indexOf(element);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  indexOf(element: T): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.element === element) {
        return index;
      }
      index++;
      current = current.next;
      if (current === this.head) {
        return -1;
      }
    }
    return -1;
  }

  toString() {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.element + (current.next !== this.head ? ' -> ' : '');
      current = current.next;
      if (current === this.head) {
        break;
      }
    }
    return result;
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
      if (current === this.head) {
        break;
      }
    }
    this.head = previous;
  }
}

export default CircularLinkedList;
