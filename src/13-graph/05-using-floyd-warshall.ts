// src/13-graph/05-using-floyd-warshall.ts

import floydWarshall from './floyd-warshall';

const INF = Infinity;
const flightCosts = [
// SEA, MDW,  DEN, MCO,  STL, JFK,  ATL
  [INF,   300,  220, 1000,  INF,   INF,    INF],  // SEA
  [300,  INF,    INF,   INF,   50,  210,  190], // MDW
  [220,  INF,    INF,   INF,   350,  INF,    INF],  // DEN
  [1000, INF,    INF,   INF,   150, 250,   INF],  // MCO
  [INF,    50,  350, 150,   INF,   INF,    INF],  // STL
  [INF,   210,   INF,  250,   INF,   INF,   200], // JFK
  [INF,   190,   INF,   INF,    INF,  200,   INF],  // ATL
];

console.log('********* Floyd-Warshall Algorithm - Shortest Path ***********');

const distances = floydWarshall(flightCosts);
console.log('Distances between all airports:');

const airports = ['SEA', 'MDW', 'DEN', 'MCO', 'STL', 'JFK', 'ATL'];
console.table(airports.map((airport, i) => {
  return airports.reduce((acc: Record<string, number>, dest, j) => {
    acc[dest] = distances[i][j];
    return acc;
  }, {});
}));

// to see the output of this file use the command: node src/13-graph/05-using-floyd-warshall.js

export {};
