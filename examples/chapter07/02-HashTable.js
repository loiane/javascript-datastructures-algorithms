const { HashTable } = PacktDataStructuresAlgorithms;

const hash = new HashTable();

hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');

console.log('**** Printing Hash **** ');

console.log(hash.toString());
// {5 => [#Sue: sue@email.com]},{10 => [#Nathan: nathan@email.com]},{13 => [#Ana: ana@email.com]},{16 => [#Aaron: aaron@email.com]},{19 => [#Gandalf: gandalf@email.com]},{29 => [#John: johnsnow@email.com]},{32 => [#Paul: paul@email.com]}

console.log('**** Get **** ');

console.log(hash.get('Gandalf')); // gandalf@email.com
console.log(hash.get('Loiane')); // undefined

console.log('**** Remove **** ');

hash.remove('Gandalf');
console.log(hash.get('Gandalf')); // undefined

console.log(hash.toString());
// {5 => [#Sue: sue@email.com]},{10 => [#Nathan: nathan@email.com]},{13 => [#Ana: ana@email.com]},{16 => [#Aaron: aaron@email.com]},{29 => [#John: johnsnow@email.com]},{32 => [#Paul: paul@email.com]}
