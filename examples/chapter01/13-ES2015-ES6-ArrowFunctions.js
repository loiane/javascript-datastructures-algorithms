// @ts-check
/* eslint-disable */

//* ****** EcmaScript 2015 (ES6): arrow functions (https://goo.gl/nM414v)
var circleAreaES5 = function circleArea(r) {
  var PI = 3.14;
  var area = PI * r * r;
  return area;
};
console.log(circleAreaES5(2));

const circleArea = r => { // {1}
  const PI = 3.14;
  const area = PI * r * r;
  return area;
};
console.log(circleArea(2));

const circleArea2 = r => 3.14 * r * r;
console.log(circleArea2(2));

const hello = () => console.log('hello!');
hello();
