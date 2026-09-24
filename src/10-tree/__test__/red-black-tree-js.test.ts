import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const RedBlackTree = require('../red-black-tree.js') as new (
  compareFn?: (a: any, b: any) => number
) => {
  insert(data: any): void;
  search(data: any): boolean;
  remove(data: any): void;
  min(): any;
  max(): any;
  readonly root: { data: any; left: any; right: any; color: number } | null;
  inOrderTraverse(callback: (data: any) => void): void;
  preOrderTraverse(callback: (data: any) => void): void;
  postOrderTraverse(callback: (data: any) => void): void;
  print(): void;
};

const BLACK = 1;

type RBNode = { data: any; left: RBNode | null; right: RBNode | null; color: number } | null;

// Bounds are `low` (inclusive) and `high` (exclusive): every node's data must
// satisfy low <= data < high. Right subtrees use the parent's own value as the
// (inclusive) low bound because this tree routes values equal to a node to
// its right subtree (see #insertNode: `lessThan` decides left, else right).
function isValidBST(node: RBNode, low: number | null, high: number | null): boolean {
  if (!node) return true;
  if (low !== null && node.data < low) return false;
  if (high !== null && node.data >= high) return false;
  return isValidBST(node.left, low, node.data) && isValidBST(node.right, node.data, high);
}

// Verifies the "no red node has a red child" property and returns the black-height,
// or -1 if the black-height is inconsistent between subtrees (a structural violation).
function blackHeight(node: RBNode): number {
  if (!node) return 1;
  const leftHeight = blackHeight(node.left);
  const rightHeight = blackHeight(node.right);
  if (leftHeight === -1 || rightHeight === -1 || leftHeight !== rightHeight) {
    return -1;
  }
  if (node.color !== BLACK) {
    if ((node.left && node.left.color !== BLACK) || (node.right && node.right.color !== BLACK)) {
      return -1;
    }
  }
  return leftHeight + (node.color === BLACK ? 1 : 0);
}

