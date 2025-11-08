// src/03-array/13-remove-duplicates.js

/**
 * Remove Duplicates from Arrays - Multiple approaches to eliminate duplicate values
 * Common use case: Data cleaning, unique value extraction, filtering
 */

// Approach 1: Using Set (most efficient for primitives)
function removeDuplicatesSet(array) {
  return [...new Set(array)];
}

// Approach 2: Using filter and indexOf
function removeDuplicatesFilter(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

// Approach 3: Using reduce
function removeDuplicatesReduce(array) {
  return array.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item];
  }, []);
}

// Approach 4: Using a Map (preserves insertion order)
function removeDuplicatesMap(array) {
  const map = new Map();
  array.forEach(item => map.set(item, true));
  return Array.from(map.keys());
}

// Approach 5: Traditional loop approach
function removeDuplicatesLoop(array) {
  const unique = [];
  for (let i = 0; i < array.length; i++) {
    if (!unique.includes(array[i])) {
      unique.push(array[i]);
    }
  }
  return unique;
}

// Approach 6: Remove duplicates from array of objects (by property)
function removeDuplicatesByProperty(array, property) {
  const seen = new Set();
  return array.filter(item => {
    const value = item[property];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

// Examples
console.log('=== Remove Duplicates Examples ===\n');

const numbers = [1, 2, 3, 2, 4, 3, 5, 1, 6, 4];
console.log('Original array:', numbers);

console.log('\nUsing Set:', removeDuplicatesSet(numbers));
// Output: [1, 2, 3, 4, 5, 6]

console.log('Using filter:', removeDuplicatesFilter(numbers));
// Output: [1, 2, 3, 4, 5, 6]

console.log('Using reduce:', removeDuplicatesReduce(numbers));
// Output: [1, 2, 3, 4, 5, 6]

console.log('Using Map:', removeDuplicatesMap(numbers));
// Output: [1, 2, 3, 4, 5, 6]

console.log('Using loop:', removeDuplicatesLoop(numbers));
// Output: [1, 2, 3, 4, 5, 6]

// String array example
console.log('\n=== String Array Example ===');
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'grape', 'apple'];
console.log('Original:', fruits);
console.log('Unique:', removeDuplicatesSet(fruits));
// Output: ['apple', 'banana', 'orange', 'grape']

// Real-world example: Remove duplicate objects by property
console.log('\n=== Remove Duplicates from Objects ===');

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 1, name: 'Alice Smith', email: 'alice@example.com' }, // duplicate id
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com' } // duplicate id
];

console.log('Original users:', users.length);
const uniqueUsersById = removeDuplicatesByProperty(users, 'id');
console.log('Unique users by id:', uniqueUsersById.length);
console.log(uniqueUsersById);

const uniqueUsersByEmail = removeDuplicatesByProperty(users, 'email');
console.log('\nUnique users by email:', uniqueUsersByEmail.length);
console.log(uniqueUsersByEmail);

// Performance comparison
console.log('\n=== Performance Comparison ===');

const largeArray = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));

console.time('Set method');
removeDuplicatesSet(largeArray);
console.timeEnd('Set method');

console.time('Filter method');
removeDuplicatesFilter(largeArray);
console.timeEnd('Filter method');

console.time('Reduce method');
removeDuplicatesReduce(largeArray);
console.timeEnd('Reduce method');

console.time('Map method');
removeDuplicatesMap(largeArray);
console.timeEnd('Map method');

console.time('Loop method');
removeDuplicatesLoop(largeArray);
console.timeEnd('Loop method');

// Edge cases
console.log('\n=== Edge Cases ===');
console.log('Empty array:', removeDuplicatesSet([]));
console.log('No duplicates:', removeDuplicatesSet([1, 2, 3, 4]));
console.log('All duplicates:', removeDuplicatesSet([5, 5, 5, 5]));
console.log('Mixed types:', removeDuplicatesSet([1, '1', 2, '2', true, 'true']));
console.log('With null/undefined:', removeDuplicatesSet([1, null, 2, undefined, null, 3, undefined]));

// Count duplicates
console.log('\n=== Count Duplicates ===');
function countDuplicates(array) {
  const counts = {};
  array.forEach(item => {
    counts[item] = (counts[item] || 0) + 1;
  });
  return counts;
}

const testArray = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
console.log('Array:', testArray);
console.log('Duplicate counts:', countDuplicates(testArray));

// to see the output of this file use the command: node src/03-array/13-remove-duplicates.js
