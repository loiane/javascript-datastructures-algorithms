import {describe, expect, test, beforeEach} from '@jest/globals';
import LinkedList from '../linked-list';

describe('LinkedList', () => {
  let linkedList: LinkedList<number>;

  beforeEach(() => {
    linkedList = new LinkedList<number>();
  });

  test('should create an empty linked list', () => {
    expect(linkedList.toString()).toBe('');
  });

  test('should append node to linked list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    expect(linkedList.toString()).toBe('1, 2, 3');
  });

  test('should prepend node to linked list', () => {
    linkedList.prepend(2);
    expect(linkedList.toString()).toBe('2');
    linkedList.append(1);
    linkedList.prepend(3);
    expect(linkedList.toString()).toBe('3, 2, 1');
  });

  test('should insert node at position 0', () => {
    linkedList.append(1);
    linkedList.insert(0, 2);
    expect(linkedList.toString()).toBe('2, 1');
  });

  test('should insert node at given position', () => {
    linkedList.append(1);
    linkedList.append(3);
    linkedList.insert(1, 2);
    expect(linkedList.toString()).toBe('1, 2, 3');
  });

  test('should insert node at invalid position', () => {
    linkedList.append(1);
    linkedList.append(3);
    expect(linkedList.insert(3, 2)).toBe(false);
    expect(linkedList.toString()).toBe('1, 3');
  });

  test('should remove node from linked list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.removeAt(1);
    expect(linkedList.toString()).toBe('1, 3');
  });

  test('should remove node at position 0', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.removeAt(0);
    expect(linkedList.toString()).toBe('2');
  });

  test('should remove node at invalid position', () => {
    linkedList.append(1);
    linkedList.append(2);
    expect(() => linkedList.removeAt(2)).toThrow('Invalid position');
  });

  test('should remove element from linked list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.remove(2);
    expect(linkedList.toString()).toBe('1, 3');
  });

  test('should remove element from linked list head', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.remove(1);
    expect(linkedList.toString()).toBe('2');
  });

  test('should remove element from linked list tail', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.remove(2);
    expect(linkedList.toString()).toBe('1');
  });

  test('should return null if element was not found', () => {
    linkedList.append(1);
    linkedList.append(2);
    expect(linkedList.remove(3)).toBeNull();
  });

  test('should find element index in linked list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    expect(linkedList.indexOf(1)).toBe(0);
    expect(linkedList.indexOf(2)).toBe(1);
    expect(linkedList.indexOf(3)).toBe(2);
  });

  test('should return -1 when element was not found', () => {
    linkedList.append(1);
    linkedList.append(2);
    expect(linkedList.indexOf(3)).toBe(-1);
  });

  test('should return true if list is empty', () => {
    expect(linkedList.isEmpty()).toBe(true);
  });

  test('should return false if list is not empty', () => {
    linkedList.append(1);
    expect(linkedList.isEmpty()).toBe(false);
  });

  test('should return the size of the linked list', () => {
    expect(linkedList.getSize()).toBe(0);
    linkedList.append(1);
    expect(linkedList.getSize()).toBe(1);
    linkedList.append(2);
    expect(linkedList.getSize()).toBe(2);
  });

  test('should convert linked list to string', () => {
    linkedList.append(1);
    expect(linkedList.toString()).toBe('1');
    linkedList.append(2);
    expect(linkedList.toString()).toBe('1, 2');
  });

  test('should convert linked list to string with custom stringifier', () => {
    const customList = new LinkedList<{value: number; key: string}>();
    customList.append({value: 1, key: 'key1'});
    expect(customList.toString()).toBe('{"value":1,"key":"key1"}');
  });

  test('should reverse the linked list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.reverse();
    expect(linkedList.toString()).toBe('3, 2, 1');
  });

 test('should reverse the linked list with one element', () => {
    linkedList.append(1);
    linkedList.reverse();
    expect(linkedList.toString()).toBe('1');
  });

  test('should clear the linked list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.clear();
    expect(linkedList.toString()).toBe('');
  });
});
