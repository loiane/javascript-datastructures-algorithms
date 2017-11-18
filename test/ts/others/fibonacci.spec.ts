import 'mocha';
import { expect } from 'chai';
import { fibonacci, fibonacciIterative, fibonacciMemoization } from '../../../src/ts/index';

describe('Fibonacci', () => {

  it('Fibonacci Recursive', () => {
    expect(fibonacci(-1)).to.equal(0);
    expect(fibonacci(0)).to.equal(0);
    expect(fibonacci(1)).to.equal(1);
    expect(fibonacci(2)).to.equal(1);
    expect(fibonacci(3)).to.equal(2);
    expect(fibonacci(4)).to.equal(3);
  });

  it('Fibonacci Iterative', () => {
    expect(fibonacciIterative(-1)).to.equal(0);
    expect(fibonacciIterative(0)).to.equal(0);
    expect(fibonacciIterative(1)).to.equal(1);
    expect(fibonacciIterative(2)).to.equal(1);
    expect(fibonacciIterative(3)).to.equal(2);
    expect(fibonacciIterative(4)).to.equal(3);
  });

  it('Fibonacci with Memoization', () => {
    expect(fibonacciMemoization(-1)).to.equal(0);
    expect(fibonacciMemoization(0)).to.equal(0);
    expect(fibonacciMemoization(1)).to.equal(1);
    expect(fibonacciMemoization(2)).to.equal(1);
    expect(fibonacciMemoization(3)).to.equal(2);
    expect(fibonacciMemoization(4)).to.equal(3);
  });

});
