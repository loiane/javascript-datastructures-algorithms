// src/13-graph/dijkstra.js

const INF = Number.MAX_SAFE_INTEGER; // Infinity

const dijkstra = (graph, src) => {
  const dist = [];
  const visited = [];
  const pred = []; // Predecessor array
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
  const paths = {};
  for (let i = 0; i < length; i++) {
    paths[i] = [];
    let crawl = i;
    paths[i].push(crawl);
    while (pred[crawl] !== null) {
      paths[i].push(pred[crawl]);
      crawl = pred[crawl];
    }
    paths[i].reverse();
  }
  return { distances: dist, predecessors: paths };
};

const minDistance = (dist, visited) => {
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

module.exports = dijkstra;