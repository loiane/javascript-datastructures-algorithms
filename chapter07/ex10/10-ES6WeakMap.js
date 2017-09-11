var map = new WeakMap();

var ob1 = {name:'Gandalf'},
    ob2 = {name:'John'},
    ob3 = {name:'Tyrion'};

map.set(ob1, 'gandalf@email.com');
map.set(ob2, 'johnsnow@email.com');
map.set(ob3, 'tyrion@email.com');

console.log(map.has(ob1));   //outputs true
console.log(map.has(ob2));   //outputs true
console.log(map.has(ob3));   //outputs true

console.log(map.get(ob3)); //outputs tyrion@email.com

map.delete(ob2);
console.log(map.has(ob2));   //outputs false
