// src/13-graph/07-using-kruskal.js

const kruskal = require('./kruskal');

const cityNames = ['Erebor', 'Rivendell', 'Hobbiton', 'Isengard', 'Rohan', 'Lothlorien'];

const cities = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0]
];

const mst = kruskal(cities);

console.log('Minimum Spanning Tree with Kruskal:', mst);

// [ [ 0, 1 ], [ 1, 2 ], [ 1, 4 ], [ 3, 5 ], [ 4, 5 ] ]

// to see the output of this file use the command: node src/13-graph/07-using-kruskal.js