// src/13-graph/02-using-bfs.js

const Graph = require('./graph');
const { breadthFirstSearch, bfsShortestPath} = require('./bfs');

const airline = new Graph();

const airports = 'SEA SFO LAX LAS DEN DFW STL MDW JFK ATL MCO MIA'.split(' ');

airports.forEach(airport => 
  airline.addVertex(airport)
);

airline.addEdge('SEA', 'SFO');
airline.addEdge('SEA', 'DEN');
airline.addEdge('SEA', 'MDW');
airline.addEdge('SFO', 'LAX');
airline.addEdge('LAX', 'LAS');
airline.addEdge('DEN', 'DFW');
airline.addEdge('DEN', 'STL');
airline.addEdge('STL', 'MDW');
airline.addEdge('STL', 'MCO');
airline.addEdge('MDW', 'ATL');
airline.addEdge('MDW', 'JFK');
airline.addEdge('ATL', 'JFK');
airline.addEdge('JFK', 'MCO');
airline.addEdge('JFK', 'MIA');

console.log(airline.toString());

// Output:
// SEA -> SFO DEN MDW 
// SFO -> SEA LAX 
// LAX -> SFO LAS 
// LAS -> LAX 
// DEN -> SEA DFW STL 
// DFW -> DEN 
// STL -> DEN MDW MCO 
// MDW -> SEA STL ATL JFK 
// JFK -> MDW ATL MCO MIA 
// ATL -> MDW JFK 
// MCO -> STL JFK 
// MIA -> JFK 

console.log('--- BFS ---');

const printAirport = (value) => console.log('Visited airport: ' + value);

breadthFirstSearch(airline,'SEA', printAirport);

// Output:
// --- BFS ---
// Visited airport: SEA
// Visited airport: SFO
// Visited airport: DEN
// Visited airport: MDW
// Visited airport: LAX
// Visited airport: DFW
// Visited airport: STL
// Visited airport: ATL
// Visited airport: JFK
// Visited airport: LAS
// Visited airport: MCO
// Visited airport: MIA

console.log('--- BFS Shortest Path ---');

const shortestPath = bfsShortestPath(airline, 'SEA');
console.log(shortestPath);

// { distances: { SEA: 0, SFO: 1, LAX: 2, LAS: 3, DEN: 1, DFW: 2, STL: 2, MDW: 1, JFK: 2, ATL: 2, MCO: 3, MIA: 3 }, 
//   predecessors: { SEA: null, SFO: 'SEA', LAX: 'SFO', LAS: 'LAX', DEN: 'SEA', DFW: 'DEN', STL: 'DEN', MDW: 'SEA', JFK: 'MDW', ATL: 'MDW', MCO: 'STL', MIA: 'JFK'}
// }

// find the shortest path from SEA to JFK
let path = [];
for (let v = 'JFK'; v !== 'SEA'; v = shortestPath.predecessors[v]) {
  path.push(v);
}
path.push('SEA');
path.reverse();

console.log('Shortest path from SEA to JFK: ' + path.join(' -> '));

// Shortest path from SEA to JFK: SEA -> MDW -> JFK

// to see the output of this file use the command: node src/13-graph/02-using-bfs.js