// src/13-graph/dfs.js

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
}

const depthFirstSearch = (graph, callback) => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
}

const depthFirstSearchVisit = (vertex, color, adjList, callback) => {
  color[vertex] = Colors.GREY; // Mark as discovered
  if (callback) {
    callback(vertex);
  }
  const neighbors = adjList.get(vertex);
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    if (color[neighbor] === Colors.WHITE) { // If unvisited - recursive call
      depthFirstSearchVisit(neighbor, color, adjList, callback);
    }
  }
  color[vertex] = Colors.BLACK; // Mark as explored
}

const enhancedDepthFirstSearch = (graph, callback) => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color = initializeColor(vertices);
  const discovery = {}; // Discovery times
  const finished = {}; // Finish times
  const predecessors = {};
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

  return { discovery, finished, predecessors};
}

const enhancedDFSVisit = (vertex, color, discovery, finished, predecessors, time, adjList) => {
  color[vertex] = Colors.GREY;
  discovery[vertex] = ++time.count; // Record discovery time
  const neighbors = adjList.get(vertex);
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

module.exports = { depthFirstSearch, enhancedDepthFirstSearch};