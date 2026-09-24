// src/10-tree/red-black-tree.ts

import Comparator from './comparator';
import BinarySearchTree from './binary-search-tree';
import { CompareResult } from './compare';

const NodeColor = {
  RED: 0,
  BLACK: 1,
} as const;

type NodeColorValue = typeof NodeColor[keyof typeof NodeColor];

class RedBlackNode<T> {
  data: T;
  color: NodeColorValue = NodeColor.RED;
  left: RedBlackNode<T> | null = null;
  right: RedBlackNode<T> | null = null;
  parent: RedBlackNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }

  isRed(): boolean {
    return this.color === NodeColor.RED;
  }
}

class RedBlackTree<T> extends BinarySearchTree<T> {
  #root: RedBlackNode<T> | null = null;
  #compareFn: Comparator<T>;

  constructor(compareFn: (a: T, b: T) => number = Comparator.defaultCompareFn) {
    super(compareFn);
    this.#compareFn = new Comparator(compareFn as (a: T, b: T) => CompareResult);
    this.#root = null;
  }

  // Insert a node
  /**
   * Inserts a value, maintaining Red-Black Tree properties.
   * @param data - The value to insert
   * @complexity Time O(log n) | Space O(log n)
   */
  insert(data: T): void {
    if (this.#root) {
      const newNode = this.#insertNode(this.#root, data);
      this.#fixTreeProperties(newNode);
    } else {
      this.#root = new RedBlackNode(data);
      this.#root.color = NodeColor.BLACK;
    }
  }

