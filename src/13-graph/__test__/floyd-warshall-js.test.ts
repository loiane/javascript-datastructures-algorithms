import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const floydWarshall = require('../floyd-warshall.js') as (graph: number[][]) => number[][];

describe('floydWarshall (js)', () => {
  const INF = Infinity;
  const g = [
    [0,   1, INF],
    [INF, 0,   2],
    [3, INF,   0],
  ];

  test('diagonal is always 0', () => {
    const dist = floydWarshall(g);
    expect(dist[0][0]).toBe(0);
    expect(dist[1][1]).toBe(0);
    expect(dist[2][2]).toBe(0);
  });

  test('direct edge costs are preserved', () => {
    const dist = floydWarshall(g);
    expect(dist[0][1]).toBe(1);
    expect(dist[1][2]).toBe(2);
    expect(dist[2][0]).toBe(3);
  });

  test('indirect paths are computed', () => {
    const dist = floydWarshall(g);
    // 0 -> 1 -> 2 = 1 + 2 = 3
    expect(dist[0][2]).toBe(3);
    // 1 -> 2 -> 0 = 2 + 3 = 5
    expect(dist[1][0]).toBe(5);
    // 2 -> 0 -> 1 = 3 + 1 = 4
    expect(dist[2][1]).toBe(4);
  });

  test('single vertex graph returns a 1x1 zero matrix', () => {
    const dist = floydWarshall([[0]]);
    expect(dist).toEqual([[0]]);
  });

  test('fully disconnected graph keeps INF for unreachable pairs', () => {
    const disconnected = [
      [0, INF],
      [INF, 0],
    ];
    const dist = floydWarshall(disconnected);
    expect(dist[0][1]).toBe(Number.MAX_SAFE_INTEGER);
    expect(dist[1][0]).toBe(Number.MAX_SAFE_INTEGER);
  });

  test('handles a graph with no edges at all (only diagonal zeros)', () => {
    const empty = [
      [0, INF, INF],
      [INF, 0, INF],
      [INF, INF, 0],
    ];
    const dist = floydWarshall(empty);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === j) {
          expect(dist[i][j]).toBe(0);
        } else {
          expect(dist[i][j]).toBe(Number.MAX_SAFE_INTEGER);
        }
      }
    }
  });
});
