export function knapSack(capacity: number, weights: number[], values: number[]) {
  const n = values.length;
  let load = 0;
  let val = 0;

  for (let i = 0; i < n && load < capacity; i++) {
    if (weights[i] <= capacity - load) {
      val += values[i];
      load += weights[i];
      // console.log('using item ' + (i + 1) + ' for the solution');
    } else {
      const r = (capacity - load) / weights[i];
      val += r * values[i];
      load += weights[i];
      // console.log('using ratio of ' + r + ' for item ' + (i + 1) + ' for the solution');
    }
  }
  return val;
}
