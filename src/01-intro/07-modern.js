// Path: src/01-intro/07-modern.js

/* Arrow function example */
const circleAreaFn = function circleArea(radius) {  
  const PI = 3.14;  
  const area = PI * radius * radius;  
  return area;  
};
console.log(circleAreaFn(2)); // 12.56

// refactoring to use arrow function
const circleArea = (radius) => {  // {1}
  const PI = 3.14;  
  return PI * radius * radius;  
};

// simplified version
const circleAreaSimp = radius => 3.14 * radius * radius;
console.log(circleAreaSimp(2)); // 12.56

// no parameters
const hello = () => console.log('hello!');
hello(); // hello!

/* Spread operator example */
const sum = (x, y, z) => x + y + z;  

const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

/* Rest operator example */
const restParamaterFunction = (x, y, ...a) => (x + y) * a.length;
console.log(restParamaterFunction(1, 2, 'hello', true, 7)); // 9

/* Exponentiation operator example */
const r = 2;
let area = 3.14 * r * r;  
area = 3.14 * Math.pow(r, 2);
area = 3.14 * r ** 2;

// to see the output of this file use the command: node src/01-intro/07-modern.js