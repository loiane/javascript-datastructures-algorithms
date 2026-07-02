// src/06-linked-list/doubly-linked-list.ts

class DoublyLinkedListNode<T> {
  constructor(
    public data: T,
    public next: DoublyLinkedListNode<T> | null = null,
    public previous: DoublyLinkedListNode<T> | null = null
  ) {}
}

class DoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null = null;
  private tail: DoublyLinkedListNode<T> | null = null;
  private size = 0;

  /**
   * Appends an element to the end of the list.
   * @param data - The element to add
   * @complexity Time O(1) | Space O(1)
   */
  append(data: T) {
    const node = new DoublyLinkedListNode(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = this.tail;
      if (this.tail !== null) {
        this.tail.next = node;
      }
      this.tail = node;
    }
    this.size++;
  }

  /**
   * Prepends an element to the beginning of the list.
   * @param data - The element to add
   * @complexity Time O(1) | Space O(1)
   */
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

  /**
   * Inserts an element at the given position.
   * @param data - The element to insert
   * @param position - Zero-based index to insert at
   * @returns true on success, false if position is invalid
   * @complexity Time O(n) | Space O(1)
   */
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
    let current: DoublyLinkedListNode<T> | null = this.head;
    let previous: DoublyLinkedListNode<T> | null = null;
    for (let index = 0; index < position; index++) {
      previous = current;
      current = current !== null ? current.next : null;
    }
    newNode.next = current;
    newNode.previous = previous;
    if (current !== null) current.previous = newNode;
    if (previous !== null) previous.next = newNode;
    this.size++;
    return true;
  }

  /**
   * Removes and returns the element at the given position.
   * @param position - Zero-based index to remove
   * @returns The removed element
   * @throws RangeError if position is invalid
   * @complexity Time O(n) | Space O(1)
   */
  removeAt(position: number): T {
    if (this.isInvalidPosition(position)) {
      throw new RangeError('Invalid position');
    }
    let nodeToRemove: DoublyLinkedListNode<T> | null = this.head;
    let previousNode: DoublyLinkedListNode<T> | null = null;

    if (position === 0) {
      if (nodeToRemove === null) throw new RangeError('List is empty');
      this.head = nodeToRemove.next;
      if (this.head !== null) {
        this.head.previous = null;
      } else {
        this.tail = null;
      }
    } else if (position === this.size - 1) {
      nodeToRemove = this.tail;
      if (nodeToRemove === null) throw new RangeError('Unexpected null tail');
      this.tail = nodeToRemove.previous;
      if (this.tail !== null) {
        this.tail.next = null;
      }
    } else {
      let index = 0;
      while (index < position) {
        previousNode = nodeToRemove;
        nodeToRemove = nodeToRemove !== null ? nodeToRemove.next : null;
        index++;
      }
      if (previousNode !== null && nodeToRemove !== null) {
        previousNode.next = nodeToRemove.next;
        if (nodeToRemove.next !== null) {
          nodeToRemove.next.previous = previousNode;
        }
      }
    }
    this.size--;
    if (nodeToRemove === null) throw new RangeError('Node not found');
    return nodeToRemove.data;
  }

  private isInvalidPosition(position: number) {
    return position < 0 || position >= this.size;
  }

  /**
   * Returns the number of elements in the list.
   * @returns The list size
   * @complexity Time O(1) | Space O(1)
   */
  getSize() {
    return this.size;
  }

  /**
   * Returns true if the list has no elements.
   * @returns Whether the list is empty
   * @complexity Time O(1) | Space O(1)
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Returns the zero-based index of the first occurrence of data, or -1.
   * @param data - The element to search for
   * @returns Index of the element, or -1 if not found
   * @complexity Time O(n) | Space O(1)
   */
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

  /**
   * Removes the first occurrence of data and returns it, or null if not found.
   * @param data - The element to remove
   * @returns The removed element, or null if not found
   * @complexity Time O(n) | Space O(1)
   */
  remove(data: T): T | null {
    const index = this.indexOf(data);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  /**
   * Removes all elements from the list.
   * @complexity Time O(1) | Space O(1)
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Returns a comma-separated string of all elements from head to tail.
   * @returns String representation of the list
   * @complexity Time O(n) | Space O(n)
   */
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
  /**
   * Returns a string of all elements traversed from tail to head.
   * @returns Reverse string representation of the list
   * @complexity Time O(n) | Space O(n)
   */
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
      return String(data); 
    }
  }

  /**
   * Reverses the list in place.
   * @complexity Time O(n) | Space O(1)
   */
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