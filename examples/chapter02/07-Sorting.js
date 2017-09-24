// @ts-check

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log('numbers', numbers);


numbers = numbers.reverse();
console.log('numbers.reverse()', numbers);

console.log('numbers.sort()', numbers.sort());

/* console.log(
  numbers.sort(function(a, b) {
    return a - b;
  })
); */ // ES5 syntax

console.log('numbers.sort((a, b) => a - b)', numbers.sort((a, b) => a - b));

function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

console.log('numbers.sort(compare)', numbers.sort(compare));

// Sorting objects
const friends = [
  { name: 'John', age: 30 },
  { name: 'Ana', age: 20 },
  { name: 'Chris', age: 25 }, // trailing comma ES2017
];

function comparePerson(a, b) {
  if (a.age < b.age) {
    return -1;
  }
  if (a.age > b.age) {
    return 1;
  }
  return 0;
}

console.log('friends.sort(comparePerson)', friends.sort(comparePerson));

let names = ['Ana', 'ana', 'john', 'John'];
console.log('names', names);
console.log('names.sort()', names.sort());

names = ['Ana', 'ana', 'john', 'John']; // reset to array original state
console.log('names.sort(compareFunction)', names.sort((a, b) => {
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }
  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }
  return 0;
}));
names = ['Ana', 'ana', 'john', 'John']; // reset to array original state
console.log('names.sort((a, b) => a.localeCompare(b))', names.sort((a, b) => a.localeCompare(b)));

const names2 = ['Maève', 'Maeve'];
console.log('names2', names);
console.log('names2.sort((a, b) => a.localeCompare(b))', names2.sort((a, b) => a.localeCompare(b)));
