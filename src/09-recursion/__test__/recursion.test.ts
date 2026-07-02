import { describe, expect, test } from '@jest/globals';
import { factorialIterative, factorial } from '../02-factorial';
import { fibonacciIterative, fibonacci, fibonacciMemoization } from '../04-fibonacci';

// ─── factorial ────────────────────────────────────────────────────────────────

describe('factorialIterative', () => {
  test('factorial(0) = 1', () => {
    expect(factorialIterative(0)).toBe(1);
  });

  test('factorial(1) = 1', () => {
    expect(factorialIterative(1)).toBe(1);
  });

  test('factorial(5) = 120', () => {
    expect(factorialIterative(5)).toBe(120);
  });

  test('factorial(10) = 3628800', () => {
    expect(factorialIterative(10)).toBe(3628800);
  });

  test('negative input returns undefined', () => {
    expect(factorialIterative(-1)).toBeUndefined();
    expect(factorialIterative(-5)).toBeUndefined();
  });
});

describe('factorial (recursive)', () => {
  test('factorial(0) = 1', () => {
    expect(factorial(0)).toBe(1);
  });

  test('factorial(1) = 1', () => {
    expect(factorial(1)).toBe(1);
  });

  test('factorial(5) = 120', () => {
    expect(factorial(5)).toBe(120);
  });

  test('factorial(10) = 3628800', () => {
    expect(factorial(10)).toBe(3628800);
  });

  test('negative input returns undefined', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});

describe('factorial implementations match', () => {
  test('iterative and recursive return the same results', () => {
    for (const n of [0, 1, 2, 3, 5, 7, 10]) {
      expect(factorialIterative(n)).toBe(factorial(n));
    }
  });
});

// ─── fibonacci ────────────────────────────────────────────────────────────────

describe('fibonacciIterative', () => {
  test('fib(0) = 0', () => expect(fibonacciIterative(0)).toBe(0));
  test('fib(1) = 1', () => expect(fibonacciIterative(1)).toBe(1));
  test('fib(2) = 1', () => expect(fibonacciIterative(2)).toBe(1));
  test('fib(5) = 5', () => expect(fibonacciIterative(5)).toBe(5));
  test('fib(10) = 55', () => expect(fibonacciIterative(10)).toBe(55));

  test('negative input throws Error', () => {
    expect(() => fibonacciIterative(-1)).toThrow(Error);
  });
});

describe('fibonacci (recursive)', () => {
  test('fib(0) = 0', () => expect(fibonacci(0)).toBe(0));
  test('fib(1) = 1', () => expect(fibonacci(1)).toBe(1));
  test('fib(2) = 1', () => expect(fibonacci(2)).toBe(1));
  test('fib(5) = 5', () => expect(fibonacci(5)).toBe(5));
  test('fib(10) = 55', () => expect(fibonacci(10)).toBe(55));

  test('negative input throws Error', () => {
    expect(() => fibonacci(-1)).toThrow(Error);
  });
});

describe('fibonacciMemoization', () => {
  test('fib(0) = 0', () => expect(fibonacciMemoization(0)).toBe(0));
  test('fib(1) = 1', () => expect(fibonacciMemoization(1)).toBe(1));
  test('fib(2) = 1', () => expect(fibonacciMemoization(2)).toBe(1));
  test('fib(5) = 5', () => expect(fibonacciMemoization(5)).toBe(5));
  test('fib(10) = 55', () => expect(fibonacciMemoization(10)).toBe(55));

  test('negative input throws Error', () => {
    expect(() => fibonacciMemoization(-1)).toThrow(Error);
  });
});

describe('fibonacci implementations match', () => {
  test('all three return the same values', () => {
    for (const n of [0, 1, 2, 3, 5, 8, 10]) {
      const expected = fibonacciIterative(n);
      expect(fibonacci(n)).toBe(expected);
      expect(fibonacciMemoization(n)).toBe(expected);
    }
  });
});
