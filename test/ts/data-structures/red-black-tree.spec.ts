import { Colors } from './../../../src/ts/data-structures/models/red-black-node';
import 'mocha';
import { expect } from 'chai';
import { RedBlackTree } from '../../../src/ts/index';
import { RedBlackNode } from '../../../src/ts/data-structures/models/red-black-node';

describe('RedBlackTree', () => {
  let tree: RedBlackTree<number>;

  beforeEach(() => {
    tree = new RedBlackTree<number>();
  });

  it('starts empty', () => {
    expect(tree.getRoot()).to.equal(undefined);
  });

  it('inserts elements in the RedBlackTree', () => {
    expect(tree.getRoot()).to.equal(undefined);

    let node;

    tree.insert(1);
    assertNode(tree.getRoot(), 1, Colors.BLACK);

    tree.insert(2);
    assertNode(tree.getRoot(), 1, Colors.BLACK);
    assertNode(tree.getRoot().right, 2, Colors.RED);

    tree.insert(3);
    assertNode(tree.getRoot(), 2, Colors.BLACK);
    assertNode(tree.getRoot().right, 3, Colors.RED);
    assertNode(tree.getRoot().left, 1, Colors.RED);

    tree.insert(4);
    assertNode(tree.getRoot(), 2, Colors.BLACK);
    assertNode(tree.getRoot().left, 1, Colors.BLACK);
    assertNode(tree.getRoot().right, 3, Colors.BLACK);
    assertNode(tree.getRoot().right.right, 4, Colors.RED);

    tree.insert(5);
    assertNode(tree.getRoot(), 2, Colors.BLACK);
    assertNode(tree.getRoot().left, 1, Colors.BLACK);
    node = tree.getRoot().right;
    assertNode(node, 4, Colors.BLACK);
    assertNode(node.left, 3, Colors.RED);
    assertNode(node.right, 5, Colors.RED);

    tree.insert(6);
    assertNode(tree.getRoot(), 2, Colors.BLACK);
    assertNode(tree.getRoot().left, 1, Colors.BLACK);
    node = tree.getRoot().right;
    assertNode(node, 4, Colors.RED);
    assertNode(node.left, 3, Colors.BLACK);
    assertNode(node.right, 5, Colors.BLACK);
    assertNode(node.right.right, 6, Colors.RED);

    tree.insert(7);
    assertNode(tree.getRoot(), 2, Colors.BLACK);
    assertNode(tree.getRoot().left, 1, Colors.BLACK);
    node = tree.getRoot().right;
    assertNode(node, 4, Colors.RED);
    assertNode(node.left, 3, Colors.BLACK);
    assertNode(node.right, 6, Colors.BLACK);
    assertNode(node.right.right, 7, Colors.RED);
    assertNode(node.right.left, 5, Colors.RED);

    tree.insert(8);
    assertNode(tree.getRoot(), 4, Colors.BLACK);
    node = tree.getRoot().left;
    assertNode(node, 2, Colors.RED);
    assertNode(node.left, 1, Colors.BLACK);
    assertNode(node.right, 3, Colors.BLACK);
    node = tree.getRoot().right;
    assertNode(node, 6, Colors.RED);
    assertNode(node.left, 5, Colors.BLACK);
    assertNode(node.right, 7, Colors.BLACK);
    assertNode(node.right.right, 8, Colors.RED);

    tree.insert(9);
    assertNode(tree.getRoot(), 4, Colors.BLACK);
    node = tree.getRoot().left;
    assertNode(node, 2, Colors.RED);
    assertNode(node.left, 1, Colors.BLACK);
    assertNode(node.right, 3, Colors.BLACK);
    node = tree.getRoot().right;
    assertNode(node, 6, Colors.RED);
    assertNode(node.left, 5, Colors.BLACK);
    assertNode(node.right, 8, Colors.BLACK);
    assertNode(node.right.left, 7, Colors.RED);
    assertNode(node.right.right, 9, Colors.RED);

    tree.insert(10);
    assertNode(tree.getRoot(), 4, Colors.BLACK);
    node = tree.getRoot().left;
    assertNode(node, 2, Colors.BLACK);
    assertNode(node.left, 1, Colors.BLACK);
    assertNode(node.right, 3, Colors.BLACK);
    node = tree.getRoot().right;
    assertNode(node, 6, Colors.BLACK);
    assertNode(node.left, 5, Colors.BLACK);
    assertNode(node.right, 8, Colors.RED);
    assertNode(node.right.left, 7, Colors.BLACK);
    assertNode(node.right.right, 9, Colors.BLACK);
    assertNode(node.right.right.right, 10, Colors.RED);

  });

  function assertNode(node: RedBlackNode<number>, key: number, color: Colors) {
    expect(node.color).to.equal(color);
    expect(node.key).to.equal(key);
  }
});
