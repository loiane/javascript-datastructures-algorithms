// https://leetcode.com/problems/power-of-two/

// function isPowerOfTwo(n: number): boolean {
//   if (n <= 0) {
//     return false;
//   }

//   return (n & (n - 1)) === 0;
// }

// Time complexity: O(1)
// Space complexity: O(1)

// Test cases


// recursive solution
function isPowerOfTwo(n: number): boolean {
  if (n <= 0) { //  edge case for negative numbers
    return false;
  }
  if (n % 2 !== 0) { // edge case for odd numbers
    return false;
  }

  if (n === 1) { // base case
    return true;
  }

  return isPowerOfTwo(n / 2);
}

// Time complexity: O(log n)
// Space complexity: O(log n)

// Test cases
console.log(isPowerOfTwo(1)); // true
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(3)); // false
console.log(isPowerOfTwo(4)); // true
console.log(isPowerOfTwo(5)); // false
console.log(isPowerOfTwo(0)); // false
console.log(isPowerOfTwo(-1)); // false
