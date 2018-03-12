import 'mocha';
import { expect } from 'chai';
import Stack from '../../../src/ts/data-structures/stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it('starts empty', () => {
    expect(stack.size()).to.equal(0);
    expect(stack.isEmpty()).to.equal(true);
  });

  it('pushes elements', () => {
    stack.push(1);
    expect(stack.size()).to.equal(1);
    stack.push(2);
    expect(stack.size()).to.equal(2);
    stack.push(3);
    expect(stack.size()).to.equal(3);

    expect(stack.isEmpty()).to.equal(false);
  });

  it('pops elements', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).to.equal(3);
    expect(stack.pop()).to.equal(2);
    expect(stack.pop()).to.equal(1);
    expect(stack.pop()).to.equal(undefined);
  });

  it('implements LIFO logic', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).to.equal(3);
    expect(stack.pop()).to.equal(2);
    expect(stack.pop()).to.equal(1);
    expect(stack.pop()).to.equal(undefined);
  });

  it('allows to peek at the top element in the stack without popping it', () => {
    expect(stack.peek()).to.equal(undefined);

    stack.push(1);
    expect(stack.peek()).to.equal(1);

    stack.push(2);
    expect(stack.peek()).to.equal(2);

    stack.pop();
    expect(stack.peek()).to.equal(1);
  });

  it('returns the correct size', () => {
    expect(stack.size()).to.equal(0);
    stack.push(1);
    expect(stack.size()).to.equal(1);
    stack.push(2);
    expect(stack.size()).to.equal(2);
    stack.push(3);
    expect(stack.size()).to.equal(3);

    stack.clear();
    expect(stack.isEmpty()).to.equal(true);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.pop();
    expect(stack.size()).to.equal(2);
    stack.pop();
    expect(stack.size()).to.equal(1);
    stack.pop();
    expect(stack.size()).to.equal(0);
    stack.pop();
    expect(stack.size()).to.equal(0);
  });

  it('returns if it is empty', () => {
    expect(stack.isEmpty()).to.equal(true);
    stack.push(1);
    expect(stack.isEmpty()).to.equal(false);
    stack.push(2);
    expect(stack.isEmpty()).to.equal(false);
    stack.push(3);
    expect(stack.isEmpty()).to.equal(false);

    stack.clear();
    expect(stack.isEmpty()).to.equal(true);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.pop();
    expect(stack.isEmpty()).to.equal(false);
    stack.pop();
    expect(stack.isEmpty()).to.equal(false);
    stack.pop();
    expect(stack.isEmpty()).to.equal(true);
    stack.pop();
    expect(stack.isEmpty()).to.equal(true);
  });

  it('clears the stack', () => {
    stack.clear();
    expect(stack.isEmpty()).to.equal(true);

    stack.push(1);
    stack.push(2);

    stack.clear();
    expect(stack.isEmpty()).to.equal(true);
  });

  it('returns toString primitive types', () => {
    expect(stack.toString()).to.equal('');

    stack.push(1);
    expect(stack.toString()).to.equal('1');

    stack.push(2);
    expect(stack.toString()).to.equal('1,2');

    stack.clear();
    expect(stack.toString()).to.equal('');

    const stackString = new Stack<string>();
    stackString.push('el1');
    expect(stackString.toString()).to.equal('el1');

    stackString.push('el2');
    expect(stackString.toString()).to.equal('el1,el2');
  });

  it('returns toString objects', () => {

    class MyObj {
      constructor(public el1: any, public el2: any) { }
      toString() {
        return `${this.el1.toString()}|${this.el2.toString()}`;
      }
    }
    const stackMyObj = new Stack<MyObj>();
    expect(stackMyObj.toString()).to.equal('');

    stackMyObj.push(new MyObj(1, 2));
    expect(stackMyObj.toString()).to.equal('1|2');

    stackMyObj.push(new MyObj(3, 4));
    expect(stackMyObj.toString()).to.equal('1|2,3|4');
  });
});
