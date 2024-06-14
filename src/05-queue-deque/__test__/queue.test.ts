import {describe, expect, test, beforeEach} from '@jest/globals';
import Queue from '../queue';

describe('Queue', () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  test('should enqueue and dequeue elements correctly', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toBe(true);
  });

  test('should return undefined when dequeueing from an empty queue', () => {
    expect(queue.dequeue()).toBeUndefined();
  });

  test('should return the correct size after enqueueing and dequeueing elements', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    queue.dequeue();
    queue.dequeue();

    expect(queue.size).toBe(1);
  });

  test('should return the correct front element after enqueueing and dequeueing elements', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    queue.dequeue();

    expect(queue.front()).toBe(2);
  });

  test('should return undefined when calling front on an empty queue', () => {
    expect(queue.front()).toBeUndefined();
  });

  test('should clear the queue and return the correct size', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    queue.clear();

    expect(queue.isEmpty()).toBe(true);
    expect(queue.size).toBe(0);
  });

  test('should convert the queue to a string', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.toString()).toBe('1, 2, 3');
  });

  test('should convert the queue to a string with empty queue', () => {
    expect(queue.toString()).toBe('Empty Queue');
  });

  test('should convert the queue to a string with object', () => {
    queue.enqueue({name: 'John', age: 30});
    queue.enqueue({name: 'Jane', age: 25});
    queue.enqueue({name: 'Doe', age: 40});

    expect(queue.toString()).toBe(
      '{"name":"John","age":30}, {"name":"Jane","age":25}, {"name":"Doe","age":40}',
    );
  });
});
