import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const LinkedList = require('../linked-list_') as new () => {
  append(data: any): void;
  prepend(data: any): void;
  insert(data: any, position: number): boolean;
  removeAt(position: number): any;
  remove(data: any, compareFunction?: (a: any, b: any) => boolean): any;
  indexOf(data: any, compareFunction?: (a: any, b: any) => boolean): number;
  isEmpty(): boolean;
  clear(): void;
  size: number;
  forEach(callback: (data: any, index: number) => void): void;
  toString(): string;
  reverse(): void;
};

describe('LinkedList (linked-list_.js)', () => {
  let linkedList: InstanceType<typeof LinkedList>;

  beforeEach(() => {
    linkedList = new LinkedList();
  });

  test('should create an empty linked list', () => {
    expect(linkedList.toString()).toBe('');
    expect(linkedList.isEmpty()).toBe(true);
    expect(linkedList.size).toBe(0);
  });

  test('should append nodes to the linked list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    expect(linkedList.toString()).toBe('1, 2, 3');
    expect(linkedList.size).toBe(3);
  });

  test('should prepend nodes to the linked list', () => {
    linkedList.prepend(2);
    expect(linkedList.toString()).toBe('2');
    linkedList.append(1);
    linkedList.prepend(3);
    expect(linkedList.toString()).toBe('3, 2, 1');
  });

  test('should insert a node at position 0', () => {
    linkedList.append(1);
    expect(linkedList.insert(2, 0)).toBe(true);
    expect(linkedList.toString()).toBe('2, 1');
  });

  test('should insert a node at a given middle position', () => {
    linkedList.append(1);
    linkedList.append(3);
    expect(linkedList.insert(2, 1)).toBe(true);
    expect(linkedList.toString()).toBe('1, 2, 3');
  });

  test('should return false when inserting at an invalid position', () => {
    linkedList.append(1);
    linkedList.append(3);
    expect(linkedList.insert(2, 5)).toBe(false);
    expect(linkedList.insert(2, -1)).toBe(false);
    expect(linkedList.toString()).toBe('1, 3');
  });

  test('should remove a node from the head', () => {
    linkedList.append(1);
    linkedList.append(2);
    expect(linkedList.removeAt(0)).toBe(1);
    expect(linkedList.toString()).toBe('2');
  });

  test('should remove a node from the middle', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    expect(linkedList.removeAt(1)).toBe(2);
    expect(linkedList.toString()).toBe('1, 3');
  });

  test('should remove a node from the end', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    expect(linkedList.removeAt(2)).toBe(3);
    expect(linkedList.toString()).toBe('1, 2');
  });

  test('should throw when removing from an empty list', () => {
    expect(() => linkedList.removeAt(0)).toThrow('Cannot remove from an empty list.');
  });

  test('should throw when removing at an invalid position', () => {
    linkedList.append(1);
    expect(() => linkedList.removeAt(5)).toThrow('Invalid position');
    expect(() => linkedList.removeAt(-1)).toThrow('Invalid position');
  });

  test('should remove an element by value', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    expect(linkedList.remove(2)).toBe(2);
    expect(linkedList.toString()).toBe('1, 3');
  });

  test('should return null when removing a value that is not found', () => {
    linkedList.append(1);
    linkedList.append(2);
    expect(linkedList.remove(3)).toBeNull();
  });

  test('should remove using a custom compare function', () => {
    linkedList.append({ id: 1 });
    linkedList.append({ id: 2 });
    const removed = linkedList.remove({ id: 2 }, (a: any, b: any) => a.id === b.id);
    expect(removed).toEqual({ id: 2 });
    expect(linkedList.size).toBe(1);
  });

  test('should find the index of an element', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    expect(linkedList.indexOf(1)).toBe(0);
    expect(linkedList.indexOf(2)).toBe(1);
    expect(linkedList.indexOf(3)).toBe(2);
  });

  test('should return -1 when the element is not found', () => {
    linkedList.append(1);
    expect(linkedList.indexOf(2)).toBe(-1);
  });

  test('should report whether the list is empty', () => {
    expect(linkedList.isEmpty()).toBe(true);
    linkedList.append(1);
    expect(linkedList.isEmpty()).toBe(false);
  });

  test('should clear the list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.clear();
    expect(linkedList.isEmpty()).toBe(true);
    expect(linkedList.size).toBe(0);
    expect(linkedList.toString()).toBe('');
  });

  test('should iterate all elements with forEach', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    const seen: Array<[any, number]> = [];
    linkedList.forEach((data: any, index: number) => seen.push([data, index]));
    expect(seen).toEqual([[1, 0], [2, 1], [3, 2]]);
  });

  test('should convert objects to string using JSON.stringify', () => {
    linkedList.append({ key: 'key1', value: 1 });
    expect(linkedList.toString()).toBe('{"key":"key1","value":1}');
  });

  test('should reverse the linked list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.reverse();
    expect(linkedList.toString()).toBe('3, 2, 1');
  });

  test('should reverse a single-element list without error', () => {
    linkedList.append(1);
    linkedList.reverse();
    expect(linkedList.toString()).toBe('1');
  });

  test('should reverse an empty list without error', () => {
    linkedList.reverse();
    expect(linkedList.toString()).toBe('');
  });
});
