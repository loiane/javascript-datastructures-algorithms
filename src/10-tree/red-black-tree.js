// src/10-tree/red-black-tree.js

// Explicit .js extensions: without them, Jest's moduleFileExtensions (ts before js)
// resolves these to the .ts siblings instead of comparator.js/binary-search-tree.js.
const Comparator = require('./comparator.js');
const BinarySearchTree = require('./binary-search-tree.js');

const NodeColor = {
  RED: 0,
  BLACK: 1,
};

class RedBlackNode {
  constructor(data) {
    this.data = data;
    this.color = NodeColor.RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
  isRed() {
    return this.color === NodeColor.RED;
  }
}

class RedBlackTree extends BinarySearchTree {
  #root;
  #compareFn;

  constructor(compareFn = Comparator.defaultCompareFn) {
    super(compareFn);
    this.#compareFn = new Comparator(compareFn);
    this.#root = null;
  }


  // Insert a node
  insert(data) {
    if (this.#root) {
      const newNode = this.#insertNode(this.#root, data);
      this.#fixTreeProperties(newNode);
    } else {
      this.#root = new RedBlackNode(data);
      this.#root.color = NodeColor.BLACK;
    }
  }

  #insertNode(node, data) {
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

  #fixTreeProperties(node) {
    while (node && node !== this.#root && node.isRed() && node.parent.isRed()) {
      let parent = node.parent;
      let grandParent = parent.parent;

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
            parent = node.parent;
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
            parent = node.parent;
          }

          // case 3: node is right child of parent
          this.#rotateLeft(grandParent);
          [parent.color, grandParent.color] = [grandParent.color, parent.color];
          node = parent;
        }
      }
    }
    this.#root.color = NodeColor.BLACK; // root should always be black
  }

  #flipColors(grandParent, parent, uncle) {
    grandParent.color = NodeColor.RED;
    parent.color = NodeColor.BLACK;
    uncle.color = NodeColor.BLACK;
  }

  #rotateLeft(node) {
    const newRoot = node.right;
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

  #rotateRight(node) {
    const newRoot = node.left;
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
        // Bug fix: the promoted child must inherit currentNode's parent pointer,
        // otherwise it's left stale, and a later rotation (which relies on
        // .parent to relink nodes) can corrupt the tree structure.
        currentNode.right.parent = currentNode.parent;
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

  // Bug fix: RedBlackTree keeps its own private #root (shadowing BinarySearchTree's),
  // so the inherited root/search/min/max/traversal methods from BinarySearchTree
  // always operated on the base class's (always-null) #root. Overriding them here
  // so they use RedBlackTree's own #root and actually work.
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

  #balance(node) {
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

  printInorder(node) {
    if (node === null) {
      return;
    }
    this.printInorder(node.left);
    console.log(node.data, node.color);
    this.printInorder(node.right);
  }

  print() {
    this.printInorder(this.#root);
  }
}

module.exports = RedBlackTree;