import {describe, expect, test, beforeEach} from '@jest/globals';
import HashTable from '../hash-table';

describe('HashTable', () => {
  let hashTable: HashTable<string>;

  beforeEach(() => {
    hashTable = new HashTable<string>();
  });

  test('should put and get a value', () => {
    hashTable.put('name', 'Alice');
    expect(hashTable.get('name')).toBe('Alice');
  });

  test('should return undefined for a non-existent key', () => {
    expect(hashTable.get('missing')).toBeUndefined();
  });

  test('should update an existing key with put', () => {
    hashTable.put('name', 'Alice');
    hashTable.put('name', 'Bob');
    expect(hashTable.get('name')).toBe('Bob');
  });

  test('should handle collision with separate chaining', () => {
    // 'Jonathan' and 'Jamie' both hash to 5 with loseLose % 37
    expect(hashTable.hash('Jonathan')).toBe(5);
    expect(hashTable.hash('Jamie')).toBe(5);

    hashTable.put('Jonathan', 'Lannister');
    hashTable.put('Jamie', 'Lannister');

    expect(hashTable.get('Jonathan')).toBe('Lannister');
    expect(hashTable.get('Jamie')).toBe('Lannister');
  });

  test('should update colliding key without affecting the other', () => {
    hashTable.put('Jonathan', 'old');
    hashTable.put('Jamie', 'Lannister');
    hashTable.put('Jonathan', 'new');

    expect(hashTable.get('Jonathan')).toBe('new');
    expect(hashTable.get('Jamie')).toBe('Lannister');
  });

  test('should remove an existing key and return true', () => {
    hashTable.put('name', 'Alice');
    expect(hashTable.remove('name')).toBe(true);
    expect(hashTable.get('name')).toBeUndefined();
  });

  test('should return false when removing a non-existent key', () => {
    expect(hashTable.remove('missing')).toBe(false);
  });

  test('should remove one colliding key and keep the other accessible', () => {
    hashTable.put('Jonathan', 'Lannister');
    hashTable.put('Jamie', 'Lannister');

    expect(hashTable.remove('Jonathan')).toBe(true);
    expect(hashTable.get('Jonathan')).toBeUndefined();
    expect(hashTable.get('Jamie')).toBe('Lannister');
  });

  test('should produce correct toString output', () => {
    hashTable.put('Jonathan', 'Lannister');
    hashTable.put('Jamie', 'Lannister');
    const result = hashTable.toString();
    expect(result).toBe('{5 => [Jonathan: Lannister, Jamie: Lannister]}');
  });

  test('should produce multi-bucket toString output', () => {
    hashTable.put('name', 'Alice');   // hash('name') = ?
    hashTable.put('Jonathan', 'Jon'); // hash = 5
    const result = hashTable.toString();
    expect(result).toContain('Jonathan: Jon');
    expect(result).toContain('name: Alice');
  });

  test('hash function returns consistent results', () => {
    expect(hashTable.hash('Jonathan')).toBe(5);
    expect(hashTable.hash('Jamie')).toBe(5);
    expect(hashTable.hash('Tyrion')).toBe(16);
    expect(hashTable.hash('Aaron')).toBe(16);
  });
});
