// src/08-dictionary-hash/05-hashmap-collision.js

const HashTable = require('./hash-table');

const addressBook = new HashTable();

// Add contacts
addressBook.put('Ygritte', 'ygritte@email.com');
addressBook.put('Jonathan', 'jonathan@email.com');
addressBook.put('Jamie', 'jamie@email.com');
addressBook.put('Jack', 'jack@email.com');
addressBook.put('Jasmine', 'jasmine@email.com');
addressBook.put('Jake', 'jake@email.com');
addressBook.put('Nathan', 'nathan@email.com');
addressBook.put('Athelstan', 'athelstan@email.com');
addressBook.put('Sue', 'sue@email.com');
addressBook.put('Aethelwulf', 'aethelwulf@email.com');
addressBook.put('Sargeras', 'sargeras@email.com'); 

// Retrieve the hash code of a contact
console.log(addressBook.hash('Ygritte'), '- Ygritte'); // 4
console.log(addressBook.hash('Jonathan'), '- Jonathan'); // 5
console.log(addressBook.hash('Jamie'), '- Jamie'); // 5
console.log(addressBook.hash('Jack'), '- Jack'); // 7
console.log(addressBook.hash('Jasmine'), '- Jasmine'); // 8
console.log(addressBook.hash('Jake'), '- Jake'); // 9
console.log(addressBook.hash('Nathan'), '- Nathan'); // 10
console.log(addressBook.hash('Athelstan'), '- Athelstan'); // 7
console.log(addressBook.hash('Sue'), '- Sue'); // 5
console.log(addressBook.hash('Aethelwulf'), '- Aethelwulf'); // 5
console.log(addressBook.hash('Sargeras'), '- Sargeras'); // 10

console.log(addressBook.toString());
// {4 => ygritte@email.com}
// {5 => aethelwulf@email.com}
// {7 => athelstan@email.com}
// {8 => jasmine@email.com}
// {9 => jake@email.com}
// {10 => sargeras@email.com}


// to see the output of this file use the command: node src/08-dictionary-hash/05-hashmap-collision.js