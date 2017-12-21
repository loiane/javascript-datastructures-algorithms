import { Compare, defaultCompare, ICompareFunction } from '../util';
import { Node } from './models/node';

export default class BinarySearchTree<T> {
  protected root: Node<T>;

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {}

  insert(key: T) {
    // special case: first key
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  protected insertNode(node: Node<T>, key: T) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new Node(key);
    } else {
      this.insertNode(node.right, key);
    }
  }

  getRoot() {
    return this.root;
  }

  search(key: T) {
    return this.searchNode(this.root, key);
  }

  private searchNode(node: Node<T>, key: T): boolean {
    if (node == null) {
      return false;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }
    // key is equal to node.item
    return true;
  }

  inOrderTraverse(callback: Function) {
    this.inOrderTraverseNode(this.root, callback);
  }

  private inOrderTraverseNode(node: Node<T>, callback: Function) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  preOrderTraverse(callback: Function) {
    this.preOrderTraverseNode(this.root, callback);
  }

  private preOrderTraverseNode(node: Node<T>, callback: Function) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverse(callback: Function) {
    this.postOrderTraverseNode(this.root, callback);
  }

  private postOrderTraverseNode(node: Node<T>, callback: Function) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  min() {
    return this.minNode(this.root);
  }

  protected minNode(node: Node<T>) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  protected maxNode(node: Node<T>) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  remove(key: T) {
    this.root = this.removeNode(this.root, key);
  }

  protected removeNode(node: Node<T>, key: T) {
    if (node == null) {
      return null;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // key is equal to node.item

      // handle 3 special conditions
      // 1 - a leaf node
      // 2 - a node with only 1 child
      // 3 - a node with 2 children

      // case 1
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }

      // case 2
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }

      // case 3
      const aux = this.minNode(node.right);
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }
}
