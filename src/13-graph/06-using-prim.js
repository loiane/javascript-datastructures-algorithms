// src/13-graph/06-using-prim.js

const prim = require('./prim');

const cityNames = ['Erebor', 'Rivendell', 'Hobbiton', 'Isengard', 'Rohan', 'Lothlorien'];

const cities = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0]
];

const mst = prim(cities);
console.log('Minimum Spanning Tree:', mst);

// [ -1, 0, 1, 5, 1, 4 ]

// to see the output of this file use the command: node src/13-graph/06-using-prim.js