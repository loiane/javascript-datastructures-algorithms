let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

//********** forEch using arrow functions
console.log('forEach using arrow functions');

numbers.forEach(x => {
    console.log((x % 2 == 0));
});

//********** using for..of loop
console.log('using for..of loop');

for (let n of numbers) {
    console.log((n % 2 == 0) ? 'even' : 'odd');
}

//********** Using the new ES6 iterator (@@iterator)
console.log('Using the new ES6 iterator (@@iterator)');

let iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value); //1
console.log(iterator.next().value); //2
console.log(iterator.next().value); //3
console.log(iterator.next().value); //4
console.log(iterator.next().value); //5

//********** Array entries, keys and values
console.log('Array entries, keys and values');

console.log('Array.entries');
let aEntries = numbers.entries(); //retrieve iterator of key/value
console.log(aEntries.next().value); // [0, 1] - position 0, value 1
console.log(aEntries.next().value); // [1, 2] - position 1, value 2
console.log(aEntries.next().value); // [2, 3] - position 2, value 3

console.log('Array.keys');
let aKeys = numbers.keys(); //retrieve iterator of keys
console.log(aKeys.next()); // {value: 0, done: false } done false means iterator has more values
console.log(aKeys.next()); // {value: 1, done: false }
console.log(aKeys.next()); // {value: 2, done: false }

console.log('Array.values');
//let aValues = numbers.values();
console.log(aValues.next()); // {value: 1, done: false } done false means iterator has more values
console.log(aValues.next()); // {value: 2, done: false }
console.log(aValues.next()); // {value: 3, done: false }

//********** Using the from method
console.log('Using the from method');

let evens = Array.from(numbers, x => (x % 2 == 0));
console.log(evens);

let numbers2 = Array.from(numbers);
console.log(numbers2);

//********** Using Array.of
console.log('Using Array.of');

let numbers3 = Array.of(1);
let numbers4 = Array.of(1,2,3,4,5,6);
let numbersCopy = Array.of(...numbers4);
console.log(numbers3);
console.log(numbers4);
console.log(numbersCopy);

//********** Using the fill method
console.log('Using the fill method');

numbersCopy.fill(0);
console.log(numbersCopy);

numbersCopy.fill(2, 1);
console.log(numbersCopy);

numbersCopy.fill(1, 3, 5);
console.log(numbersCopy);

let ones = Array(6).fill(1);
console.log(ones);

//********** Using the copyWithin method
console.log('Using the copyWithin method');

let copyArray = [1, 2, 3, 4, 5, 6];
console.log(copyArray);

copyArray = copyArray.copyWithin(0, 3); //pos 3 value is copied to pos 0
console.log(copyArray);

copyArray = [1, 2, 3, 4, 5, 6];
copyArray = copyArray.copyWithin(1, 3, 5); //pos 3-4 values are copied to pos 1-2
console.log(copyArray);

//********** methods find and findIndex
console.log('methods find and findIndex');

function multipleOf13(element, index, array) {
    return (element % 13 == 0) ? true : false;
}

console.log(numbers.find(multipleOf13));
console.log(numbers.findIndex(multipleOf13));

//********** EcmaScript 7: using the method includes
console.log('EcmaScript 7: using the method includes');

console.log(numbers.includes(15));
console.log(numbers.includes(20));

let numbers5 = [7,6,5,4,3,2,1];
console.log(numbers5.includes(4,5));
