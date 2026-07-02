import { describe, expect, test } from '@jest/globals';
import { towerOfHanoi } from '../tower-of-hanoi';
import Stack from '../stack';

function makeSourceStack(n: number): Stack<number> {
  const source = new Stack<number>();
  for (let i = n; i >= 1; i--) {
    source.push(i);
  }
  return source;
}

describe('towerOfHanoi', () => {
  test('n=0: destination stays empty, source stays empty', () => {
    const source = new Stack<number>();
    const auxiliary = new Stack<number>();
    const destination = new Stack<number>();
    towerOfHanoi(0, source, auxiliary, destination);
    expect(destination.isEmpty()).toBe(true);
    expect(source.isEmpty()).toBe(true);
  });

  test('n=1: destination has [1], source is empty', () => {
    const source = makeSourceStack(1);
    const auxiliary = new Stack<number>();
    const destination = new Stack<number>();
    towerOfHanoi(1, source, auxiliary, destination);
    expect(source.isEmpty()).toBe(true);
    expect(destination.peek()).toBe(1);
    expect(destination.size).toBe(1);
  });

  test('n=2: destination has [2,1] (2 bottom, 1 top), source empty', () => {
    const source = makeSourceStack(2);
    const auxiliary = new Stack<number>();
    const destination = new Stack<number>();
    towerOfHanoi(2, source, auxiliary, destination);
    expect(source.isEmpty()).toBe(true);
    expect(destination.size).toBe(2);
    expect(destination.pop()).toBe(1); // top
    expect(destination.pop()).toBe(2); // bottom
  });

  test('n=3: destination has [3,2,1], source empty, auxiliary empty', () => {
    const source = makeSourceStack(3);
    const auxiliary = new Stack<number>();
    const destination = new Stack<number>();
    towerOfHanoi(3, source, auxiliary, destination);
    expect(source.isEmpty()).toBe(true);
    expect(auxiliary.isEmpty()).toBe(true);
    expect(destination.size).toBe(3);
    expect(destination.pop()).toBe(1);
    expect(destination.pop()).toBe(2);
    expect(destination.pop()).toBe(3);
  });

  test('n=3 results in all disks on destination', () => {
    const source = makeSourceStack(3);
    const auxiliary = new Stack<number>();
    const destination = new Stack<number>();
    towerOfHanoi(3, source, auxiliary, destination);
    expect(destination.size).toBe(3);
    expect(source.isEmpty()).toBe(true);
    expect(auxiliary.isEmpty()).toBe(true);
  });
});
