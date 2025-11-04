// src/03-array/12-flatten-arrays.ts

/**
 * Flatten Nested Arrays - Convert multi-dimensional arrays into a single-dimensional array
 * Common use case: Data processing, tree traversal results, nested data structures
 */

// Approach 1: Using flat() method (ES2019+)
function flattenSimple<T>(array: any[], depth: number = 1): T[] {
  return array.flat(depth);
}

// Approach 2: Deep flatten using flat(Infinity)
function flattenDeep<T>(array: any[]): T[] {
  return array.flat(Infinity);
}

// Approach 3: Recursive approach (custom implementation)
function flattenRecursive<T>(array: any[]): T[] {
  const result: T[] = [];
  
  for (let item of array) {
    if (Array.isArray(item)) {
      result.push(...flattenRecursive<T>(item));
    } else {
      result.push(item);
    }
  }
  
  return result;
}

// Approach 4: Using reduce (functional approach)
function flattenReduce<T>(array: any[]): T[] {
  return array.reduce((acc: T[], item: any) => {
    return acc.concat(Array.isArray(item) ? flattenReduce<T>(item) : item);
  }, []);
}

// Approach 5: Iterative approach using stack
function flattenIterative<T>(array: any[]): T[] {
  const stack = [...array];
  const result: T[] = [];
  
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

const nestedArray: any[] = [1, [2, 3], [4, [5, 6]], [[[7]]], 8];
console.log('Original nested array:', JSON.stringify(nestedArray));

console.log('\nFlat with depth 1:', flattenSimple(nestedArray, 1));
// Output: [1, 2, 3, 4, [5, 6], [[7]], 8]

console.log('Flat with depth 2:', flattenSimple(nestedArray, 2));
// Output: [1, 2, 3, 4, 5, 6, [7], 8]

console.log('Deep flatten (Infinity):', flattenDeep<number>(nestedArray));
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

console.log('Recursive flatten:', flattenRecursive<number>(nestedArray));
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

console.log('Reduce flatten:', flattenReduce<number>(nestedArray));
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

console.log('Iterative flatten:', flattenIterative<number>(nestedArray));
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

// Real-world example: Flattening category hierarchies
console.log('\n=== Real-World Example: Category Hierarchy ===');

const categories: any[] = [
  'Electronics',
  ['Computers', ['Laptops', 'Desktops', ['Gaming PCs', 'Workstations']]],
  ['Mobile', ['Smartphones', 'Tablets']],
  'Books',
  ['Fiction', ['Sci-Fi', 'Fantasy']]
];

console.log('Original categories:', JSON.stringify(categories));
console.log('Flattened categories:', flattenDeep<string>(categories));

// Performance comparison
console.log('\n=== Performance Comparison ===');

const largeNestedArray: any[] = [
  [1, 2, [3, 4]], 
  [5, [6, [7, 8]]], 
  [[9, 10], 11], 
  [12, [13, [14, [15]]]]
];

console.time('flat(Infinity)');
flattenDeep<number>(largeNestedArray);
console.timeEnd('flat(Infinity)');

console.time('Recursive');
flattenRecursive<number>(largeNestedArray);
console.timeEnd('Recursive');

console.time('Reduce');
flattenReduce<number>(largeNestedArray);
console.timeEnd('Reduce');

console.time('Iterative');
flattenIterative<number>(largeNestedArray);
console.timeEnd('Iterative');

// Edge cases
console.log('\n=== Edge Cases ===');
console.log('Empty array:', flattenDeep([]));
console.log('Already flat array:', flattenDeep([1, 2, 3, 4]));
console.log('Array with empty arrays:', flattenDeep([1, [], [2, []], 3]));
console.log('Mixed types:', flattenDeep([1, 'hello', [true, [null, undefined]], { key: 'value' }]));

// to see the output of this file use the command: node src/03-array/12-flatten-arrays.ts
