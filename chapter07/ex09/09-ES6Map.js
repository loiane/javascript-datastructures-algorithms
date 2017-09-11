var map = new Map();

map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');

console.log(map.has('Gandalf'));   //outputs true
console.log(map.size);   //outputs 3

console.log(map.keys()); //outputs ["Gandalf", "John", "Tyrion"]
console.log(map.values()); //outputs ["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
console.log(map.get('Tyrion')); //outputs tyrion@email.com

map.delete('John');

console.log(map.keys()); //outputs ["Gandalf", "Tyrion"]
console.log(map.values()); //outputs ["gandalf@email.com", "tyrion@email.com"]