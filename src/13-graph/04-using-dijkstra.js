// src/13-graph/04-using-dijkstra.js

const Graph = require('./graph');
const dijkstra = require('./dijkstra');

const flightCosts = [
// SEA, MDW,  DEN, MCO,  STL, JFK,  ATL
  [0,   300,  220, 1000,  0,   0,    0],  // SEA
  [300,  0,    0,   0,   50,  210,  190], // MDW
  [220,  0,    0,   0,   350,  0,    0],  // DEN
  [1000, 0,    0,   0,   150, 250,   0],  // MCO
  [0,    50,  350, 150,   0,   0,    0],  // STL
  [0,   210,   0,  250,   0,   0,   200], // JFK
  [0,   190,   0,   0,    0,  200,   0],  // ATL
];

console.log('********* Dijkstra\'s Algorithm - Shortest Path ***********');

const prices = dijkstra(flightCosts, 0); // SEA
// prices output:
// {
//   distances: [
//       0, 300, 220,
//     500, 350, 510,
//     490
//   ],
//   predecessors: {
//     '0': [ 0 ],
//     '1': [ 0, 1 ],
//     '2': [ 0, 2 ],
//     '3': [ 0, 1, 4, 3 ],
//     '4': [ 0, 1, 4 ],
//     '5': [ 0, 1, 5 ],
//     '6': [ 0, 1, 6 ]
//   }
// }
console.log('Prices from SEA to all airports:');
const airports = ['SEA', 'MDW', 'DEN', 'MCO', 'STL', 'JFK', 'ATL'];
for (let i = 1; i < airports.length; i++) {
  const flights = prices.predecessors[i].map(airport => airports[airport]).join(' -> ');
  console.log(`SEA -> ${airports[i]}: $${prices.distances[i]} via ${flights}`);
}
// Prices from SEA to all airports:
// SEA -> MDW: $300 via SEA -> MDW
// SEA -> DEN: $220 via SEA -> DEN
// SEA -> MCO: $500 via SEA -> MDW -> STL -> MCO
// SEA -> STL: $350 via SEA -> MDW -> STL
// SEA -> JFK: $510 via SEA -> MDW -> JFK
// SEA -> ATL: $490 via SEA -> MDW -> ATL

// to see the output of this file use the command: node src/13-graph/04-using-dijkstra.js
