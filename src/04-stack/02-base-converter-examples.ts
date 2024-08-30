// src/04-stack/03-base-converter-examples.ts

import decimalToBinary from './decimal-to-binary';
import { decimalToBase, decimalToBase64 } from './decimal-to-base';

// Decimal to binary
console.log(decimalToBinary(0)); // 0
console.log(decimalToBinary(1)); // 1
console.log(decimalToBinary(2)); // 10
console.log(decimalToBinary(13)); // 1101
console.log(decimalToBinary(233)); // 11101001
console.log(decimalToBinary(10)); // 1010
console.log(decimalToBinary(1000)); // 1111101000

// Decimal to base
console.log(decimalToBase(100345, 2)); // 11000011111111001 
console.log(decimalToBase(100345, 8)); // 303771 
console.log(decimalToBase(100345, 16)); // 187F9 
console.log(decimalToBase(100345, 35)); // 2BW0 

// Decimal to base 64
console.log(decimalToBase64(100345, 64)); // Yf5=

// to see the output of this file use the command: npx ts-node src/04-stack/03-base-converter-examples.js