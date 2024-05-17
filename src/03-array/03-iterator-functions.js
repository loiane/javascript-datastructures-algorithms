// Path: src/03-array/03-iterator-functions.js

// @ts-ignore
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// using forEach method
numbers.forEach((value, index) => {
  console.log(`numbers[${index}]`, value);
});

numbers.forEach(value => console.log(value));

// using every method
const isBelowSeven = numbers.every(value => value < 7);
console.log('All values are below 7?:', isBelowSeven); // false

// rewriting the preceding code using for loop
let isBelowSevenForLoop = true;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] >= 7) {
    isBelowSevenForLoop = false;
    break;
  }
}
console.log('All values are below 7?:', isBelowSevenForLoop); // false

// using some method
const isSomeValueBelowSeven = numbers.some(value => value < 7);
console.log('Is any value below 7?:', isSomeValueBelowSeven); // true

// rewriting the preceding code using for loop
let isSomeValueBelowSevenForLoop = false;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] < 7) {
    isSomeValueBelowSevenForLoop = true;
    break;
  }
}

// using filter method
// @ts-ignore
const valuesBelowSeven = numbers.filter(value => value < 7);
console.log('Values below 7:', valuesBelowSeven); // [1, 2, 3, 4, 5, 6]

// to see the output of this file use the command: node src/03-array/03-iterator-functions.js