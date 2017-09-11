//233 == 11101001
//2x(10x10) + 3x(10) + 3x(1)

function divideBy2(decNumber){

    var remStack = new Stack(),
        rem,
        binaryString = '';

    while (decNumber > 0){
        rem = Math.floor(decNumber % 2);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
    }

    while (!remStack.isEmpty()){
        binaryString += remStack.pop().toString();
    }

    return binaryString;
}

console.log(divideBy2(233));
console.log(divideBy2(10));
console.log(divideBy2(1000));

/*
    The folow algorithm converts from base 10 to any base
 */
function baseConverter(decNumber, base){

    var remStack = new Stack(),
        rem,
        baseString = '',
        digits = '0123456789ABCDEF';

    while (decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }

    return baseString;
}

console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));