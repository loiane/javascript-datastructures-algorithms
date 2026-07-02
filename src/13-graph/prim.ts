// src/13-graph/prim.ts

const INF = Number.MAX_SAFE_INTEGER;

const minKey = (graph: number[][], key: number[], visited: boolean[]): number => {
  let min = INF;
  let minIndex = 0;
  for (let v = 0; v < graph.length; v++) {
    if (visited[v] === false && key[v] < min) {
      min = key[v];
      minIndex = v;
    }
  }
  return minIndex;
};

/**
 * Finds the Minimum Spanning Tree using Prim's algorithm.
 * @param graph - n×n adjacency matrix (0 means no edge)
 * @returns Parent array representing the MST edges
 * @complexity Time O(V²) | Space O(V)
 */
const prim = (graph: number[][]): number[] => {
  const parent: number[] = []; // Stores the MST
  const key: number[] = []; // Keeps track of the minimum edge weights
  const visited: boolean[] = []; // Marks visited vertices
  const { length } = graph;

  // Initialize all key values as infinite and visited as false
  for (let i = 0; i < length; i++) {
    key[i] = INF;
    visited[i] = false;
  }

  key[0] = 0; // Start with the first vertex
  parent[0] = -1; // The first vertex is the root of the MST

  // Find the MST for all vertices
  for (let i = 0; i < length - 1; i++) {
    const u = minKey(graph, key, visited); // Select the vertex with the minimum key value
    visited[u] = true; // Mark the selected vertex as visited

    // Update key values and parent for adjacent vertices
    for (let v = 0; v < length; v++) {
      if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
        parent[v] = u; // Update parent to store the edge in the MST
        key[v] = graph[u][v]; // Update key value to the minimum edge weight
      }
    }
  }

  return parent; // Return the MST
};

export default prim;
