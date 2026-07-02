// iterative approach
/**
 * Computes the nth Fibonacci number iteratively.
 * @param n - Non-negative integer index
 * @returns The nth Fibonacci number
 * @complexity Time O(n) | Space O(1)
 */
export function fibonacciIterative(n: number): number {
  if (n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  if (n < 2) { return n; }

  let prevPrev = 0;
  let prev = 1;
  let current = 0;

  for (let i = 2; i <= n; i++) { // n >= 2
    current = prev + prevPrev; // f(n-1) + f(n-2)
    prevPrev = prev;
    prev = current;
  }

  return current;
}

console.log('fibonacciIterative(2)', fibonacciIterative(2)); // 1
console.log('fibonacciIterative(3)', fibonacciIterative(3)); // 2
console.log('fibonacciIterative(4)', fibonacciIterative(4)); // 3
console.log('fibonacciIterative(5)', fibonacciIterative(5)); // 5

// recursive approach
/**
 * Computes the nth Fibonacci number recursively.
 * @param n - Non-negative integer index
 * @returns The nth Fibonacci number
 * @complexity Time O(2^n) | Space O(n) call stack
 */
export function fibonacci(n: number): number {
  if (n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  if (n < 2) { return n; } // base case
  return fibonacci(n - 1) + fibonacci(n - 2); // recursive case
}

console.log('fibonacci(5)', fibonacci(5)); // 5

// memoization approach
/**
 * Computes the nth Fibonacci number using memoization.
 * @param n - Non-negative integer index
 * @returns The nth Fibonacci number
 * @complexity Time O(n) | Space O(n) memo table
 */
export function fibonacciMemoization(n: number): number {
  if (n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  const memo: number[] = [0, 1];
  const fibonacci = (n: number): number => {
    if (memo[n] != null) return memo[n]!;
    return (memo[n] = fibonacci(n - 1) + fibonacci(n - 2));
  };
  return fibonacci(n);
}

console.log('fibonacciMemoization(5)', fibonacciMemoization(5)); // 5

// to see the output of this file use the command: node src/09-recursion/04-fibonacci.ts
