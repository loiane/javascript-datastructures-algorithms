function ArrayList(){

    var array = [];

    this.insert = function(item){
        array.push(item);
    };

    var swap = function(array, index1, index2){
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
        //ES2015 swap - Firefox only, for other browser, uncomment code above and coment line below
        //[array[index1], array[index2]] = [array[index2], array[index1]];
    };

    this.toString= function(){
        return array.join();
    };

    this.array= function(){
        return array;
    };

    this.bubbleSort = function(){
        var length = array.length;

        for (var i=0; i<length; i++){
            console.log('--- ');
            for (var j=0; j<length-1; j++ ){
                console.log('compare ' + array[j] + ' with ' + array[j+1]);
                if (array[j] > array[j+1]){
                    console.log('swap ' + array[j] + ' with ' + array[j+1]);
                    swap(array, j, j+1);
                }
            }
        }
    };

    this.modifiedBubbleSort = function(){
        var length = array.length;

        for (var i=0; i<length; i++){
            console.log('--- ');
            for (var j=0; j<length-1-i; j++ ){
                console.log('compare ' + array[j] + ' with ' + array[j+1]);
                if (array[j] > array[j+1]){
                    console.log('swap ' + array[j] + ' with ' + array[j+1]);
                    swap(j, j+1);
                }
            }
        }

    };

    this.selectionSort = function(){
        var length = array.length,
            indexMin;

        for (var i=0; i<length-1; i++){
            indexMin = i;
            console.log('index ' + array[i]);
            for (var j=i; j<length; j++){
                if(array[indexMin]>array[j]){
                    console.log('new index min ' + array[j]);
                    indexMin = j;
                }
            }
            if (i !== indexMin){
                console.log('swap ' + array[i] + ' with ' + array[indexMin]);
                swap(i, indexMin);
            }
        }
    };

    this.insertionSort = function(){
        var length = array.length,
            j, temp;
        for (var i=1; i<length; i++){
            j = i;
            temp = array[i];
            console.log('to be inserted ' + temp);
            while (j>0 && array[j-1] > temp){
                console.log('shift ' + array[j-1]);
                array[j] = array[j-1];
                j--;
            }
            console.log('insert ' + temp);
            array[j] = temp;
        }
    };

    var insertionSort_ = function(array){
        var length = array.length,
            j, temp;
        for (var i=1; i<length; i++){
            j = i;
            temp = array[i];
            while (j>0 && array[j-1] > temp){
                array[j] = array[j-1];
                j--;
            }
            array[j] = temp;
        }
    };

    this.mergeSort = function(){
        array = mergeSortRec(array);
    };

    var mergeSortRec = function(array){

        var length = array.length;

        if(length === 1) {
            console.log(array);
            return array;
        }

        var mid = Math.floor(length / 2),
            left = array.slice(0, mid),
            right = array.slice(mid, length);

        return merge(mergeSortRec(left), mergeSortRec(right));
    };

    var merge = function(left, right){
        var result = [],
            il = 0,
            ir = 0;

        while(il < left.length && ir < right.length) {

            if(left[il] < right[ir]) {
                result.push(left[il++]);
            } else{
                result.push(right[ir++]);
            }
        }

        while (il < left.length){
            result.push(left[il++]);
        }

        while (ir < right.length){
            result.push(right[ir++]);
        }

        console.log(result);

        return result;
    };

    this.quickSort = function(){
        quick(array,  0, array.length - 1);
    };

    var partition = function(array, left, right) {

        var pivot = array[Math.floor((right + left) / 2)],
            i = left,
            j = right;

        console.log('pivot is ' + pivot + '; left is ' + left + '; right is ' + right);

        while (i <= j) {
            while (array[i] < pivot) {
                i++;
                console.log('i = ' + i);
            }

            while (array[j] > pivot) {
                j--;
                console.log('j = ' + j);
            }

            if (i <= j) {
                console.log('swap ' + array[i] + ' with ' + array[j]);
                swap(array, i, j);
                i++;
                j--;
            }
        }

        return i;
    };

    var quick = function(array, left, right){

        var index;

        if (array.length > 1) {

            index = partition(array, left, right);

            if (left < index - 1) {
                quick(array, left, index - 1);
            }

            if (index < right) {
                quick(array, index, right);
            }
        }
        return array;
    };

    this.heapSort = function(){
        var heapSize = array.length;

        buildHeap(array);

        while (heapSize > 1) {
            heapSize--;
            console.log('swap (' + + array[0] + ',' + array[heapSize] + ')');
            swap(array, 0, heapSize);
            console.log('heapify ' + array.join());
            heapify(array, heapSize, 0);
        }
    };

    var buildHeap = function(array){
        console.log('building heap');
        var heapSize = array.length;
        for (var i = Math.floor(array.length / 2); i >= 0; i--) {
            heapify(array, heapSize, i);
        }
        console.log('heap created: ' + array.join());
    };

    var heapify = function(array, heapSize, i){
        var left = i * 2 + 1,
            right = i * 2 + 2,
            largest = i;

        if (left < heapSize && array[left] > array[largest]) {
            largest = left;
        }

        if (right < heapSize && array[right] > array[largest]) {
            largest = right;
        }

        console.log('Heapify Index = '+ i + ' and Heap Size = ' + heapSize);

        if (largest !== i) {
            console.log('swap index ' + i + ' with ' + largest + ' (' + + array[i] + ',' + array[largest] + ')');
            swap(array, i, largest);
            console.log('heapify ' + array.join());
            heapify(array, heapSize, largest);
        }
    };

    this.countingSort = function(){

        var i,
            maxValue = this.findMaxValue(),
            sortedIndex = 0,
            counts = new Array(maxValue + 1);

        for (i = 0; i < array.length; i++) {
            if (!counts[array[i]]) {
                counts[array[i]] = 0;
            }
            counts[array[i]]++;
        }

        console.log('Frequencies: ' + counts.join());

        for (i = 0; i < counts.length; i++) {
            while (counts[i] > 0) {
                array[sortedIndex++] = i;
                counts[i]--;
            }
        }
    };

    this.bucketSort = function(bucketSize){

        var i,
            minValue = this.findMinValue(),
            maxValue = this.findMaxValue(),
            BUCKET_SIZE = 5;

        console.log('minValue ' + minValue);
        console.log('maxValue ' + maxValue);

        bucketSize = bucketSize || BUCKET_SIZE;
        var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
        var buckets = new Array(bucketCount);
        console.log('bucketSize = ' + bucketCount);
        for (i = 0; i < buckets.length; i++) {
            buckets[i] = [];
        }

        for (i = 0; i < array.length; i++) {
            buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
            console.log('pushing item ' + array[i] + ' to bucket index ' + Math.floor((array[i] - minValue) / bucketSize));
        }

        array = [];
        for (i = 0; i < buckets.length; i++) {
            insertionSort_(buckets[i]);

            console.log('bucket sorted ' + i + ': ' + buckets[i].join());

            for (var j = 0; j < buckets[i].length; j++) {
                array.push(buckets[i][j]);
            }
        }
    };

    this.radixSort = function(radixBase){

        var i,
            minValue = this.findMinValue(),
            maxValue = this.findMaxValue(),
            radixBase = radixBase || 10;

        // Perform counting sort for each significant digit), starting at 1
        var significantDigit = 1;
        while (((maxValue - minValue) / significantDigit) >= 1) {
            console.log('radix sort for digit ' + significantDigit);
            array = countingSortForRadix(array, radixBase, significantDigit, minValue);
            console.log(array.join());
            significantDigit *= radixBase;
        }
    };

    var countingSortForRadix = function(array, radixBase, significantDigit, minValue){
        var i, countsIndex,
            counts = new Array(radixBase),
            aux = new Array(radixBase);

        for (i = 0; i < radixBase; i++) {
            counts[i] = 0;
        }

        for (i = 0; i < array.length; i++) {
            countsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
            counts[countsIndex]++;
        }

        for (i = 1; i < radixBase; i++) {
            counts[i] += counts[i - 1];
        }

        for (i = array.length - 1; i >= 0; i--) {
            countsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
            aux[--counts[countsIndex]] = array[i];
        }

        for (i = 0; i < array.length; i++) {
            array[i] = aux[i];
        }

        return array;
    };

    this.sequentialSearch = function(item){

        for (var i=0; i<array.length; i++){
            if (item === array[i]){
                return i;
            }
        }

        return -1;
    };

    this.findMaxValue = function(){
        var max = array[0];
        for (var i=1; i<array.length; i++){
            if (max < array[i]){
                max = array[i];
            }
        }

        return max;
    };

    this.findMinValue = function(){
        var min = array[0];
        for (var i=1; i<array.length; i++){
            if (min > array[i]){
                min = array[i];
            }
        }

        return min;
    };

    this.binarySearch = function(item){
        this.quickSort();

        var low = 0,
            high = array.length - 1,
            mid, element;

        while (low <= high){
            mid = Math.floor((low + high) / 2);
            element = array[mid];
            console.log('mid element is ' + element);
            if (element < item) {
                low = mid + 1;
                console.log('low is ' + low);
            } else if (element > item) {
                high = mid - 1;
                console.log('high is ' + high);
            } else {
                console.log('found it');
                return mid;
            }
        }
        return -1;
    };

}