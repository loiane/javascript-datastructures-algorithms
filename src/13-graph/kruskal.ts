// src/13-graph/kruskal.ts

const INF = Number.MAX_SAFE_INTEGER;

/**
 * Finds the Minimum Spanning Tree using Kruskal's algorithm.
 * @param graph - n×n adjacency matrix (0 means no edge)
 * @returns Parent array representing the MST edges
 * @complexity Time O(E log E) | Space O(V)
 */
const kruskal = (graph: number[][]): number[] => {
  const { length } = graph;
  const parent: number[] = []; // Stores the MST
  let ne = 0; // Number of edges in the MST
  let a = 0; let b = 0; let u = 0; let v = 0;
  const cost = initializeCost(graph); // Create a copy of the graph

  // While the MST has fewer edges than the total number of vertices - 1
  while (ne < length - 1) {
    for (let i = 0, min = INF; i < length; i++) {
      for (let j = 0; j < length; j++) {
        // Find the edge with the minimum cost
        if (cost[i][j] < min) {
          min = cost[i][j];
          a = u = i;
          b = v = j;
        }
      }
    }

    u = find(u, parent); // Find the set of vertex u
    v = find(v, parent); // Find the set of vertex v

    // If adding the edge doesn't create a cycle, add it to the MST
    if (union(u, v, parent)) {
      ne++;
    }

    cost[a][b] = cost[b][a] = INF; // Remove the edge from the cost matrix
  }

  return parent; // Return the MST
};

// Helper function to initialize the cost matrix
const initializeCost = (graph: number[][]): number[][] => {
  const { length } = graph;
  const cost: number[][] = Array(length).fill(null).map(() => Array(length).fill(null));

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      cost[i][j] = graph[i][j] || INF;
    }
  }

  return cost;
};

// Helper function to find the set of an element i
const find = (i: number, parent: number[]): number => {
  while (parent[i] !== undefined && parent[i] !== 0) {
    i = parent[i];
  }
  return i;
};

// Helper function to union two sets of i and j
const union = (i: number, j: number, parent: number[]): boolean => {
  if (i !== j) {
    parent[j] = i;
    return true;
  }
  return false;
};

export default kruskal;
