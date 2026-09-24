import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const DoublyLinkedList = require('../doubly-linked-list_.js') as new () => {
  append(data: any): void;
  prepend(data: any): void;
  insert(data: any, position: number): boolean;
  removeAt(position: number): any;
  size: number;
  isEmpty(): boolean;
  indexOf(data: any, compareFunction?: (a: any, b: any) => boolean): number;
  clear(): void;
  toString(): string;
  inverseToString(): string;
  reverse(): void;
};

describe('DoublyLinkedList (doubly-linked-list_.js)', () => {
  let list: InstanceType<typeof DoublyLinkedList>;

  beforeEach(() => {
    list = new DoublyLinkedList();
  });

  test('should create an empty list', () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.size).toBe(0);
    expect(list.toString()).toBe('');
    expect(list.inverseToString()).toBe('');
  });

  test('should append elements to the end of the list', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.toString()).toBe('1, 2, 3');
    expect(list.size).toBe(3);
    expect(list.isEmpty()).toBe(false);
  });

  test('should prepend elements to the beginning of the list', () => {
    list.prepend(1);
    expect(list.toString()).toBe('1');
    list.append(2);
    list.prepend(0);
    expect(list.toString()).toBe('0, 1, 2');
    expect(list.size).toBe(3);
  });

  test('should insert an element at position 0 (prepend behavior)', () => {
    list.append(1);
    expect(list.insert(0, 0)).toBe(true);
    expect(list.toString()).toBe('0, 1');
  });

  test('should reject insert at position equal to size (unreachable append branch, matches .ts reference)', () => {
    list.append(1);
    list.append(2);
    // Note: position === size is treated as invalid by #isInvalidPosition before
    // the "last position" branch is ever reached, so it returns false rather than
    // appending. This mirrors the .ts sibling's own documented/tested behavior.
    expect(list.insert(3, 2)).toBe(false);
    expect(list.toString()).toBe('1, 2');
  });

  test('should insert an element in the middle', () => {
    list.append(1);
    list.append(3);
    expect(list.insert(2, 1)).toBe(true);
    expect(list.toString()).toBe('1, 2, 3');
    expect(list.size).toBe(3);
  });

  test('should return false when inserting at an invalid position', () => {
    list.append(1);
    expect(list.insert(5, -1)).toBe(false);
    expect(list.insert(5, 10)).toBe(false);
    expect(list.size).toBe(1);
  });

  test('should remove from the head', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.removeAt(0)).toBe(1);
    expect(list.toString()).toBe('2, 3');
    expect(list.size).toBe(2);
  });

  test('should remove from the tail', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.removeAt(2)).toBe(3);
    expect(list.toString()).toBe('1, 2');
    expect(list.size).toBe(2);
  });

  test('should remove from the middle', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.removeAt(1)).toBe(2);
    expect(list.toString()).toBe('1, 3');
    expect(list.size).toBe(2);
  });

  test('should remove the only element and become empty', () => {
    list.append(1);
    expect(list.removeAt(0)).toBe(1);
    expect(list.isEmpty()).toBe(true);
    expect(list.size).toBe(0);
    expect(list.toString()).toBe('');
  });

  test('should throw when removing from an empty list', () => {
    expect(() => list.removeAt(0)).toThrow(RangeError);
  });

  test('should throw when removing at an invalid position', () => {
    list.append(1);
    expect(() => list.removeAt(-1)).toThrow(RangeError);
    expect(() => list.removeAt(5)).toThrow(RangeError);
  });

  test('should find the index of an element', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    expect(list.indexOf('b')).toBe(1);
    expect(list.indexOf('z')).toBe(-1);
  });

  test('should support a custom compare function for indexOf', () => {
    list.append({ id: 1 });
    list.append({ id: 2 });
    expect(list.indexOf({ id: 2 }, (a: any, b: any) => a.id === b.id)).toBe(1);
  });

  test('should clear all elements', () => {
    list.append(1);
    list.append(2);
    list.clear();
    expect(list.isEmpty()).toBe(true);
    expect(list.size).toBe(0);
    expect(list.toString()).toBe('');
  });

  test('should stringify object elements using JSON.stringify', () => {
    list.append({ a: 1 });
    list.append([1, 2]);
    expect(list.toString()).toBe('{"a":1}, [1,2]');
  });

  test('should stringify primitive elements using String()', () => {
    list.append(1);
    list.append('two');
    list.append(true);
    list.append(null);
    list.append(undefined);
    expect(list.toString()).toBe('1, two, true, null, undefined');
  });

  test('should produce the inverse string representation', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.inverseToString()).toBe('321');
  });

  test('should reverse the list in place, keeping prev/next links consistent', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    list.reverse();
    expect(list.toString()).toBe('3, 2, 1');
    expect(list.inverseToString()).toBe('123');
    // after reversing, the list should still support normal operations
    // (verifies head/tail and prev/next pointers were correctly swapped)
    expect(list.removeAt(0)).toBe(3);
    expect(list.toString()).toBe('2, 1');
    expect(list.removeAt(list.size - 1)).toBe(1);
    expect(list.toString()).toBe('2');
  });

  test('should reverse a single-element list', () => {
    list.append(1);
    list.reverse();
    expect(list.toString()).toBe('1');
    expect(list.inverseToString()).toBe('1');
  });

  test('should reverse an empty list without error', () => {
    expect(() => list.reverse()).not.toThrow();
    expect(list.toString()).toBe('');
  });
});
