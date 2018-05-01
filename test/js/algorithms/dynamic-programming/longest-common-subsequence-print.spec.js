import 'mocha';
import { expect } from 'chai';
import { lcsPrint } from '../../../../src/js/index';

describe('LCS Dynamic Programming with print solution', () => {

  it('works with DP approach with print solution', () => {
    const wordX = 'acbaed';
    const wordY = 'abcadf';

    expect(lcsPrint(wordX, wordY)).to.equal('acad');
  });
});
