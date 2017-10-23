//Recursive solution - DP
function fibonacci(num){
    if (num === 1 || num === 2){
        return 1;
    }
    if (num > 2){
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
}

//Non Recursive solution
function fib(num){
    var n1 = 1,
        n2 = 1,
        n = 1;
    for (var i = 3; i<=num; i++){
        n = n1 + n2;
        n1 = n2;
        n2 = n;
    }
    return n;
}

console.log(fibonacci(6));
console.log(fib(6));