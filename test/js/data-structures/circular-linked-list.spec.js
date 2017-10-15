import 'mocha';
import { expect } from 'chai';
import { CircularLinkedList } from '../../../src/js/index';
import MyObj from './my-obj';

describe('CircularLinkedList', () => {
  let list;
  let min;
  let max;

  beforeEach(() => {
    list = new CircularLinkedList();
    min = 1;
    max = 3;
  });

  function pushesElements() {
    for (let i = min; i <= max; i++) {
      list.push(i);
    }
  }

  function verifyList() {
    let current = list.getHead();
    for (let i = min; i <= max && current; i++) {
      expect(current).to.not.be.an('undefined');
      if (current) {
        // TS strictNullChecks
        expect(current.element).to.not.be.an('undefined');
        expect(current.element).to.equal(i);
        if (i < max) {
          expect(current.next).to.not.be.an('undefined');
          if (current.next) {
            // TS strictNullChecks
            expect(current.next.element).to.equal(i + 1);
          }
        } else {
          // circular list
          expect(current.next).to.not.be.an('undefined');
          expect(current.next).to.equal(list.getHead());
          if (current.next) {
            expect(current.next.element).to.equal(min);
          }
        }
        current = current.next;
      }
    }
  }

  it('starts empty', () => {
    expect(list.size()).to.equal(0);
    expect(list.isEmpty()).to.equal(true);
    expect(list.getHead()).to.be.an('undefined');
  });

  it('pushes elements', () => {
    pushesElements();
    verifyList();
  });

  it('returns element at specific index: invalid position', () => {
    // list is empty
    expect(list.getElementAt(3)).to.be.an('undefined');
  });

  it('returns element at specific index', () => {
    let node;

    pushesElements();

    for (let i = min; i <= max; i++) {
      node = list.getElementAt(i - 1);
      expect(node).to.not.be.an('undefined');
      if (node) {
        expect(node.element).to.equal(i);
      }
    }
  });

  it('inserts elements first position empty list', () => {
    const element = 1;
    max = element;
    expect(list.insert(element, 0)).to.equal(true);
    verifyList();
  });

  it('inserts elements first position not empty list', () => {
    max = 2;
    expect(list.insert(max, 0)).to.equal(true);

    expect(list.insert(min, 0)).to.equal(true);

    verifyList();
  });

  it('inserts elements invalid position empty list', () => {
    expect(list.insert(1, 1)).to.equal(false);
  });

  it('inserts elements invalid position not empty list', () => {
    const element = 1;
    expect(list.insert(element, 0)).to.equal(true);
    expect(list.insert(element, 2)).to.equal(false);
  });

  it('inserts elements in the middle of list', () => {
    expect(list.insert(3, 0)).to.equal(true);
    expect(list.insert(1, 0)).to.equal(true);
    expect(list.insert(2, 1)).to.equal(true);
    verifyList();
  });

  it('inserts elements at the end of list', () => {
    max = 5;

    for (let i = min; i <= max; i++) {
      expect(list.insert(i, i - 1)).to.equal(true);
    }

    verifyList();
  });

  it('returns index of elements', () => {
    let index;

    pushesElements();

    for (let i = min; i <= max; i++) {
      index = list.indexOf(i);
      expect(index).to.equal(i - 1);
    }

    expect(list.indexOf(max + 2)).to.equal(-1);
  });

  it('removes valid elements', () => {
    let element;

    pushesElements();

    const minIndex = min;
    for (let i = minIndex; i <= max; i++) {
      element = list.remove(i);
      expect(element).to.not.be.an('undefined');
      expect(element).to.equal(i);
      min++;
      verifyList();
    }
  });

  it('removes invalid elements', () => {
    let element;

    pushesElements();

    for (let i = max + 2; i <= max + 4; i++) {
      element = list.remove(i);
      expect(element).to.be.an('undefined');
    }
  });

  it('removes element invalid position empty list', () => {
    let element;

    for (let i = min; i <= max; i++) {
      element = list.removeAt(i - 1);
      expect(element).to.be.an('undefined');
    }
  });

  it('removes element invalid position not empty list', () => {
    let element;

    pushesElements();

    for (let i = max + 2; i <= max + 4; i++) {
      element = list.removeAt(i);
      expect(element).to.be.an('undefined');
    }
  });

  it('removes first element list single element', () => {
    const value = 1;
    list.push(value);

    const element = list.removeAt(0);
    expect(element).to.not.be.an('undefined');
    expect(element).to.equal(value);

    expect(list.getHead()).to.be.an('undefined');
    expect(list.isEmpty()).to.equal(true);
  });

  it('removes first element list multiple elements', () => {
    pushesElements();

    const element = list.removeAt(0);
    expect(element).to.not.be.an('undefined');
    expect(element).to.equal(min);

    min = 2;
    verifyList();
  });

  it('removes element from middle of list', () => {
    pushesElements(); // 1, 2, 3

    const element = list.removeAt(1); // element 2
    expect(element).to.not.be.an('undefined');
    expect(element).to.equal(2);

    // list needs to be [1, 3]
    let current = list.getHead();

    // element 1
    expect(current).to.not.be.an('undefined');
    if (current) {
      expect(current.element).to.not.be.an('undefined');
      expect(current.element).to.equal(min);
      expect(current.next).to.not.be.an('undefined');
      if (current.next) {
        expect(current.next.element).to.equal(max);
        current = current.next;
      }
    }

    // element 3
    expect(current).to.not.be.an('undefined');
    if (current) {
      expect(current.element).to.not.be.an('undefined');
      expect(current.element).to.equal(max);
      expect(current.next).to.not.be.an('undefined');
      expect(current.next).to.equal(list.getHead());
      if (current.next) {
        expect(current.next.element).to.equal(min);
      }
    }
  });

  it('removes element from end of list', () => {
    let element;

    pushesElements();

    const maxIndex = max;
    for (let i = maxIndex; i >= min; i--) {
      element = list.removeAt(i - 1);
      expect(element).to.not.be.an('undefined');
      expect(element).to.equal(i);
      max--;
      verifyList();
    }
  });

  it('returns the head of the list', () => {
    expect(list.getHead()).to.be.an('undefined');

    list.push(1);
    expect(list.getHead()).to.not.be.an('undefined');
  });

  it('returns the correct size', () => {
    expect(list.size()).to.equal(0);

    for (let i = min; i <= max; i++) {
      list.push(i);
      expect(list.size()).to.equal(i);
    }

    const size = max;
    for (let i = min; i <= max; i++) {
      list.remove(i);
      expect(list.size()).to.equal(size - i);
    }

    expect(list.size()).to.equal(0);
  });

  it('returns if it is empty', () => {
    expect(list.isEmpty()).to.equal(true);
    for (let i = min; i <= max; i++) {
      list.push(i);
      expect(list.isEmpty()).to.equal(false);
    }

    for (let i = min; i < max; i++) {
      list.remove(i);
      expect(list.isEmpty()).to.equal(false);
    }
    list.remove(max);
    expect(list.isEmpty()).to.equal(true);

    pushesElements();
    expect(list.isEmpty()).to.equal(false);

    list.clear();
    expect(list.isEmpty()).to.equal(true);
  });

  it('clears the list', () => {
    expect(list.size()).to.equal(0);
    list.clear();
    expect(list.size()).to.equal(0);
    pushesElements();
    expect(list.size()).to.greaterThan(0);
    list.clear();
    expect(list.size()).to.equal(0);
  });

  it('returns toString primitive types', () => {
    expect(list.toString()).to.equal('');

    list.push(1);
    expect(list.toString()).to.equal('1');

    list.push(2);
    expect(list.toString()).to.equal('1,2');

    list.clear();
    expect(list.toString()).to.equal('');
  });

  it('returns toString primitive types: string', () => {
    const ds = new CircularLinkedList();
    ds.push('el1');
    expect(ds.toString()).to.equal('el1');

    ds.push('el2');
    expect(ds.toString()).to.equal('el1,el2');
  });

  it('returns toString objects', () => {
    const ds = new CircularLinkedList();
    expect(ds.toString()).to.equal('');

    ds.push(new MyObj(1, 2));
    expect(ds.toString()).to.equal('1|2');

    ds.push(new MyObj(3, 4));
    expect(ds.toString()).to.equal('1|2,3|4');
  });
});
