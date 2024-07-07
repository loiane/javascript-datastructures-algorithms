// Path: src/01-intro/05-scope.js

let movie = 'Lord of the Rings';

function starWarsFan() {
  const movie = 'Star Wars'; 
  return movie;
}

function marvelFan() {
  movie = 'The Avengers'; 
  return movie;
}

console.log(movie); // Lord of the Rings
console.log(starWarsFan()); // Star Wars
console.log(marvelFan()); // The Avengers
console.log(movie); // The Avengers

// block scope
function blizzardFan() {
  const isFan = true;
  let phrase = 'Warcraft'; 
  console.log('Before if: ' + phrase);
  if (isFan) {
    let phrase = 'initial text'; 
    phrase = 'For the Horde!'; 
    console.log('Inside if: ' + phrase);
  }
  phrase = 'For the Alliance!'; 
  console.log('After if: ' + phrase);
}

blizzardFan(); 
// Before if: Warcraft
// Inside if: For the Horde!
// After if: For the Alliance!

// to see the output of this file use the command: node src/01-intro/05-scope.js
