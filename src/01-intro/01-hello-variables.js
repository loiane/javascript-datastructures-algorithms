// Path: src/01-intro/01-hello-variables.js

// hello world
console.log('Hello, World!');

// variables
var num = 1; // {1}
num = 3; // {2}

let myVar = 2; // {3}
myVar = 4; // {4}

const price = 1.5; // {5} number
const publisher = 'Packt'; // {6} string
const javaScriptBook = true; // {7} boolean
const nullVar = null; // {8} null
let und; // {9} undefined

console.log('num: ' + num);
console.log('myVar: ' + myVar);
console.log('publisher: ' + publisher);
console.log('javaScriptBook: ' + javaScriptBook);
console.log('price: ' + price);
console.log('nullVar: ' + nullVar);
console.log('und: ' + und);

const book = {
  title: 'Data Structures and Algorithms', // {10}
}
book.title = 'Data Structures and Algorithms in JavaScript'; // {11}
// book = { anotherTitle: 'Data Structures’ } // this will not work {12}

// to see the output of this file use the command: node src/01-intro/01-hello-variables.js