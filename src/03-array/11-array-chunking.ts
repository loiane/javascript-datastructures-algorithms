// src/03-array/11-array-chunking.ts

/**
 * Array Chunking - Split an array into chunks of a specified size
 * Common use case: Pagination, batch processing, data visualization
 */

// Approach 1: Using slice method
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be greater than 0');
  }
  
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

// Approach 2: Using splice method (modifies original array)
function chunkArraySplice<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be greater than 0');
  }
  
  const result: T[][] = [];
  const arrayCopy = [...array]; // Create a copy to avoid modifying original
  
  while (arrayCopy.length > 0) {
    result.push(arrayCopy.splice(0, chunkSize));
  }
  return result;
}

// Approach 3: Using reduce method (functional approach)
function chunkArrayReduce<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be greater than 0');
  }
  
  return array.reduce((chunks: T[][], item: T, index: number) => {
    const chunkIndex = Math.floor(index / chunkSize);
    
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = []; // Start a new chunk
    }
    
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
}

// Examples
console.log('=== Array Chunking Examples ===\n');

const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Original array:', numbers);

console.log('\nChunk size 3 (slice method):', chunkArray(numbers, 3));
// Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]

console.log('Chunk size 4 (splice method):', chunkArraySplice(numbers, 4));
// Output: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10]]

console.log('Chunk size 2 (reduce method):', chunkArrayReduce(numbers, 2));
// Output: [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]

// Real-world example: Paginating data
const users: string[] = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve', 
  'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'
];

const itemsPerPage = 3;
const pages = chunkArray(users, itemsPerPage);

console.log('\n=== Pagination Example ===');
console.log(`Total users: ${users.length}`);
console.log(`Items per page: ${itemsPerPage}`);
console.log(`Total pages: ${pages.length}\n`);

pages.forEach((page, index) => {
  console.log(`Page ${index + 1}:`, page);
});

// Edge cases
console.log('\n=== Edge Cases ===');
console.log('Empty array:', chunkArray([], 3));
console.log('Chunk size larger than array:', chunkArray([1, 2], 5));
console.log('Chunk size of 1:', chunkArray([1, 2, 3], 1));

// to see the output of this file use the command: node src/03-array/11-array-chunking.ts
