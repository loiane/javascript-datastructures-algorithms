// src/13-graph/bfs.js

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
};

const initializeColor = vertices => {
  const color = {};
  vertices.forEach(vertex => {
    color[vertex] = Colors.WHITE;
  });
  return color;
};

const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color = initializeColor(vertices);
  const queue = [startVertex];

  while (queue.length) {
    const visiting = queue.shift();
    const neighbors = adjList.get(visiting);
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

const bfsShortestPath = (graph, startVertex) => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color = {};
  const dist = {};
  const pred = {};
  const queue = [startVertex];

  vertices.forEach(vertex => {
    color[vertex] = Colors.WHITE;
    dist[vertex] = 0;
    pred[vertex] = null;
  });

  while (queue.length) {
    const visiting = queue.shift();
    const neighbors = adjList.get(visiting);
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
    predecessors: pred
  };
};

module.exports = { breadthFirstSearch , bfsShortestPath };