import 'mocha';
import { expect } from 'chai';
import { shuffle } from '../../../../src/ts/index';

describe('Fisher-Yates Suffle', () => {

  const SIZE = 100;

  function createSortedArray() {
    const array: number[] = [];
    for (let i = 1; i <= SIZE; i++) {
      array.push(i);
    }
    return array;
  }

  it('works with empty arrays', () => {
    expect(shuffle([])).to.deep.equal([]);
  });

  it('works with arrays with a single value', () => {
    const array = [1];
    expect(shuffle(array)).to.deep.equal(array);
  });

  it('works with sorted arrays', () => {
    let array = createSortedArray();
    const sortedArray = createSortedArray();
    array = shuffle(array);
    expect(array).to.not.deep.equal(sortedArray);
  });

});
