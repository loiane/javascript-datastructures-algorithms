import 'mocha';
import { expect } from 'chai';
import { parenthesesChecker } from '../../../src/js/others/balanced-symbols';

describe('Balanced Symbols', () => {
  it('empty to be falsy', () => {
    expect(parenthesesChecker('')).to.equal(true);
  });

  it('{ to be falsy', () => {
    expect(parenthesesChecker('{')).to.equal(false);
  });

  it('} to be falsy', () => {
    expect(parenthesesChecker('}')).to.equal(false);
  });

  it('11 to be falsy', () => {
    expect(parenthesesChecker('11')).to.equal(false);
  });

  it('{11 to be falsy', () => {
    expect(parenthesesChecker('{11')).to.equal(false);
  });

  it('{([1])} to be falsy', () => {
    expect(parenthesesChecker('{([1])}')).to.equal(false);
  });

  it('{([])} to be truthy', () => {
    expect(parenthesesChecker('{([])}')).to.equal(true);
  });

  it('{{([][])}()} to be truthy', () => {
    expect(parenthesesChecker('{{([][])}()}')).to.equal(true);
  });

  it('[{()] to be falsy', () => {
    expect(parenthesesChecker('[{()]')).to.equal(false);
  });
});
