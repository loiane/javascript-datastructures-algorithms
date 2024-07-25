// src/08-dictionary-hash/01-using-dictionary-class.js

const Dictionary = require('./dictionary');

const translations = new Dictionary();

// Add some translations - English to Portuguese
translations.set("hello", "olá"); 
translations.set("thank you", "obrigado");
translations.set("book", "livro");  
translations.set("cat", "gato"); 
translations.set("computer", "computador");

// User interaction
function translateWord(word) {
  if (translations.hasKey(word)) {
    const translation = translations.get(word);
    console.log(`The translation of "${word}" is "${translation}"`);
  } else {
    console.log(`Sorry, no translation found for "${word}"`);
  }
}

// Example usage
translateWord("hello"); // Output: The translation of "hello" is "olá"
translateWord("dog");  // Output: Sorry, no translation found for "dog"

// Get all translations
console.log("All translations:", translations.values());
// All translations: [ 'olá', 'obrigado', 'livro', 'gato', 'computador' ]

// Get all words
console.log("All words:", translations.keys());
// All words: [ 'hello', 'thank you', 'book', 'cat', 'computer' ]

// Iterate through all translations
translations.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});


// to see the output of this file use the command: node src/08-dictionary-hash/01-using-dictionary-class.js