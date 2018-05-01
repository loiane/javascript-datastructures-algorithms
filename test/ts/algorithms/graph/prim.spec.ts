import 'mocha';
import { expect } from 'chai';
import { prim } from '../../../../src/ts/index';

describe('Prim\'s Algorithm - Minimum Spanning Tree', () => {
  it('Minimum Spanning Tree', () => {
    const graph = [
      [0, 2, 4, 0, 0, 0],
      [2, 0, 2, 4, 2, 0],
      [4, 2, 0, 0, 3, 0],
      [0, 4, 0, 0, 3, 2],
      [0, 2, 3, 3, 0, 2],
      [0, 0, 0, 2, 2, 0]
    ];

    expect(prim(graph)).to.deep.equal([-1, 0, 1, 5, 1, 4]);
  });
});
