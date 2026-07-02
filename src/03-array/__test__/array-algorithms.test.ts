import { describe, expect, test } from '@jest/globals';
import { chunkArray, chunkArraySplice, chunkArrayReduce } from '../11-array-chunking';
import { flattenSimple, flattenDeep, flattenRecursive, flattenReduce, flattenIterative } from '../12-flatten-arrays';
import {
  removeDuplicatesSet,
  removeDuplicatesFilter,
  removeDuplicatesReduce,
  removeDuplicatesMap,
  removeDuplicatesLoop,
  removeDuplicatesByProperty,
} from '../13-remove-duplicates';
import {
  rotateRight,
  rotateLeft,
  rotateRightSpread,
  rotateRightInPlace,
  rotateRightSimple,
} from '../14-array-rotation';

// ─── chunkArray ───────────────────────────────────────────────────────────────

describe('chunkArray', () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  test('splits into chunks of 3', () => {
    expect(chunkArray(nums, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
  });

  test('splits into chunks of 4', () => {
    expect(chunkArray(nums, 4)).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10]]);
  });

  test('chunk size larger than array', () => {
    expect(chunkArray([1, 2, 3], 10)).toEqual([[1, 2, 3]]);
  });

  test('empty array returns []', () => {
    expect(chunkArray([], 3)).toEqual([]);
  });

  test('chunk size 1 wraps each element', () => {
    expect(chunkArray([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  test('throws on chunk size <= 0', () => {
    expect(() => chunkArray([1, 2], 0)).toThrow();
    expect(() => chunkArray([1, 2], -1)).toThrow();
  });

  test('all three implementations produce identical results', () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const size = 3;
    const expected = chunkArray(input, size);
    expect(chunkArraySplice(input, size)).toEqual(expected);
    expect(chunkArrayReduce(input, size)).toEqual(expected);
  });
});

// ─── flatten ──────────────────────────────────────────────────────────────────

describe('flatten arrays', () => {
  const nested = [1, [2, 3], [4, [5, 6]], [[[7]]], 8];

  test('flattenSimple depth 1 flattens one level', () => {
    expect(flattenSimple([1, [2, [3]]], 1)).toEqual([1, 2, [3]]);
  });

  test('flattenSimple depth 2 flattens two levels', () => {
    expect(flattenSimple([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });

  test('flattenDeep produces fully flattened result', () => {
    expect(flattenDeep<number>(nested)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  test('flattenRecursive, flattenReduce, flattenIterative match flattenDeep', () => {
    const expected = flattenDeep<number>(nested);
    expect(flattenRecursive<number>(nested)).toEqual(expected);
    expect(flattenReduce<number>(nested)).toEqual(expected);
    expect(flattenIterative<number>(nested)).toEqual(expected);
  });

  test('empty array returns []', () => {
    expect(flattenDeep([])).toEqual([]);
    expect(flattenRecursive([])).toEqual([]);
    expect(flattenReduce([])).toEqual([]);
    expect(flattenIterative([])).toEqual([]);
  });

  test('already flat array is unchanged', () => {
    expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3]);
    expect(flattenRecursive([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

// ─── removeDuplicates ─────────────────────────────────────────────────────────

describe('removeDuplicates', () => {
  const withDups = [1, 2, 3, 2, 4, 3];
  const expected = [1, 2, 3, 4];

  test('removes numeric duplicates', () => {
    expect(removeDuplicatesSet(withDups)).toEqual(expected);
  });

  test('removes string duplicates', () => {
    const strs = ['a', 'b', 'a', 'c', 'b'];
    expect(removeDuplicatesSet(strs)).toEqual(['a', 'b', 'c']);
  });

  test('all five primitive implementations return the same result', () => {
    expect(removeDuplicatesFilter(withDups)).toEqual(expected);
    expect(removeDuplicatesReduce(withDups)).toEqual(expected);
    expect(removeDuplicatesMap(withDups)).toEqual(expected);
    expect(removeDuplicatesLoop(withDups)).toEqual(expected);
  });

  test('empty array returns []', () => {
    expect(removeDuplicatesSet([])).toEqual([]);
  });

  test('array with no duplicates is unchanged', () => {
    expect(removeDuplicatesSet([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('removeDuplicatesByProperty removes by key', () => {
    const items = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice2' },
    ];
    const result = removeDuplicatesByProperty(items, 'id');
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: 1, name: 'Alice' });
    expect(result[1]).toEqual({ id: 2, name: 'Bob' });
  });
});

// ─── rotateRight / rotateLeft ─────────────────────────────────────────────────

describe('array rotation', () => {
  const arr = [1, 2, 3, 4, 5];

  test('rotateRight by 1', () => {
    expect(rotateRight(arr, 1)).toEqual([5, 1, 2, 3, 4]);
  });

  test('rotateLeft by 1', () => {
    expect(rotateLeft(arr, 1)).toEqual([2, 3, 4, 5, 1]);
  });

  test('rotateRight by 0 returns same array', () => {
    expect(rotateRight(arr, 0)).toEqual(arr);
  });

  test('rotateRight by array length returns same array', () => {
    expect(rotateRight(arr, arr.length)).toEqual(arr);
  });

  test('rotateRight by more than length (k % n behavior)', () => {
    // 7 % 5 = 2
    expect(rotateRight(arr, 7)).toEqual(rotateRight(arr, 2));
  });

  test('empty array returns []', () => {
    expect(rotateRight([], 3)).toEqual([]);
    expect(rotateLeft([], 3)).toEqual([]);
  });

  test('rotateLeft by 2', () => {
    expect(rotateLeft(arr, 2)).toEqual([3, 4, 5, 1, 2]);
  });

  test('all rotateRight implementations produce the same result', () => {
    const k = 3;
    const expected = rotateRight(arr, k);
    expect(rotateRightSpread(arr, k)).toEqual(expected);
    expect(rotateRightInPlace(arr, k)).toEqual(expected);
    expect(rotateRightSimple(arr, k)).toEqual(expected);
  });
});
