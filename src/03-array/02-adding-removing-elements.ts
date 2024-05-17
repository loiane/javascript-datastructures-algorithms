// Path: src/03-array/02-adding-removing-elements.ts

// @ts-ignore
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

numbers[numbers.length] = 10;

// using push method
numbers.push(11);
numbers.push(12, 13);

// inserting elements at the beginning
// @ts-ignore
Array.prototype.insertAtBeginning = function (value) {
    for (let i = this.length; i >= 0; i--) {
        this[i] = this[i - 1];
    }
    this[0] = value;
};
// @ts-ignore  
numbers.insertAtBeginning(-1);

// using unshift method
numbers.unshift(-2);
numbers.unshift(-4, -3);

// removing elements from the end
numbers.pop(); // number 13 is removed
// console.log('Removed element: ', numbers.pop()); // Removed element:  13
console.log('array length: ', numbers.length); // array length:  17

// removing elements from the beginning
for (let i = 0; i < numbers.length; i++) {
    // numbers[i] = numbers[i + 1];  
}

// removing elements from the beginning - educational purposes only
// @ts-ignore
Array.prototype.reIndex = function (myArray) {
    const newArray = [];
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] !== undefined) {
            newArray.push(myArray[i]);
        }
    }
    return newArray;
}
// remove first position manually and reIndex 
// @ts-ignore 
Array.prototype.removeFromBeginning = function () {
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i + 1];
    }
    // @ts-ignore
    return this.reIndex(this);
};
// @ts-ignore
// numbers = numbers.removeFromBeginning();

// using shift method
numbers.shift();
console.log('numbers after shift: ', numbers);
console.log('array length: ', numbers.length); // array length:  16

// adding and removing elements from a specific position
// using the splice method
numbers.splice(5, 3); // removes 3 elements starting from the 5th position
console.log('numbers: ', numbers); // numbers:  [ -3, -2, -1, 0, 1, 5, 6, 7, 8, 9, 10, 11, 12 ] 

// adding elements, 2, 3 and 4 at the 5th position
numbers.splice(5, 0, 2, 3, 4);

// to see the output of this file use the command: node src/03-array/02-adding-removing-elements.ts
