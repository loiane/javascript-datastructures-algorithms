// src/04-stack/decimal-to-binary.js

const Stack = require('./stack'); 

/**
 * Converts a decimal number to binary
 * @param {number} decimalNumber - decimal number to be converted
 * @returns {string} binary representation of the decimal number
 */
function decimalToBinary(decimalNumber) {
  const remainderStack = new Stack();
  let binaryString = '';

  if (decimalNumber === 0) {
    return '0';
  }

  while (decimalNumber > 0) { 
    const remainder = Math.floor(decimalNumber % 2); 
    remainderStack.push(remainder); 
    decimalNumber = Math.floor(decimalNumber / 2); 
  }

  while (!remainderStack.isEmpty()) { 
    binaryString += remainderStack.pop().toString();
  }

  return binaryString;
}

module.exports = decimalToBinary;