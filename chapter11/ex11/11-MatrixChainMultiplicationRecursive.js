function matrixChainOrder(p, i, j){

    if(i == j) {
        return 0;
    }

    var k, count,
       min = Number.MAX_SAFE_INTEGER;

    for (k = i; k <j; k++) {
        count = matrixChainOrder(p, i, k) +
            matrixChainOrder(p, k+1, j) +
            p[i-1]*p[k]*p[j];

        if (count < min){
            min = count;
        }
    }

    return min;
}

var p = [10, 100, 5, 50, 1],
    n = p.length;

console.log(matrixChainOrder(p, 1, n-1));