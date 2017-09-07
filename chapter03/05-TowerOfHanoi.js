function towerOfHanoi(n, from, to, helper){

    if (n > 0){
        towerOfHanoi(n-1, from, helper, to);
        to.push(from.pop());
        console.log('-----');
        console.log('Source: ' + from.toString());
        console.log('Dest: ' + to.toString());
        console.log('Helper: ' + helper.toString());
        towerOfHanoi(n-1, helper, to, from);
    }
}

var source = new Stack();
source.push(3);
source.push(2);
source.push(1);

var dest = new Stack();
var helper = new Stack();

towerOfHanoi(source.size(), source, dest, helper);

source.print();
helper.print();
dest.print();