import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const prim = require('../prim.js') as (graph: number[][]) => number[];

const cities = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0],
];

describe('prim (js)', () => {
  test('produces MST matching expected parent array for cities graph', () => {
    const mst = prim(cities);
    expect(mst).toEqual([-1, 0, 1, 5, 1, 4]);
  });

  test('single-vertex graph returns a root-only parent array', () => {
    const mst = prim([[0]]);
    expect(mst).toEqual([-1]);
  });

  test('two-vertex graph connects the single edge', () => {
    const g = [
      [0, 5],
      [5, 0],
    ];
    const mst = prim(g);
    expect(mst).toEqual([-1, 0]);
  });

  test('four-vertex chain graph produces expected parent chain', () => {
    // Chain: 0-1(1), 1-2(2), 2-3(3); no other edges
    const g = [
      [0, 1, 0, 0],
      [1, 0, 2, 0],
      [0, 2, 0, 3],
      [0, 0, 3, 0],
    ];
    const mst = prim(g);
    expect(mst).toEqual([-1, 0, 1, 2]);
  });

  test('prefers the minimum-weight edge when multiple edges are available', () => {
    // 0-1 weight 1, 0-2 weight 1, 1-2 weight 5: vertex 2 should connect via lowest cost edge
    const g = [
      [0, 1, 1],
      [1, 0, 5],
      [1, 5, 0],
    ];
    const mst = prim(g);
    expect(mst[1]).toBe(0);
    expect(mst[2]).toBe(0);
  });
});
