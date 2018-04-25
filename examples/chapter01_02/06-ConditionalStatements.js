// @ts-check
/* eslint-disable */

/* Example 01 - if */
var num = 1;
if (num === 1) {
  console.log('num is equal to 1');
}

/* Example 02 - if-else */
var num = 0;
if (num === 1) {
  console.log('num is equal to 1');
} else {
  console.log('num is not equal to 1, the value of num is ' + num);
}

/* Example 03 - if-else-if-else... */
var month = 5;
if (month === 1) {
  console.log('January');
} else if (month === 2) {
  console.log('February');
} else if (month === 3) {
  console.log('March');
} else {
  console.log('Month is not January, February or March');
}

/* Example 04 - switch */
var month = 5;
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

/* Example 05 - ternary operator - if..else */
if (num === 1) {
  num--;
} else {
  num++;
}

// is the same as
num === 1 ? num-- : num++;
