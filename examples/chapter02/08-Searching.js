// @ts-check

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log('numbers', numbers);

//* ** toString
console.log('numbers.toString()', numbers.toString());

console.log('numbers.indexOf(10)', numbers.indexOf(10));
console.log('numbers.indexOf(100)', numbers.indexOf(100));

numbers.push(10);
console.log('push 10: numbers.lastIndexOf(10)', numbers.lastIndexOf(10));
console.log('push 10: numbers.lastIndexOf(100)', numbers.lastIndexOf(100));

const numbersString = numbers.join('-');
console.log('numbers.join("-")', numbersString);
