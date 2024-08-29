class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  #root = new TrieNode();

  insert(word) {
    let node = this.#root;
    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.#root;
    for (let char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.#root;
    for (let char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    return true;
  }

  remove(word) {
    return this.#removeWord(this.#root, word, 0);
  }

  #removeWord(node, word, index) {
    if (index === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = word[index];
    if (!node.children.has(char)) {
      return false;
    }

    const shouldDeleteCurrentNode = this.#removeWord(node.children.get(char), word, index + 1);
    if (shouldDeleteCurrentNode) {
      node.children.delete(char);
      return node.children.size === 0;
    }

    return false;
  }
}

module.exports = Trie;