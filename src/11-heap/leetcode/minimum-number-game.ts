// https://leetcode.com/problems/minimum-number-game/description/
// 2974. Minimum Number Game

function siftDown (array: number[], heapSize: number, rootIndex: number) {
  let largest = rootIndex;
  let left = 2 * rootIndex + 1;
  let right = 2 * rootIndex + 2;

  if (left < heapSize && array[left] > array[largest]) {
    largest = left;
  }

  if (right < heapSize && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== rootIndex) {
    [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
    siftDown(array, heapSize, largest);
  }
};


function buildMaxHeap (array: number[]) {
  const heapSize = array.length;
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    siftDown(array, heapSize, i);
  }
}

function heapSort(array: number[]) {
  buildMaxHeap(array);
  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    siftDown(array, i, 0);
  }
}

function numberGame(nums: number[]): number[] {
  // nums.sort((a, b) => a - b);
  heapSort(nums);
  const arr: number[] = [];
  while (nums.length > 0) {
    const alice = nums.splice(0, 1)[0];
    const bob = nums.splice(0, 1)[0];
    arr.push(bob);
    arr.push(alice);
  }
  return arr;
};

console.log(numberGame([5,4,2,3])); // [ 3, 2, 5, 4 ]
console.log(numberGame([2,5])); // [ 5, 2 ]

// Time complexity: O(nlogn)
// Space complexity: O(n)

// to see the output of this file use the command: npx ts-node src/11-heap/leetcode/minimum-number-game.ts