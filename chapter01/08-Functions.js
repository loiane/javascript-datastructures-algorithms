function sayHello() {
    console.log('Hello!');
}

sayHello();

/* function with parameter */
function output(text) {
    console.log(text);
}

output('Hello!');

output('Hello!', 'Other text');

output();

/* function using the return statement */
function sum(num1, num2) {
    return num1 + num2;
}

var result = sum(1,2);
output(result);


//ES6: arrow functions
let circleArea = (r) => {
    const PI = 3.14;
    let area = PI * r * r;
    return area;
}
console.log(circleArea(2));

let circleArea2 = (r) => 3.14 * r * r;
console.log(circleArea2(2));




