// Path: src/03-array/06-other-methods.js

// using Array.isArray() method
console.log(typeof 'Learning Data Structures'); // string
console.log(typeof 123); // number
console.log(typeof { id: 1 }); // object
console.log(typeof [1, 2, 3]); // object

console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({ id: 1 })); // false

// real world example
const jsonStringFromAPI = '[{"id":1,"title":"The Lord of the Rings"},{"id":2,"title":"The Hobbit"}]';
const dataReceived = JSON.parse(jsonStringFromAPI);

if (Array.isArray(dataReceived)) {
  console.log('Received an array of books!');
  // check if The Hobbit is in the array
  const hobbitBook = dataReceived.find(book => book.title === 'The Hobbit');
  if (hobbitBook) {
    console.log('Found The Hobbit!');
  } else {
    console.log('The Hobbit was not found in the results.');
  }
} else {
  console.log('Data received is not an array.'); 
  // Handle other possible response types (single object, null, etc.)
}
// Received an array of books!

// using Array.from() method
const originalPixels = [255, 0, 0, 128, 128, 128]; // red, gray
const backupPixels = Array.from(originalPixels); 
console.log(backupPixels); // [255, 0, 0, 128, 128, 128]

// increase each pixel value by 50
const brightenedPixels = Array.from(originalPixels, pixelValue => pixelValue + 50); 
console.log(brightenedPixels); // [305, 50, 50, 178, 178, 178]


// Array.from() method creates a new, shallow-copied Array instance from an array-like or iterable object.
let friends = [ 
  { name: 'Frodo', age: 30 }, 
  { name: 'Violet', age: 18 }
]; 
const friendsCopy = Array.from(friends);
friends[0].name = 'Sam'; // modify the original
console.log(friendsCopy[0].name); // 'Sam'


// deep copy
const anotherBackup = [...originalPixels];
const friendsDeepCopy = structuredClone(friends);
friendsDeepCopy[0].name = 'Frodo';
console.log(friends[0].name); // 'Sam' - dit not change the original array


// using Array.of() method
let suits = Array.of('Hearts', 'Diamonds', 'Clubs', 'Spades');
console.log(suits); // ['Hearts', 'Diamonds', 'Clubs', 'Spades']

// same as:
suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

const originalDeck = [ 1, 2, 3 ];
const shuffledDeck = Array.of(...originalDeck); 

// using Array.fill() method
const tornamentResults = new Array(5).fill('pending'); 

tornamentResults.fill('win', 1, 3);
console.log(tornamentResults); // ['pending', 'win', 'win', 'pending', 'pending']

// joining arrays
const zero = 0; 
const positiveNumbers = [1, 2, 3]; 
const negativeNumbers = [-3, -2, -1]; 
let allNumbers = negativeNumbers.concat(zero, positiveNumbers); 

allNumbers = [...negativeNumbers,zero,...positiveNumbers];

// to see the output of this file use the command: node src/03-array/06-other-methods.js