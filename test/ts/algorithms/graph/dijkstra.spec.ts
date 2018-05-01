import 'mocha';
import { expect } from 'chai';
import { dijkstra } from '../../../../src/ts/index';

describe('Dijkstra\'s Algorithm - Shortest Path', () => {

  it('Shortest Path', () => {
    const graph = [
      [0, 2, 4, 0, 0, 0],
      [0, 0, 2, 4, 2, 0],
      [0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 3, 0, 2],
      [0, 0, 0, 0, 0, 0]
    ];

    expect(dijkstra(graph, 0)).to.deep.equal([0, 2, 4, 6, 4, 6]);

  });

});
