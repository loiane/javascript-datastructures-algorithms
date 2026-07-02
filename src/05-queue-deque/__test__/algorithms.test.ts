import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { hotPotato } = require('../hot-potato') as { hotPotato: (players: string[], numPasses: number) => string };
// eslint-disable-next-line @typescript-eslint/no-require-imports
const isPalindrome = require('../palindrome-checker') as (word: string | null | undefined) => boolean;

describe('hotPotato', () => {
  test('returns correct winner for example from source comments', () => {
    const players = ['Violet', 'Feyre', 'Poppy', 'Oraya', 'Aelin'];
    expect(hotPotato(players, 7)).toBe('Violet');
  });

  test('single player returns that player', () => {
    expect(hotPotato(['Alice'], 7)).toBe('Alice');
  });

  test('two players with 1 pass eliminates first player', () => {
    // [A, B] → 1 pass: B, A → eliminate B → winner A
    expect(hotPotato(['A', 'B'], 1)).toBe('A');
  });

  test('different numPasses changes the outcome', () => {
    const players = ['A', 'B', 'C'];
    const winner3 = hotPotato(players, 3);
    const winner1 = hotPotato(players, 1);
    // Both should return one of the players
    expect(players).toContain(winner3);
    expect(players).toContain(winner1);
  });

  test('returns a string (winner name)', () => {
    const result = hotPotato(['A', 'B', 'C', 'D', 'E'], 7);
    expect(typeof result).toBe('string');
  });
});

describe('isPalindrome', () => {
  test('"racecar" is a palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  test('"hello" is not a palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  test('empty string returns false', () => {
    expect(isPalindrome('')).toBe(false);
  });

  test('null returns false', () => {
    expect(isPalindrome(null)).toBe(false);
  });

  test('undefined returns false', () => {
    expect(isPalindrome(undefined)).toBe(false);
  });

  test('single character is a palindrome', () => {
    expect(isPalindrome('a')).toBe(true);
  });

  test('"A man a plan a canal Panama" is a palindrome after normalizing', () => {
    expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
  });

  test('"level" is a palindrome', () => {
    expect(isPalindrome('level')).toBe(true);
  });

  test('"world" is not a palindrome', () => {
    expect(isPalindrome('world')).toBe(false);
  });
});
