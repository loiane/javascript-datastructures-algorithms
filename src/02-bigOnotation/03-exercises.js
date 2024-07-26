// Path: src/02-bigOnotation/03-exercises.js

/* What is the time and space complexities for each of the following functions. 
   Try them with different inputs to explore how they behave with different inputs */

// time complexity: O(1) - Constant Time
// space complexity: O(1) - Constant Space
const oddOrEven = (array) => array.length % 2 === 0 ? 'even' : 'odd';

console.log(oddOrEven([1, 2, 3, 4, 5])); // odd
console.log(oddOrEven([1, 2, 3, 4, 5, 6])); // even

// time complexity: O(n) - Linear Time
// space complexity: O(1) - Constant Space
function calculateAverage(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}

console.log(calculateAverage([1, 2, 3, 4, 5])); // 3
console.log(calculateAverage([1, 2, 3, 4, 5, 6])); // 3.5

// time complexity: O(n^2) - Quadratic Time
// space complexity: O(1) - Constant Space
function hasCommonElements(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        return true;
      }
    }
  }
  return false;
}

console.log(hasCommonElements([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])); // false
console.log(hasCommonElements([1, 2, 3, 4, 5], [5, 6, 7, 8, 9])); // true

// time complexity: O(n) - Linear Time
// space complexity: O(n) - Linear Space
function getOddNumbers(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      result.push(array[i]);
    }
  }
  return result;
}

console.log(getOddNumbers([1, 2, 3, 4, 5])); // [1, 3, 5]
console.log(getOddNumbers([1, 2, 3, 4, 5, 6])); // [1, 3, 5]

// to see the output of this file use the command: node src/02-bigOnotation/03-exercises.js