var dictionary = new Dictionary();

dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.has('Gandalf'));   //outputs true
console.log(dictionary.size());   //outputs 3

console.log(dictionary.keys()); //outputs ["Gandalf", "John", "Tyrion"]
console.log(dictionary.values()); //outputs ["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
console.log(dictionary.get('Tyrion')); //outputs tyrion@email.com

dictionary.delete('John');

console.log(dictionary.keys()); //outputs ["Gandalf", "Tyrion"]
console.log(dictionary.values()); //outputs ["gandalf@email.com", "tyrion@email.com"]

console.log(dictionary.getItems()); //Object {Gandalf: "gandalf@email.com", Tyrion: "tyrion@email.com"}
