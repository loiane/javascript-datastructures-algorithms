// src/13-graph/graph.ts

// Graph class
class Graph<T = string> {

  #isDirected: boolean = false;
  #vertices: T[] = [];
  #adjList: Map<T, T[]> = new Map();

  constructor(isDirected: boolean = false) {
    this.#isDirected = isDirected;
  }

  /**
   * Adds a vertex to the graph if it does not already exist.
   * @param vertex - The vertex to add
   * @complexity Time O(1) amortized | Space O(1)
   */
  addVertex(vertex: T): void {
    if (!this.#vertices.includes(vertex)) {
      this.#vertices.push(vertex);
      this.#adjList.set(vertex, []);
    }
  }

  /**
   * Adds an edge between two vertices, adding vertices if needed.
   * @param vertex - Source vertex
   * @param edge - Destination vertex
   * @complexity Time O(1) amortized | Space O(1)
   */
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

  /**
   * Array of all vertices in the graph.
   * @complexity Time O(1) | Space O(1)
   */
  get vertices(): T[] {
    return this.#vertices;
  }

  /**
   * Adjacency list mapping each vertex to its neighbors.
   * @complexity Time O(1) | Space O(1)
   */
  get adjList(): Map<T, T[]> {
    return this.#adjList;
  }

  /**
   * Returns a multi-line string showing each vertex and its adjacency list.
   * @returns String representation of the graph
   * @complexity Time O(V + E) | Space O(V + E)
   */
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
