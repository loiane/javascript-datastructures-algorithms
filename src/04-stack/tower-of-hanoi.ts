// src/04-stack/tower-of-hanoi.ts
import Stack from './stack';

/**
 * Solves the Tower of Hanoi puzzle recursively.
 * Moves n disks from source to destination using auxiliary as helper.
 *
 * @param n - Number of disks
 * @param source - Source stack (contains disks)
 * @param auxiliary - Auxiliary/helper stack
 * @param destination - Destination stack
 * @complexity Time O(2^n) | Space O(n) recursion depth
 */
export function towerOfHanoi<T>(
  n: number,
  source: Stack<T>,
  auxiliary: Stack<T>,
  destination: Stack<T>
): void {
  if (n > 0) {
    towerOfHanoi(n - 1, source, destination, auxiliary);
    destination.push(source.pop()!);
    towerOfHanoi(n - 1, auxiliary, source, destination);
  }
}
