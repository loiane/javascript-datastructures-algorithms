import 'mocha';
import { expect } from 'chai';
import { matrixChainOrder } from '../../../../src/ts/index';

describe('Matrix Chain Multiplication', () => {

  it('works with DP approach', () => {
    const p = [10, 100, 5, 50, 1];

    expect(matrixChainOrder(p)).to.equal(1750);
  });
});
