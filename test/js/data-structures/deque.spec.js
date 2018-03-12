import 'mocha';
import { expect } from 'chai';
import Deque from '../../../src/js/data-structures/deque';

describe('Deque', () => {
  let deque;

  beforeEach(() => {
    deque = new Deque();
  });

  it('starts empty', () => {
    expect(deque.size()).to.equal(0);
    expect(deque.isEmpty()).to.equal(true);
  });

  it('add elements in the back', () => {
    deque.addBack(1);
    expect(deque.size()).to.equal(1);

    deque.addBack(2);
    expect(deque.size()).to.equal(2);

    deque.addBack(3);
    expect(deque.size()).to.equal(3);
  });

  it('add elements in the front', () => {
    deque.addFront(1);
    expect(deque.size()).to.equal(1);

    deque.addFront(2);
    expect(deque.size()).to.equal(2);

    deque.addFront(3);
    expect(deque.size()).to.equal(3);

    deque.removeFront();
    deque.addFront(4);
    expect(deque.size()).to.equal(3);
  });

  it('remove elements from the back', () => {
    deque.addBack(1);
    deque.addBack(2);
    deque.addBack(3);
    deque.addFront(0);

    expect(deque.removeBack()).to.equal(3);
    expect(deque.removeBack()).to.equal(2);
    expect(deque.removeBack()).to.equal(1);
    expect(deque.removeBack()).to.equal(0);
    expect(deque.removeBack()).to.equal(undefined);
  });

  it('remove elements from the front', () => {
    deque.addFront(1);
    deque.addBack(2);
    deque.addBack(3);
    deque.addFront(0);
    deque.addFront(-1);
    deque.addFront(-2);

    expect(deque.removeFront()).to.equal(-2);
    expect(deque.removeFront()).to.equal(-1);
    expect(deque.removeFront()).to.equal(0);
    expect(deque.removeFront()).to.equal(1);
    expect(deque.removeFront()).to.equal(2);
    expect(deque.removeFront()).to.equal(3);
    expect(deque.removeFront()).to.equal(undefined);
  });

  it('allows to peek at the front element in the deque without removing it', () => {
    expect(deque.peekFront()).to.equal(undefined);

    deque.addFront(1);
    expect(deque.peekFront()).to.equal(1);
    deque.addBack(2);
    expect(deque.peekFront()).to.equal(1);
    deque.addBack(3);
    expect(deque.peekFront()).to.equal(1);
    deque.addFront(0);
    expect(deque.peekFront()).to.equal(0);
    deque.addFront(-1);
    expect(deque.peekFront()).to.equal(-1);
    deque.addFront(-2);
    expect(deque.peekFront()).to.equal(-2);
  });

  it('allows to peek at the last element in the deque without removing it', () => {
    expect(deque.peekBack()).to.equal(undefined);

    deque.addFront(1);
    expect(deque.peekBack()).to.equal(1);
    deque.addBack(2);
    expect(deque.peekBack()).to.equal(2);
    deque.addBack(3);
    expect(deque.peekBack()).to.equal(3);
    deque.addFront(0);
    expect(deque.peekBack()).to.equal(3);
    deque.addFront(-1);
    expect(deque.peekBack()).to.equal(3);
    deque.addFront(-2);
    expect(deque.peekBack()).to.equal(3);
  });

  it('returns the correct size', () => {
    expect(deque.size()).to.equal(0);

    deque.addFront(1);
    expect(deque.size()).to.equal(1);
    deque.addBack(2);
    expect(deque.size()).to.equal(2);
    deque.addBack(3);
    expect(deque.size()).to.equal(3);
    deque.addFront(0);
    expect(deque.size()).to.equal(4);
    deque.addFront(-1);
    expect(deque.size()).to.equal(5);
    deque.addFront(-2);
    expect(deque.size()).to.equal(6);

    deque.clear();
    expect(deque.size()).to.equal(0);

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.size()).to.equal(2);

    deque.removeFront();
    deque.removeBack();
    expect(deque.size()).to.equal(0);
  });

  it('returns if it is empty', () => {
    expect(deque.isEmpty()).to.equal(true);

    deque.addFront(1);
    expect(deque.isEmpty()).to.equal(false);
    deque.addBack(2);
    expect(deque.isEmpty()).to.equal(false);

    deque.clear();
    expect(deque.isEmpty()).to.equal(true);

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.isEmpty()).to.equal(false);

    deque.removeFront();
    expect(deque.isEmpty()).to.equal(false);
    deque.removeBack();
    expect(deque.isEmpty()).to.equal(true);
  });

  it('clears the queue', () => {
    deque.clear();
    expect(deque.isEmpty()).to.equal(true);

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.isEmpty()).to.equal(false);

    deque.clear();
    expect(deque.isEmpty()).to.equal(true);
  });

  it('returns toString primitive types', () => {
    expect(deque.toString()).to.equal('');

    deque.addFront(1);
    expect(deque.toString()).to.equal('1');

    deque.addBack(2);
    expect(deque.toString()).to.equal('1,2');

    deque.clear();
    expect(deque.toString()).to.equal('');

    const queueString = new Deque();
    queueString.addFront('el1');
    expect(queueString.toString()).to.equal('el1');

    queueString.addBack('el2');
    expect(queueString.toString()).to.equal('el1,el2');
  });

  it('returns toString objects', () => {
    class MyObj {
      constructor(el1, el2) {
        this.el1 = el1;
        this.el2 = el2;
      }
      toString() {
        return `${this.el1.toString()}|${this.el2.toString()}`;
      }
    }
    const dequeMyObj = new Deque();
    expect(dequeMyObj.toString()).to.equal('');

    dequeMyObj.addFront(new MyObj(1, 2));
    expect(dequeMyObj.toString()).to.equal('1|2');

    dequeMyObj.addBack(new MyObj(3, 4));
    expect(dequeMyObj.toString()).to.equal('1|2,3|4');
  });
});
