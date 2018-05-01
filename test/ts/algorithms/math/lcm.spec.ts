import 'mocha';
import { expect } from 'chai';
import { lcm } from '../../../../src/ts/index';

describe('LCM', () => {

  it('returns the lcm between two numbers', () => {

    expect(lcm(0, 0)).to.equal(0);
    expect(lcm(1, 1)).to.equal(1);
    expect(lcm(1, 2)).to.equal(2);
    expect(lcm(2, 4)).to.equal(4);
    expect(lcm(2, 3)).to.equal(6);

  });
});
