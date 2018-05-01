import 'mocha';
import { expect } from 'chai';
import { knapSack } from '../../../../src/ts/index';

describe('KnapSack Dynamic Programming', () => {

  it('works with DP approach', () => {
    const values = [3, 4, 5];
    const weights = [2, 3, 4];
    const capacity = 5;
    const n = values.length;

    expect(knapSack(capacity, weights, values, n)).to.equal(7);
  });
});
