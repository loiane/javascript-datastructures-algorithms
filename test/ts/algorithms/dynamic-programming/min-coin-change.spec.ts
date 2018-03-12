import 'mocha';
import { expect } from 'chai';
import { minCoinChange } from '../../../../src/ts/index';

describe('Dynamic Programming: Min Coin Change', () => {

  it('works with amount 0', () => {
    expect(minCoinChange([1, 2, 3], 0)).to.deep.equal([]);
  });

  it('works with amount 1', () => {
    expect(minCoinChange([1, 2, 3], 1)).to.deep.equal([1]);
  });

  it('works with amount 2', () => {
    expect(minCoinChange([1, 2, 3], 2)).to.deep.equal([2]);
  });

  it('works with amount 3', () => {
    expect(minCoinChange([1, 2, 3], 3)).to.deep.equal([3]);
  });

  it('works with amount 4', () => {
    expect(minCoinChange([1, 2, 3], 4)).to.deep.equal([1, 3]);
  });

  it('works with amount 6', () => {
    expect(minCoinChange([1, 2, 3], 6)).to.deep.equal([3, 3]);
  });
});
