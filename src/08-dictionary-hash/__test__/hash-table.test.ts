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

  test('should overwrite an existing key with put', () => {
    hashTable.put('name', 'Alice');
    hashTable.put('name', 'Bob');
    expect(hashTable.get('name')).toBe('Bob');
  });

  test('should remove an existing key and return true', () => {
    hashTable.put('name', 'Alice');
    expect(hashTable.remove('name')).toBe(true);
    expect(hashTable.get('name')).toBeUndefined();
  });

  test('should return false when removing a non-existent key', () => {
    expect(hashTable.remove('missing')).toBe(false);
  });

  test('should store multiple keys', () => {
    hashTable.put('name', 'Alice');
    hashTable.put('city', 'London');
    expect(hashTable.get('name')).toBe('Alice');
    expect(hashTable.get('city')).toBe('London');
  });

  test('hash function returns consistent results', () => {
    expect(hashTable.hash('name')).toBe(hashTable.hash('name'));
    expect(hashTable.hash('abc')).toBeGreaterThanOrEqual(0);
    expect(hashTable.hash('abc')).toBeLessThan(37);
  });

  test('should produce correct toString output', () => {
    hashTable.put('name', 'Alice');
    const result = hashTable.toString();
    expect(result).toContain('Alice');
  });

  test('remove with null key returns false', () => {
    expect(hashTable.remove(null as any)).toBe(false);
  });

  test('toString with two distinct hash slots covers loop body multiple times', () => {
    // Use two keys known to hash differently to exercise the full toString loop
    hashTable.put('name', 'Alice');
    hashTable.put('zip', 'London');
    const result = hashTable.toString();
    expect(result).toContain('Alice');
    expect(result).toContain('London');
  });
});
