import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Deque = require('../deque.js') as new () => {
  addFront(item: any): void;
  addRear(item: any): void;
  removeFront(): any;
  removeRear(): any;
  peekFront(): any;
  peekRear(): any;
  isEmpty(): boolean;
  size: number;
  clear(): void;
  toString(): string;
};

describe('Deque (deque.js)', () => {
  let deque: InstanceType<typeof Deque>;

  beforeEach(() => {
    deque = new Deque();
  });

  test('should add an element to the front of the deque', () => {
    deque.addFront(1);
    deque.addFront(2);
    expect(deque.toString()).toBe('2, 1');
  });

  test('should add an element to the rear of the deque', () => {
    deque.addRear(1);
    deque.addRear(2);
    expect(deque.toString()).toBe('1, 2');
  });

  test('should remove an element from the front of the deque', () => {
    deque.addFront(1);
    deque.addFront(2);
    expect(deque.removeFront()).toBe(2);
    expect(deque.toString()).toBe('1');
  });

  test('should return undefined when removing from the front of an empty deque', () => {
    expect(deque.removeFront()).toBeUndefined();
  });

  test('should remove an element from the rear of the deque', () => {
    deque.addRear(1);
    deque.addRear(2);
    expect(deque.removeRear()).toBe(2);
    expect(deque.toString()).toBe('1');
  });

  test('should return undefined when removing from the rear of an empty deque', () => {
    expect(deque.removeRear()).toBeUndefined();
  });

  test('should return the front element of the deque', () => {
    deque.addFront(1);
    deque.addFront(2);
    expect(deque.peekFront()).toBe(2);
  });

  test('should return undefined when peeking the front of an empty deque', () => {
    expect(deque.peekFront()).toBeUndefined();
  });

  test('should return the rear element of the deque', () => {
    deque.addRear(1);
    deque.addRear(2);
    expect(deque.peekRear()).toBe(2);
  });

  test('should return undefined when peeking the rear of an empty deque', () => {
    expect(deque.peekRear()).toBeUndefined();
  });

  test('should return true if the deque is empty', () => {
    expect(deque.isEmpty()).toBe(true);
  });

  test('should return false if the deque is not empty', () => {
    deque.addFront(1);
    expect(deque.isEmpty()).toBe(false);
  });

  test('should return the size of the deque', () => {
    deque.addFront(1);
    deque.addFront(2);
    expect(deque.size).toBe(2);
  });

  test('should clear the deque', () => {
    deque.addFront(1);
    deque.addFront(2);
    deque.clear();
    expect(deque.isEmpty()).toBe(true);
    expect(deque.size).toBe(0);
  });

  test('should convert an empty deque to string', () => {
    expect(deque.toString()).toBe('Empty Deque');
  });

  test('should convert the deque to a string with primitive values', () => {
    deque.addRear(1);
    deque.addRear('two');
    expect(deque.toString()).toBe('1, two');
  });

  test('should convert the deque to a string with objects', () => {
    deque.addFront({ key: 'a', value: 1 });
    deque.addFront({ key: 'b', value: 2 });
    expect(deque.toString()).toBe('{"key":"b","value":2}, {"key":"a","value":1}');
  });
});
