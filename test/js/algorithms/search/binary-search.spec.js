import { expect } from 'chai';
import { binarySearch } from '../../../../src/js/index';
import { testSearchAlgorithm } from './search-algorithms-tests';

testSearchAlgorithm(binarySearch, 'Binary Search');

describe('binarySearch', () => {
  it('search elements in array of numbers', () => {
    expect(binarySearch([0, 5, 3], 1)).to.equal(-1);
    expect(binarySearch([2, 64, 33, 40, 100], 40)).to.equal(2);
    expect(binarySearch([1, 2], 2)).to.equal(1);
    expect(binarySearch([10, 20, 15, 40, 65], 40)).to.equal(3);
    expect(binarySearch([1, 6, 7, 8, 12, 13, 14, 19, 21, 23, 24, 24, 24, 300], 24)).to.equal(10);
    expect(binarySearch([1, 2, 3, 610, 800, 1250, 1360, 1400, 1905], 600)).to.equal(-1);
    expect(binarySearch([1, 2, 3, 742, 800, 1250, 1360, 1400, 19550], 2)).to.equal(1);
    expect(binarySearch([1, 2, 3, 743, 800, 1000, 1335, 1490, 1800], 743)).to.equal(3);
    expect(binarySearch([1, 2, 3, 700, 800, 1233, 1380, 1400, 19678], 800)).to.equal(4);
    expect(binarySearch([0, 10, 11, 12, 13, 14, 15], 10)).to.equal(1);
  });
});
