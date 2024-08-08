// src/10-tree/binary-search-tree.js

const Comparator = require('./comparator');

class BSTNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  #root;
  #compareFn;

  constructor(compareFn = Comparator.defaultCompareFn) {
    this.#compareFn = new Comparator(compareFn);
    this.#root = null;
  }

  insert(data) {
    if (!this.#root) {
      this.#root = new BSTNode(data);
    } else {
      this.#insertNode(data, this.#root);
    }
  }

  #insertNode(data, currentNode) {
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

  search(data) {
    return this.#searchNode(data, this.#root);
  }

  #searchNode(data, currentNode) {
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

  remove(data) {
    this.#root = this.#removeNode(data, this.#root);
  }

  #removeNode(data, currentNode) {
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

  min() {
    if (!this.#root) {
      return null;
    }
    return this.#findMinNode(this.#root).data;
  }

  #findMinNode(node) {
    if (!node.left) {
      return node;
    }
    return this.#findMinNode(node.left);
  }

  max() {
    if (!this.#root) {
      return null;
    }
    return this.#findMaxNode(this.#root).data;
  }

  #findMaxNode(node) {
    if (!node.right) {
      return node;
    }
    return this.#findMaxNode(node.right);
  }

  get root() {
    return this.#root;
  }

  inOrderTraverse(callback) {
    this.#inOrderTraverseNode(this.#root, callback);
  }

  #inOrderTraverseNode(node, callback) {
    if (node) {
      this.#inOrderTraverseNode(node.left, callback);
      callback(node.data);
      this.#inOrderTraverseNode(node.right, callback);
    }
  }

  preOrderTraverse(callback) {
    this.#preOrderTraverseNode(this.#root, callback);
  }

  #preOrderTraverseNode(node, callback) {
    if (node) {
      callback(node.data);
      this.#preOrderTraverseNode(node.left, callback);
      this.#preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverse(callback) {
    this.#postOrderTraverseNode(this.#root, callback);
  }

  #postOrderTraverseNode(node, callback) {
    if (node) {
      this.#postOrderTraverseNode(node.left, callback);
      this.#postOrderTraverseNode(node.right, callback);
      callback(node.data);
    }
  }

}

module.exports = BinarySearchTree;