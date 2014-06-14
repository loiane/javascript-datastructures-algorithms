//*** contact
var zero = 0;
var positiveNumbers = [1,2,3];
var negativeNumbers = [-3,-2,-1];
var numbers = negativeNumbers.concat(zero, positiveNumbers);

//document.writeln(numbers);

//*** every and some
var isEven = function (x) {
    // returns true if x is a multiple of 2.
    console.log(x);
    return (x % 2 == 0) ? true : false;
};
var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

numbers.every(isEven); //is going to execute the function only once

console.log('---');

numbers.some(isEven); //is going to execute the function twice

numbers.forEach(function(x){
    console.log((x % 2 == 0));
});

document.writeln(numbers.reverse());

//document.writeln('*** filter ***');

var evenNumbers = numbers.filter(isEven);

//document.writeln(evenNumbers);

document.writeln('*** map ***');

//document.writeln(numbers.map(isEven));

document.writeln(numbers.sort());

document.writeln(numbers.sort(function(a,b){
    return a-b;
}));

//*** toString
console.log(numbers.toString());

console.log(numbers.indexOf(10));
console.log(numbers.indexOf(100));

numbers.push(10);
console.log(numbers.lastIndexOf(10));
console.log(numbers.lastIndexOf(100));

var numbersString = numbers.join('-');
console.log(numbersString);