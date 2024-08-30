// src/04-stack/decimal-to-base.js

const Stack = require('./stack'); 

/**
 * Converts a decimal number to a given base
 * @param {number} decimalNumber - decimal number to be converted
 * @param {number} base - base to convert the decimal number to
 * @returns {string} base representation of the decimal number
 */
function decimalToBase(decimalNumber, base) {

  if (base < 2 || base > 36) {
    throw new Error('Base must be between 2 and 36');
  }

  if (decimalNumber === 0) { return '0'; }

  if (decimalNumber < 0) {
    throw new Error('Negative numbers are not supported');
  }

  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Digits for base 36
  const remainderStack = new Stack();
  let baseString = '';

  while (decimalNumber > 0) {
    const remainder = Math.floor(decimalNumber % base);
    remainderStack.push(remainder);
    decimalNumber = Math.floor(decimalNumber / base);
  }

  while (!remainderStack.isEmpty()) {
    baseString += digits[remainderStack.pop()]; // Use digit mapping
  }

  return baseString;
}

/**
 * Converts a decimal number to a given base
 * @param {number} decimalNumber - decimal number to be converted (between 2 and 36 or 64)
 * @param {number} base - base to convert the decimal number to
 * @returns {string} base representation of the decimal number
 */
function decimalToBase64(decimalNumber, base) {
  if (base < 2 || (base > 36 && base !== 64)) {
    throw new Error('Base must be between 2 and 36 or 64');
  }

  const digits = base === 64 ?
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/' :
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const remainderStack = new Stack();
  let baseString = '';

  while (decimalNumber > 0) {
    const remainder = Math.floor(decimalNumber % base);
    remainderStack.push(remainder);
    decimalNumber = Math.floor(decimalNumber / base);
  }

  while (!remainderStack.isEmpty()) {
    baseString += digits[remainderStack.pop()];
  }

  // Handle padding for Base64 (if necessary)
  /* Base64 encodes data in groups of 3 bytes (24 bits). 
  Each group is represented by four Base64 characters (6 bits per character). 
  If the input data length isn't divisible by 3, padding characters (=) are added to the end of the output 
  to ensure that the total length is a multiple of 4. 
  This is important for proper decoding of the Base64 string back to its original data. */
  if (base === 64) {
    while (baseString.length % 4 !== 0) {
      baseString += '=';
    }
  }

  return baseString;
}

module.exports = { decimalToBase, decimalToBase64 };