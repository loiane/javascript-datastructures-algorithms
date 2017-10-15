import { defaultEquals, IEqualsFunction } from '../util';
import LinkedList from './linked-list';
import { DoublyNode } from './models/linked-list-models';

export default class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | undefined;
  protected tail: DoublyNode<T> | undefined;

  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  push(element: T) {
    const node = new DoublyNode(element);

    if (this.head == null) {
      this.head = node;
      this.tail = node; // NEW
    } else {
      // attach to the tail node // NEW
      if (this.tail != null) {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }
    }
    this.count++;
  }

  insert(index: number, element: T) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;

      if (index === 0) {
        if (this.head == null) {
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
        if (current != null) {
          current.next = node;
          node.prev = current;
          this.tail = node;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        if (previous != null) {
          current = previous.next;
          node.next = current;
          previous.next = node;

          if (current != null) {
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
        if (this.head != null) {
          this.head = this.head.next; // {1}
          // if there is only one item, then we update tail as well //NEW
          if (this.count === 1) {
            // {2}
            this.tail = undefined;
          } else {
            if (this.head != null) {
              this.head.prev = undefined; // {3}
            }
          }
        }
      } else if (index === this.count - 1) {
        // last item //NEW
        current = this.tail; // {4}
        if (current != null) {
          this.tail = current.prev;
          if (this.tail) {
            this.tail.next = undefined;
          }
        }
      } else {
        current = this.getElementAt(index);
        if (current != null) {
          const previous = current.prev;
          if (previous != null) {
            // link previous with current's next - skip it to remove
            previous.next = current.next; // {6}
            if (current != null && current.next != null) {
              current.next.prev = previous; // NEW
            }
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

  indexOf(element: T) {
    let current = this.head;
    let index = 0;

    while (current != null) {
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

  clear() {
    super.clear();
    this.tail = undefined;
  }

  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    while (current != null) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }

  inverseToString() {
    if (this.tail == null) {
      return '';
    }
    let objString = `${this.tail.element}`;
    let previous = this.tail.prev;
    while (previous != null) {
      objString = `${objString},${previous.element}`;
      previous = previous.prev;
    }
    return objString;
  }
}
