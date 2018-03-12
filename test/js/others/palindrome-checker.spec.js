import 'mocha';
import { expect } from 'chai';
import { palindromeChecker } from '../../../src/js/others/palindrome-checker';

describe('Palindrome', () => {
  it('Palindrome Checker', () => {
    expect(palindromeChecker('')).to.equal(false);
    expect(palindromeChecker('a')).to.equal(true);
    expect(palindromeChecker('aa')).to.equal(true);
    expect(palindromeChecker('aba')).to.equal(true);
    expect(palindromeChecker('ab')).to.equal(false);
    expect(palindromeChecker('kayak')).to.equal(true);
    expect(palindromeChecker('radar')).to.equal(true);
    expect(palindromeChecker('level')).to.equal(true);
    expect(palindromeChecker('Was it a car or a cat I saw')).to.equal(true);
    expect(palindromeChecker('Step on no pets')).to.equal(true);
    expect(palindromeChecker('Able was I ere I saw Elba')).to.equal(true);
  });
});
