// Path: src/01-intro/06-objects.js

/* Object example */
let obj = new Object();
obj = {};
obj = {
  name: {
    first: 'Gandalf',
    last: 'the Grey'
  },
  address: 'Middle Earth'
};


/* Class example */
class Book {

  #percentagePerSale = 0.12; // {1}

  constructor(title, pages, isbn) { 
    this.title = title; // {2}
    this.pages = pages;
    this.isbn = isbn;
  }

  get price() { // {3}
    return this.pages * this.#percentagePerSale;
  }

  static copiesSold = 0; // {4}
  static sellCopy() { // {5}
    this.copiesSold++;
  }

  printIsbn() { // {6}
    console.log(this.isbn);
  }
}

let myBook = new Book('title', 400, 'isbn');

console.log(myBook.title); // outputs the book title
myBook.title = 'new title'; // update the value of the book title
console.log(myBook.title); // outputs the updated value: new title

console.log(myBook.price); // 48

console.log(Book.copiesSold); // 0
Book.sellCopy();
console.log(Book.copiesSold); // 1

Book.sellCopy();
console.log(Book.copiesSold); // 2

class Ebook extends Book { // {7}
  constructor(title, pages, isbn, format) {
    super(title, pages, isbn); // {8}
    this.format = format; // {9}
  }
}
Ebook.sellCopy(); // {10}
console.log(Ebook.copiesSold); // {11} 3

// to see the output of this file use the command: node src/01-intro/06-objects.js
