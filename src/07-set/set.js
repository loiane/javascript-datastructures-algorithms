class MySet {
  #items = {};
  #size = 0;

  add(value) {
    if (!this.has(value)) {
      this.#items[value] = true; // mark the value as present
      this.#size++;
      return true;
    }
    return false;
  }

  addAll(values) {
    values.forEach(value => this.add(value));
  }

  delete(value) {
    if (this.has(value)) {
      delete this.#items[value];
      this.#size--;
      return true;
    }
    return false;
  }

  has(value) {
    return this.#items.hasOwnProperty(value); 
  }

  values() {
    return Object.keys(this.#items);
  }
  
  get size() {
    return this.#size;
  }

  getSizeWithoutSizeProperty() {
    let count = 0;
    for (const key in this.#items) {
      if (this.#items.hasOwnProperty(key)) { 
        count++;
      }
    }
    return count;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#items = {};
    this.#size = 0;
  }

  union(otherSet) {
    const unionSet = new MySet();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }

  intersection(otherSet) {
    const intersectionSet = new MySet();
    const [smallerSet, largerSet] = this.size <= otherSet.size ? [this, otherSet] : [otherSet, this];
    smallerSet.values().forEach(value => {
      if (largerSet.has(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }

  difference(otherSet) {
    const differenceSet = new MySet();
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }

  isSubsetOf(otherSet) {
    if (this.size > otherSet.size) {
      return false;
    }
    return this.values().every(value => otherSet.has(value));
  }

  isSupersetOf(otherSet) {
    if (this.size < otherSet.size) {
      return false;
    }
    return otherSet.values().every(value => this.has(value));
  }

  toString() {
    return this.values().join(', ');
  }
}

module.exports = MySet;
