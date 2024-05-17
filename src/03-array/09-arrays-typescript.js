// Path: src/03-array/09-arrays-typescript.js
// @ts-ignore
const friends = [
    { name: 'Frodo', age: 30 },
    { name: 'Violet', age: 18 },
    { name: 'Aelin', age: 20 }
];
// @ts-ignore
const compareFriends = (friendA, friendB) => {
    return friendA.age - friendB.age;
};
friends.sort(compareFriends);
console.log('Sorted friends:', friends); // [ { name: 'Violet', age: 18 }, { name: 'Aelin', age: 20 }, { name: 'Frodo', age: 30 } ]
// to see the output of this file use the command: node src/03-array/09-arrays-typescript.js
