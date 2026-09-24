import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const HashTableSeparateChaining = require('../hash-table-separate-chaining') as new () => {
  put(key: string, value: any): boolean;
  get(key: string): any;
  remove(key: string): boolean;
  hash(key: string): number;
  toString(): string;
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const HashTableLinearProbing = require('../hash-table-linear-probing') as new () => {
  put(key: string, value: any): boolean;
  get(key: string): any;
  remove(key: string): boolean;
  hash(key: string): number;
};

describe('HashTableSeparateChaining', () => {
  let ht: InstanceType<typeof HashTableSeparateChaining>;

  beforeEach(() => {
    ht = new HashTableSeparateChaining();
  });

  test('put returns true', () => {
    expect(ht.put('name', 'Alice')).toBe(true);
  });

  test('put returns false when key or value is null', () => {
    expect(ht.put(null as any, 'value')).toBe(false);
    expect(ht.put('key', null as any)).toBe(false);
  });

  test('get returns the stored value for a key', () => {
    ht.put('name', 'Alice');
    expect(ht.get('name')).toBe('Alice');
  });

  test('get returns undefined for a missing key', () => {
    expect(ht.get('missing')).toBeUndefined();
  });

  test('get returns undefined for a key in an empty bucket', () => {
    ht.put('name', 'Alice');
    expect(ht.get('doesNotExist')).toBeUndefined();
  });

  test('put overwrites an existing key by appending, and get returns the latest value', () => {
    ht.put('name', 'Alice');
    ht.put('name', 'Bob');
    expect(ht.get('name')).toBe('Bob');
  });

  test('remove returns true after put and get returns undefined afterwards', () => {
    ht.put('name', 'Alice');
    expect(ht.remove('name')).toBe(true);
    expect(ht.get('name')).toBeUndefined();
  });

  test('remove returns false when key not found', () => {
    expect(ht.remove('missing')).toBe(false);
  });

  test('remove returns false when bucket is empty', () => {
    ht.put('name', 'Alice');
    expect(ht.remove('doesNotExist')).toBe(false);
  });

  test('hash returns a number in valid range', () => {
    const h = ht.hash('name');
    expect(typeof h).toBe('number');
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThan(37);
  });

  test('hash handles non-string keys', () => {
    const h = ht.hash({ id: 1 } as any);
    expect(typeof h).toBe('number');
    expect(h).toBeGreaterThanOrEqual(0);
  });

  test('hash handles primitive non-string, non-object keys', () => {
    const h = ht.hash(42 as any);
    expect(typeof h).toBe('number');
    expect(h).toBeGreaterThanOrEqual(0);
  });

  test('put multiple keys with same hash slot chains correctly', () => {
    // 'key1' and 'key2' share the same lose-lose hash slot.
    expect(ht.put('key1', 'val1')).toBe(true);
    expect(ht.put('key2', 'val2')).toBe(true);
    expect(ht.get('key1')).toBe('val1');
    expect(ht.get('key2')).toBe('val2');
  });

  test('remove one key from a chain keeps the other reachable', () => {
    ht.put('key1', 'val1');
    ht.put('key2', 'val2');
    expect(ht.remove('key1')).toBe(true);
    expect(ht.get('key1')).toBeUndefined();
    expect(ht.get('key2')).toBe('val2');
  });

  test('toString produces output containing stored values', () => {
    ht.put('name', 'Alice');
    ht.put('city', 'London');
    const result = ht.toString();
    expect(result).toContain('Alice');
    expect(result).toContain('London');
  });
});

describe('HashTableLinearProbing', () => {
  let ht: InstanceType<typeof HashTableLinearProbing>;

  beforeEach(() => {
    ht = new HashTableLinearProbing();
  });

  test('put returns true', () => {
    expect(ht.put('singleKey', 'value')).toBe(true);
  });

  test('put returns false when key or value is null', () => {
    expect(ht.put(null as any, 'value')).toBe(false);
    expect(ht.put('key', null as any)).toBe(false);
  });

  test('get returns value after put (same key)', () => {
    ht.put('singleKey', 'myValue');
    expect(ht.get('singleKey')).toBe('myValue');
  });

  test('get returns undefined for a missing key', () => {
    expect(ht.get('notFound')).toBeUndefined();
  });

  test('put overwrites the value for an existing key', () => {
    ht.put('name', 'Alice');
    ht.put('name', 'Bob');
    expect(ht.get('name')).toBe('Bob');
  });

  test('remove returns false when key not found (empty table)', () => {
    expect(ht.remove('notFound')).toBe(false);
  });

  test('remove returns true after put and get returns undefined afterwards', () => {
    ht.put('name', 'Alice');
    expect(ht.remove('name')).toBe(true);
    expect(ht.get('name')).toBeUndefined();
  });

  test('put/get/remove handle multiple colliding keys via linear probing', () => {
    ht.put('john', 1);
    ht.put('jane', 2);
    ht.put('jack', 3);

    expect(ht.get('john')).toBe(1);
    expect(ht.get('jane')).toBe(2);
    expect(ht.get('jack')).toBe(3);

    expect(ht.remove('jane')).toBe(true);
    expect(ht.get('jane')).toBeUndefined();
    // Removing the middle probed slot should not break access to the others.
    expect(ht.get('john')).toBe(1);
    expect(ht.get('jack')).toBe(3);
  });

  test('hash returns a number for string and non-string keys', () => {
    expect(typeof ht.hash('any')).toBe('number');
    expect(typeof ht.hash(42 as any)).toBe('number');
  });

  test('hash handles object keys by stringifying them', () => {
    expect(typeof ht.hash({ id: 1 } as any)).toBe('number');
  });

  test('put/get handle a true hash collision via linear probing', () => {
    // 'ab' and 'ba' share the same lose-lose hash code.
    ht.put('ab', 1);
    ht.put('ba', 2);
    expect(ht.get('ab')).toBe(1);
    expect(ht.get('ba')).toBe(2);
  });

  test('remove repositions a wrapped-around colliding key so it stays reachable', () => {
    ht.put('ab', 1);
    ht.put('ba', 2); // probes and wraps around to an earlier slot
    expect(ht.remove('ab')).toBe(true);
    expect(ht.get('ab')).toBeUndefined();
    // 'ba' must still be reachable after the side-effect repositioning.
    expect(ht.get('ba')).toBe(2);
  });

  test('remove probes past a non-matching colliding slot to find the key', () => {
    ht.put('ab', 1); // occupies the natural hash slot
    ht.put('ba', 2); // collides and is probed elsewhere
    expect(ht.remove('ba')).toBe(true);
    expect(ht.get('ba')).toBeUndefined();
    expect(ht.get('ab')).toBe(1);
  });
});
