import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const HashTable = require('../hash-table.js') as new () => {
  put(key: any, value: any): boolean;
  get(key: any): any;
  remove(key: any): boolean;
  hash(key: any): number;
  toString(): string;
};

describe('HashTable (hash-table.js)', () => {
  let ht: InstanceType<typeof HashTable>;

  beforeEach(() => {
    ht = new HashTable();
  });

  test('put and get a value', () => {
    ht.put('name', 'Alice');
    expect(ht.get('name')).toBe('Alice');
  });

  test('get returns undefined for a non-existent key', () => {
    expect(ht.get('missing')).toBeUndefined();
  });

  test('get returns undefined when key is null', () => {
    expect(ht.get(null)).toBeUndefined();
  });

  test('put overwrites an existing key', () => {
    ht.put('name', 'Alice');
    ht.put('name', 'Bob');
    expect(ht.get('name')).toBe('Bob');
  });

  test('put returns true on success', () => {
    expect(ht.put('name', 'Alice')).toBe(true);
  });

  test('put returns false when key is null', () => {
    expect(ht.put(null, 'value')).toBe(false);
  });

  test('put returns false when value is null', () => {
    expect(ht.put('key', null)).toBe(false);
  });

  test('put returns false when both key and value are null', () => {
    expect(ht.put(null, null)).toBe(false);
  });

  test('put does not throw when key is null (regression)', () => {
    expect(() => ht.put(null, 'value')).not.toThrow();
  });

  test('put handles non-string keys by stringifying them', () => {
    expect(ht.put(42 as any, 'number-key')).toBe(true);
    expect(ht.get(42 as any)).toBe('number-key');
  });

  test('put handles object keys by stringifying them', () => {
    expect(ht.put({ id: 1 } as any, 'object-key')).toBe(true);
  });

  test('hash returns consistent results', () => {
    expect(ht.hash('name')).toBe(ht.hash('name'));
    expect(ht.hash('abc')).toBeGreaterThanOrEqual(0);
    expect(ht.hash('abc')).toBeLessThan(37);
  });

  test('should store multiple keys', () => {
    ht.put('name', 'Alice');
    ht.put('city', 'London');
    expect(ht.get('name')).toBe('Alice');
    expect(ht.get('city')).toBe('London');
  });

  test('remove returns true for an existing key and clears it', () => {
    ht.put('name', 'Alice');
    expect(ht.remove('name')).toBe(true);
    expect(ht.get('name')).toBeUndefined();
  });

  test('remove returns false for a non-existent key', () => {
    expect(ht.remove('missing')).toBe(false);
  });

  test('remove returns false when key is null', () => {
    expect(ht.remove(null)).toBe(false);
  });

  test('remove returns true and works for a falsy stored value (0) (regression)', () => {
    ht.put('key', 0);
    expect(ht.remove('key')).toBe(true);
    expect(ht.get('key')).toBeUndefined();
  });

  test('remove returns true and works for a falsy stored value (empty string) (regression)', () => {
    ht.put('key', '');
    expect(ht.remove('key')).toBe(true);
  });

  test('remove returns true and works for a falsy stored value (false) (regression)', () => {
    ht.put('key', false);
    expect(ht.remove('key')).toBe(true);
  });

  test('two keys hashing to the same slot overwrite each other (no collision handling)', () => {
    // 'a' and hashing colliding keys just overwrite the previous slot value
    // since this basic HashTable has no chaining/probing.
    ht.put('key1', 'val1');
    ht.put('key2', 'val2');
    // Regardless of collision, at least the most recently written of any
    // colliding keys must be retrievable via its own key.
    expect(ht.get('key2')).toBe('val2');
  });

  test('toString produces output containing the stored value', () => {
    ht.put('name', 'Alice');
    const result = ht.toString();
    expect(result).toContain('Alice');
  });

  test('toString with multiple distinct slots covers the loop body', () => {
    ht.put('name', 'Alice');
    ht.put('zip', 'London');
    const result = ht.toString();
    expect(result).toContain('Alice');
    expect(result).toContain('London');
  });

  test('toString does not throw on an empty table (regression)', () => {
    expect(() => ht.toString()).not.toThrow();
  });

  test('toString uses JSON.stringify for the first entry when it is an object (regression)', () => {
    ht.put('name', { a: 1 });
    const result = ht.toString();
    expect(result).toContain('{"a":1}');
    expect(result).not.toContain('[object Object]');
  });
});
