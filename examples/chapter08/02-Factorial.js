// @ts-check

function factorialIterative(number) {
  if (number < 0) {
    return undefined;
  }
  let total = 1;
  for (let n = number; n > 1; n--) {
    total  = total * n;
  }
  return total;
}

console.log('factorialIterative(5): ', factorialIterative(5));
console.log('factorialIterative(3): ', factorialIterative(3));

function factorial(n) {
  // console.trace();
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log('factorial(5): ', factorial(5));
console.log('factorial(3): ', factorial(3));
