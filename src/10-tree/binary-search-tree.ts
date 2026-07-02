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

  get root(): BSTNode<T> | null {
    return this.#root;
  }

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
