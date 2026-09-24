// src/10-tree/avl-tree.js
// Explicit .js extensions: without them, Jest's moduleFileExtensions (ts before js)
// resolves these to the .ts siblings instead of comparator.js/binary-search-tree.js.
const Comparator = require('./comparator.js');
const BinarySearchTree = require('./binary-search-tree.js');

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

class AVLNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree extends BinarySearchTree {
  #root;
  #compareFn;

  constructor(compareFn = Comparator.defaultCompareFn) {
    super(compareFn);
    this.#compareFn = new Comparator(compareFn);
    this.#root = null;
  }

  insert(data) {
    this.#root = this.#insertNode(data, this.#root);
  }

  #insertNode(data, currentNode) {
    if (!currentNode) {
      return new AVLNode(data);
    }

    if (this.#compareFn.lessThan(data, currentNode.data)) {
      currentNode.left = this.#insertNode(data, currentNode.left);
    } else {
      currentNode.right = this.#insertNode(data, currentNode.right);
    }

    currentNode.height = this.#updateNodeHeight(currentNode);

    return this.#balance(currentNode);
  }

  #updateNodeHeight(node) {
    return 1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));
  }

  #getHeight(node) {
    return node ? node.height : 0;
  }

  #getBalanceFactor(node) {
    const heightDifference = this.#getHeight(node.left) - this.#getHeight(node.right);
    switch (heightDifference) {
      case -2: return BalanceFactor.UNBALANCED_RIGHT;
      case -1: return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1: return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2: return BalanceFactor.UNBALANCED_LEFT;
      default: return BalanceFactor.BALANCED;
    }
  }

  #balance(node) {
    const balanceFactor = this.#getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const leftChildBalanceFactor = this.#getBalanceFactor(node.left);
      if (leftChildBalanceFactor === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.#rotateRight(node);
      } else {
        return this.#rotateLeftRight(node);
      }
    } else if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const rightChildBalanceFactor = this.#getBalanceFactor(node.right);
      if (rightChildBalanceFactor === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.#rotateLeft(node);
      } else {
        return this.#rotateRightLeft(node);
      }
    }
    return node;
  }

  #rotateRight(node) {
    const newRoot = node.left; // Identify the pivot (left child)
    const temp = newRoot.right; // Store the right child temporarily
  
    // Perform the rotation
    newRoot.right = node;
    node.left = temp;
  
    // Update heights of the affected nodes
    node.height = this.#updateNodeHeight(node);
    newRoot.height = this.#updateNodeHeight(newRoot);
  
    return newRoot; // Return the new root of the subtree
  }

  #rotateLeft(node) {
    const newRoot = node.right; // Identify the pivot (right child)
    const temp = newRoot.left;  // Store the left child temporarily
  
    newRoot.left = node; // Perform the rotation
    node.right = temp;
  
    node.height = this.#updateNodeHeight(node);
    newRoot.height = this.#updateNodeHeight(newRoot);
    return newRoot;
  }

  #rotateLeftRight(node) {
    node.left = this.#rotateLeft(node.left); // First, rotate left on the left child
    return this.#rotateRight(node);               // Then, rotate right on the original node
  }

  #rotateRightLeft(node) {
    node.right = this.#rotateRight(node.right); // Rotate right on the right child
    return this.#rotateLeft(node); // Then, rotate left on the original node
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
    } else if (this.#compareFn.greaterThan(data, currentNode.data)) {
      currentNode.right = this.#removeNode(data, currentNode.right);
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
    }

    currentNode.height = this.#updateNodeHeight(currentNode);

    return this.#balance(currentNode);
  }

  #findMinNode(node) {
    if (!node.left) {
      return node;
    }
    return this.#findMinNode(node.left);
  }

  #findMaxNode(node) {
    if (!node.right) {
      return node;
    }
    return this.#findMaxNode(node.right);
  }

  // Bug fix: AVLTree keeps its own private #root (shadowing BinarySearchTree's),
  // so the inherited root/search/min/max/traversal methods from BinarySearchTree
  // always operated on the base class's (always-null) #root. Overriding them here
  // so they use AVLTree's own #root and actually work.
  get root() {
    return this.#root;
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

  min() {
    if (!this.#root) {
      return null;
    }
    return this.#findMinNode(this.#root).data;
  }

  max() {
    if (!this.#root) {
      return null;
    }
    return this.#findMaxNode(this.#root).data;
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

module.exports = AVLTree;