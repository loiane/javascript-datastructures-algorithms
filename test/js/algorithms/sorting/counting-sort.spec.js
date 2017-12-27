import { countingSort } from '../../../../src/js/index';
import { testSortAlgorithm } from './sort-algorithm-tests';

testSortAlgorithm(countingSort, 'Counting Sort', { reverseCompare: false });
