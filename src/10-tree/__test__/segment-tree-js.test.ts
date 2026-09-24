import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const SegmentTree = require('../segment-tree.js') as new (
  inputArray: number[],
  operationFallback: (a: number, b: number) => number
) => {
  query(leftIndex: number, rightIndex: number): number;
  update(index: number, value: number): void;
  toString(): string;
};

describe('SegmentTree (segment-tree.js)', () => {
  // Regression test: segment-tree.js was missing `module.exports`, so this
  // class could never be require()'d/instantiated at all.
  test('can be constructed via require()', () => {
    expect(() => new SegmentTree([1, 2, 3], (a, b) => a + b)).not.toThrow();
  });

  describe('sum segment tree', () => {
    let tree: InstanceType<typeof SegmentTree>;
    const input = [1, 3, 5, 7, 9, 11];

    beforeEach(() => {
      tree = new SegmentTree([...input], (a, b) => a + b);
    });

    test('query over the full range returns the total sum', () => {
      expect(tree.query(0, input.length - 1)).toBe(input.reduce((a, b) => a + b, 0));
    });

    test('query over a sub-range returns the correct partial sum', () => {
      expect(tree.query(1, 3)).toBe(3 + 5 + 7);
      expect(tree.query(0, 0)).toBe(1);
      expect(tree.query(2, 2)).toBe(5);
    });

    test('query outside the array bounds returns 0 (no overlap)', () => {
      expect(tree.query(10, 20)).toBe(0);
    });

    test('update changes a single element and recomputes affected ranges', () => {
      tree.update(2, 100);
      expect(tree.query(2, 2)).toBe(100);
      expect(tree.query(0, input.length - 1)).toBe(1 + 3 + 100 + 7 + 9 + 11);
    });

    test('update at the first and last index works correctly', () => {
      tree.update(0, 50);
      tree.update(input.length - 1, 60);
      expect(tree.query(0, 0)).toBe(50);
      expect(tree.query(input.length - 1, input.length - 1)).toBe(60);
    });

    test('toString returns a string representation of the internal tree', () => {
      expect(typeof tree.toString()).toBe('string');
      expect(tree.toString().length).toBeGreaterThan(0);
    });
  });

  describe('min segment tree', () => {
    let tree: InstanceType<typeof SegmentTree>;
    const input = [5, 2, 8, 1, 9, 3];

    beforeEach(() => {
      tree = new SegmentTree([...input], (a, b) => Math.min(a, b));
    });

    test('query over the full range returns the minimum', () => {
      expect(tree.query(0, input.length - 1)).toBe(1);
    });

    // Known limitation (shared identically with segment-tree.ts): #query's
    // "no overlap" base case always returns 0, which is only a correct
    // identity value for a `sum` operationFallback. For `min` (as documented
    // as a supported use case in the .ts JSDoc), any partial-range query that
    // does not fully cover the array combines with that spurious 0 and
    // incorrectly returns 0 whenever all real values are positive. This test
    // pins the actual (buggy) current behavior rather than asserting the
    // mathematically correct minimum, since fixing it would require an API
    // change (e.g. an identity-value constructor parameter) beyond the scope
    // of a minimal, behavior-preserving fix, and the same flaw exists in the
    // .ts sibling.
    test('query over a partial sub-range incorrectly returns 0 (documented limitation)', () => {
      expect(tree.query(0, 2)).toBe(0);
      expect(tree.query(3, 5)).toBe(0);
    });

    test('update changes a single element (full-range query reflects it)', () => {
      tree.update(3, 100);
      expect(tree.query(0, input.length - 1)).toBe(2);
    });
  });


  describe('single-element array', () => {
    test('query and update work on a single-element segment tree', () => {
      const tree = new SegmentTree([42], (a, b) => a + b);
      expect(tree.query(0, 0)).toBe(42);
      tree.update(0, 7);
      expect(tree.query(0, 0)).toBe(7);
    });
  });
});
