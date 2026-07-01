import {describe, expect, test, beforeEach} from '@jest/globals';
import Trie from '../trie';

describe('Trie', () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie();
  });

  test('should return false for search on empty trie', () => {
    expect(trie.search('hello')).toBe(false);
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

  test('should remove an existing word so search returns false', () => {
    trie.insert('hello');
    trie.remove('hello');
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

  test('should keep startsWith working after removing a word that shares a prefix', () => {
    trie.insert('car');
    trie.insert('card');
    trie.remove('card');
    expect(trie.search('card')).toBe(false);
    expect(trie.search('car')).toBe(true);
    expect(trie.startsWith('car')).toBe(true);
  });
});
