class MySet {
  #items: Record<string, boolean> = {};
  #size = 0;

  add(value: string): boolean {
    if (!this.has(value)) {
      this.#items[value] = true;
      this.#size++;
      return true;
    }
    return false;
  }

  addAll(values: string[]): void {
    values.forEach(value => this.add(value));
  }

  delete(value: string): boolean {
    if (this.has(value)) {
      delete this.#items[value];
      this.#size--;
      return true;
    }
    return false;
  }

  has(value: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.#items, value);
  }

  values(): string[] {
    return Object.keys(this.#items);
  }

  get size(): number {
    return this.#size;
  }

  getSizeWithoutSizeProperty(): number {
    let count = 0;
    for (const key in this.#items) {
      if (Object.prototype.hasOwnProperty.call(this.#items, key)) {
        count++;
      }
    }
    return count;
  }

  isEmpty(): boolean {
    return this.#size === 0;
  }

  clear(): void {
    this.#items = {};
    this.#size = 0;
  }

  union(otherSet: MySet): MySet {
    const unionSet = new MySet();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }

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

  difference(otherSet: MySet): MySet {
    const differenceSet = new MySet();
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }

  isSubsetOf(otherSet: MySet): boolean {
    if (this.size > otherSet.size) {
      return false;
    }
    return this.values().every(value => otherSet.has(value));
  }

  isSupersetOf(otherSet: MySet): boolean {
    if (this.size < otherSet.size) {
      return false;
    }
    return otherSet.values().every(value => this.has(value));
  }

  toString(): string {
    return this.values().join(', ');
  }
}

export default MySet;
