export function knapSack(capacity: number, weights: number[], values: number[], n: number): number {
  if (n === 0 || capacity === 0) {
    return 0;
  }

  if (weights[n - 1] > capacity) {
    return knapSack(capacity, weights, values, n - 1);
  } else {
    const a: number = values[n - 1] + knapSack(capacity - weights[n - 1], weights, values, n - 1);
    const b: number = knapSack(capacity, weights, values, n - 1);
    return a > b ? a : b;
  }
}
