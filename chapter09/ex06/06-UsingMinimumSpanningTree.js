var i;

var graph = [[0, 2, 4, 0, 0, 0],
             [2, 0, 2, 4, 2, 0],
             [4, 2, 0, 0, 3, 0],
             [0, 4, 0, 0, 3, 2],
             [0, 2, 3, 3, 0, 2],
             [0, 0, 0, 2, 2, 0]];

var mst = new MinimumSpanningTree(graph);


console.log("********* Prim's Algorithm - Minimum Spanning Tree ***********");

var parent = mst.prim();

console.log('Edge   Weight');
for (i = 1; i < graph.length; i++){
    console.log(parent[i] + ' - ' + i + '   ' +  graph[i][parent[i]]);
}

console.log("********* Kruskal Algorithm - Minimum Spanning Tree ***********");

parent = mst.kruskal();

console.log('Edge   Weight');
for (i = 1; i < graph.length; i++){
    console.log(parent[i] + ' - ' + i + '   ' +  graph[i][parent[i]]);
}