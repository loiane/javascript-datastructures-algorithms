import { countingSort } from '../../../../src/ts/index';
import { testSortAlgorithm } from './sort-algorithm-tests';

testSortAlgorithm(countingSort, 'Counting Sort', {reverseCompare: false});
