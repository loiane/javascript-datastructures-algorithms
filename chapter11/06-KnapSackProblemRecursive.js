function knapSack(capacity, weights, values, n) {

    if (n == 0 || capacity == 0){
        return 0;
    }

    if (weights[n-1] > capacity){
        return knapSack(capacity, weights, values, n-1);

    } else {
        var a = values[n-1] + knapSack(capacity-weights[n-1], weights, values, n-1),
            b = knapSack(capacity, weights, values, n-1);
        return (a > b) ? a : b;
    }
}

var values = [3,4,5],
    weights = [2,3,4],
    capacity = 5,
    n = values.length;

console.log(knapSack(capacity, weights, values, n));