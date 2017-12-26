import { bucketSort } from '../../../../src/ts/index';
import { testSortAlgorithm } from './sort-algorithm-tests';

testSortAlgorithm(bucketSort, 'Bucket Sort', {reverseCompare: false});
