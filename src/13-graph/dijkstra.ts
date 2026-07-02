// src/13-graph/dijkstra.ts

const INF = Number.MAX_SAFE_INTEGER; // Infinity

const minDistance = (dist: number[], visited: boolean[]): number => {
  let min = INF;
  let minIndex = -1;
  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex;
};

/**
 * Runs Dijkstra's shortest-path algorithm on an adjacency-matrix graph.
 * @param graph - n×n adjacency matrix (0 means no edge)
 * @param src - Source vertex index
 * @returns Object with shortest distances and predecessor paths from src
 * @complexity Time O(V²) | Space O(V)
 */
const dijkstra = (
  graph: number[][],
  src: number
): { distances: number[]; predecessors: Record<number, number[]> } => {
  const dist: number[] = [];
  const visited: boolean[] = [];
  const pred: (number | null)[] = []; // Predecessor array
  const { length } = graph;
  for (let i = 0; i < length; i++) {
    dist[i] = INF;
    visited[i] = false;
    pred[i] = null; // Initialize predecessors
  }
  dist[src] = 0;
  for (let i = 0; i < length - 1; i++) {
    const unv = minDistance(dist, visited);
    visited[unv] = true;
    for (let v = 0; v < length; v++) {
      if (!visited[v] && graph[unv][v] !== 0 && dist[unv] !== INF && dist[unv] + graph[unv][v] < dist[v]) {
        dist[v] = dist[unv] + graph[unv][v];
        pred[v] = unv; // Update predecessor
      }
    }
  }

  // Construct paths from predecessors
  const paths: Record<number, number[]> = {};
  for (let i = 0; i < length; i++) {
    paths[i] = [];
    let crawl: number = i;
    paths[i].push(crawl);
    while (pred[crawl] !== null) {
      paths[i].push(pred[crawl]!);
      crawl = pred[crawl]!;
    }
    paths[i].reverse();
  }
  return { distances: dist, predecessors: paths };
};

export default dijkstra;
