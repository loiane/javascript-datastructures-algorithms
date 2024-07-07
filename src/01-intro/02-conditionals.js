// Path: src/01-intro/02-conditionals.js

/* Example 01 - if-else */
let number = 0;
if (number === 1) {
  console.log('number is equal to 1');
} else {
  console.log('number is not equal to 1, the value of number is ' + number);
}

/* Example 02 - ternary operator - if..else */
if (number === 1) {
  number--;
} else {
  number++;
}

// is the same as
number === 1 ? number-- : number++;

// is the same as
number = number === 1 ? number - 1 : number + 1;

/* Example 03 - if-else-if-else... */
let month = 5;
if (month === 1) {
  console.log('January');
} else if (month === 2) {
  console.log('February');
} else if (month === 3) {
  console.log('March');
} else {
  console.log('Month is not January, February or March');
}

/* Example 05 - switch */
switch (month) {
  case 1:
    console.log('January');
    break;
  case 2:
    console.log('February');
    break;
  case 3:
    console.log('March');
    break;
  default:
    console.log('Month is not January, February or March');
}

// to see the output of this file use the command: node src/01-intro/02-conditionals.js