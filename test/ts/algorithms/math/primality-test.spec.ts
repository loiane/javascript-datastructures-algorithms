import 'mocha';
import { expect } from 'chai';
import { isPrime, testPrime, isPrime2 } from '../../../../src/ts/index';

describe('Primality Tests', () => {

  it('returns if the number is prime or not - isPrime', () => {
    testIsPrime(isPrime);
  });

  it('returns if the number is prime or not - testPrime', () => {
    testIsPrime(testPrime);
  });

  it('returns if the number is prime or not - isPrime2', () => {
    testIsPrime(isPrime2);
  });

  function testIsPrime(primeFunction: Function) {
    expect(primeFunction(-1)).to.equal(false);
    expect(primeFunction(0)).to.equal(false);
    expect(primeFunction(1)).to.equal(false);
    expect(primeFunction(2)).to.equal(true);
    expect(primeFunction(3)).to.equal(true);
    expect(primeFunction(4)).to.equal(false);
    expect(primeFunction(5)).to.equal(true);
    expect(primeFunction(10)).to.equal(false);
    expect(primeFunction(113)).to.equal(true);
  }
});
