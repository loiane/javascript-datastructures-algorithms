import 'mocha';
import { expect } from 'chai';
import { hanoi, hanoiStack } from '../../../src/js/others/hanoi';

describe('Tower of Hanoi', () => {
  it('Hanoi', () => {
    for (let i = 0; i < 10; i++) {
      const result = hanoi(i, 'a', 'b', 'c');
      expect(result.length).to.equal((2 ** i) - 1);
    }
  });

  it('Hanoi with Stack', () => {
    for (let i = 0; i < 10; i++) {
      const result = hanoiStack(i);
      expect(result.length).to.equal((2 ** i) - 1);
    }
  });
});
