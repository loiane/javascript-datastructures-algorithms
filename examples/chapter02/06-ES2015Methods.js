// @ts-check

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

//* ********* using for..of loop
for (const n of numbers) {
  console.log(`for..of loop: ${n} % 2 === 0`, n % 2 === 0 ? 'even' : 'odd');
}

//* ********* Using the new ES6 iterator (@@iterator)
console.log('Using the new ES6 iterator (@@iterator)');

let iterator = numbers[Symbol.iterator]();
console.log('iterator.next().value', iterator.next().value); // 1
console.log('iterator.next().value', iterator.next().value); // 2
console.log('iterator.next().value', iterator.next().value); // 3
console.log('iterator.next().value', iterator.next().value); // 4
console.log('iterator.next().value', iterator.next().value); // 5

// or use code below
iterator = numbers[Symbol.iterator]();
for (const n of iterator) {
  console.log(`${n} of iterator`, n);
}

//* ********* Array entries, keys and values
console.log('Array entries, keys and values');

console.log('Array.entries');
let aEntries = numbers.entries(); // retrieve iterator of key/value
console.log('aEntries.next().value', aEntries.next().value); // [0, 1] - position 0, value 1
console.log('aEntries.next().value', aEntries.next().value); // [1, 2] - position 1, value 2
console.log('aEntries.next().value', aEntries.next().value); // [2, 3] - position 2, value 3

// or use code below
aEntries = numbers.entries();
for (const n of aEntries) {
  console.log(`entry of ${n}`, n);
}

console.log('Array.keys');
const aKeys = numbers.keys(); // retrieve iterator of keys
console.log('aKeys.next()', aKeys.next()); // {value: 0, done: false } done false means iterator has more values
console.log('aKeys.next()', aKeys.next()); // {value: 1, done: false }
console.log('aKeys.next()', aKeys.next()); // {value: 2, done: false }

console.log('Array.values - Only Edge and Safari - Oct 2017');
// const aValues = numbers.values();
// console.log(aValues.next()); // {value: 1, done: false } done false means iterator has more values
// console.log(aValues.next()); // {value: 2, done: false }
// console.log(aValues.next()); // {value: 3, done: false }

//* ********* Using the from method
console.log('Using the from method');

const evens = Array.from(numbers, x => x % 2 === 0);
console.log('Array.from(numbers, x => x % 2 === 0)', evens);

const numbers2 = Array.from(numbers);
console.log('Array.from(numbers)', numbers2);

//* ********* Using Array.of
console.log('Using Array.of');

const numbers3 = Array.of(1);
const numbers4 = Array.of(1, 2, 3, 4, 5, 6);
const numbersCopy = Array.of(...numbers4);
console.log('Array.of(1)', numbers3);
console.log('Array.of(1, 2, 3, 4, 5, 6)', numbers4);
console.log('Array.of(...numbers4)', numbersCopy);

//* ********* Using the fill method
console.log('Using the fill method');

numbersCopy.fill(0);
console.log('numbersCopy.fill(0)', numbersCopy);

numbersCopy.fill(2, 1);
console.log('numbersCopy.fill(2, 1)', numbersCopy);

numbersCopy.fill(1, 3, 5);
console.log('numbersCopy.fill(1, 3, 5)', numbersCopy);

const ones = Array(6).fill(1);
console.log('Array(6).fill(1)', ones);

//* ********* Using the copyWithin method
console.log('Using the copyWithin method');

let copyArray = [1, 2, 3, 4, 5, 6];
console.log('copyArray', copyArray);

copyArray = copyArray.copyWithin(0, 3); // pos 3 value is copied to pos 0
console.log('copyArray.copyWithin(0, 3)', copyArray);

copyArray = [1, 2, 3, 4, 5, 6];
copyArray = copyArray.copyWithin(1, 3, 5); // pos 3-4 values are copied to pos 1-2
console.log('copyArray.copyWithin(1, 3, 5)', copyArray);

//* ********* methods find and findIndex
console.log('methods find and findIndex');

function multipleOf13(element) {
  return element % 13 === 0;
}

console.log('numbers.find(multipleOf13)', numbers.find(multipleOf13));
console.log('numbers.findIndex(multipleOf13)', numbers.findIndex(multipleOf13));

//* ********* EcmaScript 2016 (ES7): using the method includes
console.log('EcmaScript 2016 (ES7): using the method includes');

console.log('numbers.includes(15)', numbers.includes(15));
console.log('numbers.includes(20)', numbers.includes(20));

const numbers5 = [7, 6, 5, 4, 3, 2, 1];
console.log('numbers5.includes(4, 5)', numbers5.includes(4, 5));
