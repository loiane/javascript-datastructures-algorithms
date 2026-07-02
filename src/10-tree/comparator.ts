import Compare, { CompareResult } from './compare';

type CompareFn<T> = (a: T, b: T) => CompareResult;

class Comparator<T> {
  #compareFn: CompareFn<T>;

  constructor(compareFn: CompareFn<T> = Comparator.defaultCompareFn as CompareFn<T>) {
    this.#compareFn = compareFn;
  }

  static defaultCompareFn<T>(a: T, b: T): CompareResult {
    if (a === b) return Compare.EQUALS;
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }

  equal(a: T, b: T): boolean {
    return this.#compareFn(a, b) === Compare.EQUALS;
  }

  lessThan(a: T, b: T): boolean {
    return this.#compareFn(a, b) < Compare.EQUALS;
  }

  greaterThan(a: T, b: T): boolean {
    return this.#compareFn(a, b) > Compare.EQUALS;
  }
}

export default Comparator;
