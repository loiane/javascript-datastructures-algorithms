function knapSack(capacity, values, weights) {
    var n = values.length,
        load = 0,
        i = 0,
        val = 0;

    for (i=0; i<n && load < capacity; i++) {

        if (weights[i] <= (capacity-load)) {
            val += values[i];
            load += weights[i];
            console.log('using item ' + (i+1) + ' for the solution');

        } else {
            var r = (capacity-load)/weights[i];
            val += r * values[i];
            load += weights[i];
            console.log('using ratio of ' + r + ' for item ' + (i+1) + ' for the solution');
        }
    }
    return val;
}

var values = [3,4,5],
    weights = [2,3,4],
    capacity = 6,
    n = values.length;
console.log(knapSack(capacity, values, weights));