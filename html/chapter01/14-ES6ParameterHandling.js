//******* EcmaScript 6: Default Parameter Values
function sum (x = 1, y = 2, z = 3) {
    return x + y + z
};
console.log(sum(4,2)); //outpus 9

//function above is the same as
function sum2 (x, y, z) {
    if (x === undefined)
        x = 1;
    if (y === undefined)
        y = 2;
    if (z === undefined)
        z = 3;
    return x + y + z;
};
console.log(sum2(4,2)); //outpus 10

//******* EcmaScript 6: spread operator ('...')
var params = [3, 4, 5];
console.log(sum(...params));

var numbers = [1, 2, ...params]; //pushing values into array
console.log(numbers);

//******* EcmaScript 6: rest parameter ('...')
function restParamaterFunction (x, y, ...a) {
    return (x + y) * a.length;
}
console.log(restParamaterFunction(1, 2, "hello", true, 7)); // outputs 9;

//code above is the same as ES5:
function restParamaterFunction2 (x, y) {
    var a = Array.prototype.slice.call(arguments, 2);
    return (x + y) * a.length;
};
console.log(restParamaterFunction2(1, 2, "hello", true, 7));
