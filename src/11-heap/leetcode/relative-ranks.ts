// https://leetcode.com/problems/relative-ranks/description/
// 506. Relative Ranks

function findRelativeRanks(nums: number[]): string[] {
  const sorted = [...nums].sort((a, b) => b - a);
  const map = new Map<number, string>();
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      map.set(sorted[i], 'Gold Medal');
    } else if (i === 1) {
      map.set(sorted[i], 'Silver Medal');
    } else if (i === 2) {
      map.set(sorted[i], 'Bronze Medal');
    } else {
      map.set(sorted[i], (i + 1).toString());
    }
  }

  return nums.map((num) => map.get(num)!);
}

// console.log(findRelativeRanks([5, 4, 3, 2, 1])); // ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
// console.log(findRelativeRanks([10, 3, 8, 9, 4])); // ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
// console.log(findRelativeRanks([1])); // ["Gold Medal"]
// console.log(findRelativeRanks([1, 2])); // ["Silver Medal","Gold Medal"]
// console.log(findRelativeRanks([1, 2, 3])); // ["Bronze Medal","Silver Medal","Gold Medal"]

function siftDown (array: number[], heapSize: number, rootIndex: number) {
  let largest = rootIndex;
  let left = 2 * rootIndex + 1;
  let right = 2 * rootIndex + 2;

  if (left < heapSize && array[left] < array[largest]) {
    largest = left;
  }

  if (right < heapSize && array[right] < array[largest]) {
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

// rewrite the solution using heap
function findRelativeRanksHeap(nums: number[]): string[] {

  const sorted = [...nums];
   heapSort(sorted);
  const map = new Map<number, string>();
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      map.set(sorted[i], 'Gold Medal');
    } else if (i === 1) {
      map.set(sorted[i], 'Silver Medal');
    } else if (i === 2) {
      map.set(sorted[i], 'Bronze Medal');
    } else {
      map.set(sorted[i], (i + 1).toString());
    }
  }

  return nums.map((num) => map.get(num)!);
}

console.log(findRelativeRanksHeap([5, 4, 3, 2, 1])); // ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
console.log(findRelativeRanksHeap([10, 3, 8, 9, 4])); // ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
console.log(findRelativeRanksHeap([1])); // ["Gold Medal"]
console.log(findRelativeRanksHeap([1, 2])); // ["Silver Medal","Gold Medal"]
console.log(findRelativeRanksHeap([1, 2, 3])); // ["Bronze Medal","Silver Medal","Gold Medal"]

// to see the output of this file use the command: npx ts-node src/11-heap/leetcode/relative-ranks.ts