import { describe, expect, test, beforeEach } from '@jest/globals';
import Stack from '../stack-object';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('push should add an item to the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.size).toBe(3);
  });

  test('pop should remove and return the top item from the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    const poppedItem = stack.pop();

    expect(poppedItem).toBe(3);
    expect(stack.size).toBe(2);
  });

  test('pop should return undefined if the stack is empty', () => {
    expect(stack.pop()).toBeUndefined();
  });

  test('peek should return the top item from the stack without removing it', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    const topItem = stack.peek();

    expect(topItem).toBe(3);
    expect(stack.size).toBe(3);
  });

  test('isEmpty should return true if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);

    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  test('size should return the number of items in the stack', () => {
    expect(stack.size).toBe(0);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.size).toBe(3);
  });

  test('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.clear();

    expect(stack.size).toBe(0);
    expect(stack.isEmpty()).toBe(true);
  });

  test('toString should return a string representation of the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.toString()).toBe('1, 2, 3');
  });

  test('toString should return an empty string if the stack is empty', () => {
    expect(stack.toString()).toBe('Empty Stack');
  });

  test('toString should return a string representation of the stack with custom object', () => {
    const stack = new Stack<{ key: string; value: number }>();

    stack.push({ key: 'a', value: 1 });
    stack.push({ key: 'b', value: 2 });
    stack.push({ key: 'c', value: 3 });

    expect(stack.toString()).toBe(
      '{"key":"a","value":1}, {"key":"b","value":2}, {"key":"c","value":3}'
    );
  });
});