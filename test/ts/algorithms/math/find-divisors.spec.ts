import 'mocha';
import { expect } from 'chai';
import { findDivisors } from '../../../../src/ts/index';

describe('Find Divisors', () => {

  it('returns the divisors of the number', () => {

    expect(findDivisors(-1)).to.deep.equal([]);
    expect(findDivisors(0)).to.deep.equal([]);
    expect(findDivisors(1)).to.deep.equal([1]);
    expect(findDivisors(2)).to.deep.equal([1, 2]);
    expect(findDivisors(3)).to.deep.equal([1, 3]);
    expect(findDivisors(4)).to.deep.equal([1, 2, 4]);
    expect(findDivisors(100)).to.deep.equal([1, 2, 4, 5, 10, 20, 25, 50, 100 ]);
  });
});
