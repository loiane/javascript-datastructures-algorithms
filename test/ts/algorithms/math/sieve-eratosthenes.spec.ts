import 'mocha';
import { expect } from 'chai';
import { sieveOfEratosthenes } from '../../../../src/ts/index';

describe('Sieve Of Eratosthene', () => {

  it('returns the prime numbers', () => {

    expect(sieveOfEratosthenes(0)).to.deep.equal([]);
    expect(sieveOfEratosthenes(1)).to.deep.equal([]);
    expect(sieveOfEratosthenes(2)).to.deep.equal([2]);
    expect(sieveOfEratosthenes(3)).to.deep.equal([2, 3]);
    expect(sieveOfEratosthenes(4)).to.deep.equal([2, 3]);
    expect(sieveOfEratosthenes(5)).to.deep.equal([2, 3, 5]);

  });
});