  #insertNode(node: RedBlackNode<T>, data: T): RedBlackNode<T> {
    if (this.#compareFn.lessThan(data, node.data)) {
      if (!node.left) {
        node.left = new RedBlackNode(data);
        node.left.parent = node;
        return node.left;
      } else {
        return this.#insertNode(node.left, data);
      }
    } else {
      if (!node.right) {
        node.right = new RedBlackNode(data);
        node.right.parent = node;
        return node.right;
      } else {
        return this.#insertNode(node.right, data);
      }
    }
  }

  #fixTreeProperties(node: RedBlackNode<T>): void {
    while (node && node !== this.#root && node.isRed() && node.parent!.isRed()) {
      let parent = node.parent!;
      let grandParent = parent.parent!;

      // case A: parent is left child of grand parent
      if (parent === grandParent.left) {
        const uncle = grandParent.right;
        // case 1: uncle is red - only recoloring
        if (uncle && uncle.isRed()) {
          this.#flipColors(grandParent, parent, uncle);
          node = grandParent;
        } else {
          // case 2: node is right child of parent - left rotate
          if (node === parent.right) {
            this.#rotateLeft(parent);
            node = parent;
            parent = node.parent!;
          }
          // case 3: node is left child of parent - right rotate
          this.#rotateRight(grandParent);
          [parent.color, grandParent.color] = [grandParent.color, parent.color];
          node = parent;
        }
      } else { // case B: parent is right child of grand parent
        const uncle = grandParent.left;

        // case 1: uncle is red - only recoloring
        if (uncle && uncle.isRed()) {
          this.#flipColors(grandParent, parent, uncle);
          node = grandParent;
        } else {
          // case 2: node is left child of parent
          if (node === parent.left) {
            this.#rotateRight(parent);
            node = parent;
            parent = node.parent!;
          }

          // case 3: node is right child of parent
          this.#rotateLeft(grandParent);
          [parent.color, grandParent.color] = [grandParent.color, parent.color];
          node = parent;
        }
      }
    }
    this.#root!.color = NodeColor.BLACK; // root should always be black
  }

  #flipColors(grandParent: RedBlackNode<T>, parent: RedBlackNode<T>, uncle: RedBlackNode<T>): void {
    grandParent.color = NodeColor.RED;
    parent.color = NodeColor.BLACK;
    uncle.color = NodeColor.BLACK;
  }

  #rotateLeft(node: RedBlackNode<T>): RedBlackNode<T> {
    const newRoot = node.right!;
    node.right = newRoot.left;

    if (newRoot.left) {
      newRoot.left.parent = node;
    }

    newRoot.parent = node.parent;

    if (!node.parent) {
      this.#root = newRoot;
    } else if (node === node.parent.left) {
      node.parent.left = newRoot;
    } else {
      node.parent.right = newRoot;
    }

    newRoot.left = node;
    node.parent = newRoot;

    // Bug fix: must return the new subtree root, otherwise callers (e.g. #balance
    // during #removeNode) receive `undefined` and overwrite an already-correct
    // parent.left/right link with undefined, corrupting the tree.
    return newRoot;
  }

  #rotateRight(node: RedBlackNode<T>): RedBlackNode<T> {
    const newRoot = node.left!;
    node.left = newRoot.right;

    if (newRoot.right) {
      newRoot.right.parent = node;
    }

    newRoot.parent = node.parent;

    if (!node.parent) {
      this.#root = newRoot;
    } else if (node === node.parent.right) {
      node.parent.right = newRoot;
    } else {
      node.parent.left = newRoot;
    }

    newRoot.right = node;
    node.parent = newRoot;

    // Bug fix: return the new subtree root (see #rotateLeft for details).
    return newRoot;
  }

  /**
   * Removes a value, maintaining Red-Black Tree properties.
   * @param data - The value to remove
   * @complexity Time O(log n) | Space O(log n)
   */
  remove(data: T): void {
    this.#root = this.#removeNode(data, this.#root) as RedBlackNode<T> | null;
  }

  #removeNode(data: T, currentNode: RedBlackNode<T> | null): RedBlackNode<T> | null {
    if (!currentNode) {
      return null;
    }

    if (this.#compareFn.lessThan(data, currentNode.data)) {
      currentNode.left = this.#removeNode(data, currentNode.left);
    } else if (this.#compareFn.greaterThan(data, currentNode.data)) {
      currentNode.right = this.#removeNode(data, currentNode.right);
    } else {
      if (!currentNode.left && !currentNode.right) {
        return null;
      }

      if (!currentNode.left) {
        // Bug fix: the promoted child must inherit currentNode's parent pointer,
        // otherwise it's left stale, and a later rotation (which relies on
        // .parent to relink nodes) can corrupt the tree structure.
        currentNode.right!.parent = currentNode.parent;
        return currentNode.right;
      }

      if (!currentNode.right) {
        currentNode.left.parent = currentNode.parent;
        return currentNode.left;
      }

      const minNode = this.#findMinNode(currentNode.right);
      currentNode.data = minNode.data;
      currentNode.right = this.#removeNode(minNode.data, currentNode.right);
    }

    return this.#balance(currentNode) as RedBlackNode<T> | null;
  }

  #findMinNode(node: RedBlackNode<T>): RedBlackNode<T> {
    if (!node.left) {
      return node;
    }
    return this.#findMinNode(node.left);
  }

  #findMaxNode(node: RedBlackNode<T>): RedBlackNode<T> {
    if (!node.right) {
      return node;
    }
    return this.#findMaxNode(node.right);
  }

  // Bug fix: RedBlackTree keeps its own private #root (shadowing BinarySearchTree's),
  // so the inherited root/search/min/max/traversal methods from BinarySearchTree
  // always operated on the base class's (always-null) #root. Overriding them here
  // so they use RedBlackTree's own #root and actually work.
  override get root(): RedBlackNode<T> | null {
    return this.#root;
  }

  override search(data: T): boolean {
    return this.#searchNode(data, this.#root);
  }

  #searchNode(data: T, currentNode: RedBlackNode<T> | null): boolean {
    if (!currentNode) {
      return false;
    }

    if (this.#compareFn.equal(data, currentNode.data)) {
      return true;
    }

    if (this.#compareFn.lessThan(data, currentNode.data)) {
      return this.#searchNode(data, currentNode.left);
    } else {
      return this.#searchNode(data, currentNode.right);
    }
  }

  override min(): T | null {
    if (!this.#root) {
      return null;
    }
    return this.#findMinNode(this.#root).data;
  }

  override max(): T | null {
    if (!this.#root) {
      return null;
    }
    return this.#findMaxNode(this.#root).data;
  }

  override inOrderTraverse(callback: (data: T) => void): void {
    this.#inOrderTraverseNode(this.#root, callback);
  }

  #inOrderTraverseNode(node: RedBlackNode<T> | null, callback: (data: T) => void): void {
    if (node) {
      this.#inOrderTraverseNode(node.left, callback);
      callback(node.data);
      this.#inOrderTraverseNode(node.right, callback);
    }
  }

  override preOrderTraverse(callback: (data: T) => void): void {
    this.#preOrderTraverseNode(this.#root, callback);
  }

  #preOrderTraverseNode(node: RedBlackNode<T> | null, callback: (data: T) => void): void {
    if (node) {
      callback(node.data);
      this.#preOrderTraverseNode(node.left, callback);
      this.#preOrderTraverseNode(node.right, callback);
    }
  }

  override postOrderTraverse(callback: (data: T) => void): void {
    this.#postOrderTraverseNode(this.#root, callback);
  }

  #postOrderTraverseNode(node: RedBlackNode<T> | null, callback: (data: T) => void): void {
    if (node) {
      this.#postOrderTraverseNode(node.left, callback);
      this.#postOrderTraverseNode(node.right, callback);
      callback(node.data);
    }
  }

  #balance(node: RedBlackNode<T>): RedBlackNode<T> | void {
    if (node.isRed()) {
      return node;
    }

    if (node.left && node.left.isRed()) {
      if (node.left.left && node.left.left.isRed()) {
        return this.#rotateRight(node);
      }

      if (node.left.right && node.left.right.isRed()) {
        node.left = this.#rotateLeft(node.left);
        return this.#rotateRight(node);
      }
    }

    if (node.right && node.right.isRed()) {
      if (node.right.right && node.right.right.isRed()) {
        return this.#rotateLeft(node);
      }

      if (node.right.left && node.right.left.isRed()) {
        node.right = this.#rotateRight(node.right);
        return this.#rotateLeft(node);
      }
    }

    return node;
  }

  printInorder(node: RedBlackNode<T> | null): void {
    if (node === null) {
      return;
    }
    this.printInorder(node.left);
    console.log(node.data, node.color);
    this.printInorder(node.right);
  }

  /**
   * Prints all nodes in-order to the console with their color.
   * @complexity Time O(n) | Space O(n)
   */
  print(): void {
    this.printInorder(this.#root);
  }
}

export default RedBlackTree;
