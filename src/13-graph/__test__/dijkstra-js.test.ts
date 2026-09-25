import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const dijkstra = require('../dijkstra.js') as (
  graph: number[][],
  src: number
) => { distances: number[]; predecessors: Record<number, number[]> };

const flightCosts = [
  // SEA  MDW   DEN  MCO   STL   JFK   ATL
  [0,    300,  220, 1000,  0,    0,    0],   // SEA (0)
  [300,  0,    0,   0,    50,   210,  190],  // MDW (1)
  [220,  0,    0,   0,    350,  0,    0],    // DEN (2)
  [1000, 0,    0,   0,    150,  250,  0],    // MCO (3)
  [0,    50,   350, 150,  0,    0,    0],    // STL (4)
  [0,    210,  0,   250,  0,    0,    200],  // JFK (5)
  [0,    190,  0,   0,    0,    200,  0],    // ATL (6)
];

describe('dijkstra (js)', () => {
  test('distance from source to itself is 0', () => {
    const { distances } = dijkstra(flightCosts, 0);
    expect(distances[0]).toBe(0);
  });

  test('shortest path SEA -> MDW = 300', () => {
    const { distances } = dijkstra(flightCosts, 0);
    expect(distances[1]).toBe(300);
  });

  test('shortest path SEA -> DEN = 220', () => {
    const { distances } = dijkstra(flightCosts, 0);
    expect(distances[2]).toBe(220);
  });

  test('shortest path SEA -> STL = 350 (via MDW)', () => {
    const { distances } = dijkstra(flightCosts, 0);
    expect(distances[4]).toBe(350);
  });

  test('shortest path SEA -> MCO = 500 (via MDW+STL)', () => {
    const { distances } = dijkstra(flightCosts, 0);
    expect(distances[3]).toBe(500);
  });

  test('shortest path SEA -> JFK and SEA -> ATL are computed correctly', () => {
    const { distances } = dijkstra(flightCosts, 0);
    expect(distances[5]).toBe(510); // SEA -> MDW -> JFK = 300 + 210
    expect(distances[6]).toBe(490); // SEA -> MDW -> ATL = 300 + 190
  });

  test('predecessors array is populated for reachable nodes', () => {
    const { predecessors } = dijkstra(flightCosts, 0);
    expect(predecessors[0]).toEqual([0]);
    expect(predecessors[1]).toContain(0);
  });

  test('full predecessor path for a multi-hop route', () => {
    const { predecessors } = dijkstra(flightCosts, 0);
    // Shortest path SEA -> STL is via MDW: [0, 1, 4]
    expect(predecessors[4]).toEqual([0, 1, 4]);
  });

  test('single-vertex graph returns distance 0 for itself', () => {
    const { distances, predecessors } = dijkstra([[0]], 0);
    expect(distances[0]).toBe(0);
    expect(predecessors[0]).toEqual([0]);
  });

  test('unreachable vertex keeps INF distance and a trivial path', () => {
    const g = [
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, 0], // vertex 2 is isolated
    ];
    const { distances, predecessors } = dijkstra(g, 0);
    expect(distances[2]).toBe(Number.MAX_SAFE_INTEGER);
    expect(predecessors[2]).toEqual([2]);
  });
});
