// src/13-graph/graph.ts

// Graph class
class Graph<T = string> {

  #isDirected: boolean = false;
  #vertices: T[] = [];
  #adjList: Map<T, T[]> = new Map();

  constructor(isDirected: boolean = false) {
    this.#isDirected = isDirected;
  }

  addVertex(vertex: T): void {
    if (!this.#vertices.includes(vertex)) {
      this.#vertices.push(vertex);
      this.#adjList.set(vertex, []);
    }
  }

  addEdge(vertex: T, edge: T): void {
    if (!this.#adjList.get(vertex)) {
      this.addVertex(vertex);
    }
    if (!this.#adjList.get(edge)) {
      this.addVertex(edge);
    }
    this.#adjList.get(vertex)!.push(edge);
    if (!this.#isDirected) {
      this.#adjList.get(edge)!.push(vertex);
    }
  }

  get vertices(): T[] {
    return this.#vertices;
  }

  get adjList(): Map<T, T[]> {
    return this.#adjList;
  }

  toString(): string {
    let s = '';
    this.#vertices.forEach(vertex => {
      s += `${vertex} -> `;
      this.#adjList.get(vertex)!.forEach(neighbor => {
        s += `${neighbor} `;
      });
      s += '\n';
    });
    return s;
  }
}

export default Graph;
