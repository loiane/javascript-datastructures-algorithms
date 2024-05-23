import { describe, expect, test } from '@jest/globals';
import decimalToBinary from '../decimal-to-binary';

describe('decimalToBinary', () => {
  test('should convert decimal number 0 to binary', () => {
    expect(decimalToBinary(0)).toBe('0');
  });

  test('should convert decimal number 1 to binary', () => {
    expect(decimalToBinary(1)).toBe('1');
  });

  test('should convert decimal number 10 to binary', () => {
    expect(decimalToBinary(10)).toBe('1010');
  });

  test('should convert decimal number 15 to binary', () => {
    expect(decimalToBinary(15)).toBe('1111');
  });

  test('should convert decimal number 100 to binary', () => {
    expect(decimalToBinary(100)).toBe('1100100');
  });

  test('should convert decimal number 255 to binary', () => {
    expect(decimalToBinary(255)).toBe('11111111');
  });
});