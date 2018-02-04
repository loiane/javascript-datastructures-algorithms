export function knapSack(capacity: number, weights: number[], values: number[], n: number) {
  const kS: Array<Array<number>> = [];

  for (let i = 0; i <= n; i++) {
    kS[i] = [];
  }

  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        kS[i][w] = 0;
      } else if (weights[i - 1] <= w) {
        const a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
        const b = kS[i - 1][w];
        kS[i][w] = a > b ? a : b; // max(a,b)
        // console.log(a + ' can be part of the solution');
      } else {
        kS[i][w] = kS[i - 1][w];
      }
    }
    // console.log(kS[i].join());
  }

  // extra algorithm to find the items that are part of the solution
  findValues(n, capacity, kS);

  return kS[n][capacity];
}

function findValues(
  n: number,
  capacity: number,
  kS: Array<Array<number>>
) {
  let i = n;
  let k = capacity;

  // console.log('Items that are part of the solution:');

  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      /* console.log(
        'item ' + i + ' can be part of solution w,v: ' + weights[i - 1] + ',' + values[i - 1]
      ); */
      i--;
      k = k - kS[i][k];
    } else {
      i--;
    }
  }
}
