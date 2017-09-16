// @ts-check

//* ****** EcmaScript 2015 (ES6): let and const keywords

//* ****** EcmaScript 2015 (ES6): let is the new var (https://goo.gl/he0udZ)
var framework = 'Angular';
var framework = 'React';
console.log(framework);

let language = 'JavaScript!'; // {1}
// let language = 'Ruby!'; // {2} - throws error
console.log(language);

//* ****** EcmaScript 2015 (ES6): variables scope (https://goo.gl/NbsVvg)
let movie = 'Lord of the Rings'; // {1}
// var movie = 'Batman v Superman'; //throws error, variable movie already declared

function starWarsFan() {
  const movie = 'Star Wars'; // {2}
  return movie;
}

function marvelFan() {
  movie = 'The Avengers'; // {3}
  return movie;
}

function blizzardFan() {
  const isFan = true;
  let phrase = 'Warcraft'; // {4}
  console.log('Before if: ' + phrase);
  if (isFan) {
    let phrase = 'initial text'; // {5}
    phrase = 'For the Horde!'; // {6}
    console.log('Inside if: ' + phrase);
  }
  phrase = 'For the Alliance!'; // {7}
  console.log('After if: ' + phrase);
}

console.log(movie); // {8}
console.log(starWarsFan()); // {9}
console.log(marvelFan()); // {10}
console.log(movie); // {11}
blizzardFan(); // {12}

// output
// Lord of the Rings
// Star Wars
// The Avengers
// The Avengers
// Before if: Warcraft
// Inside if: For the Horde!
// After if: For the Alliance!

//* ****** EcmaScript 2015 (ES6): const (https://goo.gl/YUQj3r)
const PI = 3.141593;
// PI = 3.0; //throws error
console.log(PI);

const jsFramework = {
  name: 'Angular'
};
jsFramework.name = 'React';

// error, cannot reassign object reference
/*
jsFramework = {
  name: 'Vue'
};
*/
