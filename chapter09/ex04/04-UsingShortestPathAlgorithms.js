//adjacent matrix
var i;

var graph = [[0, 2, 4, 0, 0, 0],
             [0, 0, 2, 4, 2, 0],
             [0, 0, 0, 0, 3, 0],
             [0, 0, 0, 0, 0, 2],
             [0, 0, 0, 3, 0, 2],
             [0, 0, 0, 0, 0, 0]];            

var shortestPath = new ShortestPath(graph);

console.log("********* Dijkstra's Algorithm - Shortest Path ***********");

var dist = shortestPath.dijkstra(0);

for (i = 0; i < dist.length; i++){
    console.log(i + '\t\t' + dist[i]);
}

console.log("********* Floyd-Warshall Algorithm - All-Pairs Shortest Path ***********");

var INF = Number.MAX_SAFE_INTEGER;
graph = [[0, 2, 4, INF, INF, INF],
        [INF, 0, 2, 4, 2, INF],
        [INF, INF, 0, INF, 3, INF],
        [INF, INF, INF, 0, INF, 2],
        [INF, INF, INF, 3, 0, 2],
        [INF, INF, INF, INF, INF, 0]];

shortestPath = new ShortestPath(graph);

dist = shortestPath.floydWarshall();

var s = '';
for (i=0; i<dist.length; ++i) {
    s = '';
    for (var j=0; j<dist.length; ++j) {
        if (dist[i][j] === INF)
            s += "INF ";
        else
            s += dist[i][j]+"   ";
    }
    console.log(s);
}
