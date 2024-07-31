// https://leetcode.com/problems/fibonacci-number/description/

function fib(n: number): number {
  if (n < 2) { return n; }

  let prevPrev = 0;
  let prev = 1;
  let current;

  for (let i = 2; i <= n; i++) { // n >= 2
    current = prev + prevPrev; // f(n-1) + f(n-2)
    prevPrev = prev;
    prev = current;
  }
  
  return current;
};