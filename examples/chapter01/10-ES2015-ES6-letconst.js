// @ts-check
/* eslint-disable */

//* ****** EcmaScript 2015 (ES6): let and const keywords

//* ****** EcmaScript 2015 (ES6): let is the new var (https://goo.gl/he0udZ)
var framework = 'Angular';
var framework = 'React';
console.log(framework);

let language = 'JavaScript!'; // {1}
// let language = 'Ruby!'; // {2} - throws error
console.log(language);


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
