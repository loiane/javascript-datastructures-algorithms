function fibonacci(n){
  if (n < 1) return 0; // {1}
  if (n <= 2) return 1; // {2}
  return fibonacci(n - 1) + fibonacci(n - 2); // {3}
}

console.log('fibonacci(2)', fibonacci(2));
console.log('fibonacci(3)', fibonacci(3));
console.log('fibonacci(4)', fibonacci(4));
console.log('fibonacci(5)', fibonacci(5));

function fibonacciIterative(n){
  let fibNMinus2 = 0;
  let fibNMinus1 = 1;
  let fibN = n;
  for (let i = 2; i <= n; i++) { // n >= 2
    fibN = fibNMinus1 + fibNMinus2; // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}

console.log('fibonacciIterative(2)', fibonacciIterative(2));
console.log('fibonacciIterative(3)', fibonacciIterative(3));
console.log('fibonacciIterative(4)', fibonacciIterative(4));
console.log('fibonacciIterative(5)', fibonacciIterative(5));

function fibonacciMemoization(n) {
  const memo = [0, 1];
  const fibonacci = (n) => {
    if (memo[n] != null) return memo[n];
    return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  };
  return fibonacci(n);
}

console.log('fibonacciMemoization(2)', fibonacciMemoization(2));
console.log('fibonacciMemoization(3)', fibonacciMemoization(3));
console.log('fibonacciMemoization(4)', fibonacciMemoization(4));
console.log('fibonacciMemoization(5)', fibonacciMemoization(5));

// https://jsperf.com/fibonacci-comparison-jsbook
