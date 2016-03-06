function ShortestPath(graph) {

  this.graph = graph;

  var INF = Number.MAX_SAFE_INTEGER;

  var minDistance = function(dist, visited){

        var min = INF,
            minIndex = -1;

        for (var v = 0; v < dist.length; v++){
            if (visited[v] == false && dist[v] <= min){
                min = dist[v];
                minIndex = v;
            }
        }

        return minIndex;
    };

    this.dijkstra = function(src){

        var dist = [],
            visited = [],
            length = this.graph.length;

        // Initialize all distances as INFINITE (JavaScript max number) and visited[] as false
        for (var i = 0; i < length; i++) {
            dist[i] = INF;
            visited[i] = false;
        }

        // Distance of source vertex from itself is always 0
        dist[src] = 0;

        // Find shortest path for all vertices
        for (var i = 0; i < length-1; i++){

            // Pick the minimum distance vertex from the set of vertices
            // not yet processed. u is always equal to src in first
            // iteration.
            var u = minDistance(dist, visited);

            // Mark the picked vertex as processed
            visited[u] = true;

            // Update dist value of the adjacent vertices of the
            // picked vertex.
            for (var v = 0; v < length; v++){
                if (!visited[v] && this.graph[u][v]!=0 && dist[u] != INF && dist[u]+this.graph[u][v] < dist[v]){
                    dist[v] = dist[u] + this.graph[u][v];
                }
            }
        }

        return dist;
    };

    this.floydWarshall = function(){

        var dist = [],
            length = this.graph.length,
            i, j, k;

        for (i = 0; i < length; i++){
            dist[i] = [];
            for (j = 0; j < length; j++){
                dist[i][j] = this.graph[i][j];
            }
        }

        for (k = 0; k < length; k++){
            for (i = 0; i < length; i++){
                for (j = 0; j < length; j++){
                    if (dist[i][k] + dist[k][j] < dist[i][j]){
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        return dist;
    }
}