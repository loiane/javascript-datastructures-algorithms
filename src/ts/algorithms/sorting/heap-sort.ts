import { defaultCompare, ICompareFunction, swap } from '../../util';

function heapify(array: any[], index: number, heapSize: number, compareFn: ICompareFunction<any>) {
  let largest = index;
  const left = (2 * index) + 1;
  const right = (2 * index) + 2;

  if (left < heapSize && compareFn(array[left], array[index]) > 0) {
    largest = left;
  }

  if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
    largest = right;
  }

  if (largest !== index) {
    swap(array, index, largest);
    heapify(array, largest, heapSize, compareFn);
  }
}

function buildMaxHeap(array: any[], compareFn: ICompareFunction<any>) {
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    heapify(array, i, array.length, compareFn);
  }
  return array;
}

export default function heapSort(array: any[], compareFn = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);
  while (heapSize > 1) {
    swap(array, 0, --heapSize);
    heapify(array, 0, heapSize, compareFn);
  }
  return array;
}
