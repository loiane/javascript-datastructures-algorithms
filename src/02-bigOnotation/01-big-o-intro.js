// Path: src/02-bigOnotation/01-big-o-intro.js

// O(1) - Constant Time
function secondsInDays(numberOfDays) {
  if (numberOfDays <= 0 || !Number.isInteger(numberOfDays)) { 
    throw new Error('Invalid number of days');
  }
  return 60 * 60 * 24 * numberOfDays;
}

console.log('O(1) - Constant Time');
console.log('Seconds in 1 day: ', secondsInDays(1)); // 86400
console.log('Seconds in 10 days: ', secondsInDays(10)); // 864000
console.log('Seconds in 100 days: ', secondsInDays(100)); // 8640000

// O(n) - Linear Time
function calculateTotalExpenses(monthlyExpenses) {
  let total = 0; 
  for (let i = 0; i < monthlyExpenses.length; i++) {
    total += monthlyExpenses[i];
  }
  return total;
}

console.log('*******************');
console.log('O(n) - Linear Time');
console.log('January: ', calculateTotalExpenses([100, 200, 300])); // 600
console.log('February: ', calculateTotalExpenses([200, 300, 400])); // 900
console.log('March: ', calculateTotalExpenses([30, 40, 50, 100, 50])); // 270

// O(n^2) - Quadratic Time
function calculateExpensesMatrix(monthlyExpenses) {
  let total = 0;
  for (let i = 0; i < monthlyExpenses.length; i++) {
    for (let j = 0; j < monthlyExpenses[i].length; j++) {
      total += monthlyExpenses[i][j];
    }
  }
  return total;
}

console.log('************************');
console.log('O(n^2) - Quadratic Time');
const monthlyExpenses = [
  [100, 105, 100, 115, 120, 135],
  [180, 185, 185, 185, 200, 210],
  [30, 30, 30, 30, 30, 30],
  [2000, 2000, 2000, 2000, 2000, 2000],
  [600, 620, 610, 600, 620, 600],
  [150, 100, 130, 200, 150, 100]
];
console.log('Total expenses: ', calculateExpensesMatrix(monthlyExpenses)); // 18480

// calculating the time complexity of the function calculateExpensesMatrix
function multiplicationTable(num, x) {
  let s = ''; 
  let numberOfAsterisks = num * x; 
  for (let i = 1; i <= numberOfAsterisks; i++) { 
    s += '*';
  }
  console.log(s);

  for (let i = 1; i <= num; i++) {
    console.log(`Multiplication table for ${i} with x = ${x}`);
    for (let j = 1; j <= x; j++) {
      console.log(`${i} * ${j} = `, i * j);
    }
  }
}


// to see the output of this file use the command: node src/02-bigOnotation/01-big-o-intro.js