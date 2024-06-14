// src/05-queue-deque/03-using-deque-class.js

const Deque = require('./deque');

class BrowserHistory {
  #history = new Deque(); // Stores visited pages
  #currentPage = null;

  visit(url) {
    this.#history.addFront(url);
    this.#currentPage = url;
  }

  goBack() {
    if (this.#history.size() > 1) { // Check if there's a previous page
      this.#history.removeFront();  // Remove the current page
      this.#currentPage = this.#history.peekFront(); // Set current to the previous
    }
  }

  goForward() {
    if (this.#currentPage !== this.#history.peekBack()) { // Check if there's a next page
      this.#history.addFront(this.#currentPage);  // Add the current page back
      this.#currentPage = this.#history.removeFront(); // Set current to the next page
    }
  }

  get currentPage() {
    return this.#currentPage;
  }
}

const browser = new BrowserHistory();
browser.visit('loiane.com');
browser.visit('https://loiane.com/about'); // click on About menu

browser.goBack();
console.log(browser.currentPage); // loiane.com

browser.goForward();
console.log(browser.currentPage); // https://loiane.com/about


// to see the output of this file use the command: node src/05-queue-deque/03-using-deque-class.js