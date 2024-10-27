// src/13-graph/05-using-floyd-warshall.js

const floydWarshall = require('./floyd-warshall');

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
  return airports.reduce((acc, dest, j) => {
    acc[dest] = distances[i][j];
    return acc;
  }, {});
}));

// ┌─────────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
// │ Airport │ SEA │ MDW │ DEN │ MCO │ STL │ JFK │ ATL │
// ├─────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
// │  SEA    │  0  │ 300 │ 220 │ 500 │ 350 │ 510 │ 490 │
// │  MDW    │ 300 │  0  │ 400 │ 200 │ 50  │ 210 │ 190 │
// │  DEN    │ 220 │ 400 │  0  │ 500 │ 350 │ 610 │ 590 │
// │  MCO    │ 500 │ 200 │ 500 │  0  │ 150 │ 250 │ 390 │
// │  STL    │ 350 │ 50  │ 350 │ 150 │  0  │ 260 │ 240 │
// │  JFK    │ 510 │ 210 │ 610 │ 250 │ 260 │  0  │ 200 │
// │  ATL    │ 490 │ 190 │ 590 │ 390 │ 240 │ 200 │  0  │
// └─────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘

// to see the output of this file use the command: node src/13-graph/05-using-floyd-warshall.js