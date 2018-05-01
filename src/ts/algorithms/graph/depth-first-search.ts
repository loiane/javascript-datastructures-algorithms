import Graph from '../../data-structures/graph';

enum Colors {
  WHITE = 0,
  GREY = 1,
  BLACK = 2
}

const initializeColor = (vertices: (string | number)[]) => {
  const color: any = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

const depthFirstSearchVisit = (
  u: string | number,
  color: any,
  adjList: any,
  callback: Function
) => {
  color[u] = 'grey';
  if (callback) {
    callback(u);
  }
  // console.log('Discovered ' + u);
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback);
    }
  }
  color[u] = Colors.BLACK;
  // console.log('explored ' + u);
};

export const depthFirstSearch = (graph: Graph, callback: Function) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
};

const DFSVisit = (
  u: string | number,
  color: any,
  d: any,
  f: any,
  p: any,
  time: any,
  adjList: any
) => {
  // console.log('discovered ' + u);
  color[u] = Colors.GREY;
  d[u] = ++time.count;
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      p[w] = u;
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  }
  color[u] = Colors.BLACK;
  f[u] = ++time.count;
  // console.log('explored ' + u);
};

export const DFS = (graph: Graph) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const d: any = {};
  const f: any = {};
  const p: any = {};
  const time = { count: 0 };

  for (let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0;
    d[vertices[i]] = 0;
    p[vertices[i]] = null;
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p
  };
};
