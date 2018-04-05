import { defaultCompare, ICompareFunction, Compare } from '../util';
import BinarySearchTree from './binary-search-tree';
import { RedBlackNode, Colors } from './models/red-black-node';

export default class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root: RedBlackNode<T>;

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
  private rotationLL(node: RedBlackNode<T>) {
    const tmp = node.left;
    node.left = tmp.right;
    if (typeof tmp.right.key !== 'undefined') {
      tmp.right.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    tmp.right = node;
    node.parent = tmp;
  }

  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
  private rotationRR(node: RedBlackNode<T>) {
    const tmp = node.right;
    node.right = tmp.left;
    if (typeof tmp.left.key !== 'undefined') {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    tmp.left = node;
    node.parent = tmp;
  }

  insert(key: T) {
    // special case: first key
    if (this.root == null) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }

  protected insertNode(node: RedBlackNode<T>, key: T): RedBlackNode<T> {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new RedBlackNode(key);
      node.right.parent = node;
      return node.right;
    } else {
      return this.insertNode(node.right, key);
    }
  }

  private fixTreeProperties(node: RedBlackNode<T>) {
    let uncle: RedBlackNode<T>;
    let grandParent: RedBlackNode<T>;
    while (node && node.parent && node.parent.color === Colors.RED && node.color !== Colors.BLACK) {
      grandParent = node.parent.parent;
      if (grandParent && grandParent.left === node.parent) {
        if (grandParent.right != null) {
          uncle = grandParent.right;
          if (uncle.color === Colors.RED) {
            node.parent.color = Colors.BLACK;
            uncle.color = Colors.BLACK;
            grandParent.color = Colors.RED;
            node = grandParent;
          }
        } else {
          if (node.parent.right === node) {
            node = node.parent;
            this.leftRotate(node);
          }
          node.parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          this.rightRotate(grandParent);
        }
      } else {
        if (grandParent.left != null) {
          uncle = grandParent.left;
          if (uncle.color === Colors.RED) {
            node.parent.color = Colors.BLACK;
            uncle.color = Colors.BLACK;
            grandParent.color = Colors.RED;
            node = grandParent;
          }
        } else {
          if (node.parent.left === node) {
            node = node.parent;
            this.rightRotate(node);
          }
          node.parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          this.leftRotate(grandParent);
        }
      }
    }
    this.root.color = Colors.BLACK;
  }

  leftRotate(p: RedBlackNode<T>) {
    if (p.right != null) {
      const y = p.right;
      if (y.left != null) {
        p.right = y.left;
        y.left.parent = p;
      } else {
        p.right = null;
      }
      if (p.parent != null) {
        y.parent = p.parent;
      }
      if (p.parent == null) {
        this.root = y;
      } else {
        if (p === p.parent.left) {
          p.parent.left = y;
        } else {
          p.parent.right = y;
        }
      }
      y.left = p;
      p.parent = y;
    }
  }

  rightRotate(p: RedBlackNode<T>) {
    if (p.left != null) {
      const y = p.left;
      if (y.right != null) {
        p.left = y.right;
        y.right.parent = p;
      } else {
        p.left = null;
      }
      if (p.parent != null) {
        y.parent = p.parent;
      }
      if (p.parent == null) {
        this.root = y;
      } else {
        if (p === p.parent.left) {
          p.parent.left = y;
        } else {
          p.parent.right = y;
        }
      }
      y.right = p;
      p.parent = y;
    }
  }

  getRoot() {
    return this.root;
  }

  /* private flipColors(node: RedBlackNode<T>) {
    node.left.flipColor();
    node.right.flipColor();
  }

  private isRed(node: RedBlackNode<T>) {
    if (!node) {
      return false;
    }
    return node.isRed();
  }*/
}
