// @ts-check
/* eslint-disable */

//* ****** EcmaScript 2015 (ES6): Destructuring Assignment + Property Shorthand (https://goo.gl/VsLecp )
let [x, y] = ['a', 'b'];
let obj = { x, y };
console.log(obj); // { x: "a", y: "b" }

// swap (https://goo.gl/EyFAII)
[x, y] = [y, x];
var temp = x;
x = y;
y = temp;

// code above is the same as
var x2 = 'a';
var y2 = 'b';
var obj2 = { x2: x2, y2: y2 };
console.log(obj2); // { x: "a", y: "b" }

// Method Properties (https://goo.gl/DKU2PN)
const hello = {
  name: 'abcdef',
  printHello() {
    console.log('Hello');
  }
};
console.log(hello.printHello());

// code above is the same as:
var hello2 = {
  name: 'abcdef',
  printHello: function printHello() {
    console.log('Hello');
  }
};
console.log(hello2.printHello());
