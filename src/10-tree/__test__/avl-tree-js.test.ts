import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const AVLTree = require('../avl-tree.js') as new (
  compareFn?: (a: any, b: any) => number
) => {
  insert(data: any): void;
  search(data: any): boolean;
  remove(data: any): void;
  min(): any;
  max(): any;
  readonly root: { data: any; left: any; right: any; height: number } | null;
  inOrderTraverse(callback: (data: any) => void): void;
  preOrderTraverse(callback: (data: any) => void): void;
  postOrderTraverse(callback: (data: any) => void): void;
};

function height(node: { left: any; right: any; height: number } | null): number {
  return node ? node.height : 0;
}

function isBalanced(node: { left: any; right: any } | null): boolean {
  if (!node) return true;
  const diff = height(node.left) - height(node.right);
  return Math.abs(diff) <= 1 && isBalanced(node.left) && isBalanced(node.right);
}

describe('AVLTree (avl-tree.js)', () => {
  let avl: InstanceType<typeof AVLTree>;

  beforeEach(() => {
    avl = new AVLTree();
  });

  test('starts empty: root null, min/max null, search false', () => {
    expect(avl.root).toBeNull();
    expect(avl.min()).toBeNull();
    expect(avl.max()).toBeNull();
    expect(avl.search(1)).toBe(false);
  });

  test('insert sets the root', () => {
    avl.insert(5);
    expect(avl.root?.data).toBe(5);
  });

  test('search finds inserted values and reports missing ones as false', () => {
    [10, 20, 30, 40, 50, 25].forEach(v => avl.insert(v));
    expect(avl.search(25)).toBe(true);
    expect(avl.search(10)).toBe(true);
    expect(avl.search(999)).toBe(false);
  });

  test('min/max return smallest/largest inserted values', () => {
    [10, 20, 30, 40, 50, 25].forEach(v => avl.insert(v));
    expect(avl.min()).toBe(10);
    expect(avl.max()).toBe(50);
  });

  test('inOrderTraverse returns sorted values after inserts/rotations', () => {
    [10, 20, 30, 40, 50, 25].forEach(v => avl.insert(v));
    const result: number[] = [];
    avl.inOrderTraverse(v => result.push(v));
    expect(result).toEqual([10, 20, 25, 30, 40, 50]);
  });

  test('preOrderTraverse and postOrderTraverse do not throw and visit all nodes', () => {
    [10, 20, 30, 40, 50, 25].forEach(v => avl.insert(v));
    const pre: number[] = [];
    const post: number[] = [];
    avl.preOrderTraverse(v => pre.push(v));
    avl.postOrderTraverse(v => post.push(v));
    expect(pre.sort((a, b) => a - b)).toEqual([10, 20, 25, 30, 40, 50]);
    expect(post.sort((a, b) => a - b)).toEqual([10, 20, 25, 30, 40, 50]);
  });

  test('remains balanced after ascending inserts (left-left case -> right rotation)', () => {
    [1, 2, 3, 4, 5, 6, 7].forEach(v => avl.insert(v));
    expect(isBalanced(avl.root)).toBe(true);
    expect(avl.root?.data).toBe(4);
  });

  test('remains balanced after descending inserts (right-right case -> left rotation)', () => {
    [7, 6, 5, 4, 3, 2, 1].forEach(v => avl.insert(v));
    expect(isBalanced(avl.root)).toBe(true);
    expect(avl.root?.data).toBe(4);
  });

  test('left-right rotation case keeps tree balanced', () => {
    [30, 10, 20].forEach(v => avl.insert(v));
    expect(isBalanced(avl.root)).toBe(true);
    expect(avl.root?.data).toBe(20);
  });

  test('right-left rotation case keeps tree balanced', () => {
    [10, 30, 20].forEach(v => avl.insert(v));
    expect(isBalanced(avl.root)).toBe(true);
    expect(avl.root?.data).toBe(20);
  });

  test('inserting many values keeps the tree balanced and searchable', () => {
    const values = Array.from({ length: 50 }, (_, i) => i + 1);
    values.forEach(v => avl.insert(v));
    expect(isBalanced(avl.root)).toBe(true);
    values.forEach(v => expect(avl.search(v)).toBe(true));
    expect(avl.search(0)).toBe(false);
    expect(avl.search(51)).toBe(false);
  });

  test('remove from empty tree does not throw', () => {
    expect(() => avl.remove(1)).not.toThrow();
    expect(avl.root).toBeNull();
  });

  test('remove the only node empties the tree', () => {
    avl.insert(5);
    avl.remove(5);
    expect(avl.root).toBeNull();
    expect(avl.search(5)).toBe(false);
  });

  test('remove a leaf node keeps remaining values searchable', () => {
    [10, 20, 5, 15, 30].forEach(v => avl.insert(v));
    avl.remove(15);
    expect(avl.search(15)).toBe(false);
    expect(avl.search(10)).toBe(true);
    expect(avl.search(20)).toBe(true);
    expect(avl.search(5)).toBe(true);
    expect(avl.search(30)).toBe(true);
  });

  test('remove a node with two children replaces with in-order successor', () => {
    [10, 20, 30, 40, 50, 25].forEach(v => avl.insert(v));
    avl.remove(30);
    expect(avl.search(30)).toBe(false);
    const result: number[] = [];
    avl.inOrderTraverse(v => result.push(v));
    expect(result).toEqual([10, 20, 25, 40, 50]);
    expect(isBalanced(avl.root)).toBe(true);
  });

  test('removing all values one by one empties the tree and stays balanced', () => {
    const values = [10, 20, 30, 40, 50, 25, 5, 1, 15, 35];
    values.forEach(v => avl.insert(v));
    values.forEach(v => {
      avl.remove(v);
      expect(avl.search(v)).toBe(false);
      expect(isBalanced(avl.root)).toBe(true);
    });
    expect(avl.root).toBeNull();
  });

  test('removing a non-existent value does not throw and keeps tree intact', () => {
    [10, 20, 30].forEach(v => avl.insert(v));
    expect(() => avl.remove(999)).not.toThrow();
    expect(avl.search(10)).toBe(true);
    expect(avl.search(20)).toBe(true);
    expect(avl.search(30)).toBe(true);
  });

  test('works with a custom comparator (strings)', () => {
    const strAvl = new AVLTree(
      (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)
    );
    ['banana', 'apple', 'cherry', 'date'].forEach(v => strAvl.insert(v));
    expect(strAvl.search('apple')).toBe(true);
    expect(strAvl.min()).toBe('apple');
    expect(strAvl.max()).toBe('date');
  });
});
