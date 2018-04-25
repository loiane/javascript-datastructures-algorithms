import 'mocha';
import { expect } from 'chai';
import { AVLTree } from '../../../src/js/index';

describe('AVLTree', () => {
  let tree;

  beforeEach(() => {
    tree = new AVLTree();
  });

  it('starts empty', () => {
    expect(tree.getRoot()).to.equal(null);
  });

  it('inserts elements in the AVLTree', () => {
    expect(tree.getRoot()).to.equal(null);

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(14);
    tree.insert(15);
    tree.insert(13);
    tree.insert(12);
    tree.insert(11);
  });
});
