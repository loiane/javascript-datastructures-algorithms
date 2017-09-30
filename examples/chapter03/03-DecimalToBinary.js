const decimalToBinary = PacktDataStructuresAlgorithms.parenthesesChecker;
const baseConverter = PacktDataStructuresAlgorithms.baseConverter;

// 233 == 11101001
// 2x(10x10) + 3x(10) + 3x(1)
console.log(decimalToBinary(233));
console.log(decimalToBinary(10));
console.log(decimalToBinary(1000));

console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));
