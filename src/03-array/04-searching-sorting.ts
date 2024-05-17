// Path: src/03-array/04-searching-sorting.ts

// @ts-ignore
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// using indexOf method
console.log('Index of 5:', numbers.indexOf(5)); // 4
console.log('Index of 11:', numbers.indexOf(11)); // -1

// using lastIndexOf method
console.log('Last index of 5:', numbers.lastIndexOf(5)); // 4
console.log('Last index of 11:', numbers.lastIndexOf(11)); // -1

// using includes method
console.log('Is 5 included?:', numbers.includes(5)); // true
console.log('Is 11 included?:', numbers.includes(11)); // false

// using find, findIndex and findLastIndex methods
const firstValueBelowSeven = numbers.find(value => value < 7);
console.log('First value below 7:', firstValueBelowSeven); // 1
console.log('Index of first value below 7:', numbers.findIndex(value => value < 7)); // 0
console.log('Index of last value below 7:', numbers.findLastIndex(value => value < 7)); // 5

const books = [
    { id: 1, title: 'The Fellowship of the Ring' },
    { id: 2, title: 'Fourth Wing' },
    { id: 3, title: 'A Court of Thorns and Roses' }
];
console.log('Book with id 2:', books.find(book => book.id === 2)); // { id: 2, title: 'Fourth Wing' }
console.log('The Hobbit:', books.find(book => book.title === 'The Hobbit')); // undefined

// remove book with id 3
const bookIndex = books.findIndex(book => book.id === 3);
if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
}

// using the filter method in the numbers array
// @ts-ignore
const valuesBelowSeven = numbers.filter(value => value < 7);
console.log('Values below 7:', valuesBelowSeven); // [1, 2, 3, 4, 5, 6]

// reverse the array
numbers.reverse(); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log('Reversed numbers:', numbers);

// sort the array
numbers.sort(); // [1, 10, 2, 3, 4, 5, 6, 7, 8, 9]

numbers.sort((a, b) => a - b); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// @ts-ignore
function compareNumbers(a, b) { 
    if (a < b) { 
      return -1; 
    } 
    if (a > b) { 
      return 1; 
    } 
    // a must be equal to b 
    return 0; 
  } 
  numbers.sort(compareNumbers); 

console.log('Sorted numbers:', numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// custom sorting
// @ts-ignore
const friends = [ 
  { name: 'Frodo', age: 30 }, 
  { name: 'Violet', age: 18 }, 
  { name: 'Aelin', age: 20 } 
]; 
// @ts-ignore
const compareFriends = (friendA, friendB) => friendA.age - friendB.age;
friends.sort(compareFriends);
console.log('Sorted friends:', friends); // [ { name: 'Violet', age: 18 }, { name: 'Aelin', age: 20 }, { name: 'Frodo', age: 30 } ]

// sorting strings
// @ts-ignore
let names = ['Ana', 'ana', 'john', 'John']; 
console.log(names.sort());  // ['Ana', 'John', 'ana', 'john']

names = ['Ana', 'ana', 'john', 'John']; // reset the array to its original state
names.sort((a, b) =>  {
  const nameA = a.toLowerCase(); 
  const nameB = b.toLowerCase(); 
  if (nameA < nameB) { 
    return -1; 
  } 
  if (nameA > nameB) { 
    return 1; 
  } 
  return 0; 
});
console.log(names); // ['Ana', 'ana', 'John', 'john']

names.sort((a, b) => a.localeCompare(b)); 
console.log(names); // ['ana', 'Ana', 'john', 'John']

const names2 = ['Maève', 'Maeve']; 
console.log(names2.sort((a, b) => a.localeCompare(b))); // ['Maeve', 'Maève']


// to see the output of this file use the command: node src/03-array/04-searching-sorting.ts