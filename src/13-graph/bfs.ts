// src/13-graph/bfs.ts

import Graph from './graph';

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2,
} as const;

type Color = typeof Colors[keyof typeof Colors];

const initializeColor = (vertices: string[]): Record<string, Color> => {
  const color: Record<string, Color> = {};
  vertices.forEach(vertex => {
    color[vertex] = Colors.WHITE;
  });
  return color;
};

/**
 * Performs a breadth-first search from startVertex, invoking callback on each visited vertex.
 * @param graph - The graph to traverse
 * @param startVertex - Vertex to start from
 * @param callback - Optional function called for each vertex
 * @complexity Time O(V + E) | Space O(V)
 */
const breadthFirstSearch = (
  graph: Graph<string>,
  startVertex: string,
  callback?: (vertex: string) => void
): void => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color = initializeColor(vertices);
  const queue = [startVertex];

  while (queue.length) {
    const visiting = queue.shift()!;
    const neighbors = adjList.get(visiting)!;
    color[visiting] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (color[neighbor] === Colors.WHITE) {
        color[neighbor] = Colors.GREY;
        queue.push(neighbor);
      }
    }
    color[visiting] = Colors.BLACK;
    if (callback) {
      callback(visiting);
    }
  }
};

/**
 * BFS from startVertex, returning shortest distances and predecessor map.
 * @param graph - The graph to traverse
 * @param startVertex - Source vertex
 * @returns Object with distances and predecessors for each vertex
 * @complexity Time O(V + E) | Space O(V)
 */
const bfsShortestPath = (
  graph: Graph<string>,
  startVertex: string
): { distances: Record<string, number>; predecessors: Record<string, string | null> } => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color: Record<string, Color> = {};
  const dist: Record<string, number> = {};
  const pred: Record<string, string | null> = {};
  const queue = [startVertex];

  vertices.forEach(vertex => {
    color[vertex] = Colors.WHITE;
    dist[vertex] = 0;
    pred[vertex] = null;
  });

  while (queue.length) {
    const visiting = queue.shift()!;
    const neighbors = adjList.get(visiting)!;
    color[visiting] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (color[neighbor] === Colors.WHITE) {
        color[neighbor] = Colors.GREY;
        dist[neighbor] = dist[visiting] + 1;
        pred[neighbor] = visiting;
        queue.push(neighbor);
      }
    }
    color[visiting] = Colors.BLACK;
  }

  return {
    distances: dist,
    predecessors: pred,
  };
};

export { breadthFirstSearch, bfsShortestPath };
