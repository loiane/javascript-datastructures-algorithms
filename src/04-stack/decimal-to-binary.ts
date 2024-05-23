// src/04-stack/decimal-to-binary.js

import Stack from './stack';

/**
 * Converts a decimal number to binary
 * @param {number} decimalNumber - decimal number to be converted
 * @returns {string} binary representation of the decimal number
 */
function decimalToBinary(decimalNumber: number) {
  const remainderStack = new Stack<number>();
  let binaryString = '';

  if (decimalNumber === 0) {
    return '0';
  }

  while (decimalNumber > 0) { // {1}
    const remainder = Math.floor(decimalNumber % 2); // {2}
    remainderStack.push(remainder); // {3}
    decimalNumber = Math.floor(decimalNumber / 2); // {4}
  }

  while (!remainderStack.isEmpty()) { // {5}
    binaryString += remainderStack.pop().toString();
  }

  return binaryString;
}

export default decimalToBinary;