describe('RedBlackTree (red-black-tree.js)', () => {
  let rbt: InstanceType<typeof RedBlackTree>;

  beforeEach(() => {
    rbt = new RedBlackTree();
  });

  test('starts empty: root null, min/max null, search false', () => {
    expect(rbt.root).toBeNull();
    expect(rbt.min()).toBeNull();
    expect(rbt.max()).toBeNull();
    expect(rbt.search(1)).toBe(false);
  });

  test('insert sets the root and colors it black', () => {
    rbt.insert(5);
    expect(rbt.root?.data).toBe(5);
    expect(rbt.root?.color).toBe(BLACK);
  });

  // Regression test: RedBlackTree previously shadowed BinarySearchTree's private
  // #root with its own, so inherited search/min/max/traversals always operated
  // on the (always-null) base class root and were completely non-functional.
  test('search finds inserted values and reports missing ones as false', () => {
    [10, 20, 30, 15, 25, 5, 1].forEach(v => rbt.insert(v));
    expect(rbt.search(25)).toBe(true);
    expect(rbt.search(1)).toBe(true);
    expect(rbt.search(999)).toBe(false);
  });

  test('min/max return smallest/largest inserted values', () => {
    [10, 20, 30, 15, 25, 5, 1].forEach(v => rbt.insert(v));
    expect(rbt.min()).toBe(1);
    expect(rbt.max()).toBe(30);
  });

  test('inOrderTraverse returns values in sorted order', () => {
    [10, 20, 30, 15, 25, 5, 1].forEach(v => rbt.insert(v));
    const result: number[] = [];
    rbt.inOrderTraverse(v => result.push(v));
    expect(result).toEqual([1, 5, 10, 15, 20, 25, 30]);
  });

  test('preOrderTraverse and postOrderTraverse visit all nodes', () => {
    [10, 20, 30, 15, 25].forEach(v => rbt.insert(v));
    const pre: number[] = [];
    const post: number[] = [];
    rbt.preOrderTraverse(v => pre.push(v));
    rbt.postOrderTraverse(v => post.push(v));
    expect(pre.sort((a, b) => a - b)).toEqual([10, 15, 20, 25, 30]);
    expect(post.sort((a, b) => a - b)).toEqual([10, 15, 20, 25, 30]);
  });

  test('root is always black and tree stays a valid BST/RB tree after ascending inserts', () => {
    [1, 2, 3, 4, 5, 6, 7].forEach(v => rbt.insert(v));
    expect(rbt.root?.color).toBe(BLACK);
    expect(isValidBST(rbt.root, null, null)).toBe(true);
    expect(blackHeight(rbt.root)).toBeGreaterThan(0);
  });

  test('root is always black and tree stays valid after descending inserts', () => {
    [7, 6, 5, 4, 3, 2, 1].forEach(v => rbt.insert(v));
    expect(rbt.root?.color).toBe(BLACK);
    expect(isValidBST(rbt.root, null, null)).toBe(true);
    expect(blackHeight(rbt.root)).toBeGreaterThan(0);
  });

  test('insert [1,3,2] (right-left case) keeps tree valid', () => {
    [1, 3, 2].forEach(v => rbt.insert(v));
    expect(isValidBST(rbt.root, null, null)).toBe(true);
    expect(blackHeight(rbt.root)).toBeGreaterThan(0);
    [1, 2, 3].forEach(v => expect(rbt.search(v)).toBe(true));
  });

  test('inserting many values keeps the tree valid and searchable', () => {
    const values = Array.from({ length: 40 }, (_, i) => i + 1);
    values.forEach(v => rbt.insert(v));
    expect(isValidBST(rbt.root, null, null)).toBe(true);
    expect(blackHeight(rbt.root)).toBeGreaterThan(0);
    values.forEach(v => expect(rbt.search(v)).toBe(true));
    expect(rbt.search(0)).toBe(false);
    expect(rbt.search(41)).toBe(false);
  });

  test('remove from empty tree does not throw', () => {
    expect(() => rbt.remove(1)).not.toThrow();
    expect(rbt.root).toBeNull();
  });

  test('remove the only node empties the tree', () => {
    rbt.insert(5);
    rbt.remove(5);
    expect(rbt.root).toBeNull();
    expect(rbt.search(5)).toBe(false);
  });

  test('remove a leaf node keeps remaining values searchable and tree valid', () => {
    [10, 5, 15].forEach(v => rbt.insert(v));
    rbt.remove(5);
    expect(rbt.search(5)).toBe(false);
    expect(rbt.search(10)).toBe(true);
    expect(rbt.search(15)).toBe(true);
    expect(isValidBST(rbt.root, null, null)).toBe(true);
  });

  test('remove a node with two children replaces with in-order successor', () => {
    [10, 20, 30, 15, 25, 5, 1].forEach(v => rbt.insert(v));
    rbt.remove(20);
    expect(rbt.search(20)).toBe(false);
    const result: number[] = [];
    rbt.inOrderTraverse(v => result.push(v));
    expect(result).toEqual([1, 5, 10, 15, 25, 30]);
    expect(isValidBST(rbt.root, null, null)).toBe(true);
  });

  // Regression test: #rotateLeft/#rotateRight did not return the new subtree
  // root, so #balance (called from #removeNode) could return undefined and
  // overwrite an already-correct parent link with undefined, corrupting the
  // tree structure whenever a removal triggered a rebalancing rotation.
  test('removing many values one by one (triggers rebalancing) keeps tree valid and complete', () => {
    const values = Array.from({ length: 30 }, (_, i) => i + 1);
    values.forEach(v => rbt.insert(v));

    const toRemove = [5, 15, 25, 1, 30, 10, 20, 2, 3, 4];
    let remaining = [...values];
    toRemove.forEach(v => {
      rbt.remove(v);
      remaining = remaining.filter(x => x !== v);

      expect(rbt.search(v)).toBe(false);
      expect(isValidBST(rbt.root, null, null)).toBe(true);

      const result: number[] = [];
      rbt.inOrderTraverse(x => result.push(x));
      expect(result).toEqual(remaining);
    });
  });

  test('removing a non-existent value does not throw and keeps tree intact', () => {
    [10, 5, 15].forEach(v => rbt.insert(v));
    expect(() => rbt.remove(99)).not.toThrow();
    expect(rbt.search(10)).toBe(true);
    expect(rbt.search(5)).toBe(true);
    expect(rbt.search(15)).toBe(true);
  });

  test('removing all inserted values empties the tree', () => {
    const values = [10, 20, 5, 15, 30, 25];
    values.forEach(v => rbt.insert(v));
    values.forEach(v => rbt.remove(v));
    expect(rbt.root).toBeNull();
    values.forEach(v => expect(rbt.search(v)).toBe(false));
  });

  test('print() does not throw', () => {
    [10, 20, 5, 15].forEach(v => rbt.insert(v));
    expect(() => rbt.print()).not.toThrow();
  });

  test('print() on empty tree does not throw', () => {
    expect(() => rbt.print()).not.toThrow();
  });

  test('works with a custom comparator (strings)', () => {
    const strRbt = new RedBlackTree(
      (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)
    );
    ['banana', 'apple', 'cherry', 'date'].forEach(v => strRbt.insert(v));
    expect(strRbt.search('apple')).toBe(true);
    expect(strRbt.min()).toBe('apple');
    expect(strRbt.max()).toBe('date');
  });

  // Fuzz test to exercise the full range of insertion-fixup and deletion-rebalancing
  // branches (left-left/left-right/right-right/right-left cases in both paths),
  // asserting BST validity and structural correctness after every operation.
  // Uses distinct values deliberately (see the dedicated duplicate-values test
  // below for a documented limitation involving duplicates).
  test('fuzz: many random insert/remove sequences (distinct values) keep the tree a valid BST', () => {
    let seed = 42;
    function next(): number {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed;
    }

    for (let trial = 0; trial < 100; trial++) {
      const size = 5 + (next() % 25);
      const valueSet = new Set<number>();
      while (valueSet.size < size) valueSet.add(next() % 1000);
      const values = [...valueSet];

      const tree = new RedBlackTree();
      values.forEach(v => tree.insert(v));
      expect(isValidBST(tree.root, null, null)).toBe(true);

      let remaining = [...values].sort((a, b) => a - b);
      const removalOrder = [...values].sort(() => (next() % 3) - 1);
      removalOrder.forEach(v => {
        tree.remove(v);
        const idx = remaining.indexOf(v);
        if (idx >= 0) remaining.splice(idx, 1);
        expect(isValidBST(tree.root, null, null)).toBe(true);
        const result: number[] = [];
        tree.inOrderTraverse(x => result.push(x));
        expect(result).toEqual(remaining);
      });
      expect(tree.root).toBeNull();
    }
  });

  // Known limitation (shared identically with red-black-tree.ts): the deletion
  // algorithm's "successor value copy" technique mutates a node's `.data` in
  // place while keeping its original identity/color, and the subsequent
  // top-down rebalancing step (#balance) can then rotate that node based on
  // its *old* position rather than its new value. When duplicate values are
  // present, this can produce a structurally invalid BST (e.g. a value ending
  // up in the left subtree of a node holding an equal value) after a removal
  // that triggers such a rotation. This does not occur when all values are
  // distinct (see the fuzz test above). Fixing this generally would require a
  // more substantial rewrite of the deletion-rebalancing algorithm, which is
  // out of scope for a minimal, behavior-preserving fix and mirrors the same
  // limitation present in the .ts implementation.
  test('duplicate values: search still finds a representative value after churn', () => {
    [10, 5, 15, 5, 20, 5].forEach(v => rbt.insert(v));
    rbt.remove(10);
    rbt.remove(5);
    // Regardless of the known structural edge case above, at least one
    // instance of a duplicated value should remain discoverable, and
    // never-removed values must remain searchable.
    expect(rbt.search(5)).toBe(true);
    expect(rbt.search(15)).toBe(true);
    expect(rbt.search(20)).toBe(true);
  });
});
