// src/13-graph/03-using-dfs.ts

import Graph from './graph';
import { depthFirstSearch, enhancedDepthFirstSearch } from './dfs';

const caveSystem = new Graph();

const caves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

caves.forEach(cave => caveSystem.addVertex(cave));


caveSystem.addEdge('A', 'B');
caveSystem.addEdge('A', 'C');
caveSystem.addEdge('A', 'D');
caveSystem.addEdge('C', 'D');
caveSystem.addEdge('C', 'G');
caveSystem.addEdge('D', 'G');
caveSystem.addEdge('D', 'H');
caveSystem.addEdge('B', 'E');
caveSystem.addEdge('B', 'F');
caveSystem.addEdge('E', 'I');

console.log('********* DFS - cave ***********');
depthFirstSearch(caveSystem, (cave) => console.log('Visited cave:', cave));

console.log('********* Enhanced DFS - cave ***********');
const result = enhancedDepthFirstSearch(caveSystem);

console.log(result);

console.log('********* Topological sort using DFS ***********');

const tasks = new Graph(true); // this is a directed graph
['A', 'B', 'C', 'D', 'E', 'F'].forEach(task => tasks.addVertex(task));
// add the arrows, task dependencies:
tasks.addEdge('A', 'C');
tasks.addEdge('A', 'D');
tasks.addEdge('B', 'D');
tasks.addEdge('B', 'E');
tasks.addEdge('C', 'F');
tasks.addEdge('F', 'E');

// DFS traversal
const dfsTasks = enhancedDepthFirstSearch(tasks);
console.log(dfsTasks);

// sort tasks in decreasing order of finish time
const sortedTasks = Object.keys(dfsTasks.finished).sort((a, b) => dfsTasks.finished[b] - dfsTasks.finished[a]);
console.log(sortedTasks);
// [ 'B', 'A', 'D', 'C', 'F', 'E' ]

// to see the output of this file use the command: node src/13-graph/03-using-dfs.js

export {};
