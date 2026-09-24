import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Graph = require('../graph.js') as new (isDirected?: boolean) => {
  addVertex(vertex: string): void;
  addEdge(vertex: string, edge: string): void;
  vertices: string[];
  adjList: Map<string, string[]>;
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { depthFirstSearch, enhancedDepthFirstSearch } = require('../dfs.js') as {
  depthFirstSearch: (graph: InstanceType<typeof Graph>, callback?: (vertex: string) => void) => void;
  enhancedDepthFirstSearch: (graph: InstanceType<typeof Graph>) => {
    discovery: Record<string, number>;
    finished: Record<string, number>;
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

describe('depthFirstSearch (js)', () => {
  test('visits all vertices', () => {
    const g = buildSampleGraph();
    const visited: string[] = [];
    depthFirstSearch(g, v => visited.push(v));
    expect(visited.sort()).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  test('works without a callback', () => {
    const g = buildSampleGraph();
    expect(() => depthFirstSearch(g)).not.toThrow();
  });

  test('visits disconnected components', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    g.addVertex('Z'); // disconnected
    const visited: string[] = [];
    depthFirstSearch(g, v => visited.push(v));
    expect(visited.sort()).toEqual(['A', 'B', 'Z']);
  });

  test('does not infinite loop on a cyclic graph', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    g.addEdge('B', 'C');
    g.addEdge('C', 'A'); // cycle
    const visited: string[] = [];
    depthFirstSearch(g, v => visited.push(v));
    expect(visited.sort()).toEqual(['A', 'B', 'C']);
  });

  test('single-vertex graph visits only itself', () => {
    const g = new Graph();
    g.addVertex('A');
    const visited: string[] = [];
    depthFirstSearch(g, v => visited.push(v));
    expect(visited).toEqual(['A']);
  });

  test('empty graph visits nothing', () => {
    const g = new Graph();
    const visited: string[] = [];
    depthFirstSearch(g, v => visited.push(v));
    expect(visited).toEqual([]);
  });
});

describe('enhancedDepthFirstSearch (js)', () => {
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

  test('sets predecessor for discovered neighbor', () => {
    const g = buildSampleGraph();
    const result = enhancedDepthFirstSearch(g);
    expect(result.predecessors['B']).toBe('A');
  });

  test('handles disconnected components with multiple roots', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    g.addVertex('Z'); // disconnected
    const result = enhancedDepthFirstSearch(g);
    expect(result.predecessors['A']).toBeNull();
    expect(result.predecessors['Z']).toBeNull();
    expect(result.finished['Z']).toBeGreaterThan(0);
  });
});
