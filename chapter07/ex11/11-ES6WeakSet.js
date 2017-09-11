var set = new WeakSet();

var ob1 = {name:'Gandalf'},
    ob2 = {name:'John'},
    ob3 = {name:'Tyrion'};

set.add(ob1);
set.add(ob2);
set.add(ob3);

console.log(set.has(ob1));   //outputs true
console.log(set.has(ob2));   //outputs true
console.log(set.has(ob3));   //outputs true

set.delete(ob2);
console.log(set.has(ob2));   //outputs false
