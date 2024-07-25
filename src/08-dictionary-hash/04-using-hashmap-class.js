// src/08-dictionary-hash/04-using-hashmap-class.js

const HashTable = require('./hash-table');

const addressBook = new HashTable();

// Add contacts
addressBook.put('Gandalf', 'gandalf@email.com'); 
addressBook.put('John', 'johnsnow@email.com'); 
addressBook.put('Tyrion', 'tyrion@email.com');

// Retrieve the hash code of a contact
console.log(addressBook.hash('Gandalf')); // 19
console.log(addressBook.hash('John')); // 29
console.log(addressBook.hash('Tyrion')); // 16

// Retrieve contacts
console.log(addressBook.get('Gandalf')); // gandalf@email.com
console.log(addressBook.get('Loiane')); // undefined

// Remove contacts
console.log(addressBook.remove('Gandalf')); // true
console.log(addressBook.get('Gandalf')); // undefined


// to see the output of this file use the command: node src/08-dictionary-hash/04-using-hashmap-class.js