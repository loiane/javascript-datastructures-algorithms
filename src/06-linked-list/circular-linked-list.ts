// src/06-linked-list/circular-linked-list.ts

class LinkedListNode<T> {
  constructor(public element: T, public next: LinkedListNode<T> | null = null) {}
}

class CircularLinkedList<T> {

  private head: LinkedListNode<T> | null = null;
  private size = 0;

  /**
   * Appends an element to the end of the circular list.
   * @param element - The element to add
   * @complexity Time O(n) | Space O(1)
   */
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

  /**
   * Prepends an element to the beginning of the circular list.
   * @param element - The element to add
   * @complexity Time O(n) | Space O(1)
   */
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

  /**
   * Inserts an element at the given position.
   * @param position - Zero-based index to insert at
   * @param element - The element to insert
   * @returns true on success, false if position is invalid
   * @complexity Time O(n) | Space O(1)
   */
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

  /**
   * Removes and returns the element at the given position.
   * @param position - Zero-based index to remove
   * @returns The removed element
   * @throws Error if position is invalid
   * @complexity Time O(n) | Space O(1)
   */
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

  /**
   * Returns the number of elements in the list.
   * @returns The list size
   * @complexity Time O(1) | Space O(1)
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Returns true if the list has no elements.
   * @returns Whether the list is empty
   * @complexity Time O(1) | Space O(1)
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Returns the head node of the list.
   * @returns The head node, or null if empty
   * @complexity Time O(1) | Space O(1)
   */
  getHead(): LinkedListNode<T> | null {
    return this.head;
  }

  /**
   * Removes all elements from the list.
   * @complexity Time O(1) | Space O(1)
   */
  clear() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Removes the first occurrence of element and returns it, or null if not found.
   * @param element - The element to remove
   * @returns The removed element, or null if not found
   * @complexity Time O(n) | Space O(1)
   */
  remove(element: T): T | null {
    const index = this.indexOf(element);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  /**
   * Returns the zero-based index of the first occurrence of element, or -1.
   * @param element - The element to search for
   * @returns Index of the element, or -1 if not found
   * @complexity Time O(n) | Space O(1)
   */
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

  /**
   * Returns a ' -> ' separated string of all elements.
   * @returns String representation of the circular list
   * @complexity Time O(n) | Space O(n)
   */
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

  /**
   * Reverses the circular list in place.
   * @complexity Time O(n) | Space O(1)
   */
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
