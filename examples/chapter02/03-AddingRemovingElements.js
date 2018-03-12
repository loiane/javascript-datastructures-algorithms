// @ts-check
/* eslint-disable */

function logArray(message = '', array) {
  const output = `${message} => (${array.length}) [${array.join(', ')}]`;
  document.writeln(`<p>${output}</p>`);
  console.log(message, array);
}

let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log('Original array', numbers);

function printArray(myArray) {
  for (let i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
  }
}

/****************************** Inserting an element in the end of the Array */

// add a new element to the numbers array
numbers[numbers.length] = 10;
console.log('Add 10 to the end', numbers);

numbers.push(11);
console.log('Add 11 with push', numbers);

numbers.push(12, 13);
console.log('Add 12 and 13 with push', numbers);


// insert first position manually
Array.prototype.insertFirstPosition = function(value) {
  for (let i = this.length; i >= 0; i--) {
    this[i] = this[i - 1];
  }
  this[0] = value;
};

numbers.insertFirstPosition(-1);
console.log('Add -1 with insertFirstPosition', numbers);
// printArray(numbers);

// using method unshift
numbers.unshift(-2);
console.log('Add -2 with unshift', numbers);
//printArray(numbers);

numbers.unshift(-4, -3);
console.log('Add -4 and -3 with unshift', numbers);
// printArray(numbers);

// ************** Removing elements

numbers.pop();
console.log('Removed last value with pop', numbers);

for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i + 1];
}

console.log('Removed first value manually', numbers);
console.log('Lenght after value removed manually', numbers.length);

//reset array
numbers = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

Array.prototype.reIndex = function(myArray) {
  const newArray = [];
  for(let i = 0; i < myArray.length; i++ ) {
    if (myArray[i] !== undefined) {
      // console.log(myArray[i]);
      newArray.push(myArray[i]);
    }
  }
  return newArray;
}

// remove first position manually and reIndex
Array.prototype.removeFirstPosition = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }
  return this.reIndex(this);
};

numbers = numbers.removeFirstPosition();
console.log('Removed first with removeFirstPosition + reIndex', numbers);

// using method shift
numbers.shift();
console.log('Removed first with shift', numbers);
console.log('Lenght after removed first with shift', numbers.length);

//* *** Removing and Adding elements from the middle of the array or specific position
// splice method - parameter (index, howManyPositionsToBeRemoved, item1...itemX)
numbers.splice(5, 3);
console.log('Removing 3 elements (3, 4, 5) starting index 5', numbers);

numbers.splice(5, 0, 2, 3, 4);
console.log('Adding 3 elements (2, 3, 4) starting index 5', numbers);

numbers.splice(5, 3, 2, 3, 4);
console.log('Removing 3 elements starting index 5 and adding (2, 3, 4)', numbers);
