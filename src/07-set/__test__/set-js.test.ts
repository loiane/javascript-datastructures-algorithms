import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const MySet = require('../set.js') as new () => {
  add(value: any): boolean;
  addAll(values: any[]): void;
  delete(value: any): boolean;
  has(value: any): boolean;
  values(): any[];
  size: number;
  getSizeWithoutSizeProperty(): number;
  isEmpty(): boolean;
  clear(): void;
  union(otherSet: any): any;
  intersection(otherSet: any): any;
  difference(otherSet: any): any;
  isSubsetOf(otherSet: any): boolean;
  isSupersetOf(otherSet: any): boolean;
  toString(): string;
};

describe('MySet (set.js)', () => {
  let setA: InstanceType<typeof MySet>;
  let setB: InstanceType<typeof MySet>;

  beforeEach(() => {
    setA = new MySet();
    setB = new MySet();
  });

  // ─── add / has ──────────────────────────────────────────────────────────────

  test('add returns true for new items', () => {
    expect(setA.add('a')).toBe(true);
    expect(setA.add('b')).toBe(true);
  });

  test('add returns false for duplicate items', () => {
    setA.add('a');
    expect(setA.add('a')).toBe(false);
  });

  test('has returns true for existing item', () => {
    setA.add('x');
    expect(setA.has('x')).toBe(true);
  });

  test('has returns false for missing item', () => {
    expect(setA.has('z')).toBe(false);
  });

  test('has does not throw and works correctly for values named after Object.prototype methods (regression)', () => {
    expect(() => setA.add('hasOwnProperty')).not.toThrow();
    expect(setA.has('hasOwnProperty')).toBe(true);
    expect(() => setA.has('anything')).not.toThrow();
    expect(setA.has('anything')).toBe(false);
  });

  test('has works correctly after adding "toString" and "constructor" as values (regression)', () => {
    setA.add('toString');
    setA.add('constructor');
    expect(setA.has('toString')).toBe(true);
    expect(setA.has('constructor')).toBe(true);
    expect(setA.has('missing')).toBe(false);
  });

  // ─── addAll ─────────────────────────────────────────────────────────────────

  test('addAll adds every value', () => {
    setA.addAll(['a', 'b', 'c']);
    expect(setA.values().sort()).toEqual(['a', 'b', 'c']);
  });

  // ─── delete ─────────────────────────────────────────────────────────────────

  test('delete removes the item and returns true', () => {
    setA.add('a');
    expect(setA.delete('a')).toBe(true);
    expect(setA.has('a')).toBe(false);
  });

  test('delete returns false for non-existent item', () => {
    expect(setA.delete('missing')).toBe(false);
  });

  // ─── values / size ──────────────────────────────────────────────────────────

  test('values returns all items', () => {
    setA.add('a');
    setA.add('b');
    setA.add('c');
    expect(setA.values().sort()).toEqual(['a', 'b', 'c']);
  });

  test('size tracks item count', () => {
    expect(setA.size).toBe(0);
    setA.add('a');
    expect(setA.size).toBe(1);
    setA.add('b');
    expect(setA.size).toBe(2);
    setA.delete('a');
    expect(setA.size).toBe(1);
  });

  test('getSizeWithoutSizeProperty matches size', () => {
    setA.addAll(['a', 'b', 'c']);
    expect(setA.getSizeWithoutSizeProperty()).toBe(3);
    expect(setA.getSizeWithoutSizeProperty()).toBe(setA.size);
  });

  test('getSizeWithoutSizeProperty is 0 for an empty set', () => {
    expect(setA.getSizeWithoutSizeProperty()).toBe(0);
  });

  test('getSizeWithoutSizeProperty does not throw for prototype-method-named values (regression)', () => {
    setA.add('hasOwnProperty');
    expect(() => setA.getSizeWithoutSizeProperty()).not.toThrow();
    expect(setA.getSizeWithoutSizeProperty()).toBe(1);
  });

  // ─── isEmpty / clear ────────────────────────────────────────────────────────

  test('isEmpty returns true on empty set', () => {
    expect(setA.isEmpty()).toBe(true);
  });

  test('isEmpty returns false when items exist', () => {
    setA.add('a');
    expect(setA.isEmpty()).toBe(false);
  });

  test('clear empties the set', () => {
    setA.add('a');
    setA.add('b');
    setA.clear();
    expect(setA.isEmpty()).toBe(true);
    expect(setA.size).toBe(0);
  });

  // ─── union ──────────────────────────────────────────────────────────────────

  test('union contains all elements from both sets', () => {
    setA.addAll(['a', 'b', 'c']);
    setB.addAll(['c', 'd', 'e']);
    const u = setA.union(setB);
    expect(u.values().sort()).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('union of two empty sets is empty', () => {
    const u = setA.union(setB);
    expect(u.isEmpty()).toBe(true);
  });

  test('union with an empty set returns the same elements', () => {
    setA.addAll(['a', 'b']);
    const u = setA.union(setB);
    expect(u.values().sort()).toEqual(['a', 'b']);
  });

  // ─── intersection ───────────────────────────────────────────────────────────

  test('intersection contains only common elements', () => {
    setA.addAll(['a', 'b', 'c']);
    setB.addAll(['b', 'c', 'd']);
    const inter = setA.intersection(setB);
    expect(inter.values().sort()).toEqual(['b', 'c']);
  });

  test('intersection of disjoint sets is empty', () => {
    setA.addAll(['a', 'b']);
    setB.addAll(['c', 'd']);
    expect(setA.intersection(setB).isEmpty()).toBe(true);
  });

  test('intersection when this set is larger than otherSet', () => {
    setA.addAll(['a', 'b', 'c', 'd']);
    setB.addAll(['b', 'c']);
    expect(setA.intersection(setB).values().sort()).toEqual(['b', 'c']);
  });

  test('intersection when this set is smaller than otherSet', () => {
    setA.addAll(['b', 'c']);
    setB.addAll(['a', 'b', 'c', 'd']);
    expect(setA.intersection(setB).values().sort()).toEqual(['b', 'c']);
  });

  test('intersection of fully-overlapping sets equals either set', () => {
    setA.addAll(['a', 'b']);
    setB.addAll(['a', 'b']);
    expect(setA.intersection(setB).values().sort()).toEqual(['a', 'b']);
  });

  test('intersection with an empty set is empty', () => {
    setA.addAll(['a', 'b']);
    expect(setA.intersection(setB).isEmpty()).toBe(true);
  });

  // ─── difference ─────────────────────────────────────────────────────────────

  test('difference contains elements in A but not B', () => {
    setA.addAll(['a', 'b', 'c']);
    setB.addAll(['b', 'c', 'd']);
    const diff = setA.difference(setB);
    expect(diff.values()).toEqual(['a']);
  });

  test('difference with an empty otherSet returns all elements', () => {
    setA.addAll(['a', 'b']);
    expect(setA.difference(setB).values().sort()).toEqual(['a', 'b']);
  });

  test('difference of fully-overlapping sets is empty', () => {
    setA.addAll(['a', 'b']);
    setB.addAll(['a', 'b']);
    expect(setA.difference(setB).isEmpty()).toBe(true);
  });

  // ─── isSubsetOf / isSupersetOf ──────────────────────────────────────────────

  test('isSubsetOf returns true when all items are in the other set', () => {
    setA.addAll(['b', 'c']);
    setB.addAll(['a', 'b', 'c', 'd']);
    expect(setA.isSubsetOf(setB)).toBe(true);
  });

  test('isSubsetOf returns false when items are missing from the other set', () => {
    setA.addAll(['a', 'e']);
    setB.addAll(['a', 'b', 'c']);
    expect(setA.isSubsetOf(setB)).toBe(false);
  });

  test('isSubsetOf returns false immediately when this set is larger', () => {
    setA.addAll(['a', 'b', 'c']);
    setB.addAll(['a']);
    expect(setA.isSubsetOf(setB)).toBe(false);
  });

  test('an empty set is a subset of any set', () => {
    setB.addAll(['a', 'b']);
    expect(setA.isSubsetOf(setB)).toBe(true);
  });

  test('isSupersetOf returns true when the set contains all items of the other', () => {
    setA.addAll(['a', 'b', 'c', 'd']);
    setB.addAll(['b', 'c']);
    expect(setA.isSupersetOf(setB)).toBe(true);
  });

  test('isSupersetOf returns false when items are missing', () => {
    setA.addAll(['a', 'b']);
    setB.addAll(['b', 'c', 'd']);
    expect(setA.isSupersetOf(setB)).toBe(false);
  });

  test('isSupersetOf returns false immediately when this set is smaller', () => {
    setA.addAll(['a']);
    setB.addAll(['a', 'b', 'c']);
    expect(setA.isSupersetOf(setB)).toBe(false);
  });

  test('any set is a superset of an empty set', () => {
    setA.addAll(['a', 'b']);
    expect(setA.isSupersetOf(setB)).toBe(true);
  });

  // ─── toString ───────────────────────────────────────────────────────────────

  test('toString returns comma-separated values', () => {
    setA.add('x');
    setA.add('y');
    expect(setA.toString()).toContain('x');
    expect(setA.toString()).toContain('y');
  });

  test('toString on empty set returns empty string', () => {
    expect(setA.toString()).toBe('');
  });
});
