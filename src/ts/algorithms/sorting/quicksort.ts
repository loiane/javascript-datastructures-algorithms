import { Compare, defaultCompare, ICompareFunction, swap } from '../../util';

const partition = function(array: any[], left: number, right: number, compareFn: ICompareFunction<any>) {
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  // console.log('pivot is ' + pivot + '; left is ' + left + '; right is ' + right);

  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++;
      // console.log('i = ' + i);
    }

    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--;
      // console.log('j = ' + j);
    }

    if (i <= j) {
      // console.log('swap ' + array[i] + ' with ' + array[j]);
      swap(array, i, j);
      i++;
      j--;
    }
  }

  return i;
};

const quick = function(
  array: any[],
  left: number,
  right: number,
  compareFn: ICompareFunction<any>
) {
  let index;

  if (array.length > 1) {
    index = partition(array, left, right, compareFn);

    if (left < index - 1) {
      quick(array, left, index - 1, compareFn);
    }

    if (index < right) {
      quick(array, index, right, compareFn);
    }
  }
  return array;
};

export const quickSort = (array: any[], compareFn = defaultCompare) => {
  return quick(array, 0, array.length - 1, compareFn);
};
