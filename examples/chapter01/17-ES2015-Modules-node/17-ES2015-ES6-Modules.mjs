import * as area from './17-CalcArea.mjs';
import Book from './17-Book.mjs';

console.log(area.circle(2));
console.log(area.square(2));

const myBook = new Book('some title');
myBook.printTitle();
