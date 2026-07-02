import {describe, expect, test, beforeEach} from '@jest/globals';
import DoublyLinkedList from '../doubly-linked-list';

describe('DoublyLinkedList', () => {
  let doublyLinkedList: DoublyLinkedList<number>;

  beforeEach(() => {
    doublyLinkedList = new DoublyLinkedList<number>();
  });

  test('should create an empty doubly linked list', () => {
    expect(doublyLinkedList.toString()).toBe('');
  });

  test('should append node to doubly linked list', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    doublyLinkedList.append(3);
    expect(doublyLinkedList.toString()).toBe('1, 2, 3');
  });

  test('should prepend node to doubly linked list', () => {
    doublyLinkedList.prepend(2);
    expect(doublyLinkedList.toString()).toBe('2');
    doublyLinkedList.append(1);
    doublyLinkedList.prepend(3);
    expect(doublyLinkedList.toString()).toBe('3, 2, 1');
  });

  test('should insert node at position 0', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.insert(2, 0);
    expect(doublyLinkedList.toString()).toBe('2, 1');
  });

  test('should insert node at given position', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(3);
    doublyLinkedList.insert(2, 1);
    expect(doublyLinkedList.toString()).toBe('1, 2, 3');
  });

  test('should insert node at invalid position', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(3);
    expect(doublyLinkedList.insert(3, 2)).toBe(false);
    expect(doublyLinkedList.toString()).toBe('1, 3');
  });

  test('should remove node from doubly linked list', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    doublyLinkedList.append(3);
    doublyLinkedList.removeAt(1);
    expect(doublyLinkedList.toString()).toBe('1, 3');
  });

  test('should remove node at position 0', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    doublyLinkedList.removeAt(0);
    expect(doublyLinkedList.toString()).toBe('2');
  });

  test('should remove node at invalid position', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    //expect(doublyLinkedList.removeAt(3)).toThrowError(RangeError('Invalid position'));
    expect(doublyLinkedList.toString()).toBe('1, 2');
  });

  test('should remove element from doubly linked list', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    doublyLinkedList.append(3);
    doublyLinkedList.remove(3);
    expect(doublyLinkedList.toString()).toBe('1, 2');
    doublyLinkedList.remove(1);
    expect(doublyLinkedList.toString()).toBe('2');
    doublyLinkedList.remove(2);
    expect(doublyLinkedList.toString()).toBe('');
  });

  test('should remove element that is not in doubly linked list', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    expect(doublyLinkedList.remove(3)).toBe(null);
    expect(doublyLinkedList.toString()).toBe('1, 2');
  });

  test('should find element in doubly linked list', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    doublyLinkedList.append(3);
    expect(doublyLinkedList.indexOf(1)).toBe(0);
    expect(doublyLinkedList.indexOf(2)).toBe(1);
    expect(doublyLinkedList.indexOf(3)).toBe(2);
    expect(doublyLinkedList.indexOf(4)).toBe(-1);
  });

  test('should check if doubly linked list is empty', () => {
    expect(doublyLinkedList.isEmpty()).toBe(true);
    doublyLinkedList.append(1);
    expect(doublyLinkedList.isEmpty()).toBe(false);
  });

  test('should return the size of the doubly linked list', () => {
    expect(doublyLinkedList.getSize()).toBe(0);
    doublyLinkedList.append(1);
    expect(doublyLinkedList.getSize()).toBe(1);
    doublyLinkedList.append(2);
    expect(doublyLinkedList.getSize()).toBe(2);
  });

  test('should convert doubly linked list to string', () => {
    doublyLinkedList.append(1);
    expect(doublyLinkedList.toString()).toBe('1');
    doublyLinkedList.append(2);
    expect(doublyLinkedList.toString()).toBe('1, 2');
  });

  test('should clear doubly linked list', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    doublyLinkedList.clear();
    expect(doublyLinkedList.getSize()).toBe(0);
    expect(doublyLinkedList.toString()).toBe('');
    expect(doublyLinkedList.isEmpty()).toBe(true);
  });

  test('should return inverseToString in reverse order', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    doublyLinkedList.append(3);
    // inverseToString has no separator between elements
    expect(doublyLinkedList.inverseToString()).toBe('321');
  });

  test('should reverse doubly linked list', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    doublyLinkedList.append(3);
    doublyLinkedList.reverse();
    expect(doublyLinkedList.toString()).toBe('3, 2, 1');
  });

  test('should throw RangeError when removeAt with position >= size', () => {
    doublyLinkedList.append(1);
    doublyLinkedList.append(2);
    expect(() => doublyLinkedList.removeAt(5)).toThrow(RangeError);
  });

  test('should throw RangeError when removeAt with negative position', () => {
    doublyLinkedList.append(1);
    expect(() => doublyLinkedList.removeAt(-1)).toThrow(RangeError);
  });

  test('should work with object data type (uses JSON.stringify in toString)', () => {
    const objList = new DoublyLinkedList<{ id: number }>();
    objList.append({ id: 1 });
    objList.append({ id: 2 });
    expect(objList.toString()).toContain('"id":1');
  });

});