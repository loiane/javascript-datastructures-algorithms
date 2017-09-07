function lcs(wordwordX, wordwordY, m, n) {
    
    if (m == 0 || n == 0){
        return 0;
    }

    if (wordwordX[m-1] == wordY[n-1]){
        return 1 + lcs(wordX, wordY, m-1, n-1);
    } else {
        var a = lcs(wordX, wordY, m, n-1),
            b = lcs(wordX, wordY, m-1, n);
        return (a > b) ? a : b;
    }
}

var wordX = 'acbaed',
    wordY = 'abcadf';

console.log(lcs(wordX, wordY, wordX.length, wordY.length));