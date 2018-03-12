import 'mocha';
import { expect } from 'chai';
import { Compare } from '../../../../src/js/util';

export function testSortAlgorithm(sortAlgorithm, algorithmName, config = { reverseCompare: true }) {
  describe(algorithmName, () => {
    const SIZE = 100;

    function createNonSortedArray() {
      const array = [];
      for (let i = SIZE; i > 0; i--) {
        array.push(i);
      }
      return array;
    }

    function createSortedArray() {
      const array = [];
      for (let i = 1; i <= SIZE; i++) {
        array.push(i);
      }
      return array;
    }

    it('works with empty arrays', () => {
      expect(sortAlgorithm([])).to.deep.equal([]);
    });

    it('works with sorted arrays', () => {
      let array = createSortedArray();
      const sortedArray = createSortedArray();
      array = sortAlgorithm(array);
      expect(array).to.deep.equal(sortedArray);
    });

    it('works with non-sorted arrays', () => {
      let array = createNonSortedArray();
      const sortedArray = createSortedArray();
      array = sortAlgorithm(array);

      expect(array).to.deep.equal(sortedArray);

      for (let i = 0; i < array.length - 1; i++) {
        expect(array[i] <= array[i + 1]).to.equal(true);
      }
    });

    function reverseCompare(a, b) {
      if (a === b) {
        return 0;
      }
      return a < b ? Compare.BIGGER_THAN : Compare.LESS_THAN;
    }

    if (config.reverseCompare) {
      it('works with reverse comparator - descending order', () => {
        let array = createSortedArray();
        const sortedArray = createNonSortedArray();
        array = sortAlgorithm(array, reverseCompare);

        expect(array).to.deep.equal(sortedArray);

        for (let i = 0; i < array.length - 1; i++) {
          expect(array[i] >= array[i + 1]).to.equal(true);
        }
      });
    }
  });
}
