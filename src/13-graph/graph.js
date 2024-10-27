// src/13-graph/graph.js

// Graph class
class Graph {

  #isDirected = false;
  #vertices = [];
  #adjList = new Map();

  constructor(isDirected = false) {
    this.#isDirected = isDirected;
  }

  addVertex(vertex) {
    if (!this.#vertices.includes(vertex)) {
      this.#vertices.push(vertex);
      this.#adjList.set(vertex, []);
    }
  }

  addEdge(vertex, edge) {
    if (!this.#adjList.get(vertex)) {
      this.addVertex(vertex);
    }
    if (!this.#adjList.get(edge)) {
      this.addVertex(edge);
    }
    this.#adjList.get(vertex).push(edge);
    if (!this.#isDirected) {
      this.#adjList.get(edge).push(vertex);
    }
  }

  get vertices() {
    return this.#vertices;
  }

  get adjList() {
    return this.#adjList;
  }

  toString() {
    let s = '';
    this.#vertices.forEach(vertex => {
      s += `${vertex} -> `;
      this.#adjList.get(vertex).forEach(neighbor => {
        s += `${neighbor} `;
      });
      s += '\n';
    });
    return s;
  } 
}

module.exports = Graph;