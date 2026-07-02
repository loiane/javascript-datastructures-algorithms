import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const HeapSort = require('../heap-sort') as (array: number[], compareFn?: (a: number, b: number) => number) => void;

describe('HeapSort', () => {
  test('sorts [5,3,1,4,2] in ascending order', () => {
    const arr = [5, 3, 1, 4, 2];
    HeapSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  test('empty array does not throw and stays empty', () => {
    const arr: number[] = [];
    expect(() => HeapSort(arr)).not.toThrow();
    expect(arr).toEqual([]);
  });

  test('single-element array stays unchanged', () => {
    const arr = [1];
    HeapSort(arr);
    expect(arr).toEqual([1]);
  });

  test('two-element array [2,1] becomes [1,2]', () => {
    const arr = [2, 1];
    HeapSort(arr);
    expect(arr).toEqual([1, 2]);
  });

  test('already sorted array stays sorted', () => {
    const arr = [1, 2, 3];
    HeapSort(arr);
    expect(arr).toEqual([1, 2, 3]);
  });

  test('reverse sorted array [5,4,3,2,1] becomes [1,2,3,4,5]', () => {
    const arr = [5, 4, 3, 2, 1];
    HeapSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  test('custom comparator sorts descending', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    // Reverse comparator: to sort descending, swap a and b
    HeapSort(arr, (a: number, b: number) => (b < a ? -1 : b > a ? 1 : 0));
    expect(arr).toEqual([9, 6, 5, 4, 3, 2, 1, 1]);
  });

  test('array with duplicates is sorted correctly', () => {
    const arr = [3, 1, 2, 1, 3];
    HeapSort(arr);
    expect(arr).toEqual([1, 1, 2, 3, 3]);
  });
});
