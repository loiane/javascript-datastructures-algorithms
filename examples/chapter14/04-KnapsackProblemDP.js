const { knapSack } = PacktDataStructuresAlgorithms;

const values = [3,4,5];
const weights = [2,3,4];
const capacity = 5;
const n = values.length;

console.log(knapSack(capacity, weights, values, n));
