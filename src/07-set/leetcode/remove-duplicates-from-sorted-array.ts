// https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
export function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}

// resolve this problem using Set
export function removeDuplicates2(nums: number[]): number {
  const set = new Set(nums);
  const arr = Array.from(set);
  for (let i = 0; i < arr.length; i++) {
    nums[i] = arr[i];
  }
  return arr.length;
}

// explain above solution
// 1. create a set from the array
// 2. create an array from the set
// 3. copy the array to the original array
// 4. return the length of the array
// Time complexity: O(n)