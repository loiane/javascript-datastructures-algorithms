// Path: src/03-array/05-transforming-array.js

// @ts-ignore
const numbers_ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// using the map method
const celsiusTemperatures = [0, 5, 10, 15, 20, 25, 30];
const fahrenheitTemperatures = celsiusTemperatures.map(celsius => {
  return (celsius * 9/5) + 32; 
});
console.log('Celsius:', celsiusTemperatures); // Celsius: [0, 5, 10, 15, 20, 25, 30]
console.log('Fahrenheit:', fahrenheitTemperatures); // Fahrenheit: 32, 41, 50, 59, 68, 77, 86]


// rewriting the above code using a loop
const fahrenheitTemperaturesLoop = [];
for (let i = 0; i < celsiusTemperatures.length; i++) {
  fahrenheitTemperaturesLoop.push((celsiusTemperatures[i] * 9/5) + 32);
}

// using the split method
const namesFromCSV = 'Aelin,Gandalf,Violet,Poppy';
// @ts-ignore
const names = namesFromCSV.split(',');
console.log('Names:', names); // ['Aelin', 'Gandalf', 'Violet', 'Poppy']

// using the join method
const namesCSV = names.join(';');
console.log('Names CSV:', namesCSV); // 'Aelin;Gandalf;Violet;Poppy'

// using the reduce method
const cartItems = [
  { name: 'Laptop', price: 1200 },
  { name: 'Smartphone', price: 500 },
  { name: 'Headphones', price: 100 }
];

const totalPrice = cartItems.reduce((accumulator, currentItem) => {
  return accumulator + currentItem.price;
}, 0); // Start the accumulator at 0
console.log('Total Price:', totalPrice); // Total Price: 1800

// rewriting the above code using a loop
let totalPriceLoop = 0;
for (let i = 0; i < cartItems.length; i++) {
  totalPriceLoop += cartItems[i].price;
}

// using the reduce method to find the maximum value
const scores = [30, 70, 85, 90, 100];
const highestScore = scores.reduce((max, score) => {
    return score > max ? score : max; 
}); 
console.log('Highest Score:', highestScore); // Highest Score: 100

// using with
const leaderboard = [
  { player: 'Poppy', score: 150 },
  { player: 'Violet', score: 120 },
  { player: 'Tory', score: 90 }
];

const updated = leaderboard.with(1, { player: 'Violet', score: 135 });
console.log('Leaderboard:', leaderboard); // [{ player: 'Poppy', score: 150 }, { player: 'Violet', score: 120 }, { player: 'Tory', score: 90 }]
console.log('Updated :', updated); // [{ player: 'Poppy', score: 150 }, { player: 'Violet', score: 135 }, { player: 'Tory', score: 90 }]

// to see the output of this file use the command: node src/03-array/05-transforming-array.js