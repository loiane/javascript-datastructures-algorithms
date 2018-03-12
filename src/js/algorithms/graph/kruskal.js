const INF = Number.MAX_SAFE_INTEGER;
const find = (i, parent) => {
  while (parent[i]) {
    i = parent[i]; // eslint-disable-line prefer-destructuring
  }
  return i;
};
const union = (i, j, parent) => {
  if (i !== j) {
    parent[j] = i;
    return true;
  }
  return false;
};
const initializeCost = graph => {
  const cost = [];
  const { length } = graph;
  for (let i = 0; i < length; i++) {
    cost[i] = [];
    for (let j = 0; j < length; j++) {
      if (graph[i][j] === 0) {
        cost[i][j] = INF;
      } else {
        cost[i][j] = graph[i][j];
      }
    }
  }
  return cost;
};
export const kruskal = graph => {
  const { length } = graph;
  const parent = [];
  let ne = 0;
  let a;
  let b;
  let u;
  let v;
  const cost = initializeCost(graph);
  while (ne < length - 1) {
    for (let i = 0, min = INF; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (cost[i][j] < min) {
          min = cost[i][j];
          a = u = i;
          b = v = j;
        }
      }
    }
    u = find(u, parent);
    v = find(v, parent);
    if (union(u, v, parent)) {
      ne++;
    }
    cost[a][b] = cost[b][a] = INF;
  }
  return parent;
};
