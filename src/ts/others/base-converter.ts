import Stack from '../data-structures/stack';

export function decimalToBinary(decNumber: number) {
  const remStack = new Stack();
  let rem: number;
  let binaryString = '';

  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}

export function baseConverter(decNumber: number, base: number) {
  const remStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rem: number;
  let baseString = '';

  if (!(base >= 2 && base <= 36)) {
    return '';
  }

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }

  return baseString;
}
