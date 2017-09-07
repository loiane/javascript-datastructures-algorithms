import { expect } from 'chai';
import hello from './../../lib/js/app';

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = hello();

    expect(result).to.equal('Hello World!');
  });
});
