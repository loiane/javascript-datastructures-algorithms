export default class Set {
  constructor() {
    this.items = {};
  }
  add(value) {
    if (!this.has(value)) {
      this.items[value] = value;
      return true;
    }
    return false;
  }
  delete(value) {
    if (this.has(value)) {
      delete this.items[value];
      return true;
    }
    return false;
  }
  has(value) {
    return Object.prototype.hasOwnProperty.call(this.items, value);
  }
  values() {
    return Object.values(this.items);
  }
  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }
  intersection(otherSet) {
    const intersectionSet = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    let biggerSet = values;
    let smallerSet = otherValues;
    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues;
      smallerSet = values;
    }
    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }
    let isSubset = true;
    this.values().every(value => {
      if (!otherSet.has(value)) {
        isSubset = false;
        return false;
      }
      return true;
    });
    return isSubset;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return Object.keys(this.items).length;
  }
  clear() {
    this.items = {};
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const values = this.values();
    let objString = `${values[0]}`;
    for (let i = 1; i < values.length; i++) {
      objString = `${objString},${values[i].toString()}`;
    }
    return objString;
  }
}
