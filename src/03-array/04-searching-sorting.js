// Path: src/03-array/04-searching-sorting.js

// using indexOf method
const shoppingList = ['apples', 'bananas', 'milk', 'eggs', 'bread', 'milk'];

const itemToFind = 'milk';
const firstMilkIndex = shoppingList.indexOf(itemToFind);
if (firstMilkIndex !== -1) {
  const position = firstMilkIndex + 1;
  console.log(`Milk is already on the list at position ${position}`);
} else {
  console.log('Milk is not on the list yet.');
}
// Milk is already on the list at position 3

// using lastIndexOf method
const lastMilkIndex = shoppingList.lastIndexOf(itemToFind);
if (lastMilkIndex !== -1 && lastMilkIndex !== firstMilkIndex) { // Check if there's a second occurrence
  shoppingList.splice(lastMilkIndex, 1); // Remove the last occurrence
  console.log('Removed the duplicate "milk" from the list');
}
// Removed the duplicate "milk" from the list

// using includes method
const newItem = 'cheese';
if (shoppingList.includes(newItem)) {
  console.log('Cheese is already on the list!');
} else {
  shoppingList.push(newItem);
  console.log('Cheese added to the list!');
}
// Cheese added to the list!

// using find, findIndex and findLastIndex methods

// simple example
const availableToPurchase  = [1, 13, 14, 15, 16, 17, 18];
const desiredTicket = availableToPurchase .find(value => value < 7);
console.log('Desired ticket:', desiredTicket); // 1

// findIndex example - find the index and add it to the raflleTickets array
let raffleTickets = [ 2, 3, 4, 5, 6, 8, 9, 10, 11, 12 ];
const ticketIndex = availableToPurchase.findIndex(value => value < 7);
if (ticketIndex !== -1) {
  // Find the correct position to insert the ticket in raffleTickets (maintain numerical order)
  const pos = raffleTickets.findIndex(value => value > availableToPurchase[ticketIndex]);

  // If no suitable position is found (all existing tickets are smaller), add to the end
  const insertPos = (pos === -1) ? raffleTickets.length : pos;

  // Add the ticket to raffleTickets
  raffleTickets.splice(insertPos, 0, availableToPurchase[ticketIndex]);

  // Remove the ticket from availableToPurchase
  availableToPurchase.splice(ticketIndex, 1);
}

// books example
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
const ticketsAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const firstTicket = raffleTickets.find(ticketNumber => ticketNumber < 7);
console.log('First lucky ticket:', firstTicket); // 1

const allTickets = raffleTickets.filter(ticketNum => ticketNum < 7);
console.log('All lucky tickets:', allTickets); // [1, 2, 3, 4, 5, 6]


// reverse the array
raffleTickets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
raffleTickets.reverse(); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log('Reversed numbers:', raffleTickets);

// sort the array
raffleTickets.sort(); // [1, 10, 2, 3, 4, 5, 6, 7, 8, 9]

raffleTickets.sort((a, b) => a - b); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// @ts-ignore
function compareNumbers(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0; // a must be equal to b
}

raffleTickets.sort(compareNumbers);

console.log('Sorted numbers:', raffleTickets); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
let playerNames = ['Ana', 'ana', 'john', 'John'];
console.log(playerNames.sort());  // ['Ana', 'John', 'ana', 'john']

playerNames = ['Ana', 'ana', 'john', 'John']; // Reset the array
playerNames.sort((a, b) => {
 const nameA = a.toLowerCase(); 
 const nameB = b.toLowerCase(); 
 if (nameA < nameB) return -1; 
 if (nameA > nameB) return 1; 
 return 0; 
});
console.log(playerNames); // ["Ana", "ana", "john", "John"]

playerNames.sort((a, b) => a.localeCompare(b));
console.log(playerNames); // ['ana', 'Ana', 'john', 'John']

let namesWithAccents = ['Maève', 'Maeve'];
console.log(namesWithAccents.sort((a, b) => a.localeCompare(b))); // ['Maeve', 'Maève']

// without localeCompare
namesWithAccents = ['Maève', 'Maeve'];
console.log(namesWithAccents.sort()); // ['Maeve', 'Maève']

// to see the output of this file use the command: node src/03-array/04-searching-sorting.js