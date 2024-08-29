// https://leetcode.com/problems/design-add-and-search-words-data-structure/description/
// 211. Design Add and Search Words Data Structure

// @ts-ignore
class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.isEndOfWord = false;
    }
}

class WordDictionary {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let node = this.root;
        for (let char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        node.isEndOfWord = true;
    }

    search(word: string): boolean {
        return this.searchFromNode(word, this.root);
    }

    private searchFromNode(word: string, node: TrieNode): boolean {
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (char === '.') {
                for (let child of node.children.values()) {
                    if (this.searchFromNode(word.slice(i + 1), child)) {
                        return true;
                    }
                }
                return false;
            } else if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char)!;
        }
        return node.isEndOfWord;
    }
}