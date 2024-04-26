// Path: src/02-bigOnotation/01-big-o-intro.js

// O(1) - Constant Time
function multiplyBy3(num) {
  console.log(`${num} * 3 = `, num * 3);
}

console.log('O(1) - Constant Time');
multiplyBy3(5);
multiplyBy3(50);

// O(n) - Linear Time
function multiplicationTable(num, x) {
  for (let i = 1; i <= x; i++) {
    console.log(`${num} * ${i} = `, num * i);
  }
}

console.log('*******************');
console.log('O(n) - Linear Time');
console.log('Multiplication table for 5 with x = 3');
multiplicationTable(5, 3);

console.log('Multiplication table for 5 with x = 10');
multiplicationTable(5, 10);

// O(n^2) - Quadratic Time
function multiplicationTable2(num, x) {
  for (let i = 1; i <= num; i++) {
    console.log(`Multiplication table for ${i} with x = ${x}`);
    for (let j = 1; j <= x; j++) {
      console.log(`${i} * ${j} = `, i * j);
    }
  }
}

console.log('************************');
console.log('O(n^2) - Quadratic Time');
multiplicationTable2(3, 2);

// O(nˆ3) - Cubic Time
function multiplicationTable3(num, x) {
  for (let i = 1; i <= num; i++) {
    for (let j = 1; j <= x; j++) {
      for (let k = 1; k <= x; k++) {
        console.log(`${i} * ${j} * ${k} = `, i * j * k);
      }
    }
  }
}

console.log('************************');
console.log('O(n^3) - Cubic Time');
multiplicationTable3(2, 3);

// calculating the time complexity of the function
function multiplicationTableRefactored(num, x) {

  let s = ''; // {1}
  let numberOfAsterisks = num * x; // {2}
  for (let i = 1; i <= numberOfAsterisks; i++) { // {3}
    s += '*';
  }
  console.log(s); // {4}
  console.log('Calculating the time complexity of a function'); // {5}

  for (let i = 1; i <= num; i++) { // {6}
    console.log(`Multiplication table for ${i} with x = ${x}`); // {7}
    for (let j = 1; j <= x; j++) { // {8}
      console.log(`${i} * ${j} = `, i * j); // {9}
    }
  }
}

multiplicationTableRefactored(3, 2); 
// to see the output of this file use the command: node src/02-bigOnotation/01-big-o-intro.js