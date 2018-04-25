import 'mocha';
import { expect } from 'chai';
import { minCoinChangeGreedy } from '../../../../src/ts/index';

describe('Min Coin Change Greedy', () => {

  const SIZE = 100;

  it('works with greedy approach', () => {
    expect(minCoinChangeGreedy([1, 5, 10], 15)).to.deep.equal([10, 5]);
    expect(minCoinChangeGreedy([1, 3, 4], 6)).to.deep.equal([4, 1, 1]);
  });

});
