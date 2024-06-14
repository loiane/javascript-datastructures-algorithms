import {describe, expect, test, beforeEach} from '@jest/globals';
import Deque from '../deque';

describe('Deque', () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque<number>();
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
    deque.removeFront();
    expect(deque.toString()).toBe('1');
  });

  test('should return undefined when removing from an empty deque', () => {
    expect(deque.removeFront()).toBeUndefined();
  });

  test('should remove an element from the rear of the deque', () => {
    deque.addRear(1);
    deque.addRear(2);
    deque.removeRear();
    expect(deque.toString()).toBe('1');
  });

  test('should return undefined when removing from an empty deque', () => {
    expect(deque.removeRear()).toBeUndefined();
  });

  test('should return the front element of the deque', () => {
    deque.addFront(1);
    deque.addFront(2);
    expect(deque.peekFront()).toBe(2);
  });

  test('should return undefined when peeking from an empty deque', () => {
    expect(deque.peekFront()).toBeUndefined();
  });

  test('should return the rear element of the deque', () => {
    deque.addRear(1);
    deque.addRear(2);
    expect(deque.peekRear()).toBe(2);
  });

  test('should return undefined when peeking from an empty deque', () => {
    expect(deque.peekRear()).toBeUndefined();
  });  

  test('should return true if the deque is empty', () => {
    expect(deque.isEmpty()).toBe(true);
  });

  test('should return the size of the deque', () => {
    deque.addFront(1);
    deque.addFront(2);
    expect(deque.size()).toBe(2);
  });

  test('should clear the deque', () => {
    deque.addFront(1);
    deque.addFront(2);
    deque.clear();
    expect(deque.isEmpty()).toBe(true);
  });

  test('should convert the deque to a string', () => {
    expect(deque.toString()).toBe('Empty Deque');
  });

  test('should convert the deque to a string with objects', () => {
    const deque = new Deque<{key: string, value: number}>();

    deque.addFront({key: 'a', value: 1});
    deque.addFront({key: 'b', value: 2});
    deque.addFront({key: 'c', value: 3});

    expect(deque.toString()).toBe('{"key":"c","value":3}, {"key":"b","value":2}, {"key":"a","value":1}');
  });
});
