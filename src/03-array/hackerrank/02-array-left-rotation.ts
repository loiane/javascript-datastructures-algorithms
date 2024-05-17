// Path: src/03-array/hackerrank/02-array-left-rotation.ts
// Problem: https://www.hackerrank.com/challenges/array-left-rotation/problem

// Solution 1
function rotLeft(a: number[], d: number): number[] {
  return a.concat(a.splice(0, d));
}

// Solution 2
function rotLeft2(a: number[], d: number): number[] {
  return [...a.slice(d), ...a.slice(0, d)];
}

// Solution 3, swap the elements d times
function rotLeft3(a: number[], d: number): number[] {
  for (let i = 0; i < d; i++) {
    const temp = a[0];
    for (let j = 0; j < a.length - 1; j++) {
      a[j] = a[j + 1];
    }
    a[a.length - 1] = temp;
  }
  return a;
}


// Test cases
console.log(rotLeft([1, 2, 3, 4, 5], 4)); // [5, 1, 2, 3, 4]
console.log(rotLeft2([1, 2, 3, 4, 5], 4)); // [5, 1, 2, 3, 4]
