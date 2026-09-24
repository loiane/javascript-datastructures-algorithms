import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Graph = require('../graph.js') as new (isDirected?: boolean) => {
  addVertex(vertex: string): void;
  addEdge(vertex: string, edge: string): void;
  vertices: string[];
  adjList: Map<string, string[]>;
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { breadthFirstSearch, bfsShortestPath } = require('../bfs.js') as {
  breadthFirstSearch: (graph: InstanceType<typeof Graph>, startVertex: string, callback?: (vertex: string) => void) => void;
  bfsShortestPath: (graph: InstanceType<typeof Graph>, startVertex: string) => {
    distances: Record<string, number>;
    predecessors: Record<string, string | null>;
  };
};

function buildSampleGraph(): InstanceType<typeof Graph> {
  const g = new Graph();
  ['A', 'B', 'C', 'D', 'E'].forEach(v => g.addVertex(v));
  g.addEdge('A', 'B');
  g.addEdge('A', 'C');
  g.addEdge('B', 'D');
  g.addEdge('C', 'E');
  return g;
}

describe('breadthFirstSearch (js)', () => {
  test('visits all reachable vertices', () => {
    const g = buildSampleGraph();
    const visited: string[] = [];
    breadthFirstSearch(g, 'A', v => visited.push(v));
    expect(visited.sort()).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  test('works without a callback', () => {
    const g = buildSampleGraph();
    expect(() => breadthFirstSearch(g, 'A')).not.toThrow();
  });

  test('does not revisit vertices in a graph with cycles', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    g.addEdge('B', 'C');
    g.addEdge('C', 'A'); // cycle
    const visited: string[] = [];
    breadthFirstSearch(g, 'A', v => visited.push(v));
    expect(visited.sort()).toEqual(['A', 'B', 'C']);
  });

  test('single-vertex graph visits only itself', () => {
    const g = new Graph();
    g.addVertex('A');
    const visited: string[] = [];
    breadthFirstSearch(g, 'A', v => visited.push(v));
    expect(visited).toEqual(['A']);
  });

  test('disconnected vertices are not visited from unrelated start', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    g.addVertex('Z'); // disconnected
    const visited: string[] = [];
    breadthFirstSearch(g, 'A', v => visited.push(v));
    expect(visited).not.toContain('Z');
  });
});

describe('bfsShortestPath (js)', () => {
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

  test('unreachable vertex keeps default distance of 0 and null predecessor', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    g.addVertex('Z'); // disconnected from A
    const { distances, predecessors } = bfsShortestPath(g, 'A');
    expect(distances['Z']).toBe(0);
    expect(predecessors['Z']).toBeNull();
  });
});
