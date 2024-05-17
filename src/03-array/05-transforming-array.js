// Path: src/03-array/05-transforming-array.js

// @ts-ignore
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// using the map method
const squaredNumbers = numbers.map(value => value * value);
console.log('Squared numbers:', squaredNumbers); // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// rewriting the above code using a loop
const squaredNumbersLoop = [];
for (let i = 0; i < numbers.length; i++) {
  squaredNumbersLoop.push(numbers[i] * numbers[i]);
}

// using the split method
const namesFromCSV = 'Aelin,Gandalf,Violet,Poppy';
// @ts-ignore
const names = namesFromCSV.split(',');
console.log('Names:', names); // ['Aelin', 'Gandalf', 'Violet', 'Poppy']

// using the join method
const namesCSV = names.join(';');
console.log('Names CSV:', namesCSV); // 'Aelin;Gandalf;Violet;Poppy'

// using the reduce method
// @ts-ignore
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sum = numbers.reduce((acc, value) => acc + value, 0); // 55

// rewriting the above code using a loop
let sumLoop = 0;
for (let i = 0; i < numbers.length; i++) {
  sumLoop += numbers[i];
}

// using the reduce method to find the maximum value
const scores = [30, 70, 85, 90, 100];
const highestScore = scores.reduce((max, score) => score > max ? score : max, scores[0]); // 100

// using reduceRight method
const reversedNumbers = numbers.reduceRight((acc, value) => {
  acc.push(value);
  return acc;
}, []); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// to see the output of this file use the command: node src/03-array/05-transforming-array.js