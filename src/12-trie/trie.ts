class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Inserts a word into the trie.
   * @param word - The word to insert
   * @complexity Time O(m) where m = word length | Space O(m)
   */
  insert(word: string): void {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  /**
   * Returns true if the exact word is present in the trie.
   * @param word - The word to search for
   * @returns Whether the word exists
   * @complexity Time O(m) | Space O(1)
   */
  search(word: string): boolean {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  /**
   * Returns true if any word in the trie starts with the given prefix.
   * @param prefix - The prefix to check
   * @returns Whether any word has this prefix
   * @complexity Time O(m) | Space O(1)
   */
  startsWith(prefix: string): boolean {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return true;
  }

  /**
   * Removes a word from the trie.
   * @param word - The word to delete
   * @returns true if the word was found and removed, false otherwise
   * @complexity Time O(m) | Space O(m) call stack
   */
  remove(word: string): boolean {
    return this.#removeWord(this.root, word, 0);
  }

  #removeWord(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = word[index];
    if (!node.children.has(char)) {
      return false;
    }

    const shouldDeleteCurrentNode = this.#removeWord(node.children.get(char)!, word, index + 1);
    if (shouldDeleteCurrentNode) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }
}

export default Trie;