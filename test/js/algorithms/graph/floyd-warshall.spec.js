import 'mocha';
import { expect } from 'chai';
import { floydWarshall } from '../../../../src/js/index';

describe('Floyd-Warshall Algorithm - All-Pairs Shortest Path', () => {
  it('All-Pairs Shortest Path', () => {
    const INF = Infinity;
    const graph = [
      [INF, 2, 4, INF, INF, INF],
      [INF, INF, 2, 4, 2, INF],
      [INF, INF, INF, INF, 3, INF],
      [INF, INF, INF, INF, INF, 2],
      [INF, INF, INF, 3, INF, 2],
      [INF, INF, INF, INF, INF, INF]
    ];

    expect(floydWarshall(graph)).to.deep.equal([
      [0, 2, 4, 6, 4, 6],
      [INF, 0, 2, 4, 2, 4],
      [INF, INF, 0, 6, 3, 5],
      [INF, INF, INF, 0, INF, 2],
      [INF, INF, INF, 3, 0, 2],
      [INF, INF, INF, INF, INF, 0]
    ]);
  });
});
