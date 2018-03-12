import { Compare, defaultCompare, ICompareFunction } from '../util';

export default class PriorityQueue<T> {
  private items: T[];

  constructor(
    private compareFn: ICompareFunction<T> = defaultCompare,
    private compare: Compare = Compare.LESS_THAN
  ) {
    this.items = [];
  }

  enqueue(element: T) {
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.compareFn(element, this.items[i]) === this.compare) {
        this.items.splice(i, 0, element);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(element);
    }
  }

  dequeue() {
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    return this.items;
  }
}
