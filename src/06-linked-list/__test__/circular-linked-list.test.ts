import {describe, expect, test, beforeEach} from '@jest/globals';
import CircularLinkedList from '../circular-linked-list';

describe('CircularLinkedList', () => {
  let circularList: CircularLinkedList<number>;

  beforeEach(() => {
    circularList = new CircularLinkedList<number>();
  });

  test('should create an empty list', () => {
    expect(circularList.isEmpty()).toBe(true);
    expect(circularList.getSize()).toBe(0);
    expect(circularList.toString()).toBe('');
  });

  test('should append a single element', () => {
    circularList.append(1);
    expect(circularList.toString()).toBe('1');
    expect(circularList.getSize()).toBe(1);
  });

  test('should append multiple elements', () => {
    circularList.append(1);
    circularList.append(2);
    circularList.append(3);
    expect(circularList.toString()).toBe('1 -> 2 -> 3');
  });

  test('should prepend an element', () => {
    circularList.append(2);
    circularList.append(3);
    circularList.prepend(1);
    expect(circularList.toString()).toBe('1 -> 2 -> 3');
    expect(circularList.getSize()).toBe(3);
  });

  test('should insert at position 0 (delegates to prepend)', () => {
    circularList.append(2);
    circularList.append(3);
    circularList.insert(0, 1);
    expect(circularList.toString()).toBe('1 -> 2 -> 3');
  });

  test('should insert at a middle position', () => {
    circularList.append(1);
    circularList.append(3);
    circularList.insert(1, 2);
    expect(circularList.toString()).toBe('1 -> 2 -> 3');
  });

  test('should return false for insert at invalid position', () => {
    circularList.append(1);
    expect(circularList.insert(5, 99)).toBe(false);
    expect(circularList.getSize()).toBe(1);
  });

  test('should removeAt head (position 0)', () => {
    circularList.append(1);
    circularList.append(2);
    circularList.append(3);
    circularList.removeAt(0);
    expect(circularList.toString()).toBe('2 -> 3');
    expect(circularList.getSize()).toBe(2);
  });

  test('should removeAt a middle position', () => {
    circularList.append(1);
    circularList.append(2);
    circularList.append(3);
    circularList.removeAt(1);
    expect(circularList.toString()).toBe('1 -> 3');
  });

  test('should throw for removeAt invalid position', () => {
    circularList.append(1);
    expect(() => circularList.removeAt(5)).toThrow('Invalid position');
  });

  test('should remove an element by value', () => {
    circularList.append(1);
    circularList.append(2);
    circularList.append(3);
    circularList.remove(2);
    expect(circularList.toString()).toBe('1 -> 3');
  });

  test('should return null when removing a non-existing element', () => {
    circularList.append(1);
    expect(circularList.remove(99)).toBeNull();
  });

  test('should find indexOf an existing element', () => {
    circularList.append(10);
    circularList.append(20);
    circularList.append(30);
    expect(circularList.indexOf(10)).toBe(0);
    expect(circularList.indexOf(20)).toBe(1);
    expect(circularList.indexOf(30)).toBe(2);
  });

  test('should return -1 for indexOf a non-existing element', () => {
    circularList.append(1);
    expect(circularList.indexOf(99)).toBe(-1);
  });

  test('should clear the list', () => {
    circularList.append(1);
    circularList.append(2);
    circularList.clear();
    expect(circularList.isEmpty()).toBe(true);
    expect(circularList.toString()).toBe('');
  });

  test('should maintain circular structure after append', () => {
    circularList.append(1);
    circularList.append(2);
    circularList.append(3);
    const head = circularList.getHead();
    expect(head?.next?.next?.next).toBe(head);
  });

  test('should reverse the list', () => {
    circularList.append(1);
    circularList.append(2);
    circularList.append(3);
    circularList.reverse();
    const head = circularList.getHead();
    expect(head?.element).toBe(3);
    expect(head?.next?.element).toBe(2);
    expect(head?.next?.next?.element).toBe(1);
  });
});
