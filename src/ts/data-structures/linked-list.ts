import { defaultEquals, IEqualsFunction } from '../util';
import { Node } from './models/linked-list-models';

export default class LinkedList<T> {
  private count = 0;
  private head: Node<T> | undefined;

  constructor(private equalsFn: IEqualsFunction<T> =  defaultEquals) { }

  push(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === undefined || this.head === null) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.count++;
  }

  getElementAt(index: number) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index; i++) {
        if (node) {
          node = node.next;
        }
      }
      return node;
    }
    return undefined;
  }

  insert(index: number, element: T) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      const current = this.head;

      if (index === 0) {
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        if (previous) {
          node.next = previous.next;
          previous.next = node;
        }
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        if (this.head) {
          this.head = this.head.next;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        if (previous) {
          current = previous.next;
          if (current) {
            previous.next = current.next;
          }
        }
      }
      if (current) {
        this.count--;
        return current.element;
      }
    }
    return undefined;
  }

  remove(element: T) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element: T) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (this.equalsFn(element, current.element)) {
        return index;
      }
      index++;
      current = current.next;
    }

    return -1;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  clear() {
    this.head = undefined;
    this.count = 0;
  }

  toString() {
    if (this.head === undefined) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current: Node<T> | undefined = this.head.next;
    while (current) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
