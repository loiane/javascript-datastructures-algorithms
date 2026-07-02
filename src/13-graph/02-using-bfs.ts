// src/13-graph/02-using-bfs.ts

import Graph from './graph';
import { breadthFirstSearch, bfsShortestPath } from './bfs';

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

console.log('--- BFS ---');

const printAirport = (value: string) => console.log('Visited airport: ' + value);

breadthFirstSearch(airline, 'SEA', printAirport);

console.log('--- BFS Shortest Path ---');

const shortestPath = bfsShortestPath(airline, 'SEA');
console.log(shortestPath);

// find the shortest path from SEA to JFK
let path: string[] = [];
for (let v = 'JFK'; v !== 'SEA'; v = shortestPath.predecessors[v] as string) {
  path.push(v);
}
path.push('SEA');
path.reverse();

console.log('Shortest path from SEA to JFK: ' + path.join(' -> '));

// Shortest path from SEA to JFK: SEA -> MDW -> JFK

// to see the output of this file use the command: node src/13-graph/02-using-bfs.js

export {};
