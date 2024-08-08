// src/10-tree/avl-tree.js
const Comparator = require('./comparator');
const BinarySearchTree = require('./binary-search-tree');

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

}

module.exports = AVLTree;