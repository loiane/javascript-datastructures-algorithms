export function factorialIterative(number: number) {
  if (number < 0) {
    return undefined;
  }
  let total = 1;
  for (let n = number; n > 1; n--) {
    total  *= n;
  }
  return total;
}

export function factorial(n: number): number {
  if (n < 0) {
    return undefined;
  }
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
