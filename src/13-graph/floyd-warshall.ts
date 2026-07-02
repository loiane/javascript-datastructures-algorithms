// src/13-graph/floyd-warshall.ts

const INF = Number.MAX_SAFE_INTEGER; // Infinity

const initializeMatrix = (graph: number[][]): number[][] => {
  const dist: number[][] = [];
  const { length } = graph;
  for (let i = 0; i < length; i++) {
    dist[i] = [];
    for (let j = 0; j < length; j++) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (!isFinite(graph[i][j])) {
        dist[i][j] = INF;
      } else {
        dist[i][j] = graph[i][j];
      }
    }
  }
  return dist;
};

/**
 * Computes all-pairs shortest paths using the Floyd-Warshall algorithm.
 * @param graph - n×n adjacency matrix
 * @returns n×n distance matrix with shortest paths between all pairs
 * @complexity Time O(V³) | Space O(V²)
 */
const floydWarshall = (graph: number[][]): number[][] => {
  const { length } = graph;
  const dist = initializeMatrix(graph);

  // Consider each airport as an intermediate point
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        // If a shorter path is found through an intermediate airport, update the distance
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
};

export default floydWarshall;
