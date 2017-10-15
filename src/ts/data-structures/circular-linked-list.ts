import { defaultEquals, IEqualsFunction } from '../util';
import LinkedList from './linked-list';
import { Node } from './models/linked-list-models';

export default class CircularLinkedList<T> extends LinkedList<T> {
  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  private getLastElement() {
    let current = this.head;
    for (let i = 2; i <= this.size() && current != null; i++) {
      current = current.next;
    }
    return current;
  }

  push(element: T) {
    const node = new Node(element);
    let current;

    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getLastElement();
      current.next = node;
    }

    // set node.next to head - to have circular list
    node.next = this.head;

    this.count++;
  }

  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;

      if (index === 0) {
        if (this.head == null) {
          // if no node  in list
          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getLastElement();
          // update last element
          this.head = node;
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
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
        const removed = this.head;

        if (this.size() === 1) {
          this.head = undefined;
        } else {
          current = this.getLastElement();
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        // no need to update last element for circular list
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
}
