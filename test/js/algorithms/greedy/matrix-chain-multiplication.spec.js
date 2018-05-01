import 'mocha';
import { expect } from 'chai';
import { matrixChainOrderGreedy } from '../../../../src/js/index';

describe('Matrix Chain Multiplication', () => {

  it('works with DP approach', () => {
    const p = [10, 100, 5, 50, 1];

    expect(matrixChainOrderGreedy(p)).to.equal(1750);
  });
});
