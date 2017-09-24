// const numbers: number[];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('numbers', numbers);

// let names: string[];
let names = ['Ana', 'ana', 'john', 'John'];
console.log('names', names);
console.log('names.sort()', names.sort());

interface Person {
  name: string;
  age: number;
}

// const friends: {name: string, age: number}[];
const friends = [
  { name: 'John', age: 30 },
  { name: 'Ana', age: 20 },
  { name: 'Chris', age: 25 }, // trailing comma ES2017
];

function comparePerson(a: Person, b: Person) {
  if (a.age < b.age) {
    return -1;
  }
  if (a.age > b.age) {
    return 1;
  }
  return 0;
}

console.log('friends.sort(comparePerson)', friends.sort(comparePerson));
