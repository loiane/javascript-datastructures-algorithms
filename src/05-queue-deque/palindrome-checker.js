const Deque = require('./deque');

function isPalindrome(word) {

  if (word === undefined || word === null || (typeof word === 'string' && word.length === 0)) {
    return false;
  }

  const deque = new Deque();
  word = word.toLowerCase().replace(/\s/g, '');

  for (let i = 0; i < word.length; i++) {
    deque.addRear(word[i]);
  }

  // Check if the word is a palindrome
  while (deque.size() > 1) {
    if (deque.removeFront() !== deque.removeRear()) {
      return false;
    }
  }

  return true;
}

// Test the palindrome checker
console.log(isPalindrome("racecar")); // Output: true