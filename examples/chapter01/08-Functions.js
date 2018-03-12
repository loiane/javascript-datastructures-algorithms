// @ts-check
/* eslint-disable */

function sayHello() {
  console.log('Hello!');
}

sayHello();

/* function with parameter */
function output(text) {
  console.log(text);
}

output('Hello!');

output('Hello!', 'Other text');

output();

/* function using the return statement */
function sum(num1, num2) {
  return num1 + num2;
}

var result = sum(1, 2);
output(result);
