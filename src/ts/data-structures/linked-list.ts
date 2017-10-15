import { defaultCompare, defaultEquals, ICompareFunction, IEqualsFunction } from '../util';
import { Node } from './models/linked-list-models';

export default class LinkedList<T> {
  protected count = 0;
  protected head: Node<T> | undefined;

  constructor(
    protected equalsFn: IEqualsFunction<T> = defaultEquals,
    protected compareFn: ICompareFunction<T> = defaultCompare
  ) {}

  push(element: T) {
    const node = new Node(element);
    let current;

    if (this.head == null) { // catches null && undefined
      this.head = node;
    } else {
      current = this.head;

      while (current.next != null) {
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
        if (node != null) {
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
        if (previous != null) {
          node.next = previous.next;
          previous.next = node;
        }
      }
      this.count++;
      return true;
    }
    return false;
  }

  insertSorted(element: T) {
    if (this.isEmpty()) {
      this.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      this.insert(index, element);
    }
  }

  private getIndexNextSortedElement(element: T) {
    let current = this.head;

    for (let i = 0; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element);
      if (comp >= 0) {
        return i;
      }
      current = current.next;
    }

    return -1;
  }

  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        if (this.head != null) {
          this.head = this.head.next;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        if (previous != null) {
          current = previous.next;
          if (current != null) {
            previous.next = current.next;
          }
        }
      }
      if (current != null) {
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

    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
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
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
