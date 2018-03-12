// @ts-check
/* eslint-disable */

const area = require('./lib/17-CalcArea');
const Book = require('./lib/17-Book');

console.log(area.circle(2));
console.log(area.square(2));

const myBook = new Book('some title');
myBook.printTitle();
