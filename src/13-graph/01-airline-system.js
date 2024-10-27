// src/13-graph/01-airline-system.js

// import the Graph class
const Graph = require('./graph');

const airline = new Graph();

const airports = 'MCO TPA JFK LAX SFO'.split(' ');

airports.forEach(airport => 
  airline.addVertex(airport)
);

airline.addEdge('MCO', 'JFK');
airline.addEdge('MCO', 'LAX');
airline.addEdge('TPA', 'JFK');
airline.addEdge('TPA', 'LAX');
airline.addEdge('JFK', 'LAX');
airline.addEdge('JFK', 'SFO');
airline.addEdge('LAX', 'SFO');

console.log(airline.toString());

// Output:
// MCO -> JFK LAX 
// TPA -> JFK LAX 
// JFK -> MCO TPA LAX SFO 
// LAX -> MCO TPA JFK SFO 
// SFO -> JFK LAX 

// to see the output of this file use the command: node src/13-graph/01-airline-system.js