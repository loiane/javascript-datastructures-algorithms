const { prim } = PacktDataStructuresAlgorithms;

const graph = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0]
];

console.log("********* Prim's Algorithm - Minimum Spanning Tree ***********");

const parent = prim(graph);

console.log('Edge   Weight');
for (let i = 1; i < graph.length; i++) {
  console.log(parent[i] + ' - ' + i + '   ' + graph[i][parent[i]]);
}
