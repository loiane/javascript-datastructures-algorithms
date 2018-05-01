import 'mocha';
import { expect } from 'chai';
import { gcd } from '../../../../src/ts/index';

describe('GCD', () => {

  it('returns the gcd between two numbers', () => {

    expect(gcd(1, 0)).to.equal(0);
    expect(gcd(1, 1)).to.equal(1);
    expect(gcd(2, 2)).to.equal(2);
    expect(gcd(2, 4)).to.equal(2);
    expect(gcd(2, 3)).to.equal(1);
    expect(gcd(10, 1000)).to.equal(10);
  });
});
