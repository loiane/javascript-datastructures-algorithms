import { radixSort } from '../../../../src/js/index';
import { testSortAlgorithm } from './sort-algorithm-tests';

testSortAlgorithm(radixSort, 'Radix Sort', { reverseCompare: false });

