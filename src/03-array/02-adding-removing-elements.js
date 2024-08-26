// Path: src/03-array/02-adding-removing-elements.js

// @ts-ignore
let raffleTickets = [5, 6, 7, 8, 9];

raffleTickets[raffleTickets.length] = 10;

// using push method
raffleTickets.push(11);
console.log(raffleTickets.push(12, 13)); // 9

console.log('raffleTickets: ', raffleTickets); // raffleTickets:  [ 5, 6, 7, 8, 9, 10, 11, 12, 13 ]

// inserting elements at the beginning
const insertAtBeginning = function (array, value) {
    for (let i = array.length; i >= 0; i--) {
        array[i] = array[i - 1];
    }
    array[0] = value;
    return array;
};
raffleTickets = insertAtBeginning(raffleTickets, 4);
console.log('raffleTickets: ', raffleTickets); // raffleTickets:  [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]

// using unshift method
raffleTickets.unshift(3);
raffleTickets.unshift(0, 1, 2); 

console.log('raffleTickets: ', raffleTickets); // raffleTickets:  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]

// removing elements from the end
let winningTicket = raffleTickets.pop(); 
console.log('The winning ticket is:', winningTicket); // The winning ticket is: 13

console.log('raffleTickets: ', raffleTickets); // raffleTickets:  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
console.log('array length: ', raffleTickets.length); // array length:  13

// removing elements from the beginning
for (let i = 0; i < raffleTickets.length; i++) {
    // numbers[i] = numbers[i + 1];  
}

// removing elements from the beginning - educational purposes only
const removeFirstElement = function(array) {
    for (let i = 1; i < array.length; i++) {
        array[i - 1] = array[i];
    }
    array.length--;
    return array;
}
  
// Apply to our raffleTickets array
raffleTickets = removeFirstElement(raffleTickets); 
console.log('Updated raffleTickets:', raffleTickets); // Updated raffleTickets: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
console.log('array length: ', raffleTickets.length); // array length:  12

// alternative way to remove elements from the beginning using a new array
const removeFirstElementWithNewArray = function(array) {
    let newArray = [];
    for (let i = 1; i < array.length; i++) {
        newArray.push(array[i]);
    }
    return newArray;
}

// using shift method
raffleTickets.shift();
console.log('numbers after shift: ', raffleTickets); // numbers after shift:  [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
console.log('array length: ', raffleTickets.length); // array length:  11

// adding and removing elements from a specific position
// using the splice method to remove elements
const prizeWinners = raffleTickets.splice(5, 3); // removes 3 elements starting from the 5th position
console.log('prizeWinners: ', prizeWinners); // prizeWinners:  [ 7, 8, 9 ]
console.log('remaing tickets: ', raffleTickets); // remaing tickets:  [ 2, 3, 4, 5, 6, 10, 11, 12 ]

// adding number 8 and 9 back to the array
raffleTickets.splice(5, 0, 8, 9); // adds 8, 9 back to the array
console.log('raffleTickets: ', raffleTickets); // raffleTickets:  [ 2, 3, 4, 5, 6, 8, 9, 10, 11, 12 ]

// to see the output of this file use the command: node src/03-array/02-adding-removing-elements.js
