// iterative approach
/**
 * Computes n! iteratively.
 * @param number - Non-negative integer
 * @returns The factorial, or undefined for negative input
 * @complexity Time O(n) | Space O(1)
 */
export function factorialIterative(number: number): number | undefined {
  if (number < 0) {
    return undefined;
  }
  let total = 1;
  for (let n = number; n > 1; n--) {
    total *= n;
  }
  return total;
}

console.log('5! =', factorialIterative(5)); // 5! = 120

// recursive approach
/**
 * Computes n! recursively.
 * @param number - Non-negative integer
 * @returns The factorial, or undefined for negative input
 * @complexity Time O(n) | Space O(n) call stack
 */
export function factorial(number: number): number | undefined {
  if (number < 0) { return undefined; }
  if (number === 1 || number === 0) { // base case
    return 1;
  }
  return number * (factorial(number - 1) ?? 1);
}

console.log('Recursive 5! =', factorial(5)); // Recursive 5! = 120

// to see the output of this file use the command: node src/09-recursion/02-factorial.ts
