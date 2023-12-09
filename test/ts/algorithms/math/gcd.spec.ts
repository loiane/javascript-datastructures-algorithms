import 'mocha';
import { expect } from 'chai';
import { gcd } from '../../../../src/ts/index';

describe('GCD', () => {
  it('returns the correct GCD for positive numbers', () => {
    expect(gcd(8, 12)).to.equal(4);
    expect(gcd(15, 25)).to.equal(5);
    expect(gcd(21, 28)).to.equal(7);
  });

  it('returns the correct GCD for negative numbers', () => {
    expect(gcd(-8, 12)).to.equal(4);
    expect(gcd(15, -25)).to.equal(5);
    expect(gcd(-21, -28)).to.equal(7);
  });

  it('returns the correct GCD when one of the numbers is 0', () => {
    expect(gcd(0, -12)).to.equal(12);
    expect(gcd(15, 0)).to.equal(15);
  });

  it('returns 1 for co-prime numbers', () => {
    expect(gcd(7, 22)).to.equal(1);
    expect(gcd(11, 28)).to.equal(1);
    expect(gcd(9, 16)).to.equal(1);
  });
});
