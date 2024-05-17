// Path: src/03-array/01-arrays.js

/* Arrays Intro */
const averageTempJan = 12;
const averageTempFeb = 15;
const averageTempMar = 18;
const averageTempApr = 20;
const averageTempMay = 25;

const averageTemp = [12, 15, 18, 20, 25];
// or
averageTemp[0] = 12;
averageTemp[1] = 15;
averageTemp[2] = 18;
averageTemp[3] = 20;
averageTemp[4] = 25;

console.log('averageTempJan', averageTempJan);
console.log('averageTempFeb', averageTempFeb);
console.log('averageTempMar', averageTempMar);
console.log('averageTempApr', averageTempApr);
console.log('averageTempMay', averageTempMay);

console.log('averageTemp[0]', averageTemp[0]);
console.log('averageTemp[1]', averageTemp[1]);
console.log('averageTemp[2]', averageTemp[2]);
console.log('averageTemp[3]', averageTemp[3]);
console.log('averageTemp[4]', averageTemp[4]);

/* Creating and initializing arrays */
let daysOfWeek = new Array(); // {1}
daysOfWeek = new Array(7); // {2}
daysOfWeek = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'); // {3}

// preferred
daysOfWeek = []; // {4}
daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // {5}

console.log('daysOfWeek.length', daysOfWeek.length); // output: 7

for (let i = 0; i < daysOfWeek.length; i++) {
  console.log(`daysOfWeek[${i}]`, daysOfWeek[i]);
}

/* fibonacci numbers */
// Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
const fibonacci = []; // {1}
fibonacci[1] = 1; // {2}
fibonacci[2] = 1; // {3}

// create the fibonacci sequence starting from the 3rd element
for (let i = 3; i < 20; i++) {
  fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]; // //{4}
}

// display the fibonacci sequence
for (let i = 1; i < fibonacci.length; i++) { // {5}
  console.log(`fibonacci[${i}]`, fibonacci[i]); // {6}
}

// instead of {5} and {6} we can use
console.log('fibonacci', fibonacci);

// Using the for..in loop
for (const i in fibonacci) {
  console.log(`fibonacci[${i}]`, fibonacci[i]);
}

// Using the for..of loop
for (const value of fibonacci) {
  console.log('value', value);
}

// to see the output of this file use the command: node src/03-array/01-arrays.js