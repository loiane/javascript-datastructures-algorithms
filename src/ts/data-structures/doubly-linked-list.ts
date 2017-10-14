import { defaultEquals, IEqualsFunction } from '../util';
import { DoublyNode } from './models/linked-list-models';

export default class DoublyLinkedList<T> {
  private count = 0;
  private head: DoublyNode<T> | undefined;
  private tail: DoublyNode<T> | undefined;

  constructor(private equalsFn: IEqualsFunction<T> =  defaultEquals) { }

  push(element: T) {
    const node = new DoublyNode(element);

    if (this.head === undefined || this.head === null) {
      this.head = node;
      this.tail = node; // NEW
    } else {
      // attach to the tail node // NEW
      if (this.tail !== undefined && this.tail !== null) {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }
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
      const node = new DoublyNode(element);
      let current = this.head;

      if (index === 0) {
        if (this.head === undefined || this.head === null) {
          // NEW
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          this.head.prev = node; // NEW
          this.head = node;
        }
      } else if (index === this.count) {
        // last item // NEW

        current = this.tail; // {2}
        if (current) {
          current.next = node;
          node.prev = current;
          this.tail = node;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        if (previous) {
          current = previous.next;
          node.next = current;
          previous.next = node;

          if (current) {
            current.prev = node; // NEW
            node.prev = previous; // NEW
          }
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
          this.head = this.head.next; // {1}
          // if there is only one item, then we update tail as well //NEW
          if (this.count === 1) {
            // {2}
            this.tail = undefined;
          } else {
            if (this.head) {
              this.head.prev = undefined; // {3}
            }
          }
        }
      } else if (index === this.count - 1) {
        // last item //NEW
        current = this.tail; // {4}
        if (current) {
          this.tail = current.prev;
          if (this.tail) {
            this.tail.next = undefined;
          }
        }
      } else {
        current = this.getElementAt(index);
        if (current) {
          const previous = current.prev;
          if (previous) {
            // link previous with current's next - skip it to remove
            previous.next = current.next; // {6}
            if (current && current.next) {
              current.next.prev = previous; // NEW
            }
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

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.head = undefined;
    this.tail = undefined;
    this.count = 0;
  }

  size() {
    return this.count;
  }

  toString() {
    if (this.head === undefined) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current: DoublyNode<T> | undefined = this.head.next;
    while (current) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }

  inverseToString() {
    if (this.tail === undefined) {
      return '';
    }
    let objString = `${this.tail.element}`;
    let previous: DoublyNode<T> | undefined = this.tail.prev;
    while (previous) {
      objString = `${objString},${previous.element}`;
      previous = previous.prev;
    }
    return objString;
  }
}
