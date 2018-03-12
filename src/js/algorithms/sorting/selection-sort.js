import { Compare, defaultCompare, swap } from '../../util';

export const selectionSort = (array, compareFn = defaultCompare) => {
  const { length } = array;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    // console.log('index ' + array[i]);
    for (let j = i; j < length; j++) {
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        // console.log('new index min ' + array[j]);
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      // console.log('swap ' + array[i] + ' with ' + array[indexMin]);
      swap(array, i, indexMin);
    }
  }
  return array;
};
