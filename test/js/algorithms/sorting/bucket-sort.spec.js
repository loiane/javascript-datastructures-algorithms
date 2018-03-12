import { bucketSort } from '../../../../src/js/index';
import { testSortAlgorithm } from './sort-algorithm-tests';

testSortAlgorithm(bucketSort, 'Bucket Sort', { reverseCompare: false });
