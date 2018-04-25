const { dijkstra } = PacktDataStructuresAlgorithms;

const graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 2, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
];

console.log("********* Dijkstra's Algorithm - Shortest Path ***********");

var dist = dijkstra(graph, 0);

for (i = 0; i < dist.length; i++){
    console.log(i + '\t\t' + dist[i]);
}
