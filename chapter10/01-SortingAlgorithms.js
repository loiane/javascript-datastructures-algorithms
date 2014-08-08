function ArrayList(){

    var array = [];

    this.insert = function(item){
        array.push(item);
    };

    var swap = function(index1, index2){
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    };

    this.toString= function(){
        var s = array[0] ? array[0] : '';
        for (var i=1; i<array.length; i++){
            s += ', ' + array[i];
        }
        return s;
    };

    this.bubbleSort = function(){
        var length = array.length;

        for (var i=0; i<length; i++){
            for (var j=0; j<length-1; j++ ){
                if (array[j] > array[j+1]){
                    swap(j, j+1);
                }
            }
        }
    };

    this.modifiedBubbleSort = function(){
        var length = array.length,
            swapped;

        do {
            swapped = false;
            for (var i=0; i<length-1; i++){
                if (array[i] > array[i+1]){
                    swap(i, i+1);
                    swapped = true;
                }
            }
        } while (swapped);

    };

    this.selectionSort = function(){
        var length = array.length,
            indexMin;

        for (var i=0; i<length; i++){
            indexMin = i;
            for (var j=i; j<length; j++){
                if(array[indexMin]>array[j]){
                    indexMin = j;
                }
            }
            swap(i, indexMin);
        }
    };

    this.insertionSort = function(){
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
}