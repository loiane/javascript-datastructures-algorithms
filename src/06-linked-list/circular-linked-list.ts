// src/06-linked-list/circular-linked-list.ts

class LinkedListNode<T> {
  constructor(public element: T, public next: LinkedListNode<T> | null = null) {}
}

class CircularLinkedList<T> {

  private head: LinkedListNode<T> | null = null;
  private size = 0;

  append(element: T) {
    const node = new LinkedListNode(element, null);
    if (!this.head) {
      this.head = node;
      node.next = this.head;
    } else {
      let current: LinkedListNode<T> | null = this.head;
      while (current !== null && current.next !== this.head) {
        current = current.next;
      }
      if (current !== null) {
        current.next = node;
        node.next = this.head;
      }
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new LinkedListNode(element, this.head);
    let current: LinkedListNode<T> | null = this.head;
    while (current !== null && current.next !== this.head) {
      current = current.next;
    }
    if (current !== null) {
      current.next = node;
    }
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
    let current: LinkedListNode<T> | null = this.head;
    let previous: LinkedListNode<T> | null = null;
    let index = 0;
    while (index++ < position) {
      previous = current;
      current = current !== null ? current.next : null;
    }
    node.next = current;
    if (previous !== null) {
      previous.next = node;
    }
    this.size++;
    return true;
  }

  removeAt(position: number): T {
    if (this.isInvalidPosition(position)) {
      throw new Error('Invalid position');
    }
    let current: LinkedListNode<T> | null = this.head;
    let previous: LinkedListNode<T> | null = null;
    if (position === 0) {
      let last: LinkedListNode<T> | null = this.head;
      while (last !== null && last.next !== this.head) {
        last = last.next;
      }
      this.head = current !== null ? current.next : null;
      if (last !== null) {
        last.next = this.head;
      }
    } else {
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current !== null ? current.next : null;
      }
      if (previous !== null) {
        previous.next = current !== null ? current.next : null;
      }
    }
    this.size--;
    if (current === null) throw new Error('Node not found');
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
