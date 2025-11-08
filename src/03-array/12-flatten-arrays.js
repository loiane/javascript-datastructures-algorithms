// src/03-array/12-flatten-arrays.js

/**
 * Flatten Nested Arrays - Convert multi-dimensional arrays into a single-dimensional array
 * Common use case: Data processing, tree traversal results, nested data structures
 */

// Approach 1: Using flat() method (ES2019+)
function flattenSimple(array, depth = 1) {
  return array.flat(depth);
}

// Approach 2: Deep flatten using flat(Infinity)
function flattenDeep(array) {
  return array.flat(Infinity);
}

// Approach 3: Recursive approach (custom implementation)
function flattenRecursive(array) {
  const result = [];
  
  for (let item of array) {
    if (Array.isArray(item)) {
      result.push(...flattenRecursive(item));
    } else {
      result.push(item);
    }
  }
  
  return result;
}

// Approach 4: Using reduce (functional approach)
function flattenReduce(array) {
  return array.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flattenReduce(item) : item);
  }, []);
}

// Approach 5: Iterative approach using stack
function flattenIterative(array) {
  const stack = [...array];
  const result = [];
  
  while (stack.length) {
    const item = stack.pop();
    
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item); // Add to beginning since we're popping from end
    }
  }
  
  return result;
}

// Examples
console.log('=== Flatten Arrays Examples ===\n');

const nestedArray = [1, [2, 3], [4, [5, 6]], [[[7]]], 8];
console.log('Original nested array:', JSON.stringify(nestedArray));

console.log('\nFlat with depth 1:', flattenSimple(nestedArray, 1));
// Output: [1, 2, 3, 4, [5, 6], [[7]], 8]

console.log('Flat with depth 2:', flattenSimple(nestedArray, 2));
// Output: [1, 2, 3, 4, 5, 6, [7], 8]

console.log('Deep flatten (Infinity):', flattenDeep(nestedArray));
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

console.log('Recursive flatten:', flattenRecursive(nestedArray));
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

console.log('Reduce flatten:', flattenReduce(nestedArray));
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

console.log('Iterative flatten:', flattenIterative(nestedArray));
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

// Real-world example: Flattening category hierarchies
console.log('\n=== Real-World Example: Category Hierarchy ===');

const categories = [
  'Electronics',
  ['Computers', ['Laptops', 'Desktops', ['Gaming PCs', 'Workstations']]],
  ['Mobile', ['Smartphones', 'Tablets']],
  'Books',
  ['Fiction', ['Sci-Fi', 'Fantasy']]
];

console.log('Original categories:', JSON.stringify(categories));
console.log('Flattened categories:', flattenDeep(categories));

// Performance comparison
console.log('\n=== Performance Comparison ===');

const largeNestedArray = [
  [1, 2, [3, 4]], 
  [5, [6, [7, 8]]], 
  [[9, 10], 11], 
  [12, [13, [14, [15]]]]
];

console.time('flat(Infinity)');
flattenDeep(largeNestedArray);
console.timeEnd('flat(Infinity)');

console.time('Recursive');
flattenRecursive(largeNestedArray);
console.timeEnd('Recursive');

console.time('Reduce');
flattenReduce(largeNestedArray);
console.timeEnd('Reduce');

console.time('Iterative');
flattenIterative(largeNestedArray);
console.timeEnd('Iterative');

// Edge cases
console.log('\n=== Edge Cases ===');
console.log('Empty array:', flattenDeep([]));
console.log('Already flat array:', flattenDeep([1, 2, 3, 4]));
console.log('Array with empty arrays:', flattenDeep([1, [], [2, []], 3]));
console.log('Mixed types:', flattenDeep([1, 'hello', [true, [null, undefined]], { key: 'value' }]));

// to see the output of this file use the command: node src/03-array/12-flatten-arrays.js
