import 'mocha';
import { expect } from 'chai';
import { findMinValue, findMaxValue } from '../../../../src/js/index';

describe('Min and Max Values Search', () => {
  const SIZE = 10;

  function createSortedArray() {
    const array = [];
    for (let i = 1; i <= SIZE; i++) {
      array.push(i);
    }
    return array;
  }

  it('min value - works with empty arrays', () => {
    expect(findMinValue([])).to.equal(undefined);
  });

  it('max value - works with empty arrays', () => {
    expect(findMaxValue([])).to.equal(undefined);
  });

  it('min value', () => {
    expect(findMinValue(createSortedArray())).to.equal(1);
  });

  it('max value', () => {
    expect(findMaxValue(createSortedArray())).to.equal(SIZE);
  });
});
