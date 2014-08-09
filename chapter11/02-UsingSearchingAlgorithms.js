function createNonSortedArray(items){
    var array = new ArrayList();

    for (var i = items; i> 0; i--){
        array.insert(i);
    }

    return array;
}

var array = createNonSortedArray(5);

console.log('********** Sequential Sort #3 **********');

console.log(array.sequentialSearch(3));

console.log('********** Min **********');

console.log(array.findMinValue());

console.log('********** Max **********');

console.log(array.findMaxValue());

console.log('********** Binary Search #3 **********');

console.log(array.binarySearch(3));

console.log('********** Binary Search #2 **********');

var array = createNonSortedArray(8);

console.log(array.binarySearch(2));