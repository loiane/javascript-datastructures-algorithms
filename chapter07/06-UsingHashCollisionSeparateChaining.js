var hashTableSeparateChaining = new HashTableSeparateChaining();

hashTableSeparateChaining.put('Gandalf', 'gandalf@email.com');
hashTableSeparateChaining.put('John', 'johnsnow@email.com');
hashTableSeparateChaining.put('Tyrion', 'tyrion@email.com');
hashTableSeparateChaining.put('Aaron', 'aaron@email.com');
hashTableSeparateChaining.put('Donnie', 'donnie@email.com');
hashTableSeparateChaining.put('Ana', 'ana@email.com');
hashTableSeparateChaining.put('Jonathan', 'jonathan@email.com');
hashTableSeparateChaining.put('Jamie', 'jamie@email.com');
hashTableSeparateChaining.put('Sue', 'sue@email.com');
hashTableSeparateChaining.put('Mindy', 'mindy@email.com');
hashTableSeparateChaining.put('Paul', 'paul@email.com');
hashTableSeparateChaining.put('Nathan', 'nathan@email.com');

console.log('**** Printing Hash **** ');

hashTableSeparateChaining.print();

console.log('**** Get **** ');

console.log(hashTableSeparateChaining.get('Jamie'));
console.log(hashTableSeparateChaining.get('Sue'));
console.log(hashTableSeparateChaining.get('Jonathan'));
console.log(hashTableSeparateChaining.get('Loiane'));

console.log('**** Remove **** ');

console.log(hashTableSeparateChaining.remove('Gandalf'));
console.log(hashTableSeparateChaining.get('Gandalf'));
hashTableSeparateChaining.print();

console.log(hashTableSeparateChaining.remove('Sue'));
hashTableSeparateChaining.print();

console.log(hashTableSeparateChaining.remove('Jamie'));
hashTableSeparateChaining.print();

console.log(hashTableSeparateChaining.remove('Donnie'));
hashTableSeparateChaining.print();