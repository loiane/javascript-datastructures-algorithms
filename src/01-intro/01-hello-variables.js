// Path: src/01-intro/01-hello-variables.js

// hello world
console.log('Hello, World!');

// variables
var num = 1; 
num = 'one' ; 

let myVar = 2; 
myVar = 4; 

const price = 1.5; // number
const publisher = 'Packt'; // string
const javaScriptBook = true; // boolean
const nullVar = null; // null
let und; // undefined

console.log('price: ' + price); 
console.log('publisher: ' + publisher);
console.log('javaScriptBook: ' + javaScriptBook);
console.log('nullVar: ' + nullVar);
console.log('und: ' + und);

console.log('**** Data types ****');

console.log('typeof price: ', typeof price); // number
console.log('typeof publisher: ', typeof publisher); // string
console.log('typeof javaScriptBook: ', typeof javaScriptBook); // boolean
console.log('typeof nullVar: ', typeof nullVar); // object
console.log('typeof und: ', typeof und); // undefined

const book = {
  title: 'Data Structures and Algorithms', 
}

console.log('book title: ', book.title);

book.title = 'Data Structures and Algorithms in JavaScript'; 
// book = { anotherTitle: 'Data Structures’ } // this will not work

// reassignment of objects:
let book2 = {
  title: 'Data Structures and Algorithms', 
}
book2 = { title: 'Data Structures' };

// symbol
const title = Symbol('title');
const book3 = {
  [title]: 'Data Structures and Algorithms'
};
console.log(book3[title]); // Data Structures and Algorithms

// to see the output of this file use the command: node src/01-intro/01-hello-variables.js