import { describe, expect, test, beforeEach } from '@jest/globals';
import Heap from '../heap';

describe('Heap (min-heap default)', () => {
  let heap: Heap<number>;

  beforeEach(() => {
    heap = new Heap<number>();
  });

  // ─── insert / peek ──────────────────────────────────────────────────────────

  test('insert and peek returns the minimum element', () => {
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    expect(heap.peek()).toBe(3);
  });

  test('insert returns true for valid values', () => {
    expect(heap.insert(1)).toBe(true);
  });

  // ─── extract ────────────────────────────────────────────────────────────────

  test('extract removes and returns the minimum', () => {
    heap.insert(4);
    heap.insert(1);
    heap.insert(7);
    expect(heap.extract()).toBe(1);
    expect(heap.peek()).toBe(4);
  });

  test('extract on empty heap returns undefined', () => {
    expect(heap.extract()).toBeUndefined();
  });

  // ─── size / isEmpty ─────────────────────────────────────────────────────────

  test('size tracks element count', () => {
    expect(heap.size).toBe(0);
    heap.insert(1);
    heap.insert(2);
    expect(heap.size).toBe(2);
    heap.extract();
    expect(heap.size).toBe(1);
  });

  test('isEmpty returns true on empty heap', () => {
    expect(heap.isEmpty()).toBe(true);
    heap.insert(1);
    expect(heap.isEmpty()).toBe(false);
  });

  // ─── min-heap property ──────────────────────────────────────────────────────

  test('extract always returns the smallest element', () => {
    const values = [9, 3, 7, 1, 5, 2, 8, 4, 6];
    values.forEach(v => heap.insert(v));
    const extracted: number[] = [];
    while (!heap.isEmpty()) {
      extracted.push(heap.extract()!);
    }
    expect(extracted).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  // ─── heapify ────────────────────────────────────────────────────────────────

  test('heapify builds a valid heap from an array', () => {
    heap.heapify([5, 3, 8, 1, 4]);
    const extracted: number[] = [];
    while (!heap.isEmpty()) {
      extracted.push(heap.extract()!);
    }
    expect(extracted).toEqual([1, 3, 4, 5, 8]);
  });

  // ─── toArray ────────────────────────────────────────────────────────────────

  test('toArray returns a copy of internal array', () => {
    heap.insert(2);
    heap.insert(1);
    heap.insert(3);
    const arr = heap.toArray();
    expect(arr).toHaveLength(3);
    expect(arr).toContain(1);
    expect(arr).toContain(2);
    expect(arr).toContain(3);
  });

  // ─── clear ──────────────────────────────────────────────────────────────────

  test('clear empties the heap', () => {
    heap.insert(1);
    heap.insert(2);
    heap.clear();
    expect(heap.isEmpty()).toBe(true);
    expect(heap.size).toBe(0);
  });

  // ─── custom comparator: max-heap ────────────────────────────────────────────

  test('custom comparator creates a max-heap', () => {
    const maxHeap = new Heap<number>((a, b) => b - a);
    [3, 1, 4, 1, 5, 9, 2, 6].forEach(v => maxHeap.insert(v));
    const extracted: number[] = [];
    while (!maxHeap.isEmpty()) {
      extracted.push(maxHeap.extract()!);
    }
    expect(extracted).toEqual([9, 6, 5, 4, 3, 2, 1, 1]);
  });
});
