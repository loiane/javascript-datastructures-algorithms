function createNonSortedArray(){
    var array = new ArrayList();

    for (var i = 5; i> 0; i--){
        array.insert(i);
    }

    return array;
}

console.log('********** Bubble Sort **********');

var array = createNonSortedArray();

console.log(array.toString());

array.bubbleSort();

console.log(array.toString());

console.log('********** Modified Bubble Sort **********');

array = createNonSortedArray();

console.log(array.toString());

array.modifiedBubbleSort();

console.log(array.toString());

console.log('********** Selection Sort **********');

array = createNonSortedArray();

console.log(array.toString());

array.selectionSort();

console.log(array.toString());

console.log('********** Insertion Sort **********');

array = createNonSortedArray();

console.log(array.toString());

array.insertionSort();

console.log(array.toString());

console.log('********** Merge Sort **********');

array = createNonSortedArray();

console.log(array.toString());

array.mergeSort();

console.log(array.toString());

console.log('********** Quick Sort **********');

array = createNonSortedArray();

console.log(array.toString());

array.quickSort();

console.log(array.toString());


