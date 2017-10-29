const { HashTableSeparateChaining } = PacktDataStructuresAlgorithms;

const hashTable = new HashTableSeparateChaining();

hashTable.put('Gandalf', 'gandalf@email.com');
hashTable.put('John', 'johnsnow@email.com');
hashTable.put('Tyrion', 'tyrion@email.com');
hashTable.put('Aaron', 'aaron@email.com');
hashTable.put('Donnie', 'donnie@email.com');
hashTable.put('Ana', 'ana@email.com');
hashTable.put('Jonathan', 'jonathan@email.com');
hashTable.put('Jamie', 'jamie@email.com');
hashTable.put('Sue', 'sue@email.com');
hashTable.put('Mindy', 'mindy@email.com');
hashTable.put('Paul', 'paul@email.com');
hashTable.put('Nathan', 'nathan@email.com');

console.log('**** Printing Hash **** ');

console.log(hashTable.toString());
// {5 => [#Jonathan: jonathan@email.com],[#Jamie: jamie@email.com],[#Sue: sue@email.com]},{10 => [#Nathan: nathan@email.com]},{13 => [#Donnie: donnie@email.com],[#Ana: ana@email.com]},{16 => [#Tyrion: tyrion@email.com],[#Aaron: aaron@email.com]},{19 => [#Gandalf: gandalf@email.com]},{29 => [#John: johnsnow@email.com]},{32 => [#Mindy: mindy@email.com],[#Paul: paul@email.com]}

console.log('**** Get **** ');

console.log(hashTable.get('Jamie')); // jamie@email.com
console.log(hashTable.get('Sue')); // sue@email.com
console.log(hashTable.get('Jonathan')); // jonathan@email.com
console.log(hashTable.get('Loiane')); // undefined

console.log('**** Remove **** ');

console.log(hashTable.remove('Gandalf')); // true
console.log(hashTable.get('Gandalf')); // undefined
console.log(hashTable.toString());
// {5 => [#Jonathan: jonathan@email.com],[#Jamie: jamie@email.com],[#Sue: sue@email.com]},{10 => [#Nathan: nathan@email.com]},{13 => [#Donnie: donnie@email.com],[#Ana: ana@email.com]},{16 => [#Tyrion: tyrion@email.com],[#Aaron: aaron@email.com]},{29 => [#John: johnsnow@email.com]},{32 => [#Mindy: mindy@email.com],[#Paul: paul@email.com]}

console.log(hashTable.remove('Sue')); // true
console.log(hashTable.toString());
// {5 => [#Jonathan: jonathan@email.com],[#Jamie: jamie@email.com]},{10 => [#Nathan: nathan@email.com]},{13 => [#Donnie: donnie@email.com],[#Ana: ana@email.com]},{16 => [#Tyrion: tyrion@email.com],[#Aaron: aaron@email.com]},{29 => [#John: johnsnow@email.com]},{32 => [#Mindy: mindy@email.com],[#Paul: paul@email.com]}

console.log(hashTable.remove('Jamie')); // true
console.log(hashTable.toString());
// {5 => [#Jonathan: jonathan@email.com]},{10 => [#Nathan: nathan@email.com]},{13 => [#Donnie: donnie@email.com],[#Ana: ana@email.com]},{16 => [#Tyrion: tyrion@email.com],[#Aaron: aaron@email.com]},{29 => [#John: johnsnow@email.com]},{32 => [#Mindy: mindy@email.com],[#Paul: paul@email.com]}

console.log(hashTable.remove('Donnie')); // true
console.log(hashTable.toString());
// {5 => [#Jonathan: jonathan@email.com]},{10 => [#Nathan: nathan@email.com]},{13 => [#Ana: ana@email.com]},{16 => [#Tyrion: tyrion@email.com],[#Aaron: aaron@email.com]},{29 => [#John: johnsnow@email.com]},{32 => [#Mindy: mindy@email.com],[#Paul: paul@email.com]}
