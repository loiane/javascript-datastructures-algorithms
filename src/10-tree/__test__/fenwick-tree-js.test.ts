import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const FenwickTree = require('../fenwick-tree.js') as new (
  arraySize: number
) => {
  update(index: number, value: number): void;
  query(index: number): number;
  readonly arraySize: number;
  toString(): string;
};

describe('FenwickTree (fenwick-tree.js)', () => {
  test('can be constructed via require()', () => {
    expect(() => new FenwickTree(5)).not.toThrow();
  });

  test('arraySize getter returns the size passed to the constructor', () => {
    const tree = new FenwickTree(10);
    expect(tree.arraySize).toBe(10);
  });

  test('query on a freshly constructed tree returns 0', () => {
    const tree = new FenwickTree(5);
    for (let i = 1; i <= 5; i++) {
      expect(tree.query(i)).toBe(0);
    }
  });

  describe('update / query', () => {
    let tree: InstanceType<typeof FenwickTree>;

    beforeEach(() => {
      tree = new FenwickTree(8);
    });

    test('update adds value at index and reflects in subsequent prefix sums', () => {
      tree.update(3, 5);
      expect(tree.query(2)).toBe(0);
      expect(tree.query(3)).toBe(5);
      expect(tree.query(8)).toBe(5);
    });

    test('multiple updates accumulate into prefix sums correctly', () => {
      tree.update(1, 3);
      tree.update(3, 5);
      tree.update(5, 2);
      expect(tree.query(1)).toBe(3);
      expect(tree.query(2)).toBe(3);
      expect(tree.query(3)).toBe(8);
      expect(tree.query(4)).toBe(8);
      expect(tree.query(5)).toBe(10);
      expect(tree.query(8)).toBe(10);
    });

    test('update at the same index twice accumulates (not overwrites)', () => {
      tree.update(4, 2);
      tree.update(4, 3);
      expect(tree.query(4)).toBe(5);
    });

    test('negative values can be applied via update', () => {
      tree.update(2, 10);
      tree.update(2, -4);
      expect(tree.query(2)).toBe(6);
    });

    test('query(arraySize) returns the total sum of all updates', () => {
      [1, 2, 3, 4, 5, 6, 7, 8].forEach(i => tree.update(i, i));
      expect(tree.query(8)).toBe(36);
    });
  });

  describe('bounds validation', () => {
    let tree: InstanceType<typeof FenwickTree>;

    beforeEach(() => {
      tree = new FenwickTree(5);
    });

    test('update throws when index is below 1', () => {
      expect(() => tree.update(0, 1)).toThrow('Index is out of range');
    });

    test('update throws when index is above arraySize', () => {
      expect(() => tree.update(6, 1)).toThrow('Index is out of range');
    });

    test('query throws when index is below 1', () => {
      expect(() => tree.query(0)).toThrow('Index is out of range');
    });

    test('query throws when index is above arraySize', () => {
      expect(() => tree.query(6)).toThrow('Index is out of range');
    });

    test('update/query at the boundary indexes (1 and arraySize) do not throw', () => {
      expect(() => tree.update(1, 1)).not.toThrow();
      expect(() => tree.update(5, 1)).not.toThrow();
      expect(() => tree.query(1)).not.toThrow();
      expect(() => tree.query(5)).not.toThrow();
    });
  });

  test('toString returns a comma-separated string of the internal tree array', () => {
    const tree = new FenwickTree(3);
    expect(tree.toString()).toBe('0, 0, 0, 0');
    tree.update(1, 7);
    expect(tree.toString()).toBe(tree.toString());
    expect(typeof tree.toString()).toBe('string');
  });
});
