import { describe, expect, test, beforeEach } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Queue = require('../queue.js') as new () => {
  enqueue(item: any): void;
  dequeue(): any;
  front(): any;
  isEmpty(): boolean;
  size: number;
  clear(): void;
  toString(): string;
};

describe('Queue (queue.js)', () => {
  let queue: InstanceType<typeof Queue>;

  beforeEach(() => {
    queue = new Queue();
  });

  test('should create an empty queue', () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size).toBe(0);
    expect(queue.front()).toBeUndefined();
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.toString()).toBe('Empty Queue');
  });

  test('should enqueue items to the rear of the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.size).toBe(3);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.toString()).toBe('1, 2, 3');
  });

  test('should return the front item without removing it', () => {
    queue.enqueue('a');
    queue.enqueue('b');
    expect(queue.front()).toBe('a');
    expect(queue.size).toBe(2);
  });

  test('should dequeue items in FIFO order', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.size).toBe(1);
    expect(queue.front()).toBe(3);
    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.dequeue()).toBeUndefined();
  });

  test('should clear all items from the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size).toBe(0);
    expect(queue.toString()).toBe('Empty Queue');
  });

  test('should stringify object items using JSON.stringify', () => {
    queue.enqueue({ a: 1 });
    queue.enqueue([1, 2]);
    expect(queue.toString()).toBe('{"a":1}, [1,2]');
  });

  test('should stringify primitive items using String()', () => {
    queue.enqueue(1);
    queue.enqueue('two');
    queue.enqueue(true);
    queue.enqueue(null);
    queue.enqueue(undefined);
    expect(queue.toString()).toBe('1, two, true, null, undefined');
  });

  test('should handle a single item', () => {
    queue.enqueue(42);
    expect(queue.size).toBe(1);
    expect(queue.front()).toBe(42);
    expect(queue.toString()).toBe('42');
    expect(queue.dequeue()).toBe(42);
    expect(queue.isEmpty()).toBe(true);
  });
});
