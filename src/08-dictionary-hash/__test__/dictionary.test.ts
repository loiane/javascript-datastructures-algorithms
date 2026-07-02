import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Dictionary = require('../dictionary') as new () => {
  set(key: any, value: any): boolean;
  hasKey(key: any): boolean;
  get(key: any): any;
  delete(key: any): boolean;
  keys(): string[];
  values(): any[];
  forEach(cb: (value: any, key: string) => void): void;
};

describe('Dictionary', () => {
  let dict: InstanceType<typeof Dictionary>;

  beforeEach(() => {
    dict = new Dictionary();
  });

  test('set and hasKey', () => {
    expect(dict.set('name', 'Alice')).toBe(true);
    expect(dict.hasKey('name')).toBe(true);
  });

  test('get returns the stored value', () => {
    dict.set('city', 'Paris');
    expect(dict.get('city')).toBe('Paris');
  });

  test('delete removes the key', () => {
    dict.set('name', 'Alice');
    expect(dict.delete('name')).toBe(true);
    expect(dict.hasKey('name')).toBe(false);
  });

  test('delete returns false for non-existent key', () => {
    expect(dict.delete('missing')).toBe(false);
  });

  test('keys returns all stored keys', () => {
    dict.set('a', 1);
    dict.set('b', 2);
    const keys = dict.keys();
    expect(keys).toContain('a');
    expect(keys).toContain('b');
  });

  test('values returns all stored values', () => {
    dict.set('x', 10);
    dict.set('y', 20);
    const values = dict.values();
    expect(values).toContain(10);
    expect(values).toContain(20);
  });

  test('forEach iterates all entries', () => {
    dict.set('k1', 'v1');
    dict.set('k2', 'v2');
    const seen: string[] = [];
    dict.forEach((value: string) => seen.push(value));
    expect(seen).toContain('v1');
    expect(seen).toContain('v2');
  });

  test('object key is stringified via JSON', () => {
    const key = { id: 1 };
    dict.set(key, 'objectValue');
    expect(dict.hasKey(key)).toBe(true);
    expect(dict.get(key)).toBe('objectValue');
  });

  test('null key returns false from set', () => {
    expect(dict.set(null, 'val')).toBe(false);
  });

  test('null value returns false from set', () => {
    expect(dict.set('key', null)).toBe(false);
  });
});
