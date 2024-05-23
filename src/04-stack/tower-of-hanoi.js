// src/04-stack/tower-of-hanoi.js

const Stack = require('./stack');

/**
 * Solves the Tower of Hanoi puzzle
 * @param {number} n - number of disks
 * @param {Stack} source - source stack
 * @param {Stack} auxiliary - auxiliary stack
 * @param {Stack} destination - destination stack
 */
function towerOfHanoi(n, source, auxiliary, destination) {
  if (n > 0) {
    towerOfHanoi(n - 1, source, destination, auxiliary);
    destination.push(source.pop());
    towerOfHanoi(n - 1, auxiliary, source, destination);
  }
}


// Usage
// const source = new Stack();
// const auxiliary = new Stack();
// const destination = new Stack();
// source.push(3);
// source.push(2);
// source.push(1);
// towerOfHanoi(3, source, auxiliary, destination);
// console.log(destination); // [1, 2, 3]


module.exports = towerOfHanoi;
