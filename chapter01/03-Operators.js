/* Arithmetic operators */
var num = 0;

console.log('num value is ' + num);

num = num + 2;

console.log('New num value is ' + num);

num = num * 3;

console.log('New num value is ' + num);

num = num / 2;

console.log('New num value is ' + num);

num++;

num--;

console.log('New num value is ' + num);

console.log('num mod 2 value is ' + (num % 2));


/* Assignment operators */
num += 1;
num -= 2;
num *= 3;
num /= 2;
num %= 3;

console.log('New num value is ' + num);

/* Assignment operators */
console.log('num == 1 : ' + (num == 1));
console.log('num === 1 : ' + (num === 1));
console.log('num != 1 : ' + (num != 1));
console.log('num > 1 : ' + (num > 1));
console.log('num < 1 : ' + (num < 1));
console.log('num >= 1 : ' + (num >= 1));
console.log('num <= 1 : ' + (num <= 1));


/* Logical operators */
console.log('true && false : ' + (true && false));
console.log('true || false : ' + (true || false));
console.log('!true : ' + (!true));