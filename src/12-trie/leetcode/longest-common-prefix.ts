// https://leetcode.com/problems/longest-common-prefix/description/
// 14. Longest Common Prefix

function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) { return ''; }
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
    }
  }
  return prefix;
}

// @ts-ignore
class TrieNode {
  children: Map<string, TrieNodeMap> = new Map();
  isEndOfWord: boolean = false;
}

// @ts-ignore
class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
  }

  findLongestCommonPrefix(): string {
    let node = this.root;
    let prefix = '';
    while (node.children.size === 1 && !node.isEndOfWord) {
      const char = Array.from(node.children.keys())[0];
      prefix += char;
      node = node.children.get(char);
    }
    return prefix;
  }
}

function longestCommonPrefixTrie(strs: string[]): string {
  if (strs.length === 0) {
    return '';
  }

  let trie = new Trie();
  for (let str of strs) {
    trie.insert(str);
  }

  return trie.findLongestCommonPrefix();
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // 'fl'
console.log(longestCommonPrefix(['dog', 'racecar', 'car'])); // ''
