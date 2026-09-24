import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Comparator = require('../comparator.js') as new (
  compareFn?: (a: any, b: any) => number
) => {
  equal(a: any, b: any): boolean;
  lessThan(a: any, b: any): boolean;
  greaterThan(a: any, b: any): boolean;
};

describe('Comparator (comparator.js)', () => {
  test('uses the default compare function when none is provided', () => {
    const comparator = new Comparator();
    expect(comparator.equal(1, 1)).toBe(true);
    expect(comparator.lessThan(1, 2)).toBe(true);
    expect(comparator.greaterThan(2, 1)).toBe(true);
  });

  test('equal returns false for different values', () => {
    const comparator = new Comparator();
    expect(comparator.equal(1, 2)).toBe(false);
  });

  test('lessThan returns false when the first value is not smaller', () => {
    const comparator = new Comparator();
    expect(comparator.lessThan(2, 1)).toBe(false);
    expect(comparator.lessThan(1, 1)).toBe(false);
  });

  test('greaterThan returns false when the first value is not bigger', () => {
    const comparator = new Comparator();
    expect(comparator.greaterThan(1, 2)).toBe(false);
    expect(comparator.greaterThan(1, 1)).toBe(false);
  });

  test('supports a custom compare function', () => {
    const comparator = new Comparator((a: number, b: number) => b - a); // reversed order
    expect(comparator.lessThan(2, 1)).toBe(true);
    expect(comparator.greaterThan(1, 2)).toBe(true);
    expect(comparator.equal(1, 1)).toBe(true);
  });
});
