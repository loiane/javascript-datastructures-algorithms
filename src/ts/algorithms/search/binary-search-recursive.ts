import { Compare, defaultCompare, DOES_NOT_EXIST } from '../../util';
import { quickSort } from '../sorting/quicksort';

function binarySearchRecursive<T>(
  array: T[],
  value: T,
  low: number,
  high: number,
  compareFn = defaultCompare
): number {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];

    if (compareFn(element, value) === Compare.LESS_THAN) {
      return binarySearchRecursive(array, value, mid + 1, high, compareFn);
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      return binarySearchRecursive(array, value, low, mid - 1, compareFn);
    } else {
      return mid;
    }
  }
  return DOES_NOT_EXIST;
}

export function binarySearch<T>(array: T[], value: T, compareFn = defaultCompare) {
  const sortedArray = quickSort(array);
  const low = 0;
  const high = sortedArray.length - 1;

  return binarySearchRecursive(array, value, low, high, compareFn);
}
