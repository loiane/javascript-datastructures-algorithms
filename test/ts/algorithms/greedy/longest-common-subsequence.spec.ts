import 'mocha';
import { expect } from 'chai';
import { lcsRecursive } from '../../../../src/ts/index';

describe('LCS Greedy', () => {

  it('works with Greedy approach', () => {
    const wordX = 'acbaed';
    const wordY = 'abcadf';

    expect(lcsRecursive(wordX, wordY)).to.equal(4);
  });
});
