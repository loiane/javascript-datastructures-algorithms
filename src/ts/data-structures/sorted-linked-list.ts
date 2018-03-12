import { Compare, defaultCompare, defaultEquals, ICompareFunction, IEqualsFunction } from '../util';
import LinkedList from './linked-list';

export default class SortedLinkedList<T> extends LinkedList<T> {
  constructor(
    protected equalsFn: IEqualsFunction<T> = defaultEquals,
    protected compareFn: ICompareFunction<T> = defaultCompare
  ) {
    super(equalsFn);
  }

  push(element: T) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }

  insert(element: T, index: number = 0) {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }
    index = this.getIndexNextSortedElement(element);
    return super.insert(element, index);
  }

  private getIndexNextSortedElement(element: T) {
    let current = this.head;
    let i = 0;

    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }

    return i;
  }
}
