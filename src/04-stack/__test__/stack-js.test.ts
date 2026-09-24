import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Stack = require('../stack.js') as new () => {
  push(item: any): void;
  pop(): any;
  peek(): any;
  isEmpty(): boolean;
  size: number;
  clear(): void;
  toString(): string;
};

describe('Stack (stack.js)', () => {
  let stack: InstanceType<typeof Stack>;

  beforeEach(() => {
    stack = new Stack();
  });

  test('should create an empty stack', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size).toBe(0);
    expect(stack.peek()).toBeUndefined();
    expect(stack.pop()).toBeUndefined();
    expect(stack.toString()).toBe('Empty Stack');
  });

  test('should push items onto the top of the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.size).toBe(3);
    expect(stack.isEmpty()).toBe(false);
    expect(stack.toString()).toBe('1, 2, 3');
  });

  test('should peek the top item without removing it', () => {
    stack.push('a');
    stack.push('b');
    expect(stack.peek()).toBe('b');
    expect(stack.size).toBe(2);
  });

  test('should pop items in LIFO order', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.size).toBe(1);
    expect(stack.peek()).toBe(1);
    expect(stack.pop()).toBe(1);
    expect(stack.isEmpty()).toBe(true);
    expect(stack.pop()).toBeUndefined();
  });

  test('should clear all items from the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size).toBe(0);
    expect(stack.toString()).toBe('Empty Stack');
  });

  test('should stringify object items using JSON.stringify', () => {
    stack.push({ a: 1 });
    stack.push([1, 2]);
    expect(stack.toString()).toBe('{"a":1}, [1,2]');
  });

  test('should stringify primitive items using String()', () => {
    stack.push(1);
    stack.push('two');
    stack.push(true);
    stack.push(null);
    stack.push(undefined);
    expect(stack.toString()).toBe('1, two, true, null, undefined');
  });

  test('should handle a single item', () => {
    stack.push(42);
    expect(stack.size).toBe(1);
    expect(stack.peek()).toBe(42);
    expect(stack.toString()).toBe('42');
    expect(stack.pop()).toBe(42);
    expect(stack.isEmpty()).toBe(true);
  });
});
