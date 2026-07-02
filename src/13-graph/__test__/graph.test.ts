import { describe, expect, test } from '@jest/globals';
import Graph from '../graph';
import { breadthFirstSearch, bfsShortestPath } from '../bfs';
import { depthFirstSearch, enhancedDepthFirstSearch } from '../dfs';
import dijkstra from '../dijkstra';
import floydWarshall from '../floyd-warshall';
import kruskal from '../kruskal';
import prim from '../prim';

// ─── Graph ────────────────────────────────────────────────────────────────────

describe('Graph (undirected)', () => {
  test('addVertex adds vertices and creates adjacency list entries', () => {
    const g = new Graph<string>();
    g.addVertex('A');
    g.addVertex('B');
    expect(g.vertices).toContain('A');
    expect(g.vertices).toContain('B');
    expect(g.adjList.has('A')).toBe(true);
  });

  test('addEdge creates bidirectional edges in undirected graph', () => {
    const g = new Graph<string>();
    g.addEdge('A', 'B');
    expect(g.adjList.get('A')).toContain('B');
    expect(g.adjList.get('B')).toContain('A');
  });

  test('addEdge auto-creates missing vertices', () => {
    const g = new Graph<string>();
    g.addEdge('X', 'Y');
    expect(g.vertices).toContain('X');
    expect(g.vertices).toContain('Y');
  });

  test('toString returns a non-empty string', () => {
    const g = new Graph<string>();
    g.addEdge('A', 'B');
    expect(g.toString().length).toBeGreaterThan(0);
  });
});

describe('Graph (directed)', () => {
  test('addEdge in directed graph does NOT add reverse edge', () => {
    const g = new Graph<string>(true);
    g.addEdge('A', 'B');
    expect(g.adjList.get('A')).toContain('B');
    expect(g.adjList.get('B')).not.toContain('A');
  });
});

// ─── BFS ──────────────────────────────────────────────────────────────────────

function buildSampleGraph(): Graph<string> {
  const g = new Graph<string>();
  ['A', 'B', 'C', 'D', 'E'].forEach(v => g.addVertex(v));
  g.addEdge('A', 'B');
  g.addEdge('A', 'C');
  g.addEdge('B', 'D');
  g.addEdge('C', 'E');
  return g;
}

describe('breadthFirstSearch', () => {
  test('visits all reachable vertices', () => {
    const g = buildSampleGraph();
    const visited: string[] = [];
    breadthFirstSearch(g, 'A', v => visited.push(v));
    expect(visited.sort()).toEqual(['A', 'B', 'C', 'D', 'E']);
  });
});

describe('bfsShortestPath', () => {
  test('returns correct distances from start vertex', () => {
    const g = buildSampleGraph();
    const { distances } = bfsShortestPath(g, 'A');
    expect(distances['A']).toBe(0);
    expect(distances['B']).toBe(1);
    expect(distances['C']).toBe(1);
    expect(distances['D']).toBe(2);
    expect(distances['E']).toBe(2);
  });

  test('predecessors point toward the start vertex', () => {
    const g = buildSampleGraph();
    const { predecessors } = bfsShortestPath(g, 'A');
    expect(predecessors['A']).toBeNull();
    expect(predecessors['B']).toBe('A');
    expect(predecessors['D']).toBe('B');
  });
});

// ─── DFS ──────────────────────────────────────────────────────────────────────

describe('depthFirstSearch', () => {
  test('visits all vertices', () => {
    const g = buildSampleGraph();
    const visited: string[] = [];
    depthFirstSearch(g, v => visited.push(v));
    expect(visited.sort()).toEqual(['A', 'B', 'C', 'D', 'E']);
  });
});

describe('enhancedDepthFirstSearch', () => {
  test('returns discovery, finished, and predecessors for all vertices', () => {
    const g = buildSampleGraph();
    const result = enhancedDepthFirstSearch(g);
    const vertices = ['A', 'B', 'C', 'D', 'E'];
    vertices.forEach(v => {
      expect(result.discovery[v]).toBeGreaterThan(0);
      expect(result.finished[v]).toBeGreaterThan(0);
      expect(result.finished[v]).toBeGreaterThan(result.discovery[v]);
    });
    // Predecessors: A is a root
    expect(result.predecessors['A']).toBeNull();
  });
});

// ─── Dijkstra ─────────────────────────────────────────────────────────────────

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

describe('dijkstra', () => {
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

  test('predecessors array is populated for reachable nodes', () => {
    const { predecessors } = dijkstra(flightCosts, 0);
    expect(predecessors[0]).toEqual([0]);
    expect(predecessors[1]).toContain(0);
  });
});

// ─── Floyd-Warshall ───────────────────────────────────────────────────────────

describe('floydWarshall', () => {
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
});

// ─── Kruskal / Prim ───────────────────────────────────────────────────────────

const cities = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0],
];

describe('prim', () => {
  test('produces MST matching expected parent array for cities graph', () => {
    const mst = prim(cities);
    expect(mst).toEqual([-1, 0, 1, 5, 1, 4]);
  });
});

describe('kruskal', () => {
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
});
