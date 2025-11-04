// src/03-array/14-array-rotation.ts

/**
 * Array Rotation - Rotate array elements left or right by k positions
 * Common use case: Circular buffers, image processing, game development
 */

// Approach 1: Rotate Right using slice and concat
function rotateRight<T>(array: T[], k: number): T[] {
  if (array.length === 0) return array;
  
  // Normalize k to handle cases where k > array.length
  k = k % array.length;
  
  if (k === 0) return array;
  
  return array.slice(-k).concat(array.slice(0, -k));
}

// Approach 2: Rotate Left using slice and concat
function rotateLeft<T>(array: T[], k: number): T[] {
  if (array.length === 0) return array;
  
  k = k % array.length;
  
  if (k === 0) return array;
  
  return array.slice(k).concat(array.slice(0, k));
}

// Approach 3: Rotate Right using spread operator
function rotateRightSpread<T>(array: T[], k: number): T[] {
  if (array.length === 0) return array;
  
  k = k % array.length;
  
  if (k === 0) return [...array];
  
  return [...array.slice(-k), ...array.slice(0, -k)];
}

// Approach 4: In-place rotation using reverse (most efficient)
function rotateRightInPlace<T>(array: T[], k: number): T[] {
  const arr = [...array]; // Create copy to avoid modifying original
  const n = arr.length;
  
  if (n === 0) return arr;
  
  k = k % n;
  
  if (k === 0) return arr;
  
  // Reverse helper function
  const reverse = (start: number, end: number): void => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };
  
  // Three-step reversal algorithm
  reverse(0, n - 1);        // Reverse entire array
  reverse(0, k - 1);        // Reverse first k elements
  reverse(k, n - 1);        // Reverse remaining elements
  
  return arr;
}

// Approach 5: Rotate using unshift and pop (simple but less efficient)
function rotateRightSimple<T>(array: T[], k: number): T[] {
  const arr = [...array];
  k = k % arr.length;
  
  for (let i = 0; i < k; i++) {
    const last = arr.pop();
    if (last !== undefined) {
      arr.unshift(last);
    }
  }
  
  return arr;
}

// Examples
console.log('=== Array Rotation Examples ===\n');

const numbers: number[] = [1, 2, 3, 4, 5, 6, 7];
console.log('Original array:', numbers);

console.log('\n--- Rotate Right ---');
console.log('Rotate right by 1:', rotateRight(numbers, 1));
// Output: [7, 1, 2, 3, 4, 5, 6]

console.log('Rotate right by 2:', rotateRight(numbers, 2));
// Output: [6, 7, 1, 2, 3, 4, 5]

console.log('Rotate right by 3:', rotateRight(numbers, 3));
// Output: [5, 6, 7, 1, 2, 3, 4]

console.log('\n--- Rotate Left ---');
console.log('Rotate left by 1:', rotateLeft(numbers, 1));
// Output: [2, 3, 4, 5, 6, 7, 1]

console.log('Rotate left by 2:', rotateLeft(numbers, 2));
// Output: [3, 4, 5, 6, 7, 1, 2]

console.log('Rotate left by 3:', rotateLeft(numbers, 3));
// Output: [4, 5, 6, 7, 1, 2, 3]

// Edge cases
console.log('\n=== Edge Cases ===');
console.log('Rotate by 0:', rotateRight(numbers, 0));
console.log('Rotate by array length:', rotateRight(numbers, 7));
console.log('Rotate by more than length:', rotateRight(numbers, 10));
// 10 % 7 = 3, so same as rotating by 3
console.log('Empty array:', rotateRight([], 3));
console.log('Single element:', rotateRight([1], 5));

// Real-world example: Circular carousel
console.log('\n=== Real-World Example: Image Carousel ===');

const images: string[] = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'];
console.log('Initial images:', images);

console.log('\nNavigate next (rotate left by 1):');
console.log(rotateLeft(images, 1));

console.log('\nNavigate previous (rotate right by 1):');
console.log(rotateRight(images, 1));

console.log('\nJump 2 images forward:');
console.log(rotateLeft(images, 2));

// Real-world example: Shift scheduling
console.log('\n=== Real-World Example: Shift Rotation ===');

const employees: string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
console.log('Week 1 schedule:', employees);
console.log('Week 2 schedule (rotate by 1):', rotateLeft(employees, 1));
console.log('Week 3 schedule (rotate by 2):', rotateLeft(employees, 2));
console.log('Week 4 schedule (rotate by 3):', rotateLeft(employees, 3));

// Performance comparison
console.log('\n=== Performance Comparison ===');

const largeArray: number[] = Array.from({ length: 10000 }, (_, i) => i);
const k = 3000;

console.time('Slice method');
rotateRight(largeArray, k);
console.timeEnd('Slice method');

console.time('Spread method');
rotateRightSpread(largeArray, k);
console.timeEnd('Spread method');

console.time('In-place reversal');
rotateRightInPlace(largeArray, k);
console.timeEnd('In-place reversal');

console.time('Simple method');
rotateRightSimple(largeArray, k);
console.timeEnd('Simple method');

// Utility: Find rotation count
console.log('\n=== Find Rotation Count ===');

function findRotationCount(sortedRotatedArray: number[]): number {
  // Find the index of minimum element in a rotated sorted array
  let minIndex = 0;
  let minValue = sortedRotatedArray[0];
  
  for (let i = 1; i < sortedRotatedArray.length; i++) {
    if (sortedRotatedArray[i] < minValue) {
      minValue = sortedRotatedArray[i];
      minIndex = i;
    }
  }
  
  return minIndex;
}

const rotatedSorted: number[] = [4, 5, 6, 7, 1, 2, 3];
console.log('Rotated sorted array:', rotatedSorted);
console.log('Number of rotations:', findRotationCount(rotatedSorted));
// Output: 4 (array was rotated 4 times to the left from [1,2,3,4,5,6,7])

// to see the output of this file use the command: node src/03-array/14-array-rotation.ts
