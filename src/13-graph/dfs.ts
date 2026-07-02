// src/13-graph/dfs.ts

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
 * Performs a depth-first search on the entire graph, invoking callback for each vertex.
 * @param graph - The graph to traverse
 * @param callback - Optional function called for each discovered vertex
 * @complexity Time O(V + E) | Space O(V)
 */
const depthFirstSearch = (
  graph: Graph<string>,
  callback?: (vertex: string) => void
): void => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
};

const depthFirstSearchVisit = (
  vertex: string,
  color: Record<string, Color>,
  adjList: Map<string, string[]>,
  callback?: (vertex: string) => void
): void => {
  color[vertex] = Colors.GREY; // Mark as discovered
  if (callback) {
    callback(vertex);
  }
  const neighbors = adjList.get(vertex)!;
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    if (color[neighbor] === Colors.WHITE) { // If unvisited - recursive call
      depthFirstSearchVisit(neighbor, color, adjList, callback);
    }
  }
  color[vertex] = Colors.BLACK; // Mark as explored
};

/**
 * Enhanced DFS returning discovery/finish times and predecessors for all vertices.
 * @param graph - The graph to traverse
 * @param callback - Optional function called for each discovered vertex
 * @returns Object with discovery, finished, and predecessors for each vertex
 * @complexity Time O(V + E) | Space O(V)
 */
const enhancedDepthFirstSearch = (
  graph: Graph<string>,
  callback?: (vertex: string) => void
): { discovery: Record<string, number>; finished: Record<string, number>; predecessors: Record<string, string | null> } => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color = initializeColor(vertices);
  const discovery: Record<string, number> = {}; // Discovery times
  const finished: Record<string, number> = {}; // Finish times
  const predecessors: Record<string, string | null> = {};
  const time = { count: 0 };

  for (let i = 0; i < vertices.length; i++) {
    finished[vertices[i]] = 0;
    discovery[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      enhancedDFSVisit(vertices[i], color, discovery, finished, predecessors, time, adjList);
    }
  }

  return { discovery, finished, predecessors };
};

const enhancedDFSVisit = (
  vertex: string,
  color: Record<string, Color>,
  discovery: Record<string, number>,
  finished: Record<string, number>,
  predecessors: Record<string, string | null>,
  time: { count: number },
  adjList: Map<string, string[]>
): void => {
  color[vertex] = Colors.GREY;
  discovery[vertex] = ++time.count; // Record discovery time
  const neighbors = adjList.get(vertex)!;
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    if (color[neighbor] === Colors.WHITE) {
      predecessors[neighbor] = vertex; // Record predecessor
      enhancedDFSVisit(neighbor, color, discovery, finished, predecessors, time, adjList);
    }
  }
  color[vertex] = Colors.BLACK;
  finished[vertex] = ++time.count; // Record finish time
};

export { depthFirstSearch, enhancedDepthFirstSearch };
