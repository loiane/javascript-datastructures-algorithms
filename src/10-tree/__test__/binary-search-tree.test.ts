import { describe, expect, test, beforeEach } from '@jest/globals';
import BinarySearchTree from '../binary-search-tree';
import AVLTree from '../avl-tree';
import RedBlackTree from '../red-black-tree';

// ─── BinarySearchTree ─────────────────────────────────────────────────────────

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  // ─── insert / search ──────────────────────────────────────────────────────

  test('search returns true for inserted value', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    expect(bst.search(5)).toBe(true);
    expect(bst.search(3)).toBe(true);
    expect(bst.search(7)).toBe(true);
  });

  test('search returns false for missing value', () => {
    bst.insert(5);
    expect(bst.search(99)).toBe(false);
  });

  // ─── min / max ────────────────────────────────────────────────────────────

  test('min returns the smallest value', () => {
    [5, 3, 7, 1, 4].forEach(v => bst.insert(v));
    expect(bst.min()).toBe(1);
  });

  test('max returns the largest value', () => {
    [5, 3, 7, 1, 4].forEach(v => bst.insert(v));
    expect(bst.max()).toBe(7);
  });

  test('min/max on empty tree return null', () => {
    expect(bst.min()).toBeNull();
    expect(bst.max()).toBeNull();
  });

  // ─── remove ───────────────────────────────────────────────────────────────

  test('remove a leaf node', () => {
    [5, 3, 7].forEach(v => bst.insert(v));
    bst.remove(3);
    expect(bst.search(3)).toBe(false);
    expect(bst.search(5)).toBe(true);
  });

  test('remove a node with one child', () => {
    [5, 3, 7, 6].forEach(v => bst.insert(v));
    bst.remove(7);
    expect(bst.search(7)).toBe(false);
    expect(bst.search(6)).toBe(true);
  });

  test('remove a node with two children', () => {
    [5, 3, 7, 1, 4, 6, 8].forEach(v => bst.insert(v));
    bst.remove(3);
    expect(bst.search(3)).toBe(false);
    expect(bst.search(1)).toBe(true);
    expect(bst.search(4)).toBe(true);
  });

  // ─── traversals ───────────────────────────────────────────────────────────

  test('inOrderTraverse visits nodes in sorted order', () => {
    [5, 3, 7, 1, 4, 6, 8].forEach(v => bst.insert(v));
    const result: number[] = [];
    bst.inOrderTraverse(v => result.push(v));
    expect(result).toEqual([1, 3, 4, 5, 6, 7, 8]);
  });

  test('preOrderTraverse visits root first', () => {
    [5, 3, 7].forEach(v => bst.insert(v));
    const result: number[] = [];
    bst.preOrderTraverse(v => result.push(v));
    expect(result[0]).toBe(5);
    expect(result).toContain(3);
    expect(result).toContain(7);
  });

  test('postOrderTraverse visits root last', () => {
    [5, 3, 7].forEach(v => bst.insert(v));
    const result: number[] = [];
    bst.postOrderTraverse(v => result.push(v));
    expect(result[result.length - 1]).toBe(5);
  });

  // ─── custom comparator ────────────────────────────────────────────────────

  test('works with string comparator', () => {
    const strBst = new BinarySearchTree<string>(
      (a, b) => (a < b ? -1 : a > b ? 1 : 0)
    );
    ['banana', 'apple', 'cherry'].forEach(v => strBst.insert(v));
    expect(strBst.search('apple')).toBe(true);
    expect(strBst.min()).toBe('apple');
    expect(strBst.max()).toBe('cherry');
  });
});

// ─── AVLTree ──────────────────────────────────────────────────────────────────

describe('AVLTree', () => {
  let avl: AVLTree<number>;

  beforeEach(() => {
    avl = new AVLTree<number>();
  });

  test('insert multiple values does not throw', () => {
    // Insert in a worst-case order that would create an unbalanced BST
    expect(() => {
      [1, 2, 3, 4, 5, 6, 7].forEach(v => avl.insert(v));
    }).not.toThrow();
  });

  test('insert and remove do not throw', () => {
    [10, 20, 5, 15, 30].forEach(v => avl.insert(v));
    expect(() => avl.remove(10)).not.toThrow();
    expect(() => avl.remove(20)).not.toThrow();
  });

  test('remove from empty tree does not throw', () => {
    expect(() => avl.remove(42)).not.toThrow();
  });

  test('insert in reverse order (triggers left-left rotation) does not throw', () => {
    expect(() => {
      [7, 6, 5, 4, 3, 2, 1].forEach(v => avl.insert(v));
    }).not.toThrow();
  });
});

// ─── RedBlackTree ─────────────────────────────────────────────────────────────

describe('RedBlackTree', () => {
  let rbt: RedBlackTree<number>;

  beforeEach(() => {
    rbt = new RedBlackTree<number>();
  });

  test('insert multiple values does not throw', () => {
    expect(() => {
      [10, 20, 30, 15, 25, 5, 1].forEach(v => rbt.insert(v));
    }).not.toThrow();
  });

  test('remove does not throw', () => {
    [10, 20, 30].forEach(v => rbt.insert(v));
    expect(() => rbt.remove(20)).not.toThrow();
  });

  test('print() does not throw after insertions', () => {
    [10, 20, 5, 15].forEach(v => rbt.insert(v));
    expect(() => rbt.print()).not.toThrow();
  });

  test('insert into empty tree and print', () => {
    rbt.insert(42);
    expect(() => rbt.print()).not.toThrow();
  });
});
