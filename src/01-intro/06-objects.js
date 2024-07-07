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

  #percentagePerSale = 0.12; 

  constructor(title, pages, isbn) { 
    this.title = title;
    this.pages = pages;
    this.isbn = isbn;
  }

  get price() {
    return this.pages * this.#percentagePerSale;
  }

  static copiesSold = 0; 
  static sellCopy() {
    this.copiesSold++;
  }

  printIsbn() {
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

class Ebook extends Book { 
  constructor(title, pages, isbn, format) {
    super(title, pages, isbn); 
    this.format = format; 
  }
  printIsbn() {
    console.log('Ebook ISBN:',this.isbn);
  }
}
Ebook.sellCopy();
console.log(Ebook.copiesSold); // 3

const myBook = new Book('title', 400, 'isbn');
myBook.printIsbn(); // isbn
const myEbook = new Ebook('Data Structures Ebook', 400, 'isbn 123', 'pdf');
myEbook.printIsbn(); // Ebook ISBN: isbn 123


// to see the output of this file use the command: node src/01-intro/06-objects.js
