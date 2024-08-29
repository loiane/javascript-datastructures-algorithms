// src/12-trie/01-spell-checker.js

const Trie = require('./trie');

class SpellChecker {
  #trie = new Trie();

  buildDictionary(words) {
    for (let word of words) {
      this.#trie.insert(word);
    }
  }

  isWordInDictionary(word) {
    return this.#trie.search(word);
  }

  getSuggestions(word) {
    const suggestions = [];
    const wordArray = word.split('');
    for (let i = 0; i < wordArray.length; i++) {
      const temp = wordArray[i];
      wordArray[i] = '';
      const newWord = wordArray.join('');
      if (this.#trie.startsWith(newWord)) {
        suggestions.push(newWord);
      }
      wordArray[i] = temp;
    }
    return suggestions;
  }

  removeWord(word) {
    return this.#trie.remove(word);
  }
}

const spellChecker = new SpellChecker();
spellChecker.buildDictionary(['cat', 'bat', 'rat', 'drat', 'dart', 'date']);
console.log(spellChecker.isWordInDictionary('bat')); // true
console.log(spellChecker.isWordInDictionary('drate')); // false
console.log(spellChecker.getSuggestions('drate')); // [ 'date', 'drat' ]


const trie = new Trie();
trie.insert('she');
trie.insert('sells');
trie.insert('sea');
trie.insert('shells');
trie.insert('by');
trie.insert('the');

// to see the output of this file use the command: node src/12-trie/01-spell-checker.js