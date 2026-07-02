import { describe, expect, test } from '@jest/globals';
import {
  secondsInDays,
  calculateTotalExpenses,
  calculateExpensesMatrix,
  multiplicationTable,
} from '../01-big-o-intro';
import {
  oddOrEven,
  calculateAverage,
  hasCommonElements,
  getOddNumbers,
} from '../03-exercises';

// ─── 01-big-o-intro ───────────────────────────────────────────────────────────

describe('secondsInDays', () => {
  test('1 day = 86400 seconds', () => {
    expect(secondsInDays(1)).toBe(86400);
  });

  test('10 days = 864000 seconds', () => {
    expect(secondsInDays(10)).toBe(864000);
  });

  test('throws on non-positive input', () => {
    expect(() => secondsInDays(0)).toThrow();
    expect(() => secondsInDays(-1)).toThrow();
  });

  test('throws on non-integer input', () => {
    expect(() => secondsInDays(1.5)).toThrow();
  });
});

describe('calculateTotalExpenses', () => {
  test('sums a simple list', () => {
    expect(calculateTotalExpenses([100, 200, 300])).toBe(600);
  });

  test('empty array returns 0', () => {
    expect(calculateTotalExpenses([])).toBe(0);
  });

  test('single element', () => {
    expect(calculateTotalExpenses([42])).toBe(42);
  });
});

describe('calculateExpensesMatrix', () => {
  test('sums a 2D array', () => {
    expect(calculateExpensesMatrix([[100, 200], [300]])).toBe(600);
  });

  test('sums a larger 2D array', () => {
    const matrix = [
      [100, 105, 100, 115, 120, 135],
      [180, 185, 185, 185, 200, 210],
      [30, 30, 30, 30, 30, 30],
      [2000, 2000, 2000, 2000, 2000, 2000],
      [600, 620, 610, 600, 620, 600],
      [150, 100, 130, 200, 150, 100],
    ];
    expect(calculateExpensesMatrix(matrix)).toBe(18480);
  });
});

describe('multiplicationTable', () => {
  test('does not throw for valid inputs', () => {
    expect(() => multiplicationTable(3, 3)).not.toThrow();
  });
});

// ─── 03-exercises ─────────────────────────────────────────────────────────────

describe('oddOrEven', () => {
  test('returns "odd" for array with odd length', () => {
    expect(oddOrEven([1, 2, 3, 4, 5])).toBe('odd');
  });

  test('returns "even" for array with even length', () => {
    expect(oddOrEven([1, 2, 3, 4, 5, 6])).toBe('even');
  });

  test('empty array (length 0) is even', () => {
    expect(oddOrEven([])).toBe('even');
  });
});

describe('calculateAverage', () => {
  test('calculates average of [1,2,3,4,5] = 3', () => {
    expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
  });

  test('calculates average of [1,2,3,4,5,6] = 3.5', () => {
    expect(calculateAverage([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test('single element returns that element', () => {
    expect(calculateAverage([7])).toBe(7);
  });
});

describe('hasCommonElements', () => {
  test('returns false for disjoint arrays', () => {
    expect(hasCommonElements([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])).toBe(false);
  });

  test('returns true when a common element exists', () => {
    expect(hasCommonElements([1, 2, 3, 4, 5], [5, 6, 7, 8, 9])).toBe(true);
  });

  test('returns true for identical arrays', () => {
    expect(hasCommonElements([1, 2], [1, 2])).toBe(true);
  });
});

describe('getOddNumbers', () => {
  test('filters odd numbers from [1..5]', () => {
    expect(getOddNumbers([1, 2, 3, 4, 5])).toEqual([1, 3, 5]);
  });

  test('empty array returns []', () => {
    expect(getOddNumbers([])).toEqual([]);
  });

  test('all even numbers returns []', () => {
    expect(getOddNumbers([2, 4, 6])).toEqual([]);
  });

  test('all odd numbers returns the whole array', () => {
    expect(getOddNumbers([1, 3, 5])).toEqual([1, 3, 5]);
  });
});
