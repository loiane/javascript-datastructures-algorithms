function knapSack(capacity, weights, values, n) {

    var i, w, a, b, kS = [];

    for (i = 0; i <= n; i++) {
        kS[i] = [];
    }

    for (i = 0; i <= n; i++){
        for (w = 0; w <= capacity; w++){
            if (i == 0 || w == 0){
                kS[i][w] = 0;

            } else if (weights[i-1] <= w){
                a = values[i-1] + kS[i-1][w-weights[i-1]];
                b = kS[i-1][w];
                kS[i][w] = (a > b) ? a : b; //max(a,b)
                console.log(a + ' can be part of the solution');
            } else{
                kS[i][w] = kS[i-1][w];
            }
        }
        console.log(kS[i].join());
    }

    //extra algorithm to find the items that are part of the solution
    findValues(n, capacity, kS, values, weights);

    return kS[n][capacity];
}

function findValues(n, capacity, kS, weights, values){
    var i=n, k=capacity;

    console.log('Items that are part of the solution:');

    while (i>0 && k>0){
        if (kS[i][k] !== kS[i-1][k]){
            console.log('item '+i+' can be part of solution w,v: ' + weights[i-1] + ',' + values[i-1]);
            i--;
            k = k - kS[i][k];
        } else {
            i--;
        }
    }
}

var values = [3,4,5],
    weights = [2,3,4],
    capacity = 5,
    n = values.length;

console.log('Total value that can be carried: ' + knapSack(capacity, weights, values, n));