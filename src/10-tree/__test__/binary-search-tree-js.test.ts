import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const BinarySearchTree = require('../binary-search-tree.js') as new (
  compareFn?: (a: any, b: any) => number
) => {
  insert(data: any): void;
  search(data: any): boolean;
  remove(data: any): void;
  min(): any;
  max(): any;
  readonly root: { data: any; left: any; right: any } | null;
  inOrderTraverse(callback: (data: any) => void): void;
  preOrderTraverse(callback: (data: any) => void): void;
  postOrderTraverse(callback: (data: any) => void): void;
};

describe('BinarySearchTree (binary-search-tree.js)', () => {
  let bst: InstanceType<typeof BinarySearchTree>;

  beforeEach(() => {
    bst = new BinarySearchTree();
  });

  test('starts empty: root null, min/max null, search false', () => {
    expect(bst.root).toBeNull();
    expect(bst.min()).toBeNull();
    expect(bst.max()).toBeNull();
    expect(bst.search(1)).toBe(false);
  });

  test('insert sets the root on first insert', () => {
    bst.insert(5);
    expect(bst.root?.data).toBe(5);
  });

  test('search returns true for inserted values, false otherwise', () => {
    [5, 3, 7].forEach(v => bst.insert(v));
    expect(bst.search(5)).toBe(true);
    expect(bst.search(3)).toBe(true);
    expect(bst.search(7)).toBe(true);
    expect(bst.search(99)).toBe(false);
  });

  test('min and max return smallest/largest inserted values', () => {
    [5, 3, 7, 1, 4, 8].forEach(v => bst.insert(v));
    expect(bst.min()).toBe(1);
    expect(bst.max()).toBe(8);
  });

  test('duplicate values are inserted to the right subtree', () => {
    bst.insert(5);
    bst.insert(5);
    const result: number[] = [];
    bst.inOrderTraverse(v => result.push(v));
    expect(result).toEqual([5, 5]);
  });

  test('single-node tree: remove root (leaf) empties the tree', () => {
    bst.insert(5);
    bst.remove(5);
    expect(bst.root).toBeNull();
    expect(bst.search(5)).toBe(false);
  });

  test('remove a leaf node', () => {
    [5, 3, 7].forEach(v => bst.insert(v));
    bst.remove(3);
    expect(bst.search(3)).toBe(false);
    expect(bst.search(5)).toBe(true);
    expect(bst.search(7)).toBe(true);
  });

  test('remove a node with only a left child', () => {
    [5, 3, 7, 6].forEach(v => bst.insert(v));
    bst.remove(7);
    expect(bst.search(7)).toBe(false);
    expect(bst.search(6)).toBe(true);
  });

  test('remove a node with only a right child', () => {
    [5, 3, 7, 8].forEach(v => bst.insert(v));
    bst.remove(7);
    expect(bst.search(7)).toBe(false);
    expect(bst.search(8)).toBe(true);
  });

  test('remove a node with two children replaces with in-order successor', () => {
    [5, 3, 7, 1, 4, 6, 8].forEach(v => bst.insert(v));
    bst.remove(3);
    expect(bst.search(3)).toBe(false);
    expect(bst.search(1)).toBe(true);
    expect(bst.search(4)).toBe(true);
    const result: number[] = [];
    bst.inOrderTraverse(v => result.push(v));
    expect(result).toEqual([1, 4, 5, 6, 7, 8]);
  });

  test('remove the root with two children', () => {
    [5, 3, 7, 1, 4, 6, 8].forEach(v => bst.insert(v));
    bst.remove(5);
    expect(bst.search(5)).toBe(false);
    const result: number[] = [];
    bst.inOrderTraverse(v => result.push(v));
    expect(result).toEqual([1, 3, 4, 6, 7, 8]);
  });

  test('removing a non-existent value does not throw and keeps tree intact', () => {
    [5, 3, 7].forEach(v => bst.insert(v));
    expect(() => bst.remove(999)).not.toThrow();
    expect(bst.search(5)).toBe(true);
    expect(bst.search(3)).toBe(true);
    expect(bst.search(7)).toBe(true);
  });

  test('remove on empty tree does not throw', () => {
    expect(() => bst.remove(1)).not.toThrow();
    expect(bst.root).toBeNull();
  });

  test('inOrderTraverse visits nodes in sorted order', () => {
    [5, 3, 7, 1, 4, 6, 8].forEach(v => bst.insert(v));
    const result: number[] = [];
    bst.inOrderTraverse(v => result.push(v));
    expect(result).toEqual([1, 3, 4, 5, 6, 7, 8]);
  });

  test('preOrderTraverse visits root first, then left, then right', () => {
    [5, 3, 7].forEach(v => bst.insert(v));
    const result: number[] = [];
    bst.preOrderTraverse(v => result.push(v));
    expect(result).toEqual([5, 3, 7]);
  });

  test('postOrderTraverse visits root last', () => {
    [5, 3, 7].forEach(v => bst.insert(v));
    const result: number[] = [];
    bst.postOrderTraverse(v => result.push(v));
    expect(result).toEqual([3, 7, 5]);
  });

  test('traversals on an empty tree do not invoke the callback', () => {
    const calls: number[] = [];
    bst.inOrderTraverse(v => calls.push(v));
    bst.preOrderTraverse(v => calls.push(v));
    bst.postOrderTraverse(v => calls.push(v));
    expect(calls).toEqual([]);
  });

  test('works with a custom comparator (strings)', () => {
    const strBst = new BinarySearchTree(
      (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)
    );
    ['banana', 'apple', 'cherry'].forEach(v => strBst.insert(v));
    expect(strBst.search('apple')).toBe(true);
    expect(strBst.min()).toBe('apple');
    expect(strBst.max()).toBe('cherry');
  });
});
