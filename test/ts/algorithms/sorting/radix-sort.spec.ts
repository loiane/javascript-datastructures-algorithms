import { radixSort } from '../../../../src/ts/index';
import { testSortAlgorithm } from './sort-algorithm-tests';

testSortAlgorithm(radixSort, 'Radix Sort', {reverseCompare: false});

