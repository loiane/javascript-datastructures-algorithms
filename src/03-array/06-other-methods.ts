// Path: src/03-array/06-other-methods.ts

// using Array.isArray() method
console.log(typeof 'Learning Data Structures'); // string
console.log(typeof 123); // number
console.log(typeof { id: 1 }); // object
console.log(typeof [1, 2, 3]); // object

console.log(Array.isArray([1, 2, 3])); // true

// real world example
const jsonString = JSON.stringify('[{"id":1,"title":"The Fellowship of the Ring"},{"id":2,"title":"Fourth Wing"}]');
const dataReceived = JSON.parse(jsonString);

if (Array.isArray(dataReceived)) {
  console.log('It is an array');
  // check if The Fellowship of the Ring is in the array
  const fellowship = dataReceived.find((item) => {
    return item.title === 'The Fellowship of the Ring'; 
  });   
  if (fellowship) {
    console.log('We received the book we were looking for!');
  } else {
    console.log('We did not receive the book we were looking for!');
  }
}

// using Array.from() method
// @ts-ignore
const numbers = [1, 2, 3, 4, 5];
const numbersCopy = Array.from(numbers);
console.log(numbersCopy); // [1, 2, 3, 4, 5]

const evens = Array.from(numbers, x => (x % 2 == 0)); 
console.log(evens); // [false, true, false, true, false]

// Array.from() method creates a new, shallow-copied Array instance from an array-like or iterable object.
// @ts-ignore
const friends = [ 
  { name: 'Frodo', age: 30 }, 
  { name: 'Violet', age: 18 }, 
  { name: 'Aelin', age: 20 } 
]; 
const friendsCopy = Array.from(friends);
console.log(friendsCopy);

friends[0].name = 'Sam';
console.log(friendsCopy[0].name); // Sam

// deep copy
const friendsDeepCopy = JSON.parse(JSON.stringify(friends));
friends[0].name = 'Frodo';
console.log(friendsDeepCopy[0].name); // Sam

// using Array.of() method
const numbersArray = Array.of(1, 2, 3, 4, 5);
console.log(numbersArray); // [1, 2, 3, 4, 5]

let numbersCopy2 = Array.of(...numbersArray); 

// using Array.fill() method
const tornamentResults = new Array(5).fill('pending'); 

tornamentResults.fill('win', 1, 3);
console.log(tornamentResults); // ['pending', 'win', 'win', 'pending', 'pending']

// joining arrays
const zero = 0; 
const positiveNumbers = [1, 2, 3]; 
const negativeNumbers = [-3, -2, -1]; 
let allNumbers = negativeNumbers.concat(zero, positiveNumbers); 


// to see the output of this file use the command: node src/03-array/06-other-methods.ts