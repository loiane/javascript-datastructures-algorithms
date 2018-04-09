const { knapSackGreedy } = PacktDataStructuresAlgorithms;

const values = [3,4,5];
const weights = [2,3,4];
const capacity = 5;

console.log(knapSackGreedy(capacity, weights, values));
