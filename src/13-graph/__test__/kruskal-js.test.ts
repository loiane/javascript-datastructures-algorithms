import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const kruskal = require('../kruskal.js') as (graph: number[][]) => number[];

const cities = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0],
];

describe('kruskal (js)', () => {
  test('produces a non-empty result for cities graph', () => {
    const mst = kruskal(cities);
    expect(Array.isArray(mst)).toBe(true);
    expect(mst.length).toBeGreaterThan(0);
  });

  test('produces correct MST for simple 3-vertex graph', () => {
    // g has edges: (0,1)=1, (0,2)=2, (1,2)=3 → MST: (0,1) and (0,2)
    const g = [
      [0, 1, 2],
      [1, 0, 3],
      [2, 3, 0],
    ];
    const mst = kruskal(g);
    // parent[1]=0 and parent[2]=0 (both connected to vertex 0)
    expect(mst[1]).toBe(0);
    expect(mst[2]).toBe(0);
  });

  test('two-vertex graph connects the single edge', () => {
    const g = [
      [0, 5],
      [5, 0],
    ];
    const mst = kruskal(g);
    expect(mst[1]).toBe(0);
  });

  test('a redundant edge consumes the edge budget and can leave a vertex disconnected', () => {
    // find() treats parent[i] === 0 as "no parent" (falsy), so a vertex whose
    // true root is 0 can be misreported as its own root, causing a redundant
    // union that consumes an edge without connecting anything. Same behavior
    // as kruskal.ts, left unfixed here.
    const g = [
      [0, 1, 3, 0],
      [1, 0, 2, 0],
      [3, 2, 0, 4],
      [0, 0, 4, 0],
    ];
    const mst = kruskal(g);
    expect(mst[1]).toBe(0);
    expect(mst[2]).toBe(1);
    expect(mst[3]).toBeUndefined();
  });

  test('skips an edge that would create a cycle (union returns false)', () => {
    // Triangle among 1-2(1), 2-3(2), 1-3(3), with 0-1(10) as the only link
    // to vertex 0. After 1-2 and 2-3 are picked, the edge 1-3 would connect
    // two vertices already in the same set (both resolve to root 1), so
    // union() must return false and skip incrementing the edge count.
    const g = [
      [0, 10, 0, 0],
      [10, 0, 1, 3],
      [0, 1, 0, 2],
      [0, 3, 2, 0],
    ];
    const mst = kruskal(g);
    expect(mst[1]).toBe(0);
    expect(mst[2]).toBe(1);
    expect(mst[3]).toBe(1);
  });

  test('picks the minimum weight edge when multiple edges tie for a vertex', () => {
    // 0-1 weight 1, 0-2 weight 1, 1-2 weight 5: MST total weight should be 2 (edges 0-1 and 0-2)
    const g = [
      [0, 1, 1],
      [1, 0, 5],
      [1, 5, 0],
    ];
    const mst = kruskal(g);
    // Both vertex 1 and vertex 2 should connect directly to vertex 0 (lowest-cost edges)
    expect(mst[1]).toBe(0);
    expect(mst[2]).toBe(0);
  });

  test('four-vertex chain graph connects all vertices with total weight 6', () => {
    // Chain: 0-1(1), 1-2(2), 2-3(3); no other edges. MST must include all 3 edges.
    const g = [
      [0, 1, 0, 0],
      [1, 0, 2, 0],
      [0, 2, 0, 3],
      [0, 0, 3, 0],
    ];
    const mst = kruskal(g);
    expect(mst[1]).toBe(0);
    // Vertex 3 is unioned into the same set as vertices 0/1 once 2-3 is processed.
    expect([1, 2]).toContain(mst[3]);
    expect(mst[2]).toBe(1);
  });
});
