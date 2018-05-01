import 'mocha';
import { expect } from 'chai';
import { kruskal } from '../../../../src/js/index';

describe('Kruskal Algorithm - Minimum Spanning Tree', () => {
  it('Minimum Spanning Tree', () => {
    const graph = [
      [0, 2, 4, 0, 0, 0],
      [2, 0, 2, 4, 2, 0],
      [4, 2, 0, 0, 3, 0],
      [0, 4, 0, 0, 3, 2],
      [0, 2, 3, 3, 0, 2],
      [0, 0, 0, 2, 2, 0]
    ];

    expect(kruskal(graph)).to.deep.equal([ , 0, 1, 1, 1, 3]);
  });
});
