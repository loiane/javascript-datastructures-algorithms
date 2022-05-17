import { Compare, defaultCompare, ICompareFunction } from '../util';
import BinarySearchTree from './binary-search-tree';
import { Node } from './models/node';

enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5
}

export default class AVLTree<T> extends BinarySearchTree<T> {

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  private getNodeHeight(node: Node<T>): number {
    if (node == null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
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
  private rotationLL(node: Node<T>) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
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
  private rotationRR(node: Node<T>) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  /**
   * Left right case: rotate left then right
   * @param node Node<T>
   */
  private rotationLR(node: Node<T>) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  /**
   * Right left case: rotate right then left
   * @param node Node<T>
   */
  private rotationRL(node: Node<T>) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  private getBalanceFactor(node: Node<T>) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  insert(key: T) {
    this.root = this.insertNode(this.root, key);
  }

  protected insertNode(node: Node<T>, key: T) {
    if (node == null) {
      return new Node(key);
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else {
      node.right = this.insertNode(node.right, key);
    }

    // verify if tree is balanced
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // Left left case
        node = this.rotationLL(node);
      } else {
        // Left right case
        node = this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // Right right case
        node = this.rotationRR(node);
      } else {
        // Right left case
        node = this.rotationRL(node);
      }
    }
    return node;
  }

  protected removeNode(node: Node<T>, key: T) {
   node = super.removeNode(node, key); // {1}
   if (node == null) {
     return node;
   }

   // verify if tree is balanced
   const balanceFactor = this.getBalanceFactor(node);
   if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
     if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
       // Left left case
       node = this.rotationLL(node);
     } else {
       // Left right case
       node = this.rotationLR(node);
     }
   }
   if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
     if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
       // Right right case
       node = this.rotationRR(node);
     } else {
       // Right left case
       node = this.rotationRL(node);
     }
   }
   return node;
  }
}
