// @ts-check
/* eslint-disable */

//* ****** EcmaScript 2015 (ES6): classes (https://goo.gl/UhK1n4)
class Book {
  constructor(title, pages, isbn) {
    this.title = title;
    this.pages = pages;
    this.isbn = isbn;
  }
  printIsbn() {
    console.log(this.isbn);
  }
}

let book = new Book('title', 'pag', 'isbn');

console.log(book.title); // outputs the book title

book.title = 'new title'; // update the value of the book title

console.log(book.title); // outputs the book title

// inheritance (https://goo.gl/hgQvo9)
class ITBook extends Book { // {1}
  constructor(title, pages, isbn, technology) {
    super(title, pages, isbn); // {2}
    this.technology = technology;
  }

  printTechnology() {
    console.log(this.technology);
  }
}

let jsBook = new ITBook(
  'Learning JS Algorithms',
  '200',
  '1234567890',
  'JavaScript'
);

console.log(jsBook.title);
console.log(jsBook.printTechnology());

// getter and setters (https://goo.gl/SMRYsv)
class Person {
  constructor(name) {
    this._name = name; // {1}
  }

  get name() { // {2}
    return this._name;
  }

  set name(value) { // {3}
    this._name = value;
  }
}

let lotrChar = new Person('Frodo');
console.log(lotrChar.name); // {4}
lotrChar.name = 'Gandalf'; // {5}
console.log(lotrChar.name);
lotrChar._name = 'Sam'; // {6}
console.log(lotrChar.name);

// using symbols for private atributes
var _name = Symbol();
class Person2 {
  constructor(name) {
    this[_name] = name;
  }

  get name() {
    return this[_name];
  }

  set name(value) {
    this[_name] = value;
  }
}

let lotrChar2 = new Person2('Frodo');
console.log(lotrChar2.name);
lotrChar2.name = 'Gandalf';
console.log(lotrChar2.name);

console.log(Object.getOwnPropertySymbols(lotrChar2));
