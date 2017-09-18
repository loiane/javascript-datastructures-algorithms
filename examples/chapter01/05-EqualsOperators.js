// @ts-check
/* eslint-disable */

// Packt == true

console.log('packt' ? true : false);
// outputs true

console.log('packt' == true);
// 1 - converts Boolean using toNumber
// 'packt' == 1
// 2 - converts String using toNumber
// NaN == 1
// outputs false

console.log('packt' == false);
// 1 - converts Boolean using toNumber
// 'packt' == 0
// 2 - converts String using toNumber
// NaN == 0
// outputs false

console.log([0] == true);
// 1 - converts Boolean using toNumber
// [0] == 1
// 2 - converts Object using toPrimitive
// 2.1 - [0].valueOf() is not primitive
// 2.2 - [0].toString is 0
// 0 == 1
// outputs false

//* ****************************** ===
console.log('packt' === true); // false

console.log('packt' === 'packt'); // true

var person1 = { name: 'John' };
var person2 = { name: 'John' };
console.log(person1 === person2); // false, different objects
