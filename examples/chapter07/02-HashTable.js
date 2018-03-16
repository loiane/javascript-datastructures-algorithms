const { HashTable } = PacktDataStructuresAlgorithms;

const hash = new HashTable();

console.log(hash.hashCode('Gandalf') + ' - Gandalf');
console.log(hash.hashCode('John') + ' - John');
console.log(hash.hashCode('Tyrion') + ' - Tyrion');

console.log(' ');

console.log(hash.hashCode('Ygritte') + ' - Ygritte');
console.log(hash.hashCode('Jonathan') + ' - Jonathan');
console.log(hash.hashCode('Jamie') + ' - Jamie');
console.log(hash.hashCode('Jack') + ' - Jack');
console.log(hash.hashCode('Jasmine') + ' - Jasmine');
console.log(hash.hashCode('Jake') + ' - Jake');
console.log(hash.hashCode('Nathan') + ' - Nathan');
console.log(hash.hashCode('Athelstan') + ' - Athelstan');
console.log(hash.hashCode('Sue') + ' - Sue');
console.log(hash.hashCode('Aethelwulf') + ' - Aethelwulf');
console.log(hash.hashCode('Sargeras') + ' - Sargeras');

hash.put('Ygritte', 'ygritte@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Jack', 'jack@email.com');
hash.put('Jasmine', 'jasmine@email.com');
hash.put('Jake', 'jake@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.put('Athelstan', 'athelstan@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Aethelwulf', 'aethelwulf@email.com');
hash.put('Sargeras', 'sargeras@email.com');

console.log('**** Printing Hash **** ');

console.log(hash.toString());
// {4 => [#Ygritte: ygritte@email.com]},{5 => [#Aethelwulf: aethelwulf@email.com]},{7 => [#Athelstan: athelstan@email.com]},{8 => [#Jasmine: jasmine@email.com]},{9 => [#Jake: jake@email.com]},{10 => [#Sargeras: sargeras@email.com]}

console.log('**** Get **** ');

console.log(hash.get('Ygritte')); // ygritte@email.com
console.log(hash.get('Loiane')); // jasmine@email.com

console.log('**** Remove **** ');

hash.remove('Ygritte');
console.log(hash.get('Ygritte')); // undefined

console.log(hash.toString());
// {5 => [#Aethelwulf: aethelwulf@email.com]},{7 => [#Athelstan: athelstan@email.com]},{8 => [#Jasmine: jasmine@email.com]},{9 => [#Jake: jake@email.com]},{10 => [#Sargeras: sargeras@email.com]}
