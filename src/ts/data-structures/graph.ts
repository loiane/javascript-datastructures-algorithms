import Dictionary from './dictionary';

export default class Graph<T> {
  private vertices: T[] = [];
  private adjList: Dictionary<T, T[]> = new Dictionary();

  addVertex(v: T) {
    this.vertices.push(v);
    this.adjList.set(v, []); // initialize adjacency list with array as well;
  }

  addEdge(v: T, w: T) {
    this.adjList.get(v).push(w);
    // adjList.get(w).push(v); //commented to run the improved DFS with topological sorting
  }
}
