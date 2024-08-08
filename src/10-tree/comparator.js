// src/10-tree/comparator.js

const Compare = require('./compare');

class Comparator {
  #compareFn;

  constructor(compareFn = Comparator.defaultCompareFn) {
    this.#compareFn = compareFn;
  }

  static defaultCompareFn(a, b) {
    if (a === b) {
      return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }

  equal(a, b) {
    return this.#compareFn(a, b) === Compare.EQUALS;
  }

  lessThan(a, b) {
    return this.#compareFn(a, b) < Compare.EQUALS;
  }

  greaterThan(a, b) {
    return this.#compareFn(a, b) > Compare.EQUALS;
  }

} 

module.exports = Comparator;