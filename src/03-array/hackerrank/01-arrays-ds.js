// Path: src/03-array/hackerrank/01-arrays-ds.js
// Problem: https://www.hackerrank.com/challenges/arrays-ds/problem
// Solution 1
function reverseArray(a) {
    return a.reverse();
}
// Solution 2
function reverseArray2(a) {
    const result = [];
    for (let i = a.length - 1; i >= 0; i--) {
        result.push(a[i]);
    }
    return result;
}
// Solution 3
function reverseArray3(a) {
    return a.map((_, i) => a[a.length - 1 - i]);
}
// Solution 4
function reverseArray4(a) {
    const result = [];
    for (let i = 0; i < a.length; i++) {
        result.unshift(a[i]);
    }
    return result;
}
// Test cases
console.log(reverseArray([1, 4, 3, 2])); // [2, 3, 4, 1]
console.log(reverseArray2([1, 4, 3, 2])); // [2, 3, 4, 1]
console.log(reverseArray3([1, 4, 3, 2])); // [2, 3, 4, 1]
console.log(reverseArray4([1, 4, 3, 2])); // [2, 3, 4, 1]
