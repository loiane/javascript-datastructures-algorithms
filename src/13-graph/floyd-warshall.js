// src/13-graph/floyd-warshall.js

const INF = Number.MAX_SAFE_INTEGER; // Infinity

const initializeMatrix = (graph) => {
  const dist = [];
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
}

const floydWarshall = (graph) => {
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

module.exports = floydWarshall;