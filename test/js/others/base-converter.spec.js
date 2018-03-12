import 'mocha';
import { expect } from 'chai';
import { baseConverter, decimalToBinary } from '../../../src/js/others/base-converter';

describe('Base Converter', () => {
  it('decimalToBinary 1 -> 1', () => {
    expect(decimalToBinary(1)).to.equal('1');
  });

  it('decimalToBinary 2 -> 11', () => {
    expect(decimalToBinary(2)).to.equal('10');
  });

  it('decimalToBinary 233 -> 11101001', () => {
    expect(decimalToBinary(233)).to.equal('11101001');
  });

  it('decimalToBinary 10 -> 1010', () => {
    expect(decimalToBinary(10)).to.equal('1010');
  });

  it('decimalToBinary 1000 -> 1111101000', () => {
    expect(decimalToBinary(1000)).to.equal('1111101000');
  });

  it('baseConverter 100345, 2 -> 11000011111111001', () => {
    expect(baseConverter(100345, 2)).to.equal('11000011111111001');
  });

  it('baseConverter 100345, 8 -> 303771', () => {
    expect(baseConverter(100345, 8)).to.equal('303771');
  });

  it('baseConverter 100345, 16 -> 187F9', () => {
    expect(baseConverter(100345, 16)).to.equal('187F9');
  });

  it('baseConverter 100345, 7 -> 565360', () => {
    expect(baseConverter(100345, 7)).to.equal('565360');
  });

  it('baseConverter 100345, 20 -> CAH5', () => {
    expect(baseConverter(100345, 20)).to.equal('CAH5');
  });

  it('baseConverter 100345, 35 -> 2BW0', () => {
    expect(baseConverter(100345, 35)).to.equal('2BW0');
  });

  it('baseConverter 100345, 36 -> 25FD', () => {
    expect(baseConverter(100345, 36)).to.equal('25FD');
  });

  it('baseConverter 100345, 37 -> ', () => {
    expect(baseConverter(100345, 37)).to.equal('');
  });
});
