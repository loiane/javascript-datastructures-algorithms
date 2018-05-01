import 'mocha';
import { expect } from 'chai';
import { BFS, breadthFirstSearch, Graph } from '../../../../src/js/index';

describe('Breadth First Search', () => {
  let count;
  const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  let graph;

  function assertCallback(value) {
    expect(value).to.equal(vertices[count]);
    count++;
  }

  beforeEach(() => {
    count = 0;
    graph = new Graph();

    for (let i = 0; i < vertices.length; i++) {
      graph.addVertex(vertices[i]);
    }

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');
    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');
    graph.addEdge('E', 'I');
  });

  it('breadthFirstSearch', () => {
    breadthFirstSearch(graph, vertices[0], assertCallback);
  });

  it('sorthest path - BFS', () => {
    const shortestPathA = BFS(graph, vertices[0]);

    expect(shortestPathA.distances).to.deep.equal({
      A: 0,
      B: 1,
      C: 1,
      D: 1,
      E: 2,
      F: 2,
      G: 2,
      H: 2,
      I: 3
    });
    expect(shortestPathA.predecessors).to.deep.equal({
      A: null,
      B: 'A',
      C: 'A',
      D: 'A',
      E: 'B',
      F: 'B',
      G: 'C',
      H: 'D',
      I: 'E'
    });
  });
});
