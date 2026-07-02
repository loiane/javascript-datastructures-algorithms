// src/10-tree/binary-search-tree.ts

import Comparator from './comparator';
import { CompareResult } from './compare';

class BSTNode<T> {
  data: T;
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

class BinarySearchTree<T> {
  #root: BSTNode<T> | null = null;
  #compareFn: Comparator<T>;

  constructor(compareFn: (a: T, b: T) => number = Comparator.defaultCompareFn) {
    this.#compareFn = new Comparator(compareFn as (a: T, b: T) => CompareResult);
    this.#root = null;
  }

  /**
   * Inserts a value into the BST.
   * @param data - The value to insert
   * @complexity Time O(log n) average, O(n) worst | Space O(log n) average
   */
  insert(data: T): void {
    if (!this.#root) {
      this.#root = new BSTNode(data);
    } else {
      this.#insertNode(data, this.#root);
    }
  }

  #insertNode(data: T, currentNode: BSTNode<T>): void {
    if (this.#compareFn.lessThan(data, currentNode.data)) {
      if (!currentNode.left) {
        currentNode.left = new BSTNode(data);
      } else {
        this.#insertNode(data, currentNode.left);
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = new BSTNode(data);
      } else {
        this.#insertNode(data, currentNode.right);
      }
    }
  }

  /**
   * Returns true if the value exists in the BST.
   * @param data - The value to search for
   * @returns Whether the value is present
   * @complexity Time O(log n) average, O(n) worst | Space O(log n) average
   */
  search(data: T): boolean {
    return this.#searchNode(data, this.#root);
  }

  #searchNode(data: T, currentNode: BSTNode<T> | null): boolean {
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

  /**
   * Removes the first occurrence of data from the BST.
   * @param data - The value to remove
   * @complexity Time O(log n) average, O(n) worst | Space O(log n) average
   */
  remove(data: T): void {
    this.#root = this.#removeNode(data, this.#root);
  }

  #removeNode(data: T, currentNode: BSTNode<T> | null): BSTNode<T> | null {
    if (!currentNode) {
      return null;
    }

    if (this.#compareFn.lessThan(data, currentNode.data)) {
      currentNode.left = this.#removeNode(data, currentNode.left);
      return currentNode;
    } else if (this.#compareFn.greaterThan(data, currentNode.data)) {
      currentNode.right = this.#removeNode(data, currentNode.right);
      return currentNode;
    } else {
      if (!currentNode.left && !currentNode.right) {
        return null;
      }

      if (!currentNode.left) {
        return currentNode.right;
      }

      if (!currentNode.right) {
        return currentNode.left;
      }

      const minNode = this.#findMinNode(currentNode.right);
      currentNode.data = minNode.data;
      currentNode.right = this.#removeNode(minNode.data, currentNode.right);
      return currentNode;
    }
  }

  /**
   * Returns the minimum value in the BST, or null if empty.
   * @returns The minimum value, or null
   * @complexity Time O(log n) average, O(n) worst | Space O(1)
   */
  min(): T | null {
    if (!this.#root) {
      return null;
    }
    return this.#findMinNode(this.#root).data;
  }

  #findMinNode(node: BSTNode<T>): BSTNode<T> {
    if (!node.left) {
      return node;
    }
    return this.#findMinNode(node.left);
  }

  /**
   * Returns the maximum value in the BST, or null if empty.
   * @returns The maximum value, or null
   * @complexity Time O(log n) average, O(n) worst | Space O(1)
   */
  max(): T | null {
    if (!this.#root) {
      return null;
    }
    return this.#findMaxNode(this.#root).data;
  }

  #findMaxNode(node: BSTNode<T>): BSTNode<T> {
    if (!node.right) {
      return node;
    }
    return this.#findMaxNode(node.right);
  }

  /**
   * The root node of the BST.
   * @complexity Time O(1) | Space O(1)
   */
  get root(): BSTNode<T> | null {
    return this.#root;
  }

  /**
   * Traverses the tree in-order (left, node, right) and calls callback for each node.
   * @param callback - Function called with each node's data in sorted order
   * @complexity Time O(n) | Space O(n) call stack
   */
  inOrderTraverse(callback: (data: T) => void): void {
    this.#inOrderTraverseNode(this.#root, callback);
  }

  #inOrderTraverseNode(node: BSTNode<T> | null, callback: (data: T) => void): void {
    if (node) {
      this.#inOrderTraverseNode(node.left, callback);
      callback(node.data);
      this.#inOrderTraverseNode(node.right, callback);
    }
  }

  /**
   * Traverses the tree pre-order (node, left, right) and calls callback for each node.
   * @param callback - Function called with each node's data
   * @complexity Time O(n) | Space O(n) call stack
   */
  preOrderTraverse(callback: (data: T) => void): void {
    this.#preOrderTraverseNode(this.#root, callback);
  }

  #preOrderTraverseNode(node: BSTNode<T> | null, callback: (data: T) => void): void {
    if (node) {
      callback(node.data);
      this.#preOrderTraverseNode(node.left, callback);
      this.#preOrderTraverseNode(node.right, callback);
    }
  }

  /**
   * Traverses the tree post-order (left, right, node) and calls callback for each node.
   * @param callback - Function called with each node's data
   * @complexity Time O(n) | Space O(n) call stack
   */
  postOrderTraverse(callback: (data: T) => void): void {
    this.#postOrderTraverseNode(this.#root, callback);
  }

  #postOrderTraverseNode(node: BSTNode<T> | null, callback: (data: T) => void): void {
    if (node) {
      this.#postOrderTraverseNode(node.left, callback);
      this.#postOrderTraverseNode(node.right, callback);
      callback(node.data);
    }
  }
}

export default BinarySearchTree;
