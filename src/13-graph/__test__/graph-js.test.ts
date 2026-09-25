import { describe, expect, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Graph = require('../graph.js') as new (isDirected?: boolean) => {
  addVertex(vertex: string): void;
  addEdge(vertex: string, edge: string): void;
  vertices: string[];
  adjList: Map<string, string[]>;
  toString(): string;
};

describe('Graph (js, undirected)', () => {
  test('addVertex adds vertices and creates adjacency list entries', () => {
    const g = new Graph();
    g.addVertex('A');
    g.addVertex('B');
    expect(g.vertices).toContain('A');
    expect(g.vertices).toContain('B');
    expect(g.adjList.has('A')).toBe(true);
  });

  test('addVertex does not add duplicate vertices', () => {
    const g = new Graph();
    g.addVertex('A');
    g.addVertex('A');
    expect(g.vertices).toEqual(['A']);
  });

  test('addEdge creates bidirectional edges in undirected graph', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    expect(g.adjList.get('A')).toContain('B');
    expect(g.adjList.get('B')).toContain('A');
  });

  test('addEdge auto-creates missing vertices', () => {
    const g = new Graph();
    g.addEdge('X', 'Y');
    expect(g.vertices).toContain('X');
    expect(g.vertices).toContain('Y');
  });

  test('toString returns a non-empty string with vertex/neighbor formatting', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    const s = g.toString();
    expect(s.length).toBeGreaterThan(0);
    expect(s).toContain('A -> B');
    expect(s).toContain('B -> A');
  });

  test('toString on empty graph returns empty string', () => {
    const g = new Graph();
    expect(g.toString()).toBe('');
  });
});

describe('Graph (js, directed)', () => {
  test('addEdge in directed graph does NOT add reverse edge', () => {
    const g = new Graph(true);
    g.addEdge('A', 'B');
    expect(g.adjList.get('A')).toContain('B');
    expect(g.adjList.get('B')).not.toContain('A');
  });

  test('supports self-loops', () => {
    const g = new Graph(true);
    g.addEdge('A', 'A');
    expect(g.adjList.get('A')).toContain('A');
  });
});
