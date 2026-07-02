import { describe, expect, test, beforeEach } from '@jest/globals';
import MySet from '../set';

describe('MySet', () => {
  let setA: MySet;
  let setB: MySet;

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

  // ─── difference ─────────────────────────────────────────────────────────────

  test('difference contains elements in A but not B', () => {
    setA.addAll(['a', 'b', 'c']);
    setB.addAll(['b', 'c', 'd']);
    const diff = setA.difference(setB);
    expect(diff.values()).toEqual(['a']);
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
