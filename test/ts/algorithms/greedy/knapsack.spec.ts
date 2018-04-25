import 'mocha';
import { expect } from 'chai';
import { knapSackGreedy } from '../../../../src/ts/index';

describe('Min Coin Change Greedy', () => {
  const SIZE = 100;

  it('works with greedy approach', () => {
    const values = [3, 4, 5];
    const weights = [2, 3, 4];
    const capacity = 5;

    expect(knapSackGreedy(capacity, weights, values)).to.equal(7);
  });
});
