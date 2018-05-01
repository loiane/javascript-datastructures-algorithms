console.log('Using imperative JS');

var printArray = function(array){
    for (var i=0; i<array.length; i++){
        console.log(array[i]);
    }
};

printArray([1, 2, 3, 4, 5]);

//how can we abstract the For flow? Can we use a callback for action?

console.log('Using functional JS');

var forEach = function(array, action){
    for (var i=0; i<array.length; i++){
        action(array[i]);
    }
};

var logItem = function (item) {
    console.log(item);
};

forEach([1, 2, 3, 4, 5], logItem);

//how can we abstract the For flow?
console.log('Finding the min value in an array - imperative');

var findMinArray = function(array){
    var minValue = array[0];
    for (var i=1; i<array.length; i++){
        if (minValue > array[i]){
            minValue = array[i];
        }
    }

    return minValue;
};

console.log(findMinArray([8,6,4,5,9]));

console.log('Finding the min value in an array - functional ES2015');
const min_ = function(array){
    return Math.min(...array)
};

//simplifying using arrow functions
const min = arr => Math.min(...arr);

console.log(min_([8,6,4,5,9]));
console.log(min([8,6,4,5,9]));

//concat + reduce
console.log('merge arrays - imperative');

var mergeArrays_ = function(arrays){
    var count = arrays.length,
        newArray = [],
        k =0;
    for (var i=0; i<count; i++){
        for (var j=0; j<arrays[i].length; j++){
            newArray[k++] = arrays[i][j];
        }
    }
    return newArray;
};

console.log(mergeArrays_([[1, 2, 3], [4, 5], [6]]));

console.log('merge arrays - using concat');
var mergeArraysConcat = function(arrays){
    return arrays.reduce( function(p,n){
        return p.concat(n);
    });
};

console.log(mergeArraysConcat([[1, 2, 3], [4, 5], [6]]));

console.log('merge arrays - ES2015');

const mergeArrays = (...arrays) => [].concat(...arrays);
console.log(mergeArrays([1, 2, 3], [4, 5], [6]));

console.log('sum values of arrays - imperative');
var sumValues = function(array){
    var total = array[0];
    for (var i=1; i<array.length; i++){
        total += array[i];
    }
    return total;
};

console.log(sumValues([1, 2, 3, 4, 5]));

//reduce
console.log('sum values of arrays - functional');
var sum_ = function(array){
    return array.reduce(function(a, b){
        return a + b;
    })
};

console.log(sum_([1, 2, 3, 4, 5]));

console.log('sum values of arrays - ES2015');
const sum = arr => arr.reduce((a, b) => a + b);

console.log(sum([1, 2, 3, 4, 5]));

//map
var daysOfWeek = [
    {name: 'Monday', value: 1},
    {name: 'Tuesday', value: 2},
    {name: 'Wednesday', value: 7}
];

var daysOfWeekValues_ = [];
for (var i = 0; i < daysOfWeek.length; i++) {
    daysOfWeekValues_.push(daysOfWeek[i].value);
}

//to
var daysOfWeekValues = daysOfWeek.map(function(day) {
    return day.value;
});
console.log(daysOfWeekValues);


//filter
var positiveNumbers_ = function(array){
    var positive = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] >= 0){
            positive.push(array[i]);
        }
    }
    return positive;
}
console.log(positiveNumbers_([-1,1,2,-2]));

var positiveNumbers = function(array){
    return array.filter(function(num){
        return num >= 0;
    })
};
console.log(positiveNumbers([-1,1,2,-2]));
