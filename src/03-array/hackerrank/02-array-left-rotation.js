// Path: src/03-array/hackerrank/02-array-left-rotation.js
// Problem: https://www.hackerrank.com/challenges/array-left-rotation/problem
// Solution 1
function rotLeft(a, d) {
    return a.concat(a.splice(0, d));
}
// Solution 2
function rotLeft2(a, d) {
    return [...a.slice(d), ...a.slice(0, d)];
}
// Test cases
console.log(rotLeft([1, 2, 3, 4, 5], 4)); // [5, 1, 2, 3, 4]
console.log(rotLeft2([1, 2, 3, 4, 5], 4)); // [5, 1, 2, 3, 4]
