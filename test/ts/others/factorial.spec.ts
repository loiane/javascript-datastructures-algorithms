import 'mocha';
import { expect } from 'chai';
import { factorialIterative, factorial } from '../../../src/ts/index';

describe('Factorial', () => {

  it('Iterative Factorial', () => {
    expect(factorialIterative(-1)).to.equal(undefined);
    expect(factorialIterative(0)).to.equal(1);
    expect(factorialIterative(1)).to.equal(1);
    expect(factorialIterative(2)).to.equal(2);
    expect(factorialIterative(3)).to.equal(6);
    expect(factorialIterative(4)).to.equal(24);
    expect(factorialIterative(5)).to.equal(120);
  });

  it('Recursive Factorial', () => {
    expect(factorial(-1)).to.equal(undefined);
    expect(factorial(0)).to.equal(1);
    expect(factorial(1)).to.equal(1);
    expect(factorial(2)).to.equal(2);
    expect(factorial(3)).to.equal(6);
    expect(factorial(4)).to.equal(24);
    expect(factorial(5)).to.equal(120);
  });
});
