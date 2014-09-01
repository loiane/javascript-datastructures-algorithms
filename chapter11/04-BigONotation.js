//*************** o(1)
function increment(num){
    console.log('cost for increment with input ' + num + ' is 1');
    return  ++num;
}

increment(1);
increment(2);

//*************** o(n)

function createNonSortedArray(size){
    var array = [];

    for (var i = size; i> 0; i--){
        array[i] = i;
    }

    return array;
}

function sequentialSearch(array, item){
    var cost = 0;
    for (var i=0; i<array.length; i++){
        cost++;
        if (item === array[i]){ //{1}
            return i;
        }
    }
    console.log('cost for sequentialSearch with input size ' + array.length + ' is ' + cost);
    return -1;
}

var array = createNonSortedArray(99);
sequentialSearch(array, -1);

//*************** o(nˆ2)

function swap(array, index1, index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
}

function bubbleSort(array){
    var length = array.length;
    var cost = 0;
    for (var i=0; i<length; i++){ //{1}
        cost++;
        for (var j=0; j<length-1; j++ ){ //{2}
            cost++;
            if (array[j] > array[j+1]){
                swap(array, j, j+1);
            }
        }
    }
    console.log('cost for bubbleSort with input size ' + length + ' is ' + cost);
}

var array1 = createNonSortedArray(99);
var array2 = createNonSortedArray(999);
var array3 = createNonSortedArray(9999);
bubbleSort(array1);
bubbleSort(array2);
bubbleSort(array3);