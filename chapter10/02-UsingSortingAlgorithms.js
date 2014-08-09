function createNonSortedArray(size){
    var array = new ArrayList();

    for (var i = size; i> 0; i--){
        array.insert(i);
    }

    return array;
}

function createRandomNonSortedArray(){
    var array = new ArrayList();

    array.insert(3);
    array.insert(5);
    array.insert(1);
    array.insert(4);
    array.insert(2);

    return array;
}

console.log('********** Bubble Sort **********');

var array = createNonSortedArray(5);

console.log(array.toString());

array.bubbleSort();

console.log(array.toString());

console.log('********** Modified Bubble Sort **********');

array = createNonSortedArray(5);

console.log(array.toString());

array.modifiedBubbleSort();

console.log(array.toString());

console.log('********** Selection Sort **********');

array = createNonSortedArray(5);

console.log(array.toString());

array.selectionSort();

console.log(array.toString());

console.log('********** Insertion Sort **********');

array = createRandomNonSortedArray();

console.log(array.toString());

array.insertionSort();

console.log(array.toString());

console.log('********** Merge Sort **********');

array = createNonSortedArray(8);

console.log(array.toString());

array.mergeSort();

console.log(array.toString());

console.log('********** Quick Sort **********');
array = new ArrayList();

array.insert(3);
array.insert(5);
array.insert(1);
array.insert(6);
array.insert(4);
array.insert(7);
array.insert(2);

console.log(array.toString());

array.quickSort();

console.log(array.toString());


