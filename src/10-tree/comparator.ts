import Compare, { CompareResult } from './compare';

type CompareFn<T> = (a: T, b: T) => CompareResult;

class Comparator<T> {
  #compareFn: CompareFn<T>;

  /**
   * Creates a Comparator with an optional custom compare function.
   * @param compareFn - Custom comparison function; defaults to defaultCompareFn
   * @complexity Time O(1) | Space O(1)
   */
  constructor(compareFn: CompareFn<T> = Comparator.defaultCompareFn as CompareFn<T>) {
    this.#compareFn = compareFn;
  }

  /**
   * Default comparator: returns LESS_THAN, EQUALS, or BIGGER_THAN.
   * @param a - First value
   * @param b - Second value
   * @returns CompareResult
   * @complexity Time O(1) | Space O(1)
   */
  static defaultCompareFn<T>(a: T, b: T): CompareResult {
    if (a === b) return Compare.EQUALS;
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }

  /**
   * Returns true if a equals b.
   * @complexity Time O(1) | Space O(1)
   */
  equal(a: T, b: T): boolean {
    return this.#compareFn(a, b) === Compare.EQUALS;
  }

  /**
   * Returns true if a is less than b.
   * @complexity Time O(1) | Space O(1)
   */
  lessThan(a: T, b: T): boolean {
    return this.#compareFn(a, b) < Compare.EQUALS;
  }

  /**
   * Returns true if a is greater than b.
   * @complexity Time O(1) | Space O(1)
   */
  greaterThan(a: T, b: T): boolean {
    return this.#compareFn(a, b) > Compare.EQUALS;
  }
}

export default Comparator;
