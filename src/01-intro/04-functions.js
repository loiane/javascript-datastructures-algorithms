//  Path: src/01-intro/04-functions.js

function sayHello(name) {
  console.log('Hello! ', name);
}

sayHello('Packt'); // Hello! Packt 

/* function using the return statement */
function sum(num1, num2) {
    return num1 + num2;
}

var result = sum(1, 2);
console.log(result); // outputs 3

/* function with default parameter */
function sumDefault(num1, num2 = 2) { // num2 has a default value
    return num1 + num2;
}
console.log(sumDefault(1)); // outputs 3
console.log(sumDefault(1, 3)); // outputs 4

// to see the output of this file use the command: node src/01-intro/04-functions.js