import 'mocha';
import { expect } from 'chai';
import { knapSackRecursive } from '../../../../src/js/index';

describe('KnapSack Dynamic Programming - Recursive', () => {

  it('works with recursive approach', () => {
    const values = [3, 4, 5];
    const weights = [2, 3, 4];
    const capacity = 5;
    const n = values.length;

    expect(knapSackRecursive(capacity, weights, values, n)).to.equal(7);
  });
});
