class MySet {
  #items: Record<string, boolean> = {};
  #size = 0;

  /**
   * Adds a value to the set.
   * @param value - The value to add
   * @returns true if added, false if already present
   * @complexity Time O(1) | Space O(1)
   */
  add(value: string): boolean {
    if (!this.has(value)) {
      this.#items[value] = true;
      this.#size++;
      return true;
    }
    return false;
  }

  /**
   * Adds multiple values to the set.
   * @param values - Array of values to add
   * @complexity Time O(n) | Space O(n)
   */
  addAll(values: string[]): void {
    values.forEach(value => this.add(value));
  }

  /**
   * Removes a value from the set.
   * @param value - The value to remove
   * @returns true if removed, false if not present
   * @complexity Time O(1) | Space O(1)
   */
  delete(value: string): boolean {
    if (this.has(value)) {
      delete this.#items[value];
      this.#size--;
      return true;
    }
    return false;
  }

  /**
   * Returns true if the set contains the given value.
   * @param value - The value to check
   * @returns Whether the value is in the set
   * @complexity Time O(1) | Space O(1)
   */
  has(value: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.#items, value);
  }

  /**
   * Returns an array of all values in the set.
   * @returns Array of values
   * @complexity Time O(n) | Space O(n)
   */
  values(): string[] {
    return Object.keys(this.#items);
  }

  /**
   * Number of elements in the set.
   * @complexity Time O(1) | Space O(1)
   */
  get size(): number {
    return this.#size;
  }

  /**
   * Returns the size by counting own properties (alternative to size getter).
   * @returns The number of elements
   * @complexity Time O(n) | Space O(1)
   */
  getSizeWithoutSizeProperty(): number {
    let count = 0;
    for (const key in this.#items) {
      if (Object.prototype.hasOwnProperty.call(this.#items, key)) {
        count++;
      }
    }
    return count;
  }

  /**
   * Returns true if the set has no elements.
   * @returns Whether the set is empty
   * @complexity Time O(1) | Space O(1)
   */
  isEmpty(): boolean {
    return this.#size === 0;
  }

  /**
   * Removes all elements from the set.
   * @complexity Time O(1) | Space O(1)
   */
  clear(): void {
    this.#items = {};
    this.#size = 0;
  }

  /**
   * Returns a new set containing all elements from both sets.
   * @param otherSet - The set to union with
   * @returns A new set with all elements
   * @complexity Time O(n+m) | Space O(n+m)
   */
  union(otherSet: MySet): MySet {
    const unionSet = new MySet();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }

  /**
   * Returns a new set containing only elements present in both sets.
   * @param otherSet - The set to intersect with
   * @returns A new set with common elements
   * @complexity Time O(n) | Space O(n)
   */
  intersection(otherSet: MySet): MySet {
    const intersectionSet = new MySet();
    const [smallerSet, largerSet] = this.size <= otherSet.size ? [this, otherSet] : [otherSet, this];
    smallerSet.values().forEach(value => {
      if (largerSet.has(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }

  /**
   * Returns a new set with elements in this set but not in otherSet.
   * @param otherSet - The set to subtract
   * @returns A new set with the difference
   * @complexity Time O(n) | Space O(n)
   */
  difference(otherSet: MySet): MySet {
    const differenceSet = new MySet();
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }

  /**
   * Returns true if every element of this set is also in otherSet.
   * @param otherSet - The potential superset
   * @returns Whether this set is a subset of otherSet
   * @complexity Time O(n) | Space O(1)
   */
  isSubsetOf(otherSet: MySet): boolean {
    if (this.size > otherSet.size) {
      return false;
    }
    return this.values().every(value => otherSet.has(value));
  }

  /**
   * Returns true if every element of otherSet is also in this set.
   * @param otherSet - The potential subset
   * @returns Whether this set is a superset of otherSet
   * @complexity Time O(n) | Space O(1)
   */
  isSupersetOf(otherSet: MySet): boolean {
    if (this.size < otherSet.size) {
      return false;
    }
    return otherSet.values().every(value => this.has(value));
  }

  /**
   * Returns a comma-separated string of all set values.
   * @returns String representation of the set
   * @complexity Time O(n) | Space O(n)
   */
  toString(): string {
    return this.values().join(', ');
  }
}

export default MySet;
