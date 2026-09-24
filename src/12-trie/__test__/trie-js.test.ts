import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Trie = require('../trie.js') as new () => {
  insert(word: string): void;
  search(word: string): boolean;
  startsWith(prefix: string): boolean;
  remove(word: string): boolean;
};

describe('Trie (trie.js)', () => {
  let trie: InstanceType<typeof Trie>;

  beforeEach(() => {
    trie = new Trie();
  });

  test('should return false for search on empty trie', () => {
    expect(trie.search('hello')).toBe(false);
  });

  test('should return false for startsWith on empty trie', () => {
    expect(trie.startsWith('h')).toBe(false);
  });

  test('should insert and search a word', () => {
    trie.insert('hello');
    expect(trie.search('hello')).toBe(true);
  });

  test('should return false for a word that does not exist', () => {
    trie.insert('hello');
    expect(trie.search('world')).toBe(false);
  });

  test('should return false when searching a prefix that is not a full word', () => {
    trie.insert('hello');
    expect(trie.search('hell')).toBe(false);
  });

  test('should return true for startsWith with an existing prefix', () => {
    trie.insert('hello');
    expect(trie.startsWith('hel')).toBe(true);
  });

  test('should return false for startsWith with a non-existing prefix', () => {
    trie.insert('hello');
    expect(trie.startsWith('xyz')).toBe(false);
  });

  test('should return true for startsWith when the full word is the prefix', () => {
    trie.insert('hello');
    expect(trie.startsWith('hello')).toBe(true);
  });

  test('should insert multiple words with shared prefix', () => {
    trie.insert('car');
    trie.insert('card');
    trie.insert('care');
    expect(trie.search('car')).toBe(true);
    expect(trie.search('card')).toBe(true);
    expect(trie.search('care')).toBe(true);
    expect(trie.startsWith('car')).toBe(true);
    expect(trie.search('ca')).toBe(false);
  });

  test('inserting the same word twice keeps it searchable', () => {
    trie.insert('hello');
    trie.insert('hello');
    expect(trie.search('hello')).toBe(true);
  });

  test('search and startsWith on empty string', () => {
    expect(trie.search('')).toBe(false);
    trie.insert('');
    expect(trie.search('')).toBe(true);
    expect(trie.startsWith('')).toBe(true);
  });

  test('should remove an existing word so search returns false', () => {
    trie.insert('hello');
    expect(trie.remove('hello')).toBe(true);
    expect(trie.search('hello')).toBe(false);
  });

  test('should remove a word that is a prefix of another without affecting the longer word', () => {
    trie.insert('car');
    trie.insert('card');
    trie.remove('car');
    expect(trie.search('car')).toBe(false);
    expect(trie.search('card')).toBe(true);
  });

  test('should return false when removing a non-existent word', () => {
    trie.insert('hello');
    expect(trie.remove('world')).toBe(false);
  });

  test('should return false when removing a word not present with a divergent path', () => {
    trie.insert('hello');
    expect(trie.remove('help')).toBe(false);
    expect(trie.search('hello')).toBe(true);
  });

  test('should keep startsWith working after removing a word that shares a prefix', () => {
    trie.insert('car');
    trie.insert('card');
    trie.remove('card');
    expect(trie.search('card')).toBe(false);
    expect(trie.search('car')).toBe(true);
    expect(trie.startsWith('car')).toBe(true);
  });

  test('removing a leaf word cleans up unshared nodes so unrelated prefixes are unaffected', () => {
    trie.insert('cat');
    trie.insert('dog');
    trie.remove('cat');
    expect(trie.search('cat')).toBe(false);
    expect(trie.startsWith('cat')).toBe(false);
    expect(trie.search('dog')).toBe(true);
  });

  test('removing from an empty trie returns false', () => {
    expect(trie.remove('anything')).toBe(false);
  });

  test('removing a word twice returns false the second time', () => {
    trie.insert('hello');
    expect(trie.remove('hello')).toBe(true);
    expect(trie.remove('hello')).toBe(false);
  });
});
