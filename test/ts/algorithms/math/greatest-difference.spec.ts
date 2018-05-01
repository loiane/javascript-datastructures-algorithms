import 'mocha';
import { expect } from 'chai';
import { greatestDifference } from '../../../../src/ts/index';

describe('Greatest Difference', () => {

  it('returns the gcd between two numbers', () => {

    expect(greatestDifference([5, 6, 7, 2, 10])).to.equal(8);
    expect(greatestDifference([1, 2, 4])).to.equal(3);
    expect(greatestDifference([1, 3])).to.equal(2);

  });
});
